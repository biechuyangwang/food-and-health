/* audit.js — 站点静态审计（node tools/audit.js）
   检查：BOM / 引用悬空(SOURCES) / FOODS·PAIRS·DISEASES 交叉 id /
         图片文件存在 / 页内 data-src 命中 / href 链接完整性
   无外部依赖；data.js 尚不存在时跳过数据检查并提示。 */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const errors = [];
const warnings = [];

function listHTML() {
  return fs.readdirSync(ROOT).filter(f => f.endsWith('.html')).sort();
}
function readBOMless(p) {
  const buf = fs.readFileSync(p);
  if (buf.length >= 3 && buf[0] === 0xEF && buf[1] === 0xBB && buf[2] === 0xBF) {
    errors.push(`BOM: ${path.relative(ROOT, p)} 含 UTF-8 BOM（应去除）`);
    return buf.slice(3).toString('utf8');
  }
  return buf.toString('utf8');
}

/* ---------- 1. HTML 基本检查 ---------- */
const htmls = listHTML();
if (!htmls.length) errors.push('根目录未找到任何 HTML 页面');
const hrefs = new Set();
htmls.forEach(f => {
  const txt = readBOMless(path.join(ROOT, f));
  // 收集站内链接
  const re = /href="([^"#]+?\.html)(#[^"]*)?"/g;
  let m;
  while ((m = re.exec(txt)) !== null) {
    if (/^https?:\/\//i.test(m[1])) continue; /* 外部链接（如 sport.gov.cn 的 content.html）不做本地存在性检查 */
    hrefs.add(m[1]);
  }
  if (!txt.includes('assets/style.css') && f !== 'README.md') warnings.push(`${f}: 未引用 assets/style.css`);
});

/* ---------- 2. 加载数据 ---------- */
let HDATA = null;
const dataPath = path.join(ROOT, 'assets', 'data.js');
if (fs.existsSync(dataPath)) {
  const sandbox = { window: {} };
  require('vm').runInNewContext(readBOMless(dataPath), sandbox, { filename: 'data.js' });
  HDATA = sandbox.window.HDATA || null;
  if (!HDATA) errors.push('data.js 未正确挂载 window.HDATA');
} else {
  warnings.push('assets/data.js 尚未创建——跳过数据交叉检查');
}

/* ---------- 3. 数据交叉检查 ---------- */
if (HDATA) {
  const S = HDATA.SOURCES || {};
  const foodIds = new Set((HDATA.FOODS || []).map(f => f.id));
  const drugIds = new Set((HDATA.DRUGS || []).map(d => d.id));
  const srcIds = new Set(Object.keys(S));
  const checkSrc = (ids, where) => {
    (Array.isArray(ids) ? ids : [ids]).filter(Boolean).forEach(id => {
      if (!srcIds.has(id)) errors.push(`悬空引用: ${where} 引用了不存在的来源 ${id}`);
    });
  };

  (HDATA.FOODS || []).forEach(f => {
    if (!f.id || !f.name) errors.push(`FOODS 存在缺 id/name 的条目: ${JSON.stringify(f).slice(0, 60)}`);
    if (f.tcm) checkSrc(f.tcm.src, `FOODS.${f.id}.tcm`);
    if (f.nutrients && f.nutrients.src) checkSrc(f.nutrients.src, `FOODS.${f.id}.nutrients`);
    (f.benefits || []).forEach((b, i) => checkSrc(b.src, `FOODS.${f.id}.benefits[${i}]`));
    (f.pairs_good || []).forEach(id => {
      if (!foodIds.has(id)) errors.push(`FOODS.${f.id} 搭配引用了不存在的食物 id: ${id}`);
    });
    (f.pairs_bad || []).forEach(id => {
      if (!foodIds.has(id) && !drugIds.has(id)) errors.push(`FOODS.${f.id} 忌搭引用了不存在的食物/药物 id: ${id}`);
    });
    if (f.photo) {
      const p = path.join(ROOT, f.photo.split('?')[0]);
      if (!fs.existsSync(p)) warnings.push(`FOODS.${f.id} 照片缺失（将以 emoji 兜底）: ${f.photo}`);
    }
  });

  (HDATA.DRUGS || []).forEach(d => { if (!d.id || !d.name) errors.push('DRUGS 存在缺 id/name 条目'); });

  (HDATA.PAIRS || []).forEach((p, i) => {
    const ok = id => foodIds.has(id) || drugIds.has(id);
    if (!ok(p.a)) errors.push(`PAIRS[${i}] a 引用了不存在的条目: ${p.a}`);
    if (!ok(p.b)) errors.push(`PAIRS[${i}] b 引用了不存在的条目: ${p.b}`);
    checkSrc(p.src, `PAIRS[${i}](${p.a}+${p.b})`);
  });

  (HDATA.DISEASES || []).forEach(d => {
    (d.recommend || []).forEach(r => {
      if (r.food && !foodIds.has(r.food)) errors.push(`DISEASES.${d.id} recommend 引用了不存在的食物 id: ${r.food}`);
    });
    checkSrc(d.src, `DISEASES.${d.id}`);
  });

  (HDATA.HERBS || []).forEach(h => {
    checkSrc(h.src, `HERBS.${h.id}`);
    if (h.modern && h.modern.src) checkSrc(h.modern.src, `HERBS.${h.id}.modern`);
  });

  (HDATA.FIRSTAID || []).forEach(t => checkSrc(t.src, `FIRSTAID.${t.id}`));

  (HDATA.EXERCISES || []).forEach(x => {
    if (!x.id || !x.name) errors.push(`EXERCISES 存在缺 id/name 的条目: ${JSON.stringify(x).slice(0, 60)}`);
    checkSrc(x.src, `EXERCISES.${x.id || '?'}`);
    if (!Array.isArray(x.frames) || x.frames.length < 2) {
      errors.push(`EXERCISES.${x.id || '?'} 关键帧不足（至少 2 帧）`);
    } else {
      x.frames.forEach((f, i) => {
        const ok = Array.isArray(f) && f.length === 11 &&
          f.every(pt => Array.isArray(pt) && pt.length === 2 && pt.every(v => typeof v === 'number' && isFinite(v)));
        if (!ok) errors.push(`EXERCISES.${x.id} 第 ${i} 帧格式错误（应为 11 个 [x,y] 数值点）`);
      });
    }
    if (x.video && !/^https?:\/\//.test(x.video.url || '')) errors.push(`EXERCISES.${x.id} video.url 非法`);
  });

  Object.keys(HDATA.QUIZ_BANK || {}).forEach(k => {
    (HDATA.QUIZ_BANK[k] || []).forEach((q, i) => {
      if (!Array.isArray(q.opts) || q.opts.length < 2) errors.push(`QUIZ_BANK.${k}[${i}] 选项缺失`);
      if (typeof q.ans !== 'number' || q.ans < 0 || q.ans >= q.opts.length) errors.push(`QUIZ_BANK.${k}[${i}] ans 越界`);
      checkSrc(q.src, `QUIZ_BANK.${k}[${i}]`);
    });
  });

  // 页面 data-src 引用必须命中 SOURCES（动态拼出的引用由上方各实体检查覆盖；
  // 跳过 JS 模板占位 ${...}）
  htmls.forEach(f => {
    const txt = fs.readFileSync(path.join(ROOT, f), 'utf8');
    const re = /data-src="([^"]+)"/g;
    let m;
    while ((m = re.exec(txt)) !== null) {
      if (m[1].indexOf('$') >= 0) continue;
      m[1].split(/[,，]/).map(x => x.trim()).filter(Boolean).forEach(id => {
        if (!srcIds.has(id)) errors.push(`${f}: 正文 data-src 引用了不存在的来源 ${id}`);
      });
    }
  });
}

/* ---------- 4. 站内链接 ---------- */
hrefs.forEach(h => {
  if (!fs.existsSync(path.join(ROOT, h))) errors.push(`链接失效: 某页指向 ${h}，但该文件不存在`);
});

/* ---------- 汇总 ---------- */
const GREEN = '\x1b[32m', RED = '\x1b[31m', YEL = '\x1b[33m', END = '\x1b[0m';
warnings.forEach(w => console.log(YEL + '⚠ ' + w + END));
errors.forEach(e => console.log(RED + '✗ ' + e + END));
console.log(`${errors.length ? RED + '审计未通过' : GREEN + '审计通过'}${END}：` +
  `${htmls.length} 个页面，${errors.length} 个错误，${warnings.length} 个提醒` +
  (HDATA ? `；数据：${(HDATA.FOODS || []).length} 食物 / ${(HDATA.PAIRS || []).length} 搭配 / ${(HDATA.HERBS || []).length} 药材 / ${(HDATA.EXERCISES || []).length} 动作 / ${Object.keys(HDATA.SOURCES || {}).length} 来源` : ''));
process.exit(errors.length ? 1 : 0);

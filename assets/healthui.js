/* ============================================================
   healthui.js — 「食物与健康」共享组件库（无依赖，离线可用）
   renderNav : 顶部导航 + 明暗主题（localStorage 记忆）
   cite      : 正文 <sup class="cite" data-src="S1,S2"> 自动编号
               + 页脚参考文献表（数据源 assets/data.js 的 SOURCES）
   quiz      : 随堂测（即时判分 + 解析 + 出处 + 成绩记忆）
   progress  : 页面已读进度（localStorage）
   gate      : 急救页进入确认层 + 顶部永久红色警示条
   stepper   : 急救分步 SVG 演示器
   pairFinder: 食物/药物配对查询器（数据源 HDATA.PAIRS）
   foodFlip  : 食物翻转卡片渲染
   ============================================================ */
'use strict';

const HUI = (() => {

  /* ---------- 安全存储（file:// 下个别环境可能禁用） ---------- */
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { } }
  };

  /* ---------- 页面清单（导航顺序） ---------- */
  const PAGES = [
    { file: 'index.html', short: '首页', group: '总览', title: '站点主页' },
    { file: 'nutrient.html', short: '营养', group: '基础', title: '营养素基础' },
    { file: 'foods.html', short: '图鉴', group: '食物', title: '食物图鉴' },
    { file: 'pairing.html', short: '搭配', group: '食物', title: '食物搭配宜忌' },
    { file: 'disease-metabolic.html', short: '食疗·代谢', group: '食疗', title: '疾病食疗 · 代谢与心血管' },
    { file: 'disease-gi.html', short: '食疗·消化免疫', group: '食疗', title: '疾病食疗 · 消化血液免疫骨骼' },
    { file: 'fitness.html', short: '强身', group: '强身', title: '增强体质' },
    { file: 'herbs.html', short: '药食同源', group: '强身', title: '药食同源' },
    { file: 'recipes.html', short: '食谱', group: '食谱', title: '家常食谱推荐' },
    { file: 'appendix-howtocook.html', short: '开源菜谱', group: '食谱', title: 'HowToCook 开源菜谱库（附录）' },
    { file: 'firstaid-trauma.html', short: '创伤急救', group: '急救', title: '创伤急救五技术' },
    { file: 'firstaid-env.html', short: '环境急症', group: '急救', title: '伤口、烧伤与环境急症' },
    { file: 'quiz.html', short: '自测', group: '自测', title: '知识自测' },
    { file: 'references.html', short: '文献', group: '自测', title: '参考文献与证据说明' }
  ];

  /* ---------- 工具 ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }
  function fmt(v, d = 1) {
    if (v === null || v === undefined || Number.isNaN(v)) return '—';
    if (!isFinite(v)) return '—';
    let s = Number(v).toFixed(d);
    if (s.includes('.')) s = s.replace(/0+$/, '').replace(/\.$/, '');
    return s;
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- 引用体系 ---------- */
  const LEVEL_NAME = { A: '强证据（指南强推荐 / 系统评价·RCT）', B: '中等证据（队列·观察性研究 / 弱推荐）', C: '传统典籍（药典·本草·经验医学）', D: '证据不足（仅用于辨析辟谣，须明示）' };

  function badgeLevel(lv) {
    if (!lv || !LEVEL_NAME[lv]) return '';
    return `<span class="level-badge l${lv.toLowerCase()}" title="${esc(LEVEL_NAME[lv])}">证据${lv}</span>`;
  }
  function verdictBadge(v) {
    const M = { good: ['宜', 'good'], caution: ['慎', 'caution'], bad: ['忌 / 禁', 'bad'], neutral: ['中性', 'neutral'] };
    const m = M[v] || M.neutral;
    return `<span class="verdict ${m[1]}">${m[0]}</span>`;
  }
  function srcFull(id) {
    const D = window.HDATA;
    if (!D || !D.SOURCES || !D.SOURCES[id]) return `（来源 ${esc(id)} 待补）`;
    const s = D.SOURCES[id];
    return `${esc(s.title)}．${esc(s.org || '')}${s.publisher ? '，' + esc(s.publisher) : ''}，${s.year || ''}．`;
  }
  function srcShort(ids) {
    return `<span class="muted small">来源：${(ids || []).map(i => esc(i)).join('、')}</span>`;
  }
  /* 页面加载后调用：为 <sup class="cite" data-src="S1,S2"> 编号并生成页脚文献表 */
  function cite() {
    const sups = $$('sup.cite');
    if (!sups.length) return;
    const used = {}; const order = [];
    sups.forEach(s => {
      const ids = (s.getAttribute('data-src') || '').split(/[,，]/).map(x => x.trim()).filter(Boolean);
      const nums = [];
      ids.forEach(id => {
        const ok = window.HDATA && window.HDATA.SOURCES && window.HDATA.SOURCES[id];
        if (!ok) return;
        if (!(id in used)) { order.push(id); used[id] = order.length; }
        nums.push(used[id]);
      });
      s.innerHTML = nums.map(n => `[${n}]`).join('');
      if (!nums.length) s.remove();
    });
    let host = document.getElementById('reflist');
    if (!host) {
      host = document.createElement('div'); host.id = 'reflist';
      const foot = $('footer.site');
      if (foot) foot.parentNode.insertBefore(host, foot);
    }
    if (order.length) {
      host.innerHTML = '<h4>本页参考文献（按正文出现顺序编号）</h4><ol>' +
        order.map(id => `<li><b>${esc(id)}</b> ${srcFull(id)}</li>`).join('') +
        '</ol><p class="small muted">证据等级与全部书目见 <a href="references.html">参考文献与证据说明</a>。</p>';
    }
  }

  /* ---------- 顶部导航 + 主题 ---------- */
  function renderNav(curFile) {
    const nav = document.getElementById('topnav');
    if (!nav) return;
    let links = ''; let lastGroup = null;
    PAGES.forEach(p => {
      if (p.group !== lastGroup) {
        links += `<span class="nav-group">${esc(p.group)}</span>`;
        lastGroup = p.group;
      }
      links += `<a href="${p.file}" title="${esc(p.title)}" class="${p.file === curFile ? 'cur' : ''}">${esc(p.short)}</a>`;
    });
    nav.innerHTML = `<div class="topnav-inner">
      <span class="brand"><span class="logo">🥗</span>食物 · 健康</span>
      <span class="navlinks">${links}<button id="themeBtn" title="切换明暗主题">🌗</button></span>
    </div>`;
    const root = document.documentElement;
    const saved = store.get('health-theme');
    if (saved) root.dataset.theme = saved;
    const tb = document.getElementById('themeBtn');
    if (tb) tb.addEventListener('click', () => {
      const dark = getComputedStyle(root).colorScheme.includes('dark');
      root.dataset.theme = dark ? 'light' : 'dark';
      store.set('health-theme', root.dataset.theme);
    });
  }

  /* ---------- 页脚 ---------- */
  function footer() {
    if ($('footer.site')) return;
    const f = document.createElement('footer');
    f.className = 'site';
    f.innerHTML = `本站内容为<b>健康科普</b>，不构成医疗建议或诊疗方案；食疗与急救知识均不能替代正规医疗。
食物照片来自 Wikimedia Commons（详见<a href="references.html">参考文献与图片授权</a>）。
每条结论均标注出处与证据等级。<span class="muted">离线静态站点 · 双击 index.html 即可浏览</span>`;
    document.body.appendChild(f);
  }

  /* ---------- 上一页 / 下一页 ---------- */
  function pager(curFile) {
    const i = PAGES.findIndex(p => p.file === curFile);
    if (i < 0) return;
    const prev = PAGES[i - 1], next = PAGES[i + 1];
    const host = document.createElement('div');
    host.className = 'pager';
    host.innerHTML =
      (prev ? `<a href="${prev.file}">← 上一页<br><b>${esc(prev.title)}</b></a>` : '<span></span>') +
      (next ? `<a class="next" href="${next.file}">下一页 →<br><b>${esc(next.title)}</b></a>` : '');
    const foot = $('footer.site');
    (foot ? foot.parentNode : document.body).insertBefore(host, foot || null);
  }

  /* ---------- 学习进度 ---------- */
  const PROG_KEY = 'health-progress';
  function getProgress() {
    try { return JSON.parse(store.get(PROG_KEY) || '{}'); } catch (e) { return {}; }
  }
  function progress(pageFile) {
    const p = getProgress(); p[pageFile] = 1; store.set(PROG_KEY, JSON.stringify(p));
  }
  function progressSummary(node) {
    const host = typeof node === 'string' ? document.getElementById(node) : node;
    if (!host) return;
    const p = getProgress();
    const contentPages = PAGES.filter(x => x.file !== 'index.html' && x.file !== 'references.html' && x.file !== 'quiz.html');
    const n = contentPages.filter(x => p[x.file]).length;
    const pct = Math.round(n / contentPages.length * 100);
    host.innerHTML = `<div class="progress-card">📖 学习进度：<b>${n}</b> / ${contentPages.length} 个知识页面已读
      <div class="bar" style="margin-top:6px"><i style="width:${pct}%"></i></div>
      <span class="muted small">进度保存在本机浏览器（localStorage），清除浏览器数据后会重置。</span></div>`;
  }

  /* ---------- 随堂测 ---------- */
  function quiz(node, items, o = {}) {
    const host = typeof node === 'string' ? document.getElementById(node) : node;
    host.classList.add('quiz');
    let answered = 0, right = 0;
    const wrongIdx = [];
    const score = document.createElement('div');
    score.className = 'q-score';
    const redrawScore = () => {
      score.innerHTML = `已作答 <b>${answered}</b> / ${items.length} 题 · 答对 <b>${right}</b> 题` +
        (answered === items.length
          ? ` <span class="badge ${right === items.length ? 'good' : 'info'}">${right === items.length ? '🏆 全对！' : '完成，回看错题解析'}</span>`
          : '');
      if (answered === items.length && o.id) {
        store.set('health-quiz-' + o.id, JSON.stringify({ right, total: items.length }));
        store.set('health-wrong-' + o.id, JSON.stringify(wrongIdx));
      }
    };
    const reset = document.createElement('button');
    reset.type = 'button'; reset.className = 'btn'; reset.textContent = '↺ 重做';
    reset.addEventListener('click', () => { build(); });
    score.appendChild(reset);

    function build() {
      answered = 0; right = 0;
      host.innerHTML = '';
      if (o.id) {
        const last = store.get('health-quiz-' + o.id);
        if (last) {
          try {
            const j = JSON.parse(last);
            if (j && j.total) {
              const tip = document.createElement('div');
              tip.className = 'hint';
              tip.textContent = `上次成绩：${j.right} / ${j.total}。`;
              host.appendChild(tip);
            }
          } catch (e) { }
        }
      }
      items.forEach((it, qi) => {
        const box = document.createElement('div'); box.className = 'q-item';
        box.innerHTML = `<div class="q-head">第 ${qi + 1} 题 · 单选</div><div class="q-text">${it.q}</div>`;
        const opts = document.createElement('div'); opts.className = 'q-opts';
        const exp = document.createElement('div'); exp.className = 'q-exp';
        it.opts.forEach((t, oi) => {
          const b = document.createElement('button');
          b.type = 'button'; b.innerHTML = t;
          b.addEventListener('click', () => {
            if (box.dataset.done) return;
            box.dataset.done = '1';
            answered++;
            const ok = oi === it.ans;
            if (ok) right++; else wrongIdx.push(qi);
            Array.prototype.slice.call(opts.querySelectorAll('button')).forEach((x, xi) => {
              x.disabled = true;
              if (xi === it.ans) x.classList.add('ok');
              else if (xi === oi && !ok) x.classList.add('no');
            });
            exp.innerHTML = `<b class="${ok ? 'y' : 'n'}">${ok ? '✓ 答对了' : '✗ 正确答案：' + 'ABCD'[it.ans]}</b>　${it.exp}` +
              (it.src && window.HDATA ? `<br>${it.src.map(id => `[${esc(id)}] ${srcFull(id)}`).join('<br>')}` : '');
            exp.classList.add('show');
            redrawScore();
          });
          opts.appendChild(b);
        });
        box.appendChild(opts); box.appendChild(exp);
        host.appendChild(box);
      });
      host.appendChild(score);
      redrawScore();
    }
    build();
  }

  /* ---------- 急救页进入确认层 ---------- */
  const GATE_TEXT = `<p><b>阅读前请务必知悉：</b></p>
<ol>
  <li>本章节内容仅用于<b>野外、灾害、偏远地区等极端缺医少药环境</b>下的应急知识科普，<b>不构成医疗建议</b>，不能替代专业急救培训与医疗机构处置。</li>
  <li><b>凡有可能获得专业救治时，应立即呼救（120 / 当地急救电话）并尽快转运就医</b>，而不是自行处理。</li>
  <li>四条铁律：<b>① 预防优先；② 呼叫专业救援优先；③ 不确定就不做；④ 记录与交接</b>（记录操作时间与经过，交给接手的医务人员）。</li>
  <li>实施任何操作前请评估自身能力与现场安全；不当操作可能造成二次伤害。</li>
  <li>止血带、伤口处理等操作存在风险边界，请严格按文中「适应 / 禁忌」执行。</li>
</ol>`;
  function gate(pageKey) {
    // 顶部永久红色警示条
    const nav = document.getElementById('topnav');
    if (nav) {
      const strip = document.createElement('div');
      strip.className = 'warn-strip';
      strip.innerHTML = '⚠ 本章仅限极端缺医少药环境的应急知识科普，不构成医疗建议 —— 能获得专业救治时请立即呼救就医';
      nav.parentNode.insertBefore(strip, nav.nextSibling);
    }
    if (store.get('health-gate-' + pageKey)) return;
    const g = document.createElement('div');
    g.className = 'gate';
    g.innerHTML = `<div class="gate-card">
      <h2>⚠️ 进入前请阅读本说明</h2>
      <div class="gate-scroll">${GATE_TEXT}</div>
      <label><input type="checkbox" id="gateChk"> 我已阅读并理解以上说明，自愿学习本章应急知识</label>
      <div class="gate-btns">
        <button class="btn primary" id="gateEnter" disabled>进入本章</button>
        <a class="btn" href="index.html">离开，返回首页</a>
      </div>
    </div>`;
    document.body.appendChild(g);
    const chk = g.querySelector('#gateChk'), enter = g.querySelector('#gateEnter');
    chk.addEventListener('change', () => { enter.disabled = !chk.checked; });
    enter.addEventListener('click', () => {
      store.set('health-gate-' + pageKey, '1');
      g.remove();
    });
  }

  /* ---------- 急救分步演示器 ----------
       cfg = { title, steps: [{svg:'<svg…>', text:'…', warn:'…'}] } */
  function stepper(node, cfg) {
    const host = typeof node === 'string' ? document.getElementById(node) : node;
    if (!host || !cfg || !cfg.steps || !cfg.steps.length) return;
    let i = 0;
    host.classList.add('step-player');
    function draw() {
      const s = cfg.steps[i];
      host.innerHTML = `
        <div class="sp-title">${esc(cfg.title || '')}</div>
        <div class="sp-step-no">步骤 ${i + 1} / ${cfg.steps.length}${s.name ? ' · ' + esc(s.name) : ''}</div>
        <div class="sp-svg">${s.svg || ''}</div>
        <div class="sp-text">${s.text || ''}</div>
        ${s.warn ? `<div class="sp-warn">⛔ ${s.warn}</div>` : ''}
        <div class="sp-ctrl">
          <button class="btn" data-a="prev" ${i === 0 ? 'disabled' : ''}>← 上一步</button>
          <button class="btn primary" data-a="next" ${i === cfg.steps.length - 1 ? 'disabled' : ''}>下一步 →</button>
          <div class="sp-dots">${cfg.steps.map((x, k) =>
            `<i data-k="${k}" class="${k === i ? 'on' : (k < i ? 'done' : '')}" title="步骤 ${k + 1}"></i>`).join('')}</div>
        </div>`;
      host.querySelector('[data-a="prev"]').addEventListener('click', () => { if (i > 0) { i--; draw(); } });
      host.querySelector('[data-a="next"]').addEventListener('click', () => { if (i < cfg.steps.length - 1) { i++; draw(); } });
      $$('.sp-dots i', host).forEach(d => d.addEventListener('click', () => { i = +d.getAttribute('data-k'); draw(); }));
    }
    draw();
  }

  /* ---------- 配对查询器（数据源 HDATA.PAIRS / FOODS / DRUGS） ---------- */
  function pairFinder(node) {
    const host = typeof node === 'string' ? document.getElementById(node) : node;
    if (!host || !window.HDATA) return;
    host.classList.add('pair-box');
    const D = window.HDATA;
    const foods = (D.FOODS || []).map(f => ({ id: f.id, name: f.name, isDrug: false }));
    const drugs = (D.DRUGS || []).map(d => ({ id: d.id, name: d.name, isDrug: true }));
    const all = foods.concat(drugs);
    host.innerHTML = `
      <h3>🔍 配对查询器</h3>
      <p class="small muted">选择两种食物，或一种食物 + 一种常见药物，查询搭配建议。结果均附机理与证据等级；<b>未收录的组合不代表安全或不安全</b>，仅表示暂无可靠证据记载，不应臆断。</p>
      <div class="pair-pickers">
        <select id="pf-a">${all.map(x => `<option value="${esc(x.id)}" data-drug="${x.isDrug ? 1 : 0}">${x.isDrug ? '💊 ' : ''}${esc(x.name)}</option>`).join('')}</select>
        <span>＋</span>
        <select id="pf-b">${all.map(x => `<option value="${esc(x.id)}" data-drug="${x.isDrug ? 1 : 0}">${x.isDrug ? '💊 ' : ''}${esc(x.name)}</option>`).join('')}</select>
        <button class="btn primary" id="pf-go">查询搭配</button>
      </div>
      <div class="pair-result" id="pf-res"></div>`;
    const selA = host.querySelector('#pf-a'), selB = host.querySelector('#pf-b');
    selB.selectedIndex = Math.min(1, selB.options.length - 1);
    host.querySelector('#pf-go').addEventListener('click', () => {
      const a = selA.value, b = selB.value;
      const res = host.querySelector('#pf-res');
      if (a === b) { res.innerHTML = '<p>请选择两种<b>不同</b>的条目。</p>'; return; }
      const p = (D.PAIRS || []).find(x => (x.a === a && x.b === b) || (x.a === b && x.b === a));
      if (!p) {
        res.innerHTML = `<p><span class="verdict neutral">暂无记载</span></p>
          <p>本站数据库未收录这对组合的可靠证据或典籍记载。<b>「没有证据」不等于「安全」也不等于「相克」</b>——不应据此臆断。若涉及正在服用的药物，请咨询医生或药师。</p>`;
        return;
      }
      res.innerHTML = `
        <p>${verdictBadge(p.verdict)} ${badgeLevel(p.level)}</p>
        <p><b>机理与建议：</b>${p.modern || '—'}</p>
        ${p.tcm ? `<p><b>中医角度：</b>${p.tcm}</p>` : ''}
        ${p.tip ? `<div class="keypoint"><b>实操提示</b>：${p.tip}</div>` : ''}
        ${p.drugWarn ? `<div class="danger"><span class="dt">⛔ 用药安全提醒</span>：${p.drugWarn}</div>` : ''}
        <p class="small muted">来源：${(p.src || []).map(id => esc(id)).join('、')}（详见页脚参考文献与 references.html）</p>`;
    });
  }

  /* ---------- 食物翻转卡片 ---------- */
  const CAT_NAME = {
    grain: '谷薯类', bean: '豆类与豆制品', veg: '蔬菜', fruit: '水果',
    nut: '坚果与种子', animal: '动物性食品', oil: '油脂与调味'
  };
  function foodById(id) {
    const D = window.HDATA;
    if (!D) return null;
    return (D.FOODS || []).find(f => f.id === id) || null;
  }
  function foodFlip(f) {
    if (!f) return '';
    const n = f.nutrients || {};
    const tcmHtml = f.tcm
      ? `<div class="sec-t">性味归经（传统记载）</div>
         <p>${esc(f.tcm.nature)} · ${esc(f.tcm.flavor)} · 归${esc(f.tcm.meridian)}经　${badgeLevel(f.tcm.level || 'C')}</p>
         <p>${esc(f.tcm.func || '')}</p>`
      : '';
    const benHtml = (f.benefits || []).map(b => `<p>• ${esc(b.text)} ${badgeLevel(b.level)}</p>`).join('');
    const pairs = [];
    (f.pairs_good || []).forEach(id => { const g = foodById(id); if (g) pairs.push(`<a href="foods.html">✅${esc(g.name)}</a>`); });
    (f.pairs_bad || []).forEach(id => { const g = foodById(id); if (g) pairs.push(`<span class="muted">⚠️${esc(g.name)}</span>`); });
    const front = `
      <div class="face front">
        ${f.photo ? `<img class="photo" src="${esc(f.photo)}" alt="${esc(f.name)}" loading="lazy" onerror="this.outerHTML='<div class=\\'emoji-hero\\'>${esc(f.emoji || '🍽️')}</div>'">`
        : `<div class="emoji-hero">${esc(f.emoji || '🍽️')}</div>`}
        <div class="fname">${esc(f.name)}</div>
        ${f.alias && f.alias.length ? `<div class="falias">别名：${esc(f.alias.join('、'))}</div>` : ''}
        <div class="fmeta">${esc(CAT_NAME[f.cat] || '')}　·　${n.energy != null ? esc(fmt(n.energy, 0)) + ' kcal/100g' : ''}${n.gi != null ? '　·　GI ' + esc(fmt(n.gi, 0)) : ''}</div>
        ${(() => { const c = (window.IMG_CREDITS && window.IMG_CREDITS[f.id]) || f.credit; return f.photo && c ? `<div class="credit">${esc(c)}</div>` : ''; })()}
        <div class="flip-hint">点击卡片翻面查看详情 ↻</div>
      </div>`;
    const back = `
      <div class="face back">
        <h4>${esc(f.name)} <span class="muted small">${esc(CAT_NAME[f.cat] || '')}</span></h4>
        ${tcmHtml}
        <div class="sec-t">每 100g 主要成分（近似值）</div>
        <div class="rowline"><span>能量</span><b>${fmt(n.energy, 0)} kcal</b></div>
        <div class="rowline"><span>蛋白质</span><b>${fmt(n.protein)} g</b></div>
        <div class="rowline"><span>脂肪</span><b>${fmt(n.fat)} g</b></div>
        <div class="rowline"><span>碳水化合物</span><b>${fmt(n.carb)} g</b></div>
        <div class="rowline"><span>膳食纤维</span><b>${fmt(n.fiber)} g</b></div>
        ${n.gi != null ? `<div class="rowline"><span>血糖生成指数 GI</span><b>${fmt(n.gi, 0)}</b></div>` : ''}
        ${n.notable ? `<div class="sec-t">突出营养素</div><p>${esc(n.notable)}</p>` : ''}
        ${benHtml ? `<div class="sec-t">健康作用（按证据等级）</div>${benHtml}` : ''}
        ${f.caution ? `<div class="sec-t">食用注意</div><p>⚠️ ${esc(f.caution)}</p>` : ''}
        ${f.serve ? `<div class="sec-t">推荐吃法</div><p>${esc(f.serve)}</p>` : ''}
        ${pairs.length ? `<div class="sec-t">经典搭配</div><p>${pairs.join('　')}</p>` : ''}
        <p class="muted small">成分：${esc(n.src || 'S2')}；性味：${f.tcm ? esc(f.tcm.src || 'S3') : '—'}</p>
      </div>`;
    return `<div class="flip"><div class="flip-inner">${front}${back}</div></div>`;
  }
  /* 卡片点击翻面（事件委托，页面调用一次即可） */
  function bindFlip(root) {
    (root || document).addEventListener('click', e => {
      const card = e.target.closest ? e.target.closest('.flip') : null;
      if (card) card.classList.toggle('flipped');
    });
  }

  /* ---------- 疾病路径图（疾病 → 饮食目标 → 推荐食物） ----------
     HUI.pathMap(node, list)：list 为 DISEASES 子集；点击上方疾病切换图形 */
  function pathMap(node, list) {
    const host = typeof node === 'string' ? document.getElementById(node) : node;
    if (!host || !list || !list.length) return;
    let cur = list[0];
    const LV_COLOR = { A: 'var(--cg)', B: 'var(--c3)', C: 'var(--cw)', D: 'var(--cc)' };
    function esc2(s) { return esc(s).replace(/<b>/g, '').replace(/<\/b>/g, ''); }
    function draw() {
      const rec = (cur.recommend || []).map(r => {
        const fo = foodById(r.food);
        return { name: fo ? fo.name : r.food, level: r.level, why: r.why, cls: LV_COLOR[r.level] || 'var(--axis)' };
      });
      const tg = (cur.targets || []).map(esc2);
      const rowH = 40, W = 900;
      const rows = Math.max(rec.length, tg.length, 1);
      const H = Math.max(260, rows * rowH + 56);
      let s = `<svg viewBox="0 0 ${W} ${H}" style="width:100%;min-width:700px">`;
      const cx0 = 24, cw0 = 156, cx1 = 240, cw1 = 250, cx2 = 620, cw2 = 250;
      const cyD = H / 2 - 26;
      s += `<rect x="${cx0}" y="${cyD}" width="${cw0}" height="52" rx="12" fill="var(--c8)" fill-opacity="0.88"></rect>
            <text x="${cx0 + cw0 / 2}" y="${cyD + 30}" text-anchor="middle" font-size="15" font-weight="700" fill="var(--surface)">${esc2(cur.name)}</text>`;
      const tgY = i => 18 + i * ((H - 36 - 40) / Math.max(tg.length - 1, 1) || 0);
      tg.forEach((t, i) => {
        const y = tg.length === 1 ? H / 2 - 19 : tgY(i);
        s += `<line x1="${cx0 + cw0}" y1="${cyD + 26}" x2="${cx1}" y2="${y + 19}" stroke="var(--axis)" stroke-width="1.4"></line>`;
        s += `<rect x="${cx1}" y="${y}" width="${cw1}" height="38" rx="10" fill="var(--tint1)" stroke="var(--c1)"></rect>`;
        wrapText(t, 26).forEach((seg, k) => {
          s += `<text x="${cx1 + cw1 / 2}" y="${y + 16 + k * 14}" text-anchor="middle" font-size="12.5" fill="var(--ink2)">${seg}</text>`;
        });
      });
      rec.forEach((r, i) => {
        const y = 10 + i * rowH;
        tg.forEach((t, ti) => {
          const ty = tg.length === 1 ? H / 2 - 19 : tgY(ti);
          s += `<line x1="${cx1 + cw1}" y1="${ty + 19}" x2="${cx2}" y2="${y + 16}" stroke="var(--grid)" stroke-width="1"></line>`;
        });
        s += `<rect x="${cx2}" y="${y}" width="${cw2}" height="33" rx="9" fill="var(--surface)" stroke="${r.cls}" stroke-width="1.6"><title>${esc2(r.name)}：${esc2(r.why)}</title></rect>`;
        s += `<text x="${cx2 + 10}" y="${y + 22}" font-size="13" fill="var(--ink)">${esc2(r.name)} <tspan fill="${r.cls}" font-weight="700">${r.level}</tspan></text>`;
      });
      s += `</svg>`;
      const chips = list.map(d => `<span class="chip btn ${d.id === cur.id ? 'on' : ''}" data-d="${esc(d.id)}">${esc(d.name)}</span>`).join('');
      host.innerHTML = `<div class="chips">${chips}</div><div class="pathmap">${s}</div>
        <p class="small muted">食物块颜色 = 证据等级（绿A / 青B / 黄C）；悬停查看推荐理由。</p>`;
      Array.prototype.forEach.call(host.querySelectorAll('.chip'), c => {
        c.addEventListener('click', () => {
          cur = list.find(d => d.id === c.getAttribute('data-d')) || cur;
          draw();
        });
      });
    }
    function wrapText(t, max) {
      const out = [];
      let cur = '';
      for (const ch of t) {
        cur += ch;
        if (cur.length >= max) { out.push(cur); cur = ''; }
      }
      if (cur) out.push(cur);
      return out.slice(0, 2);
    }
    draw();
  }

  /* ---------- 基础控件（沿用交互课堂语义的精简版） ---------- */
  function btn(parent, text, onClick, o = {}) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn' + (o.primary ? ' primary' : ''); b.innerHTML = text;
    b.addEventListener('click', onClick);
    (typeof parent === 'string' ? document.getElementById(parent) : parent).appendChild(b);
    return b;
  }
  function seg(parent, options, o = {}) {
    const wrap = document.createElement('div');
    wrap.className = 'seg'; if (o.cls) wrap.classList.add(o.cls);
    const btns = options.map((t, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.innerHTML = t;
      if (i === (o.value != null ? o.value : 0)) b.classList.add('on');
      b.addEventListener('click', () => {
        btns.forEach(x => x.classList.remove('on')); b.classList.add('on');
        if (o.on) o.on(i, t);
      });
      return b;
    });
    btns.forEach(b => wrap.appendChild(b));
    (typeof parent === 'string' ? document.getElementById(parent) : parent).appendChild(wrap);
    return {
      btns,
      get: () => btns.findIndex(b => b.classList.contains('on')),
      set(i) { btns.forEach(x => x.classList.remove('on')); btns[i].classList.add('on'); }
    };
  }
  function slider(parent, o) {
    const row = document.createElement('div');
    row.className = 'ctl-row';
    const lab = document.createElement('span'); lab.className = 'ctl-label'; lab.innerHTML = o.label || '';
    const inp = document.createElement('input');
    inp.type = 'range'; inp.min = o.min; inp.max = o.max;
    inp.step = o.step != null ? o.step : 1; inp.value = o.value != null ? o.value : o.min;
    const out = document.createElement('output');
    const upd = () => { out.textContent = (o.fmt || (v => fmt(v, 0)))(+inp.value); };
    inp.addEventListener('input', () => { upd(); if (o.on) o.on(+inp.value); });
    upd();
    row.appendChild(lab); row.appendChild(inp); row.appendChild(out);
    (typeof parent === 'string' ? document.getElementById(parent) : parent).appendChild(row);
    return {
      row, get: () => +inp.value,
      set(v) { inp.value = v; upd(); },
      on(cb) { inp.addEventListener('input', () => cb(+inp.value)); return this; }
    };
  }
  function chips(node, pairs) {
    const host = typeof node === 'string' ? document.getElementById(node) : node;
    if (!host) return host;
    host.className = 'chips';
    if (pairs) host.innerHTML = pairs.map(([k, v, cls]) => `<span class="chip ${cls || ''}">${k}${v}</span>`).join('');
    return host;
  }

  return {
    PAGES, esc, fmt, $, $$, store,
    badgeLevel, verdictBadge, srcFull, srcShort, cite, LEVEL_NAME,
    renderNav, footer, pager, progress, progressSummary,
    quiz, gate, stepper, pairFinder, pathMap,
    foodById, foodFlip, bindFlip, CAT_NAME,
    btn, seg, slider, chips
  };
})();

// const 声明不挂 window —— 显式暴露，供页面 ES5 自检横幅检测
window.HUI = HUI;

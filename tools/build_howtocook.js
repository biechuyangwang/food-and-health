/* build_howtocook.js — 将稀疏克隆的 HowToCook 仓库（tools/.hc_tmp，仅 markdown）
   构建为离线可用的静态资源：
     assets/howtocook/index.js     分类索引 + 元信息（仓库/commit/许可）
     assets/howtocook/<分类>.js    window.HC_DATA[分类] = [{t,p,md}, ...]
     assets/howtocook/LICENSE.txt  原仓库许可证（Unlicense）
   约定：全部字符串经 JSON.stringify 转义；生成后逐个 node --check 自检。
   用法：先稀疏克隆（见 README），再 node tools/build_howtocook.js */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(__dirname, '.hc_tmp');
const OUT = path.join(ROOT, 'assets', 'howtocook');

const CAT_NAME = {
  aquatic: '水产', breakfast: '早餐', condiment: '酱料与调味', dessert: '甜点',
  drink: '饮品', meat_dish: '荤菜', 'semi-finished': '半成品加工', soup: '汤羹',
  staple: '主食', vegetable_dish: '素菜', template: '模板（跳过）'
};
const CAT_ORDER = ['meat_dish', 'vegetable_dish', 'aquatic', 'soup', 'staple', 'breakfast', 'dessert', 'drink', 'condiment', 'semi-finished'];
const SKIP = ['template'];

function walk(dir, base, acc) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(e => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, acc);
    else if (e.name.toLowerCase().endsWith('.md')) acc.push(path.relative(base, p).replace(/\\/g, '/'));
  });
  return acc;
}

function build() {
  const commit = execSync('git rev-parse --short HEAD', { cwd: SRC }).toString().trim();
  const dishesDir = path.join(SRC, 'dishes');
  const files = walk(dishesDir, dishesDir, []);
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

  const byCat = {};
  files.forEach(rel => {
    const cat = rel.split('/')[0];
    if (SKIP.includes(cat)) return;
    (byCat[cat] = byCat[cat] || []).push(rel);
  });

  const cats = [];
  Object.keys(byCat).sort((a, b) => {
    const ia = CAT_ORDER.indexOf(a), ib = CAT_ORDER.indexOf(b);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  }).forEach(cat => {
    const items = byCat[cat].map(rel => {
      const base = rel.replace(/\.md$/i, '');
      return { t: base.split('/').pop(), p: rel, md: fs.readFileSync(path.join(dishesDir, rel), 'utf8') };
    }).sort((a, b) => a.t.localeCompare(b.t, 'zh'));
    const safeKey = cat.replace(/[^a-z_]/gi, '');
    const js = `/* HowToCook 分类数据：${CAT_NAME[cat] || cat}（${items.length} 篇）——自动生成 */\n` +
      `window.HC_DATA = window.HC_DATA || {};\n` +
      `window.HC_DATA[${JSON.stringify(safeKey)}] = ${JSON.stringify(items)};\n`;
    fs.writeFileSync(path.join(OUT, safeKey + '.js'), js);
    execSync(`node --check "${path.join(OUT, safeKey + '.js')}"`);
    cats.push({ key: safeKey, dir: cat, name: CAT_NAME[cat] || cat, count: items.length });
  });

  const total = cats.reduce((s, c) => s + c.count, 0);
  const indexJs = `/* HowToCook 离线索引 —— 自动生成（tools/build_howtocook.js） */\n` +
    `window.HC_INDEX = ${JSON.stringify({
      repo: 'https://github.com/Anduin2017/HowToCook',
      commit: commit,
      snapshot: '2026-08-20',
      license: 'Unlicense（公有领域）',
      total: total,
      cats: cats
    }, null, 1)};\n`;
  fs.writeFileSync(path.join(OUT, 'index.js'), indexJs);
  execSync(`node --check "${path.join(OUT, 'index.js')}"`);
  fs.copyFileSync(path.join(SRC, 'LICENSE'), path.join(OUT, 'LICENSE.txt'));

  console.log(`完成：${total} 篇菜谱，${cats.length} 个分类 → assets/howtocook/`);
  cats.forEach(c => console.log(`  ${c.name}: ${c.count}`));
}
build();

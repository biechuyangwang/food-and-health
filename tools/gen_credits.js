/* gen_credits.js — 从 tools/photo_state.json 重新生成 assets/img/credits.js 与 CREDITS.md
   字符串一律用 JSON.stringify 生成（对撇号/反斜杠/引号天然安全，杜绝手工转义出错）。
   用法：node tools/gen_credits.js */
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG = path.join(ROOT, 'assets', 'img');
const state = JSON.parse(fs.readFileSync(path.join(__dirname, 'photo_state.json'), 'utf8'));

const all = Object.values(state).filter(r => {
  const p = path.join(IMG, r.id + '.jpg');
  return fs.existsSync(p) && fs.statSync(p).size > 4000;
}).map(r => {
  const artist = /^no machine-readable/i.test(r.artist) ? '见 Commons 文件页' : r.artist;
  return Object.assign({}, r, { artist, credit: `图：${artist}（${r.license}），via Wikimedia Commons` });
});

/* credits.js —— 页面署名用 */
fs.writeFileSync(path.join(IMG, 'credits.js'),
  '/* 自动生成：Commons 图片署名（tools/gen_credits.js；勿手改，重跑脚本即可） */\n' +
  'window.IMG_CREDITS = {\n' +
  all.map(r => '  ' + JSON.stringify(r.id) + ': ' + JSON.stringify(r.credit)).join(',\n') +
  '\n};\n');

/* CREDITS.md —— 完整授权表 */
const cell = s => String(s).replace(/[\[\]|]/g, '');
fs.writeFileSync(path.join(IMG, 'CREDITS.md'),
  '# 图片来源与授权（Wikimedia Commons）\n\n' +
  '本站食物照片均来自 Wikimedia Commons，遵循各自许可协议，本地缓存为缩略图。\n' +
  '下表由 tools/gen_credits.js 自动生成；页面卡片底部同步显示署名。\n\n' +
  '| 文件 | Commons 原始页面 | 作者 | 许可 |\n|---|---|---|---|\n' +
  all.map(r => `| img/${r.id}.jpg | [${cell(r.title)}](${r.pageUrl}) | ${cell(r.artist)} | ${cell(r.license)} |`).join('\n') + '\n');

console.log('credits.js / CREDITS.md 已重新生成：' + all.length + ' 条');

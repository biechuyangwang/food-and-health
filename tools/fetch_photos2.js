/* fetch_photos2.js — 绕开被限流的 api.php：
   1) en.wikipedia REST summary 取条目首图（jpg 才要）
   2) 构造 upload.wikimedia.org 缩略图直链下载（CDN 限额宽裕）
   3) Commons 文件页 HTML 解析作者与许可（页面走 CDN，不占 api 限额）
   用法：node tools/fetch_photos2.js   （与 fetch_photos.js 共用 photo_state.json，已有则跳过） */
'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');
const STATE = path.join(__dirname, 'photo_state.json');
const UA = 'OfflineHealthSite/1.0 (educational static site)';
const WIDTH = 560;

/* id → Wikipedia 条目标题 */
const MAP = {
  oat: 'Oat', brownrice: 'Brown rice', millet: 'Millet', corn: 'Sweet corn', buckwheat: 'Buckwheat',
  sweetpotato: 'Sweet potato', yam: 'Chinese yam', potato: 'Potato',
  soybean: 'Soybean', blackbean: 'Black soybean', mungbean: 'Mung bean', tofu: 'Tofu', soymilk: 'Soy milk',
  spinach: 'Spinach', broccoli: 'Broccoli', tomato: 'Tomato', carrot: 'Carrot', garlic: 'Garlic',
  onion: 'Onion', ginger: 'Ginger', daikon: 'Daikon', bittergourd: 'Momordica charantia',
  celery: 'Celery', shiitake: 'Shiitake', kelp: 'Kombu',
  apple: 'Apple', pear: 'Pear', banana: 'Banana', orange: 'Orange (fruit)', kiwi: 'Kiwifruit',
  hawthorn: 'Crataegus', mulberry: 'Morus (plant)', grape: 'Grape', persimmon: 'Persimmon', grapefruit: 'Grapefruit',
  walnut: 'Walnut', almond: 'Almond', blacksesame: 'Sesame', flaxseed: 'Flax',
  egg: 'Egg as food', milk: 'Milk', yogurt: 'Yogurt', salmon: 'Salmon as food', sardine: 'Sardine as food',
  oyster: 'Oyster as food', porkliver: 'Liver as food', chickenbreast: 'Chicken as food',
  crab: 'Crab as food', shrimp: 'Shrimp',
  oliveoil: 'Olive oil', camelliaoil: 'Tea seed oil', honey: 'Honey', tea: 'Green tea', coffee: 'Coffee'
};

const sleep = ms => new Promise(r => setTimeout(r, ms));
const stripTags = s => String(s || '').replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'")
  .replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();

function get(url, asBuffer) {
  return new Promise((resolve, reject) => {
    const follow = (u, depth) => {
      https.get(u, { headers: { 'User-Agent': UA, Accept: asBuffer ? 'image/*' : 'text/html,application/json' }, timeout: 25000 }, res => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && depth < 5) {
          res.resume();
          return follow(new URL(res.headers.location, u).href, depth + 1);
        }
        if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode + ' ' + u.slice(0, 90))); }
        const chunks = [];
        res.on('data', d => chunks.push(d));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('timeout', function () { this.destroy(new Error('timeout')); }).on('error', reject);
    };
    follow(url, 0);
  });
}

async function restSummary(title) {
  const url = 'https://en.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(title.replace(/ /g, '_'));
  for (let a = 0; a < 3; a++) {
    try {
      const buf = await get(url);
      return JSON.parse(buf.toString('utf8'));
    } catch (e) {
      if (/429/.test(e.message) && a < 2) { console.log('  …REST 429，等待 45s'); await sleep(45000); continue; }
      throw e;
    }
  }
}
function thumbUrl(sum) {
  const t = sum.thumbnail && sum.thumbnail.source;
  if (!t) return null;
  const tq = t.split('?')[0].split('#')[0];
  if (!/\.(jpe?g)$/i.test(tq)) return null; /* 首图不是 JPEG（多为 SVG） */
  const ow = (sum.originalimage && sum.originalimage.width) || WIDTH;
  const w = Math.min(WIDTH, Math.max(200, ow));
  if (/\/\d+px-/.test(tq)) return tq.replace(/\/\d+px-/, '/' + w + 'px-');
  return tq; /* 本身就是原图直链 */
}
const isJpg = u => /\.(jpe?g)(\?|$|#)/i.test(u);
async function filePageInfo(fileTitle) {
  try {
    const html = (await get('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fileTitle))).toString('utf8');
    const aut = html.match(/fileinfotpl_aut[^>]*>[\s\S]{0,600}?<td[^>]*>([\s\S]*?)<\/td>/i);
    const lic = html.match(/fileinfotpl_lic[^>]*>[\s\S]{0,600}?<td[^>]*>([\s\S]*?)<\/td>/i);
    let licTxt = lic ? stripTags(lic[1]) : '';
    if (!licTxt) {
      const l2 = html.match(/class="licensetpl_short"[^>]*>\s*([^<]{2,40})\s*</);
      if (l2) licTxt = l2[1].trim();
    }
    let autTxt = aut ? stripTags(aut[1]) : '';
    if (autTxt.length > 60) autTxt = autTxt.slice(0, 57) + '…';
    return { artist: autTxt || '见 Commons 文件页', license: licTxt || '见 Commons 文件页' };
  } catch (e) {
    return { artist: '见 Commons 文件页', license: '见 Commons 文件页' };
  }
}

(async () => {
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
  let state = {};
  if (fs.existsSync(STATE)) { try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch (e) { } }
  const ok = [], fail = [];
  for (const id of Object.keys(MAP)) {
    const dest = path.join(IMG_DIR, id + '.jpg');
    if (state[id] && fs.existsSync(dest) && fs.statSync(dest).size > 5000) { ok.push(state[id]); continue; }
    try {
      const sum = await restSummary(MAP[id]);
      const turl = thumbUrl(sum);
      if (!turl) throw new Error('首图非 JPG（' + ((sum.thumbnail && sum.thumbnail.source) ? decodeURIComponent(sum.thumbnail.source.split('?')[0].split('/').pop()).slice(0, 34) : '无首图') + '）');
      const seg = turl.split('?')[0].split('/');
      const fileTitle = decodeURIComponent(seg[seg.length - 1].replace(/^\d+px-/, ''));
      /* upload CDN 只允许固定缩略图档位（其余尺寸 400）——走 Special:FilePath 让服务器重定向到合法档位 */
      const dlUrl = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(fileTitle) + '?width=560';
      const img = await get(dlUrl, true);
      if (img.length < 4000) throw new Error('文件过小');
      fs.writeFileSync(dest, img);
      const info = await filePageInfo(fileTitle);
      const rec = { id, title: 'File:' + fileTitle, pageUrl: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fileTitle),
        thumb: dlUrl, artist: info.artist, license: info.license };
      state[id] = rec;
      fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
      ok.push(rec);
      console.log(`✓ ${id} ← ${rec.title} [${rec.license}] ${Math.round(img.length / 1024)}KB`);
    } catch (e) {
      fail.push(id);
      console.log(`✗ ${id}：${e.message}`);
    }
    await sleep(3200);
  }
  /* 授权文件生成统一交给 gen_credits.js（JSON.stringify 转义，杜绝撇号类语法错误） */
  require('child_process').execSync('node tools/gen_credits.js', { cwd: ROOT, stdio: 'inherit' });
  const all = Object.values(state).filter(r => {
    const p = path.join(IMG_DIR, r.id + '.jpg');
    return fs.existsSync(p) && fs.statSync(p).size > 4000;
  });
  console.log(`\n完成：可用照片 ${all.length} / ${Object.keys(MAP).length}；失败：${fail.join(', ') || '无'}`);
})().catch(e => { console.error('FATAL', e); process.exit(1); });

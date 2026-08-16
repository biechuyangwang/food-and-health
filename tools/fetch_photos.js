/* fetch_photos.js — 从 Wikimedia Commons 自动搜索、下载食物照片并记录授权（限流友好版）
   用法：node tools/fetch_photos.js
   特性：每项仅 2 次 API 调用（搜索 + 批量 imageinfo）、串行 1.2s 间隔、
         429 按 Retry-After 退避重试、状态文件断点续传（tools/photo_state.json）。
   产物：assets/img/<id>.jpg + assets/img/CREDITS.md + assets/img/credits.js */
'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');
const STATE = path.join(__dirname, 'photo_state.json');
const UA = 'OfflineHealthSite/1.0 (educational static site; respectful serial API use)';
const WIDTH = 560;
const STEP_MS = 5000;

const MANIFEST = [
  ['oat', 'rolled oats'], ['brownrice', 'brown rice'], ['millet', 'millet grains'],
  ['corn', 'sweet corn cobs'], ['buckwheat', 'buckwheat groats'], ['sweetpotato', 'sweet potato'],
  ['yam', 'Chinese yam vegetable'], ['potato', 'raw potatoes'],
  ['soybean', 'dried soybeans'], ['blackbean', 'black soybeans'], ['mungbean', 'mung beans'],
  ['tofu', 'tofu block'], ['soymilk', 'soy milk glass'],
  ['spinach', 'spinach leaves'], ['broccoli', 'broccoli vegetable'], ['tomato', 'tomatoes'],
  ['carrot', 'carrots'], ['garlic', 'garlic bulbs'], ['onion', 'onions bulbs'],
  ['ginger', 'ginger root'], ['daikon', 'daikon radish'], ['bittergourd', 'bitter gourd'],
  ['celery', 'celery stalks'], ['shiitake', 'shiitake mushrooms'], ['kelp', 'kombu kelp'],
  ['apple', 'red apples fruit'], ['pear', 'pears fruit'], ['banana', 'bananas fruit'],
  ['orange', 'oranges fruit'], ['kiwi', 'kiwifruit'], ['hawthorn', 'hawthorn berries'],
  ['mulberry', 'mulberries fruit'], ['grape', 'grapes fruit'], ['persimmon', 'persimmon fruit'],
  ['grapefruit', 'grapefruit'],
  ['walnut', 'walnuts kernels'], ['almond', 'almonds nuts'], ['blacksesame', 'black sesame seeds'],
  ['flaxseed', 'flax seeds'],
  ['egg', 'chicken eggs'], ['milk', 'glass of milk'], ['yogurt', 'yogurt bowl'],
  ['salmon', 'raw salmon fillet'], ['sardine', 'sardines fish'], ['oyster', 'oysters food'],
  ['porkliver', 'pork liver food'], ['chickenbreast', 'raw chicken breast'], ['crab', 'cooked crab'],
  ['shrimp', 'raw shrimp'],
  ['oliveoil', 'olive oil bottle'], ['camelliaoil', 'camellia seed oil'], ['honey', 'honey jar'],
  ['tea', 'green tea cup'], ['coffee', 'black coffee cup']
];

const sleep = ms => new Promise(r => setTimeout(r, ms));
const stripHTML = s => String(s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

function rawGet(url, redirects) {
  return new Promise((resolve, reject) => {
    const opts = { headers: { 'User-Agent': UA }, timeout: 30000 };
    https.get(url, opts, res => {
      if (redirects && [301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        res.resume();
        const next = new URL(res.headers.location, url).href;
        return resolve(rawGet(next, redirects));
      }
      if (res.statusCode === 429) {
        const wait = (parseInt(res.headers['retry-after'], 10) || 30) + 2;
        res.resume();
        return reject(Object.assign(new Error('429'), { retryAfter: wait * 1000 }));
      }
      if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
      resolve(res);
    }).on('timeout', function () { this.destroy(new Error('timeout')); }).on('error', reject);
  });
}
async function getJSON(url) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const res = await rawGet(url, false);
      let buf = '';
      res.setEncoding('utf8');
      res.on('data', d => buf += d);
      await new Promise((ok, err) => { res.on('end', ok); res.on('error', err); });
      return JSON.parse(buf);
    } catch (e) {
      if (e.retryAfter && attempt < 7) { console.log(`  …429 限流，等待 ${e.retryAfter / 1000}s（第 ${attempt + 1} 次重试）`); await sleep(e.retryAfter + 3000); continue; }
      throw e;
    }
  }
}
async function download(url, dest) {
  const res = await rawGet(url, true);
  const out = fs.createWriteStream(dest);
  res.pipe(out);
  await new Promise((ok, err) => { out.on('finish', () => out.close(ok)); out.on('error', err); });
}

/* 搜索一次 + 批量 imageinfo 一次，按搜索顺序挑首个「JPEG + 有许可」的结果 */
async function pick(id, query) {
  const surl = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&list=search&srnamespace=6&srlimit=10&srsearch=' +
    encodeURIComponent(query);
  const sr = await getJSON(surl);
  const hits = ((sr.query && sr.query.search) || []).filter(h => /\.(jpe?g)$/i.test(h.title));
  if (!hits.length) throw new Error('无 JPEG 搜索结果');
  const titles = hits.map(h => h.title).join('|');
  const iurl = 'https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url|mime|extmetadata&iiurlwidth=' + WIDTH +
    '&titles=' + encodeURIComponent(titles);
  const info = await getJSON(iurl);
  const pages = (info.query && info.query.pages) || {};
  const byTitle = {};
  Object.keys(pages).forEach(k => {
    const p = pages[k];
    if (p.imageinfo) byTitle[p.title] = p.imageinfo[0];
  });
  for (const h of hits) {
    const ii = byTitle[h.title];
    if (!ii || ii.mime !== 'image/jpeg') continue;
    const meta = ii.extmetadata || {};
    const lic = stripHTML((meta.LicenseShortName && meta.LicenseShortName.value) || '');
    if (!lic) continue;
    const artist = stripHTML((meta.Artist && meta.Artist.value) || '未知作者');
    return { id, title: h.title, pageUrl: ii.descriptionurl, thumb: ii.thumburl || ii.url, artist, license: lic };
  }
  throw new Error('候选均不满足（非 JPEG 或无许可信息）');
}

(async () => {
  if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
  let state = {};
  if (fs.existsSync(STATE)) { try { state = JSON.parse(fs.readFileSync(STATE, 'utf8')); } catch (e) { } }
  let done = 0, failed = [];
  for (const [id, query] of MANIFEST) {
    const dest = path.join(IMG_DIR, id + '.jpg');
    if (state[id] && fs.existsSync(dest) && fs.statSync(dest).size > 5000) { done++; continue; }
    try {
      const r = await pick(id, query);
      await download(r.thumb, dest);
      const size = fs.statSync(dest).size;
      if (size < 4000) { fs.unlinkSync(dest); throw new Error('文件过小 ' + size); }
      state[id] = r;
      fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
      console.log(`✓ ${id} ← ${r.title} [${r.license}] ${Math.round(size / 1024)}KB`);
      done++;
    } catch (e) {
      failed.push(id);
      console.log(`✗ ${id}：${e.message}${e.retryAfter ? '' : ''}`);
    }
    await sleep(STEP_MS);
  }
  /* 仅对「文件真实存在」的条目生成署名 */
  const ok = Object.values(state).filter(r => {
    const p = path.join(IMG_DIR, r.id + '.jpg');
    return fs.existsSync(p) && fs.statSync(p).size > 4000;
  });
  fs.writeFileSync(path.join(IMG_DIR, 'credits.js'),
    '/* 自动生成：Commons 图片署名（tools/fetch_photos.js） */\nwindow.IMG_CREDITS = {\n' +
    ok.map(r => `  ${r.id}: '图：${r.artist.replace(/'/g, "\\'")}（${r.license.replace(/'/g, '')}），via Wikimedia Commons'`).join(',\n') +
    '\n};\n');
  fs.writeFileSync(path.join(IMG_DIR, 'CREDITS.md'),
    '# 图片来源与授权（Wikimedia Commons）\n\n' +
    '本站食物照片均来自 Wikimedia Commons，遵循各自许可协议（CC BY / CC BY-SA / 公有领域），缩放至宽 ≤560px 存于本地。\n' +
    '下表由 `tools/fetch_photos.js` 自动生成；页面卡片底部同步显示署名。\n\n' +
    '| 文件 | Commons 原始页面 | 作者 | 许可 |\n|---|---|---|---|\n' +
    ok.map(r => `| img/${r.id}.jpg | [${r.title.replace(/[\[\]|]/g, '')}](${r.pageUrl}) | ${r.artist.replace(/[\[\]|]/g, '')} | ${r.license} |`).join('\n') + '\n');
  console.log(`\n完成：本次处理 ${done} 项已有/成功；失败：${failed.join(', ') || '无'}；可用照片 ${ok.length} 张`);
})().catch(e => { console.error('FATAL', e); process.exit(1); });

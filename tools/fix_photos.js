/* fix_photos.js — 收尾修图：
   1) 替换语义不当/缺失的 4 张照片（直接指定 Commons 文件名）
   2) 用修正的实体解码解析刷新全部条目的作者/许可（Commons 页面里下划线是 &#95;）
   3) 重写 assets/img/credits.js 与 CREDITS.md */
'use strict';
const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const IMG_DIR = path.join(ROOT, 'assets', 'img');
const STATE = path.join(__dirname, 'photo_state.json');
const UA = 'OfflineHealthSite/1.0 (educational static site)';
const WIDTH = 560;

/* 仅列需要替换/补抓的项；已完成的不要保留（避免重复下载撞限流） */
const OVERRIDE = { /* 见 git 历史：替换记录 */ };

const sleep = ms => new Promise(r => setTimeout(r, ms));
const stripTags = s => String(s || '')
  .replace(/&#95;/g, '_').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"')
  .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

function get(url) {
  return new Promise((resolve, reject) => {
    const follow = (u, depth) => {
      https.get(u, { headers: { 'User-Agent': UA }, timeout: 25000 }, res => {
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location && depth < 5) {
          res.resume(); return follow(new URL(res.headers.location, u).href, depth + 1);
        }
        if (res.statusCode !== 200) { res.resume(); return reject(new Error('HTTP ' + res.statusCode)); }
        const chunks = [];
        res.on('data', d => chunks.push(d));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('timeout', function () { this.destroy(new Error('timeout')); }).on('error', reject);
    };
    follow(url, 0);
  });
}

async function fileInfo(fileTitle) {
  try {
    const raw = (await get('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fileTitle))).toString('utf8');
    const h = raw.replace(/&#95;/g, '_');
    const aut = h.match(/fileinfotpl_aut[^>]*>[^<]*<\/td>\s*<td[^>]*>([\s\S]*?)<\/td>/i);
    const lic = h.match(/licensetpl_short">([^<]{2,60})</i) || h.match(/licensetpl_short"[^>]*>\s*([^<]{2,60})</);
    let artist = aut ? stripTags(aut[1]).replace(/^Author\s*/i, '') : '';
    if (artist.length > 60) artist = artist.slice(0, 57) + '…';
    return { artist: artist || '见 Commons 文件页', license: (lic ? lic[1].trim() : '') || '见 Commons 文件页' };
  } catch (e) {
    return { artist: '见 Commons 文件页', license: '见 Commons 文件页' };
  }
}

(async () => {
  let state = JSON.parse(fs.readFileSync(STATE, 'utf8'));

  /* 1. 覆盖下载 */
  for (const [id, fname] of Object.entries(OVERRIDE)) {
    const dest = path.join(IMG_DIR, id + '.jpg');
    try {
      const url = 'https://commons.wikimedia.org/wiki/Special:FilePath/' + encodeURIComponent(fname) + '?width=' + WIDTH;
      const img = await get(url);
      if (img.length < 4000) throw new Error('文件过小');
      fs.writeFileSync(dest, img);
      state[id] = { id, title: 'File:' + fname, pageUrl: 'https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(fname),
        thumb: url, artist: '?', license: '?' };
      console.log(`✓ 替换 ${id} ← File:${fname} (${Math.round(img.length / 1024)}KB)`);
    } catch (e) { console.log(`✗ ${id}：${e.message}`); }
    await sleep(1500);
  }

  /* 2. 刷新授权信息（已有有效署名的跳过，减少请求防限流） */
  const keys = Object.keys(state);
  for (const k of keys) {
    const p = path.join(IMG_DIR, state[k].id + '.jpg');
    if (!fs.existsSync(p)) continue;
    if (state[k].artist !== '?' && !/^\?|^见 Commons 文件页/.test(state[k].artist) && state[k].license !== '?') continue;
    const title = state[k].title.replace(/^File:/, '');
    const info = await fileInfo(title);
    state[k].artist = info.artist;
    state[k].license = info.license;
    console.log(`· ${k}: ${info.artist.slice(0, 28)} [${info.license}]`);
    await sleep(1200);
  }
  fs.writeFileSync(STATE, JSON.stringify(state, null, 1));

  /* 3. 重写 credits（转义逻辑统一走 gen_credits.js，避免手工转义出错） */
  fs.writeFileSync(STATE, JSON.stringify(state, null, 1));
  require('child_process').execSync('node tools/gen_credits.js', { cwd: ROOT, stdio: 'inherit' });
  console.log(`\n完成：照片与署名已刷新`);
})().catch(e => { console.error('FATAL', e); process.exit(1); });

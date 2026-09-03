# 食物与健康 · 图文交互科普网站

离线静态站点：常见食物与搭配如何预防/辅助治疗疾病、增强身体素质；中西并重（现代营养学 + 中医药食同源），**每条结论标注权威出处与证据等级**。

## 使用方式

双击 `index.html` 用 Chrome / Edge 打开即可，无需联网、无需构建。全部页面均在本文件夹内。

## 结构

```
index.html                 站点主页（导航 / 免责声明 / 学习进度）
nutrient.html              第1章 营养素基础
foods.html                 第2章 食物图鉴（真实照片 + 翻转卡）
pairing.html               第3章 搭配宜忌（配对查询器 / 食物-药物相互作用）
disease-metabolic.html     第4章 疾病食疗·代谢与心血管
disease-gi.html            第5章 疾病食疗·消化血液免疫骨骼
fitness.html               第6章 增强体质
exercise.html              第7章 标准运动动作库（国家体育总局 · 离线动画演示）
herbs.html                 第8章 药食同源
recipes.html               第9章 家常食谱推荐
quiz.html                  第10章 知识自测
references.html            附 参考文献与证据说明
appendix-howtocook.html    附 HowToCook 开源菜谱库（分类浏览/全文搜索）
assets/
  style.css                共享样式（明暗双主题，CSS 变量）
  healthui.js              共享组件库（导航/引用/测验/进度/演示器…）
  data.js                  全站数据（SOURCES/FOODS/PAIRS/DISEASES/HERBS/EXERCISES/QUIZ_BANK）
  img/                     食物照片（Wikimedia Commons，出处见 img/CREDITS.md）
  howtocook/               HowToCook 菜谱数据（tools/build_howtocook.js 构建产物，懒加载）
tools/
  audit.js                 数据与页面静态审计（node tools/audit.js）
  build_howtocook.js       从 HowToCook 稀疏克隆构建 assets/howtocook/*.js
  fetch_photos2.js         从 Wikipedia REST/Commons 下载食物照片（限流友好，断点续传）
  fix_photos.js            替换指定照片 + 刷新全部图片署名（作者/许可）
  photo_state.json         照片下载状态（断点续传）
  shots/                   验证截图
```

## 动作动画说明（exercise.html）

- 动作关键帧数据在 `assets/data.js` 的 `EXERCISES`（每帧 11 个关节点 `[x,y]`，画布 100×100，地面 y≈91），
  `exercise.html` 内置火柴人渲染器与播放器：播放/暂停、0.5～2× 调速、进度拖动、关键帧分解图，全部离线运行。
- 依据：国家体育总局《全民健身指南》(2017)、健身气功·八段锦（总局健身气功管理中心）、第九套广播体操（2011）、
  《国家体育锻炼标准》(2013)；器械力量动作规范另参考 ACSM/AND 立场声明（S28）。
- 外部「官方视频」仅收录 sport.gov.cn 官方稳定链接（需联网），不缓存视频文件，保持站点纯离线属性。

## 照片与授权

62 张食物照片全部来自 Wikimedia Commons（CC BY / CC BY-SA / CC0 / GFDL / 公有领域），逐图署名见
`assets/img/CREDITS.md` 与 `assets/img/credits.js`（页面卡片底部同步显示），汇总于 `references.html`。

> 抓取经验：Commons 的 `api.php` 限流很紧（易 429）；本项目改用 `en.wikipedia REST summary 取首图 → Special:FilePath?width=560 下载（CDN 会自动跳到合法缩略图档位）→ 文件页 HTML 解析署名（注意 `&#95;` 实体）`。

## 证据等级

- **A** 强证据：权威指南强推荐 / 系统评价、RCT
- **B** 中等证据：队列或观察性研究 / 指南弱推荐
- **C** 传统典籍：《中华人民共和国药典》2020年版一部、《本草纲目》等经验医学记载
- **D** 证据不足：民间说法，仅用于辨析/辟谣段落并明示

## 当前状态（2026-09-04 · v1.2）

13 页全部完成并通过审计：`node tools/audit.js` → **13 个页面，0 错误**（62 食物 / 26 搭配 / 43 药材 / 20 动作 / 29 来源 / 62 照片 / 8 卷 55 题）；
无头浏览器逐页控制台零报错；明暗双主题截图抽查通过。
2026-09-03 移除「简单环境下的外科急救」两章及对应数据与来源。
2026-09-04 新增第 7 章「标准运动动作库」（国家体育总局口径，20 动作离线动画演示），后续章节顺延（自测为第 10 章）。

## 验证流程（每次修改后）

1. `node --check assets/healthui.js` 与 `node --check assets/data.js`
2. `node tools/audit.js`（引用悬空 / 图片存在 / id 一致 / BOM / 链接完整性）
3. 无头 Chrome 逐页捕获控制台错误（目标零报错）：
   `chrome --headless=new --disable-gpu --enable-logging=stderr --virtual-time-budget=8000 --dump-dom "file:///<本站本地路径>/<page>.html"`
4. `--screenshot` 全页截图抽查（明暗两主题）
5. 内容抽查：对《中国食物成分表》《药典》/ WHO 资料逐条复核引用

## 免责声明

本站内容为健康科普，不构成医疗建议；食疗不能替代规范诊疗。完整声明见 `references.html`。

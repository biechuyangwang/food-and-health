/* ============================================================
   data.js — 全站数据单一来源
   window.HDATA = { SOURCES, FOODS, DRUGS, PAIRS, DISEASES, HERBS,
                    FIRSTAID, QUIZ_BANK }
   约定：所有跨实体引用使用字符串 id；src 一律指向 SOURCES 键，
   由 tools/audit.js 校验悬空。
   营养数值为《中国食物成分表·标准版·第6版》口径的近似值
   （四舍五入，供科普对比参考，非营养计算依据）。
   ============================================================ */
'use strict';
window.HDATA = {

  /* ---------- 参考文献 ---------- */
  SOURCES: {
    S1: { type: 'guide', title: '《中国居民膳食指南（2022）》', org: '中国营养学会', publisher: '人民卫生出版社', year: 2022 },
    S2: { type: 'book', title: '《中国食物成分表·标准版·第6版》', org: '杨月欣 主编（国家疾控中心营养与健康所）', publisher: '北京大学医学出版社', year: 2019 },
    S3: { type: 'book', title: '《中华人民共和国药典》（2020年版）一部', org: '国家药典委员会', publisher: '中国医药科技出版社', year: 2020 },
    S4: { type: 'intl', title: '《按照传统既是食品又是中药材的物质目录》及历次增补公告（2024年第4号公告增补地黄、麦冬、天冬、化橘红，目录达106种）', org: '国家卫生健康委员会 / 国家市场监督管理总局', publisher: '', year: 2024 },
    S5: { type: 'classic', title: '《本草纲目》', org: '明·李时珍（人民卫生出版社校点本）', publisher: '人民卫生出版社', year: 2004 },
    S6: { type: 'intl', title: 'Surgical Care at the District Hospital（区级医院外科诊疗手册）', org: '世界卫生组织 WHO', publisher: 'WHO Press', year: 2003 },
    S7: { type: 'intl', title: 'Basic Emergency Care: approach to the acutely ill and injured（基础急诊救治课程）', org: '世界卫生组织 WHO', publisher: 'WHO Press', year: 2020 },
    S8: { type: 'textbook', title: '《野战外科学》（第2版）', org: '王正国 主编', publisher: '人民军医出版社', year: 2010 },
    S10: { type: 'intl', title: '健康饮食概况文件及膳食糖/钠/脂肪酸摄入建议（Healthy diet；Guidelines on sugars / sodium / saturated and trans fatty acid intake）', org: '世界卫生组织 WHO', publisher: '', year: 2023 },
    S11: { type: 'intl', title: 'Dietary Supplement Fact Sheets（膳食补充剂成分说明书）', org: '美国国立卫生研究院 NIH Office of Dietary Supplements', publisher: '', year: 2024 },
    S12: { type: 'guide', title: '食源性疾病与食物中毒防治公开资料（毒蘑菇/组胺/肉毒杆菌/副溶血性弧菌等风险提示）', org: '国家食品安全风险评估中心 / 中国疾病预防控制中心', publisher: '', year: 2023 },
    S13: { type: 'textbook', title: '《中医药膳学》（全国中医药行业高等教育规划教材）', org: '谭兴贵 主编', publisher: '中国中医药出版社', year: 2016 },
    S14: { type: 'guide', title: '《中医体质分类与判定》（ZYYXH/T157-2009）', org: '中华中医药学会', publisher: '', year: 2009 },
    S15: { type: 'guide', title: '《中国2型糖尿病防治指南（2020年版）》', org: '中华医学会糖尿病学分会', publisher: '中华医学杂志', year: 2021 },
    S16: { type: 'guide', title: '《中国高血压防治指南（2024年修订版）》', org: '中国高血压防治指南修订委员会', publisher: '中华高血压杂志', year: 2024 },
    S17: { type: 'guide', title: '《中国成人血脂异常防治指南（2016年修订版）》', org: '中国成人血脂异常防治指南修订联合委员会', publisher: '中华心血管病杂志', year: 2016 },
    S18: { type: 'guide', title: '《中国高尿酸血症与痛风诊疗指南（2019）》', org: '中华医学会内分泌学分会', publisher: '中华内分泌代谢杂志', year: 2020 },
    S19: { type: 'guide', title: '《中国肥胖患者减重营养治疗指南（2021）》', org: '中国营养学会', publisher: '', year: 2021 },
    S20: { type: 'book', title: '《中国居民膳食营养素参考摄入量（DRIs）（2023版）》', org: '中国营养学会', publisher: '人民卫生出版社', year: 2023 },
    S21: { type: 'guide', title: '《非酒精性脂肪性肝病防治指南（2018年更新版）》', org: '中华医学会肝病学分会脂肪肝和酒精性肝病学组', publisher: '中华肝脏病杂志', year: 2018 },
    S22: { type: 'textbook', title: 'PHTLS 院前创伤生命支持（Prehospital Trauma Life Support，第9版）', org: 'NAEMT', publisher: 'Jones & Bartlett Learning', year: 2023 },
    S23: { type: 'intl', title: 'Wilderness Medical Society Clinical Practice Guidelines（荒野医学会临床实践指南）', org: 'Wilderness Medical Society', publisher: 'Wilderness & Environmental Medicine', year: 2024 },
    S24: { type: 'textbook', title: '应急救护标准化培训教材（救护员教程）', org: '中国红十字会总会', publisher: '', year: 2020 },
    S25: { type: 'intl', title: 'WHO/UNICEF Joint Statement: Clinical Management of Acute Diarrhoea；WHO《The Treatment of Diarrhoea》（第4版）', org: '世界卫生组织 / 联合国儿童基金会', publisher: 'WHO Press', year: 2005 },
    S26: { type: 'intl', title: 'Nutritional anaemias: tools for effective prevention and control（营养性贫血防治工具包）', org: '世界卫生组织 WHO', publisher: 'WHO Press', year: 2017 },
    S27: { type: 'guide', title: '《原发性骨质疏松症诊疗指南（2022）》', org: '中华医学会骨质疏松和骨矿盐疾病分会', publisher: '中华骨质疏松和骨矿盐疾病杂志', year: 2022 },
    S28: { type: 'intl', title: 'Nutrition and Athletic Performance（营养与运动表现联合立场声明）', org: 'ACSM / AND / DC', publisher: 'Med Sci Sports Exerc', year: 2016 },
    S29: { type: 'guide', title: '《中国蛇伤救治指南（2024）》（首版共识 2018，中华急诊医学杂志）', org: '中华医学会急诊医学分会', publisher: '中华急诊医学杂志', year: 2024 },
    S30: { type: 'guide', title: '《热射病急诊诊断与治疗专家共识（2021年更新版）》', org: '全军热射病防治专家组', publisher: '解放军医学杂志', year: 2021 },
    S31: { type: 'book', title: '《中华人民共和国药典临床用药须知（2020年版）》（化学药卷·食物-药物相互作用）及 NIH 药物-营养相互作用公开资料', org: '国家药典委员会 / NIH', publisher: '中国医药科技出版社', year: 2020 },
    S32: { type: 'intl', title: 'Highlights of the 2020 AHA Guidelines for CPR and ECC（美国心脏协会心肺复苏与心血管急救指南要点）', org: 'American Heart Association', publisher: 'Circulation', year: 2020 },
    S33: { type: 'guide', title: '《食品安全国家标准 预包装食品营养标签通则》（GB 28050）', org: '国家卫生健康委员会', publisher: '', year: 2011 },
    S34: { type: 'journal', title: '蜂蜜用于儿童急性咳嗽的系统评价（Cochrane Review）及各国儿科自我照护建议', org: 'Cochrane Library', publisher: '', year: 2018 }
  },

  /* ---------- 食物图鉴（54 种） ----------
     cat: grain谷薯 | bean豆 | veg蔬菜 | fruit水果 | nut坚果 | animal动物性 | oil油脂饮品调味
     tags 供「目标营养素」筛选。 */
  FOODS: [
    /* —— 谷薯 —— */
    { id: 'oat', name: '燕麦', alias: ['莜麦', '油麦'], cat: 'grain', photo: 'assets/img/oat.jpg', emoji: '🌾',
      tcm: null,
      nutrients: { energy: 338, protein: 15.0, fat: 6.7, carb: 61.6, fiber: 5.3, gi: 55, notable: 'β-葡聚糖约4g/100g；镁约177mg', src: 'S2' },
      benefits: [
        { text: 'β-葡聚糖（可溶性纤维）有助于降低低密度脂蛋白胆固醇（LDL-C）', level: 'A', src: ['S1', 'S17'] },
        { text: '低升糖指数特性有助于餐后血糖管理', level: 'A', src: ['S15'] }
      ],
      caution: '燕麦本身不含麦胶蛋白，但常与小麦交叉污染，乳糜泻患者需选择无麸质认证产品。',
      serve: '优先选择需煮制的原味燕麦片或钢切燕麦；即食麦片加工程度高、升糖更快。',
      pairs_good: ['milk', 'yogurt', 'banana'], pairs_bad: [], disease_tags: ['t2dm', 'dyslipidemia'], tags: ['高纤维', '低GI', '全谷物'] },
    { id: 'brownrice', name: '糙米', cat: 'grain', photo: 'assets/img/brownrice.jpg', emoji: '🍚',
      tcm: null,
      nutrients: { energy: 348, protein: 7.7, fat: 2.7, carb: 73.5, fiber: 3.4, gi: 70, notable: '保留胚芽与糠层，B族维生素与镁高于精白米', src: 'S2' },
      benefits: [
        { text: '以全谷物替代部分精制谷物与2型糖尿病、心血管疾病风险下降相关（队列研究）', level: 'B', src: ['S1'] }
      ],
      serve: '与白米按 1:1 起步混煮，逐步提高比例；提前浸泡 1–2 小时口感更软。',
      pairs_good: ['mungbean', 'blackbean'], pairs_bad: [], disease_tags: ['t2dm', 'dyslipidemia'], tags: ['全谷物', '高纤维'] },
    { id: 'millet', name: '小米', cat: 'grain', photo: 'assets/img/millet.jpg', emoji: '🌾',
      tcm: { nature: '凉', flavor: '甘、咸', meridian: '脾、胃、肾', func: '和中益胃、清热解渴（《本草纲目》·粟米）', src: 'S5', level: 'C' },
      nutrients: { energy: 361, protein: 9.0, fat: 3.1, carb: 75.1, fiber: 1.6, gi: 61, notable: '维生素B1约0.33mg/100g；小米粥 GI≈61', src: 'S2' },
      benefits: [
        { text: '富含维生素B1，有助于能量代谢与神经系统功能', level: 'A', src: ['S20'] },
        { text: '传统「养胃」粥品食材（典籍记载，经验医学）', level: 'C', src: ['S5'] }
      ],
      serve: '小米粥久煮后表面米油传统视为滋养之品；不必碱煮（破坏B族维生素）。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['全谷物'] },
    { id: 'corn', name: '甜玉米', cat: 'grain', photo: 'assets/img/corn.jpg', emoji: '🌽',
      tcm: null,
      nutrients: { energy: 112, protein: 4.0, fat: 1.2, carb: 22.8, fiber: 2.9, gi: 55, notable: '叶黄素与玉米黄素；钾约238mg', src: 'S2' },
      benefits: [
        { text: '叶黄素、玉米黄素集中在视网膜，膳食摄入与黄斑健康相关（研究提示）', level: 'B', src: ['S20'] }
      ],
      serve: '整根蒸煮优于榨汁（保留纤维、降低升糖速度）。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['高纤维'] },
    { id: 'buckwheat', name: '荞麦', alias: ['甜荞', '苦荞'], cat: 'grain', photo: 'assets/img/buckwheat.jpg', emoji: '🌾',
      tcm: { nature: '微寒', flavor: '甘', meridian: '脾、胃、大肠', func: '开胃宽肠、下气消积（《本草纲目》·荞麦）', src: 'S5', level: 'C' },
      nutrients: { energy: 337, protein: 9.3, fat: 2.3, carb: 73.0, fiber: 6.5, gi: 59, notable: '芦丁（芸香苷）；镁、钾丰富；荞麦面条 GI≈59', src: 'S2' },
      benefits: [
        { text: '低升糖指数谷物，有助于血糖管理', level: 'B', src: ['S15'] },
        { text: '富含芦丁等多酚，研究提示与血管健康相关（证据多为观察性与实验研究）', level: 'B', src: ['S1'] }
      ],
      serve: '荞麦面条选择荞麦粉比例高的产品（配料表第一位是荞麦粉）。',
      pairs_good: [], pairs_bad: [], disease_tags: ['t2dm'], tags: ['全谷物', '高纤维', '低GI'] },
    { id: 'sweetpotato', name: '红薯', alias: ['甘薯', '地瓜'], cat: 'grain', photo: 'assets/img/sweetpotato.jpg', emoji: '🍠',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、肾', func: '补中和血、益气生津（《本草纲目》·甘薯）', src: 'S5', level: 'C' },
      nutrients: { energy: 86, protein: 1.6, fat: 0.2, carb: 20.1, fiber: 1.6, gi: 77, notable: 'β-胡萝卜素；钾约130mg（红心更高）；蒸制低于烤制的升糖幅度', src: 'S2' },
      benefits: [
        { text: 'β-胡萝卜素与钾的良好来源', level: 'A', src: ['S2'] }
      ],
      caution: '煮/蒸制 GI 约 77，血糖异常者注意分量并搭配蛋白质；胃食管反流者大量进食易反酸腹胀。',
      serve: '蒸制优于烤制（升糖更平缓）；每日 50–150g 替代部分主食。',
      pairs_good: [], pairs_bad: [], disease_tags: ['constipation'], tags: ['高钾'] },
    { id: 'yam', name: '山药', alias: ['薯蓣', '淮山'], cat: 'grain', photo: 'assets/img/yam.jpg', emoji: '🍠',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、肺、肾', func: '补脾养胃、生津益肺、补肾涩精（药典 2020·山药）', src: 'S3', level: 'C' },
      nutrients: { energy: 57, protein: 1.9, fat: 0.2, carb: 12.4, fiber: 0.8, gi: 51, notable: '黏蛋白（多糖-蛋白复合物）', src: 'S2' },
      benefits: [
        { text: '药食同源目录品种，传统用于脾虚食少、久泻（药典功能表述）', level: 'C', src: ['S3'] },
        { text: '低升糖指数（≈51）薯类，可替代部分主食', level: 'B', src: ['S2'] }
      ],
      caution: '生山药黏液可能引起皮肤瘙痒，削皮时戴手套；不可生食。',
      serve: '蒸煮炖皆宜；铁棍山药蒸食口感面甜。',
      pairs_good: [], pairs_bad: [], disease_tags: ['t2dm'], tags: ['低GI'] },
    { id: 'potato', name: '土豆', alias: ['马铃薯', '洋芋'], cat: 'grain', photo: 'assets/img/potato.jpg', emoji: '🥔',
      tcm: null,
      nutrients: { energy: 77, protein: 2.0, fat: 0.2, carb: 17.2, fiber: 0.7, gi: 66, notable: '钾约340mg/100g；维C约27mg', src: 'S2' },
      benefits: [
        { text: '钾含量在常见蔬菜中居前，有助于血压管理（膳食模式层面）', level: 'B', src: ['S16'] }
      ],
      caution: '⛔ 发芽、变绿、腐烂的土豆龙葵碱显著升高，绝对不可食用（详见本页「危险食物」）。',
      serve: '蒸煮为主；油炸（薯条/薯片）能量与升糖负荷大幅上升。',
      pairs_good: [], pairs_bad: [], disease_tags: ['hypertension'], tags: ['高钾'] },

    /* —— 豆与豆制品 —— */
    { id: 'soybean', name: '黄豆', alias: ['大豆'], cat: 'bean', photo: 'assets/img/soybean.jpg', emoji: '🫘',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、大肠', func: '健脾宽中、润燥消水（《本草纲目》·大豆）', src: 'S5', level: 'C' },
      nutrients: { energy: 390, protein: 35.0, fat: 16.0, carb: 34.2, fiber: 15.5, notable: '蛋白质含量约35%；大豆异黄酮', src: 'S2' },
      benefits: [
        { text: '大豆蛋白有助于降低 LDL-C（每日 25g 以上大豆蛋白，指南认可的食物成分声称）', level: 'B', src: ['S17'] },
        { text: '优质植物蛋白与大豆异黄酮来源', level: 'A', src: ['S20'] }
      ],
      caution: '⛔ 生豆浆含胰蛋白酶抑制剂与血球凝集素，必须彻底煮沸（详见「危险食物」）。',
      serve: '豆浆煮沸出现泡沫后转小火继续煮 5 分钟以上。',
      pairs_good: ['brownrice'], pairs_bad: [], disease_tags: ['dyslipidemia'], tags: ['高蛋白', '高纤维'] },
    { id: 'blackbean', name: '黑豆', alias: ['黑大豆'], cat: 'bean', photo: 'assets/img/blackbean.jpg', emoji: '🫘',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、肾', func: '健脾益肾、活血利水（《本草纲目》·大豆）', src: 'S5', level: 'C' },
      nutrients: { energy: 381, protein: 36.0, fat: 15.9, carb: 33.6, fiber: 10.2, notable: '种皮花青素；蛋白质约36%', src: 'S2' },
      benefits: [
        { text: '优质植物蛋白；种皮富含花青素（抗氧化成分）', level: 'B', src: ['S2'] }
      ],
      serve: '煮粥、打豆浆；提前浸泡 8–12 小时。',
      pairs_good: ['brownrice'], pairs_bad: [], disease_tags: [], tags: ['高蛋白', '高纤维'] },
    { id: 'mungbean', name: '绿豆', cat: 'bean', photo: 'assets/img/mungbean.jpg', emoji: '🫘',
      tcm: { nature: '寒', flavor: '甘', meridian: '心、胃', func: '清热解毒、消暑、利水（《本草纲目》·绿豆）', src: 'S5', level: 'C' },
      nutrients: { energy: 329, protein: 21.6, fat: 0.8, carb: 62.0, fiber: 6.4, notable: '蛋白质约21.6%；低脂', src: 'S2' },
      benefits: [
        { text: '传统夏季消暑食材（绿豆汤），典籍记载清热解暑', level: 'C', src: ['S5'] }
      ],
      caution: '脾胃虚寒（平时易腹泻、怕冷）者不宜大量长期饮用冰镇绿豆汤（传统认知）。',
      serve: '煮至汤色碧绿时清热为佳；煮开花后偏于健脾。',
      pairs_good: ['brownrice'], pairs_bad: [], disease_tags: [], tags: ['高蛋白', '高纤维'] },
    { id: 'tofu', name: '豆腐（北）', alias: ['老豆腐'], cat: 'bean', photo: 'assets/img/tofu.jpg', emoji: '🧊',
      tcm: { nature: '凉', flavor: '甘', meridian: '脾、胃、大肠', func: '益气和中、生津润燥、清热解毒（《本草纲目》·豆腐）', src: 'S5', level: 'C' },
      nutrients: { energy: 98, protein: 12.2, fat: 4.8, carb: 2.0, fiber: 0.5, notable: '北豆腐以石膏（硫酸钙）点制，钙约105–138mg/100g', src: 'S2' },
      benefits: [
        { text: '优质植物蛋白 + 钙的良好来源（石膏豆腐）', level: 'A', src: ['S2', 'S20'] },
        { text: '大豆制品纳入每日膳食有助于血脂与血压管理', level: 'B', src: ['S16', 'S17'] }
      ],
      serve: '每周大豆制品相当于豆腐 350–700g（指南「大豆及坚果类 25–35g/日」折算）。',
      pairs_good: ['kelp'], pairs_bad: [], disease_tags: ['hypertension', 'dyslipidemia', 'osteoporosis'], tags: ['高蛋白', '高钙'] },
    { id: 'soymilk', name: '豆浆（无糖）', cat: 'bean', photo: 'assets/img/soymilk.jpg', emoji: '🥛',
      tcm: null,
      nutrients: { energy: 31, protein: 3.0, fat: 1.6, carb: 1.2, fiber: 0, notable: '蛋白质约3g/100ml；不含乳糖', src: 'S2' },
      benefits: [
        { text: '乳糖不耐受人群的牛奶替代品之一', level: 'B', src: ['S1'] }
      ],
      caution: '⛔ 必须彻底煮沸：「假沸」（约80℃大量起泡）后继续小火煮5分钟，破坏胰蛋白酶抑制剂与凝集素。',
      serve: '不加糖；与谷类早餐搭配提高蛋白质互补。',
      pairs_good: ['egg', 'oat'], pairs_bad: [], disease_tags: [], tags: ['高蛋白'] },

    /* —— 蔬菜 —— */
    { id: 'spinach', name: '菠菜', alias: ['赤根菜'], cat: 'veg', photo: 'assets/img/spinach.jpg', emoji: '🥬',
      tcm: { nature: '凉', flavor: '甘', meridian: '肝、胃、大肠', func: '滋阴平肝、润燥、通血脉（《本草纲目》·菠菜）', src: 'S5', level: 'C' },
      nutrients: { energy: 28, protein: 2.6, fat: 0.3, carb: 4.5, fiber: 1.7, notable: '叶酸约169μg/100g；维C约32mg；维K丰富；类胡萝卜素', src: 'S2' },
      benefits: [
        { text: '叶酸、维K、类胡萝卜素与镁的优质来源', level: 'A', src: ['S2'] },
        { text: '非血红素铁 + 维C 自带组合，有助于铁营养（植物性铁吸收仍受草酸等抑制）', level: 'B', src: ['S20'] }
      ],
      caution: '草酸较高：焯水 30 秒可去除大部分；草酸钙肾结石患者控制摄入并注意饮水。',
      serve: '先焯水再凉拌/炒/做汤；与豆腐同食前焯水即可（见「搭配」页）。',
      pairs_good: ['orange', 'kiwi', 'tofu'], pairs_bad: [], disease_tags: ['anemia', 'hypertension'], tags: ['高铁', '高维C'] },
    { id: 'broccoli', name: '西兰花', alias: ['绿花椰菜'], cat: 'veg', photo: 'assets/img/broccoli.jpg', emoji: '🥦',
      tcm: null,
      nutrients: { energy: 36, protein: 4.1, fat: 0.6, carb: 4.3, fiber: 1.6, notable: '维C约51–90mg/100g；萝卜硫素前体葡糖萝卜苷', src: 'S2' },
      benefits: [
        { text: '十字花科蔬菜摄入量与心血管疾病风险下降相关（队列研究）', level: 'B', src: ['S1'] },
        { text: '维C含量高于多数蔬菜（约为橙子的 1–2 倍）', level: 'A', src: ['S2'] }
      ],
      serve: '沸水快焯 1–2 分钟或急火快炒，久煮损失维C。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['高维C', '高纤维'] },
    { id: 'tomato', name: '番茄', alias: ['西红柿'], cat: 'veg', photo: 'assets/img/tomato.jpg', emoji: '🍅',
      tcm: { nature: '微寒', flavor: '甘、酸', meridian: '肝、胃、肺', func: '生津止渴、健胃消食（《陆川本草》等，经验记载）', src: 'S13', level: 'C' },
      nutrients: { energy: 20, protein: 0.9, fat: 0.2, carb: 4.0, fiber: 0.5, gi: 15, notable: '番茄红素（脂溶性抗氧化剂），加工后生物利用度更高', src: 'S2' },
      benefits: [
        { text: '番茄红素摄入与氧化应激指标改善相关；与脂肪同食吸收更好', level: 'B', src: ['S1', 'S20'] }
      ],
      serve: '生吃补维C，熟吃加油促番茄红素吸收——两种吃法各有价值。',
      pairs_good: ['oliveoil'], pairs_bad: [], disease_tags: [], tags: ['低GI'] },
    { id: 'carrot', name: '胡萝卜', cat: 'veg', photo: 'assets/img/carrot.jpg', emoji: '🥕',
      tcm: { nature: '平', flavor: '甘', meridian: '肺、脾、肝', func: '健脾化滞、养肝明目（《本草纲目》·胡萝卜）', src: 'S5', level: 'C' },
      nutrients: { energy: 39, protein: 1.0, fat: 0.2, carb: 8.8, fiber: 1.1, notable: 'β-胡萝卜素约4mg/100g（维生素A原）', src: 'S2' },
      benefits: [
        { text: 'β-胡萝卜素在体内转化为维生素A，有助于视觉与上皮完整性', level: 'A', src: ['S20'] }
      ],
      serve: '加少量油烹调或与肉同炖，提高胡萝卜素吸收。',
      pairs_good: ['oliveoil'], pairs_bad: [], disease_tags: [], tags: ['高维A'] },
    { id: 'garlic', name: '大蒜', cat: 'veg', photo: 'assets/img/garlic.jpg', emoji: '🧄',
      tcm: { nature: '温', flavor: '辛', meridian: '脾、胃、肺', func: '温中行滞、解毒、杀虫（《本草纲目》·葫）', src: 'S5', level: 'C' },
      nutrients: { energy: 128, protein: 4.5, fat: 0.2, carb: 27.6, fiber: 1.1, notable: '蒜氨酸（蒜氨酸酶切后生成大蒜素）', src: 'S2' },
      benefits: [
        { text: '大蒜补充剂对血压、血脂有小幅改善作用（荟萃分析，证据质量中等）', level: 'B', src: ['S11'] }
      ],
      caution: '空腹大量生食刺激胃肠黏膜；服用抗凝药者大量摄入可能增加出血风险，需告知医生。',
      serve: '拍碎后静置 10 分钟再烹调，有利于大蒜素生成。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: [] },
    { id: 'onion', name: '洋葱', cat: 'veg', photo: 'assets/img/onion.jpg', emoji: '🧅',
      tcm: null,
      nutrients: { energy: 40, protein: 1.1, fat: 0.2, carb: 9.0, fiber: 0.9, notable: '含硫化合物；槲皮素', src: 'S2' },
      benefits: [
        { text: '含硫化合物与槲皮素具抗氧化活性（人群健康结局证据有限）', level: 'B', src: ['S2'] }
      ],
      serve: '急火快炒或凉拌；切洋葱前冷藏可减少催泪刺激。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: [] },
    { id: 'ginger', name: '生姜', cat: 'veg', photo: 'assets/img/ginger.jpg', emoji: '🫚',
      tcm: { nature: '微温', flavor: '辛', meridian: '肺、脾、胃', func: '解表散寒、温中止呕、化痰止咳（药典 2020·生姜）', src: 'S3', level: 'C' },
      nutrients: { energy: 46, protein: 1.3, fat: 0.6, carb: 10.3, fiber: 2.7, notable: '6-姜酚（6-gingerol）等姜辣素', src: 'S2' },
      benefits: [
        { text: '生姜及其提取物对恶心呕吐（妊娠相关、晕动相关）有较系统的证据支持', level: 'B', src: ['S11'] },
        { text: '传统温中止呕、解表散寒（药典功能表述）', level: 'C', src: ['S3'] }
      ],
      caution: '阴虚内热（口干咽燥、手足心热）者及痔疮出血期慎大量食用（传统禁忌）。',
      serve: '受凉初起喝生姜红糖水为传统做法；日常烹调味噌姜可去腥。',
      pairs_good: ['crab'], pairs_bad: [], disease_tags: [], tags: [] },
    { id: 'daikon', name: '白萝卜', alias: ['莱菔'], cat: 'veg', photo: 'assets/img/daikon.jpg', emoji: '🌱',
      tcm: { nature: '凉', flavor: '辛、甘', meridian: '肺、胃', func: '消食下气、化痰生津（《本草纲目》·莱菔）', src: 'S5', level: 'C' },
      nutrients: { energy: 23, protein: 0.9, fat: 0.1, carb: 5.0, fiber: 1.0, notable: '芥子油苷类；维C约21mg', src: 'S2' },
      benefits: [
        { text: '传统消食化积、化痰食材（典籍与药膳学记载）', level: 'C', src: ['S13'] }
      ],
      serve: '炖煮去辛味更温和；萝卜干/腌制品钠高，少吃。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: [] },
    { id: 'bittergourd', name: '苦瓜', alias: ['凉瓜'], cat: 'veg', photo: 'assets/img/bittergourd.jpg', emoji: '🥒',
      tcm: { nature: '寒', flavor: '苦', meridian: '心、脾、胃', func: '清热祛暑、明目、解毒（《本草纲目》·苦瓜）', src: 'S5', level: 'C' },
      nutrients: { energy: 22, protein: 1.0, fat: 0.1, carb: 4.9, fiber: 1.4, notable: '苦瓜苷（charantin）等多肽/皂苷类成分', src: 'S2' },
      benefits: [
        { text: '苦瓜提取物降糖研究提示一定作用，但样本小、证据强度有限，不能替代降糖药物', level: 'B', src: ['S15'] }
      ],
      caution: '脾胃虚寒者慎食；孕妇不宜大量食用（传统禁忌 + 缺乏妊娠安全性数据）。',
      serve: '焯水去部分苦味；与鸡蛋同炒为常见家常做法。',
      pairs_good: ['egg'], pairs_bad: [], disease_tags: ['t2dm'], tags: ['低GI'] },
    { id: 'celery', name: '芹菜（茎）', cat: 'veg', photo: 'assets/img/celery.jpg', emoji: '🥬',
      tcm: { nature: '凉', flavor: '甘、微苦', meridian: '肝、胃', func: '平肝清热、祛风利湿（《本草纲目》·芹菜）', src: 'S5', level: 'C' },
      nutrients: { energy: 22, protein: 1.2, fat: 0.2, carb: 4.5, fiber: 1.2, notable: '钾约206–300mg；钠较低；芹菜素（apigenin）', src: 'S2' },
      benefits: [
        { text: '低能量、高钾低钠的蔬菜，契合高血压膳食模式（DASH）', level: 'B', src: ['S16'] },
        { text: '「吃芹菜降压」为民间放大说法：单靠某一种食物不能替代降压治疗', level: 'D', src: ['S16'] }
      ],
      serve: '快炒或凉拌；叶的营养密度高于茎，不建议丢弃。',
      pairs_good: [], pairs_bad: [], disease_tags: ['hypertension'], tags: ['高钾'] },
    { id: 'shiitake', name: '香菇（鲜）', cat: 'veg', photo: 'assets/img/shiitake.jpg', emoji: '🍄',
      tcm: { nature: '平', flavor: '甘', meridian: '肝、胃', func: '扶正补虚、健脾开胃（《本草纲目》·蕈）', src: 'S5', level: 'C' },
      nutrients: { energy: 26, protein: 2.2, fat: 0.3, carb: 5.2, fiber: 3.3, notable: '香菇多糖；麦角甾醇（维D前体，晒干含量升高）', src: 'S2' },
      benefits: [
        { text: '香菇多糖的免疫调节作用多为体外与动物实验证据，人群证据有限', level: 'B', src: ['S2'] },
        { text: '膳食纤维与鲜味核苷酸丰富，可部分替代盐的调味作用', level: 'B', src: ['S1'] }
      ],
      serve: '干香菇泡发后炖煮；泡发水沉淀后可入汤（鲜味物质溶于水）。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['高纤维'] },
    { id: 'kelp', name: '海带（鲜）', alias: ['昆布', '江白菜'], cat: 'veg', photo: 'assets/img/kelp.jpg', emoji: '🌊',
      tcm: { nature: '寒', flavor: '咸', meridian: '肝、胃、肾', func: '消痰软坚散结、利水消肿（药典 2020·昆布）', src: 'S3', level: 'C' },
      nutrients: { energy: 13, protein: 1.2, fat: 0.1, carb: 2.1, fiber: 0.5, notable: '碘（含量因产地与干燥方式差异大）；海藻酸；钾', src: 'S2' },
      benefits: [
        { text: '碘的优质来源：碘是甲状腺激素合成的必需原料', level: 'A', src: ['S20'] },
        { text: '药食同源目录品种（昆布），传统用于瘿瘤、水肿（药典表述）', level: 'C', src: ['S3'] }
      ],
      caution: '甲状腺功能亢进、甲状腺炎等限碘疾病患者遵医嘱控制；服用左甲状腺素者保持稳定碘摄入并遵医嘱。',
      serve: '每周 1–2 次即可满足碘需求；凉拌/煮汤皆宜。',
      pairs_good: ['tofu'], pairs_bad: [], disease_tags: [], tags: ['高碘'] },

    /* —— 水果 —— */
    { id: 'apple', name: '苹果', cat: 'fruit', photo: 'assets/img/apple.jpg', emoji: '🍎',
      tcm: null,
      nutrients: { energy: 53, protein: 0.2, fat: 0.2, carb: 13.7, fiber: 1.2, gi: 36, notable: '果胶（可溶性纤维）；多酚（槲皮素等）', src: 'S2' },
      benefits: [
        { text: '果胶等可溶性纤维有助于胆固醇管理', level: 'B', src: ['S1'] }
      ],
      serve: '连皮吃（洗净）纤维与多酚更高；榨汁损失纤维、升糖更快。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['高纤维', '低GI'] },
    { id: 'pear', name: '梨', cat: 'fruit', photo: 'assets/img/pear.jpg', emoji: '🍐',
      tcm: { nature: '凉', flavor: '甘、微酸', meridian: '肺、胃', func: '清热生津、润燥化痰（《本草纲目》·梨）', src: 'S5', level: 'C' },
      nutrients: { energy: 51, protein: 0.4, fat: 0.2, carb: 13.1, fiber: 3.1, notable: '水分约85%；石细胞（木质化纤维）', src: 'S2' },
      benefits: [
        { text: '水分与纤维丰富，传统用于秋燥干咳（典籍记载，经验医学）', level: 'C', src: ['S5'] }
      ],
      caution: '脾胃虚寒、便溏者不宜多食生梨（传统认知）；冰糖炖梨为常见食疗做法。',
      pairs_good: [], pairs_bad: [], disease_tags: ['constipation'], tags: ['高纤维'] },
    { id: 'banana', name: '香蕉', cat: 'fruit', photo: 'assets/img/banana.jpg', emoji: '🍌',
      tcm: null,
      nutrients: { energy: 93, protein: 1.4, fat: 0.2, carb: 22.0, fiber: 1.2, gi: 52, notable: '钾约256mg/100g；镁32mg；成熟度越高GI越高', src: 'S2' },
      benefits: [
        { text: '高钾低钠水果，有助于血压管理（膳食模式层面）', level: 'B', src: ['S16'] }
      ],
      caution: '肾功能不全者高钾血症风险，遵医嘱；未成熟香蕉鞣酸多，反而可能加重便秘。',
      serve: '运动前后快速补钾补糖的便携选择。',
      pairs_good: ['oat', 'milk'], pairs_bad: [], disease_tags: ['hypertension', 'constipation', 'fitness'], tags: ['高钾'] },
    { id: 'orange', name: '橙子', cat: 'fruit', photo: 'assets/img/orange.jpg', emoji: '🍊',
      tcm: null,
      nutrients: { energy: 48, protein: 0.8, fat: 0.2, carb: 11.1, fiber: 0.6, gi: 43, notable: '维C约33–54mg/100g；类黄酮（橙皮苷）', src: 'S2' },
      benefits: [
        { text: '维C良好来源，有助于铁吸收与抗氧化', level: 'A', src: ['S20'] }
      ],
      serve: '整个吃优于榨汁（保留纤维、饱腹感更强）。',
      pairs_good: ['spinach', 'shrimp'], pairs_bad: [], disease_tags: ['anemia', 'cold'], tags: ['高维C', '低GI'] },
    { id: 'kiwi', name: '猕猴桃', alias: ['奇异果'], cat: 'fruit', photo: 'assets/img/kiwi.jpg', emoji: '🥝',
      tcm: { nature: '寒', flavor: '甘、酸', meridian: '肾、胃', func: '解热止渴、通淋（《本草纲目》·猕猴桃）', src: 'S5', level: 'C' },
      nutrients: { energy: 61, protein: 0.8, fat: 0.6, carb: 14.5, fiber: 2.6, gi: 52, notable: '维C约62mg/100g； actinidin 蛋白酶', src: 'S2' },
      benefits: [
        { text: '随机对照研究提示每日 2 个猕猴桃有助于改善便秘（中国人群研究，指南引用）', level: 'B', src: ['S1'] }
      ],
      serve: '腹泻期少吃；未催熟偏酸硬时可与苹果同袋催熟。',
      pairs_good: ['yogurt'], pairs_bad: [], disease_tags: ['constipation', 'cold'], tags: ['高维C', '高纤维'] },
    { id: 'hawthorn', name: '山楂', alias: ['山里红'], cat: 'fruit', photo: 'assets/img/hawthorn.jpg', emoji: '🍒',
      tcm: { nature: '微温', flavor: '酸、甘', meridian: '脾、胃、肝', func: '消食健胃、行气散瘀、化浊降脂（药典 2020·山楂）', src: 'S3', level: 'C' },
      nutrients: { energy: 102, protein: 0.5, fat: 0.6, carb: 25.1, fiber: 3.1, notable: '有机酸（枸橼酸等）；黄酮类；果胶', src: 'S2' },
      benefits: [
        { text: '传统消食化积（尤擅肉食积滞）——药典功能表述', level: 'C', src: ['S3'] },
        { text: '「化浊降脂」为药典表述；山楂制剂降脂的现代证据级别有限，鲜果当零食不能替代药物', level: 'C', src: ['S3'] }
      ],
      caution: '胃酸过多/反流者慎食；不宜空腹大量食用；孕妇不宜（传统禁忌）。',
      serve: '山楂条/山楂片加糖多，选低糖制品或自制山楂水。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: [] },
    { id: 'mulberry', name: '桑葚', cat: 'fruit', photo: 'assets/img/mulberry.jpg', emoji: '🫐',
      tcm: { nature: '寒', flavor: '甘、酸', meridian: '心、肝、肾', func: '滋阴补血、生津润燥（药典 2020·桑椹）', src: 'S3', level: 'C' },
      nutrients: { energy: 57, protein: 1.7, fat: 0.4, carb: 13.8, fiber: 4.1, notable: '花青素（深色品种更高）；维C', src: 'S2' },
      benefits: [
        { text: '药食同源目录品种，传统用于阴虚血亏之眩晕耳鸣、肠燥便秘（药典表述）', level: 'C', src: ['S3'] }
      ],
      caution: '脾胃虚寒便溏者少食；清洗干净（表面凹凸易残留）。',
      pairs_good: [], pairs_bad: [], disease_tags: ['constipation'], tags: ['高纤维'] },
    { id: 'grape', name: '葡萄', cat: 'fruit', photo: 'assets/img/grape.jpg', emoji: '🍇',
      tcm: { nature: '平', flavor: '甘、微酸', meridian: '肺、脾、肾', func: '益气补血、强筋骨、利尿（《本草纲目》·葡萄）', src: 'S5', level: 'C' },
      nutrients: { energy: 45, protein: 0.4, fat: 0.3, carb: 10.3, fiber: 0.5, gi: 43, notable: '白藜芦醇（皮中）；原花青素', src: 'S2' },
      benefits: [
        { text: '多酚类抗氧化成分；「白藜芦醇抗衰老」在人群证据上不充分，属研究提示级', level: 'B', src: ['S2'] }
      ],
      serve: '洗净连皮吃；葡萄干浓缩糖分，限量。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['低GI'] },
    { id: 'persimmon', name: '柿子', cat: 'fruit', photo: 'assets/img/persimmon.jpg', emoji: '🟠',
      tcm: { nature: '寒', flavor: '甘、涩', meridian: '心、肺、大肠', func: '清热润肺、生津止渴（《本草纲目》·柿）', src: 'S5', level: 'C' },
      nutrients: { energy: 74, protein: 0.4, fat: 0.1, carb: 18.5, fiber: 1.4, notable: '鞣酸（未熟/未脱涩高）；β-胡萝卜素', src: 'S2' },
      benefits: [
        { text: 'β-胡萝卜素与维C来源', level: 'A', src: ['S2'] }
      ],
      caution: '不宜空腹大量食用：鞣酸在胃酸环境下可与蛋白质结合形成胃石（胃动力差、胃部术后者风险更高）。',
      serve: '选完全成熟或脱涩柿子；每日 1 个为宜。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: [] },
    { id: 'grapefruit', name: '西柚', alias: ['葡萄柚'], cat: 'fruit', photo: 'assets/img/grapefruit.jpg', emoji: '🍊',
      tcm: null,
      nutrients: { energy: 38, protein: 0.6, fat: 0.1, carb: 9.5, fiber: 1.1, gi: 25, notable: '维C；呋喃香豆素（与药物相互作用的关键成分）', src: 'S2' },
      benefits: [
        { text: '低能量、维C丰富的水果', level: 'A', src: ['S2'] }
      ],
      caution: '⛔ 呋喃香豆素抑制肠道 CYP3A4 酶，可显著升高他汀类、部分钙通道阻滞剂（非洛地平等）、环孢素等药物血药浓度——服药期间能否食用请咨询医生/药师，不要自行尝试。',
      serve: '未服用相关药物者适量食用无碍。',
      pairs_good: [], pairs_bad: ['statin', 'ccb'], disease_tags: [], tags: ['高维C'] },

    /* —— 坚果种子 —— */
    { id: 'walnut', name: '核桃', alias: ['胡桃'], cat: 'nut', photo: 'assets/img/walnut.jpg', emoji: '🌰',
      tcm: { nature: '温', flavor: '甘', meridian: '肾、肺、大肠', func: '补肾温肺、润肠通便（《本草纲目》·胡桃）', src: 'S5', level: 'C' },
      nutrients: { energy: 646, protein: 14.9, fat: 58.8, carb: 19.1, fiber: 9.5, notable: 'α-亚麻酸（植物n-3）约9g/100g；维E', src: 'S2' },
      benefits: [
        { text: '每周适量坚果与心血管疾病风险下降相关（队列研究）', level: 'B', src: ['S1'] },
        { text: 'α-亚麻酸（ALA）为人体必需脂肪酸', level: 'A', src: ['S20'] }
      ],
      caution: '能量密度高（约646kcal/100g），原味、每日一小把（10–15g）为宜。',
      serve: '选原味非油炸；「以形补形补脑」为民间说法，科学依据是其中的n-3脂肪酸而非外形。',
      pairs_good: ['yogurt'], pairs_bad: [], disease_tags: ['dyslipidemia', 't2dm'], tags: ['omega3'] },
    { id: 'almond', name: '巴旦木', alias: ['扁桃仁', '甜杏仁'], cat: 'nut', photo: 'assets/img/almond.jpg', emoji: '🥜',
      tcm: null,
      nutrients: { energy: 578, protein: 22.5, fat: 45.8, carb: 23.9, fiber: 8.8, notable: '维E约24mg/100g；单不饱和脂肪酸', src: 'S2' },
      benefits: [
        { text: '维E与不饱和脂肪酸丰富；适量坚果替代零食有助于血脂管理', level: 'B', src: ['S17'] }
      ],
      caution: '⛔ 与药用「苦杏仁」（山杏仁）不同：苦杏仁含氰苷，须按药典炮制并控制剂量，不可当零食（见「危险食物」）。',
      serve: '每日约10粒（约12–15g）。',
      pairs_good: [], pairs_bad: [], disease_tags: ['dyslipidemia'], tags: ['高蛋白'] },
    { id: 'blacksesame', name: '黑芝麻', cat: 'nut', photo: 'assets/img/blacksesame.jpg', emoji: '⚫',
      tcm: { nature: '平', flavor: '甘', meridian: '肝、肾、大肠', func: '补肝肾、益精血、润肠燥（药典 2020·黑芝麻）', src: 'S3', level: 'C' },
      nutrients: { energy: 559, protein: 19.1, fat: 46.1, carb: 24.0, fiber: 14.0, notable: '钙约780mg/100g（整粒吸收有限）；维E；木酚素', src: 'S2' },
      benefits: [
        { text: '药食同源目录品种，传统用于精血亏虚、肠燥便秘（药典表述）', level: 'C', src: ['S3'] },
        { text: '钙含量高（碾碎/磨酱后消化吸收更好）', level: 'B', src: ['S2'] }
      ],
      serve: '现磨芝麻粉或芝麻酱，避免整粒「原样进出」。',
      pairs_good: [], pairs_bad: [], disease_tags: ['constipation', 'osteoporosis'], tags: ['高钙'] },
    { id: 'flaxseed', name: '亚麻籽', cat: 'nut', photo: 'assets/img/flaxseed.jpg', emoji: '🌱',
      tcm: null,
      nutrients: { energy: 534, protein: 18.3, fat: 42.2, carb: 28.9, fiber: 27.3, notable: 'α-亚麻酸约22g/100g；木酚素；可溶性纤维', src: 'S2' },
      benefits: [
        { text: '植物n-3脂肪酸（ALA）与可溶性纤维的优质来源', level: 'A', src: ['S20'] }
      ],
      caution: '整粒易排出不吸收：现磨现吃；初榨亚麻籽油不耐高温，凉拌用。',
      serve: '每日 1–2 汤匙亚麻籽粉加入酸奶/粥。',
      pairs_good: ['yogurt', 'oat'], pairs_bad: [], disease_tags: ['dyslipidemia', 'constipation'], tags: ['omega3', '高纤维'] },

    /* —— 动物性食品 —— */
    { id: 'egg', name: '鸡蛋', cat: 'animal', photo: 'assets/img/egg.jpg', emoji: '🥚',
      tcm: null,
      nutrients: { energy: 144, protein: 13.3, fat: 8.8, carb: 2.8, fiber: 0, notable: '蛋白质氨基酸模式接近人体需要（生物学价值高）；蛋黄含胆碱、叶黄素', src: 'S2' },
      benefits: [
        { text: '优质蛋白参考食物；蛋黄为胆碱与叶黄素来源', level: 'A', src: ['S2', 'S20'] },
        { text: '健康人群每日 1 个鸡蛋与心血管风险升高无关（指南口径与大队列证据）', level: 'B', src: ['S1'] }
      ],
      caution: '生鸡蛋有沙门菌风险且生物素利用率低，应全熟食用。',
      serve: '水煮蛋、蒸蛋羹最优；煎蛋控制油温。',
      pairs_good: ['milk', 'tomato', 'bittergourd'], pairs_bad: [], disease_tags: ['fitness'], tags: ['高蛋白'] },
    { id: 'milk', name: '牛奶（全脂）', cat: 'animal', photo: 'assets/img/milk.jpg', emoji: '🥛',
      tcm: { nature: '平', flavor: '甘', meridian: '心、肺、胃', func: '补虚损、益肺胃、生津润肤（《本草纲目》·牛乳）', src: 'S5', level: 'C' },
      nutrients: { energy: 54, protein: 3.0, fat: 3.2, carb: 3.4, fiber: 0, notable: '钙约104mg/100ml；维B2', src: 'S2' },
      benefits: [
        { text: '钙与优质蛋白的核心膳食来源', level: 'A', src: ['S1', 'S20'] }
      ],
      caution: '乳糖不耐受者：选酸奶/低乳糖奶/分次少量；不要空腹大量饮奶。',
      serve: '每日 300–500g 奶及奶制品（指南 2022 推荐量）。',
      pairs_good: ['oat'], pairs_bad: [], disease_tags: ['osteoporosis'], tags: ['高钙', '高蛋白'] },
    { id: 'yogurt', name: '酸奶（无糖）', cat: 'animal', photo: 'assets/img/yogurt.jpg', emoji: '🥛',
      tcm: null,
      nutrients: { energy: 72, protein: 2.5, fat: 2.7, carb: 9.3, fiber: 0, notable: '发酵产酸，乳糖部分分解；活性乳酸菌（依产品而定）', src: 'S2' },
      benefits: [
        { text: '乳糖不耐受者的友好选择；益生菌对肠道菌群的影响依菌株而异', level: 'B', src: ['S1'] },
        { text: '酸奶摄入与 2 型糖尿病风险下降相关（队列研究）', level: 'B', src: ['S1'] }
      ],
      caution: '选无添加糖/低糖产品：风味酸奶含糖可达 10–15g/100g。',
      serve: '注意「乳酸菌饮品」≠ 酸奶（蛋白质≥2.3g/100g 为酸奶底线）。',
      pairs_good: ['oat', 'kiwi', 'walnut'], pairs_bad: [], disease_tags: ['t2dm', 'osteoporosis'], tags: ['高钙'] },
    { id: 'salmon', name: '三文鱼', alias: ['鲑鱼'], cat: 'animal', photo: 'assets/img/salmon.jpg', emoji: '🐟',
      tcm: null,
      nutrients: { energy: 142, protein: 17.2, fat: 7.8, carb: 0, fiber: 0, notable: 'EPA+DHA 合计约 2g/100g；维D少数天然食物来源', src: 'S2' },
      benefits: [
        { text: 'EPA/DHA 有助于降低甘油三酯（较高摄入量下，指南认可）', level: 'A', src: ['S17', 'S20'] },
        { text: '每周 1–2 次深海鱼为指南推荐模式', level: 'A', src: ['S1'] }
      ],
      caution: '生食有寄生虫与微生物风险：仅选择正规渠道经规范深度冷冻的刺身级产品；孕妇、免疫低下者建议熟食。',
      serve: '清蒸/锡纸烤保留脂肪营养；避免高温焦糊。',
      pairs_good: ['oliveoil'], pairs_bad: [], disease_tags: ['dyslipidemia', 't2dm'], tags: ['omega3', '高蛋白'] },
    { id: 'sardine', name: '沙丁鱼', cat: 'animal', photo: 'assets/img/sardine.jpg', emoji: '🐟',
      tcm: null,
      nutrients: { energy: 89, protein: 19.8, fat: 1.4, carb: 0, fiber: 0, notable: 'EPA/DHA；带骨罐头钙含量高；嘌呤较高', src: 'S2' },
      benefits: [
        { text: '低汞、高n-3的小型海鱼，性价比高', level: 'B', src: ['S1'] }
      ],
      caution: '嘌呤较高：高尿酸血症与痛风患者急性期避免，缓解期限量。',
      serve: '水浸罐头优于油浸；连骨食用补钙。',
      pairs_good: [], pairs_bad: ['alcohol'], disease_tags: ['gout'], tags: ['omega3', '高蛋白'] },
    { id: 'oyster', name: '牡蛎', alias: ['生蚝', '海蛎子'], cat: 'animal', photo: 'assets/img/oyster.jpg', emoji: '🦪',
      tcm: { nature: '微温', flavor: '甘、咸', meridian: '肝、肾', func: '滋阴养血、补虚（《本草纲目》·蛎肉）', src: 'S5', level: 'C' },
      nutrients: { energy: 73, protein: 5.3, fat: 2.1, carb: 8.2, fiber: 0, notable: '锌含量因产地差异大（约9–70mg/100g），居常见食物前列', src: 'S2' },
      benefits: [
        { text: '锌的优质来源：锌参与免疫、伤口愈合与生殖功能', level: 'A', src: ['S20'] }
      ],
      caution: '⛔ 生食有诺如病毒、副溶血性弧菌等风险：孕妇、儿童、免疫低下者务必熟食；普通人群也建议充分加热。',
      serve: '蒜蓉蒸/烤至壳开肉熟。',
      pairs_good: ['ginger'], pairs_bad: [], disease_tags: [], tags: ['高蛋白', '富锌'] },
    { id: 'porkliver', name: '猪肝', cat: 'animal', photo: 'assets/img/porkliver.jpg', emoji: '🍖',
      tcm: { nature: '温', flavor: '甘、苦', meridian: '肝', func: '补肝明目、养血（《本草纲目》·猪肝）', src: 'S5', level: 'C' },
      nutrients: { energy: 129, protein: 19.3, fat: 3.5, carb: 5.0, fiber: 0, notable: '血红素铁约22.6mg/100g；维生素A约4972μgRAE；叶酸', src: 'S2' },
      benefits: [
        { text: '血红素铁（吸收率高）与维生素A的浓缩来源，缺铁性贫血膳食补充的经典选择', level: 'A', src: ['S26', 'S2'] }
      ],
      caution: '维生素A 有可耐受最高摄入量：孕妇每周不超过 1–2 次、每次少量（过量有致畸风险）；高胆固醇血症者控制。',
      serve: '每周 1–2 次、每次 25–50g；与深色蔬菜同餐。',
      pairs_good: ['spinach', 'orange'], pairs_bad: [], disease_tags: ['anemia'], tags: ['高铁'] },
    { id: 'chickenbreast', name: '鸡胸肉', cat: 'animal', photo: 'assets/img/chickenbreast.jpg', emoji: '🍗',
      tcm: { nature: '温', flavor: '甘', meridian: '脾、胃', func: '温中益气、补精填髓（《本草纲目》·鸡）', src: 'S5', level: 'C' },
      nutrients: { energy: 133, protein: 19.4, fat: 5.0, carb: 2.5, fiber: 0, notable: '蛋白质约19.4%，脂肪低', src: 'S2' },
      benefits: [
        { text: '高蛋白低脂的代表性食材，适合增肌与减脂期', level: 'A', src: ['S28'] }
      ],
      serve: '低温慢煮/蒸/白灼更嫩；运动后与碳水同食。',
      pairs_good: ['broccoli'], pairs_bad: [], disease_tags: ['obesity', 'fitness'], tags: ['高蛋白'] },
    { id: 'crab', name: '螃蟹（河蟹）', cat: 'animal', photo: 'assets/img/crab.jpg', emoji: '🦀',
      tcm: { nature: '寒', flavor: '咸', meridian: '肝、胃', func: '清热、散血、消肿（《本草纲目》·蟹）', src: 'S5', level: 'C' },
      nutrients: { energy: 103, protein: 17.5, fat: 2.6, carb: 2.3, fiber: 0, notable: '优质蛋白；锌；蟹黄胆固醇较高', src: 'S2' },
      benefits: [
        { text: '优质蛋白与微量元素来源', level: 'A', src: ['S2'] }
      ],
      caution: '⛔ 死蟹不可食（组胺中毒风险）；务必蒸熟煮透；蟹黄胆固醇高，血脂异常者少吃；痛风患者注意嘌呤。',
      serve: '配姜醋（传统以姜之温制蟹之寒，药膳学记载）。',
      pairs_good: ['ginger'], pairs_bad: [], disease_tags: [], tags: ['高蛋白'] },
    { id: 'shrimp', name: '虾（对虾）', cat: 'animal', photo: 'assets/img/shrimp.jpg', emoji: '🦐',
      tcm: { nature: '温', flavor: '甘、咸', meridian: '肝、肾', func: '补肾壮阳、通乳（《本草纲目》·虾）', src: 'S5', level: 'C' },
      nutrients: { energy: 93, protein: 18.6, fat: 0.8, carb: 2.8, fiber: 0, notable: '蛋白质约18.6%；低脂', src: 'S2' },
      benefits: [
        { text: '高蛋白低脂白肉', level: 'A', src: ['S2'] }
      ],
      caution: '常见过敏原；头部嘌呤与胆固醇较高，痛风患者限量。',
      serve: '白灼保留鲜味；「虾+维C中毒」为谣言（见搭配页辨析）。',
      pairs_good: [], pairs_bad: [], disease_tags: [], tags: ['高蛋白'] },

    /* —— 油脂、饮品与调味 —— */
    { id: 'oliveoil', name: '橄榄油', cat: 'oil', photo: 'assets/img/oliveoil.jpg', emoji: '🫒',
      tcm: null,
      nutrients: { energy: 884, protein: 0, fat: 99.9, carb: 0, fiber: 0, notable: '单不饱和脂肪酸约73%；特级初榨含多酚', src: 'S2' },
      benefits: [
        { text: '地中海膳食模式的代表性油脂，用其替代动物油/黄油与心血管风险下降相关', level: 'A', src: ['S1', 'S17'] }
      ],
      serve: '特级初榨凉拌与低温烹调；每日烹调油总量 25–30g。',
      pairs_good: ['tomato', 'salmon'], pairs_bad: [], disease_tags: ['dyslipidemia'], tags: ['好脂肪'] },
    { id: 'camelliaoil', name: '茶籽油', alias: ['山茶油'], cat: 'oil', photo: 'assets/img/camelliaoil.jpg', emoji: '🫒',
      tcm: null,
      nutrients: { energy: 899, protein: 0, fat: 99.9, carb: 0, fiber: 0, notable: '油酸（单不饱和脂肪酸）约80%，脂肪酸构成与橄榄油相近', src: 'S2' },
      benefits: [
        { text: '高油酸植物油，替代饱和脂肪来源有助于血脂管理', level: 'B', src: ['S17'] }
      ],
      serve: '烟点较高，适合中式炒菜；仍需控制总量。',
      pairs_good: [], pairs_bad: [], disease_tags: ['dyslipidemia'], tags: ['好脂肪'] },
    { id: 'honey', name: '蜂蜜', cat: 'oil', photo: 'assets/img/honey.jpg', emoji: '🍯',
      tcm: { nature: '平', flavor: '甘', meridian: '肺、脾、大肠', func: '补中、润燥、止痛、解毒（药典 2020·蜂蜜）', src: 'S3', level: 'C' },
      nutrients: { energy: 321, protein: 0.4, fat: 1.9, carb: 75.6, fiber: 0, notable: '果糖+葡萄糖约75%；微量酶与多酚', src: 'S2' },
      benefits: [
        { text: '≥1 岁儿童夜间咳嗽：蜂蜜可能缓解症状（系统评价提示优于不处理/常规照护）', level: 'B', src: ['S34'] },
        { text: '传统润燥、补中（药典功能表述）', level: 'C', src: ['S3'] }
      ],
      caution: '⛔ 禁止给 1 岁以下婴儿食用（婴儿肉毒杆菌中毒风险）；本质是糖，控糖与减脂人群限量。',
      serve: '温水（<60℃）冲调；睡前 5–10g 缓解夜咳（≥1岁）。',
      pairs_good: [], pairs_bad: [], disease_tags: ['cold'], tags: [] },
    { id: 'tea', name: '绿茶（茶汤）', cat: 'oil', photo: 'assets/img/tea.jpg', emoji: '🍵',
      tcm: { nature: '凉', flavor: '苦、甘', meridian: '心、肺、胃', func: '清头目、除烦渴、化痰、消食（《本草纲目》·茗）', src: 'S5', level: 'C' },
      nutrients: { energy: 1, protein: 0, fat: 0, carb: 0.3, fiber: 0, notable: '儿茶素（EGCG）；咖啡因约 20–40mg/100ml（冲泡浓度影响大）', src: 'S2' },
      benefits: [
        { text: '长期饮茶与心血管疾病风险下降相关（观察性研究）', level: 'B', src: ['S1'] }
      ],
      caution: '缺铁性贫血者避免餐时/餐后即刻浓茶：单宁抑制非血红素铁吸收；睡前浓茶影响睡眠。',
      serve: '上午至下午饮；不空腹浓茶。',
      pairs_good: [], pairs_bad: ['iron'], disease_tags: [], tags: [] },
    { id: 'coffee', name: '咖啡（黑咖啡）', cat: 'oil', photo: 'assets/img/coffee.jpg', emoji: '☕',
      tcm: null,
      nutrients: { energy: 2, protein: 0.3, fat: 0, carb: 0.3, fiber: 0, notable: '咖啡因约 40–60mg/100ml（滴滤更高）；绿原酸', src: 'S2' },
      benefits: [
        { text: '适量咖啡（约3–4杯/日）与 2 型糖尿病、部分慢性病风险下降相关（观察性证据）', level: 'B', src: ['S1'] }
      ],
      caution: '咖啡因半衰期约 3–7 小时且个体差异大：睡眠敏感者午后不再摄入；孕妇每日咖啡因 ≤200mg。',
      serve: '黑咖或加奶；含糖咖啡饮品计入添加糖。',
      pairs_good: [], pairs_bad: ['iron'], disease_tags: [], tags: [] }
  ],

  /* ---------- 常见药物（用于食物-药物配对查询） ---------- */
  DRUGS: [
    { id: 'statin', name: '他汀类降脂药（阿托伐他汀、辛伐他汀等）', note: 'CYP3A4 底物' },
    { id: 'ccb', name: '二氢吡啶类钙通道阻滞剂（非洛地平、硝苯地平等）', note: 'CYP3A4 底物' },
    { id: 'warfarin', name: '华法林（抗凝药）', note: '维生素K拮抗剂' },
    { id: 'cephalosporin', name: '头孢类抗生素（部分含甲硫四氮唑侧链）', note: '双硫仑样反应' },
    { id: 'acetaminophen', name: '对乙酰氨基酚（扑热息痛）', note: '肝代谢' },
    { id: 'iron', name: '口服铁剂（硫酸亚铁等）', note: '吸收受多价阳离子与单宁影响' },
    { id: 'levothyroxine', name: '左甲状腺素（优甲乐）', note: '吸收受钙、豆类、高纤维干扰' },
    { id: 'alcohol', name: '酒精（饮酒）', note: '多途径相互作用' },
    { id: 'ginseng', name: '人参（补气中药）', note: '传统配伍禁忌' },
    { id: 'acei', name: '普利类/沙坦类降压药、螺内酯（保钾）', note: '血钾升高风险' },
    { id: 'hypoglycemic', name: '口服降糖药（二甲双胍、磺脲类等）', note: '低血糖叠加风险' }
  ],

  /* ---------- 搭配数据（25 组） ----------
     verdict: good宜 | caution慎 | bad忌/禁 | neutral中性（含辟谣） */
  PAIRS: [
    /* —— 协同（宜） —— */
    { a: 'spinach', b: 'orange', verdict: 'good', level: 'B', src: ['S20', 'S26'],
      modern: '维生素 C 可将非血红素铁还原为亚铁态并促进吸收，与富铁植物性食物同餐食用有助于提高铁利用率。', tcm: '', tip: '缺铁人群：富铁餐搭配橙子、猕猴桃或彩椒同吃。' },
    { a: 'mungbean', b: 'brownrice', verdict: 'good', level: 'A', src: ['S1'],
      modern: '蛋白质互补：豆类赖氨酸丰富而谷类蛋氨酸丰富，谷豆同食（杂豆饭/杂粮粥）氨基酸互补，提高蛋白质生物学价值。', tcm: '谷豆同煮为传统杂粮饭做法。', tip: '豆:谷 ≈ 1:3 起步，口感易接受。' },
    { a: 'yogurt', b: 'oat', verdict: 'good', level: 'B', src: ['S1'],
      modern: '蛋白质 + 可溶性纤维组合饱腹感强、餐后血糖更平稳，适合早餐。', tcm: '', tip: '选无糖酸奶，加少量坚果更佳。' },
    { a: 'tomato', b: 'oliveoil', verdict: 'good', level: 'B', src: ['S1'],
      modern: '番茄红素为脂溶性，与油脂同烹（番茄炒蛋、番茄炖牛腩）生物利用度显著提高。', tcm: '', tip: '熟制 + 少量油 > 生吃（番茄红素角度）；生吃则补维C。' },
    { a: 'tofu', b: 'kelp', verdict: 'good', level: 'C', src: ['S13'],
      modern: '蛋白质与碘、海藻酸互补；豆腐中皂苷促进碘排泄的说法证据不足，海带补碘恰好互补（传统搭配逻辑）。', tcm: '「豆腐配海带」为传统药膳搭配，典籍与药膳学教材记载。', tip: '海带豆腐汤：低能量高蛋白，适合三高人群。' },
    { a: 'egg', b: 'milk', verdict: 'good', level: 'B', src: ['S1'],
      modern: '两种优质蛋白来源互补，早餐组合提供持久饱腹与稳定氨基酸供应。', tcm: '', tip: '水煮蛋 + 牛奶是最简单的优质蛋白早餐。' },
    { a: 'salmon', b: 'oliveoil', verdict: 'good', level: 'B', src: ['S17'],
      modern: '低温烹调时以单不饱和油脂为主，避免n-3脂肪酸在高饱和油/反复油炸下氧化。', tcm: '', tip: '锡纸包烤或清蒸更优。' },
    { a: 'ginger', b: 'crab', verdict: 'good', level: 'C', src: ['S13'],
      modern: '姜醋汁去腥提味，并为高蛋白寒性食材增添温性风味（感官与饮食习惯层面）。', tcm: '蟹性寒，传统以姜之温制之——药膳学经典「寒温制衡」配伍。', tip: '蒸蟹配姜醋是风味与传统的双重经典。' },
    /* —— 拮抗 / 需注意（慎） —— */
    { a: 'spinach', b: 'tofu', verdict: 'caution', level: 'B', src: ['S20'],
      modern: '草酸可与钙结合影响吸收，但「菠菜豆腐结石」被夸大：菠菜焯水 30 秒可去除大部分草酸，两者完全可以同食。', tcm: '典籍无此禁忌，为现代流传说法。', tip: '关键动作：菠菜先焯水，再与豆腐同烹。' },
    { a: 'tea', b: 'iron', verdict: 'caution', level: 'A', src: ['S31'],
      modern: '茶多酚（单宁类）与铁络合，显著抑制非血红素铁吸收。', tcm: '', tip: '服铁剂前后 2 小时内不饮浓茶；贫血纠正期间茶与铁剂错开。', drugWarn: '铁剂治疗期间大量浓茶可降低补铁效果。' },
    { a: 'coffee', b: 'iron', verdict: 'caution', level: 'A', src: ['S31'],
      modern: '多酚类物质同样抑制非血红素铁吸收。', tcm: '', tip: '早餐咖啡与铁剂/富铁餐错开 1–2 小时。', drugWarn: '同上：影响铁剂疗效。' },
    { a: 'milk', b: 'iron', verdict: 'caution', level: 'A', src: ['S31'],
      modern: '钙与铁在肠上皮竞争吸收通道，同服降低铁吸收率。', tcm: '', tip: '铁剂用温水送服，与牛奶/酸奶间隔 2 小时。', drugWarn: '铁剂不要与牛奶、钙片同服。' },
    { a: 'milk', b: 'levothyroxine', verdict: 'caution', level: 'A', src: ['S31'],
      modern: '牛奶中的钙显著降低左甲状腺素吸收。', tcm: '', tip: '左甲状腺素晨起空腹温水送服，至少 30–60 分钟后再进早餐（含奶/豆制品更要错开）。', drugWarn: '同服可使药效下降，甲功波动。' },
    { a: 'banana', b: 'acei', verdict: 'caution', level: 'A', src: ['S31'],
      modern: '普利/沙坦类与螺内酯可升高血钾，大量高钾食物（香蕉、土豆、低钠盐等）叠加有高钾血症风险。', tcm: '', tip: '正常量食用通常安全，但不要刻意「补钾」；定期复查血钾。', drugWarn: '出现心悸、肌无力及时就医查电解质。' },
    { a: 'bittergourd', b: 'hypoglycemic', verdict: 'caution', level: 'B', src: ['S31', 'S15'],
      modern: '苦瓜提取物有轻度降糖作用的报道，与降糖药叠加可能增加低血糖风险。', tcm: '', tip: '苦瓜作蔬菜正常食用无碍；浓缩提取物/保健品需告知医生。', drugWarn: '低血糖表现：心慌、出汗、手抖——及时进含糖食物。' },
    { a: 'spinach', b: 'warfarin', verdict: 'caution', level: 'A', src: ['S31'],
      modern: '华法林通过拮抗维生素K发挥抗凝作用；深绿叶菜维K含量高，摄入量大幅波动会干扰抗凝稳定性。', tcm: '', tip: '正确做法不是「戒绿叶菜」，而是保持每日绿叶菜摄入量稳定，配合规律监测 INR。', drugWarn: '擅自大幅增减绿叶菜可致 INR 波动：血栓或出血风险。' },
    { a: 'ginseng', b: 'daikon', verdict: 'caution', level: 'C', src: ['S13'],
      modern: '现代研究未发现明确拮抗；传统认为萝卜下气、人参补气，一消一补同用「减效」（相恶）。', tcm: '《本草纲目》载莱菔「下气」，传统服人参期间忌萝卜（经验医学）。', tip: '服人参/党参等补气药期间，按传统习惯避免大量白萝卜与萝卜干。' },
    { a: 'alcohol', b: 'sardine', verdict: 'caution', level: 'A', src: ['S18'],
      modern: '酒精促进嘌呤分解并抑制尿酸排泄，与高嘌呤食物（沙丁鱼、动物内脏、浓肉汤）叠加显著升高痛风发作风险；啤酒风险最高。', tcm: '', tip: '高尿酸血症与痛风患者限酒（尤其啤酒），急性期禁酒。' },
    /* —— 明确不良（忌/禁） —— */
    { a: 'grapefruit', b: 'statin', verdict: 'bad', level: 'A', src: ['S31'],
      modern: '西柚中呋喃香豆素不可逆抑制肠道 CYP3A4，使他汀（尤其辛伐他汀/洛伐他汀）血药浓度显著升高，增加肌肉损伤（横纹肌溶解）风险。', tcm: '',
      tip: '服用他汀期间以普通橙子替代西柚；具体品种请咨询医生/药师。', drugWarn: '监护信号：不明原因肌肉酸痛、乏力、尿色加深（酱油色尿）——立即就医。' },
    { a: 'grapefruit', b: 'ccb', verdict: 'bad', level: 'A', src: ['S31'],
      modern: '同经 CYP3A4 代谢的二氢吡啶类（非洛地平、硝苯地平）受西柚影响血药浓度升高，可致低血压、心动过速、面部潮红。', tcm: '',
      tip: '并非所有降压药都受影响（如氨氯地平影响较小），但用药期间建议一律避开西柚与西柚汁。', drugWarn: '出现头晕、心悸、面色潮红加重时测血压并及时就医。' },
    { a: 'alcohol', b: 'cephalosporin', verdict: 'bad', level: 'A', src: ['S31'],
      modern: '部分头孢菌素（含甲硫四氮唑侧链，如头孢哌酮、拉氧头孢等）抑制乙醛脱氢酶，饮酒后乙醛蓄积发生「双硫仑样反应」：面部潮红、头痛、心悸、呼吸困难，重者休克。', tcm: '',
      tip: '用药期间及停药后 7 天内避免任何含酒精饮品、藿香正气水（含酒精）、酒心巧克力及酒精擦浴。', drugWarn: '⛔ 双硫仑样反应可危及生命——一旦发生立即就医。' },
    { a: 'alcohol', b: 'acetaminophen', verdict: 'bad', level: 'A', src: ['S31'],
      modern: '饮酒者长期/大量服用对乙酰氨基酚肝毒性风险显著增加（诱导CYP2E1产生肝毒性代谢物）；酒后「吃扑热息痛护肝」是危险误区。', tcm: '',
      tip: '饮酒当晚避免自行服对乙酰氨基酚；确需解热镇痛遵说明书最小有效剂量。', drugWarn: '肝损伤早期可无明显症状——勿叠加酒精与超剂量。' },
    /* —— 中性 / 辟谣 —— */
    { a: 'persimmon', b: 'crab', verdict: 'neutral', level: 'D', src: ['S12'],
      modern: '「柿蟹相克中毒」无科学依据。真实风险在于：空腹大量吃未脱涩柿子（鞣酸+胃酸→胃石），与螃蟹无关；两者适量、蟹熟柿熟即可。', tcm: '典籍无「柿蟹相克」记载，属近现代民间流传。', tip: '不空腹吃大量柿子即可；螃蟹务必蒸熟。' },
    { a: 'soymilk', b: 'egg', verdict: 'neutral', level: 'B', src: ['S12'],
      modern: '「豆浆冲蛋影响吸收」的根源是生豆浆胰蛋白酶抑制剂——彻底煮沸（假沸后再煮5分钟）后即失活，煮透的豆浆与鸡蛋互不影响。', tcm: '', tip: '豆浆煮熟、鸡蛋全熟，同吃没问题。' },
    { a: 'shrimp', b: 'orange', verdict: 'neutral', level: 'D', src: ['S12'],
      modern: '「虾+维C=砒霜」是谣言：海鲜砷含量极低且形态转化需要极端条件，正常食用量下同时吃虾与橙子不会生成有毒砷化物。', tcm: '', tip: '真正需要注意的是海鲜过敏与彻底煮熟。' }
  ],

  /* ---------- 疾病食疗（13 种） ---------- */
  DISEASES: [
    { id: 't2dm', name: '2型糖尿病', page: 'disease-metabolic.html#s1',
      brief: '以胰岛素抵抗与进行性胰岛β细胞功能缺陷为特征的慢性代谢疾病；医学营养治疗是全线治疗的基础。',
      targets: ['控制体重（超重者减重5–10%）', '平稳餐后血糖、糖化血红蛋白个体化达标', '降低大血管与微血管并发症风险'],
      recommend: [
        { food: 'oat', why: 'β-葡聚糖延缓葡萄糖吸收，低GI', level: 'A' },
        { food: 'brownrice', why: '全谷物替代精制谷物，餐后血糖更平稳', level: 'B' },
        { food: 'buckwheat', why: '低升糖指数主食（荞麦面 GI≈59）', level: 'B' },
        { food: 'tofu', why: '优质蛋白替代部分红肉', level: 'B' },
        { food: 'broccoli', why: '低能量非淀粉蔬菜，不限量方向', level: 'A' },
        { food: 'salmon', why: '优质蛋白+n-3脂肪酸，每周1–2次深海鱼', level: 'A' }
      ],
      limit: ['含糖饮料与果汁（首要目标）', '精制碳水为主的餐食（白粥+咸菜型早餐）', '油炸食品与高饱和脂肪', '酒精（用胰岛素/磺脲者低血糖风险）'],
      meal: '早：杂粮粥+水煮蛋+凉拌菠菜｜午：荞麦面+鸡胸肉+西兰花｜晚：糙米饭+清蒸鱼+番茄豆腐汤｜加餐：无糖酸奶或原味坚果10g',
      red_flag: '未确诊者出现多饮、多尿、多食、体重下降或持续乏力——尽快就医查血糖；已确诊者血糖反复≥13.9mmol/L 或波动明显——就医调整方案；血糖≥16.7mmol/L 伴恶心呕吐、呼吸深快（酮症酸中毒征兆）、意识改变、严重低血糖处理后不缓解——立即急诊；糖尿病足任何伤口（哪怕很小、不痛）——尽快就医。',
      src: ['S15', 'S1'] },
    { id: 'dyslipidemia', name: '血脂异常', page: 'disease-metabolic.html#s2',
      brief: '包括高胆固醇（LDL-C升高）与高甘油三酯，是动脉粥样硬化性心血管病的核心可控危险因素。',
      targets: ['降低 LDL-C 与甘油三酯', '以「好脂肪」替代「坏脂肪」', '控制体重与精制碳水/酒精'],
      recommend: [
        { food: 'oat', why: 'β-葡聚糖降低 LDL-C（每日≥3g 可溶性纤维）', level: 'A' },
        { food: 'salmon', why: 'EPA/DHA 有助于降低甘油三酯', level: 'A' },
        { food: 'walnut', why: '坚果替代零食，与心血管风险下降相关', level: 'B' },
        { food: 'oliveoil', why: '单不饱和脂肪替代动物油/黄油', level: 'A' },
        { food: 'tofu', why: '大豆蛋白有助于降低 LDL-C', level: 'B' },
        { food: 'flaxseed', why: 'ALA + 可溶性纤维', level: 'B' }
      ],
      limit: ['反式脂肪（人造奶油、起酥油点心、反复油炸）', '肥肉、动物内脏、黄油', '过量精制碳水与酒精（升甘油三酯）'],
      meal: '地中海模式示例：早：燕麦+无糖酸奶+核桃｜午：全麦面包+橄榄油拌蔬菜+烤鱼｜晚：杂豆饭+白灼虾+绿叶菜（柠檬汁调味）',
      red_flag: '体检发现血脂异常——就医评估心血管风险与是否需要用药（不必等出现症状）；活动后胸痛胸闷、突发一侧肢体无力或言语不清（中风征兆）——立即急诊；已服降脂药者不可因「食疗见效」自行停药，是否调药由复查后的医生决定。',
      src: ['S17', 'S1'] },
    { id: 'hypertension', name: '高血压', page: 'disease-metabolic.html#s3',
      brief: '持续血压升高是最常见的慢性病；限钠、DASH 膳食模式与减重是生活方式治疗的三大支柱。',
      targets: ['每日食盐 <5g（钠 <2000mg）', '充足钾摄入（食物来源）', '控制体重、限酒'],
      recommend: [
        { food: 'spinach', why: '高钾低钠绿叶菜（DASH 模式核心）', level: 'B' },
        { food: 'banana', why: '便携高钾水果（肾功正常者）', level: 'B' },
        { food: 'potato', why: '钾约340mg/100g，蒸制为佳', level: 'B' },
        { food: 'milk', why: '低脂乳制品为 DASH 模式组成部分', level: 'B' },
        { food: 'tofu', why: '大豆蛋白替代部分红肉', level: 'B' }
      ],
      limit: ['盐与隐形盐（酱油、鸡精、咸菜、挂面含钠、加工肉）', '腌制与烟熏食品', '酒精（升压）', '「低钠盐」——用前咨询医生（高钾风险）'],
      meal: 'DASH 示例：早：牛奶+全麦馒头+蛋｜午：糙米饭+芹菜香干+清蒸鸡｜晚：红薯+菠菜汤+凉拌豆腐（全天盐控制在4g，善用醋/柠檬/香辛料调味）',
      red_flag: '家庭自测血压非同日三次≥140/90mmHg——就医确诊与评估；≥160/100mmHg——尽快就诊；≥180/120mmHg 伴头痛、视物模糊、胸痛或气促——高血压急症，立即急诊；任何情况下不可自行停药或加量。',
      src: ['S16', 'S10'] },
    { id: 'obesity', name: '超重与肥胖', page: 'disease-metabolic.html#s4',
      brief: '能量摄入长期超过消耗的慢性代谢问题；减重的核心是「可坚持的能量缺口」而非挨饿。',
      targets: ['每日 300–500kcal 能量缺口', '保住肌肉：足量蛋白+抗阻运动', '建立可长期维持的饮食结构'],
      recommend: [
        { food: 'chickenbreast', why: '高蛋白低脂，减脂期保肌肉', level: 'A' },
        { food: 'egg', why: '饱腹感强的优质蛋白', level: 'A' },
        { food: 'broccoli', why: '低能量密度蔬菜增加饱腹', level: 'B' },
        { food: 'oat', why: '可溶性纤维延缓胃排空', level: 'B' },
        { food: 'apple', why: '整果替代甜食零食', level: 'B' },
        { food: 'yogurt', why: '无糖酸奶作为加餐', level: 'B' }
      ],
      limit: ['含糖饮料（首位干预目标，包括奶茶、果汁）', '油炸与高脂加工食品', '酒精（纯热量）', '极端节食/单一食物减肥法（反弹与肌肉流失）'],
      meal: '示例（约1500kcal）：早：燕麦40g+牛奶250ml+蛋1个｜午：杂粮饭+鸡胸150g+焯拌西兰花｜加：苹果1个｜晚：豆腐蔬菜汤+玉米半根',
      red_flag: 'BMI≥28（肥胖）或腰围男≥90cm/女≥85cm——建议就医或寻求专业营养指导，已合并糖尿病/高血压/睡眠呼吸暂停者更应系统评估；节食期间出现月经紊乱、大量脱发、心悸、明显乏力或情绪异常——立即停止极端节食并就医；青少年肥胖——就诊儿童营养/内分泌门诊，不宜自行节食减肥。',
      src: ['S19', 'S1'] },
    { id: 'gout', name: '高尿酸血症与痛风', page: 'disease-metabolic.html#s5',
      brief: '嘌呤代谢紊乱致血尿酸升高、尿酸盐结晶沉积关节引发剧烈炎症；饮食是基础，急性期止痛与降尿酸以药物为主。',
      targets: ['限制高嘌呤+酒精+果糖三联', '多饮水（每日2000ml以上）促进尿酸排泄', '急性期规范抗炎止痛（就医）'],
      recommend: [
        { food: 'milk', why: '低脂乳制品与尿酸水平下降相关', level: 'B' },
        { food: 'yogurt', why: '同上，无糖为佳', level: 'B' },
        { food: 'coffee', why: '规律饮用咖啡与血尿酸下降相关（观察性）', level: 'B' },
        { food: 'kiwi', why: '维C来源（研究提示与尿酸排泄增加相关）', level: 'B' }
      ],
      limit: ['动物内脏（肝、肾、脑）', '浓肉汤、海鲜火锅汤底', '啤酒与白酒（急性期严格禁）', '含果糖饮料（奶茶、可乐）', '急性期限沙丁鱼/凤尾鱼/贝类'],
      meal: '示例：早：牛奶+全麦面包+蛋｜午：米饭+清炒时蔬+少量瘦猪肉｜晚：面条+鸡蛋+黄瓜拌木耳｜全天饮水>2000ml',
      red_flag: '体检发现血尿酸升高——就医评估（即使从未发作过）；关节突发红肿热痛——尽快（48小时内）就医明确诊断并规范抗炎，不要热敷按摩或自服抗生素；发作伴发热、多关节受累，或出现腰痛血尿（尿酸性结石）——立即急诊。',
      src: ['S18'] },
    { id: 'fattyliver', name: '非酒精性脂肪性肝病', page: 'disease-metabolic.html#s6',
      brief: '与胰岛素抵抗密切相关的肝脏脂肪沉积；减重是唯一被证实有效的核心干预。',
      targets: ['减重 5–10%（核心目标）', '限制果糖与酒精', '运动配合（独立获益）'],
      recommend: [
        { food: 'oat', why: '全谷物替代精制碳水', level: 'B' },
        { food: 'salmon', why: 'n-3脂肪酸改善肝脏脂肪（研究提示）', level: 'B' },
        { food: 'coffee', why: '咖啡摄入与肝酶改善/纤维化风险下降相关（观察性）', level: 'B' },
        { food: 'oliveoil', why: '地中海模式核心油脂', level: 'B' },
        { food: 'broccoli', why: '低能量密度蔬菜', level: 'B' }
      ],
      limit: ['含糖饮料与果汁（果糖直接促进肝脏脂肪合成）', '酒精（叠加肝损伤）', '精制碳水与夜宵', '高果糖玉米糖浆加工食品'],
      meal: '示例：早：燕麦+无糖豆浆+蛋｜午：杂粮饭+清蒸鱼+双份蔬菜｜晚：少量红薯+豆腐青菜汤；每周150分钟中等强度运动',
      red_flag: '体检提示脂肪肝或转氨酶升高——就医明确病因与程度（还需排查酒精、药物、病毒性肝炎等其他原因，不全是「吃出来的」）；皮肤巩膜黄染、腹胀腹围增大（腹水）、下肢水肿、皮肤易瘀斑、嗜睡意识改变——立即急诊；确诊者定期复查并评估肝纤维化（FIB-4/弹性超声）。',
      src: ['S21', 'S1'] },
    { id: 'gastritis', name: '慢性胃炎与功能性消化不良', page: 'disease-gi.html#s1',
      brief: '常见上腹隐痛、早饱、嗳气；若检出幽门螺杆菌感染，规范根除治疗（药物）才是根本，食物只是辅助。',
      targets: ['规律进餐、细嚼慢咽', '减少黏膜刺激物', '幽门螺杆菌阳性者规范根除（就医）'],
      recommend: [
        { food: 'millet', why: '传统养胃粥品（典籍记载，经验）', level: 'C' },
        { food: 'yam', why: '药典记载补脾养胃', level: 'C' },
        { food: 'ginger', why: '止呕证据较充分（NIH 评价）', level: 'B' },
        { food: 'yogurt', why: '益生菌对部分功能性消化不良可能有益（证据有限）', level: 'B' }
      ],
      limit: ['浓茶、咖啡、酒精、辛辣', '过烫饮食（>65℃热饮属2A类致癌因素）', '暴饮暴食与睡前进食', '长期自行服用阿司匹林/布洛芬等NSAIDs'],
      meal: '示例：三餐定时+两餐间少量加餐；主食软烂（粥、面）、蛋白质蒸煮为主；餐后不平卧',
      red_flag: '上腹不适超过 2 周不缓解或反复发作——就医（含幽门螺杆菌检测）；呕血或黑便（柏油样便）——立即急诊；进行性消瘦、吞咽困难、不明原因贫血、疼痛规律改变、40 岁以上新发上腹痛——尽快就医查胃镜。',
      src: ['S1', 'S12'] },
    { id: 'constipation', name: '便秘', page: 'disease-gi.html#s2',
      brief: '排便次数减少（<3次/周）或排便困难；绝大多数为功能性，纤维+水+运动三件套是首选。',
      targets: ['纤维 25–30g/日', '足量饮水（1.5–1.7L）', '规律运动与排便习惯'],
      recommend: [
        { food: 'kiwi', why: '每日2个猕猴桃改善便秘有RCT支持（指南引用）', level: 'B' },
        { food: 'flaxseed', why: '可溶性纤维温和通便', level: 'B' },
        { food: 'pear', why: '水分+纤维（传统润肠）', level: 'C' },
        { food: 'sweetpotato', why: '薯类纤维', level: 'B' },
        { food: 'mulberry', why: '纤维+传统润肠（桑椹）', level: 'C' },
        { food: 'spinach', why: '绿叶菜纤维与镁', level: 'B' }
      ],
      limit: ['低纤维精制饮食（白米白面+肉为主）', '饮水不足', '久坐与长期憋便', '长期依赖刺激性泻药（番泻叶/芦荟/大黄）'],
      meal: '示例：早：燕麦+奇亚籽/亚麻籽粉+酸奶｜午：杂粮饭+双份蔬菜｜晚：红薯+青菜豆腐；全天水>1600ml，餐后散步',
      red_flag: '调整饮食与运动 2 周仍无改善，或已长期依赖泻药——就医；任何便血——就医查明原因（不要自行归为「痔疮」）；排便习惯突然改变、大便变细、消瘦、贫血、有肠癌家族史——尽快就医肠镜；便秘伴腹胀呕吐、停止排气排便——肠梗阻可能，立即急诊。',
      src: ['S1', 'S20'] },
    { id: 'diarrhea', name: '急性腹泻与口服补液', page: 'disease-gi.html#s3',
      brief: '急性腹泻的最大危险是脱水与电解质紊乱；口服补液盐（ORS）是全球公认的家庭救命手段。',
      targets: ['预防/纠正脱水（ORS 为核心）', '继续进食（不主张禁食）', '儿童补锌（缩短病程）'],
      recommend: [
        { food: 'millet', why: '熟米粥/小米粥提供水分与能量', level: 'B' },
        { food: 'banana', why: '补充丢失的钾', level: 'B' },
        { food: 'yogurt', why: '益生菌辅助恢复（证据有限但安全）', level: 'B' },
        { food: 'ginger', why: '传统止呕辅助（呕吐明显时）', level: 'C' }
      ],
      limit: ['高糖饮料与果汁（渗透性加重腹泻）', '高脂油炸食物', '酒精与咖啡因', '止泻药物的自行滥用（感染性腹泻可能延长病程）'],
      meal: '轻症：稀粥、软面条、香蕉、无糖酸奶；少量多次进食与补水。',
      red_flag: '出现脱水征象（口渴明显、尿量减少、头晕乏力）——尽快就医补液；血便、持续高热、频繁呕吐无法进水、精神萎靡——立即急诊；婴幼儿、老人、孕妇、免疫低下者腹泻超过 24 小时或伴发热——就医；普通成人腹泻超过 1–2 天无好转或反复——就医。',
      src: ['S25'] },
    { id: 'anemia', name: '缺铁性贫血', page: 'disease-gi.html#s4',
      brief: '最常见的贫血类型；膳食补铁有效但前提是查明并处理病因（月经量多、消化道失血、吸收不良等）。',
      targets: ['增加血红素铁摄入', '植物铁配维C促吸收', '干扰因素错时（茶/咖啡/钙）'],
      recommend: [
        { food: 'porkliver', why: '血红素铁约22.6mg/100g，吸收率高', level: 'A' },
        { food: 'spinach', why: '非血红素铁+自带维C', level: 'B' },
        { food: 'orange', why: '维C同餐促非血红素铁吸收', level: 'A' },
        { food: 'egg', why: '辅助优质蛋白', level: 'B' }
      ],
      limit: ['餐时浓茶咖啡（单宁抑制铁吸收）', '铁剂与牛奶/钙片同服', '未经评估自行长期「食补」延误病因诊治'],
      meal: '示例（轮换）：每周1–2次猪肝（25–50g/次）或瘦红肉；每天深绿叶菜+柑橘类水果；贫血纠正期间茶咖啡与主餐错开2小时。',
      red_flag: '⚠ 查出贫血（血红蛋白低于参考范围）就应就医——轻度也要：先查明病因（月经过多、消化道失血、营养缺乏、吸收不良），再谈「食补」；出现明显心悸气短、乏力加重、晕厥或活动耐力明显下降——尽快就医（重度贫血为急诊）；孕期任何程度贫血、儿童贫血（尤其伴发育迟缓或异食癖）——就医；月经量明显增多的女性即使未确诊贫血，也建议查一次血常规。',
      src: ['S26', 'S20'] },
    { id: 'megaloblastic', name: '巨幼细胞性贫血（B12/叶酸缺乏）', page: 'disease-gi.html#s5',
      brief: '维生素B12 或叶酸缺乏导致红细胞 DNA 合成障碍；B12 缺乏还可损伤神经系统且不可逆，须及时就医。',
      targets: ['明确缺乏的营养素（血液检查）', 'B12：动物性食品或补充剂（素食者/吸收障碍者）', '叶酸：绿叶菜+必要时补充剂'],
      recommend: [
        { food: 'egg', why: '维生素B12 食物来源', level: 'A' },
        { food: 'milk', why: '维生素B12 来源', level: 'A' },
        { food: 'yogurt', why: '同上', level: 'A' },
        { food: 'spinach', why: '叶酸约169μg/100g', level: 'A' }
      ],
      limit: ['长期纯素且不补充B12', '过度烹煮绿叶菜（叶酸易破坏）', '自行大剂量叶酸掩盖B12缺乏（加重神经损害）'],
      meal: '示例：规律蛋奶+每日绿叶菜（急火快炒/凉拌）；素食者使用强化食品或B12补充剂（遵医嘱）。',
      red_flag: '确诊巨幼细胞性贫血——就医查明缺的是B12还是叶酸（自行补叶酸可能掩盖B12缺乏、加重神经损害）；出现手足麻木、平衡障碍、记忆减退等任何神经症状——尽快就医（神经损害拖延可不可逆）；长期纯素、胃肠手术后、长期服抑酸药者——定期筛查B12；备孕/孕早期叶酸补充遵产科医嘱。',
      src: ['S20', 'S26'] },
    { id: 'immunity', name: '免疫与呼吸道感染恢复', page: 'disease-gi.html#s6',
      brief: '不存在「吃了就提高免疫力」的神物；免疫功能的营养基础是蛋白质、微量营养素与整体膳食质量。',
      targets: ['蛋白质摄入充足', '纠正已知微量营养素缺乏（维D、锌等）', '睡眠与整体膳食模式'],
      recommend: [
        { food: 'egg', why: '优质蛋白基础', level: 'A' },
        { food: 'milk', why: '蛋白+多种微量营养素', level: 'A' },
        { food: 'shiitake', why: '维D前体（日晒干菇更高）', level: 'B' },
        { food: 'kiwi', why: '维C（感染期需求上升）', level: 'B' },
        { food: 'ginger', why: '传统温散风寒（姜汤）', level: 'C' },
        { food: 'honey', why: '≥1岁儿童夜间咳嗽可能缓解', level: 'B' }
      ],
      limit: ['过量酒精（急性期抑制免疫）', '极端节食与营养不良', '大剂量单一维生素「防感冒」（证据不支持）'],
      meal: '恢复期：软食+足量水分；姜汤/柠檬水缓解咽部不适（≥1岁可用蜂蜜水）；正常均衡三餐。',
      red_flag: '普通成人发热超过 3 天不退、高热≥39℃退烧药无效、呼吸急促或胸痛、精神明显变差——就医；婴幼儿、老人、孕妇、慢病或免疫低下人群门槛更低：发热超过 24 小时、精神差、拒食、呼吸急促——就医；呼吸困难、口唇发绀、意识改变——立即急诊；普通感冒不需要抗生素。',
      src: ['S1', 'S34', 'S20'] },
    { id: 'osteoporosis', name: '骨质疏松', page: 'disease-gi.html#s7',
      brief: '骨量减少、骨微结构破坏致脆性骨折风险升高；营养（钙+维D）是基础，确诊者需规范抗骨松药物治疗。',
      targets: ['钙 800–1000mg/日（食物优先）', '维生素 D 充足（晒太阳+必要时补充）', '抗阻与负重运动、防跌倒'],
      recommend: [
        { food: 'milk', why: '钙约104mg/100ml，吸收率高', level: 'A' },
        { food: 'tofu', why: '石膏豆腐含钙', level: 'B' },
        { food: 'blacksesame', why: '高钙（碾碎吸收更好）', level: 'B' },
        { food: 'salmon', why: '天然维D+n-3', level: 'B' },
        { food: 'spinach', why: '维K参与骨钙代谢（焯水去草酸）', level: 'B' }
      ],
      limit: ['高盐（尿钙排出增加）', '过量咖啡因（>400mg/日咖啡因）', '酒精', '过量碳酸饮料（磷负荷）'],
      meal: '示例：牛奶300–500ml/日+北豆腐+深绿叶菜（焯水）+芝麻酱拌菜；每周2次深海鱼；日照15–30分钟（暴露手臂面部）。',
      red_flag: '绝经后女性、65 岁以上男性、长期用糖皮质激素者——建议体检做骨密度检查；骨密度提示「骨量减少」即应就医评估干预时机；轻微跌倒或弯腰负重后骨折、身高变矮超过 3cm、突发驼背、持续腰背痛——尽快就医（警惕椎体骨折）；确诊骨质疏松后单靠补钙远远不够，需规范抗骨松药物治疗。',
      src: ['S27', 'S20'] }
  ],

  /* ---------- 药食同源（39 种详卡；性味归经与功能主治为药典 2020 一部口径转述） ---------- */
  HERBS: [
    /* 益气健脾 */
    { id: 'shanyao', name: '山药', cat: 'qipi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、肺、肾', func: '补脾养胃、生津益肺、补肾涩精' }, dose: '15–30g',
      modern: { text: '黏蛋白等多糖类物质研究多集中于消化黏膜保护（实验阶段），人群证据有限', level: 'C', src: ['S3'] },
      caution: '湿盛中满（腹胀苔厚）者不宜久服生用；不可生食。' },
    { id: 'dazao', name: '大枣（枣）', cat: 'qipi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '甘', meridian: '脾、胃、心', func: '补中益气、养血安神' }, dose: '6–15g',
      modern: { text: '传统「气血双补」食疗基础食材，常入药膳汤方', level: 'C', src: ['S3'] },
      caution: '含糖量高，糖尿病人群计入主食；痰湿腹胀者少食。' },
    { id: 'fuling', name: '茯苓', cat: 'qipi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘、淡', meridian: '心、脾、肾', func: '利水渗湿、健脾、宁心' }, dose: '10–15g',
      modern: { text: '茯苓多糖免疫调节研究多为实验证据；临床利尿作用温和', level: 'C', src: ['S3'] },
      caution: '虚寒滑精者慎用（传统）。' },
    { id: 'gancao', name: '甘草', cat: 'qipi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘', meridian: '心、肺、脾、胃', func: '补脾益气、清热解毒、祛痰止咳、缓急止痛、调和诸药' }, dose: '2–10g',
      modern: { text: '甘草酸长期大量摄入可致假性醛固酮增多症（高血压、低血钾）——有明确药理证据', level: 'A', src: ['S3', 'S31'] },
      caution: '⚠️ 长期大量（含甘草蜜饯、复方甘草片）可升高血压、降血钾；高血压患者慎用；不宜与大戟、甘遂、海藻同用（十八反）。' },
    { id: 'huangjing', name: '黄精', cat: 'qipi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、肺、肾', func: '补气养阴、健脾、润肺、益肾' }, dose: '9–15g',
      modern: { text: '黄精多糖研究集中于抗氧化与免疫（实验阶段）', level: 'C', src: ['S3'] },
      caution: '中寒泄泻、痰湿痞满者忌服（传统）；制黄精口感更佳。' },
    /* 补血滋阴 */
    { id: 'longyan', name: '龙眼肉（桂圆）', cat: 'buxue', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '甘', meridian: '心、脾', func: '补益心脾、养血安神' }, dose: '9–15g',
      modern: { text: '传统思虑过度、心悸失眠食疗方（桂圆红枣汤）的基础', level: 'C', src: ['S3'] },
      caution: '甘温助火：内热痰多、糖尿病者少食。' },
    { id: 'sangshen', name: '桑椹', cat: 'buxue', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '寒', flavor: '甘、酸', meridian: '心、肝、肾', func: '滋阴补血、生津润燥' }, dose: '9–15g',
      modern: { text: '花青素含量高（抗氧化成分）', level: 'B', src: ['S2'] },
      caution: '脾胃虚寒便溏者少食。' },
    { id: 'baihe', name: '百合', cat: 'buxue', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '寒', flavor: '甘', meridian: '心、肺', func: '养阴润肺、清心安神' }, dose: '6–12g',
      modern: { text: '传统秋燥干咳、虚烦失眠药膳（百合莲子羹）', level: 'C', src: ['S3'] },
      caution: '风寒咳嗽者不宜（传统）。' },
    { id: 'yuzhu', name: '玉竹', cat: 'buxue', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '微寒', flavor: '甘', meridian: '肺、胃', func: '养阴润燥、生津止渴' }, dose: '6–12g',
      modern: { text: '玉竹麦冬茶为传统生津代茶饮', level: 'C', src: ['S3'] },
      caution: '痰湿气滞者不宜（传统）。' },
    /* 健脾祛湿 */
    { id: 'yiyiren', name: '薏苡仁', cat: 'queshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '凉', flavor: '甘、淡', meridian: '脾、胃、肺', func: '利水渗湿、健脾止泻、除痹、排脓' }, dose: '9–30g',
      modern: { text: '红豆薏米水为民间流行祛湿茶；利水作用温和', level: 'C', src: ['S3'] },
      caution: '孕妇慎用（传统）；脾胃虚寒者宜炒薏米。' },
    { id: 'chixiaodou', name: '赤小豆', cat: 'queshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘、酸', meridian: '心、小肠', func: '利水消肿、解毒排脓' }, dose: '9–30g',
      modern: { text: '高钾低钠豆类，与薏米同用为传统利水组合', level: 'C', src: ['S3'] },
      caution: '注意与「红豆」（相思子有毒）区分——正规渠道购买食用赤小豆。' },
    { id: 'qianshi', name: '芡实', cat: 'queshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘、涩', meridian: '脾、肾', func: '益肾固精、补脾止泻、除湿止带' }, dose: '9–15g',
      modern: { text: '芡实莲子山药粥为脾虚久泻经典药膳', level: 'C', src: ['S13'] },
      caution: '大便硬结者不宜（传统）。' },
    { id: 'lianzi', name: '莲子', cat: 'queshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘、涩', meridian: '脾、肾、心', func: '补脾止泻、止带、益肾固精、养心安神' }, dose: '6–15g',
      modern: { text: '莲子百合羹等安神药膳基础', level: 'C', src: ['S3'] },
      caution: '大便燥结者不宜（传统）。' },
    { id: 'baibiandou', name: '白扁豆', cat: 'queshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '微温', flavor: '甘', meridian: '脾、胃', func: '健脾化湿、和中消暑' }, dose: '9–15g',
      modern: { text: '夏季暑湿泄泻传统食材', level: 'C', src: ['S3'] },
      caution: '⛔ 必须煮熟：生白扁豆含凝集素，未煮透可致中毒。' },
    /* 理气消食 */
    { id: 'chenpi', name: '陈皮', cat: 'xiaoshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '辛、苦', meridian: '肺、脾', func: '理气健脾、燥湿化痰' }, dose: '3–10g',
      modern: { text: '陈皮挥发油有促胃动力作用的实验证据；陈皮普洱为流行茶饮', level: 'C', src: ['S3'] },
      caution: '气虚津亏（乏力口干）者慎大量。' },
    { id: 'maiya', name: '麦芽', cat: 'xiaoshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、胃', func: '行气消食、健脾开胃、回乳消胀' }, dose: '10–15g',
      modern: { text: '淀粉酶助淀粉类消化（传统消面食积滞）', level: 'C', src: ['S3'] },
      caution: '⚠️ 哺乳期妇女不宜（回乳作用）；大量久服耗气。' },
    { id: 'jineijin', name: '鸡内金', cat: 'xiaoshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、胃、小肠、膀胱', func: '消食健胃、涩精止遗、通淋化石' }, dose: '3–10g',
      modern: { text: '传统「消一切饮食积滞」之品，常研末入散', level: 'C', src: ['S3'] },
      caution: '脾虚无积滞者不宜久服（传统）。' },
    { id: 'sharen', name: '砂仁', cat: 'xiaoshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '辛', meridian: '脾、胃、肾', func: '化湿开胃、温脾止泻、理气安胎' }, dose: '3–6g（后下）',
      modern: { text: '芳香化湿代表，砂仁蒸排骨等为南方药膳', level: 'C', src: ['S13'] },
      caution: '阴虚血燥者慎用（传统）。' },
    { id: 'laifuzi', name: '莱菔子', cat: 'xiaoshi', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '辛、甘', meridian: '肺、脾、胃', func: '消食导滞、降气化痰' }, dose: '5–12g',
      modern: { text: '即萝卜种子；与人参同用属传统「相恶」记载', level: 'C', src: ['S13'] },
      caution: '气虚无食积痰滞者慎用；不宜与人参同服（传统）。' },
    /* 清热 */
    { id: 'juhua', name: '菊花', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '微寒', flavor: '甘、苦', meridian: '肺、肝', func: '散风清热、平抑肝阳、清肝明目、清热解毒' }, dose: '5–10g',
      modern: { text: '菊花茶为最普及的代茶饮；杭白菊/贡菊偏清肝明目，野菊花偏清热解毒', level: 'C', src: ['S3'] },
      caution: '气虚胃寒、食少泄泻者宜少（传统）。' },
    { id: 'jinyinhua', name: '金银花', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '寒', flavor: '甘', meridian: '肺、心、胃', func: '清热解毒、疏散风热' }, dose: '6–15g',
      modern: { text: '风热感冒咽痛传统代茶饮；绿原酸等成分有抗菌实验证据（不等同于人体抗感染）', level: 'C', src: ['S3'] },
      caution: '脾胃虚寒者不宜久服；不能替代抗感染治疗。' },
    { id: 'bohe', name: '薄荷', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '凉', flavor: '辛', meridian: '肺、肝', func: '疏散风热、清利头目、利咽、疏肝行气' }, dose: '3–6g（后下）',
      modern: { text: '薄荷醇用于多种咽部制剂；清凉感来自 TRPM8 受体激活', level: 'B', src: ['S11'] },
      caution: '体虚多汗者不宜（传统）；哺乳期少用（传统回乳之说）。' },
    { id: 'sangye', name: '桑叶', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '寒', flavor: '甘、苦', meridian: '肺、肝', func: '疏散风热、清肺润燥、清肝明目' }, dose: '5–10g',
      modern: { text: '桑叶茶（霜桑叶）为传统清肺明目茶饮；含 DNJ 生物碱，降糖研究多在实验阶段', level: 'C', src: ['S3'] },
      caution: '脾胃虚寒者慎用。' },
    { id: 'juemingzi', name: '决明子', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '微寒', flavor: '甘、苦', meridian: '肝、肾、大肠', func: '清热明目、润肠通便' }, dose: '9–15g',
      modern: { text: '决明子代茶饮与轻度降压降脂的荟萃分析提示作用微弱，证据质量有限', level: 'B', src: ['S3'] },
      caution: '便溏腹泻者慎用；低血压者注意；孕妇慎用；不宜长期连续大量饮用。' },
    { id: 'pugongying', name: '蒲公英', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '寒', flavor: '苦、甘', meridian: '肝、胃', func: '清热解毒、消肿散结、利尿通淋' }, dose: '10–15g',
      modern: { text: '蒲公英茶为流行「消炎茶」；抗菌证据多在体外，不能替代抗生素', level: 'C', src: ['S3'] },
      caution: '脾胃虚寒者慎用；过敏体质（菊科）注意。' },
    { id: 'yuxingcao', name: '鱼腥草', cat: 'qingre', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '微寒', flavor: '辛', meridian: '肺', func: '清热解毒、消痈排脓、利尿通淋' }, dose: '15–25g（鲜品加倍）',
      modern: { text: '折耳根为西南常见食材；含马兜铃内酰胺（非马兜铃酸），膳食量下的安全性证据仍在研究中——本站不做定论，按膳食常规量食用', level: 'D', src: ['S3'] },
      caution: '虚寒证者慎服（传统）；肾病人群不宜大量长期食用。' },
    /* 温里 */
    { id: 'ganjiang', name: '干姜', cat: 'wenli', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '热', flavor: '辛', meridian: '脾、胃、肾、心、肺', func: '温中散寒、回阳通脉、温肺化饮' }, dose: '3–10g',
      modern: { text: '干姜与生姜同源不同制；姜辣素研究集中于止呕与促胃动力', level: 'B', src: ['S11'] },
      caution: '阴虚内热、血热妄行者忌用（传统）。' },
    { id: 'rougui', name: '肉桂', cat: 'wenli', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '大热', flavor: '辛、甘', meridian: '肾、脾、心、肝', func: '补火助阳、散寒止痛、温通经脉、引火归元' }, dose: '1–5g',
      modern: { text: '肉桂（桂皮）既是香料；桂皮酸/肉桂醛研究多在代谢领域（实验阶段）。注意：日常炖肉香料用量远小于药典剂量', level: 'C', src: ['S3'] },
      caution: '有出血倾向者慎用；孕妇慎用；阴虚火旺者忌；不可当保健品大量吞服肉桂粉。' },
    { id: 'xiaohuixiang', name: '小茴香', cat: 'wenli', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '辛', meridian: '肝、肾、脾、胃', func: '散寒止痛、理气和胃' }, dose: '3–6g',
      modern: { text: '茴香馅饺子即食药同源；传统用于寒疝腹痛、胃寒呕逆', level: 'C', src: ['S3'] },
      caution: '阴虚火旺者慎用（传统）。' },
    { id: 'huajiao', name: '花椒', cat: 'wenli', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '辛', meridian: '脾、胃、肾', func: '温中止痛、杀虫止痒' }, dose: '3–6g',
      modern: { text: '川菜核心香料；花椒水泡洗为民间皮肤止痒法（安全性证据有限）', level: 'C', src: ['S3'] },
      caution: '阴虚火旺者慎食（传统）。' },
    { id: 'hujiao', name: '胡椒', cat: 'wenli', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '热', flavor: '辛', meridian: '胃、大肠', func: '温中散寒、下气、消痰' }, dose: '2–4g',
      modern: { text: '黑胡椒/白胡椒同源；胡椒碱可提高部分成分生物利用度（如姜黄素）', level: 'B', src: ['S11'] },
      caution: '消化道溃疡/痔疮发作期慎大量。' },
    /* 止咳利咽 */
    { id: 'luohanguo', name: '罗汉果', cat: 'zhike', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '凉', flavor: '甘', meridian: '肺、大肠', func: '清热润肺、利咽开音、滑肠通便' }, dose: '9–15g',
      modern: { text: '罗汉果甜苷为天然甜味剂（不参与血糖代谢），代糖饮品常用', level: 'B', src: ['S20'] },
      caution: '风寒咳嗽者不宜（传统）；夜尿多者睡前少饮。' },
    { id: 'pangdahai', name: '胖大海', cat: 'zhike', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '寒', flavor: '甘', meridian: '肺、大肠', func: '清热润肺、利咽开音、润肠通便' }, dose: '2–3枚',
      modern: { text: '教师/主播护嗓代茶饮；对症（肺热咽哑）效果好，不对症则伤脾胃阳气', level: 'C', src: ['S3'] },
      caution: '脾胃虚寒腹泻、风寒咳嗽者不宜；不宜长期当日常茶饮。' },
    { id: 'jiegeng', name: '桔梗', cat: 'zhike', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '苦、辛', meridian: '肺', func: '宣肺、祛痰、利咽、排脓' }, dose: '3–10g',
      modern: { text: '桔梗皂苷祛痰作用有实验与部分临床提示；朝鲜族食材（桔梗拌菜）', level: 'C', src: ['S3'] },
      caution: '阴虚久嗽、气逆及咯血者不宜（传统）；胃溃疡者慎服（刺激性）。' },
    { id: 'kuxingren', name: '苦杏仁', cat: 'zhike', in_catalog: true, catalog_note: '原86种目录', toxic: true,
      tcm: { nature: '微温', flavor: '苦', meridian: '肺、大肠', func: '降气止咳平喘、润肠通便' }, dose: '5–10g（生品入药须炮制）',
      modern: { text: '含苦杏仁苷，肠道水解生成氢氰酸：过量抑制细胞呼吸→头晕、呕吐、呼吸困难，儿童十余粒可致命', level: 'A', src: ['S3', 'S12'] },
      caution: '⛔ 必须按药典炮制（炒/燀）并严格控制剂量；婴幼儿、孕妇忌用；家庭不要自行使用生苦杏仁；出现中毒立即就医。' },
    { id: 'wumei', name: '乌梅', cat: 'zhike', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '酸、涩', meridian: '肝、脾、肺、大肠', func: '敛肺、涩肠、生津、安蛔' }, dose: '6–12g',
      modern: { text: '酸梅汤主料（乌梅+山楂+陈皮+甘草）；生津止渴代表', level: 'C', src: ['S13'] },
      caution: '外感咳嗽、泻痢初起者不宜（传统）；胃酸过多者少食。' },
    /* 补益肝肾 */
    { id: 'gouqizi', name: '枸杞子', cat: 'ganshen', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '平', flavor: '甘', meridian: '肝、肾', func: '滋补肝肾、益精明目' }, dose: '6–12g',
      modern: { text: '枸杞多糖研究集中于免疫与视网膜保护（多为实验证据）；「保温杯泡枸杞」为日常食养代表', level: 'C', src: ['S3'] },
      caution: '外感发热、脾虚湿盛便溏者不宜（传统）。' },
    /* 解表与活血 */
    { id: 'zisuye', name: '紫苏叶', cat: 'jiebiao', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '辛', meridian: '肺、脾', func: '解表散寒、行气和胃' }, dose: '5–10g',
      modern: { text: '紫苏为鱼蟹菜肴经典配叶（去腥解毒为传统说法）；紫苏梗理气安胎', level: 'C', src: ['S13'] },
      caution: '气虚表虚（自恶风汗出）者慎用（传统）。' },
    { id: 'meiguihua', name: '玫瑰花', cat: 'jiebiao', in_catalog: true, catalog_note: '原86种目录',
      tcm: { nature: '温', flavor: '甘、微苦', meridian: '肝、脾', func: '行气解郁、和血、止痛' }, dose: '3–6g',
      modern: { text: '玫瑰花茶为疏肝解郁代茶饮代表（传统应用为主）', level: 'C', src: ['S3'] },
      caution: '阴虚火旺者慎用（传统）。' },
    /* —— 2023 / 2024 年新增目录代表（速览，不做详卡） —— */
    { id: 'dangshen', name: '党参', cat: 'xin', in_catalog: true, catalog_note: '2023年纳入',
      tcm: { nature: '平', flavor: '甘', meridian: '脾、肺', func: '健脾益肺、养血生津' }, dose: '9–30g',
      modern: { text: '补气常用品，煲汤常用；不宜与藜芦同用（传统）', level: 'C', src: ['S3', 'S4'] },
      caution: '实证热证不宜单用（传统）。' },
    { id: 'huangqi', name: '黄芪', cat: 'xin', in_catalog: true, catalog_note: '2023年纳入',
      tcm: { nature: '微温', flavor: '甘', meridian: '肺、脾', func: '补气升阳、固表止汗、利水消肿、生津养血' }, dose: '9–30g',
      modern: { text: '黄芪炖鸡、黄芪红枣茶为常见补气药膳', level: 'C', src: ['S3', 'S4'] },
      caution: '表实邪盛、阴虚阳亢者不宜（传统）。' },
    { id: 'dihuang', name: '地黄', cat: 'xin', in_catalog: true, catalog_note: '2024年纳入',
      tcm: { nature: '寒（鲜/生）', flavor: '甘、苦', meridian: '心、肝、肾', func: '生地黄：清热凉血、养阴生津' }, dose: '生地黄 9–15g',
      modern: { text: '2024 年第 4 号公告新增食药物质，公告明确了食用限量与不适宜人群', level: 'B', src: ['S4'] },
      caution: '脾虚湿滞、腹满便溏者慎用（传统）；按公告限定的使用范围与限量食用。' },
    { id: 'maidong', name: '麦冬', cat: 'xin', in_catalog: true, catalog_note: '2024年纳入',
      tcm: { nature: '微寒', flavor: '甘、微苦', meridian: '心、肺、胃', func: '养阴生津、润肺清心' }, dose: '6–12g',
      modern: { text: '麦冬乌梅茶等生津代茶饮；2024 年新增', level: 'B', src: ['S4'] },
      caution: '脾胃虚寒泄泻者慎用（传统）。' }
  ],

  /* ---------- 急救元数据（步骤与图示在各页；内容分级见页面） ---------- */
  FIRSTAID: [
    { id: 'assess', title: '现场评估与 CABCDE 初查', tier: 'core', src: ['S7', 'S22'] },
    { id: 'tourniquet', title: '止血带', tier: 'core', src: ['S7', 'S22', 'S8'] },
    { id: 'pressure', title: '直接压迫与加压包扎', tier: 'core', src: ['S7', 'S24'] },
    { id: 'bandage', title: '三角巾与悬臂带', tier: 'core', src: ['S24'] },
    { id: 'splint', title: '骨折临时固定', tier: 'core', src: ['S7', 'S24'] },
    { id: 'move', title: '搬运与整体翻身', tier: 'core', src: ['S7', 'S22'] },
    { id: 'shock', title: '休克识别与处置', tier: 'core', src: ['S7', 'S22'] },
    { id: 'wound', title: '伤口冲洗与清创原则', tier: 'core', src: ['S6', 'S7'] },
    { id: 'suture', title: '缝合的边界（不建议自行操作）', tier: 'caution', src: ['S6', 'S22'] },
    { id: 'burn', title: '烧伤五字诀', tier: 'core', src: ['S7', 'S24'] },
    { id: 'snake', title: '蛇咬伤', tier: 'core', src: ['S29', 'S23'] },
    { id: 'insect', title: '蜂蜇与蜱虫', tier: 'core', src: ['S23', 'S24'] },
    { id: 'hypothermia', title: '失温', tier: 'core', src: ['S23'] },
    { id: 'heatstroke', title: '热射病', tier: 'core', src: ['S30'] },
    { id: 'amputation', title: '断肢保存', tier: 'core', src: ['S22'] },
    { id: 'kit', title: '野外急救包配置', tier: 'core', src: ['S23'] }
  ],

  /* ---------- 题库 ---------- */
  QUIZ_BANK: {
    foods: [
      { q: '下列哪种食物的 β-葡聚糖（可溶性纤维）有助于降低 LDL 胆固醇？', opts: ['白米饭', '燕麦', '蜂蜜', '芹菜'], ans: 1, exp: '燕麦富含 β-葡聚糖，指南认可其有助于降低 LDL-C；白米饭为精制谷物，蜂蜜以糖为主，芹菜纤维以不溶性为主。', src: ['S1', 'S17'] },
      { q: '生豆浆必须彻底煮沸才能喝，原因是生豆浆含有：', opts: ['皂苷和胰蛋白酶抑制剂、血球凝集素', '龙葵碱', '组胺', '氰苷'], ans: 0, exp: '生大豆含胰蛋白酶抑制剂与凝集素等抗营养因子，「假沸」后继续小火煮 5 分钟以上可破坏。龙葵碱在发芽土豆中，氰苷在苦杏仁中。', src: ['S12'] },
      { q: '为什么 1 岁以下婴儿绝对不能吃蜂蜜？', opts: ['太甜伤牙', '可能含肉毒杆菌芽孢导致婴儿肉毒中毒', '引起过敏', '导致腹泻'], ans: 1, exp: '婴儿肠道菌群未建立，肉毒杆菌芽孢可定植产毒。蜂蜜是明确的婴儿禁忌（≠过敏问题）。', src: ['S12'] },
      { q: '下列食物中，锌含量最突出的是：', opts: ['苹果', '牡蛎', '黄瓜', '冬瓜'], ans: 1, exp: '牡蛎锌含量居常见食物前列（因产地差异约 9–70mg/100g）。', src: ['S2'] },
      { q: '发芽变绿的土豆为什么不能吃？', opts: ['没有营养了', '龙葵碱（茄碱）显著升高，可致中毒', '口感变差', '引起胀气'], ans: 1, exp: '龙葵碱耐热，发芽/变绿/腐烂土豆中含量大幅升高，烹饪无法完全破坏——应整颗丢弃。', src: ['S12'] },
      { q: '关于鸡蛋与心血管健康，目前指南口径更接近：', opts: ['健康人每天最多半个蛋黄', '健康人群每天 1 个鸡蛋与心血管风险升高无关', '鸡蛋必须和豆浆分开吃', '所有三高人群禁食蛋黄'], ans: 1, exp: '膳食指南 2022 与大队列证据：健康成人每日 1 个鸡蛋未见心血管风险升高；特殊疾病人群遵医嘱。', src: ['S1'] },
      { q: '缺铁性贫血人群改善铁营养的做法中，错误的是：', opts: ['适量猪肝/红肉补血红素铁', '富铁植物性食物搭配维C水果', '浓茶送服铁剂', '铁剂与牛奶间隔两小时'], ans: 2, exp: '茶多酚抑制非血红素铁吸收，钙竞争吸收通道——铁剂应温水送服，与茶、奶错开。', src: ['S31', 'S26'] },
      { q: '西柚需要警惕的相互作用对象是：', opts: ['抗生素（全部）', '他汀类等经 CYP3A4 代谢的药物', '维生素', '钙片'], ans: 1, exp: '西柚呋喃香豆素抑制肠道 CYP3A4，显著升高他汀、部分钙拮抗剂等药物血药浓度。', src: ['S31'] },
      { q: '菠菜入菜前焯水 30 秒的主要目的是：', opts: ['去除农药（唯一途径）', '去除大部分草酸，减少对钙铁吸收的影响', '让颜色更绿', '杀死所有细菌'], ans: 1, exp: '焯水可去除大部分草酸，菠菜与豆腐同食的关键动作就在这里；去农残靠流水搓洗更实际。', src: ['S20'] }
    ],
    pairing: [
      { q: '维生素 C 促进吸收的铁的形式是：', opts: ['血红素铁', '非血红素铁', '两种都促进', '两种都不影响'], ans: 1, exp: '维C将非血红素铁还原为更易吸收的亚铁态；血红素铁吸收本身不受食物因素大幅影响。', src: ['S20'] },
      { q: '「头孢配酒，说走就走」描述的严重反应是：', opts: ['过敏反应', '双硫仑样反应', '戒断反应', '瑞氏综合征'], ans: 1, exp: '部分头孢抑制乙醛脱氢酶，饮酒后乙醛蓄积致面部潮红、心悸、呼吸困难，重者休克。停药后 7 天内也要避免酒精。', src: ['S31'] },
      { q: '服用华法林的人对深绿叶菜的正确态度是：', opts: ['完全不吃绿叶菜', '保持每日摄入量稳定并规律监测 INR', '大量吃绿叶菜抵消药效', '无所谓'], ans: 1, exp: '华法林拮抗维K。骤增骤减绿叶菜都会使 INR 波动；稳定摄入+规律监测才是正确做法。', src: ['S31'] },
      { q: '番茄用油炒制的主要营养学意义是：', opts: ['破坏维生素以减重', '提高脂溶性番茄红素的生物利用度', '让维C更多', '没有意义'], ans: 1, exp: '番茄红素为脂溶性，与脂肪同烹吸收显著提高（生吃则保留更多维C，各有价值）。', src: ['S1'] },
      { q: '关于「菠菜+豆腐=结石」，更准确的说法是：', opts: ['绝对不能同吃', '菠菜焯水去除大部分草酸后可以同食', '一起吃必然肾结石', '豆腐必须先煮'], ans: 1, exp: '草酸抑制钙吸收是事实，但焯水 30 秒即可去除大部分草酸；「必然结石」是被夸大的说法。', src: ['S20'] },
      { q: '杂豆与谷物同煮（杂豆饭）体现的原则是：', opts: ['食物相克', '蛋白质氨基酸互补', '酸碱平衡', '热量平衡'], ans: 1, exp: '豆类赖氨酸丰富、谷类蛋氨酸丰富，谷豆互补提高蛋白质生物学价值。', src: ['S1'] },
      { q: '口服铁剂与茶、咖啡、牛奶的正确关系是：', opts: ['同服吸收更好', '间隔至少1–2小时（它们抑制铁吸收）', '必须同服保护胃', '没有影响'], ans: 1, exp: '茶多酚与钙均抑制非血红素铁吸收——铁剂温水送服，与茶/咖啡/奶制品错开。', src: ['S31'] }
    ],
    nutrient: [
      { q: '《中国居民膳食指南（2022）》推荐的成人每日食盐上限是：', opts: ['10g', '8g', '5g', '3g'], ans: 2, exp: '指南与 WHO 一致：成人每日食盐不超过 5g（钠约2000mg），包括酱油、咸菜等隐形盐。', src: ['S1', 'S10'] },
      { q: '下列属于脂溶性维生素的是：', opts: ['维生素C', '维生素B1', '维生素D', '叶酸'], ans: 2, exp: 'A、D、E、K 为脂溶性（需脂肪伴餐吸收，过量可蓄积）；B 族与 C 为水溶性。', src: ['S20'] },
      { q: '成人维生素 C 的可耐受最高摄入量（UL）约为：', opts: ['500mg', '1000mg', '2000mg', '10000mg'], ans: 2, exp: 'DRIs 2023：成人 VC UL 为 2000mg/日；RNI 为 100mg。过量补充可致腹泻与结石风险升高。', src: ['S20'] },
      { q: 'WHO 建议添加糖提供能量低于总能量 10%，进一步降到多少更有健康收益？', opts: ['8%', '5%', '3%', '1%'], ans: 1, exp: '强烈建议 <10%，条件性建议 <5%（约25g/日以下）——含糖饮料是首要削减对象。', src: ['S10'] },
      { q: '指南建议深色蔬菜应占每日蔬菜摄入量的：', opts: ['1/4', '1/3', '一半', '全部'], ans: 2, exp: '每日蔬菜 300–500g，深色蔬菜（深绿、橙红、紫色）占一半以上。', src: ['S1'] },
      { q: '成年男女每天饮水的推荐量约为：', opts: ['男1700ml、女1500ml', '男2500ml、女2000ml', '男女都1000ml', '渴了再喝'], ans: 0, exp: '指南 2022：低身体活动水平成年男性 1700ml、女性 1500ml；高温/运动增加。', src: ['S1'] }
    ],
    metabolic: [
      { q: '2型糖尿病饮食干预的首要削减目标是：', opts: ['所有水果', '含糖饮料与添加糖', '全部主食', '所有肉类'], ans: 1, exp: '含糖饮料与添加糖是第一位目标；主食讲「选对种类控总量」（全谷物替代精制），不是不吃。', src: ['S15'] },
      { q: '对血脂最不利的脂肪类型是：', opts: ['橄榄油中的单不饱和脂肪', '坚果中的多不饱和脂肪', '人造奶油中的反式脂肪', '鱼油中的EPA/DHA'], ans: 2, exp: '反式脂肪（部分氢化油）同时升高 LDL-C、降低 HDL-C，指南建议尽可能避免。', src: ['S17', 'S10'] },
      { q: 'DASH 膳食模式针对的核心问题是：', opts: ['高血压', '痛风', '近视', '脱发'], ans: 0, exp: 'DASH（得舒）膳食：高钾镁钙、低钠、足量蔬果与低脂乳，为高血压一线生活方式方案。', src: ['S16'] },
      { q: '科学减重的合理每日能量缺口约为：', opts: ['1000–1500kcal', '300–500kcal', '不吃晚饭', '只吃单一食物'], ans: 1, exp: '每日 300–500kcal 缺口（配合高蛋白保肌肉）可实现约每周0.5kg减重且更可坚持。', src: ['S19'] },
      { q: '痛风急性发作期应严格避免的组合是：', opts: ['啤酒+海鲜', '牛奶+鸡蛋', '蔬菜+水果', '咖啡+牛奶'], ans: 0, exp: '酒精（抑制尿酸排泄）+高嘌呤（海鲜/内脏/浓汤）叠加风险最高，啤酒尤甚；低脂乳反而有利。', src: ['S18'] },
      { q: '非酒精性脂肪肝被证实有效的核心干预是：', opts: ['吃「护肝片」', '减重5–10%', '只吃素食', '不吃晚餐'], ans: 1, exp: '减重 5–10% 是唯一被充分证实的核心干预（配合限果糖、限酒、运动）；保健品不能替代。', src: ['S21'] },
      { q: '地中海膳食模式的核心脂肪来源是：', opts: ['黄油与肥肉', '橄榄油等植物油+坚果', '人造奶油', '动物油'], ans: 1, exp: '地中海模式以橄榄油为主要油脂、坚果与深海鱼为脂肪来源，蔬果全谷物为基础——证据等级最高的膳食模式之一。', src: ['S1', 'S17'] }
    ],
    gi: [
      { q: 'WHO 推荐的口服补液盐（ORS）家庭简化配方是（1升清水）：', opts: ['6平茶匙糖+半茶匙盐', '1勺糖+1勺盐', '只加盐', '可乐+盐'], ans: 0, exp: 'WHO/UNICEF 经典简化配方：1L 饮用水 + 6 平茶匙糖 + 半平茶匙盐。这是腹泻防脱水最重要的家庭手段。', src: ['S25'] },
      { q: '关于儿童急性腹泻，WHO 推荐的辅助措施是：', opts: ['禁食让肠道休息', '补锌10–14天', '只喝白水', '立即用强力止泻药'], ans: 1, exp: 'WHO 推荐 6 月龄–5 岁腹泻儿童补锌 10–14 天（可缩短病程），同时继续喂养。', src: ['S25'] },
      { q: '口服铁剂的正确服用方式是：', opts: ['与牛奶同服护胃', '浓茶送服', '温水送服，与茶/咖啡/牛奶错开2小时', '餐后立即与钙片同服'], ans: 2, exp: '茶多酚、钙均抑制铁吸收；铁剂宜温水送服并错开干扰物（具体遵药品说明书与医嘱）。', src: ['S31'] },
      { q: '改善慢性便秘的「三件套」是：', opts: ['纤维+足量水+运动', '依赖开塞露', '长期喝番泻叶茶', '减少进食'], ans: 0, exp: '纤维 25–30g/日 + 水 1.5–1.7L + 规律运动是首选；长期刺激性泻药需医生指导。', src: ['S1', 'S20'] },
      { q: '慢性胃炎检出幽门螺杆菌感染时，最根本的处理是：', opts: ['长期喝粥养胃', '规范药物根除治疗（就医）', '只吃生姜', '饥饿疗法'], ans: 1, exp: '幽门螺杆菌相关胃炎应以规范根除治疗（药物，就医）为根本，食物只是辅助与日常维护。', src: ['S1'] },
      { q: '蜂蜜用于缓解儿童夜间咳嗽的年龄前提是：', opts: ['6个月以上', '满1岁及以上', '无年龄限制', '3岁以上'], ans: 1, exp: '系统评价提示蜂蜜对 ≥1 岁儿童夜咳可能有益；1 岁以下婴儿绝对禁食蜂蜜（肉毒中毒风险）。', src: ['S34', 'S12'] },
      { q: '关于幽门螺杆菌与胃癌风险的说法，正确的是：', opts: ['感染者多数都会得胃癌', '感染是明确危险因素之一，规范根除可降低风险（遵医嘱）', '与胃病无关', '喝粥可以根除'], ans: 1, exp: '幽门螺杆菌是胃癌的 1 类致癌因素，但感染者终生发生胃癌者为少数；规范根除治疗（药物，就医）可显著降低风险。', src: ['S1'] }
    ],
    fitness: [
      { q: '增肌期蛋白质的常用参考范围约为：', opts: ['0.5g/kg/日', '1.2–2.0g/kg/日', '3g/kg/日起', '越多越好'], ans: 1, exp: 'ACSM/AND 立场声明：运动员 1.2–2.0g/kg/日；比总量更关键的是全天分餐分布与总热量。', src: ['S28'] },
      { q: '关于「运动后30分钟合成代谢窗口」的说法，目前观点是：', opts: ['窗口只有30分钟，错过无效', '全天蛋白质总量与规律训练更重要，窗口被夸大', '必须立即输液', '只对职业运动员重要'], ans: 1, exp: '窗口期概念已被弱化：训练后数小时内进食都有利于恢复，强调全天总量分配。', src: ['S28'] },
      { q: '科学减脂期的正确做法是：', opts: ['每日缺口1000kcal以上速战速决', '缺口300–500kcal+保蛋白+力量训练', '完全断碳', '穿暴汗服脱水'], ans: 1, exp: '过大缺口丢失肌肉、难以维持；300–500kcal + 蛋白质 1.2–1.6g/kg + 抗阻训练保肌肉。', src: ['S19', 'S28'] },
      { q: '肌酸一水化物的证据等级与安全性：', opts: ['证据充分且常规剂量安全性良好', '伤肾证据确凿', '完全是智商税', '只对女性有效'], ans: 0, exp: '肌酸是研究最充分的力量类补充剂之一（证据A），常规 3–5g/日安全性良好；肾病人群除外。', src: ['S28', 'S11'] },
      { q: '咖啡因的半衰期约为：', opts: ['30分钟', '1小时', '3–7小时（个体差异大）', '24小时'], ans: 2, exp: '半衰期约3–7小时：下午4点的一杯咖啡，晚上10点血液中仍可能残留一半左右——睡眠敏感者午后避免。', src: ['S20'] },
      { q: '运动补水的合理策略是：', opts: ['渴了猛灌一次', '运动前后称重补足丢失量，长时间运动补含电解质饮品', '喝得越多越好', '不喝水燃烧脂肪'], ans: 1, exp: '按出汗量补充（体重每减轻1kg补水约1.2–1.5L）；>1小时运动注意钠等电解质，避免低钠血症。', src: ['S28'] }
    ],
    herbs: [
      { q: '「药食同源目录」的法律含义是：', opts: ['这些中药材可以随意添加进任何食品', '食品中可以添加这些物质（限传统食用方式与公告范围），目录外药品不得添入食品', '等于处方药', '任何人可自行采制药材'], ans: 1, exp: '《食品安全法》38条：食品不得添加药品，但可添加按传统既是食品又是中药材的物质（目录内、限传统方式）。', src: ['S4'] },
      { q: '截至2024年8月，目录新增的第4批物质是：', opts: ['当归、姜黄、西红花', '党参、黄芪、灵芝', '地黄、麦冬、天冬、化橘红', '人参、鹿茸、冬虫夏草'], ans: 2, exp: '2024年第4号公告新增地黄、麦冬、天冬、化橘红4种，目录达106种。', src: ['S4'] },
      { q: '下列哪种物质有明确的肝损伤风险、且不在食药物质目录中？', opts: ['枸杞子', '何首乌（自行长期服用）', '山药', '菊花'], ans: 1, exp: '何首乌（尤其生首乌/自行长期服用）有明确肝损伤报告与药监警示；不属于食药物质目录，不要自行泡服。', src: ['S31', 'S3'] },
      { q: '苦杏仁的正确态度是：', opts: ['天然食物随便吃', '含氰苷，必须炮制并严格限量，家庭不自行使用', '煲汤多吃止咳', '只有苦味没有毒性'], ans: 1, exp: '苦杏仁苷水解生成氢氰酸，儿童十余粒可致命；药典规定炮制与5–10g剂量；家用请购买正规炮制品。', src: ['S3', 'S12'] },
      { q: '长期大量服用甘草（含复方甘草片、甘草蜜饯）的风险是：', opts: ['没有风险', '假性醛固酮增多——高血压、低血钾', '只会发胖', '维生素中毒'], ans: 1, exp: '甘草酸的类醛固酮作用有明确药理证据：血压升高、血钾降低、水肿——高血压患者慎用。', src: ['S31', 'S3'] },
      { q: '哺乳期不宜使用的食药物质是：', opts: ['麦芽（回乳作用）', '大枣', '山药', '百合'], ans: 0, exp: '麦芽传统用于回乳消胀，哺乳期不宜；此为传统记载，谨慎为上。', src: ['S3'] }
    ],
    firstaid: [
      { q: '四肢致命大出血、直接压迫无法控制时，止血带的位置应选在：', opts: ['伤口正上方覆盖伤口', '伤口近端约5–7cm处（上肢避开上臂中下1/3）', '随便哪里都行', '伤口远端（离心脏一侧）'], ans: 1, exp: '置于伤口近端 5–7cm；上肢避开上臂中下 1/3（桡神经沟），此处易致神经损伤。', src: ['S22', 'S7'] },
      { q: '上止血带后必须做的关键动作是：', opts: ['定时放松防止坏死', '记录上带时间并尽快转运（目标<2小时）', '用布遮盖不告诉任何人', '绑完就不管了'], ans: 1, exp: '必须在显眼处书写时间标记并交接给医务人员；转运途中不随意松解（松解决定由专业人员评估），院内目标 <2 小时。', src: ['S22', 'S7'] },
      { q: '野外发现队友倒地，第一步应该是：', opts: ['立即冲过去扶起伤员', '先环顾四周确认环境对救己安全，再接近', '先翻找急救包', '大声摇晃伤员'], ans: 1, exp: '现场安全永远是第一步：危险未排除时贸然进入会造成第二个伤员（CABCDE 中的 C=Catastrophic bleeding 与场景安全评估）。', src: ['S7', 'S22'] },
      { q: '对扎入身体的异物（刀/钢筋/树枝），正确做法是：', opts: ['立即拔出再包扎', '保留异物原位、固定后送医', '推进去一点好包扎', '摇动确认深浅'], ans: 1, exp: '异物可能正在压迫血管，拔出会导致大出血——原位固定（敷料环绕固定）后转运。', src: ['S7', 'S22'] },
      { q: '烧伤急救「五字诀」的正确顺序是：', opts: ['冲-脱-泡-盖-送', '涂-抹-包-扎-送', '冲-挑-涂-盖-送', '冰-压-抬-送'], ans: 0, exp: '15–25℃ 流动水冲 20 分钟左右降温；小心脱除（剪开）衣物；冷水浸泡续降温；清洁敷料覆盖；转送。不涂牙膏酱油、不挑破水疱。', src: ['S7', 'S24'] },
      { q: '毒蛇咬伤后，下列哪项是明确禁止的？', opts: ['保持镇静制动', '患肢低于心脏并尽快转运', '用嘴吸出毒液 / 切开伤口放血', '拍照记录蛇的外形'], ans: 2, exp: '切开、吸吮、冰敷、止血带、饮酒均为禁止项——无效且加重损伤；制动+低于心脏+尽快转运（有条件时拍照识别蛇种）是正确方向。', src: ['S29'] },
      { q: '热射病（重症中暑）院前处置的核心原则是：', opts: ['先尽快送医院，路上不处理', '降温优先——立即就地快速降温（冷水浸泡/泼水扇风），“黄金半小时”', '喂大量冰水', '掐人中催醒'], ans: 1, exp: '降温速度决定预后：现场立即快速降温（冷水浸泡最有效），同时呼救；转运不能中断降温。昏迷者禁止喂食喂水。', src: ['S30'] },
      { q: '关于非专业人员的伤口缝合，正确的认识是：', opts: ['野外有针线就可以缝', '不建议：感染与操作风险通常大于收益，替代方案是清洁敷料+压迫+尽快就医（必要时延迟闭合）', '缝得越密越好', '用胶水随手粘即可'], ans: 1, exp: '简单环境下冲洗、清洁覆盖、压迫止血并尽快转运优于自行缝合；医疗条件下可由医生评估延迟闭合（delayed primary closure）。', src: ['S6', 'S22'] }
    ]
  }
};

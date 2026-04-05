export const GRADES = ['一年级','二年级','三年级','四年级','五年级','六年级']
export const SEMESTERS = ['上学期','下学期']

export const SUBJECTS = {
  chinese: {
    id: 'chinese', name: '语文', char: '语', englishName: 'Chinese',
    edition: '人教版', color: '#C0372A', darkColor: '#8B2319',
    lightColor: '#FCEAE8', midColor: '#F0B8B3',
    grad: 'linear-gradient(145deg,#C0372A 0%,#E84A3C 100%)',
    desc: '语言文字 · 阅读理解 · 写作表达',
    questionTypes: [
      { id: 'pinyin',    name: '拼音汉字', icon: '拼' },
      { id: 'vocab',     name: '词语积累', icon: '词' },
      { id: 'sentence',  name: '句子练习', icon: '句' },
      { id: 'reading',   name: '阅读理解', icon: '读' },
      { id: 'poetry',    name: '古诗词',   icon: '诗' },
      { id: 'writing',   name: '写作练习', icon: '作' },
    ]
  },
  math: {
    id: 'math', name: '数学', char: '数', englishName: 'Mathematics',
    edition: '北师大版', color: '#1B4D96', darkColor: '#133672',
    lightColor: '#E8EEFC', midColor: '#B0C4E8',
    grad: 'linear-gradient(145deg,#1B4D96 0%,#2E6DBE 100%)',
    desc: '运算能力 · 逻辑思维 · 解题方法',
    questionTypes: [
      { id: 'calc',     name: '计算题',   icon: '算' },
      { id: 'fill',     name: '填空题',   icon: '填' },
      { id: 'judge',    name: '判断题',   icon: '判' },
      { id: 'choice',   name: '选择题',   icon: '选' },
      { id: 'apply',    name: '应用题',   icon: '用' },
      { id: 'geometry', name: '几何图形', icon: '形' },
    ]
  },
  english: {
    id: 'english', name: 'English', char: 'En', englishName: 'English',
    edition: '人教PEP版(新)', color: '#186637', darkColor: '#0F4524',
    lightColor: '#E4F5EC', midColor: '#9ED4B4',
    grad: 'linear-gradient(145deg,#186637 0%,#27A057 100%)',
    desc: 'Vocabulary · Reading · Communication',
    questionTypes: [
      { id: 'word',     name: '单词拼写', icon: 'Aa' },
      { id: 'choice',   name: '选择题',   icon: '选' },
      { id: 'cloze',    name: '完形填空', icon: '填' },
      { id: 'reading',  name: '阅读理解', icon: '读' },
      { id: 'sentence', name: '句子翻译', icon: '译' },
      { id: 'dialogue', name: '情景对话', icon: '话' },
    ]
  }
}

export const CURRICULUM = {
  chinese: {
    '三年级': { '上学期': { units: [
      { id:'u1', title:'第一单元', theme:'学校生活', progress:100,
        lessons:[
          {id:'l1',title:'大青树下的小学',type:'prose',pages:'2-5',done:true},
          {id:'l2',title:'花的学校',type:'poem',pages:'6-9',done:true},
          {id:'l3',title:'不懂就要问',type:'prose',pages:'10-13',done:true},
        ], review:'语文园地一', keySkills:['积累词语','感受校园','提问策略'] },
      { id:'u2', title:'第二单元', theme:'金秋时节', progress:75,
        lessons:[
          {id:'l4',title:'古诗三首',type:'poetry',pages:'16-20',done:true},
          {id:'l5',title:'铺满金色巴掌的水泥道',type:'prose',pages:'21-24',done:true},
          {id:'l6',title:'秋天的雨',type:'prose',pages:'25-29',done:true},
          {id:'l7',title:'听听秋的声音',type:'poem',pages:'30-32',done:false},
        ], review:'语文园地二', keySkills:['描写秋天','感受自然','积累佳句'] },
      { id:'u3', title:'第三单元', theme:'童话世界', progress:25,
        lessons:[
          {id:'l8',title:'去年的树',type:'fairy_tale',pages:'36-39',done:true},
          {id:'l9',title:'那一定会很好',type:'fairy_tale',pages:'40-43',done:false},
          {id:'l10',title:'在牛肚子里旅行',type:'fairy_tale',pages:'44-49',done:false},
          {id:'l11',title:'一块奶酪',type:'fairy_tale',pages:'50-54',done:false},
        ], review:'语文园地三', keySkills:['童话阅读','想象创作','感悟道理'] },
      { id:'u4', title:'第四单元', theme:'预测策略', progress:0,
        lessons:[
          {id:'l12',title:'总也倒不了的老屋',type:'prose',pages:'58-63',done:false},
          {id:'l13',title:'胡萝卜先生的长胡子',type:'prose',pages:'64-66',done:false},
          {id:'l14',title:'不会叫的狗',type:'fiction',pages:'67-71',done:false},
        ], review:'语文园地四', keySkills:['边读边猜','联系上下文','预测策略'] },
    ]}}
  },
  math: {
    '三年级': { '上学期': { units: [
      { id:'u1', title:'第一单元', theme:'混合运算', progress:100,
        lessons:[
          {id:'l1',title:'小熊购物',type:'lesson',pages:'2-4',done:true},
          {id:'l2',title:'买文具',type:'lesson',pages:'5-7',done:true},
          {id:'l3',title:'练习一',type:'practice',pages:'8-9',done:true},
        ], review:'单元复习', keySkills:['先乘除后加减','括号运算','混合运算顺序'] },
      { id:'u2', title:'第二单元', theme:'观察物体', progress:100,
        lessons:[
          {id:'l4',title:'搭积木',type:'lesson',pages:'12-14',done:true},
          {id:'l5',title:'练习二',type:'practice',pages:'15-16',done:true},
        ], review:'单元复习', keySkills:['三视图','空间想象','从不同角度观察'] },
      { id:'u3', title:'第三单元', theme:'加与减', progress:50,
        lessons:[
          {id:'l6',title:'捐书活动',type:'lesson',pages:'18-20',done:true},
          {id:'l7',title:'运白菜',type:'lesson',pages:'21-23',done:true},
          {id:'l8',title:'节约用水',type:'lesson',pages:'24-26',done:false},
          {id:'l9',title:'练习三',type:'practice',pages:'27-28',done:false},
        ], review:'单元复习', keySkills:['三位数加减','估算','解决问题'] },
      { id:'u4', title:'第四单元', theme:'乘与除', progress:0,
        lessons:[
          {id:'l10',title:'派送报纸',type:'lesson',pages:'30-32',done:false},
          {id:'l11',title:'需要几个轮子',type:'lesson',pages:'33-35',done:false},
          {id:'l12',title:'练习四',type:'practice',pages:'36-37',done:false},
        ], review:'单元复习', keySkills:['两位数乘一位数','除法','乘除关系'] },
    ]}}
  },
  english: {
    '三年级': { '上学期': { units: [
      { id:'u1', title:'Unit 1', theme:'Hello', progress:100,
        lessons:[
          {id:'l1',title:"Let's learn: Greetings",type:'lesson',pages:'2-3',done:true},
          {id:'l2',title:"Let's talk: Nice to meet you",type:'lesson',pages:'4-5',done:true},
          {id:'l3',title:"Let's read & write",type:'lesson',pages:'6',done:true},
        ], review:'Recycle 1', keySkills:['Greetings','Self-introduction','Numbers 1-5'] },
      { id:'u2', title:'Unit 2', theme:'My Family', progress:67,
        lessons:[
          {id:'l4',title:"Let's learn: Family members",type:'lesson',pages:'14-15',done:true},
          {id:'l5',title:"Let's talk: This is my...",type:'lesson',pages:'16-17',done:true},
          {id:'l6',title:"Let's read & write",type:'lesson',pages:'18',done:false},
        ], review:'Recycle 2', keySkills:['Family words','Possessives','Descriptions'] },
      { id:'u3', title:'Unit 3', theme:'At the Zoo', progress:33,
        lessons:[
          {id:'l7',title:"Let's learn: Animals",type:'lesson',pages:'26-27',done:true},
          {id:'l8',title:"Let's talk: What's that?",type:'lesson',pages:'28-29',done:false},
          {id:'l9',title:"Let's read & write",type:'lesson',pages:'30',done:false},
        ], review:'Recycle 3', keySkills:['Animal names','Colors','Numbers 1-20'] },
      { id:'u4', title:'Unit 4', theme:'My Home', progress:0,
        lessons:[
          {id:'l10',title:"Let's learn: Rooms",type:'lesson',pages:'38-39',done:false},
          {id:'l11',title:"Let's talk: Where is...?",type:'lesson',pages:'40-41',done:false},
          {id:'l12',title:"Let's read & write",type:'lesson',pages:'42',done:false},
        ], review:'Recycle 4', keySkills:['Room names','Prepositions','Furniture'] },
    ]}}
  }
}

export const QUESTIONS = {
  chinese: [
    { id:'c1', type:'pinyin', difficulty:1, unit:'u1', lesson:'l1',
      question:'看拼音，写词语',
      items:[
        {pinyin:'xiǎo xīn',answer:'小心'}, {pinyin:'kuài lè',answer:'快乐'},
        {pinyin:'tóng xué',answer:'同学'}, {pinyin:'pénɡ yǒu',answer:'朋友'},
        {pinyin:'lǎo shī',answer:'老师'}, {pinyin:'xuéxiào',answer:'学校'},
      ]},
    { id:'c2', type:'choice', difficulty:2, unit:'u1', lesson:'l1',
      question:'下列词语中，加点字读音完全正确的一项是（  ）',
      options:['A. 好奇（qí）  鲜艳（xiān）  共同（tóng）','B. 平坦（tǎn）  敬爱（jìng）  热闹（nào）','C. 早晨（chén）  铜钟（zhōng）  穿戴（dài）','D. 传说（chuán）  鲜艳（xiān）  风景（jǐn）'],
      answer:1, explanation:'B项中各字读音均正确。D项"风景"的"景"应读jǐng。'},
    { id:'c3', type:'reading', difficulty:3, unit:'u2', lesson:'l5',
      passage:'法国梧桐树宽大的、黄色的叶子，铺满了整条水泥道。我一步一步小心地走着，我一片一片仔细地数着。我穿着一双棕红色的小雨靴。你瞧，这多像两只棕红色的小鸟，在秋天金黄的叶丛间，愉快地蹦跳着、歌唱着……',
      question:'"这多像两只棕红色的小鸟"中"这"指的是什么？',
      options:['A. 黄色的叶子','B. 一双棕红色的小雨靴','C. 整条水泥道','D. 法国梧桐树'],
      answer:1, explanation:'"这"指代作者脚上穿的一双棕红色的小雨靴，作者用比喻把小雨靴比作小鸟。'},
    { id:'c4', type:'poetry', difficulty:2, unit:'u2', lesson:'l4',
      question:'根据提示，默写《山行》',
      poem:{title:'山行',author:'杜牧',lines:['远上寒山石径斜，____。','停车坐爱枫林晚，____。']},
      answers:['白云生处有人家','霜叶红于二月花'],
      explanation:'《山行》是唐代诗人杜牧的作品，描写山间秋色。'},
    { id:'c5', type:'vocab', difficulty:1, unit:'u1', lesson:'l2',
      question:'给带点字选择正确的读音，用"√"标出',
      items:[
        {char:'好',context:'好奇', options:['hǎo','hào'], answer:1},
        {char:'朝',context:'朝霞', options:['zhāo','cháo'], answer:0},
        {char:'难',context:'困难', options:['nán','nàn'],  answer:0},
      ]},
    { id:'c6', type:'sentence', difficulty:2, unit:'u2', lesson:'l6',
      question:'仿照例句，用加点词语写一句话',
      example:'秋天的雨，是一把钥匙。它带着清凉和温柔，轻轻地，轻轻地，趁你没留意，把秋天的大门打开了。',
      prompt:'春天的风，是____。它带着____，____地，____地，把春天的____。',
      answer:'（示例）春天的风，是一位画家。它带着温暖和色彩，轻轻地，轻轻地，把大地涂抹得五彩缤纷。',
      hint:'可自由发挥，注意仿照原句结构。'},
  ],
  math: [
    { id:'m1', type:'calc', difficulty:1, unit:'u1', lesson:'l1',
      question:'用递等式计算下面各题',
      items:[
        {expression:'36 + 24 × 3', answer:108, steps:['= 36 + 72','= 108']},
        {expression:'(56 - 32) ÷ 8', answer:3,  steps:['= 24 ÷ 8','= 3']},
        {expression:'5 × 8 + 60 ÷ 4', answer:55, steps:['= 40 + 15','= 55']},
        {expression:'(120 + 80) × 4', answer:800, steps:['= 200 × 4','= 800']},
      ]},
    { id:'m2', type:'apply', difficulty:3, unit:'u3', lesson:'l6',
      question:'小明家上个月用水28吨，这个月比上个月节约了6吨，小红家这个月用水18吨。两家这个月一共用水多少吨？',
      answer:40,
      solution:'小明家这个月：28 - 6 = 22（吨）\n两家共用：22 + 18 = 40（吨）\n答：两家这个月一共用水40吨。',
      steps:['第一步：求小明家这个月用水量 28-6=22（吨）','第二步：求两家共用水量 22+18=40（吨）']},
    { id:'m3', type:'fill', difficulty:2, unit:'u4', lesson:'l10',
      question:'在□里填上合适的数',
      items:[
        {template:'□ × 6 = 48', answer:8},
        {template:'72 ÷ □ = 9', answer:8},
        {template:'□ × 7 = 63', answer:9},
        {template:'45 ÷ □ = 5', answer:9},
        {template:'□ × 8 = 64', answer:8},
      ]},
    { id:'m4', type:'judge', difficulty:1, unit:'u1', lesson:'l2',
      question:'判断下面各题是否正确，正确的打"√"，错误的打"×"',
      items:[
        {statement:'在混合运算中，先算加减，再算乘除。', answer:false, explanation:'应先算乘除，再算加减。'},
        {statement:'有括号时，要先算括号里面的运算。', answer:true, explanation:'括号内运算优先级最高。'},
        {statement:'36 ÷ 4 + 5 = 36 ÷ 9 = 4', answer:false, explanation:'36÷4+5 = 9+5 = 14，不能先加再除。'},
      ]},
    { id:'m5', type:'choice', difficulty:2, unit:'u3', lesson:'l7',
      question:'一辆卡车运了3次大白菜，每次运208千克，大约运了多少千克大白菜？',
      options:['A. 约500千克','B. 约600千克','C. 约700千克','D. 约800千克'],
      answer:1, explanation:'208≈200，200×3=600，所以大约运了600千克。'},
  ],
  english: [
    { id:'e1', type:'word', difficulty:1, unit:'u1', lesson:'l1',
      question:'Look at the pictures and write the correct words.',
      items:[
        {hint:'morning greeting',  answer:'Good morning',  emoji:'🌅'},
        {hint:'afternoon greeting',answer:'Good afternoon',emoji:'☀️'},
        {hint:'evening greeting',  answer:'Good evening',  emoji:'🌙'},
        {hint:'say goodbye',       answer:'Goodbye',       emoji:'👋'},
      ]},
    { id:'e2', type:'choice', difficulty:1, unit:'u1', lesson:'l2',
      question:'Choose the best answer.',
      items:[
        {q:"— What's your name?\n— ____ name is Lily.",
         options:['A. My','B. Your','C. His','D. Her'], answer:0},
        {q:"He is my father. ____ name is Jack.",
         options:['A. My','B. Her','C. His','D. Their'], answer:2},
        {q:"____ is she? She is my sister.",
         options:['A. What','B. Where','C. Who','D. How'], answer:2},
      ]},
    { id:'e3', type:'reading', difficulty:3, unit:'u2', lesson:'l5',
      passage:"This is my family. My father is tall and strong. My mother is beautiful. She has long hair. I have a little brother. He is cute and funny. We all love each other. We are a happy family!",
      questions:[
        {q:"What does the father look like?",
         options:['A. Short and thin','B. Tall and strong','C. Fat and short','D. Small and cute'], answer:1},
        {q:"Does the mother have long hair?",
         options:['A. Yes, she does.','B. No, she doesn\'t.','C. Yes, he does.','D. No, he doesn\'t.'], answer:0},
        {q:"How many people are in the family?",
         options:['A. Two','B. Three','C. Four','D. Five'], answer:2},
      ]},
    { id:'e4', type:'cloze', difficulty:2, unit:'u3', lesson:'l7',
      intro:"Read and fill in the blanks.",
      passage:"Look! There _1_ many animals in the zoo. The pandas _2_ black and white. They _3_ very cute. I _4_ pandas very much.",
      blanks:[
        {n:1, options:['is','are','am','be'],   answer:1},
        {n:2, options:['is','are','am','has'],  answer:1},
        {n:3, options:['is','are','am','has'],  answer:1},
        {n:4, options:['like','likes','liking','liked'], answer:0},
      ]},
    { id:'e5', type:'sentence', difficulty:2, unit:'u2', lesson:'l4',
      question:"Translate the following sentences into English.",
      items:[
        {cn:'这是我的妈妈。她叫李梅。', answer:'This is my mother. Her name is Li Mei.'},
        {cn:'我有一个弟弟。他很可爱。', answer:'I have a little brother. He is very cute.'},
      ]},
  ]
}

export const TEST_TYPES = [
  {id:'lesson', name:'按课测试',  desc:'选择单课进行专项训练', icon:'📄', color:'#6B48FF', time:20},
  {id:'unit',   name:'单元测试',  desc:'完整单元综合测试',     icon:'📚', color:'#FF6B35', time:40},
  {id:'midterm',name:'期中测试',  desc:'第1–4单元综合测试',    icon:'📋', color:'#FF3B7F', time:90},
  {id:'final',  name:'期末测试',  desc:'全册综合测试卷',       icon:'🎯', color:'#00B8D4', time:120},
  {id:'custom', name:'自定义测试',desc:'按题型自由组合出题',   icon:'⚙️', color:'#43A047', time:30},
]

export const LESSON_TYPES = { prose:'散文', poem:'现代诗', poetry:'古诗词', fairy_tale:'童话', fiction:'小说', lesson:'新课', practice:'练习课' }

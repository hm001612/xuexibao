import { useState } from 'react'
import { SUBJECTS, CURRICULUM, LESSON_TYPES, QUESTIONS, QUESTION_BANK } from '../data/content'

// ─── Lesson type config ──────────────────────────────────────────────────────
const LESSON_KNOWLEDGE = {
  prose:      { sections: ['内容概览','重点词句','段落分析','写作特色'], icon: '📝' },
  poem:       { sections: ['朗读节奏','意象赏析','情感理解','仿写练习'], icon: '🎵' },
  poetry:     { sections: ['作者背景','诗句注释','意境赏析','背诵默写'], icon: '📜' },
  fairy_tale: { sections: ['情节梳理','人物分析','寓意感悟','创意续写'], icon: '🏰' },
  fiction:    { sections: ['情节梳理','人物形象','主题探究','写法借鉴'], icon: '📖' },
  myth:       { sections: ['神话背景','故事情节','人物特点','文化内涵'], icon: '⚡' },
  character:  { sections: ['字形结构','笔顺规范','组词练习','造句运用'], icon: '字' },
  pinyin:     { sections: ['发音要领','拼读练习','声调练习','词语拼写'], icon: '拼' },
  classical:  { sections: ['文言词汇','句子翻译','故事理解','道理感悟'], icon: '古' },
  lesson:     { sections: ['知识要点','例题讲解','方法归纳','巩固练习'], icon: '📐' },
  practice:   { sections: ['知识回顾','综合练习','重点难点','错题归纳'], icon: '✏️' },
}

// ─── Data helpers ────────────────────────────────────────────────────────────
function getLK(type) { return LESSON_KNOWLEDGE[type] || LESSON_KNOWLEDGE['prose'] }

// Grade-specific vocab for each subject
const GRADE_VOCAB = {
  chinese: {
    '一年级': [
      { word: '学校', pinyin: 'xuéxiào', meaning: '学生读书学习的地方' },
      { word: '老师', pinyin: 'lǎoshī',  meaning: '教书育人的人' },
      { word: '朋友', pinyin: 'péngyou', meaning: '要好的人，知己' },
      { word: '快乐', pinyin: 'kuàilè',  meaning: '感到高兴，幸福' },
    ],
    '二年级': [
      { word: '认真', pinyin: 'rènzhēn', meaning: '专心诚恳，不马虎' },
      { word: '勇敢', pinyin: 'yǒnggǎn', meaning: '有胆量，不怕危险' },
      { word: '美丽', pinyin: 'měilì',   meaning: '好看，漂亮' },
      { word: '希望', pinyin: 'xīwàng',  meaning: '心里想达到某种目的或出现某种情况' },
    ],
    '三年级': [
      { word: '积累', pinyin: 'jī lěi',   meaning: '逐渐聚集增多' },
      { word: '品味', pinyin: 'pǐn wèi',  meaning: '仔细体会，欣赏' },
      { word: '感悟', pinyin: 'gǎn wù',   meaning: '有所感触而领悟' },
      { word: '描绘', pinyin: 'miáo huì', meaning: '用语言或画笔表现出来' },
    ],
    '四年级': [
      { word: '壮观', pinyin: 'zhuàngguān', meaning: '雄伟而美观的景象' },
      { word: '启示', pinyin: 'qǐshì',     meaning: '启发指示，使人有所领悟' },
      { word: '联想', pinyin: 'liánxiǎng', meaning: '由一事物想到另一事物的思维活动' },
      { word: '珍贵', pinyin: 'zhēnguì',   meaning: '价值高，意义深远' },
    ],
    '五年级': [
      { word: '坚韧', pinyin: 'jiānrèn',   meaning: '坚强而有韧性，不轻易屈服' },
      { word: '奉献', pinyin: 'fèngxiàn',  meaning: '恭敬地献出，贡献给' },
      { word: '豁达', pinyin: 'huòdá',     meaning: '性格开朗，心胸宽广' },
      { word: '缅怀', pinyin: 'miǎnhuái',  meaning: '回想过去，表示追念' },
    ],
    '六年级': [
      { word: '渺小', pinyin: 'miǎoxiǎo',  meaning: '非常微小，不值一提' },
      { word: '沧桑', pinyin: 'cāngsāng',  meaning: '比喻世事变化很大' },
      { word: '瞻仰', pinyin: 'zhānyǎng',  meaning: '恭敬地看' },
      { word: '精湛', pinyin: 'jīngzhàn',  meaning: '精深，高超' },
    ],
  },
  math: {
    '一年级': [
      { word: '比较', pinyin: 'bǐjiào',  meaning: '对照两种或以上的事物辨别异同' },
      { word: '相同', pinyin: 'xiāngtóng', meaning: '没有差别，一样' },
      { word: '多少', pinyin: 'duōshǎo', meaning: '数量的多与少' },
      { word: '顺序', pinyin: 'shùnxù',  meaning: '按规律排列的次序' },
    ],
    '二年级': [
      { word: '乘法', pinyin: 'chéngfǎ', meaning: '数学运算，表示几个相同数相加' },
      { word: '口诀', pinyin: 'kǒujué',  meaning: '便于记忆的简短规律性文字' },
      { word: '倍数', pinyin: 'bèishù',  meaning: '一个数是另一个数的整数倍' },
      { word: '对称', pinyin: 'duìchèn', meaning: '两边完全相同，互相配合' },
    ],
    '三年级': [
      { word: '运算', pinyin: 'yùnsuàn', meaning: '按照一定规则进行计算' },
      { word: '估算', pinyin: 'gūsuàn',  meaning: '大致估计计算结果' },
      { word: '面积', pinyin: 'miànjī',  meaning: '平面图形或物体表面的大小' },
      { word: '周长', pinyin: 'zhōucháng', meaning: '围绕图形一圈的长度总和' },
    ],
    '四年级': [
      { word: '运算律', pinyin: 'yùnsuànlǜ', meaning: '数学运算中的基本规律' },
      { word: '平行', pinyin: 'pínghéng',   meaning: '两直线在同一平面内不相交' },
      { word: '垂直', pinyin: 'chuízhí',    meaning: '两直线相交成直角' },
      { word: '统计', pinyin: 'tǒngjì',     meaning: '收集整理和分析数据' },
    ],
    '五年级': [
      { word: '因数', pinyin: 'yīnshù',  meaning: '能整除某数的数叫该数的因数' },
      { word: '公倍数', pinyin: 'gōngbèishù', meaning: '两数共同的倍数' },
      { word: '通分', pinyin: 'tōngfēn', meaning: '把分母不同的分数化成同分母分数' },
      { word: '倒数', pinyin: 'dàoshù',  meaning: '两个数乘积为1，互为倒数' },
    ],
    '六年级': [
      { word: '百分数', pinyin: 'bǎifēnshù', meaning: '表示一个数是另一个数的百分之几' },
      { word: '比例', pinyin: 'bǐlì',     meaning: '两个比相等叫比例' },
      { word: '正比例', pinyin: 'zhèngbǐlì', meaning: '两量之比为固定常数，同增同减' },
      { word: '圆周率', pinyin: 'yuánzhōulǜ', meaning: '圆的周长与直径之比，约等于3.14' },
    ],
  },
  english: {
    '一年级': [
      { word: 'hello', pinyin: '', meaning: '你好（打招呼）' },
      { word: 'red',   pinyin: '', meaning: '红色' },
      { word: 'cat',   pinyin: '', meaning: '猫' },
      { word: 'one',   pinyin: '', meaning: '一（数字1）' },
    ],
    '二年级': [
      { word: 'pen',   pinyin: '', meaning: '钢笔，笔' },
      { word: 'desk',  pinyin: '', meaning: '书桌' },
      { word: 'tall',  pinyin: '', meaning: '高的（身高）' },
      { word: 'happy', pinyin: '', meaning: '高兴的，快乐的' },
    ],
    '三年级': [
      { word: 'family',  pinyin: '', meaning: '家庭，家人' },
      { word: 'colour',  pinyin: '', meaning: '颜色' },
      { word: 'animal',  pinyin: '', meaning: '动物' },
      { word: 'like',    pinyin: '', meaning: '喜欢；像' },
    ],
    '四年级': [
      { word: 'classroom', pinyin: '', meaning: '教室' },
      { word: 'weather',   pinyin: '', meaning: '天气' },
      { word: 'season',    pinyin: '', meaning: '季节' },
      { word: 'occupation', pinyin: '', meaning: '职业，工作' },
    ],
    '五年级': [
      { word: 'personality', pinyin: '', meaning: '性格，个性' },
      { word: 'subject',     pinyin: '', meaning: '科目，学科' },
      { word: 'ability',     pinyin: '', meaning: '能力，才能' },
      { word: 'past tense',  pinyin: '', meaning: '过去时（语法）' },
    ],
    '六年级': [
      { word: 'comparative', pinyin: '', meaning: '比较级（语法）' },
      { word: 'environment', pinyin: '', meaning: '环境' },
      { word: 'dream',       pinyin: '', meaning: '梦想；梦' },
      { word: 'graduate',    pinyin: '', meaning: '毕业；毕业生' },
    ],
  },
}

function getVocab(subId, grade) {
  return GRADE_VOCAB[subId]?.[grade] || GRADE_VOCAB[subId]?.['三年级'] || []
}

// ─── Preview-specific content ─────────────────────────────────────────────────
function getPreviewGoals(subId, lesson, grade) {
  const g = parseInt(grade) || 3
  if (subId === 'chinese') {
    if (lesson.type === 'poetry') return [
      { q: `这首诗的作者是谁？你了解他/她吗？`, hint: '在课本注释中找一找' },
      { q: '诗中出现了哪些景物或事物？', hint: '圈出名词，想象画面' },
      { q: '你觉得这首诗表达了什么心情？', hint: '根据词语猜一猜' },
    ]
    if (lesson.type === 'fairy_tale') return [
      { q: '看标题，你猜故事讲了什么？', hint: '大胆猜测，看完后验证' },
      { q: '快速浏览，故事里有哪些人物？', hint: '圈出人名或称呼' },
      { q: '读第一段，故事发生在什么地方？', hint: '找时间、地点线索' },
    ]
    return [
      { q: `课文题目是"${lesson.title}"，你觉得内容会写什么？`, hint: '看题目，大胆猜测' },
      { q: `快速浏览课文，有哪些生字不认识？`, hint: '做上标记，借助拼音' },
      { q: '读完后，课文主要写了什么？用一句话说', hint: '抓住"谁做了什么"' },
    ]
  }
  if (subId === 'math') return [
    { q: '看本课标题，你认为会学什么新知识？', hint: '联系生活场景想一想' },
    { q: '翻开课本，有没有你已经会的内容？', hint: '标记已知，找出未知' },
    { q: '看例题图，你觉得怎么解决这个问题？', hint: '先尝试，再看讲解' },
  ]
  return [
    { q: "Look at the lesson title — what do you think you will learn?", hint: 'Predict and check later' },
    { q: "Find 3 new words you don't know. What do they mean?", hint: 'Use context or a dictionary' },
    { q: "Read the dialogue once. What is the topic?", hint: 'Focus on the key idea' },
  ]
}

// ─── Review-specific content ──────────────────────────────────────────────────
function getReviewChecklist(subId, lesson, grade) {
  const g = parseInt(grade) || 3
  if (subId === 'chinese') {
    if (lesson.type === 'poetry') return [
      { item: `能背诵并默写全诗`, level: 'hard' },
      { item: '理解每句诗的意思，能用自己的话解释', level: 'mid' },
      { item: '记住作者姓名、朝代、诗歌主题', level: 'easy' },
      { item: '掌握诗中重点字词的读音和写法', level: 'easy' },
    ]
    return [
      { item: `掌握本课所有生字，能读写默写`, level: 'hard' },
      { item: '能流利有感情地朗读课文', level: 'mid' },
      { item: '能概括课文主要内容（3句话以内）', level: 'mid' },
      { item: '理解文中关键词句的含义和作用', level: 'hard' },
    ]
  }
  if (subId === 'math') return [
    { item: '能说出本课核心知识点（不看书）', level: 'hard' },
    { item: '独立完成3道例题类型的练习', level: 'mid' },
    { item: '能向同学解释解题步骤', level: 'hard' },
    { item: '知道本课常见错误点并能避免', level: 'mid' },
  ]
  return [
    { item: 'Can spell and use all key vocabulary', level: 'hard' },
    { item: 'Can use main sentence patterns in new sentences', level: 'hard' },
    { item: 'Understand the reading passage without help', level: 'mid' },
    { item: 'Remember key grammar rules from this lesson', level: 'easy' },
  ]
}

function getReviewPitfalls(subId, lesson) {
  if (subId === 'chinese') {
    if (lesson.type === 'poetry') return [
      { mistake: '诗句中形近字混淆（如"渚"与"诸"）', tip: '区分偏旁，理解字义' },
      { mistake: '背诵时把顺序背错', tip: '理解诗意，按意境记忆，不要死背' },
      { mistake: '默写时丢笔少画', tip: '书写时放慢速度，逐字检查' },
    ]
    return [
      { mistake: '多音字读错（如"好奇"中"好"读hào，非hǎo）', tip: '结合语境判断读音' },
      { mistake: '形近字写错（如"己/已/巳"）', tip: '对比记忆，编口诀' },
      { mistake: '概括课文内容时太详细或太简单', tip: '抓主要人物+主要事件' },
    ]
  }
  if (subId === 'math') return [
    { mistake: '运算顺序搞错（先加减后乘除）', tip: '记住：有括号先括号，乘除优先加减' },
    { mistake: '计算时粗心进/退位忘记', tip: '列竖式，进位在上方标小"1"' },
    { mistake: '应用题漏写单位或答句', tip: '解题最后检查：结果+单位+答句' },
  ]
  return [
    { mistake: 'Confusing similar words (e.g. his/her/its)', tip: 'Focus on the subject gender and number' },
    { mistake: 'Forgetting third-person singular -s', tip: 'Check: He/She/It → verb + s' },
    { mistake: 'Wrong word order in questions', tip: 'Remember: Aux + Subject + Verb pattern' },
  ]
}

function getReviewExercises(subId, lesson) {
  if (subId === 'chinese') return [
    { q: `不看课本，写出你记得的本课生字（至少5个）`, type: 'recall', label: '默写练习' },
    { q: `用"____"造句（从课文中选一个你觉得好的词）`, type: 'open', label: '造句运用' },
    { q: '概括课文主要内容：谁？在哪里？做了什么？结果如何？', type: 'open', label: '内容概括' },
  ]
  if (subId === 'math') return [
    { q: '用自己的话说出本课的计算规则（不看笔记）', type: 'recall', label: '知识回忆' },
    { q: '自编一道应用题，并写出完整的解题步骤', type: 'open', label: '迁移运用' },
    { q: '找出本课你觉得最难的知识点，写下理解方法', type: 'open', label: '难点攻克' },
  ]
  return [
    { q: 'Without looking, write the 4 key vocabulary words and their meanings', type: 'recall', label: 'Recall Test' },
    { q: 'Write 2 sentences using the new sentence pattern with your own ideas', type: 'open', label: 'Creative Use' },
    { q: 'Explain in Chinese what you learned in this lesson', type: 'open', label: 'Summary' },
  ]
}

function getPreviewExercises(subId, lesson) {
  if (subId === 'chinese') return [
    { q: `看题目"${lesson.title}"，你预测课文讲了什么？`, type: 'open', label: '预测内容' },
    { q: '初读课文后，你有什么疑问？写下来带着问题再读', type: 'open', label: '提出疑问' },
    { q: '找出一个你觉得最重要的句子，抄下来并说明理由', type: 'open', label: '关键句摘录' },
  ]
  if (subId === 'math') return [
    { q: `预习前，你已经会什么？和本课知识有什么联系？`, type: 'open', label: '知识链接' },
    { q: '看课本例题，先不看解法，尝试自己想办法解决', type: 'open', label: '自主探究' },
    { q: '预习后，你还有什么不明白的？列出来', type: 'open', label: '疑问清单' },
  ]
  return [
    { q: "Before reading, predict: what is this lesson about?", type: 'open', label: 'Predict' },
    { q: "Find 2 words you don't know. Guess their meaning from context", type: 'open', label: 'Guess Meaning' },
    { q: "After reading, write 1 question you still have", type: 'open', label: 'Question' },
  ]
}

// ─── Section content ──────────────────────────────────────────────────────────
function SectionContent({ section, subId, lesson, mode }) {
  const isReview = mode === 'review'
  const cnMap = {
    '内容概览': isReview
      ? `复习要点：\n• 课文写了什么人/物/事？\n• 按什么顺序写的（时间/空间/逻辑）？\n• 全文分几个部分，各写了什么？\n\n【自测】闭眼回忆，能讲出课文大意吗？`
      : `预习方法：\n1. 先看课题，预测内容\n2. 浏览全文，了解大意\n3. 标出生字，注上拼音\n4. 分段标序，思考段意\n\n请打开课本第 ${lesson.pages} 页开始预习。`,
    '重点词句': isReview
      ? `词句复习：\n• 能写出本课重点词语（不看书）？\n• 理解加点词在句中的含义？\n• 能用重点词语造句？\n\n【易错提醒】注意多音字和形近字`
      : `词语学习方法：\n1. 读准字音（注意多音字）\n2. 理解字形（看偏旁猜含义）\n3. 联系上下文理解词义\n4. 尝试用词语造一个句子`,
    '段落分析': isReview
      ? `结构复习：\n• 课文分几段？每段写什么？\n• 哪些词语是过渡词/关联词？\n• 开头和结尾有什么联系？\n\n【自测】画出课文结构图`
      : `初读任务：\n• 给自然段标序号\n• 找出每段的关键词\n• 用铅笔标记不理解的地方\n• 想一想：各段之间有什么联系？`,
    '主题感悟': isReview
      ? `主题深化：\n• 课文表达了什么思想感情？\n• 从哪些词句中可以感受到？\n• 这让你想到了什么？有什么启发？\n\n写下你的感受（3-5句话）`
      : `带着问题读课文：\n• 作者写这篇课文想说什么？\n• 哪个地方让你印象最深？\n• 如果你是作者，你还会写什么？`,
    '诗句注释': isReview
      ? `诗句默写自测：\n1. 遮住课本，尝试默写全诗\n2. 对照检查，标出写错的字\n3. 重点记忆易错字\n\n注意：字迹工整，不漏字多字`
      : `理解诗句步骤：\n1. 读注释，理解难字含义\n2. 逐句理解，串联成意\n3. 感受整首诗描绘的画面\n4. 思考：诗人想表达什么？`,
    '意境赏析': isReview
      ? `意境复习：\n• 诗中描绘了哪些景物？\n• 这些景物组成什么画面？\n• 诗人的情感是怎样的？\n\n【仿写】用类似的写法写两句话`
      : `感受意境：\n• 闭上眼睛，听朗读，脑海中出现什么画面？\n• 诗中哪个词最有画面感？\n• 你觉得诗人当时心情怎样？`,
    '背诵默写': isReview
      ? `默写训练：\n□ 第一遍：看提示写\n□ 第二遍：半提示写\n□ 第三遍：全默写\n□ 对照检查，订正错误`
      : `背诵策略：\n1. 理解诗意（意义记忆法）\n2. 找韵脚（结尾押韵的字）\n3. 分句练习，再连贯背诵\n4. 配合手势或画面联想`,
    '知识要点': isReview
      ? `知识点自测：\n• 不看笔记，说出本课概念\n• 举一个生活中的例子\n• 这和之前学的知识有什么联系？\n\n画出本课知识结构图`
      : `预习要点：\n• 本课核心概念是什么？\n• 和之前学的知识有什么联系？\n• 看课本例题，理解解题步骤\n\n请翻到课本第 ${lesson.pages} 页`,
    '例题讲解': isReview
      ? `解题复习：\n1. 回忆解题步骤（不看笔记）\n2. 重新做例题，自己写步骤\n3. 对比答案，找出理解差距\n4. 改错并说明错误原因`
      : `初学策略：\n1. 先读题，找关键信息\n2. 想想用什么方法\n3. 看课本解法，理解每一步\n4. 合上书，自己重做一遍`,
    '方法归纳': isReview
      ? `方法巩固：\n写出你掌握的解题方法：\n1. ________________\n2. ________________\n3. ________________\n\n自己出一道题，用这个方法解`
      : `学习方法：\n• 找规律：这类题有什么共同点？\n• 对比法：和之前的知识有什么不同？\n• 归纳法：总结解题步骤`,
  }

  const content = cnMap[section]
    || `关于「${section}」的内容，请结合课本第 ${lesson.pages} 页认真学习。`

  return (
    <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 2, whiteSpace: 'pre-line',
      fontFamily: 'var(--font-serif)' }}>
      {content}
    </div>
  )
}

// ─── Knowledge Map (review only) ─────────────────────────────────────────────
function KnowledgeMap({ subId, unit, lesson, sub }) {
  const skills = unit?.keySkills || []
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
      <div style={{ fontSize: 13, color: 'var(--ink-muted)', width: '100%', marginBottom: 4 }}>
        本单元核心技能 · 点击标记掌握程度
      </div>
      {skills.map((sk, i) => (
        <SkillTag key={i} skill={sk} color={sub.color} light={sub.lightColor} />
      ))}
      <div style={{ marginTop: 8, width: '100%', padding: '10px 14px',
        background: 'var(--paper)', borderRadius: 10, fontSize: 13,
        color: 'var(--ink-muted)', borderLeft: `3px solid ${sub.color}` }}>
        掌握以上技能后，可前往「单元测试」验收学习成果
      </div>
    </div>
  )
}

function SkillTag({ skill, color, light }) {
  const [status, setStatus] = useState(0) // 0=未掌握 1=基本掌握 2=完全掌握
  const labels = ['待学习', '基本掌握', '完全掌握']
  const colors = ['var(--ink-faint)', color + 'aa', color]
  const bgs    = ['var(--paper)', light, light]
  return (
    <button onClick={() => setStatus(s => (s + 1) % 3)}
      style={{ padding: '6px 14px', borderRadius: 'var(--r-full)',
        border: `1.5px solid ${colors[status]}`,
        background: bgs[status], color: status === 0 ? 'var(--ink-muted)' : color,
        fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)',
        transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 6 }}>
      <span>{status === 0 ? '○' : status === 1 ? '◑' : '●'}</span>
      {skill}
      <span style={{ fontSize: 11, opacity: .75 }}>{labels[status]}</span>
    </button>
  )
}

// ─── Mini recall quiz (review only) ──────────────────────────────────────────
function RecallQuiz({ subId, sub, grade }) {
  // Prefer grade-specific bank; fall back to legacy pool
  const gradeBank = QUESTION_BANK[subId]?.[grade] || []
  const legacyPool = QUESTIONS[subId] || []
  const pool = gradeBank.length ? gradeBank : legacyPool
  // pick choice/judge questions for quick quiz
  const questions = pool.filter(q => q.type === 'choice' || q.type === 'judge').slice(0, 2)
  const [answers, setAnswers] = useState({})
  const [revealed, setRevealed] = useState({})

  if (questions.length === 0) return (
    <div style={{ fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center', padding: '20px 0' }}>
      暂无关联题目，请使用「按课测试」功能
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 4 }}>
        尝试回答以下复习题，再点击「查看答案」对照
      </div>
      {questions.map((q, qi) => (
        <div key={q.id} style={{ background: 'var(--paper)', borderRadius: 12, padding: '14px 16px',
          border: '1px solid var(--paper-deeper)' }}>
          <div style={{ fontSize: 14, fontFamily: 'var(--font-serif)', color: 'var(--ink)',
            marginBottom: 10, lineHeight: 1.7 }}>
            {qi + 1}. {q.question}
          </div>
          {q.options ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
              {q.options.map((opt, oi) => (
                <button key={oi}
                  onClick={() => setAnswers(a => ({ ...a, [q.id]: oi }))}
                  style={{ padding: '7px 12px', borderRadius: 8, textAlign: 'left', fontSize: 13,
                    cursor: 'pointer', fontFamily: 'var(--font-body)',
                    border: `1.5px solid ${
                      answers[q.id] === oi
                        ? (revealed[q.id] ? (oi === q.answer ? '#27a057' : '#e84a3c') : sub.color)
                        : (revealed[q.id] && oi === q.answer ? '#27a057' : 'var(--paper-deeper)')
                    }`,
                    background: answers[q.id] === oi
                      ? (revealed[q.id] ? (oi === q.answer ? '#e4f5ec' : '#fceae8') : sub.lightColor)
                      : (revealed[q.id] && oi === q.answer ? '#e4f5ec' : 'var(--white)'),
                    color: 'var(--ink)' }}>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea placeholder="写下你的答案…"
              style={{ width: '100%', minHeight: 60, border: '1.5px solid var(--paper-deeper)',
                borderRadius: 8, padding: '8px 12px', fontSize: 13, resize: 'vertical',
                fontFamily: 'var(--font-serif)', color: 'var(--ink)', background: 'var(--white)',
                outline: 'none' }}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
            />
          )}
          <button onClick={() => setRevealed(r => ({ ...r, [q.id]: true }))}
            style={{ padding: '5px 14px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
              border: `1px solid ${sub.color}`, background: 'transparent', color: sub.color,
              fontFamily: 'var(--font-body)' }}>
            查看答案
          </button>
          {revealed[q.id] && q.explanation && (
            <div style={{ marginTop: 10, padding: '8px 12px', background: sub.lightColor,
              borderRadius: 8, fontSize: 13, color: 'var(--ink)', lineHeight: 1.6 }}>
              💡 {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function LessonView({ state, navigate }) {
  const { subject: subId, grade, semester, unitId, lessonId, mode = 'preview' } = state
  const sub    = SUBJECTS[subId]
  const curr   = CURRICULUM[subId]?.[grade]?.[semester]
  const units  = curr?.units || []
  const unit   = units.find(u => u.id === unitId)
  const lesson = unit?.lessons.find(l => l.id === lessonId)

  const [notes, setNotes]             = useState('')
  const [checkedGoals, setChecked]    = useState(new Set())
  const [activeSection, setSection]   = useState(0)
  const isReview = mode === 'review'

  if (!sub || !lesson || !unit) return null

  const lk        = getLK(lesson.type)
  const vocab     = getVocab(subId, grade)
  const goals     = isReview ? getReviewChecklist(subId, lesson, grade) : getPreviewGoals(subId, lesson, grade)
  const exercises = isReview ? getReviewExercises(subId, lesson) : getPreviewExercises(subId, lesson)
  const pitfalls  = getReviewPitfalls(subId, lesson)
  const typeLabel = LESSON_TYPES[lesson.type] || lesson.type

  const allLessons  = units.flatMap(u => u.lessons.map(l => ({ ...l, unitId: u.id })))
  const currentIdx  = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson  = allLessons[currentIdx - 1]
  const nextLesson  = allLessons[currentIdx + 1]

  const toggleGoal = (i) => setChecked(prev => {
    const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n
  })

  const modeConfig = {
    preview: { label: '预习模式', accent: '#6B48FF', bg: '#F0ECFF', icon: '📖',
      desc: '带着问题读课文，标记不理解的地方，建立初步认知框架' },
    review:  { label: '复习模式', accent: sub.color, bg: sub.lightColor, icon: '🔄',
      desc: '回忆知识点，自我检测掌握程度，重点攻克易错内容' },
  }
  const mc = modeConfig[mode] || modeConfig['preview']
  const levelColors = { easy: '#27a057', mid: '#FF8C00', hard: '#e84a3c' }
  const levelLabels = { easy: '易', mid: '中', hard: '难' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* ── Top bar ── */}
      <div style={{ background: sub.grad, padding: '0 32px', boxShadow: '0 2px 16px rgba(0,0,0,.15)',
        position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingTop: 14, paddingBottom: 10 }}>
          <button onClick={() => navigate({ screen: 'subject' })}
            style={{ background: 'rgba(255,255,255,.18)', border: 'none', borderRadius: 8,
              padding: '5px 12px', color: 'rgba(255,255,255,.85)', fontSize: 13, cursor: 'pointer' }}>
            ← {sub.name}
          </button>
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 13 }}>/</span>
          <span style={{ color: 'rgba(255,255,255,.75)', fontSize: 13 }}>{unit.title}</span>
          <span style={{ color: 'rgba(255,255,255,.5)', fontSize: 13 }}>/</span>
          <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{lesson.title}</span>
          <div style={{ marginLeft: 'auto', background: mc.bg, color: mc.accent, borderRadius: 20,
            padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>
            {mc.icon} {mc.label}
          </div>
        </div>
        <div style={{ paddingBottom: 16 }}>
          <div style={{ fontFamily: 'var(--font-disp)', fontSize: 22, color: '#fff' }}>{lesson.title}</div>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.7)', marginTop: 4 }}>
            {sub.name} · {grade} {semester} · {unit.title} · {typeLabel}
            {lesson.pages && <span> · 教材 p.{lesson.pages}</span>}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '28px 24px 80px', display: 'flex', gap: 24 }}>
        {/* ── Main ── */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mode banner */}
          <div style={{ background: mc.bg, border: `1px solid ${mc.accent}30`, borderRadius: 14,
            padding: '12px 18px', marginBottom: 24, display: 'flex', alignItems: 'flex-start', gap: 12 }}>
            <span style={{ fontSize: 22, lineHeight: 1.2 }}>{mc.icon}</span>
            <div>
              <span style={{ fontWeight: 700, color: mc.accent, fontSize: 14 }}>{mc.label}</span>
              <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginTop: 3, lineHeight: 1.6 }}>{mc.desc}</div>
            </div>
          </div>

          {/* ── PREVIEW: Goals with hints ── / ── REVIEW: Mastery checklist ── */}
          <Card title={isReview ? '掌握情况自测' : '预习目标'} icon={isReview ? '✅' : '🎯'}>
            {isReview ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {goals.map((g, i) => (
                  <div key={i} onClick={() => toggleGoal(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                      borderRadius: 10, cursor: 'pointer', transition: 'background .15s',
                      background: checkedGoals.has(i) ? sub.lightColor : 'var(--paper)',
                      border: `1px solid ${checkedGoals.has(i) ? sub.color : 'transparent'}` }}>
                    <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                      border: `1.5px solid ${checkedGoals.has(i) ? sub.color : 'var(--ink-faint)'}`,
                      background: checkedGoals.has(i) ? sub.color : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: 12 }}>
                      {checkedGoals.has(i) ? '✓' : ''}
                    </div>
                    <span style={{ flex: 1, fontSize: 14, lineHeight: 1.6,
                      textDecoration: checkedGoals.has(i) ? 'line-through' : 'none',
                      color: checkedGoals.has(i) ? 'var(--ink-muted)' : 'var(--ink)' }}>
                      {g.item}
                    </span>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10,
                      background: levelColors[g.level] + '20', color: levelColors[g.level] }}>
                      {levelLabels[g.level]}
                    </span>
                  </div>
                ))}
                {checkedGoals.size > 0 && (
                  <div style={{ marginTop: 4, fontSize: 13, color: sub.color, textAlign: 'right' }}>
                    已掌握 {checkedGoals.size}/{goals.length} 项 ✓
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {goals.map((g, i) => (
                  <div key={i} style={{ padding: '12px 16px', borderRadius: 10,
                    background: 'var(--paper)', border: '1px solid var(--paper-deeper)' }}>
                    <div style={{ fontSize: 14, fontFamily: 'var(--font-serif)', color: 'var(--ink)',
                      lineHeight: 1.7, marginBottom: 6 }}>
                      {i + 1}. {g.q}
                    </div>
                    <div style={{ fontSize: 12, color: mc.accent, background: mc.bg,
                      display: 'inline-block', padding: '2px 10px', borderRadius: 20 }}>
                      💡 {g.hint}
                    </div>
                  </div>
                ))}
                <div style={{ padding: '10px 14px', background: 'var(--paper)', borderRadius: 10,
                  fontSize: 13, color: 'var(--ink-muted)', lineHeight: 1.7,
                  borderLeft: `3px solid ${mc.accent}` }}>
                  预习时先自己思考，遇到不懂的记下来，课堂上带着疑问听讲
                </div>
              </div>
            )}
          </Card>

          {/* ── REVIEW ONLY: Pitfalls ── */}
          {isReview && (
            <Card title="易错点提醒" icon="⚠️">
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {pitfalls.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 14px',
                    borderRadius: 10, background: '#fff8f0', border: '1px solid #ffd0a0' }}>
                    <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>❌</span>
                    <div>
                      <div style={{ fontSize: 13, color: '#b45309', fontWeight: 500, marginBottom: 4 }}>
                        易错：{p.mistake}
                      </div>
                      <div style={{ fontSize: 13, color: '#27a057', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>✅</span> 正确做法：{p.tip}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* ── PREVIEW: Vocab with meaning blanks / REVIEW: Vocab recall ── */}
          <Card title={subId === 'english' ? 'Key Words & Phrases' : (isReview ? '词语默写自测' : '重点词语预习')} icon="📚">
            {isReview ? (
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>
                  不看意思，写出各词语的含义；写完再展开对照
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {vocab.map((v, i) => (
                    <RecallVocabRow key={i} v={v} sub={sub} />
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 12 }}>
                  {subId === 'english' ? '读出每个词，猜测意思后展开查看' : '先读出词语，猜测含义，再看解释'}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
                  {vocab.map((v, i) => (
                    <PreviewVocabCard key={i} v={v} sub={sub} />
                  ))}
                </div>
                <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--paper)', borderRadius: 10,
                  fontSize: 13, color: 'var(--ink-muted)', borderLeft: `3px solid ${sub.color}` }}>
                  提示：实际词语请对照课本 p.{lesson.pages} 学习
                </div>
              </div>
            )}
          </Card>

          {/* Knowledge sections */}
          <Card title="学习内容" icon={lk.icon}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {lk.sections.map((sec, i) => (
                <button key={i} onClick={() => setSection(i)}
                  style={{ padding: '7px 16px', borderRadius: 'var(--r-full)',
                    border: `1.5px solid ${activeSection === i ? sub.color : 'var(--paper-deeper)'}`,
                    background: activeSection === i ? sub.color : 'var(--white)',
                    color: activeSection === i ? '#fff' : 'var(--ink-light)',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)' }}>
                  {sec}
                </button>
              ))}
            </div>
            <div style={{ background: 'var(--paper)', borderRadius: 12, padding: '18px',
              minHeight: 100, border: '1px solid var(--paper-deeper)' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginBottom: 10, fontStyle: 'italic' }}>
                【{lk.sections[activeSection]}】{isReview ? '— 复习版' : '— 预习版'}
              </div>
              <SectionContent section={lk.sections[activeSection]} subId={subId}
                lesson={lesson} mode={mode} />
            </div>
          </Card>

          {/* ── REVIEW ONLY: Mini quiz ── */}
          {isReview && (
            <Card title="快速自测" icon="🧪">
              <RecallQuiz subId={subId} sub={sub} grade={grade} />
            </Card>
          )}

          {/* ── REVIEW ONLY: Knowledge map ── */}
          {isReview && (
            <Card title="单元知识图谱" icon="🗺️">
              <KnowledgeMap subId={subId} unit={unit} lesson={lesson} sub={sub} />
            </Card>
          )}

          {/* Exercises */}
          <Card title={isReview ? '复习练习' : '预习思考题'} icon="✏️">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {exercises.map((ex, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ background: sub.color, color: '#fff', borderRadius: 6,
                      padding: '1px 9px', fontSize: 11, fontWeight: 700 }}>{ex.label}</span>
                    <span style={{ fontSize: 14, fontFamily: 'var(--font-serif)', color: 'var(--ink)',
                      lineHeight: 1.7 }}>{ex.q}</span>
                  </div>
                  <textarea placeholder={isReview ? '回忆并写出答案…' : '写下你的预习思考…'}
                    style={{ width: '100%', minHeight: 72, border: '1.5px solid var(--paper-deeper)',
                      borderRadius: 10, padding: '10px 14px', fontSize: 14,
                      fontFamily: 'var(--font-serif)', color: 'var(--ink)', background: 'var(--white)',
                      outline: 'none', resize: 'vertical', lineHeight: 1.8 }}
                    onFocus={e => e.target.style.borderColor = sub.color}
                    onBlur={e => e.target.style.borderColor = 'var(--paper-deeper)'}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card title="我的笔记" icon="📓">
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder={isReview
                ? '总结本课掌握情况：哪些会了？哪些还需巩固？易错点是什么？'
                : '记录预习疑问、关键词、初步理解……上课后用不同颜色补充答案'}
              style={{ width: '100%', minHeight: 120, border: '1.5px solid var(--paper-deeper)',
                borderRadius: 10, padding: '12px 16px', fontSize: 14,
                fontFamily: 'var(--font-serif)', color: 'var(--ink)', background: 'var(--white)',
                outline: 'none', resize: 'vertical', lineHeight: 1.8 }}
              onFocus={e => e.target.style.borderColor = sub.color}
              onBlur={e => e.target.style.borderColor = 'var(--paper-deeper)'}
            />
            {notes.length > 0 && (
              <div style={{ marginTop: 6, fontSize: 12, color: 'var(--ink-faint)', textAlign: 'right' }}>
                {notes.length} 字
              </div>
            )}
          </Card>

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              onClick={() => navigate({ screen: 'test-config', testConfig: { scope: 'lesson', unitId, lessonId } })}
              style={{ flex: 1, background: sub.grad, color: '#fff', border: 'none', borderRadius: 12,
                padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-body)', boxShadow: `0 4px 16px ${sub.color}44` }}>
              {isReview ? '复习完成，开始测试 →' : '预习完成，去听课！上课后可切换「复习模式」'}
            </button>
            {nextLesson && (
              <button
                onClick={() => navigate({ screen: 'lesson-view', unitId: nextLesson.unitId, lessonId: nextLesson.id })}
                style={{ background: 'var(--white)', color: sub.color, border: `1.5px solid ${sub.color}`,
                  borderRadius: 12, padding: '13px 20px', fontSize: 14, cursor: 'pointer',
                  fontFamily: 'var(--font-body)' }}>
                下一课 →
              </button>
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Progress */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '16px',
              border: '1px solid var(--paper-dark)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>
                {isReview ? '掌握进度' : '预习进度'}
              </div>
              <div style={{ fontSize: 28, fontFamily: 'var(--font-en)', color: sub.color, lineHeight: 1 }}>
                {goals.length > 0 ? Math.round((checkedGoals.size / goals.length) * 100) : 0}%
              </div>
              <div style={{ height: 5, background: 'var(--paper-dark)', borderRadius: 3, marginTop: 8 }}>
                <div style={{ height: '100%', width: `${goals.length > 0 ? (checkedGoals.size / goals.length) * 100 : 0}%`,
                  background: sub.color, borderRadius: 3, transition: 'width .4s' }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--ink-faint)', marginTop: 6, lineHeight: 1.5 }}>
                {isReview ? '点击左侧清单打勾' : '完成预习目标后打勾'}
              </div>
            </div>

            {/* Mode switcher */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '14px',
              border: '1px solid var(--paper-dark)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>
                切换模式
              </div>
              {['preview', 'review'].map(m => (
                <button key={m} onClick={() => navigate({ ...state, mode: m })}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, marginBottom: 6,
                    border: `1.5px solid ${mode === m ? sub.color : 'var(--paper-deeper)'}`,
                    background: mode === m ? sub.lightColor : 'var(--paper)',
                    color: mode === m ? sub.color : 'var(--ink-muted)',
                    fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-body)',
                    fontWeight: mode === m ? 600 : 400, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{m === 'preview' ? '📖' : '🔄'}</span>
                  {m === 'preview' ? '预习模式' : '复习模式'}
                </button>
              ))}
            </div>

            {/* Lesson list */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '16px',
              border: '1px solid var(--paper-dark)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>
                {unit.title}
              </div>
              {unit.lessons.map((l, i) => (
                <div key={l.id}
                  onClick={() => navigate({ screen: 'lesson-view', unitId: unit.id, lessonId: l.id })}
                  style={{ padding: '8px 10px', borderRadius: 8, cursor: 'pointer',
                    background: l.id === lessonId ? sub.lightColor : 'transparent',
                    marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    background: l.done ? sub.color : 'var(--paper-dark)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: l.done ? '#fff' : 'var(--ink-faint)' }}>
                    {l.done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 12, lineHeight: 1.4,
                    color: l.id === lessonId ? sub.darkColor : 'var(--ink-muted)',
                    fontWeight: l.id === lessonId ? 600 : 400 }}>
                    {l.title}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '16px',
              border: '1px solid var(--paper-dark)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>
                快捷操作
              </div>
              {[
                { icon: '✏️', label: '按课测试', action: () => navigate({ screen: 'test-config', testConfig: { scope: 'lesson', unitId, lessonId } }) },
                { icon: '📚', label: '单元测试', action: () => navigate({ screen: 'test-config', testConfig: { scope: 'unit', unitId } }) },
                { icon: '🖨️', label: '打印练习', action: () => navigate({ screen: 'print', testConfig: { scope: 'lesson', unitId, lessonId } }) },
              ].map(({ icon, label, action }) => (
                <button key={label} onClick={action}
                  style={{ width: '100%', padding: '8px 10px', borderRadius: 8, border: 'none',
                    background: 'var(--paper)', color: 'var(--ink-light)', fontSize: 13,
                    cursor: 'pointer', textAlign: 'left', marginBottom: 6,
                    fontFamily: 'var(--font-body)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{icon}</span> {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function Card({ title, icon, children }) {
  return (
    <div style={{ background: 'var(--white)', borderRadius: 18, border: '1px solid var(--paper-dark)',
      boxShadow: 'var(--sh-xs)', marginBottom: 20, overflow: 'hidden' }}>
      <div style={{ padding: '14px 20px 12px', borderBottom: '1px solid var(--paper)',
        display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 600, color: 'var(--ink)' }}>
          {title}
        </span>
      </div>
      <div style={{ padding: '16px 20px' }}>{children}</div>
    </div>
  )
}

function PreviewVocabCard({ v, sub }) {
  const [open, setOpen] = useState(false)
  return (
    <div onClick={() => setOpen(o => !o)}
      style={{ background: 'var(--paper)', borderRadius: 10, padding: '12px 16px',
        border: `1px solid ${open ? sub.color : 'var(--paper-deeper)'}`, cursor: 'pointer',
        transition: 'border-color .15s' }}>
      <div style={{ fontFamily: 'var(--font-disp)', fontSize: 18, color: sub.color, marginBottom: 2 }}>
        {v.word}
      </div>
      {v.pinyin && (
        <div style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
          {v.pinyin}
        </div>
      )}
      {open ? (
        <div style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.5 }}>{v.meaning}</div>
      ) : (
        <div style={{ fontSize: 12, color: 'var(--ink-faint)', fontStyle: 'italic' }}>点击查看含义…</div>
      )}
    </div>
  )
}

function RecallVocabRow({ v, sub }) {
  const [revealed, setRevealed] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
      borderRadius: 10, background: 'var(--paper)', border: '1px solid var(--paper-deeper)' }}>
      <div style={{ fontFamily: 'var(--font-disp)', fontSize: 16, color: sub.color, width: 80, flexShrink: 0 }}>
        {v.word}
        {v.pinyin && <div style={{ fontSize: 11, color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>{v.pinyin}</div>}
      </div>
      <div style={{ flex: 1, height: 28, border: '1px dashed var(--paper-deeper)', borderRadius: 6 }} />
      <button onClick={() => setRevealed(r => !r)}
        style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, cursor: 'pointer',
          border: `1px solid ${sub.color}`, background: revealed ? sub.lightColor : 'transparent',
          color: sub.color, fontFamily: 'var(--font-body)', flexShrink: 0 }}>
        {revealed ? v.meaning : '查看'}
      </button>
    </div>
  )
}

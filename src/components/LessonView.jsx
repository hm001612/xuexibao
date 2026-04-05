import { useState } from 'react'
import { SUBJECTS, CURRICULUM, LESSON_TYPES, QUESTIONS } from '../data/content'

// Knowledge points per lesson type
const LESSON_KNOWLEDGE = {
  prose: {
    sections: ['生字词学习', '课文朗读', '段落分析', '主题感悟'],
    icon: '📝'
  },
  poem: {
    sections: ['生字词学习', '朗读节奏', '意境理解', '仿写练习'],
    icon: '🎵'
  },
  poetry: {
    sections: ['作者介绍', '诗句注释', '意象分析', '背诵默写'],
    icon: '📜'
  },
  fairy_tale: {
    sections: ['生字词学习', '故事情节', '人物分析', '道理感悟'],
    icon: '🏰'
  },
  fiction: {
    sections: ['生字词学习', '情节梳理', '人物形象', '主题探究'],
    icon: '📖'
  },
  myth: {
    sections: ['神话背景', '故事情节', '人物特点', '文化内涵'],
    icon: '⚡'
  },
  character: {
    sections: ['字形结构', '笔顺规范', '组词练习', '造句运用'],
    icon: '字'
  },
  pinyin: {
    sections: ['发音要领', '拼读练习', '声调练习', '词语拼写'],
    icon: '拼'
  },
  classical: {
    sections: ['文言词汇', '句子翻译', '故事理解', '道理感悟'],
    icon: '古'
  },
  lesson: {
    sections: ['知识要点', '例题讲解', '方法归纳', '巩固练习'],
    icon: '📐'
  },
  practice: {
    sections: ['知识回顾', '综合练习', '重点难点', '错题归纳'],
    icon: '✏️'
  },
}

function getLessonKnowledge(type) {
  return LESSON_KNOWLEDGE[type] || LESSON_KNOWLEDGE['prose']
}

// Simulated vocabulary per common lesson patterns
function getVocabForLesson(subId, lesson, grade) {
  const templates = {
    chinese: [
      { word: '积累', pinyin: 'jī lěi',  meaning: '逐渐聚集增多' },
      { word: '品味', pinyin: 'pǐn wèi', meaning: '仔细体会，欣赏' },
      { word: '感悟', pinyin: 'gǎn wù',  meaning: '有所感触而领悟' },
      { word: '领略', pinyin: 'lǐng lüè',meaning: '了解并欣赏' },
      { word: '描绘', pinyin: 'miáo huì',meaning: '用语言或画笔表现' },
      { word: '生动', pinyin: 'shēng dòng',meaning: '形象逼真，活泼有趣' },
    ],
    math: [
      { word: '运算', pinyin: 'yùn suàn', meaning: '按一定规则进行计算' },
      { word: '估算', pinyin: 'gū suàn',  meaning: '大致估计计算结果' },
      { word: '验证', pinyin: 'yàn zhèng',meaning: '用实例来检验' },
      { word: '规律', pinyin: 'guī lǜ',   meaning: '事物内在联系和规律' },
    ],
    english: [
      { word: 'vocabulary', pinyin: '',   meaning: '词汇；词语' },
      { word: 'grammar',    pinyin: '',   meaning: '语法；文法' },
      { word: 'dialogue',   pinyin: '',   meaning: '对话；会话' },
      { word: 'expression', pinyin: '',   meaning: '表达；句型' },
    ],
  }
  return (templates[subId] || templates['chinese']).slice(0, 4)
}

function getKeyPoints(subId, lesson, mode, grade) {
  const gradeNum = parseInt(grade) || 3
  if (subId === 'chinese') {
    if (lesson.type === 'poetry') return [
      `了解作者${['杜牧','李白','苏轼','孟浩然','王维'][gradeNum%5]}的生平与创作背景`,
      '理解诗歌中的意象与情感表达',
      '掌握重点字词的读音与含义',
      '能有感情地背诵并默写全诗',
    ]
    if (lesson.type === 'fairy_tale') return [
      '能概括故事的主要情节',
      '分析主要人物的性格特点',
      '理解故事蕴含的道理',
      '能用自己的话复述故事',
    ]
    return [
      `正确认读本课${4+gradeNum}个生字，掌握笔顺`,
      '有感情地朗读课文，理解主要内容',
      '体会关键词句的含义，感受文章情感',
      '积累文中优美词句，学习写作方法',
    ]
  }
  if (subId === 'math') return [
    '理解本课核心数学概念',
    '掌握基本计算方法与步骤',
    '能运用所学解决实际问题',
    '归纳总结，形成知识体系',
  ]
  return [
    'Master key vocabulary and phrases in this lesson',
    'Practice the main sentence patterns',
    'Be able to use new expressions in context',
    'Complete reading and writing tasks',
  ]
}

function getExercises(subId, lesson) {
  if (subId === 'chinese') return [
    { q: `给"${lesson.title.slice(0,1)}"字组两个词语`, type: 'open' },
    { q: '用文中的一个词语造一个句子', type: 'open' },
    { q: '课文主要写了什么内容？（用2-3句话概括）', type: 'open' },
  ]
  if (subId === 'math') return [
    { q: '用语言描述本课学习的计算方法', type: 'open' },
    { q: '出一道本课知识点相关的题目并解答', type: 'open' },
    { q: '举一个生活中用到本课知识的例子', type: 'open' },
  ]
  return [
    { q: 'Write 3 sentences using the new vocabulary', type: 'open' },
    { q: 'Translate the key sentence patterns into Chinese', type: 'open' },
    { q: 'Answer the reading comprehension question in the textbook', type: 'open' },
  ]
}

export default function LessonView({ state, navigate }) {
  const { subject: subId, grade, semester, unitId, lessonId, mode = 'preview' } = state
  const sub   = SUBJECTS[subId]
  const curr  = CURRICULUM[subId]?.[grade]?.[semester]
  const units = curr?.units || []
  const unit  = units.find(u => u.id === unitId)
  const lesson = unit?.lessons.find(l => l.id === lessonId)
  const [notes, setNotes] = useState('')
  const [checkedPoints, setCheckedPoints] = useState(new Set())
  const [activeSection, setActiveSection] = useState(0)

  if (!sub || !lesson || !unit) return null

  const lk = getLessonKnowledge(lesson.type)
  const vocab = getVocabForLesson(subId, lesson, grade)
  const keyPoints = getKeyPoints(subId, lesson, mode, grade)
  const exercises = getExercises(subId, lesson)
  const typeLabel = LESSON_TYPES[lesson.type] || lesson.type

  // Find adjacent lessons for prev/next navigation
  const allLessons = units.flatMap(u => u.lessons.map(l => ({ ...l, unitId: u.id })))
  const currentIdx = allLessons.findIndex(l => l.id === lessonId)
  const prevLesson = allLessons[currentIdx - 1]
  const nextLesson = allLessons[currentIdx + 1]

  const togglePoint = (i) => {
    setCheckedPoints(prev => {
      const n = new Set(prev)
      n.has(i) ? n.delete(i) : n.add(i)
      return n
    })
  }

  const modeConfig = {
    preview: { label: '预习模式', color: '#6B48FF', bg: '#F0ECFF', desc: '提前了解新课内容，梳理知识框架' },
    review:  { label: '复习模式', color: sub.color, bg: sub.lightColor, desc: '巩固已学内容，查漏补缺' },
  }
  const mc = modeConfig[mode] || modeConfig['preview']

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      {/* Top bar */}
      <div style={{ background: sub.grad, padding: '0 32px', boxShadow: '0 2px 16px rgba(0,0,0,.15)', position: 'sticky', top: 0, zIndex: 100 }}>
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
          <div style={{ marginLeft: 'auto', background: mc.bg, color: mc.color, borderRadius: 20,
            padding: '4px 14px', fontSize: 12, fontWeight: 600 }}>
            {mc.label}
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
        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* Mode hint */}
          <div style={{ background: mc.bg, border: `1px solid ${mc.color}30`, borderRadius: 14,
            padding: '12px 18px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 20 }}>{mode === 'preview' ? '📖' : '🔄'}</span>
            <div>
              <span style={{ fontWeight: 600, color: mc.color, fontSize: 14 }}>{mc.label}</span>
              <span style={{ fontSize: 13, color: 'var(--ink-muted)', marginLeft: 8 }}>{mc.desc}</span>
            </div>
          </div>

          {/* Learning objectives */}
          <Card title={mode === 'preview' ? '预习目标' : '复习要点'} icon="🎯">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {keyPoints.map((pt, i) => (
                <div key={i}
                  onClick={() => togglePoint(i)}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 14px',
                    borderRadius: 10, background: checkedPoints.has(i) ? sub.lightColor : 'var(--paper)',
                    cursor: 'pointer', transition: 'background .15s', border: `1px solid ${checkedPoints.has(i) ? sub.color : 'transparent'}` }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, marginTop: 1,
                    border: `1.5px solid ${checkedPoints.has(i) ? sub.color : 'var(--ink-faint)'}`,
                    background: checkedPoints.has(i) ? sub.color : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 12 }}>
                    {checkedPoints.has(i) ? '✓' : ''}
                  </div>
                  <span style={{ fontSize: 14, lineHeight: 1.6,
                    textDecoration: checkedPoints.has(i) ? 'line-through' : 'none',
                    color: checkedPoints.has(i) ? 'var(--ink-muted)' : 'var(--ink)' }}>
                    {pt}
                  </span>
                </div>
              ))}
            </div>
            {checkedPoints.size > 0 && (
              <div style={{ marginTop: 12, fontSize: 13, color: sub.color, textAlign: 'right' }}>
                已完成 {checkedPoints.size}/{keyPoints.length} 项目标 ✓
              </div>
            )}
          </Card>

          {/* Key vocabulary */}
          <Card title={subId === 'english' ? 'Key Words & Phrases' : '重点词语'} icon="📚">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
              {vocab.map((v, i) => (
                <div key={i} style={{ background: 'var(--paper)', borderRadius: 10, padding: '12px 16px',
                  border: '1px solid var(--paper-deeper)' }}>
                  <div style={{ fontFamily: 'var(--font-disp)', fontSize: 18, color: sub.color, marginBottom: 2 }}>
                    {v.word}
                  </div>
                  {v.pinyin && (
                    <div style={{ fontSize: 12, color: 'var(--ink-muted)', fontFamily: 'var(--font-mono)', marginBottom: 4 }}>
                      {v.pinyin}
                    </div>
                  )}
                  <div style={{ fontSize: 13, color: 'var(--ink-light)', lineHeight: 1.5 }}>
                    {v.meaning}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--paper)', borderRadius: 10,
              fontSize: 13, color: 'var(--ink-muted)', borderLeft: `3px solid ${sub.color}` }}>
              提示：实际词语请对照课本 p.{lesson.pages} 学习
            </div>
          </Card>

          {/* Knowledge sections (tabs) */}
          <Card title="学习内容" icon={lk.icon}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
              {lk.sections.map((sec, i) => (
                <button key={i} onClick={() => setActiveSection(i)}
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
              <div style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 10,
                fontStyle: 'italic' }}>
                【{lk.sections[activeSection]}】
              </div>
              <SectionContent section={lk.sections[activeSection]} subId={subId}
                lesson={lesson} sub={sub} grade={grade} />
            </div>
          </Card>

          {/* Preview exercises */}
          <Card title={mode === 'preview' ? '预习思考题' : '复习练习'} icon="✏️">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {exercises.map((ex, i) => (
                <div key={i}>
                  <div style={{ fontSize: 14, fontFamily: 'var(--font-serif)', color: 'var(--ink)',
                    marginBottom: 8, lineHeight: 1.7 }}>
                    {i + 1}. {ex.q}
                  </div>
                  <textarea placeholder="在此写下你的答案或思考…"
                    style={{ width: '100%', minHeight: 72, border: '1.5px solid var(--paper-deeper)',
                      borderRadius: 10, padding: '10px 14px', fontSize: 14,
                      fontFamily: 'var(--font-serif)', color: 'var(--ink)', background: 'var(--white)',
                      outline: 'none', resize: 'vertical', lineHeight: 1.8,
                      transition: 'border-color .15s' }}
                    onFocus={e => e.target.style.borderColor = sub.color}
                    onBlur={e => e.target.style.borderColor = 'var(--paper-deeper)'}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Notes */}
          <Card title="我的笔记" icon="📓">
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder={mode === 'preview'
                ? '记录预习中的疑问、重点词语、初步理解…'
                : '总结复习要点，记录易错知识，写下学习心得…'}
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

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <button
              onClick={() => navigate({ screen: 'test-config', testConfig: { scope: 'lesson', unitId, lessonId } })}
              style={{ flex: 1, background: sub.grad, color: '#fff', border: 'none', borderRadius: 12,
                padding: '13px', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'var(--font-body)', boxShadow: `0 4px 16px ${sub.color}44` }}>
              {mode === 'preview' ? '预习完成，开始测试 →' : '复习完成，开始测试 →'}
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

        {/* Right sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Progress */}
            <div style={{ background: 'var(--white)', borderRadius: 16, padding: '16px',
              border: '1px solid var(--paper-dark)', boxShadow: 'var(--sh-xs)' }}>
              <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginBottom: 10, fontWeight: 600 }}>
                目标完成度
              </div>
              <div style={{ fontSize: 28, fontFamily: 'var(--font-en)', color: sub.color, lineHeight: 1 }}>
                {Math.round((checkedPoints.size / keyPoints.length) * 100)}%
              </div>
              <div style={{ height: 5, background: 'var(--paper-dark)', borderRadius: 3, marginTop: 8 }}>
                <div style={{ height: '100%', width: `${(checkedPoints.size / keyPoints.length) * 100}%`,
                  background: sub.color, borderRadius: 3, transition: 'width .4s' }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-faint)', marginTop: 6 }}>
                点击目标项打勾确认
              </div>
            </div>

            {/* Unit lessons list */}
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
                    marginBottom: 2, display: 'flex', alignItems: 'center', gap: 8,
                    transition: 'background .15s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, flexShrink: 0,
                    background: l.done ? sub.color : 'var(--paper-dark)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, color: l.done ? '#fff' : 'var(--ink-faint)' }}>
                    {l.done ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: 12, color: l.id === lessonId ? sub.darkColor : 'var(--ink-muted)',
                    lineHeight: 1.4, fontWeight: l.id === lessonId ? 600 : 400 }}>
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
      <div style={{ padding: '16px 20px' }}>
        {children}
      </div>
    </div>
  )
}

function SectionContent({ section, subId, lesson, sub, grade }) {
  const cnContents = {
    '生字词学习': `本课需要掌握的生字词，请打开课本第 ${lesson.pages} 页，结合课文语境理解每个词的含义。\n\n学习方法：先认读生字，注意笔顺和部首；再结合上下文理解词义；最后通过组词、造句加深记忆。`,
    '课文朗读': `朗读要求：读准字音、读通句子、读出感情。\n\n1. 默读课文，初步了解内容\n2. 标注不理解的词句\n3. 有感情地朗读，注意语气变化\n4. 尝试背诵精彩段落`,
    '段落分析': `阅读方法：理清文章结构，概括各段大意。\n\n• 第一遍：整体感知，了解主要内容\n• 第二遍：圈画关键词句，理解层次\n• 第三遍：品味语言，感受表达特色`,
    '主题感悟': `思考：这篇课文表达了怎样的思想感情？\n\n从以下角度思考：\n1. 文章写了什么内容？\n2. 作者想表达什么情感？\n3. 你从中受到什么启发？`,
    '诗句注释': `理解诗句时，注意：\n1. 逐字理解，结合注释\n2. 把握整句含义\n3. 感受诗歌意境\n4. 思考诗人情感`,
    '意境理解': `体会诗歌意境：\n• 诗中描绘了哪些景物？\n• 这些景物组成了怎样的画面？\n• 诗人借景抒发了什么情感？`,
    '背诵默写': `背诵步骤：\n1. 理解后记忆（不要死记硬背）\n2. 分句背诵，再连贯背诵\n3. 闭眼回想，练习默写\n4. 检查书写是否正确`,
    '知识要点': `本课核心知识点：\n• 掌握基本概念和定义\n• 理解知识点之间的联系\n• 能够举例说明\n• 对照教材 p.${lesson.pages} 整理笔记`,
    '例题讲解': `解题步骤：\n1. 读清题意，找关键信息\n2. 选择合适的方法\n3. 列式计算，写清步骤\n4. 检验结果是否合理`,
    '方法归纳': `学习方法总结：\n• 找规律：发现数学规律\n• 类比法：与已学知识对比\n• 验证法：用不同方式检验\n• 举例法：举具体例子理解`,
    '作者介绍': `了解作者背景有助于理解课文。请通过课本注释、工具书或参考资料了解：\n• 作者生活的时代背景\n• 作者的主要作品\n• 这首诗/文章的写作背景`,
    '字形结构': `汉字结构分析：\n• 独体字：笔画构成的整体\n• 合体字：由多个部件组成\n• 注意偏旁部首的含义\n• 掌握正确的笔顺`,
  }

  const enContents = {
    'Master key vocabulary': `Review new words from p.${lesson.pages}:\n• Read each word aloud several times\n• Look up meanings and write them down\n• Make sentences with new words\n• Use flashcards for memorization`,
    'Practice sentence patterns': `Key sentence structures:\n• Read the model sentences carefully\n• Practice with substitution drills\n• Create your own sentences\n• Use in real conversations`,
  }

  const content = cnContents[section]
    || Object.entries(enContents).find(([k]) => section.includes(k))?.[1]
    || `关于「${section}」的学习内容，请结合课本第 ${lesson.pages} 页认真学习。\n\n学习建议：仔细阅读课本内容，做好笔记，有疑问及时记录下来。`

  return (
    <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 2, whiteSpace: 'pre-line',
      fontFamily: 'var(--font-serif)' }}>
      {content}
    </div>
  )
}

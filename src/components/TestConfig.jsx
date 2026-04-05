import { useState } from 'react'
import { SUBJECTS, CURRICULUM, TEST_TYPES, QUESTIONS, QUESTION_BANK } from '../data/content'

export default function TestConfig({ state, navigate }) {
  const { subject: subId, grade, semester, testConfig: initConfig } = state
  const sub   = SUBJECTS[subId]
  const curr  = CURRICULUM[subId]?.[grade]?.[semester]
  const units = curr?.units || []

  const [scope,      setScope]      = useState(initConfig?.scope || 'unit')
  const [unitId,     setUnitId]     = useState(initConfig?.unitId || units[0]?.id)
  const [lessonId,   setLessonId]   = useState(initConfig?.lessonId || units[0]?.lessons[0]?.id)
  const [qTypes,     setQTypes]     = useState([])
  const [difficulty, setDifficulty] = useState('mixed')
  const [qCount,     setQCount]     = useState(10)

  if (!sub) return null

  const selectedUnit = units.find(u=>u.id===unitId)
  const allQTypes    = sub.questionTypes

  const toggleQType = id => setQTypes(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev,id])

  const buildTest = () => {
    // Use grade-specific bank first, fall back to legacy pool
    const gradePool = QUESTION_BANK[subId]?.[grade] || []
    const legacyPool = QUESTIONS[subId] || []
    const pool = gradePool.length ? gradePool : legacyPool
    let questions = []

    if (scope === 'custom' && qTypes.length) {
      questions = pool.filter(q => qTypes.includes(q.type))
    } else {
      questions = [...pool]
    }

    if (difficulty !== 'mixed') {
      const d = {easy:1, medium:2, hard:3}[difficulty]
      questions = questions.filter(q => q.difficulty === d)
    }
    if (!questions.length) questions = [...pool]
    // shuffle
    questions = questions.sort(() => Math.random() - 0.5).slice(0, qCount)
    if (questions.length < qCount) {
      // pad from legacy pool to reach count
      const extra = [...legacyPool].sort(()=>Math.random()-.5).filter(q=>!questions.find(x=>x.id===q.id))
      questions = [...questions, ...extra].slice(0, qCount)
    }

    const scopeType = TEST_TYPES.find(t=>t.id===scope)
    const timeLimit = scopeType?.time || 40

    navigate({
      screen: 'test',
      testData: {
        title: buildTitle(scope, selectedUnit, grade),
        subject: subId,
        scope, questions,
        timeLimit: timeLimit * 60,
        config: { scope, unitId, lessonId, qTypes, difficulty, qCount }
      }
    })
  }

  function buildTitle(scope, unit, grade) {
    const map = { lesson:`${unit?.lessons?.find(l=>l.id===lessonId)?.title || ''} 专项练习`,
      unit:`${unit?.title} 单元测试`, midterm:`${grade} 上学期 期中测试`, final:`${grade} 上学期 期末测试`,
      custom:'自定义专项训练' }
    return map[scope] || '综合测试'
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--paper)' }}>
      {/* Header */}
      <div style={{ background:sub.grad, padding:'16px 40px 0', boxShadow:'0 2px 16px rgba(0,0,0,.15)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, paddingBottom:14 }}>
          <button onClick={()=>navigate({screen:'subject'})}
            style={{ background:'rgba(255,255,255,.18)', border:'none', borderRadius:8,
              padding:'5px 12px', color:'rgba(255,255,255,.85)', fontSize:13, cursor:'pointer' }}>
            ← {sub.name}
          </button>
          <span style={{ color:'rgba(255,255,255,.5)' }}>/</span>
          <span style={{ color:'#fff', fontSize:14, fontWeight:600 }}>配置测试</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth:720, margin:'0 auto', padding:'36px 32px 80px' }}>
        <h2 style={{ fontFamily:'var(--font-disp)', fontSize:26, color:'var(--ink)', marginBottom:6, fontWeight:400 }}>
          配置测试
        </h2>
        <p style={{ color:'var(--ink-muted)', fontSize:14, marginBottom:32 }}>
          {sub.name} · {grade} · {semester}
        </p>

        {/* Step 1: Scope */}
        <Section num={1} title="选择测试范围">
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12 }}>
            {TEST_TYPES.map(t=>(
              <ScopeCard key={t.id} type={t} selected={scope===t.id} onClick={()=>setScope(t.id)} sub={sub} />
            ))}
          </div>
        </Section>

        {/* Step 2: Scope-specific selector */}
        {(scope==='lesson' || scope==='unit') && (
          <Section num={2} title={scope==='lesson' ? '选择课文' : '选择单元'}>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {units.map(unit=>(
                <div key={unit.id}>
                  <div
                    onClick={()=>{ setUnitId(unit.id); if(scope==='lesson') setLessonId(unit.lessons[0]?.id) }}
                    style={{ padding:'12px 16px', borderRadius:10,
                      border:`1.5px solid ${unitId===unit.id && scope==='unit' ? sub.color : 'var(--paper-dark)'}`,
                      background: unitId===unit.id ? sub.lightColor : 'var(--white)',
                      cursor:'pointer', display:'flex', alignItems:'center', gap:12, transition:'all .15s' }}>
                    <div style={{ width:28, height:28, borderRadius:7,
                      background: unitId===unit.id ? sub.color : 'var(--paper-dark)',
                      color: unitId===unit.id ? '#fff' : 'var(--ink-muted)',
                      display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:600 }}>
                      {units.indexOf(unit)+1}
                    </div>
                    <div style={{ flex:1 }}>
                      <span style={{ fontSize:14, fontWeight:500, color:'var(--ink)' }}>{unit.title}</span>
                      <span style={{ marginLeft:8, fontSize:13, color:'var(--ink-muted)' }}>{unit.theme}</span>
                    </div>
                    <span style={{ fontSize:12, color:'var(--ink-faint)' }}>{unit.lessons.length} 课</span>
                  </div>
                  {scope==='lesson' && unitId===unit.id && (
                    <div style={{ marginLeft:20, marginTop:4, display:'flex', flexDirection:'column', gap:4 }}>
                      {unit.lessons.map(l=>(
                        <div key={l.id} onClick={()=>setLessonId(l.id)}
                          style={{ padding:'9px 14px', borderRadius:8,
                            border:`1.5px solid ${lessonId===l.id ? sub.color : 'var(--paper-dark)'}`,
                            background: lessonId===l.id ? sub.lightColor : 'var(--white)',
                            cursor:'pointer', fontSize:13, color:'var(--ink)', transition:'all .15s',
                            display:'flex', alignItems:'center', gap:8 }}>
                          <span style={{ width:20, height:20, borderRadius:5,
                            background: lessonId===l.id ? sub.color : 'transparent',
                            border:`1px solid ${lessonId===l.id ? sub.color : 'var(--ink-faint)'}`,
                            display:'flex', alignItems:'center', justifyContent:'center', fontSize:10,
                            color: lessonId===l.id ? '#fff':'var(--ink-faint)', flexShrink:0 }}>
                            {lessonId===l.id?'✓':''}
                          </span>
                          {l.title}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Step 3: Question types */}
        <Section num={scope==='lesson'||scope==='unit'?3:2} title="按题型筛选（可多选，不选则全部题型）">
          <div style={{ display:'flex', flexWrap:'wrap', gap:10 }}>
            {allQTypes.map(qt=>{
              const sel = qTypes.includes(qt.id)
              return (
                <button key={qt.id} onClick={()=>toggleQType(qt.id)}
                  style={{ padding:'8px 18px', borderRadius:'var(--r-full)',
                    border:`1.5px solid ${sel ? sub.color : 'var(--paper-deeper)'}`,
                    background: sel ? sub.color : 'var(--white)',
                    color: sel ? '#fff' : 'var(--ink-light)',
                    fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)', transition:'all .15s',
                    display:'flex', alignItems:'center', gap:6 }}>
                  <span style={{ fontSize:12, fontFamily:'var(--font-mono)' }}>{qt.icon}</span>
                  {qt.name}
                </button>
              )
            })}
          </div>
        </Section>

        {/* Step 4: Difficulty and count */}
        <Section num={scope==='lesson'||scope==='unit'?4:3} title="题目设置">
          <div style={{ display:'flex', gap:24, flexWrap:'wrap' }}>
            <div>
              <div style={{ fontSize:13, color:'var(--ink-muted)', marginBottom:8 }}>难度</div>
              <div style={{ display:'flex', gap:8 }}>
                {[{id:'easy',label:'基础',icon:'🌱'},{id:'medium',label:'提高',icon:'🔥'},{id:'hard',label:'拔高',icon:'⭐'},{id:'mixed',label:'综合',icon:'🎯'}].map(d=>(
                  <button key={d.id} onClick={()=>setDifficulty(d.id)}
                    style={{ padding:'7px 14px', borderRadius:9,
                      border:`1.5px solid ${difficulty===d.id ? sub.color : 'var(--paper-deeper)'}`,
                      background: difficulty===d.id ? sub.lightColor : 'var(--white)',
                      color: difficulty===d.id ? sub.darkColor : 'var(--ink-light)',
                      fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)',
                      display:'flex', alignItems:'center', gap:5 }}>
                    {d.icon} {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize:13, color:'var(--ink-muted)', marginBottom:8 }}>题目数量</div>
              <div style={{ display:'flex', gap:8 }}>
                {[5,10,15,20].map(n=>(
                  <button key={n} onClick={()=>setQCount(n)}
                    style={{ width:50, height:38, borderRadius:9,
                      border:`1.5px solid ${qCount===n ? sub.color : 'var(--paper-deeper)'}`,
                      background: qCount===n ? sub.color : 'var(--white)',
                      color: qCount===n ? '#fff' : 'var(--ink-light)',
                      fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-mono)' }}>
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Start button */}
        <div style={{ marginTop:40, display:'flex', gap:14 }}>
          <button onClick={buildTest}
            style={{ flex:1, background:sub.grad, color:'#fff', border:'none', borderRadius:14,
              padding:'16px 32px', fontSize:16, fontWeight:600, cursor:'pointer',
              boxShadow:`0 4px 20px ${sub.color}55`, fontFamily:'var(--font-body)',
              transition:'all .2s' }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 28px ${sub.color}66`}}
            onMouseLeave={e=>{e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=`0 4px 20px ${sub.color}55`}}>
            开始测试 →
          </button>
          <button onClick={()=>navigate({screen:'print', testConfig:{scope,unitId,lessonId}})}
            style={{ background:'var(--white)', color:'var(--ink-light)', border:'1px solid var(--paper-deeper)',
              borderRadius:14, padding:'16px 24px', fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)',
              display:'flex', alignItems:'center', gap:8 }}>
            🖨️ 生成试卷
          </button>
        </div>
      </div>
    </div>
  )
}

function Section({ num, title, children }) {
  return (
    <div style={{ marginBottom:30 }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
        <div style={{ width:24, height:24, borderRadius:7, background:'var(--ink)', color:'var(--white)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>
          {num}
        </div>
        <span style={{ fontFamily:'var(--font-serif)', fontSize:15, fontWeight:600, color:'var(--ink)' }}>{title}</span>
      </div>
      {children}
    </div>
  )
}

function ScopeCard({ type, selected, onClick, sub }) {
  return (
    <div onClick={onClick}
      style={{ background: selected ? sub.lightColor : 'var(--white)',
        border:`1.5px solid ${selected ? sub.color : 'var(--paper-dark)'}`,
        borderRadius:14, padding:'14px 16px', cursor:'pointer', transition:'all .18s',
        boxShadow: selected ? `0 4px 16px ${sub.color}30` : 'var(--sh-xs)' }}>
      <div style={{ fontSize:22, marginBottom:6 }}>{type.icon}</div>
      <div style={{ fontWeight:600, fontSize:14, color: selected ? sub.darkColor : 'var(--ink)', marginBottom:3 }}>
        {type.name}
      </div>
      <div style={{ fontSize:12, color:'var(--ink-muted)', lineHeight:1.4 }}>{type.desc}</div>
      <div style={{ marginTop:8, fontSize:11, color:'var(--ink-faint)' }}>约 {type.time} 分钟</div>
    </div>
  )
}

import { useState } from 'react'
import { SUBJECTS, CURRICULUM, LESSON_TYPES } from '../data/content'

const MODES = [
  { id:'preview', label:'预习模式', icon:'📖', desc:'提前预习新课内容，梳理知识框架' },
  { id:'review',  label:'复习模式', icon:'🔄', desc:'巩固已学内容，查漏补缺' },
  { id:'test',    label:'测试模式', icon:'✏️', desc:'配置并开始练习测试' },
]

export default function SubjectHome({ state, navigate }) {
  const { subject: subId, grade, semester, mode: initMode } = state
  const sub   = SUBJECTS[subId]
  const curr  = CURRICULUM[subId]?.[grade]?.[semester]
  const units = curr?.units || []
  const [activeMode, setActiveMode] = useState(initMode || 'preview')
  const [expanded, setExpanded]     = useState(units[0]?.id)

  if (!sub) return null

  const totalLessons = units.reduce((a,u)=>a+u.lessons.length, 0)
  const doneLessons  = units.reduce((a,u)=>a+u.lessons.filter(l=>l.done).length, 0)
  const overallPct   = Math.round((doneLessons/totalLessons)*100)||0

  const handleLessonClick = (unit, lesson) => {
    if (activeMode === 'test') {
      navigate({ screen:'test-config', testConfig:{ scope:'lesson', unitId:unit.id, lessonId:lesson.id }})
    } else {
      navigate({ screen:'lesson-view', unitId:unit.id, lessonId:lesson.id })
    }
  }

  const handleUnitTest = (unit) => {
    navigate({ screen:'test-config', testConfig:{ scope:'unit', unitId:unit.id }})
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--paper)', display:'flex', flexDirection:'column' }}>
      {/* Top bar */}
      <div style={{
        background: sub.grad, padding:'0 40px', position:'sticky', top:0, zIndex:100,
        boxShadow:'0 2px 16px rgba(0,0,0,.18)'
      }}>
        {/* Nav */}
        <div style={{ display:'flex', alignItems:'center', gap:8, paddingTop:16, paddingBottom:10 }}>
          <button onClick={()=>navigate({screen:'dashboard'})}
            style={{ background:'rgba(255,255,255,.18)', border:'none', borderRadius:8, padding:'5px 12px',
              color:'rgba(255,255,255,.85)', fontSize:13, cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
            ← 首页
          </button>
          <span style={{ color:'rgba(255,255,255,.5)', fontSize:13 }}>/</span>
          <span style={{ color:'rgba(255,255,255,.9)', fontSize:13 }}>{grade} · {semester}</span>
          <span style={{ color:'rgba(255,255,255,.5)', fontSize:13 }}>/</span>
          <span style={{ color:'#fff', fontWeight:600, fontSize:13 }}>{sub.name}</span>
        </div>

        {/* Subject header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          paddingBottom:20, gap:24 }}>
          <div style={{ display:'flex', alignItems:'center', gap:16 }}>
            <div style={{ fontFamily:'var(--font-disp)', fontSize:48, color:'rgba(255,255,255,.25)',
              lineHeight:1, userSelect:'none' }}>{sub.char}</div>
            <div>
              <div style={{ fontFamily:'var(--font-disp)', fontSize:28, color:'#fff' }}>{sub.name}</div>
              <div style={{ fontSize:13, color:'rgba(255,255,255,.75)', marginTop:3 }}>
                {sub.edition} · {grade} {semester} · {doneLessons}/{totalLessons} 课已完成
              </div>
            </div>
          </div>
          {/* Progress ring */}
          <ProgressRing pct={overallPct} color='rgba(255,255,255,.9)' />
        </div>

        {/* Mode tabs */}
        <div style={{ display:'flex', gap:4, borderTop:'1px solid rgba(255,255,255,.15)', paddingTop:2 }}>
          {MODES.map(m=>(
            <button key={m.id}
              onClick={()=>setActiveMode(m.id)}
              style={{
                background: activeMode===m.id ? 'rgba(255,255,255,.22)' : 'transparent',
                border:'none', borderBottom: activeMode===m.id ? '2px solid #fff' : '2px solid transparent',
                color: activeMode===m.id ? '#fff' : 'rgba(255,255,255,.65)',
                padding:'12px 20px', fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)',
                display:'flex', alignItems:'center', gap:7, transition:'all .18s'
              }}>
              <span>{m.icon}</span> {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mode description */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--paper-dark)',
        padding:'12px 40px', display:'flex', alignItems:'center', gap:12 }}>
        <span style={{ fontSize:18 }}>{MODES.find(m=>m.id===activeMode)?.icon}</span>
        <span style={{ fontSize:14, color:'var(--ink-muted)' }}>
          {MODES.find(m=>m.id===activeMode)?.desc}
        </span>
        {activeMode === 'test' && (
          <div style={{ marginLeft:'auto', display:'flex', gap:8 }}>
            {[{label:'期中测试', scope:'midterm'},{label:'期末测试', scope:'final'}].map(({label,scope})=>(
              <button key={scope}
                onClick={()=>navigate({screen:'test-config', testConfig:{scope}})}
                style={{ background:sub.color, color:'#fff', border:'none', borderRadius:8,
                  padding:'7px 16px', fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)' }}>
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Units list */}
      <div style={{ flex:1, maxWidth:800, margin:'0 auto', width:'100%', padding:'24px 32px 60px' }}>
        {units.map((unit, ui) => (
          <UnitBlock key={unit.id} unit={unit} unitIndex={ui}
            expanded={expanded===unit.id}
            onToggle={()=>setExpanded(expanded===unit.id ? null : unit.id)}
            onLessonClick={(l)=>handleLessonClick(unit,l)}
            onUnitTest={()=>handleUnitTest(unit)}
            sub={sub}
            mode={activeMode}
            delay={ui*60}
          />
        ))}
      </div>
    </div>
  )
}

function UnitBlock({ unit, unitIndex, expanded, onToggle, onLessonClick, onUnitTest, sub, mode, delay }) {
  const doneLessons = unit.lessons.filter(l=>l.done).length
  const total = unit.lessons.length

  return (
    <div style={{ marginBottom:16, borderRadius:18, overflow:'hidden',
      border:'1px solid var(--paper-dark)', boxShadow:'var(--sh-xs)',
      animation:`fadeUp .4s var(--ease-out) ${delay}ms both` }}>
      {/* Unit header */}
      <div
        onClick={onToggle}
        style={{ background:'var(--white)', padding:'18px 22px', cursor:'pointer',
          display:'flex', alignItems:'center', gap:16, transition:'background .15s',
          ':hover': { background:'var(--paper)' } }}>
        <div style={{ width:40, height:40, borderRadius:10, background:sub.lightColor,
          display:'flex', alignItems:'center', justifyContent:'center',
          fontFamily:'var(--font-serif)', fontSize:13, color:sub.color, fontWeight:600, flexShrink:0 }}>
          {unitIndex+1}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ display:'flex', alignItems:'baseline', gap:10 }}>
            <span style={{ fontFamily:'var(--font-serif)', fontSize:16, fontWeight:600, color:'var(--ink)' }}>
              {unit.title}
            </span>
            <span style={{ fontSize:13, color:'var(--ink-muted)' }}>
              {unit.theme}
            </span>
          </div>
          <div style={{ display:'flex', gap:8, marginTop:5, flexWrap:'wrap' }}>
            {unit.keySkills.map(s=>(
              <span key={s} style={{ fontSize:11, background:sub.lightColor, color:sub.darkColor,
                borderRadius:4, padding:'2px 8px' }}>{s}</span>
            ))}
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ textAlign:'right' }}>
            <div style={{ fontSize:13, fontWeight:600, color: doneLessons===total?'var(--success)':'var(--ink)' }}>
              {doneLessons}/{total}
            </div>
            <div style={{ fontSize:11, color:'var(--ink-muted)' }}>已完成</div>
          </div>
          {mode==='test' && (
            <button onClick={e=>{e.stopPropagation(); onUnitTest()}}
              style={{ background:sub.color, color:'#fff', border:'none', borderRadius:8,
                padding:'6px 14px', fontSize:13, cursor:'pointer', flexShrink:0 }}>
              单元测试
            </button>
          )}
          <span style={{ color:'var(--ink-faint)', transform: expanded?'rotate(90deg)':'rotate(0)',
            transition:'transform .2s', display:'inline-block', fontSize:16 }}>›</span>
        </div>
      </div>

      {/* Lessons */}
      {expanded && (
        <div style={{ borderTop:'1px solid var(--paper-dark)', background:'var(--paper)' }}>
          {unit.lessons.map((lesson, li)=>(
            <LessonRow key={lesson.id} lesson={lesson} lessonIndex={li}
              sub={sub} mode={mode} onClick={()=>onLessonClick(lesson)} />
          ))}
          <div style={{ padding:'12px 22px', borderTop:'1px solid var(--paper-dark)',
            background:'var(--white)', display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontSize:13, color:'var(--ink-muted)' }}>复习材料：</span>
            <span style={{ fontSize:13, color:sub.color, fontWeight:500 }}>{unit.review}</span>
          </div>
        </div>
      )}
    </div>
  )
}

function LessonRow({ lesson, lessonIndex, sub, mode, onClick }) {
  const [hov, setHov] = useState(false)
  const typeLabel = LESSON_TYPES[lesson.type] || lesson.type

  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{ display:'flex', alignItems:'center', gap:14, padding:'13px 22px',
        borderBottom:'1px solid var(--paper-dark)', cursor:'pointer',
        background: hov ? 'var(--white)' : 'transparent', transition:'background .15s' }}>
      <div style={{ width:26, height:26, borderRadius:7, border:`1.5px solid ${lesson.done ? sub.color : 'var(--ink-faint)'}`,
        background: lesson.done ? sub.color : 'transparent',
        display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, fontSize:11,
        color: lesson.done ? '#fff' : 'var(--ink-faint)' }}>
        {lesson.done ? '✓' : lessonIndex+1}
      </div>
      <div style={{ flex:1 }}>
        <span style={{ fontSize:14, color:'var(--ink)', fontWeight: hov?500:400 }}>{lesson.title}</span>
        <span style={{ marginLeft:10, fontSize:11, background:'var(--paper-dark)', color:'var(--ink-muted)',
          borderRadius:4, padding:'1px 6px' }}>{typeLabel}</span>
        <span style={{ marginLeft:6, fontSize:11, color:'var(--ink-faint)' }}>p.{lesson.pages}</span>
      </div>
      {hov && (
        <span style={{ fontSize:13, color:sub.color, fontWeight:500 }}>
          {mode==='preview' ? '开始预习 →' : mode==='review' ? '开始复习 →' : '按课测试 →'}
        </span>
      )}
    </div>
  )
}

function ProgressRing({ pct, color }) {
  const r = 28, circ = 2*Math.PI*r
  const offset = circ - (pct/100)*circ
  return (
    <div style={{ position:'relative', width:72, height:72, flexShrink:0 }}>
      <svg width="72" height="72" style={{ transform:'rotate(-90deg)' }}>
        <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="4"/>
        <circle cx="36" cy="36" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:'stroke-dashoffset .8s var(--ease-out)' }} />
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontFamily:'var(--font-en)', fontSize:17, color, lineHeight:1 }}>{pct}</span>
        <span style={{ fontSize:10, color:'rgba(255,255,255,.7)', lineHeight:1, marginTop:2 }}>%</span>
      </div>
    </div>
  )
}

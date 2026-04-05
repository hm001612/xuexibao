import { useState } from 'react'
import { SUBJECTS, GRADES, SEMESTERS, CURRICULUM } from '../data/content'

const S = {
  wrap: { minHeight:'100vh', background:'var(--paper)', position:'relative', overflow:'hidden' },
  decor1: { position:'fixed', top:-120, right:-120, width:400, height:400, borderRadius:'50%',
    background:'radial-gradient(circle,rgba(192,55,42,.08) 0%,transparent 70%)', pointerEvents:'none' },
  decor2: { position:'fixed', bottom:-80, left:-80, width:320, height:320, borderRadius:'50%',
    background:'radial-gradient(circle,rgba(27,77,150,.07) 0%,transparent 70%)', pointerEvents:'none' },
  decor3: { position:'fixed', top:'40%', left:'48%', width:500, height:500, borderRadius:'50%',
    background:'radial-gradient(circle,rgba(200,135,10,.04) 0%,transparent 65%)', pointerEvents:'none', transform:'translate(-50%,-50%)' },

  header: { display:'flex', alignItems:'center', justifyContent:'space-between',
    padding:'20px 40px 16px', borderBottom:'1px solid var(--paper-deeper)', background:'rgba(246,241,233,.85)',
    backdropFilter:'blur(10px)', position:'sticky', top:0, zIndex:100 },
  logo: { display:'flex', alignItems:'center', gap:12 },
  logoBox: { width:44, height:44, borderRadius:12, background:'linear-gradient(145deg,#C0372A,#E84A3C)',
    display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 12px rgba(192,55,42,.35)' },
  logoChar: { fontFamily:'var(--font-disp)', fontSize:22, color:'#fff', lineHeight:1 },
  logoTexts: { display:'flex', flexDirection:'column' },
  appName: { fontFamily:'var(--font-disp)', fontSize:20, color:'var(--ink)', fontWeight:400, lineHeight:1.2 },
  appSub:  { fontSize:11, color:'var(--ink-muted)', letterSpacing:'.5px' },

  selectors: { display:'flex', gap:10, alignItems:'center' },
  select: { appearance:'none', border:'1px solid var(--paper-deeper)', borderRadius:10,
    padding:'7px 32px 7px 14px', fontSize:14, color:'var(--ink)', background:'var(--white)',
    cursor:'pointer', outline:'none', backgroundImage:'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2378716C\' stroke-width=\'2\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'/%3E%3C/svg%3E")',
    backgroundRepeat:'no-repeat', backgroundPosition:'right 10px center',
    boxShadow:'var(--sh-xs)', transition:'box-shadow .2s, border-color .2s', fontFamily:'var(--font-body)' },

  content: { maxWidth:1100, margin:'0 auto', padding:'40px 32px 60px' },
  heroArea: { marginBottom:40 },
  heroTitle: { fontFamily:'var(--font-disp)', fontSize:32, color:'var(--ink)', fontWeight:400, lineHeight:1.3 },
  heroSub: { fontSize:15, color:'var(--ink-muted)', marginTop:6 },

  statsRow: { display:'flex', gap:16, marginTop:20 },
  statPill: { background:'var(--white)', border:'1px solid var(--paper-deeper)', borderRadius:'var(--r-full)',
    padding:'7px 18px', fontSize:13, color:'var(--ink-light)', display:'flex', alignItems:'center', gap:6,
    boxShadow:'var(--sh-xs)' },
  statDot: (c) => ({ width:8, height:8, borderRadius:'50%', background:c }),

  grid: { display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:24, marginBottom:40 },

  card: (color, light) => ({
    background:'var(--white)', border:'1px solid var(--paper-dark)', borderRadius:22,
    overflow:'hidden', cursor:'pointer', transition:'transform .28s var(--ease-out), box-shadow .28s var(--ease-out)',
    boxShadow:'var(--sh-sm)', position:'relative',
  }),
  cardTop: (grad) => ({ background:grad, padding:'28px 28px 24px', position:'relative', overflow:'hidden' }),
  cardChar: { fontFamily:'var(--font-disp)', fontSize:56, color:'rgba(255,255,255,.18)',
    position:'absolute', top:8, right:16, lineHeight:1, userSelect:'none' },
  cardCharEn: { fontFamily:'var(--font-en)', fontSize:48, fontStyle:'italic', color:'rgba(255,255,255,.18)',
    position:'absolute', top:12, right:14, lineHeight:1, userSelect:'none' },
  subjectName: { fontFamily:'var(--font-disp)', fontSize:26, color:'#fff', fontWeight:400 },
  editionTag: { display:'inline-block', background:'rgba(255,255,255,.22)', color:'rgba(255,255,255,.9)',
    borderRadius:6, padding:'3px 10px', fontSize:12, marginTop:8 },
  subjectDesc: { fontSize:12, color:'rgba(255,255,255,.75)', marginTop:6 },

  cardBody: { padding:'20px 24px 24px' },
  progressRow: { marginBottom:16 },
  progressLabel: { display:'flex', justifyContent:'space-between', fontSize:12, color:'var(--ink-muted)', marginBottom:6 },
  progressBar: { height:6, background:'var(--paper-dark)', borderRadius:3, overflow:'hidden' },
  progressFill: (p, c) => ({ height:'100%', width:`${p}%`, background:c, borderRadius:3,
    transition:'width .8s var(--ease-out)' }),

  modeRow: { display:'flex', gap:8 },
  modeBtn: (color) => ({ flex:1, padding:'9px 6px', borderRadius:10, fontSize:13, fontWeight:500,
    background:'transparent', border:`1.5px solid ${color}`, color:color,
    cursor:'pointer', transition:'all .18s', fontFamily:'var(--font-body)' }),

  quickSection: {},
  sectionTitle: { fontFamily:'var(--font-serif)', fontSize:15, color:'var(--ink-muted)', marginBottom:16,
    fontWeight:400, letterSpacing:'.5px' },
  quickGrid: { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:14 },
  quickCard: { background:'var(--white)', border:'1px solid var(--paper-dark)', borderRadius:16,
    padding:'18px 16px', cursor:'pointer', transition:'all .2s', boxShadow:'var(--sh-xs)',
    display:'flex', flexDirection:'column', alignItems:'flex-start', gap:8 },
  quickIcon: { fontSize:22 },
  quickTitle: { fontFamily:'var(--font-serif)', fontSize:14, color:'var(--ink)', fontWeight:600 },
  quickDesc: { fontSize:12, color:'var(--ink-muted)' },
}

function computeOverall(subjectId, grade, semester) {
  const data = CURRICULUM[subjectId]?.[grade]?.[semester]
  if (!data) return { done:0, total:0, pct:0 }
  const units = data.units
  const total = units.reduce((a,u)=>a+u.lessons.length, 0)
  const done  = units.reduce((a,u)=>a+u.lessons.filter(l=>l.done).length, 0)
  return { done, total, pct: Math.round((done/total)*100)||0 }
}

export default function Dashboard({ state, navigate }) {
  const { grade, semester } = state
  const subjectList = Object.values(SUBJECTS)

  return (
    <div style={S.wrap}>
      <div style={S.decor1} /><div style={S.decor2} /><div style={S.decor3} />

      {/* Header */}
      <header style={S.header}>
        <div style={S.logo}>
          <div style={S.logoBox}><span style={S.logoChar}>学</span></div>
          <div style={S.logoTexts}>
            <span style={S.appName}>学习宝</span>
            <span style={S.appSub}>小学智能教辅平台</span>
          </div>
        </div>
        <div style={S.selectors}>
          {[{label:'年级', key:'grade', opts:GRADES},{label:'学期', key:'semester', opts:SEMESTERS}].map(({label,key,opts})=>(
            <select key={key} style={S.select} value={state[key]}
              onChange={e=>navigate({[key]:e.target.value})}>
              {opts.map(o=><option key={o}>{o}</option>)}
            </select>
          ))}
        </div>
      </header>

      <div style={S.content}>
        {/* Hero */}
        <div style={{...S.heroArea}} className="fade-up">
          <h1 style={S.heroTitle}>{grade} · {semester}</h1>
          <p style={S.heroSub}>语文 / 数学 / 英语 — 选择科目，开始今天的学习</p>
          <div style={S.statsRow}>
            {subjectList.map(sub=>{
              const {done,total} = computeOverall(sub.id, grade, semester)
              return (
                <div key={sub.id} style={S.statPill}>
                  <span style={S.statDot(sub.color)} />
                  <span>{sub.name}</span>
                  <strong style={{color:'var(--ink)'}}>{done}/{total}</strong>
                  <span style={{color:'var(--ink-faint)'}}>课</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Subject Cards */}
        <div style={S.grid}>
          {subjectList.map((sub,i)=>(
            <SubjectCard key={sub.id} subject={sub} grade={grade} semester={semester}
              delay={i*100}
              onMode={(mode)=>navigate({ screen:'subject', subject:sub.id, mode })}
            />
          ))}
        </div>

        {/* Quick access */}
        <div style={S.quickSection}>
          <div style={S.sectionTitle}>快捷入口</div>
          <div style={S.quickGrid}>
            {[
              {icon:'📊', title:'错题本',   desc:'查看全部错题记录'},
              {icon:'🏆', title:'学习报告', desc:'各科进度与弱项分析'},
              {icon:'🖨️', title:'打印试卷', desc:'生成可打印练习卷'},
              {icon:'⭐', title:'收藏题目', desc:'重要题目标记收藏'},
            ].map(({icon,title,desc})=>(
              <QuickCard key={title} icon={icon} title={title} desc={desc}
                onClick={()=>navigate({screen:'subject', subject:'chinese'})} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SubjectCard({ subject, grade, semester, delay, onMode }) {
  const [hovered, setHovered] = useState(false)
  const { done, total, pct } = computeOverall(subject.id, grade, semester)
  const isEn = subject.id === 'english'

  const modes = [
    { id:'preview', label:'预习' },
    { id:'review',  label:'复习' },
    { id:'test',    label:'测试' },
  ]

  return (
    <div
      style={{
        ...S.card(subject.color, subject.lightColor),
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,.14), 0 0 0 1px ${subject.color}30` : 'var(--sh-sm)',
        animationDelay: `${delay}ms`
      }}
      className="fade-up"
      onMouseEnter={()=>setHovered(true)}
      onMouseLeave={()=>setHovered(false)}
    >
      {/* Colored top */}
      <div style={S.cardTop(subject.grad)}>
        <span style={isEn ? S.cardCharEn : S.cardChar}>{subject.char}</span>
        <div style={S.subjectName}>{subject.name}</div>
        <div style={S.editionTag}>{subject.edition}</div>
        <div style={S.subjectDesc}>{subject.desc}</div>
        {/* subtle wave */}
        <svg style={{position:'absolute',bottom:-1,left:0,width:'100%',height:28}} viewBox="0 0 400 28" preserveAspectRatio="none">
          <path d="M0 28 C100 0 300 28 400 12 L400 28 Z" fill="var(--white)" />
        </svg>
      </div>

      {/* Body */}
      <div style={S.cardBody}>
        <div style={S.progressRow}>
          <div style={S.progressLabel}>
            <span>学习进度</span>
            <span style={{color:subject.color, fontWeight:600}}>{done} / {total} 课  {pct}%</span>
          </div>
          <div style={S.progressBar}>
            <div style={S.progressFill(pct, subject.color)} />
          </div>
        </div>
        <div style={S.modeRow}>
          {modes.map(m=>(
            <button key={m.id}
              style={S.modeBtn(subject.color)}
              onMouseEnter={e=>{e.currentTarget.style.background=subject.color; e.currentTarget.style.color='#fff'}}
              onMouseLeave={e=>{e.currentTarget.style.background='transparent'; e.currentTarget.style.color=subject.color}}
              onClick={(e)=>{ e.stopPropagation(); onMode(m.id) }}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function QuickCard({ icon, title, desc, onClick }) {
  const [hov, setHov] = useState(false)
  return (
    <div style={{...S.quickCard, background: hov?'var(--paper-dark)':'var(--white)',
      transform: hov?'translateY(-2px)':'none', boxShadow: hov?'var(--sh-md)':'var(--sh-xs)'}}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onClick}>
      <span style={S.quickIcon}>{icon}</span>
      <div style={S.quickTitle}>{title}</div>
      <div style={S.quickDesc}>{desc}</div>
    </div>
  )
}

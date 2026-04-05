import { useState } from 'react'
import { SUBJECTS } from '../data/content'

export default function Results({ state, navigate }) {
  const { results, subject: subId } = state
  const sub = SUBJECTS[subId]
  const [tab, setTab] = useState('overview')

  if (!results || !sub) return null
  const { score, total, correct, errors = [], weakAreas = [], title, timeTaken } = results

  const mins = Math.floor(timeTaken/60)
  const secs = timeTaken%60
  const grade = score >= 90 ? 'A' : score >= 75 ? 'B' : score >= 60 ? 'C' : 'D'
  const gradeColor = { A:'var(--success)', B:sub.color, C:'var(--warn)', D:'var(--error)' }[grade]
  const gradeMsg   = { A:'优秀！你已很好地掌握了这部分内容', B:'良好！稍加复习即可全面掌握', C:'还需努力，重点复习错题部分', D:'需要加强，建议从头系统复习' }[grade]

  return (
    <div style={{ minHeight:'100vh', background:'var(--paper)' }}>
      {/* Hero */}
      <div style={{ background:sub.grad, padding:'0 40px' }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, paddingTop:18, paddingBottom:14 }}>
          <button onClick={()=>navigate({screen:'dashboard'})}
            style={{ background:'rgba(255,255,255,.18)', border:'none', borderRadius:8,
              padding:'5px 12px', color:'rgba(255,255,255,.85)', fontSize:13, cursor:'pointer' }}>
            ← 返回首页
          </button>
          <span style={{ color:'rgba(255,255,255,.5)' }}>/</span>
          <span style={{ color:'#fff', fontSize:13 }}>{sub.name} 测试结果</span>
        </div>

        <div style={{ display:'flex', alignItems:'flex-end', gap:40, paddingBottom:36 }}>
          {/* Score ring */}
          <ScoreRing score={score} color='#fff' gradeColor={gradeColor} />
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:'var(--font-disp)', fontSize:22, color:'#fff', marginBottom:4 }}>{title}</div>
            <div style={{ fontSize:14, color:'rgba(255,255,255,.75)', marginBottom:14 }}>
              {sub.name} · 共 {total} 题 · 耗时 {mins}分{secs}秒
            </div>
            <div style={{ display:'flex', gap:20 }}>
              {[
                { label:'正确', val:correct,         color:'rgba(255,255,255,.9)' },
                { label:'错误', val:total-correct,   color:'rgba(255,100,100,.9)' },
                { label:'正确率',val:`${score}%`,    color:'rgba(255,255,255,.9)' },
              ].map(({label,val,color})=>(
                <div key={label} style={{ textAlign:'center' }}>
                  <div style={{ fontFamily:'var(--font-en)', fontSize:28, color, lineHeight:1 }}>{val}</div>
                  <div style={{ fontSize:12, color:'rgba(255,255,255,.6)', marginTop:3 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background:'rgba(255,255,255,.15)', borderRadius:16, padding:'16px 24px',
            maxWidth:240, backdropFilter:'blur(8px)' }}>
            <div style={{ fontSize:12, color:'rgba(255,255,255,.7)', marginBottom:4 }}>评语</div>
            <div style={{ fontSize:14, color:'#fff', lineHeight:1.6 }}>{gradeMsg}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display:'flex', gap:4, borderTop:'1px solid rgba(255,255,255,.15)', paddingTop:2 }}>
          {[{id:'overview',label:'总览分析'},{id:'errors',label:`错题解析 (${errors.length})`},
            {id:'weak',label:'弱项训练'},{id:'review',label:'针对复习'}].map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              style={{ background:tab===t.id?'rgba(255,255,255,.22)':'transparent', border:'none',
                borderBottom:tab===t.id?'2px solid #fff':'2px solid transparent',
                color:tab===t.id?'#fff':'rgba(255,255,255,.65)',
                padding:'12px 20px', fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)' }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth:900, margin:'0 auto', padding:'32px 32px 80px' }}>
        {tab==='overview' && <OverviewTab weakAreas={weakAreas} sub={sub} total={total} score={score}
          navigate={navigate} state={state} />}
        {tab==='errors'   && <ErrorsTab errors={errors} sub={sub} />}
        {tab==='weak'     && <WeakTab weakAreas={weakAreas} sub={sub} navigate={navigate} state={state} />}
        {tab==='review'   && <ReviewTab weakAreas={weakAreas} sub={sub} navigate={navigate} state={state} />}
      </div>
    </div>
  )
}

function OverviewTab({ weakAreas, sub, total, score, navigate, state }) {
  return (
    <div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
        {/* Radar chart */}
        <div style={{ background:'var(--white)', borderRadius:18, padding:'24px', boxShadow:'var(--sh-sm)',
          border:'1px solid var(--paper-dark)' }}>
          <h3 style={{ fontFamily:'var(--font-serif)', fontSize:15, color:'var(--ink)', marginBottom:20 }}>
            各题型掌握情况
          </h3>
          <RadarChart data={weakAreas} sub={sub} />
        </div>
        {/* Bar chart */}
        <div style={{ background:'var(--white)', borderRadius:18, padding:'24px', boxShadow:'var(--sh-sm)',
          border:'1px solid var(--paper-dark)' }}>
          <h3 style={{ fontFamily:'var(--font-serif)', fontSize:15, color:'var(--ink)', marginBottom:20 }}>
            各题型错误率
          </h3>
          <BarChart data={weakAreas} sub={sub} />
        </div>
      </div>
      {/* Actions */}
      <div style={{ display:'flex', gap:14, marginTop:24 }}>
        <button onClick={()=>navigate({screen:'test-config'})}
          style={{ flex:1, background:sub.grad, color:'#fff', border:'none', borderRadius:12,
            padding:'14px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)',
            boxShadow:`0 4px 16px ${sub.color}44` }}>
          再次测试
        </button>
        <button onClick={()=>navigate({screen:'print'})}
          style={{ flex:1, background:'var(--white)', color:'var(--ink)', border:'1px solid var(--paper-deeper)',
            borderRadius:12, padding:'14px', fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
          🖨️ 打印试卷
        </button>
        <button onClick={()=>navigate({screen:'subject'})}
          style={{ flex:1, background:'var(--white)', color:'var(--ink)', border:'1px solid var(--paper-deeper)',
            borderRadius:12, padding:'14px', fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)' }}>
          返回目录
        </button>
      </div>
    </div>
  )
}

function ErrorsTab({ errors, sub }) {
  if (!errors.length) return (
    <div style={{ textAlign:'center', padding:'60px', color:'var(--success)', fontSize:16 }}>
      🎉 全部答对！太棒了！
    </div>
  )
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      {errors.map(({q, userAnswer},i)=>(
        <div key={q.id} style={{ background:'var(--white)', borderRadius:16, overflow:'hidden',
          border:'1px solid #F5C6C3', boxShadow:'var(--sh-xs)' }}>
          <div style={{ background:'#FFF3F3', padding:'12px 20px', display:'flex',
            alignItems:'center', gap:10, borderBottom:'1px solid #F5C6C3' }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'var(--error)', color:'#fff',
              display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700 }}>
              {i+1}
            </div>
            <span style={{ fontSize:13, fontWeight:600, color:'var(--error)' }}>答错</span>
            <span style={{ fontSize:12, color:'var(--ink-muted)', marginLeft:'auto' }}>
              {sub.questionTypes?.find(t=>t.id===q.type)?.name || q.type}
            </span>
          </div>
          <div style={{ padding:'16px 20px' }}>
            <div style={{ fontFamily:'var(--font-serif)', fontSize:14, color:'var(--ink)', lineHeight:1.7,
              marginBottom:12 }}>
              {q.question || (q.passage && '（阅读理解题）')}
            </div>
            {q.explanation && (
              <div style={{ background:'#E8F8EE', border:'1px solid #9ED4B4', borderRadius:10,
                padding:'12px 16px', fontSize:13, color:'var(--en-dark)', lineHeight:1.6 }}>
                <strong>解析：</strong>{q.explanation}
              </div>
            )}
            {q.solution && (
              <div style={{ background:'#E8F8EE', border:'1px solid #9ED4B4', borderRadius:10,
                padding:'12px 16px', fontSize:13, color:'#0F4524', lineHeight:1.8,
                fontFamily:'var(--font-mono)', whiteSpace:'pre-wrap', marginTop:8 }}>
                <strong>参考解答：</strong><br/>{q.solution}
              </div>
            )}
            {(q.answers || q.answer !== undefined) && (
              <div style={{ marginTop:8, fontSize:13, color:'var(--ink-muted)' }}>
                <strong style={{ color:'var(--success)' }}>正确答案：</strong>
                {Array.isArray(q.answers) ? q.answers.join('；') :
                  typeof q.answer === 'number' ? q.options?.[q.answer] : String(q.answer)}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function WeakTab({ weakAreas, sub, navigate, state }) {
  const weak = weakAreas.filter(a => a.total > 0 && a.errorCount/a.total > 0.4)
  if (!weak.length) return (
    <div style={{ textAlign:'center', padding:'60px', color:'var(--ink-muted)', fontSize:15 }}>
      没有明显弱项，继续保持！
    </div>
  )
  return (
    <div>
      <p style={{ color:'var(--ink-muted)', fontSize:14, marginBottom:24 }}>
        以下题型错误率较高，建议重点训练：
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        {weak.map(area=>{
          const errRate = Math.round((area.errorCount/area.total)*100)
          return (
            <div key={area.id} style={{ background:'var(--white)', borderRadius:16, padding:'20px',
              border:`1px solid ${sub.midColor}`, boxShadow:'var(--sh-xs)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:14 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:sub.lightColor,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:15, fontWeight:700, color:sub.color, fontFamily:'var(--font-mono)' }}>
                  {area.icon}
                </div>
                <div>
                  <div style={{ fontWeight:600, color:'var(--ink)', fontSize:15 }}>{area.name}</div>
                  <div style={{ fontSize:12, color:'var(--error)' }}>错误率 {errRate}%</div>
                </div>
              </div>
              <div style={{ height:6, background:'var(--paper-dark)', borderRadius:3, marginBottom:14 }}>
                <div style={{ height:'100%', width:`${errRate}%`, borderRadius:3,
                  background: errRate>60?'var(--error)':'var(--warn)', transition:'width .8s' }} />
              </div>
              <button
                onClick={()=>navigate({ screen:'test-config',
                  testConfig:{ scope:'custom', qTypes:[area.id] }})}
                style={{ width:'100%', padding:'9px', background:sub.color, color:'#fff', border:'none',
                  borderRadius:9, fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)' }}>
                专项训练 →
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ReviewTab({ weakAreas, sub, navigate, state }) {
  const suggestions = [
    { label:'重做错题', desc:'仅对错题重新作答，快速强化', icon:'🔁', action:()=>navigate({screen:'test-config'})},
    { label:'按弱项测试', desc:'针对错误最多的题型专项出题', icon:'🎯', action:()=>navigate({screen:'test-config', testConfig:{scope:'custom'}})},
    { label:'单元复习', desc:'完整复习当前单元所有内容', icon:'📚', action:()=>navigate({screen:'subject'})},
    { label:'打印巩固卷', desc:'生成包含弱项题目的打印试卷', icon:'🖨️', action:()=>navigate({screen:'print'})},
  ]
  return (
    <div>
      <p style={{ color:'var(--ink-muted)', fontSize:14, marginBottom:24 }}>
        根据本次测试结果，为你推荐以下复习方案：
      </p>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
        {suggestions.map(s=>(
          <div key={s.label} onClick={s.action}
            style={{ background:'var(--white)', borderRadius:16, padding:'20px 22px',
              border:'1px solid var(--paper-dark)', cursor:'pointer',
              boxShadow:'var(--sh-xs)', transition:'all .2s' }}
            onMouseEnter={e=>{e.currentTarget.style.boxShadow='var(--sh-md)'; e.currentTarget.style.transform='translateY(-2px)'}}
            onMouseLeave={e=>{e.currentTarget.style.boxShadow='var(--sh-xs)'; e.currentTarget.style.transform=''}}>
            <div style={{ fontSize:28, marginBottom:10 }}>{s.icon}</div>
            <div style={{ fontFamily:'var(--font-serif)', fontSize:15, fontWeight:600, color:'var(--ink)', marginBottom:5 }}>{s.label}</div>
            <div style={{ fontSize:13, color:'var(--ink-muted)' }}>{s.desc}</div>
            <div style={{ marginTop:12, fontSize:13, color:sub.color, fontWeight:500 }}>立即开始 →</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScoreRing({ score, color, gradeColor }) {
  const r = 38, circ = 2*Math.PI*r
  const offset = circ-(score/100)*circ
  const grade = score>=90?'A':score>=75?'B':score>=60?'C':'D'
  return (
    <div style={{ position:'relative', width:100, height:100, flexShrink:0 }}>
      <svg width="100" height="100" style={{ transform:'rotate(-90deg)' }}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="5"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="5"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:'stroke-dashoffset 1s var(--ease-out)' }}/>
      </svg>
      <div style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontFamily:'var(--font-en)', fontSize:20, color:'#fff', lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:11, color:'rgba(255,255,255,.7)' }}>分</span>
        <span style={{ fontFamily:'var(--font-en)', fontSize:14, color:'rgba(255,255,255,.9)',
          fontWeight:700, marginTop:2 }}>{grade}</span>
      </div>
    </div>
  )
}

function RadarChart({ data, sub }) {
  if (!data.length) return <div style={{color:'var(--ink-faint)',fontSize:13}}>暂无数据</div>
  const n = data.length
  const cx=130, cy=120, r=90
  const getPoint = (i, val, rr=r) => {
    const angle = (Math.PI*2*i/n) - Math.PI/2
    return [cx + rr*val*Math.cos(angle), cy + rr*val*Math.sin(angle)]
  }
  const gridLevels = [0.25,0.5,0.75,1]
  const scoreData = data.map(d => d.total>0 ? 1-d.errorCount/d.total : 1)

  return (
    <svg viewBox="0 0 260 240" style={{ width:'100%', maxWidth:260 }}>
      {/* Grid */}
      {gridLevels.map(lv=>(
        <polygon key={lv}
          points={data.map((_,i)=>getPoint(i,lv).join(',')).join(' ')}
          fill="none" stroke="var(--paper-dark)" strokeWidth="1"/>
      ))}
      {/* Axes */}
      {data.map((_,i)=>{
        const [x,y]=getPoint(i,1)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--paper-dark)" strokeWidth="1"/>
      })}
      {/* Data */}
      <polygon
        points={scoreData.map((v,i)=>getPoint(i,v).join(',')).join(' ')}
        fill={`${sub.color}30`} stroke={sub.color} strokeWidth="2"/>
      {scoreData.map((v,i)=>{
        const [x,y]=getPoint(i,v)
        return <circle key={i} cx={x} cy={y} r="4" fill={sub.color}/>
      })}
      {/* Labels */}
      {data.map((d,i)=>{
        const [x,y]=getPoint(i,1.22)
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fill="var(--ink-muted)" fontFamily="var(--font-body)">
            {d.name}
          </text>
        )
      })}
    </svg>
  )
}

function BarChart({ data, sub }) {
  if (!data.length) return <div style={{color:'var(--ink-faint)',fontSize:13}}>暂无数据</div>
  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
      {data.filter(d=>d.total>0).map(d=>{
        const errRate = Math.round((d.errorCount/d.total)*100)
        const color = errRate>60?'var(--error)':errRate>30?'var(--warn)':sub.color
        return (
          <div key={d.id}>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:12,
              color:'var(--ink-muted)', marginBottom:4 }}>
              <span>{d.name}</span>
              <span style={{ color, fontWeight:600 }}>{errRate}% 错误</span>
            </div>
            <div style={{ height:8, background:'var(--paper-dark)', borderRadius:4, overflow:'hidden' }}>
              <div style={{ height:'100%', width:`${errRate}%`, background:color,
                borderRadius:4, transition:'width .8s var(--ease-out)' }}/>
            </div>
          </div>
        )
      })}
    </div>
  )
}

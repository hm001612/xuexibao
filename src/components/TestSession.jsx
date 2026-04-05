import { useState, useEffect, useRef } from 'react'
import { SUBJECTS } from '../data/content'

export default function TestSession({ state, navigate }) {
  const { testData, subject: subId } = state
  const sub = SUBJECTS[subId]
  const { title, questions = [], timeLimit = 1200 } = testData || {}

  const [current, setCurrent]   = useState(0)
  const [answers, setAnswers]   = useState({})
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [submitted, setSubmitted] = useState(false)
  const [flagged,   setFlagged]  = useState(new Set())
  const timerRef = useRef(null)

  useEffect(() => {
    if (submitted) return
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); handleSubmit(true); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [submitted])

  if (!testData || !sub) return null

  const q  = questions[current]
  const pct = Math.round(((timeLimit - timeLeft) / timeLimit) * 100)
  const answered = Object.keys(answers).length
  const mins = String(Math.floor(timeLeft/60)).padStart(2,'0')
  const secs = String(timeLeft%60).padStart(2,'0')
  const isLow = timeLeft < 120

  function setAnswer(qId, val) { setAnswers(prev => ({...prev, [qId]: val})) }
  function toggleFlag(qId) { setFlagged(prev => { const n=new Set(prev); n.has(qId)?n.delete(qId):n.add(qId); return n }) }

  function handleSubmit(auto=false) {
    clearInterval(timerRef.current)
    setSubmitted(true)
    const errors = []
    let correct = 0
    questions.forEach(q => {
      const a = answers[q.id]
      let isCorrect = false
      if (q.type==='choice'||q.type==='reading'||q.type==='cloze') {
        if (Array.isArray(q.items)) {
          isCorrect = q.items.every((item,i) => answers[`${q.id}_${i}`] === item.answer)
        } else { isCorrect = a === q.answer }
      } else if (q.type==='judge') {
        isCorrect = q.items.every((item,i)=> answers[`${q.id}_${i}`] === item.answer)
      } else { isCorrect = !!a }
      if (isCorrect) correct++
      else errors.push({ q, userAnswer: a, correct: isCorrect })
    })
    const score = Math.round((correct/questions.length)*100)
    const weakAreas = computeWeak(errors, sub)
    setTimeout(()=>{
      navigate({ screen:'results', results:{ score, total:questions.length, correct, errors, weakAreas, title, subject:subId, timeTaken: timeLimit-timeLeft } })
    }, 500)
  }

  function computeWeak(errors, sub) {
    const counts = {}
    errors.forEach(e => { counts[e.q.type] = (counts[e.q.type]||0)+1 })
    return sub.questionTypes.map(qt => ({
      ...qt,
      errorCount: counts[qt.id]||0,
      total: questions.filter(q=>q.type===qt.id).length || 0
    })).filter(x=>x.total>0)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--paper)', display:'flex', flexDirection:'column' }}>
      {/* Top bar */}
      <div style={{ background:'var(--white)', borderBottom:'1px solid var(--paper-dark)',
        padding:'12px 32px', display:'flex', alignItems:'center', gap:16,
        position:'sticky', top:0, zIndex:100, boxShadow:'var(--sh-xs)' }}>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'var(--font-serif)', fontSize:15, fontWeight:600, color:'var(--ink)' }}>{title}</div>
          <div style={{ fontSize:12, color:'var(--ink-muted)', marginTop:2 }}>
            {sub.name} · 已答 {answered}/{questions.length} 题
          </div>
        </div>

        {/* Timer */}
        <div style={{ display:'flex', alignItems:'center', gap:8,
          background: isLow ? '#FFF3F3' : 'var(--paper)',
          border:`1px solid ${isLow ? '#F5A0A0' : 'var(--paper-dark)'}`,
          borderRadius:10, padding:'8px 16px', transition:'all .3s' }}>
          <span style={{ fontSize:16 }}>{isLow?'⏳':'⏱️'}</span>
          <span style={{ fontFamily:'var(--font-mono)', fontSize:18, fontWeight:600,
            color: isLow ? 'var(--error)' : 'var(--ink)', letterSpacing:1 }}>
            {mins}:{secs}
          </span>
        </div>

        <button onClick={()=>handleSubmit(false)}
          style={{ background:sub.color, color:'#fff', border:'none', borderRadius:10,
            padding:'9px 20px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)' }}>
          交卷
        </button>
      </div>

      {/* Progress */}
      <div style={{ height:3, background:'var(--paper-dark)' }}>
        <div style={{ height:'100%', width:`${(answered/questions.length)*100}%`,
          background:sub.color, transition:'width .3s' }} />
      </div>

      <div style={{ display:'flex', flex:1 }}>
        {/* Question panel */}
        <div style={{ flex:1, padding:'32px 40px 40px', maxWidth:760 }}>
          <QuestionCard q={q} qIndex={current} answers={answers} setAnswer={setAnswer}
            flagged={flagged.has(q?.id)} onFlag={()=>toggleFlag(q?.id)} sub={sub} />

          {/* Navigation */}
          <div style={{ display:'flex', justifyContent:'space-between', marginTop:32 }}>
            <button onClick={()=>setCurrent(c=>Math.max(0,c-1))} disabled={current===0}
              style={{ background:'var(--white)', border:'1px solid var(--paper-deeper)',
                borderRadius:10, padding:'10px 24px', fontSize:14, cursor:current===0?'not-allowed':'pointer',
                color: current===0 ? 'var(--ink-faint)' : 'var(--ink)', fontFamily:'var(--font-body)' }}>
              ← 上一题
            </button>
            <span style={{ fontSize:14, color:'var(--ink-muted)', alignSelf:'center' }}>
              {current+1} / {questions.length}
            </span>
            {current < questions.length-1 ? (
              <button onClick={()=>setCurrent(c=>Math.min(questions.length-1,c+1))}
                style={{ background:sub.color, color:'#fff', border:'none', borderRadius:10,
                  padding:'10px 24px', fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)' }}>
                下一题 →
              </button>
            ) : (
              <button onClick={()=>handleSubmit(false)}
                style={{ background:'linear-gradient(135deg,#C0372A,#E84A3C)', color:'#fff', border:'none', borderRadius:10,
                  padding:'10px 24px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)',
                  boxShadow:'0 4px 14px rgba(192,55,42,.4)' }}>
                完成并交卷 ✓
              </button>
            )}
          </div>
        </div>

        {/* Sidebar: question navigator */}
        <div style={{ width:200, borderLeft:'1px solid var(--paper-dark)', padding:'24px 16px',
          background:'var(--white)', overflowY:'auto' }}>
          <div style={{ fontSize:12, color:'var(--ink-muted)', marginBottom:12, fontWeight:600,
            textTransform:'uppercase', letterSpacing:'.5px' }}>题目导航</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6 }}>
            {questions.map((q,i)=>{
              const isAns = !!answers[q.id] || (q.items && q.items.some((_,j)=>answers[`${q.id}_${j}`]!==undefined))
              const isFlag = flagged.has(q.id)
              const isCurr = current===i
              return (
                <button key={q.id} onClick={()=>setCurrent(i)}
                  style={{ aspectRatio:'1', borderRadius:7, border:'none', fontSize:12, fontWeight:600,
                    cursor:'pointer', fontFamily:'var(--font-mono)',
                    background: isCurr ? sub.color : isFlag ? '#FEF3E2' : isAns ? sub.lightColor : 'var(--paper)',
                    color: isCurr ? '#fff' : isFlag ? '#C8870A' : isAns ? sub.darkColor : 'var(--ink-muted)',
                    outline: isCurr ? `2px solid ${sub.color}` : 'none',
                    outlineOffset:1 }}>
                  {i+1}
                </button>
              )
            })}
          </div>
          <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:6 }}>
            {[{color:sub.lightColor,text:'已答'},{color:'#FEF3E2',text:'标记'},{color:'var(--paper)',text:'未答'}].map(({color,text})=>(
              <div key={text} style={{ display:'flex', alignItems:'center', gap:7, fontSize:11, color:'var(--ink-muted)' }}>
                <div style={{ width:12, height:12, borderRadius:3, background:color, border:'1px solid var(--paper-dark)' }}/>
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function QuestionCard({ q, qIndex, answers, setAnswer, flagged, onFlag, sub }) {
  if (!q) return null
  const diffIcons = { 1:'🌱 基础', 2:'🔥 提高', 3:'⭐ 拔高' }

  return (
    <div style={{ background:'var(--white)', borderRadius:18, boxShadow:'var(--sh-sm)',
      border:'1px solid var(--paper-dark)', overflow:'hidden', animation:'scaleIn .3s var(--ease-out)' }}
      key={q.id}>
      {/* Q header */}
      <div style={{ padding:'20px 24px 16px', borderBottom:'1px solid var(--paper)', display:'flex', gap:12, alignItems:'flex-start' }}>
        <div style={{ width:32, height:32, borderRadius:9, background:sub.color, color:'#fff',
          display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:14, flexShrink:0 }}>
          {qIndex+1}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'var(--font-serif)', fontSize:16, color:'var(--ink)', lineHeight:1.7, whiteSpace:'pre-line' }}>
            {q.question}
          </div>
          <div style={{ display:'flex', gap:8, marginTop:8 }}>
            <span style={{ fontSize:11, background:sub.lightColor, color:sub.darkColor,
              borderRadius:4, padding:'2px 8px' }}>{sub.questionTypes?.find(t=>t.id===q.type)?.name || q.type}</span>
            <span style={{ fontSize:11, color:'var(--ink-faint)' }}>{diffIcons[q.difficulty]||''}</span>
          </div>
        </div>
        <button onClick={onFlag}
          style={{ background:'none', border:'none', cursor:'pointer', fontSize:18,
            opacity: flagged ? 1 : 0.3, transition:'opacity .15s' }}>🚩</button>
      </div>

      {/* Q body */}
      <div style={{ padding:'20px 24px' }}>
        <QuestionBody q={q} answers={answers} setAnswer={setAnswer} sub={sub} />
      </div>
    </div>
  )
}

function QuestionBody({ q, answers, setAnswer, sub }) {
  if (q.type === 'choice' && !q.items) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {q.options.map((opt, i)=>{
          const sel = answers[q.id] === i
          return (
            <OptionBtn key={i} sel={sel} onClick={()=>setAnswer(q.id, i)} sub={sub}>
              {opt}
            </OptionBtn>
          )
        })}
      </div>
    )
  }

  if (q.type === 'choice' && q.items) {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        {q.items.map((item,i)=>(
          <div key={i}>
            <div style={{ fontSize:14, color:'var(--ink)', marginBottom:8, fontFamily:'var(--font-serif)',
              background:'var(--paper)', padding:'10px 14px', borderRadius:8, whiteSpace:'pre-line' }}>
              {item.q || item.question}
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {item.options.map((opt,j)=>(
                <OptionBtn key={j} sel={answers[`${q.id}_${i}`]===j} onClick={()=>setAnswer(`${q.id}_${i}`,j)} sub={sub}>
                  {opt}
                </OptionBtn>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (q.type === 'judge') {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {q.items.map((item,i)=>(
          <div key={i} style={{ background:'var(--paper)', borderRadius:10, padding:'12px 16px' }}>
            <div style={{ fontSize:14, color:'var(--ink)', marginBottom:10, lineHeight:1.6 }}>{item.statement}</div>
            <div style={{ display:'flex', gap:10 }}>
              {[{val:true,label:'✓ 正确'},{val:false,label:'✗ 错误'}].map(({val,label})=>{
                const sel = answers[`${q.id}_${i}`] === val
                return (
                  <button key={String(val)} onClick={()=>setAnswer(`${q.id}_${i}`, val)}
                    style={{ padding:'6px 20px', borderRadius:8, border:`1.5px solid ${sel?(val?'var(--success)':'var(--error)'):'var(--paper-deeper)'}`,
                      background: sel ? (val?'#E8F8EE':'#FDECEA') : 'var(--white)',
                      color: sel ? (val?'var(--success)':'var(--error)') : 'var(--ink-muted)',
                      fontSize:13, cursor:'pointer', fontFamily:'var(--font-body)', fontWeight: sel?600:400 }}>
                    {label}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (q.type === 'reading') {
    return (
      <div>
        <div style={{ background:'#FFFEF5', border:'1px solid #F0E8D0', borderRadius:10, padding:'16px',
          fontSize:14, lineHeight:1.9, color:'var(--ink)', marginBottom:20, fontFamily:'var(--font-serif)' }}>
          {q.passage}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {q.questions?.map((qitem,i)=>(
            <div key={i}>
              <div style={{ fontSize:14, color:'var(--ink)', marginBottom:8 }}>{i+1}. {qitem.q}</div>
              <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                {qitem.options.map((opt,j)=>(
                  <OptionBtn key={j} sel={answers[`${q.id}_${i}`]===j}
                    onClick={()=>setAnswer(`${q.id}_${i}`,j)} sub={sub}>{opt}</OptionBtn>
                ))}
              </div>
            </div>
          ))}
          {q.options && !q.questions && (
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {q.options.map((opt,i)=>(
                <OptionBtn key={i} sel={answers[q.id]===i} onClick={()=>setAnswer(q.id,i)} sub={sub}>{opt}</OptionBtn>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (q.type === 'cloze') {
    return (
      <div>
        <div style={{ fontSize:14, color:'var(--ink-muted)', marginBottom:12 }}>{q.intro}</div>
        <div style={{ background:'#FFFEF5', border:'1px solid #F0E8D0', borderRadius:10, padding:'16px',
          fontSize:15, lineHeight:2, color:'var(--ink)', marginBottom:20, fontFamily:'var(--font-serif)' }}>
          {q.passage}
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {q.blanks?.map((blank,i)=>(
            <div key={i}>
              <div style={{ fontSize:13, color:'var(--ink-muted)', marginBottom:7 }}>空 {blank.n}：</div>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {blank.options.map((opt,j)=>(
                  <button key={j} onClick={()=>setAnswer(`${q.id}_${i}`,j)}
                    style={{ padding:'6px 18px', borderRadius:8,
                      border:`1.5px solid ${answers[`${q.id}_${i}`]===j ? sub.color : 'var(--paper-deeper)'}`,
                      background: answers[`${q.id}_${i}`]===j ? sub.lightColor : 'var(--white)',
                      color: answers[`${q.id}_${i}`]===j ? sub.darkColor : 'var(--ink)',
                      fontSize:14, cursor:'pointer', fontFamily:'var(--font-mono)' }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (q.type === 'pinyin') {
    return (
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14 }}>
        {q.items?.map((item,i)=>(
          <div key={i} style={{ background:'var(--paper)', borderRadius:10, padding:'14px',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
            <div style={{ fontSize:16, color:sub.color, fontFamily:'var(--font-mono)' }}>{item.pinyin}</div>
            <input placeholder="写出汉字"
              value={answers[`${q.id}_${i}`]||''}
              onChange={e=>setAnswer(`${q.id}_${i}`, e.target.value)}
              style={{ width:'100%', border:`1px solid var(--paper-deeper)`, borderRadius:7,
                padding:'8px 10px', textAlign:'center', fontSize:18, fontFamily:'var(--font-disp)',
                background:'var(--white)', outline:'none', color:'var(--ink)' }} />
          </div>
        ))}
      </div>
    )
  }

  if (q.type === 'calc') {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {q.items?.map((item,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:16,
            background:'var(--paper)', borderRadius:10, padding:'12px 18px' }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:18, color:'var(--ink)', flex:1 }}>
              {item.expression} =
            </span>
            <input placeholder="答案"
              value={answers[`${q.id}_${i}`]||''}
              onChange={e=>setAnswer(`${q.id}_${i}`,e.target.value)}
              style={{ width:120, border:`1.5px solid var(--paper-deeper)`, borderRadius:8,
                padding:'8px 12px', textAlign:'center', fontSize:18, fontFamily:'var(--font-mono)',
                background:'var(--white)', outline:'none', color:'var(--ink)' }} />
          </div>
        ))}
      </div>
    )
  }

  if (q.type === 'fill') {
    return (
      <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12 }}>
        {q.items?.map((item,i)=>(
          <div key={i} style={{ background:'var(--paper)', borderRadius:10, padding:'12px 16px',
            display:'flex', alignItems:'center', gap:10 }}>
            <span style={{ fontFamily:'var(--font-mono)', fontSize:16, color:'var(--ink)', flex:1 }}>
              {item.template.replace('□',' ___ ')}
            </span>
            <input placeholder="□"
              value={answers[`${q.id}_${i}`]||''}
              onChange={e=>setAnswer(`${q.id}_${i}`,e.target.value)}
              style={{ width:60, border:`1.5px solid var(--paper-deeper)`, borderRadius:7,
                padding:'6px', textAlign:'center', fontSize:18, fontFamily:'var(--font-mono)',
                background:'var(--white)', outline:'none' }} />
          </div>
        ))}
      </div>
    )
  }

  if (q.type === 'apply') {
    return (
      <div>
        <div style={{ background:'#FFFEF5', border:'1px solid #F0E8D0', borderRadius:10, padding:'16px',
          fontSize:15, lineHeight:1.9, color:'var(--ink)', marginBottom:16, fontFamily:'var(--font-serif)' }}>
          {q.question}
        </div>
        <div style={{ fontSize:13, color:'var(--ink-muted)', marginBottom:8 }}>解题过程：</div>
        <textarea placeholder="写出解题步骤和答案…"
          value={answers[q.id]||''}
          onChange={e=>setAnswer(q.id,e.target.value)}
          style={{ width:'100%', minHeight:120, border:'1.5px solid var(--paper-deeper)', borderRadius:10,
            padding:'12px 16px', fontSize:15, fontFamily:'var(--font-serif)', color:'var(--ink)',
            background:'var(--white)', outline:'none', resize:'vertical', lineHeight:1.8 }} />
      </div>
    )
  }

  if (q.type === 'word') {
    return (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {q.items?.map((item,i)=>(
          <div key={i} style={{ display:'flex', alignItems:'center', gap:16,
            background:'var(--paper)', borderRadius:10, padding:'12px 16px' }}>
            <span style={{ fontSize:28 }}>{item.emoji}</span>
            <span style={{ fontSize:14, color:'var(--ink-muted)', flex:1 }}>{item.hint}</span>
            <input placeholder="Type here"
              value={answers[`${q.id}_${i}`]||''}
              onChange={e=>setAnswer(`${q.id}_${i}`,e.target.value)}
              style={{ width:200, border:`1.5px solid var(--paper-deeper)`, borderRadius:8,
                padding:'8px 12px', fontSize:14, fontFamily:'var(--font-en)', color:'var(--ink)',
                background:'var(--white)', outline:'none' }} />
          </div>
        ))}
      </div>
    )
  }

  // Generic text answer
  return (
    <textarea placeholder="请填写答案…"
      value={answers[q.id]||''}
      onChange={e=>setAnswer(q.id,e.target.value)}
      style={{ width:'100%', minHeight:100, border:'1.5px solid var(--paper-deeper)', borderRadius:10,
        padding:'12px 16px', fontSize:15, fontFamily:'var(--font-serif)', color:'var(--ink)',
        background:'var(--white)', outline:'none', resize:'vertical', lineHeight:1.8 }} />
  )
}

function OptionBtn({ sel, onClick, sub, children }) {
  return (
    <button onClick={onClick}
      style={{ textAlign:'left', padding:'11px 16px', borderRadius:10, width:'100%',
        border:`1.5px solid ${sel ? sub.color : 'var(--paper-deeper)'}`,
        background: sel ? sub.lightColor : 'var(--white)',
        color: sel ? sub.darkColor : 'var(--ink)',
        fontSize:14, cursor:'pointer', fontFamily:'var(--font-body)',
        fontWeight: sel ? 600 : 400, transition:'all .15s', lineHeight:1.5, whiteSpace:'pre-wrap' }}>
      {children}
    </button>
  )
}

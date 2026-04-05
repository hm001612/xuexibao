import { useRef } from 'react'
import { SUBJECTS, QUESTIONS, CURRICULUM } from '../data/content'

export default function PrintView({ state, navigate }) {
  const { subject: subId, grade, semester, testConfig } = state
  const sub   = SUBJECTS[subId]
  const curr  = CURRICULUM[subId]?.[grade]?.[semester]
  const units = curr?.units || []
  const printRef = useRef()

  if (!sub) return null

  const scope    = testConfig?.scope || 'unit'
  const unitId   = testConfig?.unitId || units[0]?.id
  const unit     = units.find(u=>u.id===unitId)
  const pool     = QUESTIONS[subId] || []
  const unitLIds = unit?.lessons.map(l=>l.id)||[]
  let questions  = scope==='lesson'
    ? pool.filter(q=>q.lesson===testConfig?.lessonId)
    : pool.filter(q=>unitLIds.includes(q.lesson))
  if (!questions.length) questions = pool

  const today = new Date().toLocaleDateString('zh-CN')
  const title = scope==='midterm'  ? `${grade} 上学期 期中测试卷`
    : scope==='final'   ? `${grade} 上学期 期末测试卷`
    : scope==='unit'    ? `${unit?.title || ''} 单元测试卷`
    : scope==='lesson'  ? `专项练习卷`
    : `综合练习卷`

  function handlePrint() {
    const el = printRef.current
    const w  = window.open('','_blank','width=800,height=1000')
    w.document.write(`
      <html><head><title>${title}</title>
      <meta charset="UTF-8">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;600&family=Noto+Sans+SC:wght@400;500&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Noto Sans SC',sans-serif;padding:30px 40px;color:#1C1917;font-size:14px;line-height:1.8}
        .paper-header{text-align:center;border-bottom:2px solid #1C1917;padding-bottom:12px;margin-bottom:18px}
        h1{font-family:'ZCOOL XiaoWei',serif;font-size:22px;font-weight:400;letter-spacing:2px}
        .meta{display:flex;justify-content:space-between;font-size:13px;margin-top:8px;color:#666}
        .info-row{display:flex;gap:40px;margin:12px 0 18px;font-size:13px;border:1px solid #ccc;padding:8px 16px;border-radius:4px}
        .info-item{flex:1}
        .info-line{border-bottom:1px solid #888;display:inline-block;width:100px;margin-left:4px}
        .q-section{margin-bottom:22px}
        .q-title{font-family:'Noto Serif SC',serif;font-size:14px;font-weight:600;margin-bottom:10px;
          padding:6px 12px;background:#f5f0e8;border-left:3px solid #1C1917}
        .q-item{margin-bottom:14px;padding:0 8px}
        .q-text{font-family:'Noto Serif SC',serif;font-size:14px;line-height:1.9;margin-bottom:6px}
        .options{display:grid;grid-template-columns:1fr 1fr;gap:4px;padding:0 8px}
        .option{font-size:14px;line-height:2}
        .blank-line{display:inline-block;border-bottom:1px solid #888;width:80px;margin:0 4px;vertical-align:bottom}
        .answer-area{min-height:70px;border:1px dashed #ccc;border-radius:4px;margin-top:8px;padding:6px}
        .passage{background:#fffef5;border:1px solid #e8e0c8;border-radius:4px;padding:12px;
          font-size:14px;line-height:2;margin-bottom:10px;font-family:'Noto Serif SC',serif}
        .page-break{page-break-after:always}
        .answer-key{margin-top:30px;border-top:2px dashed #ccc;padding-top:16px}
        .answer-key h2{font-family:'Noto Serif SC',serif;font-size:16px;font-weight:600;margin-bottom:12px;text-align:center}
        .ans-item{display:flex;gap:8px;font-size:13px;margin-bottom:6px}
        @media print{body{padding:10px 20px}.no-print{display:none}}
      </style></head><body>
      ${el.innerHTML}
      </body></html>`)
    w.document.close()
    setTimeout(()=>{w.focus();w.print()},600)
  }

  const grouped = {}
  questions.forEach(q => {
    if (!grouped[q.type]) grouped[q.type] = []
    grouped[q.type].push(q)
  })

  const typeNames = {
    pinyin:'一、看拼音写词语', vocab:'二、给加点字选音', choice:'三、选择题', reading:'四、阅读理解',
    poetry:'五、默写古诗', sentence:'六、句子练习', calc:'一、计算题', fill:'二、填空题',
    judge:'三、判断题', apply:'四、应用题', word:'一、写出单词', cloze:'二、完形填空',
    writing:'七、习作练习', geometry:'五、几何题',
  }
  let sectionNum = 0

  return (
    <div style={{ minHeight:'100vh', background:'#EDE8DE' }}>
      {/* Toolbar */}
      <div className="no-print" style={{ background:'var(--white)', padding:'14px 32px',
        borderBottom:'1px solid var(--paper-dark)', display:'flex', alignItems:'center', gap:12,
        boxShadow:'var(--sh-xs)', position:'sticky', top:0, zIndex:100 }}>
        <button onClick={()=>navigate({screen:'test-config'})}
          style={{ background:'none', border:'1px solid var(--paper-deeper)', borderRadius:8,
            padding:'7px 16px', fontSize:13, cursor:'pointer', color:'var(--ink-muted)' }}>
          ← 返回
        </button>
        <div style={{ flex:1, fontFamily:'var(--font-serif)', fontSize:15, color:'var(--ink)' }}>{title}</div>
        <button onClick={handlePrint}
          style={{ background:sub.grad, color:'#fff', border:'none', borderRadius:10,
            padding:'9px 22px', fontSize:14, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)',
            display:'flex', alignItems:'center', gap:8, boxShadow:`0 3px 12px ${sub.color}44` }}>
          🖨️ 打印试卷
        </button>
      </div>

      {/* Paper preview */}
      <div style={{ maxWidth:800, margin:'32px auto', padding:'0 16px 60px' }}>
        <div ref={printRef} style={{ background:'var(--white)', padding:'40px 48px',
          boxShadow:'var(--sh-xl)', borderRadius:4, fontFamily:'var(--font-body)' }}>

          {/* Header */}
          <div style={{ textAlign:'center', borderBottom:'2px solid var(--ink)', paddingBottom:14, marginBottom:18 }}>
            <div style={{ fontFamily:'var(--font-disp)', fontSize:24, letterSpacing:4, color:'var(--ink)' }}>
              {title}
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', fontSize:13,
              color:'var(--ink-muted)', marginTop:8 }}>
              <span>{sub.edition} · {grade} {semester}</span>
              <span>日期：{today}</span>
              <span>满分：100分</span>
            </div>
          </div>

          {/* Student info */}
          <div style={{ display:'flex', gap:32, marginBottom:20, padding:'10px 16px',
            border:'1px solid var(--paper-deeper)', borderRadius:4, fontSize:13 }}>
            {['姓名','班级','得分'].map(l=>(
              <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}>
                <span style={{ color:'var(--ink-muted)' }}>{l}：</span>
                <span style={{ display:'inline-block', borderBottom:'1px solid var(--ink-faint)',
                  width:80, height:20 }}/>
              </div>
            ))}
          </div>

          {/* Question sections */}
          {Object.entries(grouped).map(([type, qs], si)=>(
            <div key={type} style={{ marginBottom:28 }}>
              <div style={{ fontFamily:'var(--font-serif)', fontWeight:600, fontSize:15,
                padding:'6px 14px', background:'var(--paper)', borderLeft:'3px solid var(--ink)',
                marginBottom:14 }}>
                {typeNames[type] || `${si+1}. ${sub.questionTypes?.find(t=>t.id===type)?.name||type}`}
              </div>
              <PrintQuestions qs={qs} type={type} sub={sub} />
            </div>
          ))}

          {/* Answer key */}
          <div style={{ marginTop:32, borderTop:'2px dashed var(--paper-deeper)', paddingTop:16 }}>
            <div style={{ fontFamily:'var(--font-serif)', textAlign:'center', fontSize:15,
              fontWeight:600, marginBottom:14, color:'var(--ink)' }}>
              — 参考答案 —
            </div>
            {Object.entries(grouped).map(([type, qs])=>(
              <div key={type} style={{ marginBottom:14 }}>
                <div style={{ fontFamily:'var(--font-serif)', fontSize:13, fontWeight:600,
                  color:'var(--ink-light)', marginBottom:6 }}>
                  {typeNames[type] || type}
                </div>
                <AnswerKey qs={qs} type={type} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PrintQuestions({ qs, type, sub }) {
  return (
    <div>
      {qs.map((q, qi)=>(
        <div key={q.id} style={{ marginBottom:18, paddingLeft:8 }}>
          {type==='choice' && !q.items && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.9, marginBottom:8 }}>
                {qi+1}. {q.question}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, paddingLeft:16 }}>
                {q.options?.map((o,i)=>(
                  <div key={i} style={{ fontSize:14, lineHeight:2 }}>{o}</div>
                ))}
              </div>
            </div>
          )}
          {type==='judge' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.9, marginBottom:10 }}>
                {q.question}
              </div>
              {q.items?.map((item,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8,
                  paddingLeft:16, fontSize:14, lineHeight:1.8 }}>
                  <span>（  ）</span>
                  {i+1}. {item.statement}
                </div>
              ))}
            </div>
          )}
          {type==='calc' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.9, marginBottom:10 }}>
                {q.question}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                {q.items?.map((item,i)=>(
                  <div key={i} style={{ padding:'10px', border:'1px solid var(--paper-deeper)', borderRadius:4,
                    fontFamily:'monospace', fontSize:15, minHeight:60 }}>
                    {item.expression} =
                  </div>
                ))}
              </div>
            </div>
          )}
          {type==='apply' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.9, marginBottom:8 }}>
                {qi+1}. {q.question}
              </div>
              <div style={{ border:'1px dashed var(--paper-deeper)', borderRadius:4, minHeight:80,
                padding:8, marginTop:6 }}/>
            </div>
          )}
          {type==='reading' && (
            <div>
              <div style={{ background:'#FFFEF5', border:'1px solid #F0E8D0', borderRadius:4,
                padding:'12px 16px', fontFamily:'var(--font-serif)', fontSize:14, lineHeight:2, marginBottom:12 }}>
                {q.passage}
              </div>
              {q.questions?.map((qitem,i)=>(
                <div key={i} style={{ marginBottom:12, paddingLeft:8 }}>
                  <div style={{ fontFamily:'var(--font-serif)', fontSize:14, lineHeight:1.9 }}>
                    {i+1}. {qitem.q}
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:4, paddingLeft:16 }}>
                    {qitem.options?.map((o,j)=>(
                      <div key={j} style={{ fontSize:14, lineHeight:2 }}>{o}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {type==='pinyin' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, marginBottom:10 }}>{q.question}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, paddingLeft:8 }}>
                {q.items?.map((item,i)=>(
                  <div key={i} style={{ textAlign:'center' }}>
                    <div style={{ color:sub.color, fontSize:15, fontFamily:'monospace', marginBottom:4 }}>
                      {item.pinyin}
                    </div>
                    <div style={{ borderBottom:'1px solid var(--ink)', width:'80%', margin:'0 auto',
                      height:28 }}/>
                  </div>
                ))}
              </div>
            </div>
          )}
          {type==='poetry' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, marginBottom:8 }}>
                {qi+1}. {q.question}
              </div>
              {q.poem?.lines?.map((line,i)=>(
                <div key={i} style={{ fontFamily:'var(--font-serif)', fontSize:15, lineHeight:2.2,
                  paddingLeft:20 }}>
                  {line}
                </div>
              ))}
            </div>
          )}
          {type==='word' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, marginBottom:10 }}>{q.question}</div>
              {q.items?.map((item,i)=>(
                <div key={i} style={{ display:'flex', alignItems:'center', gap:14, marginBottom:10, paddingLeft:8 }}>
                  <span style={{ fontSize:20 }}>{item.emoji}</span>
                  <span style={{ fontSize:14, color:'var(--ink-muted)', flex:1 }}>{item.hint}</span>
                  <span style={{ borderBottom:'1px solid var(--ink)', width:160, display:'inline-block', height:24 }}/>
                </div>
              ))}
            </div>
          )}
          {type==='cloze' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, marginBottom:8 }}>{q.intro}</div>
              <div style={{ background:'#FFFEF5', border:'1px solid #F0E8D0', padding:'12px 16px',
                borderRadius:4, fontSize:15, lineHeight:2, fontFamily:'var(--font-serif)', marginBottom:12 }}>
                {q.passage}
              </div>
              {q.blanks?.map((blank,i)=>(
                <div key={i} style={{ display:'flex', flexWrap:'wrap', gap:10, marginBottom:8, paddingLeft:8 }}>
                  <span style={{ fontSize:14, fontWeight:600 }}>空{blank.n}：</span>
                  {blank.options?.map((o,j)=>(
                    <span key={j} style={{ fontSize:14 }}>{String.fromCharCode(65+j)}. {o}</span>
                  ))}
                </div>
              ))}
            </div>
          )}
          {type==='fill' && (
            <div>
              <div style={{ fontFamily:'var(--font-serif)', fontSize:14, marginBottom:10 }}>{q.question}</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:10 }}>
                {q.items?.map((item,i)=>(
                  <div key={i} style={{ fontFamily:'monospace', fontSize:15, padding:'8px',
                    border:'1px solid var(--paper-deeper)', borderRadius:4 }}>
                    {qi*10+i+1}. {item.template}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function AnswerKey({ qs, type }) {
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap:16, fontSize:13, paddingLeft:8 }}>
      {qs.map((q,i)=>{
        let ans = ''
        if (type==='choice' && !q.items) ans = q.options?.[q.answer]?.slice(0,1)||''
        else if (type==='judge') ans = q.items?.map((it,j)=>`${j+1}.${it.answer?'√':'×'}`).join('  ')
        else if (type==='calc') ans = q.items?.map(it=>`${it.expression}=${it.answer}`).join('；')
        else if (type==='apply') ans = `${q.answer}（${q.type_detail||''}）`
        else if (type==='pinyin') ans = q.items?.map(it=>it.answer).join('、')
        else if (type==='poetry') ans = q.answers?.join('；')
        else if (type==='word') ans = q.items?.map(it=>it.answer).join('、')
        else if (type==='cloze') ans = q.blanks?.map((b,j)=>`${j+1}.${b.options?.[b.answer]}`).join('  ')
        else if (type==='fill') ans = q.items?.map(it=>it.answer).join('、')
        return (
          <div key={q.id} style={{ fontSize:13, color:'var(--ink-muted)' }}>
            <strong style={{ color:'var(--ink)' }}>第{i+1}题</strong>：{ans}
          </div>
        )
      })}
    </div>
  )
}

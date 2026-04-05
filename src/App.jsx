import { useState } from 'react'
import Dashboard  from './components/Dashboard.jsx'
import SubjectHome from './components/SubjectHome.jsx'
import TestConfig  from './components/TestConfig.jsx'
import TestSession from './components/TestSession.jsx'
import Results     from './components/Results.jsx'
import PrintView   from './components/PrintView.jsx'

const INITIAL = {
  screen:     'dashboard',
  grade:      '三年级',
  semester:   '上学期',
  subject:    null,
  mode:       null,
  testConfig: null,
  testData:   null,
  results:    null,
}

export default function App() {
  const [state, setState] = useState(INITIAL)

  // Merges partial updates, resets screen-level ephemeral state on navigation
  const navigate = (updates) => {
    setState(prev => {
      const next = { ...prev, ...updates }
      // When navigating to dashboard reset transient state
      if (updates.screen === 'dashboard') {
        return { ...INITIAL, grade: prev.grade, semester: prev.semester }
      }
      return next
    })
  }

  const views = {
    dashboard:  <Dashboard   state={state} navigate={navigate} />,
    subject:    <SubjectHome state={state} navigate={navigate} />,
    'test-config': <TestConfig state={state} navigate={navigate} />,
    test:       <TestSession state={state} navigate={navigate} />,
    results:    <Results     state={state} navigate={navigate} />,
    print:      <PrintView   state={state} navigate={navigate} />,
  }

  return views[state.screen] || views['dashboard']
}

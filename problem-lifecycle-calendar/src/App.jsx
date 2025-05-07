import React, { useEffect } from 'react'
import './App.css'

import ProblemLifecycleTracker from './ProblemLifecycleTrackers';

function App() {

  useEffect(() => {
    document.title = "Council Managed Problems";
  }, []);

  return (
    <ProblemLifecycleTracker />
  )
}

export default App
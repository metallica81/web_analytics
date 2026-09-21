import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ModulePage from './pages/ModulePage'

export default function App() {
  const [completedModules, setCompletedModules] = useState(
    () => JSON.parse(localStorage.getItem('completedModules') || '[]')
  )
  const [moduleScores, setModuleScores] = useState(
    () => JSON.parse(localStorage.getItem('moduleScores') || '{}')
  )

  useEffect(() => {
    localStorage.setItem('completedModules', JSON.stringify(completedModules))
  }, [completedModules])

  useEffect(() => {
    localStorage.setItem('moduleScores', JSON.stringify(moduleScores))
  }, [moduleScores])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomePage
            completedModules={completedModules}
            moduleScores={moduleScores}
          />
        }
      />
      <Route
        path="/module/:id"
        element={
          <ModulePage
            completedModules={completedModules}
            setCompletedModules={setCompletedModules}
            moduleScores={moduleScores}
            setModuleScores={setModuleScores}
          />
        }
      />
    </Routes>
  )
}

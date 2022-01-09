import React from 'react'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from 'app/pages/dashboard'
import Layout from './@core/layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />}
          />
        </Routes>
      </Layout>
      <Toaster position="top-right" />
    </BrowserRouter>
  )
}

export default App

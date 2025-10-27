import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import FirstComp from './FirstComp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
       <FirstComp />
  </StrictMode>
)

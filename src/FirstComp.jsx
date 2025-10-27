import React from 'react'

import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar.jsx';
import Translator from './NavComponents/Translator.jsx'
import Pdftospeech from './NavComponents/Pdftospeech.jsx';
import Voicetyper from './NavComponents/Voicetyper.jsx'
import TextSummary from './NavComponents/TextSummary.jsx'
import Firsttyping from './NavComponents/Firsttyping.jsx'
import BillGenerator from './NavComponents/BillGenerator.jsx'

function FirstComp() {
  return (
    <div>
        <BrowserRouter>
     <Routes>
      <Route>
        <Route path='/' element={<BillGenerator/>}></Route>
        
        <Route path='/BillGenerator' element={<BillGenerator/>}></Route>
        <Route path='/pdftospeech' element={<Pdftospeech/>}></Route>
        <Route path='/Translator' element={<Translator/>}></Route>
        <Route path='/Voicetyper' element={<Voicetyper/>}></Route>
        <Route path='/TextSummary' element={<TextSummary/>}></Route>
        <Route path='/Firsttyping' element={<Firsttyping/>}></Route>
        </Route>
     </Routes>
     </BrowserRouter>
     <Sidebar/>
    </div>
  )
}

export default FirstComp

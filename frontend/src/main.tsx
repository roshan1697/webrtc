import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter ,Routes,Route } from 'react-router-dom'
import Sender from './components/sender.tsx'
import Receiver from './components/receiver.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<App/>} />
        <Route path='/sender' element={<Sender/>} />
        <Route path='/receiver' element={<Receiver/>} />


          
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchBalance from './pages/FetchBalance.tsx';
import './index.css'
import App from './pages/App.tsx'
import CreateWallet from './pages/CreateWallet.tsx';
import TabComponent from './components/TabComponent.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='relative w-full h-full'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateWallet />} />
        <Route path="/fetch" element={<FetchBalance />} />
      </Routes>
      <TabComponent /> {/* Add this line to include the TabComponent */}
    </BrowserRouter>
    </div>
  
  </StrictMode>,
)

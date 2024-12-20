import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FetchBalance from './pages/FetchBalance.tsx';
import WalletGenerator from './components/WalletGenerator.tsx';
import './index.css'
import App from './pages/App.tsx'
import CreateWallet from './pages/CreateWallet.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<CreateWallet />} />
        <Route path="/fetch" element={<FetchBalance />} />
      </Routes>
    </BrowserRouter>
  
  </StrictMode>,
)

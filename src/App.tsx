declare global {
  interface Window {
    woff: any
  }
}

import { useEffect, useState } from 'react'
import './App.css'
import { UserInfo } from './components/UserInfo'
import { RuntimeInfo } from './components/RuntimeInfo'
import { WoffInfo } from './components/WoffInfo'
import { UrlOpener } from './components/UrlOpener'
import { QRScanner } from './components/QRScanner'
import { ChatSender } from './components/ChatSender'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.woff.init({
      woffId: import.meta.env.VITE_WOFF_ID
    })
    .then(() => {
      console.log('WOFF SDK 初期化成功')
      console.log(window.woff.isLoggedIn())
      setIsLoggedIn(window.woff.isLoggedIn())
    })
    .catch((error: any) => {
      console.error('WOFF SDK 初期化エラー:', error)
    })
  }, []);

  const handleLogin = () => {
    window.woff.login({redirectUri: window.location.origin})
    setIsLoggedIn(window.woff.isLoggedIn())
  };

  const handleClose = () => {
    window.woff.closeWindow();
  };



  return (
    <div className="app-container">
      {isLoggedIn && (
        <button 
          onClick={handleClose}
          className="close-button"
        >
          WOFFを閉じる
        </button>
      )}
      <h1>WOFF アプリケーション</h1>
      {!isLoggedIn && (
        <button 
          onClick={handleLogin}
          className="login-button"
        >
          WOFFにログイン
        </button>
      )}
      {isLoggedIn && (
        <div className="info-grid">
          <UserInfo isLoggedIn={isLoggedIn} />
          <RuntimeInfo isLoggedIn={isLoggedIn} />
          <WoffInfo isLoggedIn={isLoggedIn} />
          <UrlOpener isLoggedIn={isLoggedIn} />
          <QRScanner isLoggedIn={isLoggedIn} />
          <ChatSender isLoggedIn={isLoggedIn} />
        </div>
      )}
    </div>
  )
}

export default App

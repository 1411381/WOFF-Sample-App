interface UrlOpenerProps {
  isLoggedIn: boolean;
}

export const UrlOpener = ({ isLoggedIn }: UrlOpenerProps) => {
  const handleOpenExternal = () => {
    window.woff.openWindow({
      url: "https://developers.worksmobile.com",
      external: true
    });
  };

  const handleOpenInternal = () => {
    window.woff.openWindow({
      url: "https://developers.worksmobile.com",
      external: false
    });
  };

  if (!isLoggedIn) return null;

  return (
    <div className="info-form">
      <h2>URLを開く</h2>
      <p className="subtitle">LINE WORKS Developersへ遷移します。</p>
      <div className="button-container">
        <button 
          onClick={handleOpenInternal}
          className="internal-button"
        >
          内部ブラウザで開く
        </button>
        <button 
          onClick={handleOpenExternal}
          className="external-button"
        >
          外部ブラウザで開く
        </button>
      </div>
    </div>
  );
}; 
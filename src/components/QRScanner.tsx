import { useState } from 'react';
import { CopyableInput } from './CopyableInput';

interface QRScannerProps {
  isLoggedIn: boolean;
}

export const QRScanner = ({ isLoggedIn }: QRScannerProps) => {
  const [qrResult, setQrResult] = useState<string>('');

  const handleScanQR = async () => {
    try {
      const result = await window.woff.scanQR();
      setQrResult(result.value);
    } catch (error) {
      console.error('QRコード読み取りエラー:', error);
      setQrResult('QRコードの読み取りに失敗しました');
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="info-form">
      <h2>QRコードを読み込む</h2>
      <div className="button-container">
        <button 
          onClick={handleScanQR}
          className="scan-button"
        >
          カメラ起動
        </button>
      </div>
      <CopyableInput 
        label="読み取り結果" 
        value={qrResult} 
      />
    </div>
  );
}; 
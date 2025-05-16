import { useState, useEffect } from 'react';
import { CopyableInput } from './CopyableInput';

interface RuntimeInfoProps {
  isLoggedIn: boolean;
}

interface RuntimeInfoState {
  os: string;
  version: string;
  language: string;
  worksVersion: string;
  isInClient: boolean;
}

export const RuntimeInfo = ({ isLoggedIn }: RuntimeInfoProps) => {
  const [runtimeInfo, setRuntimeInfo] = useState<RuntimeInfoState>({
    os: '',
    version: '',
    language: '',
    worksVersion: '',
    isInClient: false
  });

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([
        window.woff.getOS(),
        window.woff.getVersion(),
        window.woff.getLanguage(),
        window.woff.getWorksVersion(),
        window.woff.isInClient()
      ])
        .then(([os, version, language, worksVersion, isInClient]) => {
          setRuntimeInfo({
            os: os || '',
            version: version || '',
            language: language || '',
            worksVersion: worksVersion || '',
            isInClient: isInClient || false
          });
        })
        .catch((error: any) => {
          console.error('ランタイム情報取得エラー:', error);
        });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="info-form">
      <h2>動作環境情報</h2>
      <CopyableInput label="OS" value={runtimeInfo.os} />
      <CopyableInput label="バージョン" value={runtimeInfo.version} />
      <CopyableInput label="言語" value={runtimeInfo.language} />
      <CopyableInput label="LINE WORKSバージョン" value={runtimeInfo.worksVersion} />
      <CopyableInput label="LINE WORKS In-appブラウザ" value={runtimeInfo.isInClient ? 'はい' : 'いいえ'} />
    </div>
  );
}; 
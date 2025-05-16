import { useState, useEffect } from 'react';
import { CopyableInput } from './CopyableInput';

interface UserInfoProps {
  isLoggedIn: boolean;
}

interface UserInfoState {
  username: string;
  domain: string;
  userId: string;
}

export const UserInfo = ({ isLoggedIn }: UserInfoProps) => {
  const [userInfo, setUserInfo] = useState<UserInfoState>({
    username: '',
    domain: '',
    userId: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      window.woff.getProfile()
        .then((profile: any) => {
          setUserInfo({
            username: profile.displayName || '',
            domain: profile.domainId || '',
            userId: profile.userId || ''
          });
        })
        .catch((error: any) => {
          console.error('プロフィール取得エラー:', error);
        });
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="info-form">
      <h2>プロファイル</h2>
      <CopyableInput label="ユーザー名" value={userInfo.username} />
      <CopyableInput label="ドメイン" value={userInfo.domain} />
      <CopyableInput label="ユーザーID" value={userInfo.userId} />
    </div>
  );
}; 
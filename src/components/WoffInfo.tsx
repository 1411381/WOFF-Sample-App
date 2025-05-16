import { useState, useEffect } from 'react';
import { CopyableInput } from './CopyableInput';

interface WoffInfoProps {
  isLoggedIn: boolean;
}

interface WoffInfoState {
  viewType: string;
  endpointUri: string;
  clientId: string;
  clientType: string;
}

interface ChannelInfo {
  channelId: string;
}

export const WoffInfo = ({ isLoggedIn }: WoffInfoProps) => {
  const [woffInfo, setWoffInfo] = useState<WoffInfoState>({
    viewType: '',
    endpointUri: '',
    clientId: '',
    clientType: ''
  });
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>({
    channelId: ''
  });

  useEffect(() => {
    if (isLoggedIn) {
      try {
        const context = window.woff.getContext();
        window.woff.getChannelId()
        .then((channel: any) => {
          setChannelInfo({
            channelId: channel || ''
          });
          console.log(channel);
        });
        setWoffInfo({
          viewType: context.viewType || '',
          endpointUri: context.endpointUrl || '',
          clientId: context.clientId || '',
          clientType: context.clientType || ''
        });
      } catch (error) {
        console.error('WOFFアプリ情報取得エラー:', error);
      }
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) return null;

  return (
    <div className="info-form">
      <h2>WOFFアプリ情報</h2>
      <CopyableInput label="WOFFアプリサイズ" value={woffInfo.viewType} />
      <CopyableInput label="エンドポイントURI" value={woffInfo.endpointUri} />
      <CopyableInput label="Client ID" value={woffInfo.clientId} />
      <CopyableInput label="実行環境" value={woffInfo.clientType} />
      <CopyableInput label="チャンネルID" value={channelInfo.channelId} />
    </div>
  );
}; 
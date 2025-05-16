import { useState } from 'react';

interface ChatSenderProps {
  isLoggedIn: boolean;
}

export const ChatSender = ({ isLoggedIn }: ChatSenderProps) => {
  const [simpleMessage, setSimpleMessage] = useState<string>('');
  const [flexMessage, setFlexMessage] = useState<string>(defaultFlexMessage);


  const handleSendSimpleMessage = async () => {
    if (window.woff.isInClient()) {
      try {
        await window.woff.sendMessage({
          'content': simpleMessage
        });
        window.alert('Message sent');
      } catch (error) {
        window.alert('Error sending message：' + error);
      }
    }
  };

  const handleSendFlexMessage = async () => {
    if (window.woff.isInClient()) {
      try {
        await window.woff.sendFlexMessage({
          'flex': JSON.parse(flexMessage)
        });
        window.alert('Flex message sent');
      } catch (error) {
        window.alert('Error sending flex message：' + error);
      }
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="info-form">
      <h2>チャットを送る</h2>
      <p className="subtitle">LINE WORKSから起動時のみ利用可能</p>
      <div className="chat-container">
        <div className="chat-section">
          <div className="form-group">
            <label>シンプルメッセージ</label>
            <input
              type="text"
              value={simpleMessage}
              onChange={(e) => setSimpleMessage(e.target.value)}
              className="message-input"
              placeholder="シンプルメッセージを入力してください"
            />
          </div>
          <button 
            onClick={handleSendSimpleMessage}
            className="send-button"
          >
            送信
          </button>
        </div>
        <div className="chat-section">
          <div className="form-group">
            <label>Flexメッセージ</label>
            <textarea
              value={flexMessage}
              onChange={(e) => setFlexMessage(e.target.value)}
              className="flex-textarea"
              placeholder="Flexメッセージを入力してください"
              
            />
          </div>
          <button 
            onClick={handleSendFlexMessage}
            className="send-button"
          >
            送信
          </button>
        </div>
      </div>
    </div>
  );
}; 

const defaultFlexMessage = `{
            "type": "flex",
            "altText": "file.name",
            "contents": {
              "type": "bubble",
              "size": "kilo",
              "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "text",
                    "text": "Welcome to the team!",
                    "color": "#222222",
                    "weight": "bold",
                    "size": "md",
                    "align": "center"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "image",
                        "url": "https://i.ibb.co/26nhYVF/06-thomas-business-hr-staff.png",
                        "size": "sm",
                        "aspectMode": "cover",
                        "align": "center"
                      }
                    ],
                    "margin": "xxl",
                    "cornerRadius": "50px",
                    "borderWidth": "1px",
                    "borderColor": "#22222220",
                    "height": "60px",
                    "width": "60px",
                    "offsetStart": "85px",
                    "offsetEnd": "85px"
                  },
                  {
                    "type": "text",
                    "text": "Kyle Baron",
                    "weight": "bold",
                    "size": "lg",
                    "margin": "md",
                    "align": "center"
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "kylebaron@designer.com",
                        "size": "sm",
                        "color": "#666666",
                        "wrap": true,
                        "align": "center"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "Please edit your detail information.",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "wrap": true,
                    "align": "center",
                    "margin": "lg"
                  }
                ]
              },
              "footer": {
                "type": "box",
                "layout": "vertical",
                "spacing": "sm",
                "contents": [
                  {
                    "type": "button",
                    "style": "primary",
                    "height": "sm",
                    "action": {
                      "type": "uri",
                      "label": "Edit Profile",
                      "uri": "https://line-works.com/"
                    },
                    "color": "#2432AB"
                  }
                ],
                "flex": 0
              }
            }
          
          }`
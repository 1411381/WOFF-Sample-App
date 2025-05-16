import { useState } from 'react';

interface CopyableInputProps {
  value: string;
  label: string;
}

export const CopyableInput = ({ value, label }: CopyableInputProps) => {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  return (
    <div className="form-group">
      <label>{label}</label>
      <input 
        type="text" 
        value={value} 
        readOnly 
        className="readonly-input"
        onClick={handleClick}
        title="クリックでコピー"
      />
      {copied && (
        <div className="copy-message">
          コピーしました
        </div>
      )}
    </div>
  );
}; 
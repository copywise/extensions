import React, { useState } from 'react';
import { openUrl, showToast, log } from '@copywise/api';

export default ({ data }) => {
  log.debug(data);
  const text = data?.text || '';
  const [value] = useState(text);
  const handleGoogle = () => {
    openUrl(`https://www.google.com/search?q=${text}`);
  }

  const handleKiipu = () => {
    openUrl(`https://kiipu.com/inbox/q/${text}`);
  }

  const handleShowToast = () => {
    showToast({
      title: 'Toast',
      message: text,
      status: 'success'
    });
  }

  return (
    <div>
      <h1>关键词：{ value }</h1>
      <button onClick={handleGoogle}>在 Google 搜索</button>
      <button onClick={handleKiipu}>在 奇普书签 搜索</button>
      <button onClick={handleShowToast}>显示Toast</button>
    </div>
  );
};

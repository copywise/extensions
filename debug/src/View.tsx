import React, { useState } from 'react';
import { openUrl, showToast } from '@copywise/api';

export default ({ data }) => {
  const [value, setValue] = useState(data);
  const handleGoogle = () => {
    openUrl(`https://www.google.com/search?q=${data}`);
  }

  const handleKiipu = () => {
    openUrl(`https://kiipu.com/inbox/q/${data}`);
  }

  const handleShowToast = () => {
    showToast({
      title: 'Toast',
      message: 'Hello, world!',
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

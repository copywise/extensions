import { openUrl } from '@copywise/api';

export default ({ data }) => {
  const text = data?.text || '';

  // 获取当前日期和时间
  const date = new Date().toISOString().split('T')[0];
  
  // 构建笔记内容
  const noteContent = `
created:: ${date}
tags:: [Copywise]

${text}
`;

  openUrl(`logseq://x-callback-url/quickCapture?page=TODAY&content=${encodeURIComponent(noteContent)}&append`);
}

import { openUrl, openApp } from '@copywise/api';

export default ({ data }) => {
  // 获取当前日期并格式化为 YYYY-MM-DD
  const fileName = new Date().toISOString().split('T')[0];
  
  // 为每一行添加引用前缀
  const quotedContent = data
      .split('\n')
      .map((line: string) => `> ${line}`)
      .join('\n');
  
  // 构建笔记内容
  const timestamp = new Date().toLocaleString();
  const noteContent = `
---
created: ${timestamp}
tags: [Copywise]
---

> [!quote]
${quotedContent}
`;

  openUrl(`obsidian://new?file=Copywise/${fileName}.md&content=${encodeURIComponent(noteContent)}&append`);
}

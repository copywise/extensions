// src/Add.ts
import { openUrl } from "@copywise/api";
var Add_default = ({ data }) => {
  const fileName = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const quotedContent = data.split("\n").map((line) => `> ${line}`).join("\n");
  const timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
  const noteContent = `
---
created: ${timestamp}
tags: [Copywise]
---

> [!quote]
${quotedContent}
`;
  openUrl(`obsidian://new?file=Copywise/${fileName}.md&content=${encodeURIComponent(noteContent)}&append`);
};
export {
  Add_default as default
};

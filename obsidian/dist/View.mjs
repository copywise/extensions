// src/View.tsx
import React, { useState } from "react";
import { openUrl } from "@copywise/api";
var View_default = ({ data }) => {
  const [value, setValue] = useState(data);
  const handleGoogle = () => {
    openUrl(`https://www.google.com/search?q=${data}`);
  };
  const handleKiipu = () => {
    openUrl(`https://kiipu.com/inbox/q/${data}`);
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", null, "\u5173\u952E\u8BCD\uFF1A", value), /* @__PURE__ */ React.createElement("button", { onClick: handleGoogle }, "\u5728 Google \u641C\u7D22"), /* @__PURE__ */ React.createElement("button", { onClick: handleKiipu }, "\u5728 \u5947\u666E\u4E66\u7B7E \u641C\u7D22"));
};
export {
  View_default as default
};

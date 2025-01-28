// src/Search.ts
import { openUrl } from "@copywise/api";
var Search_default = ({ data }) => {
  openUrl(`https://www.google.com.hk/search?q=${data}`);
};
export {
  Search_default as default
};

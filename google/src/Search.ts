import { openUrl } from '@copywise/api';

export default ({ data }) => {
  openUrl(`https://www.google.com.hk/search?q=${data}`);
}

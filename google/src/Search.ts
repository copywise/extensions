import { openUrl } from '@copywise/api';

export default ({ data }) => {
  const text = data?.text || '';

  openUrl(`https://www.google.com.hk/search?q=${text}`);
}

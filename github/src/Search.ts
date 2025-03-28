import { openUrl } from '@copywise/api';

export default async ({ data }) => {
  const text = data?.text || '';

  openUrl(`https://github.com/search?q=${text}`);
}

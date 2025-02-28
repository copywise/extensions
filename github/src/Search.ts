import { openUrl } from '@copywise/api';

export default async ({ data }) => {
  openUrl(`https://github.com/search?q=${data}`);
}

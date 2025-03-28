import { showToast } from '@copywise/api';

export default async ({ data }) => {
  const text = data?.text || '';
  showToast({
    title: 'Debug',
    message: text,
    status: 'success'
  });
}

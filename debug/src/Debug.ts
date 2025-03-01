import { showToast } from '@copywise/api';

export default async ({ data }) => {
  showToast({
    title: 'Debug',
    message: data,
    status: 'success'
  });
}

import { showToast } from '@copywise/api';

export default async ({ data, preferences }) => {
  showToast({
    title: 'Saving...',
    message: data,
    status: 'loading'
  });
  
  await fetch(preferences.api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: data
    })
  });
}

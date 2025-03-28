import { showToast } from '@copywise/api';

export default async ({ data, preferences }) => {
  const text = data?.text || '';

  showToast({
    title: 'Saving...',
    message: text,
    status: 'loading'
  });
  
  await fetch(preferences.api, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content: text
    })
  });
}

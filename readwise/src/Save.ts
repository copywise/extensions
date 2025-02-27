import { showToast } from '@copywise/api';

export default async ({ data, preferences }) => {
  const response = await fetch('https://readwise.io/api/v2/highlights/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${preferences.token}`
    },
    body: JSON.stringify({
      'highlights': [
      {
        'text': data,
      },
    ]
    })
  });

  const result = await response.json();
  
  if (result && result[0] && result[0].highlights_url) {
    showToast({
      title: 'Save Succeeded',
      message: result[0].highlights_url,
      status: 'success'
    });
  } else {
    showToast({
      title: 'Save Failed',
      message: result.detail || 'Unknown error',
      status: 'error'
    });
  }
}

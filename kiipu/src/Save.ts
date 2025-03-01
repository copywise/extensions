import { openUrl, showToast } from '@copywise/api';

export default async ({ data, preferences }) => {
  showToast({
    title: 'Saving...',
    message: data,
    status: 'loading'
  });

  const response = await fetch('https://api.kiipu.com/v1/bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${preferences.token}`
    },
    body: JSON.stringify({
      url: data
    })
  });

  const result = await response.json();

  if (result.status.code === 200 && result.data) {
    showToast({
      title: 'Save Succeeded',
      message: result.data.url,
      status: 'success'
    });
  } else {
    showToast({
      title: 'Save Failed',
      message: result.status?.message || 'Unknown error',
      status: 'error'
    });
  }

  if (preferences.openAfterSave) {
    openUrl(`https://beta.kiipu.com`);
  }
}

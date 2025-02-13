export default async ({ data, preferences }) => {
  await fetch('https://readwise.io/api/v2/highlights/', {
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
}

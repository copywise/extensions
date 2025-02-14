export default async ({ data, preferences }) => {
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

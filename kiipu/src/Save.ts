export default async ({ data, preferences }) => {
  await fetch('https://api.kiipu.com/v1/bookmark', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${preferences.token}`
    },
    body: JSON.stringify({
      url: data
    })
  });
}

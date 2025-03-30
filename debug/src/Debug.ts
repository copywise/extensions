import { showToast, log } from '@copywise/api';

export default async ({ data, preferences }) => {
  const text = data?.text || '';
  try {
    showToast({
      title: 'Toast',
      message: 'Hello, world!',
      status: 'success'
    });

    log.debug("[debug] from ext: " + JSON.stringify(text));
  } catch(ex) {
    showToast({
      title: 'Toast',
      message: 'Hello, world!',
      status: 'success'
    });

    log.error("[debug] from ext: " + JSON.stringify(ex));
  }
}

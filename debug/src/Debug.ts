import { showToast, executeShell, log } from '@copywise/api';

export default async ({ data, preferences }) => {
  const text = data?.text || '';
  try {
    const ret = await executeShell({
      executableURL: "/bin/bash",
      arguments: [
          '-c',
          'open .'
      ],
      currentDirectoryURL: '~/Desktop'
    });

    log.debug("[debug] from ext: " + JSON.stringify(ret));
  } catch(ex) {
    log.error("[debug] from ext: " + JSON.stringify(ex));
  }
}

import { showToast, executeShell } from '@copywise/api';

export default async ({ data, preferences }) => {
    showToast({
        title: 'git clone',
        message: data,
        status: 'success'
    });

    try {
        const ret = await executeShell({
            executableURL: preferences.executableURL,
            arguments: [
                'clone',
                data
            ],
            currentDirectoryURL: preferences.currentDirectoryURL
        });
    
        showToast({
            title: 'succeedded!',
            message: JSON.stringify(ret),
            status: 'success'
        });
    } catch(ex) {
        showToast({
        title: 'Failed',
        message: 'Unknown error',
        status: 'error'
        });
    }
}

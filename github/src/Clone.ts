import { showToast, executeShell } from '@copywise/api';

export default async ({ data, preferences }) => {
    const text = data?.text || '';
    
    showToast({
        title: 'git clone',
        message: text,
        status: 'success'
    });

    try {
        const ret = await executeShell({
            executableURL: preferences.executableURL,
            arguments: [
                'clone',
                text
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

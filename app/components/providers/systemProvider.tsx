'use client';

import { AppSchema } from '@/lib/powersync/appSchema';
import { BackendConnector } from '@/lib/powersync/backendConnector';
import { PowerSyncContext } from '@powersync/react';
import { PowerSyncDatabase, WASQLiteOpenFactory, WASQLiteVFS } from '@powersync/web';
import Logger from 'js-logger';
import React, { Suspense } from 'react';

// eslint-disable-next-line react-hooks/rules-of-hooks
export const db = new PowerSyncDatabase({
    schema: AppSchema,
    database: new WASQLiteOpenFactory({
        dbFilename: 'exampleVFS.db',
        vfs: WASQLiteVFS.OPFSCoopSyncVFS,
        flags: {
            enableMultiTabs: typeof SharedWorker !== 'undefined',
            ssrMode: false
        }
    }),
    flags: {
        enableMultiTabs: typeof SharedWorker !== 'undefined',
    }
});

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
    const [connector] = React.useState(new BackendConnector());
    const [powerSync] = React.useState(db);

    React.useEffect(() => {
        // Linting thinks this is a hook due to it's name
        Logger.useDefaults(); // eslint-disable-line
        Logger.setLevel(Logger.DEBUG);

        // For console testing purposes
        (window as any)._powersync = powerSync;

        powerSync.init();
        powerSync.connect(connector);
    }, [powerSync, connector]);

    return (
        <Suspense>
            <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>
        </Suspense>
    );
};

export default SystemProvider;
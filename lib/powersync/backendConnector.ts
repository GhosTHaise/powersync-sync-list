import { v4 as uuid } from 'uuid';
import { AbstractPowerSyncDatabase, PowerSyncBackendConnector, UpdateType } from '@powersync/web';
import config from '../config';
const USER_ID_STORAGE_KEY = 'ps_user_id';

export class BackendConnector implements PowerSyncBackendConnector {
    readonly userId: string;

    constructor() {
        let userId = localStorage.getItem(USER_ID_STORAGE_KEY);
        if (!userId) {
            userId = uuid();
            localStorage.setItem(USER_ID_STORAGE_KEY, userId);
        }
        this.userId = userId;
    }

    async fetchCredentials() {
        const tokenEndpoint = 'api/auth';
        const res = await fetch(`/${tokenEndpoint}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.userId
            })
        });
    
        if (!res.ok) {
          throw new Error(`Received ${res.status} from ${tokenEndpoint}: ${await res.text()}`);
        }
    
        const {token , powersync_url} = await res.json();
    
        return {
          endpoint: powersync_url,
          token
        };
      }

    async uploadData(database: AbstractPowerSyncDatabase): Promise<void> {
        const transaction = await database.getNextCrudTransaction();
        const clientId = await database.getClientId();
        console.log("🚀 ~ BackendConnector ~ uploadData ~ clientId:", clientId)
        if (!transaction) {
            return;
        }

        try {
            for (const op of transaction.crud) {
                // The data that needs to be changed in the remote db
                const record = { ...op.opData, id: op.id };

                switch (op.op) {
                    case UpdateType.PUT:
                        const response = await fetch(`/api/lists/create`, {
                            method: 'POST',
                            body: JSON.stringify(record),
                        })
                        if (!response.ok) {
                            throw new Error(`Received ${response.status} from /api/data: ${await response.text()}`);
                        }
                        await transaction.complete(record.id);
                        break;
                    case UpdateType.PATCH:
                        // TODO: Instruct your backend API to PATCH a record
                        break;
                    case UpdateType.DELETE:
                        //TODO: Instruct your backend API to DELETE a record
                        break;
                }
            }
            await transaction.complete();
        } catch (error: any) {
            console.error(`Data upload error - discarding`, error);
            //await transaction.complete();
        }
    }
}
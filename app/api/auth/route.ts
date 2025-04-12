import config from '@/lib/config';
import { SignJWT, importJWK } from 'jose';

export const POST = async (req: Request) => {
    const { user_id } = await req.json();
    const { powersync } = config;

    const base64Keys = {
        private: powersync.privateKey as string,
        public: powersync.publicKey as string
    };

    const decodedPrivateKey = Buffer.from(base64Keys.private, 'base64');
    const powerSyncPrivateKey = JSON.parse(new TextDecoder().decode(decodedPrivateKey));

    const privateKey = {
        alg: powerSyncPrivateKey.alg,
        kid: powerSyncPrivateKey.kid,
        key: await importJWK(powerSyncPrivateKey)
    };

    const token = await new SignJWT({})
        .setProtectedHeader({
            alg: privateKey.alg,
            kid: privateKey.kid
        })
        .setSubject(user_id)
        .setIssuedAt()
        .setIssuer(config.powersync.jwtIssuer as string)
        .setAudience(config.powersync.url as string)
        .setExpirationTime('5m')
        .sign(privateKey.key);

    return Response.json({
        token: token,
        powersync_url: config.powersync.url
    });
}
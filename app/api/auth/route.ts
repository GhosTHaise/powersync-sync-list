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

    const aud = ["powersync-dev", config.powersync.url].filter((a) => a != null);

    const token = await new SignJWT({})
        .setProtectedHeader({
            alg: privateKey.alg,
            kid: privateKey.kid
        })
        .setSubject(user_id)
        .setIssuedAt()
        .setIssuer(config.powersync.jwtIssuer as string)
        .setAudience(aud)
        .setExpirationTime('5m')
        .sign(privateKey.key);

    return Response.json({
        token: token,
        powersync_url: config.powersync.url
    });
}

export const GET = async () => {
    const publicKey = config.powersync.publicKey as string;
    const decodedPublicKey = Buffer.from(publicKey, 'base64');
    const powersync_publicKey = JSON.parse(new TextDecoder().decode(decodedPublicKey));
    console.log("🚀 ~ GET ~ powersync_publicKey:", powersync_publicKey)
    
    return Response.json({
        keys : [powersync_publicKey]
    });
}
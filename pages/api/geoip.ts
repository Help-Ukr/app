import Log from '@uk/log';
import { NextApiHandler } from 'next';

const log = new Log('GEOIP');

const handler: NextApiHandler = async (req, resp) => {
    await log
        .try('request', async p => {
            const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            p.finally({ ip });
            const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,lat,lon`);
            const r = await res.json();
            p.finally({ r });
            if (r.status === 'success') {
                resp.json({ hdop: 5000, lat: r.lat, lng: r.lon });
            } else {
                resp.status(500).send(r.message);
            }
        })
        .catch(() => resp.status(502).end());
};

export default handler;

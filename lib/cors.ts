import { NextApiRequest, NextApiResponse } from 'next';
import { isSonghaiOrigin } from './songhai';

export function addCorsHeaders(req: NextApiRequest, res: NextApiResponse) {
  const origin = req.headers.origin;
  res.setHeader('Vary', 'Origin');
  if (typeof origin === 'string' && isSonghaiOrigin(origin)) {
    res.setHeader('Access-Control-Allow-Origin', new URL(origin).origin);
  }
}

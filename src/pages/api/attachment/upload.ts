import { requestUploadAttachment } from '@/apis/server/attachment';
import { getHeadersFromRequest } from '@/apis/server/request';
import _reduce from 'lodash/reduce'
import _isPlainObject from 'lodash/isPlainObject'
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const data = _isPlainObject(req.body)
        ? req.body
        : _reduce(req.body.split('&'), (r, i) => {
          const [key, data] = i.split('=')
          r[key] = decodeURIComponent(data)
          return r
        }, {})
      const result = await requestUploadAttachment(data, getHeadersFromRequest(req))
      return res.status(200).json(result)
    } catch (e) {
      return res.status(e.status).json(e.error)
    }
  }
}
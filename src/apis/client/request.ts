import _get from 'lodash/get'
import { join } from "path"
import _isArray from 'lodash/isArray'
import _reduce from 'lodash/reduce'

export const request = async (
  path: string,
  method: string,
  body?: any,
  isMultipart?: any,
) => {

  const headers = isMultipart
    ? {}
    : { 'Content-Type': 'application/json' }

  method = method || 'GET'
  let reqPath = join('/api', path)

  if (method === 'GET' && body) {
    const params = _reduce(body, (r, i, k) => {
      r.push(`${k}=${i}`)
      return r
    }, []).join('&')
    reqPath += `?${params}`
  }

  const res = await fetch(reqPath, {
    method: method.toUpperCase(),
    headers,
    body: method === 'GET'
      ? null
      : isMultipart ? body : JSON.stringify(body)
  })
  const resJson = await res.json()
  if (res.status < 200 || res.status >= 300) {
    if (resJson === "Forbidden resource") {
      return window.location.href = `/login?redirect_url=${window.location.pathname}`
    }
    throw new Error(_isArray(resJson)
      ? resJson[0]
      : resJson.message || resJson
    )
  }

  return resJson
}

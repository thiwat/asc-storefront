import { request } from "../request";

export const requestUploadAttachment = async (data: object, headers: object): Promise<unknown> => {
  return request(`v1/attachment/upload`, 'POST', data, headers)
}

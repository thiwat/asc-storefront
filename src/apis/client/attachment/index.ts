import { request } from "../request";
import { UploadAttachmentProps } from "./types";

export const requestUploadAttachment = async (data: UploadAttachmentProps): Promise<any> => {
  return request('/attachment/upload', 'POST', data)
}
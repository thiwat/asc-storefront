import { request } from "../request";
import { RequestMarkUsedTicketInput } from "./types";

export const requestMarkUsedTicket = async (data: RequestMarkUsedTicketInput): Promise<any> => {
  return request('v1/ticket/mark_used', 'PATCH', data)
}
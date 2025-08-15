import { request } from "../request";
import { RequestPlaceOrderProps } from "./types";

export const requestPlaceOrder = async (data: RequestPlaceOrderProps): Promise<unknown> => {
  return request(`order`, 'POST', data)
}

import { AuthLoginRequestI, AuthLoginResponseI } from '../dto/auth';
import { CommonResponseI } from '../dto/common';
import apiClient from '../http/HttpClient';

export const loginUser = async (params: {
  data: AuthLoginRequestI;
}): Promise<CommonResponseI<AuthLoginResponseI>> => {
  const res = await apiClient.post(`auth/login`, params.data);
  return res.data as CommonResponseI<AuthLoginResponseI>;
};

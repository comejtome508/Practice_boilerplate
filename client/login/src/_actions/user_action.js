import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';
export function loginUser(dataToSubmit) {
  //원래 loginPage안에서 server에 보내는 작업을 여기서 한다
  const request = axios
    .post('/api/users/login', dataToSubmit)
    .then((response) => response.data);

  //reducer로 보내줘야 함
  return {
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post('/api/users/register', dataToSubmit)
    .then((response) => response.data);

  return {
    type: REGISTER_USER,
    payload: request,
  };
}

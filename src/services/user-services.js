import { workAxios } from "./helper";

export const signUp=async (user)=>{
    const response = await workAxios.post('/user/signup', user);
    return response.data;
}

export const loginUser=async (loginDetail)=>{
    const response = await workAxios.post('/user/login', loginDetail);
    return response.data;
}
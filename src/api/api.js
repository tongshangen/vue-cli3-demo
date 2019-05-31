import { get, post } from "./request";

//登陆
export const login = login => post("api/login", login);
//上传
export const upload = upload => get("/api/get/upload", upload);
//getDate
export const getDate = params => post("/api/hello", params);

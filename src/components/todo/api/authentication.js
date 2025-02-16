import { apiClient } from "./apiclient";

export const excuteBasicAuthenticationService = (token) => {
    return apiClient.get("/jpa/basic_token_login", {
      headers: {
        Authorization: token,
      },
    });
  };
  


export const excuteJwtAuthenticationService = (username, password) => {
    return apiClient.post("/authenticate", {username, password});
  };
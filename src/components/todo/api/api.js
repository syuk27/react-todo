import { apiClient } from "./apiclient";

export const findUsers2 = () => apiClient.get("/jpa/find_users");

export function findUsers() {
  return apiClient.get("/jpa/find_users");
}

export const findUsersById = (id) => {
  console.log("id", id);
  return apiClient.get(`/jpa/find_users/${id}`);
};

export const delUsersById = (id) => {
  return apiClient.delete(`/jpa/del_users/${id}`);
};

export const modifyUsersById = (id, modiUser) => {
  console.log(id, modiUser);
  return apiClient.put(`/jpa/modify_users/${id}`, modiUser);
};

export const saveUser = (user) => {
    return apiClient.post(`/jpa/save_users`, user);
  };

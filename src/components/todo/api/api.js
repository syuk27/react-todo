import axios from "axios";

const apiClient = axios.create(
    {
        baseURL: "http://localhost:8080"
    }
)

export function findUsers() {
  return apiClient.get("/jpa/find_users");
}

export const findUsers2 = () =>
    apiClient.get("/jpa/find_users");

export const findUsersById = (id) => {
  console.log("id", id);
  return apiClient.get(`/jpa/find_users/${id}`);
}

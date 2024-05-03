import axios from "axios";
import { UserInfoStore } from "../stores/UserInfoStore";

export const DefaultApis = {
  instance: axios.create({
    baseURL:
      "http://52.79.143.148:8080/swagger-ui/index.html#/%EC%9C%A0%EC%A0%80/registerAndAuthenticateUser",
    withCredentials: true,
  }),

  /** get */
  get: async () => {
    try {
      const res = await DefaultApis.instance.get("/", {});
      return res.data;
    } catch (error) {
      console.error("Error fetching:", error);
      throw error;
    }
  },

  /** post */
  post: async () => {
    try {
      const res = await DefaultApis.instance.post("/update", {
        userId: UserInfoStore.getState().userId,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching: ", error);
      throw error;
    }
  },
};

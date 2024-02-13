// UserController.js

import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";

export const login = async (username, password) => {
  const requestBody = JSON.stringify({
    query: `mutation Login {
        login(input: { identifier: "${username}", password: "${password}" }) {
            jwt
            user {
                id
                username
                email
                confirmed
                blocked
                role {
                    id
                    name
                    description
                    type
                }
            }
        }
    }`,
  });
  const requestConfig = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios
      .post(`${BASE_URL}/`, requestBody, requestConfig)
      .then((res) => {
        if (res?.data) {
          console.log(res?.data);
          // saveUser(res?.data.data.jwt, res?.data.data.user);
          return res?.data;
        }
        return {};
      })
      .catch((err) => {
        return err;
      });

    return response;
  } catch (err) {
    alert(err);
    return false;
  }
};

export const logout = async () => {
  console.log(logout);
};

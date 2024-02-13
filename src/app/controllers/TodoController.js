import axios from "axios";
import { BASE_URL } from "../../constants/BASE_URL";
/**
 * add a todo to Strapi
 */
export const save = async (todo, token) => {
  const resquestBody = JSON.stringify({
    title: todo.title,
    description: todo.description,
    finished: todo.finished,
    user: todo.user.id,
  });

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .post(BASE_URL, resquestBody, requestConfig)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  console.log(response);
  return response;
};

export const edit = async (todo, token) => {
  const resquestBody = JSON.stringify({
    title: todo.title,
    description: todo.description,
    finished: todo.finished,
    user: todo.user.id,
  });

  const requestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .put(`${BASE_URL}/${todo.id}`, resquestBody, requestConfig)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  console.log(response);
  return response;
};

export const dismiss = async (todo, token) => {
  const requestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
  const response = await axios
    .get(`${BASE_URL}/${todo.id}`, requestConfig)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  console.log(response);
  return response;
};

export const getTodos = async (start, limit, token) => {
  const requestBody = JSON.stringify({
    query: `
      query Todos {
        todos(pagination: { start: ${start}, limit: ${limit} }) {
            data {
                id
                attributes {
                    Title
                    Description
                    finished
                    createdAt
                    updatedAt
                    publishedAt
                }
            }
            meta {
                pagination {
                    total
                    page
                    pageSize
                    pageCount
                }
            }
        }
    }`,
  });
  const requestConfig = {
    headers: {
      // Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios
    .post(`${BASE_URL}/`, requestBody, requestConfig)
    .then((res) => {
      if (res?.data) return res?.data;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });

  console.log(response);
  return response;
};

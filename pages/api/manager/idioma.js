import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getIdiomas: async () => {
    let { data: json } = await api.get(`/idiomas`);
    return json;
  },
};

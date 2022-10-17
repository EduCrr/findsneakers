import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  sendEmail: async (nome, email, mensagem, fotoField) => {
    let body = new FormData();
    body.append("nome", nome);
    body.append("email", email);
    body.append("mensagem", mensagem);

    if (fotoField.current.files.length > 0) {
      for (let i = 0; i < fotoField.current.files.length; i++) {
        body.append("att[]", fotoField.current.files[i]);
      }
    }

    let { data: json } = await api.post(`/email`, body);

    return json;
  },
};

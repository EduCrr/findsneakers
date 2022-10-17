import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  getSlides: async (lng = "pt") => {
    let { data: json } = await api.get(`/slides/${lng}`);
    return json;
  },
  getSlidesPrivate: async (token, lng = "pt") => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.get(`/private/slides/${lng}`);
    return json;
  },

  deleteSlide: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/slide/${id}`);
    return json;
  },

  addSlide: async (titulo, fotoField, responsiveField, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", titulo);

    if (fotoField) {
      body.append("imagem", fotoField);
    }

    if (responsiveField) {
      body.append("mobile", responsiveField);
    }

    let { data: json } = await api.post(`/slide`, body);
    return json;
  },

  changeVisivelSlide: async (id, check, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;
    let { data: json } = await api.post(`/slide/visivel/${id}`, {
      check,
    });
    return json;
  },
  getSingleSlide: async (id, lng = "pt") => {
    let { data: json } = await api.get(`/slide/private/${id}/${lng}`);
    return json;
  },

  updateSlide: async (title, id, token, lng = "pt") => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/slide/edit/${id}/${lng}`, body);

    return json;
  },

  updateSlideImagem: async (imagem, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (imagem) {
      body.append("imagem", imagem);
    }
    let { data: json } = await api.post(`/slide/imagem/${id}`, body);
    return json;
  },

  updateSlideImagemMobile: async (imagem, id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    if (imagem) {
      body.append("mobile", imagem);
    }
    let { data: json } = await api.post(`/slide/mobile/${id}`, body);
    return json;
  },
};

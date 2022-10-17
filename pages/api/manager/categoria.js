import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export default {
  //posts

  getCategories: async (lng = "pt") => {
    let { data: json } = await api.get(`/categories/${lng}`);
    return json;
  },

  getCategoriesPrivate: async (lng = "pt") => {
    let { data: json } = await api.get(`/categories/private/${lng}`);
    return json;
  },

  getCategoriesVisivelPrivate: async (link, lng = "pt") => {
    if (link === "categorias") {
      //posts
      let { data: json } = await api.get(`/categories/private/${lng}`);
      return json;
    }
    if (link === "categorias-produtos") {
      //produtos
      let { data: json } = await api.get(`/categories/product/private/${lng}`);
      return json;
    }
  },

  getSingleCategory: async (id, page = 1, link, lng = "pt") => {
    if (link === "posts") {
      let { data: json } = await api.get(
        `/categorie/${id}/${lng}?page=${page}`
      );
      return json;
    } else if (link === "produtos") {
      let { data: json } = await api.get(
        `/categorie/product/${id}/${lng}?page=${page}`
      );
      return json;
    }
  },
  getSingleCategoryEdit: async (id, lng = "pt") => {
    let { data: json } = await api.get(`/categorie/edit/${id}/${lng}`);
    return json;
  },

  createCat: async (title, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/categorie`, body);
    return json;
  },

  deleteCat: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/categorie/${id}`);
    return json;
  },

  changeVisivelCategory: async (id, check, link, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    if (link === "categorias") {
      let { data: json } = await api.post(`/categorie/visivel/${id}`, {
        check,
      });
      return json;
    } else if (link === "categorias-produtos") {
      let { data: json } = await api.post(`/categorie/product/visivel/${id}`, {
        check,
      });
      return json;
    }
  },

  updateCat: async (title, id, token, lng = "pt") => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/categorie/${id}/${lng}`, body);
    return json;
  },

  //categoria produtos

  getCategoriesProducts: async (lng = "pt") => {
    let { data: json } = await api.get(`/categories/product/${lng}`);
    return json;
  },

  findOneCategoryProducts: async (id = 0, lng = "pt", page = 1) => {
    let { data: json } = await api.get(
      `/categorie/product/index/${id}/${lng}?page=${page}`
    );
    return json;
  },

  deleteCatProduct: async (id, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let { data: json } = await api.delete(`/categorie/product/${id}`);
    return json;
  },

  getSingleCategoryProductEdit: async (id, lng = "pt") => {
    let { data: json } = await api.get(`/categorie/product/edit/${id}/${lng}`);
    return json;
  },

  createCatProducts: async (title, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(`/create/categorie/product`, body);
    return json;
  },

  updateCatProduct: async (title, id, token, lng = "pt") => {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    let body = new FormData();
    body.append("título", title);

    let { data: json } = await api.post(
      `/categorie/product/${id}/${lng}`,
      body
    );
    return json;
  },

  getCategoriesProductsPrivate: async (lng = "pt") => {
    let { data: json } = await api.get(`/categories/product/private/${lng}`);
    return json;
  },
  getCategoriesProductsIndex: async (id, lng = "pt") => {
    let { data: json } = await api.get(`/categorie/product/index/${id}/${lng}`);
    return json;
  },
};

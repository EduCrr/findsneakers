import * as C from "./styles";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion, dragConstraints } from "framer-motion";
import { useState, useEffect } from "react";
import categoria from "../../../pages/api/manager/categoria";
let page = 1;
export const Filter = ({ categories, products, locale }) => {
  const router = useRouter();
  const perPage = 3;
  const [currentPages, setCurrentPages] = useState(
    products.itens.next_page_url
  );
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(false);
  const [loadedContacts, setLoadedContacts] = useState([]);
  const [productsData, setProductsData] = useState(products.itens.data);
  const [pageFilter, setPageFilter] = useState(false);

  let path = products.path;

  const getProducts = async () => {
    page += 1;
    console.log(page);
    setMore(true);
    console.log(productsData.id_categoria);
    let json = await categoria.findOneCategoryProducts(
      productsData[0].id_categoria,
      locale,
      page
    );
    console.log(json);
    setLoadedContacts((prevState) => [...prevState, ...json.itens.data]);
    setCurrentPages(json.itens.next_page_url);
  };

  if (currentPages === null) {
    page = 1;
  }

  const easing = [0.6, -0.05, 0.01, 0.99];
  const fadeInUp = {
    initial: {
      y: 30,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
    // exit: {
    //   y: 120,
    //   opacity: 0,
    //   transition: {
    //     duration: 0.8,
    //     ease: easing,
    //   },
    // },
  };
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  const handleCategory = async (id) => {
    setPageFilter(true);
    setMore(false);
    page = 1;
    let json = await categoria.getCategoriesProductsIndex(id);
    console.log(json);
    setProductsData([]);
    setLoadedContacts([]);
    setProductsData(json.itens.data);
    setCurrentPages(json.itens.next_page_url);
  };

  return (
    <C.Content>
      <motion.div variants={stagger}>
        <div className="filters">
          <div className="left">
            {categories.categories.map((item, k) => (
              <span
                style={{ cursor: "pointer" }}
                onClick={() => handleCategory(item.id)}
                className={
                  item.id === productsData[0].id_categoria ? "active" : ""
                }
                key={k}
              >
                {item.lng.titulo}
              </span>
            ))}
          </div>
          <div className="right">filter</div>
        </div>
        <div className="products">
          {productsData.map((item, k) => (
            <motion.div
              initial={{ opacity: 0, translateX: k % 2 === 0 ? -80 : 80 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.4, delay: k * 0.2 }}
              exit={{ opacity: 0 }}
              className="productSingle"
              key={k}
            >
              <img src={`${path}/${item.capa}`} />
              <div class="info">
                <h4>{item.lng.titulo}</h4>
              </div>
            </motion.div>
          ))}
          {more && (
            <>
              {loadedContacts.map((item, k) => (
                <motion.div
                  initial={{ opacity: 0, translateX: k % 2 === 0 ? -80 : 80 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  transition={{ duration: 0.4, delay: k * 0.2 }}
                  exit={{ opacity: 0 }}
                  className="productSingle"
                  key={k}
                >
                  <img src={`${path}/${item.capa}`} />
                  <div class="info">
                    <h4>{item.lng.titulo}</h4>
                  </div>
                </motion.div>
              ))}
            </>
          )}
        </div>
        {currentPages === null ? (
          ""
        ) : (
          <button onClick={getProducts}>Carregar</button>
        )}
      </motion.div>
    </C.Content>
  );
};

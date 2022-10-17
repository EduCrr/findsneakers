import { Default } from "../../../../components/Manager/Default";
import * as C from "../../../../styles/Manager/categorias";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ModalSucess } from "../../../../components/Manager/ModalSucess";
import { ModalError } from "../../../../components/Manager/ModalError";
import categoria from "../../../api/manager/categoria";
import idioma from "../../../api/manager/idioma";

const Editar = ({ category, idiomas }) => {
  console.log(category);
  const [title, setTitle] = useState(category.lng.titulo);
  const { data: session } = useSession();
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");
  const [lng, setLng] = useState("pt");
  let pathIdiomas = idiomas.path;

  const handleForm = async (e) => {
    e.preventDefault();

    let json = await categoria.updateCat(
      title,
      category.id,
      session.user.token,
      lng
    );
    if (json.error === "") {
      setModalSucess(true);
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
    }
  };

  const handleIdiomas = async (e) => {
    setLng(e);
    let json = await categoria.getSingleCategoryEdit(category.id, e);
    if (json.category.lng === null) {
      setTitle("");
    } else {
      setTitle(json.category.lng.titulo);
    }
  };
  return (
    <Default>
      <C.Content>
        <motion.div initial="hidden" animate="enter" exit="exit">
          <div className="idiomas">
            <select
              className="selectIdiomas"
              onChange={(e) => handleIdiomas(e.target.value)}
            >
              {idiomas[0].map((item, k) => (
                <option value={item.codigo} key={k}>
                  {item.nome}
                </option>
              ))}
            </select>
            <img src={`${pathIdiomas}/${lng}.png`} />
          </div>
          <form className="globalForm" onSubmit={handleForm}>
            <p className="nameInput">Título</p>
            <div className="maxLength">
              ({title.length}/{128})
            </div>
            <input
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">Atualizar</button>
          </form>
        </motion.div>
      </C.Content>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
    </Default>
  );
};

export const getServerSideProps = async (context) => {
  const { category } = await categoria.getSingleCategoryEdit(context.query.id);
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const idiomas = await idioma.getIdiomas();
  if (!session) {
    return {
      redirect: {
        destination: "/manager/login",
        permanent: true,
      },
    };
  }

  return {
    props: {
      category,
      idiomas,
    },
  };
};

export default Editar;

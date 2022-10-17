import { Default } from "../../../components/Manager/Default";
import { Itens } from "../../../components/Manager/Itens";
import { Content } from "../../../components/Manager/Content";
import { motion } from "framer-motion";
import contentApi from "../../api/manager/contentApi";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import paginaApi from "../../api/manager/paginaApi";
import idioma from "../../api/manager/idioma";

const Home = ({ contents, pagina, idiomas }) => {
  return (
    <Default>
      <motion.div initial="hidden" animate="enter" exit="exit">
        <Content contents={contents} pagina={pagina} idiomas={idiomas} />
      </motion.div>
    </Default>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
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
  const contents = await contentApi.getCotentHome("home");
  const pagina = await paginaApi.getPagina("home");
  return {
    props: {
      contents,
      pagina,
      idiomas,
    },
  };
};

import { Default } from "../../../../components/Manager/Default";
import * as C from "../../../../styles/Manager/editar";
import { useState } from "react";
import { motion } from "framer-motion";
import slidesApi from "../../../api/manager/slidesApi";
import { useRouter } from "next/router";
import { CropFiles } from "../../../../components/Manager/CropFiles";
import { CropItens } from "../../../../components/Manager/CropItens";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { AnimatePresence } from "framer-motion";
import { ModalSucess } from "../../../../components/Manager/ModalSucess";
import { ModalError } from "../../../../components/Manager/ModalError";
import idioma from "../../../api/manager/idioma";

const Editar = ({ slide, idiomas }) => {
  const [title, setTitle] = useState(slide.slide.lng.titulo);
  let pathIdiomas = idiomas.path;

  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");
  const [lng, setLng] = useState("pt");
  const [extensionImg, setExtensionImg] = useState("");

  //slide
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

  //slide mobile
  const [showCropResponsive, setShowCropResponsive] = useState(false);
  const [resultResponsive, setResultResponsive] = useState(null);

  let id = slide.slide.id;
  let path = slide.path;

  const router = useRouter();
  const { data: session } = useSession();

  function b64toBlob(dataURI) {
    if (dataURI !== null) {
      var byteString = atob(dataURI.split(",")[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);

      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: extensionImg });
    }
  }

  const handleSaveForm = async (e) => {
    e.preventDefault();

    let json = await slidesApi.updateSlide(title, id, session.user.token, lng);
    let imagem = b64toBlob(resultBanner);
    let mobile = b64toBlob(resultResponsive);

    let jsonImagem = await slidesApi.updateSlideImagem(
      imagem,
      id,
      session.user.token
    );
    let jsonImagemMobile = await slidesApi.updateSlideImagemMobile(
      mobile,
      id,
      session.user.token
    );
    if (json.error === "") {
      setModalSucess(true);
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
    }

    if (jsonImagemMobile.error === "") {
      setModalSucess(true);
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(jsonImagemMobile.error);
    }

    if (jsonImagem.error === "") {
      setModalSucess(true);
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(jsonImagem.error);
    }
  };

  const handleIdiomas = async (e) => {
    setLng(e);
    let json = await slidesApi.getSingleSlide(id, e);
    if (json.slide.lng === null) {
      setTitle("");
    } else {
      setTitle(json.slide.lng.titulo);
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
          <form className="globalForm" onSubmit={handleSaveForm}>
            <p className="nameInput">Título</p>
            <div className="maxLength">
              ({title.length}/{255})
            </div>
            <input
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Banner"
              path={`${path}/${slide.slide.imagem}`}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
              setExtensionImg={setExtensionImg}
            />
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultResponsive}
              name="Imagem responsiva"
              path={`${path}/${slide.slide.imagem_responsive}`}
              setShowCropImg={setShowCropResponsive}
              setResult={setResultResponsive}
              setExtensionImg={setExtensionImg}
            />
            <button type="submit">Salvar</button>
          </form>
        </motion.div>
        <AnimatePresence exitBeforeEnter>
          {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
        </AnimatePresence>
        <AnimatePresence exitBeforeEnter>
          {modalErro && (
            <ModalError setModalErro={setModalErro} text={textErro} />
          )}
        </AnimatePresence>
      </C.Content>

      <CropItens
        srcImg={srcImg}
        showCropImg={showCropBanner}
        image={image}
        setImage={setImage}
        w="432"
        h="432"
        setResult={setResultBanner}
        setShowCropImg={setShowCropBanner}
        setChangeBanner={setChangeBanner}
        extensionImg={extensionImg}
      />

      <CropItens
        srcImg={srcImg}
        showCropImg={showCropResponsive}
        image={image}
        setImage={setImage}
        w="768"
        h="1080"
        setResult={setResultResponsive}
        setShowCropImg={setShowCropResponsive}
        setChangeBanner={setChangeBanner}
        extensionImg={extensionImg}
      />
    </Default>
  );
};

export const getServerSideProps = async (context) => {
  const slide = await slidesApi.getSingleSlide(context.query.id);
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
      slide,
      idiomas,
    },
  };
};

export default Editar;

import { Default } from "../../../components/Manager/Default";
import * as C from "../../../components/Manager/FormContentSingle/styles";
import { useState, useEffect, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import slidesApi from "../../api/manager/slidesApi";
import { CropItens } from "../../../components/Manager/CropItens";
import { CropFiles } from "../../../components/Manager/CropFiles";
import { authOptions } from "../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ModalSucess } from "../../../components/Manager/ModalSucess";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../../../components/Manager/ModalError";

const Adicionar = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");
  const [extensionImg, setExtensionImg] = useState("");

  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);

  //slide
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

  //slide mobile
  const [showCropResponsive, setShowCropResponsive] = useState(false);
  const [resultResponsive, setResultResponsive] = useState(null);

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

  const handleForm = async (e) => {
    e.preventDefault();
    let slide = b64toBlob(resultBanner);
    let mobile = b64toBlob(resultResponsive);
    const json = await slidesApi.addSlide(
      title,
      slide,
      mobile,
      session.user.token
    );

    if (json.error === "") {
      setModalSucess(true);
      setTitle("");
      setResultBanner(null);
      setResultResponsive(null);

      return;
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
      return;
    }
  };

  return (
    <Default>
      <C.Content>
        <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          style={{ padding: "0px 20px" }}
        >
          <form className="globalForm" onSubmit={handleForm}>
            <div className="maxLength">
              ({title.length}/{255})
            </div>
            <input
              placeholder="Título"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Banner"
              path={``}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
              setExtensionImg={setExtensionImg}
            />
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultResponsive}
              name="Imagem responsiva"
              path={``}
              setShowCropImg={setShowCropResponsive}
              setResult={setResultResponsive}
              setExtensionImg={setExtensionImg}
            />

            <button type="submit">Adicionar Slide</button>
          </form>
        </motion.div>
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

export default Adicionar;

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/manager/login",
        permanent: true,
      },
    };
  }
  return {
    props: {},
  };
};

//setar extensionImg setExtensionImg

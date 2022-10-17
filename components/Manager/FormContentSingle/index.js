import * as C from "./styles";
import { useState, useEffect, useRef } from "react";
import { FaFileAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { useSession } from "next-auth/react";
import { CropFiles } from "../CropFiles";
import { CropItens } from "../CropItens";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../ModalError";
import contentApi from "../../../pages/api/manager/contentApi";
import { ModalSucess } from "../ModalSucess";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export const FormContentSingle = ({ dataItens, path, idiomas }) => {
  const [description, setDescription] = useState(dataItens.lng.descricao);
  const [title, setTitle] = useState(dataItens.lng.titulo);
  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);
  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);
  const [wI, setWI] = useState(dataItens.largura_imagem);
  const [hE, setHE] = useState(dataItens.altura_imagem);
  //responsive
  const [showCropResponsive, setShowCropResponsive] = useState(false);
  const [resultResponsive, setResultResponsive] = useState(null);
  const { data: session } = useSession();
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");
  const [lng, setLng] = useState("pt");
  let pathIdiomas = idiomas.path;
  const [extensionImg, setExtensionImg] = useState("");

  const opitons = {
    mode: "classic",
    rtl: false,
    katex: "window.katex",
    videoFileInput: true,
    tabDisable: false,
    buttonList: [
      [
        "undo",
        "redo",
        "formatBlock",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "link",
        "removeFormat",
        "lineHeight",
        "fullScreen",
        "preview",
      ],
    ],
  };

  function handleChange(text) {
    setDescription(text);
  }

  console.log(dataItens);

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

  const handleContentUpdate = async (e) => {
    e.preventDefault();

    if (
      dataItens.parametros.descricao === 1 &&
      description === "<h1><br></h1>"
    ) {
      setModalSucess(false);
      setModalErro(true);
      setTextErro("Preencha todos os campos");
      return;
    }

    if (
      title !== "" ||
      description !== "" ||
      resultBanner !== null ||
      resultResponsive !== null
    ) {
      let json = await contentApi.updateContent(
        title,
        description,
        dataItens.id,
        session.user.token,
        lng
      );
      let imagem = b64toBlob(resultBanner);
      let imagemResponsive = b64toBlob(resultResponsive);

      let jsonImagem = await contentApi.updateContentImagem(
        imagem,
        dataItens.id,
        session.user.token
      );
      console.log(jsonImagem);
      let jsonImagemResponsive = await contentApi.updateContentImagemResponsive(
        imagemResponsive,
        dataItens.id,
        session.user.token
      );

      if (json.error !== "") {
        setModalSucess(false);
        setModalErro(true);
        setTextErro(json.error);
        return;
      } else {
        setModalSucess(true);
      }
    } else {
      setModalSucess(false);
      setModalErro(true);
      setTextErro("Preencha todos os campos");
    }
  };

  const handleIdiomas = async (e) => {
    setLng(e);
    let json = await contentApi.getCotentId(dataItens.id, e);
    console.log(json);
    if (json.content.lng === null) {
      setTitle("");
      setDescription("");
    } else {
      setTitle(json.content[0].lng.titulo);
      setDescription("");
      setDescription(json.content[0].lng.descricao);
    }
  };

  return (
    <C.Content>
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
      <form onSubmit={handleContentUpdate} className="globalForm">
        {dataItens.parametros.titulo === 1 ? (
          <>
            <div className="maxLength">
              ({title.length}/{255})
            </div>
            <input
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </>
        ) : (
          ""
        )}

        {dataItens.parametros.descricao === 1 ? (
          <SunEditor
            setOptions={opitons}
            setContents={description}
            onChange={handleChange}
            value={description}
            defaultValue={description}
            placeholder="Escreva aqui..."
          />
        ) : (
          ""
        )}
        {dataItens.parametros.imagem === 1 ? (
          <>
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Imagem"
              id={dataItens.id}
              path={`${path}/${dataItens.imagem}`}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
              setExtensionImg={setExtensionImg}
            />

            <CropItens
              srcImg={srcImg}
              showCropImg={showCropBanner}
              image={image}
              setImage={setImage}
              w={wI}
              h={hE}
              setResult={setResultBanner}
              setShowCropImg={setShowCropBanner}
              setChangeBanner={setChangeBanner}
              extensionImg={extensionImg}
            />
          </>
        ) : (
          ""
        )}

        {dataItens.parametros.imagem_responsive === 1 ? (
          <>
            <CropFiles
              setSrcImg={setSrcImg}
              result={resultResponsive}
              name="Imagem responsiva"
              id={dataItens.id}
              path={`${path}/${dataItens.imagem_responsive}`}
              setShowCropImg={setShowCropResponsive}
              setResult={setResultResponsive}
              setExtensionImg={setExtensionImg}
            />

            <CropItens
              srcImg={srcImg}
              showCropImg={showCropResponsive}
              image={image}
              setImage={setImage}
              w="680"
              h="1180"
              setResult={setResultResponsive}
              setShowCropImg={setShowCropResponsive}
              setChangeBanner={setChangeBanner}
              extensionImg={extensionImg}
            />
          </>
        ) : (
          ""
        )}

        <button type="submit">Salvar</button>
      </form>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
    </C.Content>
  );
};

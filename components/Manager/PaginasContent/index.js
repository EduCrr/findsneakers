import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as C from "./styles";
import { CropFiles } from "../CropFiles";
import { CropItens } from "../CropItens";
import { AnimatePresence } from "framer-motion";
import { ModalError } from "../ModalError";
import { ModalSucess } from "../ModalSucess";
import { useSession } from "next-auth/react";
import paginaApi from "../../../pages/api/manager/paginaApi";

export const PaginasContent = ({ pagina, modalPagina, idiomas }) => {
  const [titulo, setTitulo] = useState(pagina.lng.titulo);
  const [descricao, setDescricao] = useState(pagina.lng.descricao);
  const [tituloCom, setTituloCom] = useState(
    pagina.lng.titulo_compartilhamento
  );
  const [descricaoCom, setDescricaoCom] = useState(
    pagina.lng.descricao_compartilhamento
  );
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");
  const [lng, setLng] = useState("pt");
  const [extensionImg, setExtensionImg] = useState("");

  let pathIdiomas = idiomas.path;

  let path = pagina.path;
  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);

  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

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

    let json = await paginaApi.updatePagina(
      titulo,
      descricao,
      tituloCom,
      descricaoCom,
      pagina.id,
      session.user.token,
      lng
    );
    let imagem = b64toBlob(resultBanner);

    let jsonImagem = await paginaApi.updatePaginaImagem(
      imagem,
      pagina.id,
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
  };

  const handleIdiomas = async (e) => {
    setLng(e);
    let json = await paginaApi.getPagina(pagina.controladora, e);
    if (json.lng === null) {
      setTitulo("");
      setDescricao("");
      setTituloCom("");
      setDescricaoCom("");
    } else {
      setTitulo(json.lng.titulo);
      setDescricao(json.lng.descricao);
      setTituloCom(json.lng.titulo_compartilhamento);
      setDescricaoCom(json.lng.descricao_compartilhamento);
    }
  };

  return (
    <>
      <C.Content modalPagina={modalPagina}>
        <div className="paginas">
          <div className="contentPaginas">
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
              <input
                placeholder="Título"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <textarea
                placeholder="Descrição"
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
              <input
                placeholder="Título compartilhamento"
                type="text"
                value={tituloCom}
                onChange={(e) => setTituloCom(e.target.value)}
              />
              <textarea
                placeholder="Descrição compartilhamento"
                value={descricaoCom}
                onChange={(e) => setDescricaoCom(e.target.value)}
                type="text"
              />
              <CropFiles
                setSrcImg={setSrcImg}
                result={resultBanner}
                name="Imagem"
                path={`${path}/${pagina.imagem}`}
                setShowCropImg={setShowCropBanner}
                setResult={setResultBanner}
                setExtensionImg={setExtensionImg}
              />
              <button type="submit">Salvar</button>
            </form>
          </div>
        </div>
      </C.Content>
      <AnimatePresence exitBeforeEnter>
        {modalSucess && <ModalSucess setModalSucess={setModalSucess} />}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter>
        {modalErro && (
          <ModalError setModalErro={setModalErro} text={textErro} />
        )}
      </AnimatePresence>
      <CropItens
        srcImg={srcImg}
        showCropImg={showCropBanner}
        image={image}
        setImage={setImage}
        w="1280"
        h="720"
        setResult={setResultBanner}
        setShowCropImg={setShowCropBanner}
        setChangeBanner={setChangeBanner}
        extensionImg={extensionImg}
      />
    </>
  );
};

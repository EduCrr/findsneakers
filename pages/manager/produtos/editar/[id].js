import { Default } from "../../../../components/Manager/Default";
import * as C from "../../../../styles/Manager/editar";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "suneditor/dist/css/suneditor.min.css";
import { FaTrash, FaFileAlt } from "react-icons/fa";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import { Modal } from "../../../../components/Manager/Modal";
import { CropFiles } from "../../../../components/Manager/CropFiles";
import { CropItens } from "../../../../components/Manager/CropItens";
import { authOptions } from "../../../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { ModalSucess } from "../../../../components/Manager/ModalSucess";
import { ModalError } from "../../../../components/Manager/ModalError";
import produtoApi from "../../../api/manager/produtoApi";
import categoria from "../../../api/manager/categoria";
import idioma from "../../../api/manager/idioma";
const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const Editar = ({ product, idiomas }) => {
  const [imgFile, setImgFile] = useState([]);
  const [bannerFile, setBannerFile] = useState();
  const [description, setDescription] = useState(product.product.lng.descricao);
  const [categorys, setCategorys] = useState([]);
  const [produto, setProduto] = useState(product.product);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState(product.product.lng.titulo);
  const [tituloPagina, setTituloPagina] = useState(
    product.product.lng.titulo_pagina
  );
  const [tituloCom, setTituloCom] = useState(
    product.product.lng.descricao_pagina
  );
  const [descricaoPagina, setDescricaoPagina] = useState(
    product.product.lng.titulo_compartilhamento
  );
  const [descricaoCom, setDescricaoCom] = useState(
    product.product.lng.descricao_compartilhamento
  );

  const [idImgDel, setIdImgDel] = useState(null);
  const [activeCategory, setActiveCategory] = useState(
    product.product.id_categoria
  );
  const [modalSucess, setModalSucess] = useState(false);
  const [modalErro, setModalErro] = useState(false);
  const [textErro, setTextErro] = useState("");
  const [lng, setLng] = useState("pt");
  const [extensionImg, setExtensionImg] = useState("");

  //Crop
  const [srcImg, setSrcImg] = useState(null);
  const [image, setImage] = useState(null);
  const [changeBanner, setChangeBanner] = useState(false);

  //banner
  const [showCropBanner, setShowCropBanner] = useState(false);
  const [resultBanner, setResultBanner] = useState(null);

  //capa
  const [showCropCapa, setShowCropCapa] = useState(false);
  const [resultCapa, setResultCapa] = useState(null);

  let id = product.product.id;
  let pathImagens = product.pathImagens;
  let pathBanner = product.pathBanner;
  let pathCapa = product.pathCapa;
  const router = useRouter();
  let fotoField = useRef();
  const { data: session } = useSession();
  let pathIdiomas = idiomas.path;
  const onImageChange = (e) => {
    const imgs = e.target.files;
    setImgFile([]);
    if (imgs) {
      for (let files of imgs) {
        setImgFile((oldArray) => [...oldArray, URL.createObjectURL(files)]);
      }
      console.log(imgFile);
    } else {
      setImgFile();
    }
  };

  useEffect(() => {
    const categories = async () => {
      let json = await categoria.getCategoriesProductsPrivate();
      if (json.error !== "") {
        console(json.error);
      } else {
        setCategorys(json.categories);
      }
    };
    categories();
  }, []);

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
        "paragraphStyle",
        "blockquote",
        "bold",
        "underline",
        "italic",
        "strike",
        "fontColor",
        "hiliteColor",
        "textStyle",
        "removeFormat",
        "outdent",
        "indent",
        "align",
        "list",
        "lineHeight",
        "link",
        "fullScreen",
        "showBlocks",
        "codeView",
        "preview",
      ],
    ],
  };

  function handleChange(text) {
    setDescription(text);
  }

  const handlePhotos = async (e) => {
    e.preventDefault();
    setLoading(true);
    let json = await produtoApi.updateImage(fotoField, id, session.user.token);
    if (json.error !== "") {
      setModalErro(true);
      setTextErro("N??o foi poss??vel adicionar uma imagem!");
      setImgFile([]);
      setLoading(false);
    } else {
      setModalSucess(true);
      setLoading(false);
      setImgFile([]);
      let jsonproduct = await produtoApi.getSingleProduct(id);
      setProduto(jsonproduct.product);
    }
  };

  const handleDeleteImg = async (id) => {
    setModal(!modal);
    setIdImgDel(id);
  };

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

    let json = await produtoApi.updateProduct(
      title,
      tituloPagina,
      tituloCom,
      descricaoPagina,
      descricaoCom,
      description,
      activeCategory,
      id,
      session.user.token,
      lng
    );
    if (json.error !== "") {
      setModalSucess(false);
      setModalErro(true);
      setTextErro(json.error);
      return;
    } else {
      if (changeBanner === true && resultBanner !== null) {
        let banner = b64toBlob(resultBanner);
        let json = await produtoApi.updateBannerProduct(
          banner,
          id,
          session.user.token
        );
        if (json.error !== "") {
          setModalErro(true);
          setTextErro(
            "Ocorreu algum erro ao inserir a imagem, tente novamente!"
          );
          setBannerFile(`${pathBanner}/${produto.banner}`);
          setChangeBanner(false);
          return;
        } else {
          setChangeBanner(false);
        }
      }

      if (changeBanner === true && resultCapa !== null) {
        let capa = b64toBlob(resultCapa);
        let json = await produtoApi.updateCapaProduct(
          capa,
          id,
          session.user.token
        );
        if (json.error !== "") {
          alert(json.error);
          setBannerFile(`${pathBanner}/${produto.capa}`);
          setChangeBanner(false);
          return;
        } else {
          setChangeBanner(false);
        }
      }
      setModalSucess(true);
    }
  };

  const handleIdiomas = async (e) => {
    setLng(e);
    let json = await produtoApi.getSingleProduct(id, e);
    if (json.product.lng === null) {
      setTitle("");
      setTituloPagina("");
      setDescription("");
      setTituloCom("");
      setDescricaoPagina("");
      setDescricaoCom("");
    } else {
      setTitle(json.product.lng.titulo);
      setTituloPagina(json.product.lng.titulo_pagina);
      setDescription(json.product.lng.descricao);
      setTituloCom(json.product.lng.titulo_compartilhamento);
      setDescricaoPagina(json.product.lng.descricao_pagina);
      setDescricaoCom(json.product.lng.descricao_compartilhamento);
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
            <p className="nameInput">T??tulo</p>
            <div className="maxLength">
              ({title.length}/{255})
            </div>
            <input
              placeholder="Titulo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="nameInput">Categoria</p>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              {categorys.map((item, k) => (
                <option key={k} value={item.id}>
                  {item.lng.titulo}
                </option>
              ))}
            </select>

            <p className="nameInput">Descri????o</p>
            <SunEditor
              setContents={description}
              setOptions={opitons}
              value={description}
              defaultValue={description}
              onChange={handleChange}
              placeholder="Escreva aqui..."
            />

            <CropFiles
              setSrcImg={setSrcImg}
              result={resultBanner}
              name="Banner"
              path={`${pathBanner}/${produto.banner}`}
              setShowCropImg={setShowCropBanner}
              setResult={setResultBanner}
              setExtensionImg={setExtensionImg}
            />

            <CropFiles
              setSrcImg={setSrcImg}
              result={resultCapa}
              name="capa"
              path={`${pathCapa}/${produto.capa}`}
              setShowCropImg={setShowCropCapa}
              setResult={setResultCapa}
              setExtensionImg={setExtensionImg}
            />
            <p className="nameInput">T??tulo da p??gina</p>
            <div className="maxLength">
              ({tituloPagina.length}/{60})
            </div>
            <input
              placeholder="T??tulo da p??gina"
              type="text"
              value={tituloPagina}
              onChange={(e) => setTituloPagina(e.target.value)}
            />
            <p className="nameInput">Descri????o da p??gina</p>
            <textarea
              placeholder="Descri????o da p??gina"
              type="text"
              value={descricaoPagina}
              onChange={(e) => setDescricaoPagina(e.target.value)}
            />
            <p className="nameInput">T??tulo exibido ao compartilhar</p>
            <div className="maxLength">
              ({tituloCom.length}/{60})
            </div>
            <input
              placeholder="T??tulo exibido ao compartilhar"
              type="text"
              value={tituloCom}
              onChange={(e) => setTituloCom(e.target.value)}
            />
            <p className="nameInput">Descri????o exibida ao compartilhar</p>
            <textarea
              placeholder="Descri????o exibida ao compartilhar"
              type="text"
              value={descricaoCom}
              onChange={(e) => setDescricaoCom(e.target.value)}
            />

            <button type="submit">Salvar</button>
          </form>
          <form className="globalForm" onSubmit={handlePhotos}>
            <div className="addImg">
              <h3>Imagens</h3>
              <input
                type="file"
                id="file"
                multiple
                ref={fotoField}
                onChange={onImageChange}
                style={{ display: "none" }}
              />
              {imgFile === 1 && <p>{imgFile} imagem selecionada</p>}
              {imgFile > 1 && <p>{imgFile} imagens selecionadas</p>}
              <label htmlFor="file">
                <div className="bt" htmlFor="file">
                  Nova imagem
                </div>
              </label>
            </div>

            {loading === true ? "Carregando" : ""}
            <div className="containerImgs">
              {produto.imagens.map((item, k) => (
                <div className="contentImgs" key={k}>
                  <div className="photo">
                    <img alt="" src={`${pathImagens}/${item.imagem}`} />
                  </div>
                  <div className="btns">
                    <div
                      className="delPhoto"
                      onClick={() => handleDeleteImg(item.id)}
                    >
                      <FaTrash size={14} />
                    </div>
                  </div>
                </div>
              ))}
              {imgFile !== "" &&
                imgFile.map((item, k) => (
                  <div
                    className="contentImgs"
                    key={k}
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="photo">
                      <img alt="" src={item} />
                    </div>
                    <div className="btns"></div>
                  </div>
                ))}
            </div>
            <div>
              <button
                style={{
                  marginLeft: "auto",
                  marginRight: "0",
                  display: "block",
                }}
                type="submit"
              >
                Salvar
              </button>
            </div>
          </form>
          <AnimatePresence exitBeforeEnter>
            {modal && (
              <Modal
                setModal={setModal}
                id={idImgDel}
                type="images"
                token={session.user.token}
              />
            )}
          </AnimatePresence>
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
      <CropItens
        srcImg={srcImg}
        showCropImg={showCropBanner}
        image={image}
        setImage={setImage}
        w="1920"
        h="810"
        setResult={setResultBanner}
        setShowCropImg={setShowCropBanner}
        setChangeBanner={setChangeBanner}
        extensionImg={extensionImg}
      />
      <CropItens
        srcImg={srcImg}
        showCropImg={showCropCapa}
        image={image}
        setImage={setImage}
        w="550"
        h="550"
        setResult={setResultCapa}
        setShowCropImg={setShowCropCapa}
        setChangeBanner={setChangeBanner}
        extensionImg={extensionImg}
      />
    </Default>
  );
};

export const getServerSideProps = async (context) => {
  const product = await produtoApi.getSingleProduct(context.query.id);
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
      product,
      idiomas,
    },
  };
};

export default Editar;

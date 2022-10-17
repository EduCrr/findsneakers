import Head from "next/head";
import Image from "next/image";
import * as C from "../styles/Site/index";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import categoria from "./api/manager/categoria";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Header } from "../components/Site/Header";
import contatoApi from "./api/manager/contatoApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

import * as yup from "yup";

const Contato = ({ teste }) => {
  const { t } = useTranslation("common");
  const validationForm = yup.object().shape({
    nome: yup.string().required("Campo nome é obrigatório"),
    email: yup.string().required("Campo email é obrigatório"),
    mensagem: yup.string().required("Campo mensagem é obrigatório"),
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationForm),
  });
  let fotoField = useRef();

  const handleForm = async (data) => {
    console.log(data);

    let json = await contatoApi.sendEmail(
      data.nome,
      data.email,
      data.mensagem,
      fotoField
    );

    if (json.success) {
      alert("foi");
      reset();
    } else {
      alert("n foi");
    }
  };

  return (
    <C.Content>
      <Header />
      <ul>
        {router.locales.map((item, k) => (
          <li key={k}>
            <Link href={router.pathname} locale={item}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <p>{t("welcome")}</p>
      <div className="contato">
        <form className="globalForm" onSubmit={handleSubmit(handleForm)}>
          <input
            name="nome"
            {...register("nome")}
            placeholder="nome"
            type="text"
          />
          <p className="errorEmails">{errors.nome?.message}</p>
          <input
            name="email"
            {...register("email")}
            placeholder="email"
            type="email"
          />
          <p className="errorEmails">{errors.email?.message}</p>

          <input
            name="mensagem"
            {...register("mensagem")}
            placeholder="mesagem"
            type="text"
          />
          <p className="errorEmails">{errors.mensagem?.message}</p>
          <input type="file" multiple ref={fotoField} />
          <button type="submit">Enviar</button>
        </form>
      </div>
    </C.Content>
  );
};

export async function getStaticProps({ locale }) {
  const categories = await categoria.getCategories(locale);
  return {
    props: {
      categories,
      ...(await serverSideTranslations(locale, ["common"])),
    },
    revalidate: 300,
  };
}

export default Contato;

import Head from "next/head";
import Image from "next/image";
import * as C from "../styles/Site/index";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import categoria from "../pages/api/manager/categoria";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Header } from "../components/Site/Header";
import { SliderHome } from "../components/Site/Slider";
import slidesApi from "./api/manager/slidesApi";
import contentApi from "./api/manager/contentApi";
import { InitialTransition } from "../components/Site/InitialTransition";
export default function Home({ slides, contents, locale }) {
  const easing = [0.6, -0.05, 0.01, 0.99];
  // const path = posts.path;
  //  const [postList, setPostList] = useState(posts.posts);
  const [contentsFields, setContentsFieds] = useState(contents.content);
  let path = contents.path;
  const firstContent = contentsFields[0];
  const { t } = useTranslation("common");
  const fadeInUp = {
    initial: {
      y: 160,
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
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easing,
      },
    },
  };
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <C.Content>
      {/* <InitialTransition /> */}
      <Header />
      <SliderHome slides={slides} />
    </C.Content>
  );
}

export async function getStaticProps({ locale }) {
  const categories = await categoria.getCategoriesProducts(locale);
  const slides = await slidesApi.getSlides(locale);
  const contents = await contentApi.getCotentHome("home", locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      categories,
      slides,
      contents,
      locale,
    },
    revalidate: 300,
  };
}

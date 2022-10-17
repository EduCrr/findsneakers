import Head from "next/head";
import Image from "next/image";
import * as C from "../styles/Site/index";
import { motion } from "framer-motion";
import Link from "next/link";
import categoria from "../pages/api/manager/categoria";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Header } from "../components/Site/Header";
import { Filter } from "../components/Site/filter";
export default function Produtos({ categories, products, locale }) {
  const { t } = useTranslation("common");

  return (
    <C.Content>
      <Header />
      <Filter categories={categories} products={products} locale={locale} />
    </C.Content>
  );
}

export async function getStaticProps({ locale }) {
  const categories = await categoria.getCategoriesProducts(locale);
  const products = await categoria.findOneCategoryProducts("0", locale);
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      categories,
      products,
      locale,
    },
    revalidate: 300,
  };
}

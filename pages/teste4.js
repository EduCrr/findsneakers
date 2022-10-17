import Link from "next/link";
import * as C from "../styles/Site/index";
import { motion } from "framer-motion";
import mainApi from "./api/manager/mainApi";
import { useState } from "react";
import { Header } from "../components/Site/Header";

const Teste4 = ({ teste }) => {
  const easing = [0.6, -0.05, 0.01, 0.99];

  const fadeInUp = {
    initial: {
      y: "100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easing,
      },
    },
    exit: {
      y: "-100%",
      opacity: 0,
      transition: {
        duration: 1,
        ease: easing,
      },
    },
  };

  const fadeInUp2 = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: easing,
      },
    },
    exit: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 1,
        ease: easing,
      },
    },
  };
  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.8,
      },
    },
  };
  return (
    <C.Content>
      <Header />

      <div className="teste2">
        <motion.div
          variants={fadeInUp2}
          initial="initial"
          animate="animate"
          exit="exit"
          className="testeText"
        >
          <h1>Lorem</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          exit="exit"
          className="testeImg"
        >
          <img
            alt=""
            src="https://images.unsplash.com/photo-1605034313761-73ea4a0cfbf3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
          />
        </motion.div>
      </div>
      <Link href="/">
        <a>voltar</a>
      </Link>
    </C.Content>
  );
};

export default Teste4;

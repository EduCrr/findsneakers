import * as C from "./styles";
import { motion } from "framer-motion";
export const InitialTransition = () => {
  const blackBox = {
    initial: {
      height: "100vh",
      bottom: 0,
    },
    animate: {
      transition: {
        when: "afterChildren",
        duration: 2.5,
        ease: [0.87, 0, 0.13, 1],
      },
      height: 0,
    },
  };
  const title = {
    initial: {
      opacity: 1,
    },
    animate: {
      transition: {
        when: "afterChildren",
        duration: 2.5,
        ease: [0.87, 0, 0.13, 1],
      },
      opacity: 0,
    },
    transition: {
      duration: 2.5,
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <C.Content>
      <div className="initalHome">
        <motion.div
          className="initalBg"
          initial="initial"
          animate="animate"
          variants={blackBox}
        />
        <motion.div
          className="initialName"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={title}
        >
          Findsneakeroom
        </motion.div>
      </div>
    </C.Content>
  );
};

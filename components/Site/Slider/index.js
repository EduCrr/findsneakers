import * as C from "./styles";
import Link from "next/link";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion, dragConstraints } from "framer-motion";

export const SliderHome = ({ slides }) => {
  const router = useRouter();
  let path = slides.path;
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  console.log(slides);
  return (
    <C.Content>
      <div className="titleBackground">ACTVITTA</div>
      <div className="contentSlider">
        <Slider {...settings}>
          {slides.slides.map((item, k) => (
            <motion.div
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              className="singleSlide"
              key={k}
            >
              <img src={`${path}/${item.imagem}`} />
            </motion.div>
          ))}
        </Slider>
        <Link href="/produtos">
          <a className="more">Veja mais</a>
        </Link>
      </div>
    </C.Content>
  );
};

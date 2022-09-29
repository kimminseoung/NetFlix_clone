import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
`;
const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: red;
  border-radius: 15px;
  height: 350px;
  cursor: pointer;
  background-image: url(${props => props.bgphoto});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;
const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${props => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  border-radius: 0 0 10px 10px;
  h4 {
    text-align: center;
    font-size: 12px;
  }
`;
const SliderTitle = styled.h3`
  font-size: 24px;
  padding-bottom: 20px;
`;
const InfoVarient = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "tween",
    },
  },
}; 
interface SliderProp {
  movie: any[];
  title: string;
  part: string;
}
const Slider = ({ movie, title, part }: SliderProp) => {
  const navigate = useNavigate();
  const onBoxClick = (movieId: number, part: string) => {
    navigate(`/${part}/${movieId}`);
  };
  return (
    <Wrapper>
      <SliderTitle>{title}</SliderTitle>
      <Swiper className='swiper' navigation={true} modules={[Navigation]} slidesPerView={6} spaceBetween={10}>
        {movie.map((movie, index) => (
          <SwiperSlide key={movie.id}>
            <Box key={index} onClick={() => onBoxClick(movie.id, part)} variants={InfoVarient} transition={{ type: "tween" }} whileHover='hover' bgphoto={makeImagePath(movie.poster_path, "w500")}>
              <Info variants={InfoVarient}>
                <h4>{part === "movie" ? movie.title : movie.name}</h4>
              </Info>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};

export default Slider;

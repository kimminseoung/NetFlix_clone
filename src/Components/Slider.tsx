import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useSetRecoilState } from "recoil";
import { overFlow } from "../atom";
import { ResultArray  } from "../api";
const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
  margin-bottom: 20px;
  @media ${props => props.theme.desktop} {
  }
  @media ${props => props.theme.tablet} {
  }
  @media ${props => props.theme.mobile} {
    padding: 12px;
    margin-bottom: 17px;
  }
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  cursor: pointer;
  background-color: transparent;
  background-image: url(${props => props.bgphoto});
  background-repeat: no-repeat;
  background-position: center center;
  border-radius: 0.938rem;
  background-size: cover;
  @media ${props => props.theme.desktop} {
    height: 400px;
  }
  @media ${props => props.theme.tablet} {
    height: 350px;
  }
  @media ${props => props.theme.mobile} {
    height: 200px;
  }
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
  }
  @media ${props => props.theme.desktop} {
    h4 {
      font-size: 18px;
    }
  }
  @media ${props => props.theme.tablet} {
    h4 {
      font-size: 16px;
    }
  }
  @media ${props => props.theme.mobile} {
    h4 {
      font-size: 14px;
    }
  }
`;
const SliderTitle = styled.h3`
  @media ${props => props.theme.desktop} {
    padding-bottom: 20px;
    font-size: 24px;
  }
  @media ${props => props.theme.tablet} {
    padding-bottom: 20px;
    font-size: 20px;
  }
  @media ${props => props.theme.mobile} {
    font-size: 16px;
    padding-bottom: 12px;
  }
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
  movie: ResultArray[];
  title: string;
  part: string;
}
const Slider = ({ movie, title, part }: SliderProp) => {
  const navigate = useNavigate();
  const overflow = useSetRecoilState(overFlow);
  const onBoxClick = (movieId: number, part: string) => {
    navigate(`/${part}/${movieId}`);
    overflow(true);
  };
  console.log(movie);
  return (
    <Wrapper>
      <SliderTitle>{title}</SliderTitle>
      <Swiper
        breakpoints={{
          100: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className='swiper'
        navigation={true}
        modules={[Navigation]}
      >
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

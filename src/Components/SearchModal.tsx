import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getMoiveDetail, getMoiveVideo } from "../api";
import { useQuery } from "react-query";
import { AiFillCloseSquare } from "react-icons/ai";
import Loader from "./Loader";
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1110;
`;
const Detail = styled(motion.div)`
  overflow-y: scroll;
  position: fixed;
  background-color: ${props => props.theme.black.lighter};
  border-radius: 15px;
  z-index: 1111;
  color: ${props => props.theme.white.lighter};
  .title,
  .info,
  .overview {
    padding: 10px 15px;
  }
  @media ${props => props.theme.desktop} {
    width: 40vw;
    height: 80vh;
    padding-bottom: 5rem;
  }
  @media ${props => props.theme.tablet} {
    width: 80vw;
    padding-bottom: 3rem;
  }
  @media ${props => props.theme.mobile} {
    width: 68vw;
    padding-bottom: 1.5rem;
  }
`;
const DetailInfo = styled.div`
  display: flex;
  font-weight: 500;
  flex-direction: column;
  & > div {
    margin-bottom: 5px;
  }
  b {
    font-weight: normal;
    margin-left: 6px;
  }
`;
const Title = styled.div`
  b {
    font-size: 14px;
    display: block;
    margin-top: 5px;
  }
  @media ${props => props.theme.desktop} {
    font-size: 1.75rem;
  }
  @media ${props => props.theme.tablet} {
    font-size: 1.375rem;
  }
  @media ${props => props.theme.mobile} {
    font-size: 1rem;
  }
`;
const DetailText = styled.div`
  p {
    line-height: 1.3;
    font-size: 14px;
  }
`;
const Media = styled.div`
  padding: 13px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  svg {
    width: 45px;
    height: 45px;
    transition: 0.3s;
    color: ${props => props.theme.black.darker};
  }
  svg:hover {
    color: crimson;
  }
`;
const showParents = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};
const showChild = {
  hidden: { opacity: 0, y: "0%", x: "-50%", top: "50%", left: "50%" },
  show: { opacity: 1, y: "-50%", x: "-50%", top: "50%", left: "50%" },
  exit: { opacity: 0, y: "-100%", x: "-50%", top: "50%", left: "50%" },
};
const SearchModal = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("id");
  const media = searchParams.get("type");
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };
  const { isLoading, data } = useQuery(["detail", keyword], () => getMoiveDetail(keyword, media));
  const { isLoading: _, data: video } = useQuery(["video", keyword], () => getMoiveVideo(keyword, media));
  const unikey = video?.results.filter(ele => ele.type === "Trailer").map(ele => ele.key)[Math.floor(Math.random() * 5)];
  return (
    <>
      {isLoading ? (
        <Loader title='로딩중.....' />
      ) : (
        <motion.div variants={showParents} initial='hidden' animate='show'>
          <Overlay onClick={onOverlayClick} variants={showChild} />
          <Detail initial={{ opacity: 0, y: 10 }} variants={showChild}>
            <Close onClick={onOverlayClick}>
              <AiFillCloseSquare />
            </Close>
            <Media>
              {unikey ? (
                <iframe frameBorder='0' width='100%' height='400px' title='movieTrailer' src={`https://www.youtube.com/embed/${unikey}?autoplay=1`}></iframe>
              ) : (
                <img src={`${makeImagePath(data?.backdrop_path || data?.poster_path, "w500")}`} alt='이미지' />
              )}
            </Media>
            <Title className='title'>
              {media === "movie" ? (
                <>
                  {data?.title}
                  <b>{data?.original_title}</b>
                </>
              ) : (
                <>
                  {data?.name}
                  <b>{data?.original_name}</b>
                </>
              )}
            </Title>
            <DetailInfo className='info'>
              <div>
                {media === "movie" ? (
                  <>
                    개봉일:<b>{data?.release_date}</b>
                  </>
                ) : (
                  <>
                    방영일:<b>{data?.first_air_date}</b>
                  </>
                )}
              </div>
              <div>
                평점:
                <b
                  style={{
                    color: (data?.vote_average as number) >= 8 ? "red" : (data?.vote_average as number) >= 7 ? "yellow" : "green",
                  }}
                >
                  {Math.floor(data?.vote_average as number)}
                </b>
              </div>
              <div>
                국가:
                {data?.production_countries.map((ele, index) => (
                  <b key={index}>{ele.name}</b>
                ))}
              </div>
              <div>
                {media === "movie" ? (
                  <>
                    상영시간:<b>{data?.runtime}분</b>
                  </>
                ) : (
                  <>
                    Episode Runtime :<b>{data?.episode_run_time[0]}분</b>
                  </>
                )}
              </div>
              <div>
                장르:
                {data?.genres.map((ele, index) => (
                  <b key={index}>{ele.name}</b>
                ))}
              </div>
            </DetailInfo>
            <DetailText className='overview'>
              <b style={{ display: "inline-block", marginBottom: "10px" }}>{data?.tagline}</b>
              <p>{data?.overview}</p>
            </DetailText>
          </Detail>
        </motion.div>
      )}
    </>
  );
};

export default SearchModal;

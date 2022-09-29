import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../utils";
import { useMatch, useNavigate } from "react-router-dom";
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
  z-index: 110;
`;
const MovieDetail = styled(motion.div)`
  overflow-y: scroll;
  position: fixed;
  padding-bottom: 100px;
  width: 40vw;
  height: 80vh;
  top: 10%;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${props => props.theme.black.lighter};
  border-radius: 15px;
  z-index: 111;
  color: ${props => props.theme.white.lighter};
  .title,
  .info,
  .overview {
    padding: 10px 15px;
  }
`;
const MovieInfo = styled.div`
  display: flex;
  font-weight: bold;
  & > div {
    margin-right: 15px;
  }
  b {
    font-weight: normal;
    margin-left: 6px;
    font-size: 14px;
  }
`;
const MovieTitle = styled.div`
  font-size: 28px;
  b {
    font-size: 14px;
    display: block;
    margin-top: 5px;
  }
`;
const MovieDate = styled.div``;
const MovieGenre = styled.div``;
const MovieRating = styled.div``;
const MovieText = styled.div`
  p {
    line-height: 1.3;
    font-size: 14px;
  }
`;
const MovieMedia = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Close = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  svg {
    width: 45px;
    height: 45px;
    transition: 0.3s;
  }
  svg:hover {
    color: crimson;
  }
`;
const MovieModal = () => {
  const navigate = useNavigate();
  const onOverlayClick = () => {
    navigate(-1);
  };
  const usematch = useMatch("/:part/:id");
  const part = usematch?.params.part;
  const id = usematch?.params.id;
  const { isLoading, data } = useQuery(["detail", id], () => getMoiveDetail(id, part));
  const { isLoading: _, data: video } = useQuery(["video", id], () => getMoiveVideo(id, part));
  const unikey = video?.results.filter(ele => ele.type === "Trailer").map(ele => ele.key)[Math.floor(Math.random() * 5)];
  return (
    <>
      {isLoading ? (
        <Loader title='로딩중.....' />
      ) : (
        <motion.div>
          <Overlay onClick={onOverlayClick} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} />
          <MovieDetail initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Close onClick={onOverlayClick}>
              <AiFillCloseSquare />
            </Close>
            <MovieMedia>
              {unikey ? (
                <iframe frameBorder='0' width='100%' height='400px' title='movieTrailer' src={`https://www.youtube.com/embed/${unikey}?autoplay=1`}></iframe>
              ) : (
                <img src={`${makeImagePath(data?.backdrop_path || data?.poster_path, "w500")}`} alt='이미지' />
              )}
            </MovieMedia>
            <MovieTitle className='title'>
              {part === "movie" ? (
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
            </MovieTitle>
            <MovieInfo className='info'>
              <MovieDate>
                {part === "movie" ? (
                  <>
                    개봉일: <b>{data?.release_date}</b>
                  </>
                ) : (
                  <>
                    방영일: <b>{data?.first_air_date}</b>
                  </>
                )}
              </MovieDate>
              <MovieRating>
                평점:
                <b
                  style={{
                    color: (data?.vote_average as number) >= 8 ? "red" : (data?.vote_average as number) >= 7 ? "yellow" : "green",
                  }}
                >
                  {Math.floor(data?.vote_average as number)}
                </b>
              </MovieRating>
              <div>
                국가:
                {data?.production_countries.map((ele, index) => (
                  <b key={index}>{ele.name}</b>
                ))}
              </div>
            </MovieInfo>
            <MovieInfo className='info'>
              <MovieDate>
                {part === "movie" ? (
                  <>
                    상영시간:<b>{data?.runtime}분</b>
                  </>
                ) : (
                  <>
                    Episode Runtime :<b>{data?.episode_run_time[0]}분</b>
                  </>
                )}
              </MovieDate>
              <MovieGenre>
                장르:
                {data?.genres.map((ele, index) => (
                  <b key={index}>{ele.name}</b>
                ))}
              </MovieGenre>
            </MovieInfo>
            <MovieText className='overview'>
              <b style={{ display: "inline-block", marginBottom: "10px" }}>{data?.tagline}</b>
              <p>{data?.overview}</p>
            </MovieText>
          </MovieDetail>
        </motion.div>
      )}
    </>
  );
};

export default MovieModal;

import styled from "styled-components";
import { useQuery } from "react-query";
import { getMoive, getMoivePopular,getMoiveUpcoming, getMoiveTopRated } from "./../api";
import { makeImagePath } from "../utils";
import Loader from "../Components/Loader";
import Slider from "../Components/Slider";
import MovieModal from "../Components/MovieModal";
import { useParams } from "react-router-dom";
const Container = styled.div`
  background-color: #000;
  @media (min-width: 1920px) {
    padding-left: 250px;
  }
  @media (min-width: 1024px) and (max-width: 1919px) {
    padding-left: 250px;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    padding-left: 0;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    padding-left: 0;
  }
  @media (max-width: 479px) {
    padding-left: 0;
  }
`;
const Banner = styled.div<{ bgphoto: string }>`
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${props => props.bgphoto});
  background-size: cover;
`;
const Title = styled.h2`
  margin-bottom: 20px;
  @media (min-width: 1920px) {
    font-size: 4.25rem;
  }
  @media (min-width: 1024px) and (max-width: 1919px) {
    font-size: 3rem;
  }
  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 2.25rem;
  }
`;
const OverView = styled.p`
  font-size: 1.375rem;
  line-height: 2;
  width: 50%;
`;

function Home() {
  const match = useParams();
  const matchId = match.id;
  const { isLoading: nowPlayingLoading, data: nowPlaying } = useQuery(["nowPlaying"], getMoive);
  const { isLoading: popularLoading, data: popular } = useQuery(["popular"], getMoivePopular);
  const { isLoading: upcomingLoading, data: upcoming } = useQuery(["upcomming"], getMoiveUpcoming);
  const { isLoading: topratedLoading, data: toprated } = useQuery(["toprated"], getMoiveTopRated);
  const loading = nowPlayingLoading || popularLoading || upcomingLoading || topratedLoading;
  return (
    <Container>
      {loading ? (
        <Loader title='로딩중.....' />
      ) : (
        <>
          <Banner bgphoto={makeImagePath(nowPlaying?.results[0].backdrop_path || "")}>
            <Title>{nowPlaying?.results[0].title}</Title>
            <OverView>{nowPlaying?.results[0].overview}</OverView>
          </Banner>
          <Slider title='상영중' movie={nowPlaying?.results ?? []} part='movie' />
          <Slider title='최신 인기 작품' movie={popular?.results ?? []} part='movie' />
          <Slider title='국내 개봉 예정' movie={upcoming?.results ?? []} part='movie' />
          <Slider title='명작' movie={toprated?.results ?? []} part='movie' />
          {matchId && <MovieModal />}
        </>
      )}
    </Container>
  );
}

export default Home;

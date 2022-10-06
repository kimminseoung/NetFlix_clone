import styled from "styled-components";
import { useQuery } from "react-query";
import { getMoive, getMoivePopular, getMoiveUpcoming, getMoiveTopRated } from "./../api";
import { makeImagePath } from "../utils";
import Loader from "../Components/Loader";
import Slider from "../Components/Slider";
import DetailModal from "../Components/DetailModal";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { overFlow } from "../atom";
const Container = styled.div`
  background-color: #000;
  @media ${props => props.theme.desktop} {
    padding-left: 250px;
  }
  @media ${props => props.theme.tablet} {
    padding-left: 0;
  }
  @media ${props => props.theme.mobile} {
    padding-left: 0;
  }
`;
const Banner = styled.div<{ bgphoto: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)), url(${props => props.bgphoto});
  background-repeat: no-repeat;
  padding: 60px;
  background-size: cover;
  background-position: center center;
  @media ${props => props.theme.desktop} {
    height: 70vh;
  }
  @media ${props => props.theme.tablet} {
    height: 60vh;
    margin-top: 30px;
  }
  @media ${props => props.theme.mobile} {
    height: 55vh;
    margin-top: 60px;
    padding: 30px;
  }
`;
const Title = styled.h2`
  margin-bottom: 20px;
  @media ${props => props.theme.desktop} {
    font-size: 2.25rem;
  }
  @media ${props => props.theme.tablet} {
    font-size: 2.25rem;
  }
  @media ${props => props.theme.mobile} {
    font-size: 2.25rem;
  }
`;
const OverView = styled.p`
  line-height: 1.5;
  @media ${props => props.theme.desktop} {
    width: 50%;
    font-size: 1.3rem;
  }
  @media ${props => props.theme.tablet} {
    width: 50%;
    font-size: 1.2rem;
  }
  @media ${props => props.theme.mobile} {
    width: 70%;
    font-size: 1rem;
  }
`;

function Home() {
  const bodyOverflow = useRecoilValue(overFlow);
  if (bodyOverflow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
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
          {matchId && <DetailModal />}
        </>
      )}
    </Container>
  );
}

export default Home;

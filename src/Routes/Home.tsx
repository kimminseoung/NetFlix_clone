import styled from "styled-components";
import { useQuery } from "react-query";
import { getMoive, getMoivePopular, getMoiveUpcoming, getMoiveTopRated } from "./../api";
import Loader from "../Components/Loader";
import Slider from "../Components/Slider";
import DetailModal from "../Components/DetailModal";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { overFlow } from "../atom";
import Banner from "./../Components/Banner";
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

function Home() {
  const bodyOverflow = useRecoilValue(overFlow);
  const match = useParams();
  const matchId = match.id;
  const { isLoading: nowPlayingLoading, data: nowPlaying } = useQuery(["nowPlaying"], getMoive);
  const { isLoading: popularLoading, data: popular } = useQuery(["popular"], getMoivePopular);
  const { isLoading: upcomingLoading, data: upcoming } = useQuery(["upcomming"], getMoiveUpcoming);
  const { isLoading: topratedLoading, data: toprated } = useQuery(["toprated"], getMoiveTopRated);
  const loading = nowPlayingLoading || popularLoading || upcomingLoading || topratedLoading;
  if (bodyOverflow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  return (
    <Container>
      {loading ? (
        <Loader title='로딩중.....' />
      ) : (
        <>
          <Banner data={upcoming?.results ?? []} />
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

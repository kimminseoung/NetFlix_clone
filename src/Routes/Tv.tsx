import styled from "styled-components";
import { useQuery } from "react-query";
import { getTvTopRated, getTvPopular, getTvOnAir, getTvToday } from "./../api";
import Loader from "../Components/Loader";
import Slider from "../Components/Slider";
import MovieModal from "../Components/DetailModal";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { overFlow } from "../atom";
import Banner from "../Components/Banner";
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
function Tv() {
  const bodyOverflow = useRecoilValue(overFlow);

  const match = useParams();
  const matchId = match.id;

  if (bodyOverflow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }

  const { isLoading: onAirLoading, data: onAir } = useQuery(["onAir"], getTvOnAir);
  const { isLoading: popularLoading, data: popular } = useQuery(["Popular"], getTvPopular);
  const { isLoading: ToadyLoading, data: Toady } = useQuery(["Toady"], getTvToday);
  const { isLoading: topratedLoading, data: toprated } = useQuery(["Toprated"], getTvTopRated);
  const loading = onAirLoading || popularLoading || ToadyLoading || topratedLoading;
  return (
    <Container>
      {loading ? (
        <Loader title='로딩중.....' />
      ) : (
        <>
          <Banner data={onAir?.results ?? []} />
          <Slider title='onAir' movie={onAir?.results ?? []} part='tv' />
          <Slider title='Popular' movie={popular?.results ?? []} part='tv' />
          <Slider title='Airing Today' movie={Toady?.results ?? []} part='tv' />
          <Slider title='Top Rated' movie={toprated?.results ?? []} part='tv' />
          {matchId && <MovieModal />}
        </>
      )}
    </Container>
  );
}

export default Tv;
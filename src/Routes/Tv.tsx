import styled from "styled-components";
import { useQuery } from "react-query";
import { getTvTopRated, getTvPopular, getTvOnAir, getTvToday } from "./../api";
import { makeImagePath } from "../utils";
import Loader from "../Components/Loader";
import Slider from "../Components/Slider";
import MovieModal from "../Components/DetailModal";
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

function Tv() {
  const match = useParams();
  const matchId = match.id;
  const { isLoading: onAirLoading, data: onAir } = useQuery(["onAir"], getTvOnAir);
  const { isLoading: popularLoading, data: popular } = useQuery(["Popular"], getTvPopular);
  const { isLoading: ToadyLoading, data: Toady } = useQuery(["Toady"], getTvToday);
  const { isLoading: topratedLoading, data: toprated } = useQuery(["Toprated"], getTvTopRated);
  const loading = onAirLoading || popularLoading || ToadyLoading || topratedLoading;
  console.log(Toady);
  return (
    <Container>
      {loading ? (
        <Loader title='로딩중.....' />
      ) : (
        <>
          <Banner bgphoto={makeImagePath(onAir?.results[0].backdrop_path || "")}>
            <Title>{onAir?.results[0].name}</Title>
            <OverView>{onAir?.results[0].overview}</OverView>
          </Banner>
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

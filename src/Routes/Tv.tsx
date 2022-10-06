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

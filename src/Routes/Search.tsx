import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { searchInfo } from "../api";
import Loader from "../Components/Loader";
import { makeImagePath } from "./../utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { overFlow, searchId } from "../atom";
import SearchModal from "../Components/SearchModal";

const Container = styled.div`
  h3 {
    text-align: center;
    padding: 20px 0;
    letter-spacing: 2px;
  }
  @media ${props => props.theme.desktop} {
    padding-left: 250px;
    h3 {
      margin-top: 30px;
      font-size: 1.5rem;
    }
  }
  @media ${props => props.theme.tablet} {
    h3 {
      font-size: 1.2rem;
      margin-top: 60px;
    }
    padding-left: 0;
  }
  @media ${props => props.theme.mobile} {
    h3 {
      font-size: 1rem;
      margin-top: 60px;
    }
    padding-left: 0;
  }
`;
const Wrapper = styled.div`
  display: grid;
  @media ${props => props.theme.desktop} {
    grid-template-columns: repeat(5, 1fr);
    padding: 20px 30px;
    gap: 15px;
  }
  @media ${props => props.theme.tablet} {
    grid-template-columns: repeat(4, 1fr);
    padding: 10px 20px;
    gap: 10px;
  }
  @media ${props => props.theme.mobile} {
    grid-template-columns: repeat(3, 1fr);
    padding: 10px;
    gap: 10px;
  }
`;
const Items = styled(motion.div)<{ bgphoto: string }>`
  cursor: pointer;
  position: relative;
  background-image: linear-gradient(to top, black, transparent), url(${props => props.bgphoto});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  h2 {
    position: absolute;
    bottom: 25px;
    left: 15px;
  }
  @media ${props => props.theme.desktop} {
    font-size: 16px;
    height: 250px;
  }
  @media ${props => props.theme.tablet} {
    height: 200px;
    font-size: 16px;
  }
  @media ${props => props.theme.mobile} {
    height: 200px;
    font-size: 13px;
  }
`;
function Search() {
  const setId = useSetRecoilState(searchId);
  const bodyOverflow = useRecoilValue(overFlow);
  if (bodyOverflow) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const word = searchParams.get("keyword");
  const id = searchParams.get("id");
  const { isLoading, data } = useQuery(["search", word], () => searchInfo(word));
  const navigate = useNavigate();
  const onBoxClick = (id: number, word: string, media: string) => {
    navigate(`/search?keyword=${word}&type=${media}&id=${id}`);
    setId(word);
  };
  return (
    <div>
      {isLoading ? (
        <Loader title='로딩중 ...' />
      ) : data?.results.length === 0 ? (
        <Loader title='검색 결과 없음.....' />
      ) : (
        <Container>
          <h3 className='searchTitle'>{data?.page && `"${word}"에 대한 ${data.results.length}개의 결과물`}</h3>
          <Wrapper>
            {data?.results.map(ele => (
              <Items
                layoutId={ele.id + ""}
                onClick={() => {
                  onBoxClick(ele.id, word + "", ele.media_type);
                }}
                key={ele.id}
                bgphoto={makeImagePath(ele.backdrop_path || ele.poster_path, "w500")}
              >
                <h2>{ele.title || ele.name}</h2>
              </Items>
            ))}
          </Wrapper>
        </Container>
      )}
      {id && <SearchModal />}
    </div>
  );
}

export default Search;

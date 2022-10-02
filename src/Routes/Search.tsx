import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { searchInfo } from "../api";
import Loader from "../Components/Loader";
import { makeImagePath } from "./../utils";
import { useSetRecoilState } from "recoil";
import { searchId } from "../atom";
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
      font-size: 1.5rem;
    }
  }
  @media ${props => props.theme.tablet} {
    h3 {
      font-size: 1.2rem;
      margin-top: 100px;
    }
    padding-left: 0;
  }
  @media ${props => props.theme.mobile} {
    padding-left: 0;
    h3 {
      margin-top: 100px;
      font-size: 0.9rem;
    }
  }
`;

const Wrapper = styled.div`
  display: grid;
  padding: 20px 40px;
  gap: 15px;
  @media ${props => props.theme.desktop} {
    grid-template-columns: repeat(5, 1fr);
  }
  @media ${props => props.theme.tablet} {
    grid-template-columns: repeat(4, 1fr);
  }
  @media ${props => props.theme.mobile} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Items = styled(motion.div)<{ bgphoto: string }>`
  height: 300px;
  cursor: pointer;
  position: relative;
  background-image: linear-gradient(to top, black, transparent), url(${props => props.bgphoto});
  background-position: center center;
  background-repeat: no-repeat;
  h2 {
    position: absolute;
    bottom: 25px;
    left: 15px;
  }
  @media ${props => props.theme.desktop} {
    background-size: contain;
  }
  @media ${props => props.theme.tablet} {
    background-size: contain;
  }
  @media ${props => props.theme.mobile} {
    background-size: contain;
  }
`;
function Search() {
  const setId = useSetRecoilState(searchId);
  const [searchParams, setSearchParams] = useSearchParams();
  const word = searchParams.get("keyword");
  const id = searchParams.get("id");
  const { isLoading, data } = useQuery(["search", word], () => searchInfo(word));
  console.log(data);
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

import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation, useMatch, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { searchInfo } from "../api";
import Loader from "../Components/Loader";
import MovieModal from "../Components/MovieModal";
import { makeImagePath } from "./../utils";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { searchId } from "../atom";
import SearchModal from "../Components/SearchModal";
const Container = styled.div`
  h3 {
    font-size: 24px;
    text-align: center;
    padding: 20px 0;
    letter-spacing: 2px;
  }
`;

const Wrapper = styled.div`
  display: grid;
  padding: 20px 40px;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
`;

const Items = styled(motion.div)<{ bgphoto: string }>`
  height: 300px;
  cursor: pointer;
  position: relative;
  background-image: linear-gradient(to top, black, transparent), url(${props => props.bgphoto});
  background-position: center center;
  background-size: cover;
  h2 {
    position: absolute;
    bottom: 25px;
    left: 15px;
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
    console.log(media);
    navigate(`/search?keyword=${word}&type=${media}&id=${id}`);
    setId(word);
  };
  return (
    <div style={{ paddingLeft: "250px" }}>
      {isLoading ? (
        <Loader title='로딩중 ...' />
      ) : data?.results.length === 0 ? (
        <Loader title='검색 결과 없음.....' />
      ) : (
        <Container>
          <h3 className='searchTitle'>
            {data?.page && `${word}에대한 ${data.results.length}개의 결과물`}
          </h3>
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

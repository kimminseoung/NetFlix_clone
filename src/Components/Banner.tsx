import styled from "styled-components";
import { makeImagePath } from "../utils";

interface BackGroundProp {
  bgphoto: string;
}
const Wapper = styled.div<BackGroundProp>`
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
    font-size: 1.15rem;
  }
  @media ${props => props.theme.tablet} {
    width: 50%;
    font-size: 1.1rem;
  }
  @media ${props => props.theme.mobile} {
    width: 70%;
    font-size: 1rem;
  }
`;
interface BannerProp {
  data: BannerItem[];
}
interface BannerItem {
  backdrop_path?: string;
  title?: string;
  name?: string;
  overview: string;
}
const Banner = ({ data }: BannerProp) => {
  return (
    <Wapper bgphoto={makeImagePath(data[0].backdrop_path || "이미지 없음")}>
      <Title>{data[0].title || data[0].name}</Title>
      <OverView>{data[0].overview}</OverView>
    </Wapper>
  );
};

export default Banner;

import styled from "styled-components";

const Loading = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
interface LoadingProp{
  title:string
}
const Loader = ({ title }: LoadingProp) => {
  return <Loading>{title}</Loading>;
};

export default Loader;

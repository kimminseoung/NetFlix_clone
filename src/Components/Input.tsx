import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { FaWindowClose } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { openSearchModal } from "../atom";
import { useEffect } from "react";

interface Iform {
  keyword: string;
}
const Container = styled(motion.div)``;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  @media ${props => props.theme.desktop} {
    left: 250px;
  }
  @media ${props => props.theme.tablet} {
    left: 0;
  }
  @media ${props => props.theme.mobile} {
    left: 0;
  }
`;
const Modal = styled(motion.div)`
  background-color: ${props => props.theme.black.darker};
  position: fixed;
  z-index: 99999;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    margin: 60px 0;
  }
  form {
    width: 100%;
  }
  @media ${props => props.theme.desktop} {
    width: 500px;
    height: 350px;
    h3 {
      font-size: 1.5rem;
      margin: 60px 0;
    }
  }
  @media ${props => props.theme.tablet} {
    width: 500px;
    height: 350px;

    h3 {
      font-size: 1.25rem;
    }
  }
  @media ${props => props.theme.mobile} {
    width: 80%;
    height: 250px;
    h3 {
      font-size: 1.125rem;
    }
  }
`;
const Input = styled(motion.input)`
  background-color: transparent;
  outline: none;
  color: ${props => props.theme.white.lighter};
  border: 2px solid ${props => props.theme.white.lighter};
  height: 50px;
  width: 100%;
  padding: 15px;
  border-radius: 5px;
`;
const Close = styled.div`
  position: absolute;
  cursor: pointer;
  top: 15px;
  right: 15px;
  font-size: 24px;
`;
const showParents = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};
const showChild = {
  hidden: { opacity: 0, y: "0%", x: "-50%", top: "50%", left: "50%" },
  show: { opacity: 1, y: "-50%" },
  exit: { opacity: 0, y: "-100%" },
};
function SearchInput() {
  const navigate = useNavigate();
  const setSearchOpen = useSetRecoilState(openSearchModal);
  const { register, handleSubmit, setFocus } = useForm<Iform>();
  const onVaild = (data: Iform) => {
    navigate(`/search?keyword=${data.keyword}`);
    setSearchOpen(false);
  };
  const onClose = () => {
    setSearchOpen(prev => !prev);
  };
  useEffect(() => {
    setFocus("keyword");
  }, [setFocus]);

  return (
    <Container variants={showParents} initial='hidden' animate='show'>
      <Overlay onClick={onClose} variants={showChild} />
      <Modal variants={showChild}>
        <Close onClick={onClose}>
          <FaWindowClose />
        </Close>
        <h3>영화 혹은 TV 검색</h3>
        <form onSubmit={handleSubmit(onVaild)}>
          <Input {...register("keyword", { required: true, minLength: 2 })} placeholder='검색' />
        </form>
      </Modal>
    </Container>
  );
}

export default SearchInput;

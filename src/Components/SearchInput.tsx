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
const Overlay = styled(motion.div)`
  position: fixed;
  left: 250px;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled(motion.div)`
  position: fixed;
  background-color: ${props => props.theme.black.darker};
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 350px;
  z-index: 99999;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 24px;
    margin: 60px 0;
  }
  form {
    width: 100%;
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
const container = {
  hidden: { opacity: 0, x: -100 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.5,
    },
  },
};
const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
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
    <motion.div variants={container} initial='hidden' animate='show'>
      <Overlay onClick={onClose} variants={item} />
      <Modal variants={item}>
        <Close onClick={onClose}>
          <FaWindowClose />
        </Close>
        <h3>영화 혹은 드라마 검색</h3>
        <form onSubmit={handleSubmit(onVaild)}>
          <Input {...register("keyword", { required: true, minLength: 2 })} placeholder='검색' />
        </form>
      </Modal>
    </motion.div>
  );
}

export default SearchInput;

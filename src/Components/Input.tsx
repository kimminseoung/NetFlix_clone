import styled from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { FaWindowClose } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { openSearchModal } from "../atom";
import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
interface Iform {
  keyword: string;
}
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
  display: flex;
  border-radius: 0.6rem;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 150px;
  padding: 0 20px;
  justify-content: space-around;
  h3 {
    font-size: 1.5rem;
  }
  form {
    width: 100%;
    display: flex;
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      border-radius: 0 0.625rem 0.625rem 0;
      background-color: ${props => props.theme.white.lighter};
      .searchSvg {
        width: 1.875rem;
        height: 1.875rem;
        color: ${props => props.theme.black.veryDark};
      }
    }
  }
  @media ${props => props.theme.mobile} {
    width: 80%;
    height: 150px;
    h3 {
      font-size: 1rem;
    }
    .searchSvg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
const PutKeyWord = styled(motion.input)`
  background-color: transparent;
  outline: none;
  color: ${props => props.theme.white.lighter};
  border: 1px solid #fff;
  height: 3.125rem;
  padding-left: 1rem;
  font-size: 1.3rem;
  width: 100%;
  &:focus {
    background-color: transparent;
    outline: none;
  }
  @media ${props => props.theme.mobile} {
    height: 2.5rem;
    font-size: 0.95rem;
  }
`;
const Close = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0.938rem;
  right: 0.938rem;
  .closeSvg {
    transition: 0.3s;
    width: 1.875rem;
    height: 1.875rem;
    &:hover {
      color: crimson;
    }
  }
  @media ${props => props.theme.mobile} {
    .closeSvg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }
`;

function Input() {
  const navigate = useNavigate();
  const setSearchOpen = useSetRecoilState(openSearchModal);
  const { register, handleSubmit, setFocus } = useForm<Iform>();
  const [mobile, setMobile] = useState(false);
  const onVaild = (data: Iform) => {
    navigate(`/search?keyword=${data.keyword}`);
    setSearchOpen(false);
  };
  const onClose = () => {
    setSearchOpen(prev => !prev);
  };

  function locationModal() {
    const monitorWidth = window.innerWidth;
    if (monitorWidth < 768) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }
  useEffect(() => {
    setFocus("keyword");
    locationModal();
    return () => locationModal();
  }, [setFocus]);
  const showParents = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const showChild = mobile
    ? {
        hidden: { opacity: 0, y: "0%", x: "-50%", top: "0%", left: "50%" },
        show: { opacity: 1, y: "-50%", x: "-50%", top: "20vh", left: "50%" },
      }
    : {
        hidden: { opacity: 0, y: "0%", x: "-50%", top: "50%", left: "50%" },
        show: { opacity: 1, y: "-50%", x: "-50%", top: "50%", left: "50%" },
      };
  return (
    <motion.div variants={showParents} initial='hidden' animate='show'>
      <Overlay onClick={onClose} />
      <Modal variants={showChild} initial='hidden' animate='show'>
        <Close onClick={onClose}>
          <FaWindowClose className='closeSvg' />
        </Close>
        <h3>검색</h3>
        <form onSubmit={handleSubmit(onVaild)}>
          <PutKeyWord {...register("keyword", { required: true, minLength: 2 })} placeholder='검색' />
          <button>
            <BiSearchAlt className='searchSvg' />
          </button>
        </form>
      </Modal>
    </motion.div>
  );
}

export default Input;

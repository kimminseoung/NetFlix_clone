import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { useRecoilState,  useSetRecoilState } from "recoil";
import { openSearchModal, overFlow } from "../atom";
import SearchInput from "./Input";

const Nav = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 250px;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 111111;
  color: ${props => props.theme.white.lighter};
  background-color: ${props => props.theme.black.darker};
  @media ${props => props.theme.desktop} {
    padding-top: 150px;
  }
  @media ${props => props.theme.tablet} {
    width: 100%;
    height: 60px;
    padding-top: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
  }
  @media ${props => props.theme.mobile} {
    width: 100%;
    height: 60px;
    padding-top: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
  }
`;
const Logo = styled(motion.svg)`
  height: 25px;
  fill: ${props => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
  @media ${props => props.theme.desktop} {
    width: 100%;
    margin-bottom: 100px;
  }
  @media ${props => props.theme.tablet} {
    margin-bottom: 0;
    width: 10%;
  }
  @media ${props => props.theme.mobile} {
    margin-bottom: 0;
    width: 18%;
  }
`;
const Items = styled.ul`
  display: flex;
  @media ${props => props.theme.desktop} {
    flex-direction: column;
    align-items: center;
  }
`;
const Item = styled.li`
  color: ${props => props.theme.white.darker};
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  &:hover {
    color: ${props => props.theme.white.lighter};
  }
  @media ${props => props.theme.desktop} {
    margin-bottom: 20px;
    font-size: 1.125rem;
  }
  @media ${props => props.theme.tablet} {
    margin-right: 15px;
    align-items: center;
    font-size: 1rem;
  }
  @media ${props => props.theme.mobile} {
    margin-right: 15px;
    align-items: center;
    font-size: 0.875rem;
  }
`;
const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  background-color: ${props => props.theme.red};
  @media ${props => props.theme.desktop} {
    top: 45%;
    left: -20%;
  }
  @media ${props => props.theme.tablet} {
    bottom: -6px;
    left: 50%;
  }
  @media ${props => props.theme.mobile} {
    bottom: -6px;
    left: 50%;
  }
`;
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;

  @media ${props => props.theme.desktop} {
    svg {
      height: 1.563rem;
    }
  }
  @media ${props => props.theme.tablet} {
    svg {
      height: 1.45rem;
    }
  }
  @media ${props => props.theme.mobile} {
    svg {
      height: 1.3rem;
    }
  }
`;
const logoVarient = {
  noActive: {
    fillOpacity: 1,
  },
  Active: {
    fillOpacity: [0, 1, 0, 1],
    transition: {
      repeat: Infinity,
    },
  },
};

function Header() {
  const home = useMatch("/");
  const tv = useMatch("tv");
  const overflow = useSetRecoilState(overFlow);
  const [searchOpen, setSearchOpen] = useRecoilState(openSearchModal);
  const openSearch = () => {
    setSearchOpen(prev => !prev);
    overflow(prev => !prev);
  };

  return (
    <>
      <Nav>
        <Logo variants={logoVarient} initial='noActive' whileHover='Active' xmlns='http://www.w3.org/2000/svg' width='1024' height='276.742' viewBox='0 0 1024 276.742'>
          <Link to='/'>
            <motion.path
              d='M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z'
              fill='#d81f26'
            />
          </Link>
        </Logo>
        <Items>
          <Item>
            <Link to='/'>Home</Link>
            {home && <Circle layoutId='circle' />}
          </Item>
          <Item>
            <Link to='Tv'>Tv Show</Link>
            {tv && <Circle layoutId='circle' />}
          </Item>
          <Item>
            <Search onClick={openSearch}>
              <motion.svg transition={{ type: "linear" }} fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z' clipRule='evenodd'></path>
              </motion.svg>
            </Search>
          </Item>
        </Items>
      </Nav>
      {searchOpen ? <SearchInput /> : null}
    </>
  );
}

export default Header;

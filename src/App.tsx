import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import Tv from "./Routes/Tv";
import Search from "./Routes/Search";
import Header from "./Components/Header";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='movie/:id' element={<Home />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='tv/:id' element={<Tv />} />
        <Route path='/search' element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

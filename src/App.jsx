
// import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import FilmsPage from "./pages/FilmsPage";
import FilmDetails from "./pages/FilmDetails";
import SeancesPage from "./pages/SeancesPage";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route exact path="/films" element={<FilmsPage />} />
        <Route exact path="/films/One/:id" element={<FilmDetails />} />
        <Route exact path="/seances" element={<SeancesPage/>} />
        {/* <Route exact path="/about" element={<h1>About Page</h1>} /> */}
        <Route exact path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;

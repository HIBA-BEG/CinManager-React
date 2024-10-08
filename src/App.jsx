
// import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import FilmsPage from "./pages/FilmsPage";
import FilmDetails from "./pages/FilmDetails";
import SeancesPage from "./pages/SeancesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFoundPage"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route exact path="/films" element={<FilmsPage />} />
        <Route exact path="/films/One/:id" element={<FilmDetails />} />
        <Route exact path="/seances" element={<SeancesPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* <Route exact path="/about" element={<h1>About Page</h1>} /> */}
        <Route exact path="*" element={<NotFound/>} />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;

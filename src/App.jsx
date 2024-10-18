import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import FilmsPage from "./pages/FilmsPage";
import FilmDetails from "./pages/FilmDetails";
import SeancesPage from "./pages/SeancesPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFoundPage"
import ReservationPage from "./pages/ReservationPage"
import Layout from "./components/Admin/Layout";
import HomeAdmin from "./pages/Admin/HomeAdmin"
import FilmManagement from "./pages/Admin/FilmManagement"
import UserManagement from "./pages/Admin/UserManagement"
import SeancesManagement from "./pages/Admin/SeanceManagement"
import WatchMovie from "./pages/WatchMovie";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route exact path="/films" element={<FilmsPage />} />
          <Route exact path="/films/One/:id" element={<FilmDetails />} />
          <Route exact path="/seances" element={<SeancesPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/reserve/:seanceId" element={<ReservationPage />} />
          <Route path="/films/One/watch/:id" element={<WatchMovie />} />

          {/* <Route exact path="/about" element={<h1>About Page</h1>} /> */}
          <Route exact path="*" element={<NotFound />} />

          <Route path="/admin" element={<Layout />}>
            <Route index element={<HomeAdmin />} />
            <Route path="FilmManagement" element={<FilmManagement />} />
            <Route path="UserManagement" element={<UserManagement />} />
            <Route path="SeancesManagement" element={<SeancesManagement/>} />
            {/* <Route path="reservations" element={<Reservations />} /> */}
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;

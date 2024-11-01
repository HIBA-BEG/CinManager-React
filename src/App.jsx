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
import MyReservationsPage from "./pages/MyReservationsPage";
import FavoritesPage from './pages/FavoritesPage';
import SalleManagement from "./pages/Admin/SalleManagement";
import GenreManagement from "./pages/Admin/GenreManagement";


function App() {

  return (
    <>
      <BrowserRouter>
        <div className="relative">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route exact path="/films" element={<FilmsPage />} />
            <Route exact path="/films/One/:id" element={<FilmDetails />} />
            <Route exact path="/seances" element={<SeancesPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reserve/:seanceId" element={<ReservationPage />} />
            <Route path="/films/One/watch/:id" element={<WatchMovie />} />
            <Route path="/MyReservations" element={<MyReservationsPage />} />
            <Route path="/Myfavorites" element={<FavoritesPage />} />

            {/* <Route exact path="/about" element={<h1>About Page</h1>} /> */}
            <Route exact path="*" element={<NotFound />} />

            <Route path="/admin" element={<Layout />}>
              <Route index element={<HomeAdmin />} />
              <Route path="FilmManagement" element={<FilmManagement />} />
              <Route path="UserManagement" element={<UserManagement />} />
              <Route path="SeancesManagement" element={<SeancesManagement />} />
              <Route path="SalleManagement" element={<SalleManagement />} />
              <Route path="GenreManagement" element={<GenreManagement />} />
              {/* <Route path="reservations" element={<Reservations />} /> */}
            </Route>


          </Routes>
        </div>



      </BrowserRouter>
    </>
  );
}

export default App;

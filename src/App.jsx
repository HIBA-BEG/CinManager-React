
// import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route exact path="/films" element={<h1>Films Page</h1>} />
        <Route exact path="/films/:id" element={<h1>Film Details Page</h1>} />
        <Route exact path="/about" element={<h1>About Page</h1>} />
        <Route exact path="*" element={<h1>404 Page Not Found</h1>} />
      </Routes>
      
      </BrowserRouter>
    </>
  );
}

export default App;

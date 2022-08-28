import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Activate from "./pages/home/Activate";
import Login from "./pages/login";
import Reset from "./pages/reset";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";

function App() {
  return (
    <Routes>
      <Route element={<LoggedInRoutes />}>
        <Route path='/' element={<Home />} exact />
        <Route path='/activate/:token' element={<Activate />} exact />
      </Route>
      <Route element={<NotLoggedInRoutes />}>
        <Route path='/login' element={<Login />} exact />
      </Route>
      <Route path='/reset' element={<Reset />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import LandingPage from "./LandingPage";
import Services from "./features/services/Services";
import Login from "./admin/login/Login";
import Layouts from "./admin/adminfeatures/Layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route index element={<HomePage />} />
          <Route path="/service" element={<Services />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="admin" element={<Layouts/>}  >
        {/* <Route index element={} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

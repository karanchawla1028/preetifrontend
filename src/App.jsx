import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./home/HomePage";
import LandingPage from "./LandingPage";
import Services from "./features/services/Services";
import Login from "./admin/login/Login";
import Layouts from "./admin/adminfeatures/Layouts";
import Category from "./admin/adminfeatures/Category";
import Subcategory from "./admin/adminfeatures/Subcategory";
import Dashboard from "./admin/adminfeatures/Dashboard";
import AdminServices from "./admin/adminfeatures/AdminServices";
import Settings from "./admin/adminfeatures/Settings";
import User from "./admin/adminfeatures/User";
import { Provider } from "react-redux";
import { persistor, store } from "./toolkit/store";
import { PersistGate } from "redux-persist/integration/react";
import ContactUs from "./features/contactus/ContactUs";
import AboutUs from "./features/aboutus/AboutUs";
import Careers from "./features/career/Careers";
import BlogPost from "./features/blogs/BlogPost";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />}>
              <Route index element={<HomePage />} />
              <Route path="/service" element={<Services />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/blogs" element={<BlogPost />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="admin" element={<Layouts />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="category" element={<Category />} />
              <Route
                path="category/:categoryId/subcategory"
                element={<Subcategory />}
              />
              <Route
                path="category/:categoryId/subcategory/:subcategoryId/services"
                element={<AdminServices />}
              />
              <Route path="users" element={<User />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;

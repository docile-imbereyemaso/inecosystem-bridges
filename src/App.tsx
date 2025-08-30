import { BrowserRouter as Router, Routes, Route } from "react-router";

import NotFound from "./user/pages/OtherPage/NotFound";
import UserProfiles from "./user/pages/UserProfiles";
import AppLayout from "./user/layout/AppLayout";
import { ScrollToTop } from "./user/components/common/ScrollToTop";

import PrivateLayout from "./privatesector/layout/PrivateLayout";
import PrivateSectorProfiles from "./privatesector/pages/PrivateSectorProfile";


import TvetLayout from "./tvet/layout/TvetLayout";
import TvetProfiles from "./tvet/pages/TvetProfiles";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";


export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Landing and About Us pages outside of dashboard layouts */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />

          {/* user Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/user/profile" element={<UserProfiles />} />
          </Route>
          {/* Private sector Dashboard layout */}
          <Route element={<PrivateLayout />  }>
            <Route path="/privateSector/profile" element={<PrivateSectorProfiles />} />
          </Route>
          {/* Tvet Dasboard layout */}
          <Route element={<TvetLayout />  }>
            <Route path="/tvet/profile" element={<TvetProfiles />} />
          </Route>
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

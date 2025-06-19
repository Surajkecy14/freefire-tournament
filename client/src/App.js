import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./components/Home";
import Tournment from "./components/Tournment";
import MyMatch from "./components/Mymatch";
import Notification from "./components/Notification";
import Profile from "./components/Profile";
import Support from "./components/Support";
import Login from "./components/Login";
import CreateAc from "./components/CreateAc";
import AdminPanel from "./components/AdminPanel/AdminHome";
import AllUsers from "./components/AdminPanel/AllUsers";
import JoinRequests from "./components/AdminPanel/JoinRequests";
import JoinedTournaments from "./components/AdminPanel/JoinedTournaments";
import GameControl from "./components/AdminPanel/GameControl";
import IdPassSend from "./components/AdminPanel/IdPassSend";
import SendNotification from "./components/AdminPanel/SendNotification";

const AppWrapper = () => {
  const location = useLocation();

  // ✅ Hide Navbar if route starts with /admin
  const hideNavbar = location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/tournment" element={<Tournment />} />
        <Route path="/my-match" element={<MyMatch />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/support" element={<Support />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAc />} />

        {/* Admin Routes (Nested) */}
        <Route path="/admin" element={<AdminPanel />}>
          <Route path="all-users" element={<AllUsers />} />
          <Route path="join-requests" element={<JoinRequests />} />
          <Route path="joined-tournaments" element={<JoinedTournaments />} />
          <Route path="game-control" element={<GameControl />} />
          <Route path="id-pass" element={<IdPassSend />} />
          <Route path="send-notification" element={<SendNotification />} />
        </Route>
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;

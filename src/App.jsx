import React from "react";
import Members from "./pages/members/Members";
import Navbar from "./components/navBar/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import TakeAttendance from "./pages/takeAttendce/TakeAttendance";
import Report from "./pages/report/Report";
import AddMembers from "./pages/addMembers/AddMembers";
import Member from "./pages/member/Member";
import Dasboard from "./pages/dashboard/Dasboard";
import Login from "./pages/login/Login";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/members" element={<Members />} />
          <Route path="/attendance" element={<TakeAttendance />} />
          <Route path="/report" element={<Report />} />
          <Route path="/add-members" element={<AddMembers />} />
          <Route path="/member/:id" element={<Member />} />
          <Route path="/dashboard" element={<Dasboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

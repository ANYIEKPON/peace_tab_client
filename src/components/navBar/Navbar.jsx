import React, { useEffect, useState } from "react";
import { IoSearchOutline, IoBusinessOutline } from "react-icons/io5";
import { IoMdContact, IoMdClose, IoIosLogOut } from "react-icons/io";
import { MdOutlineDashboard, MdOutlineCardMembership } from "react-icons/md";
import { FaRegAddressBook } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import "./navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchOpen, setOpenSearch] = useState(false);
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [showSide, setShowSide] = useState(true);

  const responsive = () => {
    const windowWidth = window.screen.width;
    if (windowWidth < 981) {
      setShowSide(false);
    } else {
      setShowSide(true);
    }
  };

  // window.addEventListener("resize", responsive);
  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, [localStorage.getItem("user")]);

  useEffect(() => {
    window.addEventListener("resize", responsive);
    // return () => window.removeEventListener("resize", responsive);
  }, []);

  const handleClick = () => {};
  const handleClickSearch = () => {
    setOpenSearch((prev) => !prev);
  };

  console.log(user);

  const openNav = () => {
    setNav((prev) => !prev);
  };

  const handleNav = () => {
    setNav((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    setNav((prev) => !prev);
  };

  return (
    <div className="Attendance">
      <section className="wrapper-attend">
        <div className="topBar">
          <div className={open ? "nonDis" : "left"}>
            <div className="icon">
              <IoMdContact size={30} />
            </div>
            <span>King</span>
          </div>
          <div className="right">
            {showSide ? (
              <div className="menuDesk">
                <ul className="menuList">
                  <li onClick={handleClick}>
                    <Link to="/dashboard" className="link">
                      <MdOutlineDashboard size={20} /> <span>Dashboard</span>
                    </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link to="/report" className="link">
                      <MdOutlineDashboard size={20} /> <span>Report</span>
                    </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link className="link" to="/members">
                      <MdOutlineCardMembership size={20} /> <span>Members</span>
                    </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link className="link" to="add-members">
                      <FaRegAddressBook size={20} /> <span>Add Member</span>
                    </Link>
                  </li>
                  <li onClick={handleClick}>
                    <Link to="/attendance" className="link">
                      <FaRegAddressBook size={20} />{" "}
                      <span>Take Attendance</span>
                    </Link>
                  </li>
                  <li>
                    <FaRegAddressBook size={20} /> <span>Businesses</span>
                  </li>
                  <li>
                    <Link className="link" to="/" onClick={handleLogout}>
                      <IoIosLogOut size={20} /> <span>Log-Out</span>
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <div className={nav ? "menu" : "menuz"}>
                <IoMdClose size={40} onClick={handleNav} className="close" />
                <ul className="menuList">
                  <li>
                    <Link to="/dashboard" className="link" onClick={handleNav}>
                      <MdOutlineDashboard size={20} /> <span>Dashboard</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/report" className="link" onClick={handleNav}>
                      <MdOutlineDashboard size={20} /> <span>Report</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="/members" onClick={handleNav}>
                      <MdOutlineCardMembership size={20} /> <span>Members</span>
                    </Link>
                  </li>
                  <li>
                    <Link className="link" to="add-members" onClick={handleNav}>
                      <FaRegAddressBook size={20} /> <span>Add Member</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/attendance" className="link" onClick={handleNav}>
                      <FaRegAddressBook size={20} />
                      <span>Take Attendance</span>
                    </Link>
                  </li>
                  <li>
                    <FaRegAddressBook size={20} onClick={handleNav} />{" "}
                    <span>Businesses</span>
                  </li>
                  <li>
                    <Link to="/" className="link" onClick={handleLogout}>
                      <IoIosLogOut size={20} /> <span>Log-Out</span>
                    </Link>
                  </li>
                </ul>
              </div>
            )}

            <div className="search">
              <IoSearchOutline size={25} onClick={handleClickSearch} />
              <div className={searchOpen ? "searchDiv" : "closeSeach"}>
                <input
                  className="searchText"
                  type="text"
                  placeholder="Search by name"
                />
              </div>
            </div>

            <div className="navBar">
              <FiMenu onClick={openNav} size={30} />
            </div>
          </div>
        </div>
        <div className="titleBar">
          <h3>Peace Tab Database</h3>
        </div>
      </section>
    </div>
  );
};

export default Navbar;

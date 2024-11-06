import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./member.scss";

const Member = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[2];
  const [getmember, setGetmember] = useState({});
  const [showStus, setShowStatus] = useState(false);

  const showIt = () => {
    if (getmember.marital_status === "single") {
      setShowStatus(false);
    } else {
      setShowStatus(true);
    }
  };

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(
          `https://peace-tab-database.onrender.com/api/member/${id}`
        );
        setGetmember(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMember();
    showIt();
  }, [id]);

  const openEdit = () => {
    navigate("/add-members", { state: { id: getmember._id } });
  };

  return (
    <div className="memberContner">
      <div className="memberWraper">
        <div className="pyp">
          <label>Full Names:</label>
          <span>{getmember.full_names}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Serial No:</label>
          <span>{getmember.serial_no}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Email:</label>
          <span>{getmember.email}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Phone Number:</label>
          <span>{getmember.phone_nno}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Address:</label>
          <span>{getmember.address}</span>
        </div>
        <div className="pyp">
          <label>Bus-stop:</label>
          <span>{getmember.bus_stop}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Birthday: </label>
          <span>{getmember.birth_day}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Worker:</label>
          <span>{getmember.worker}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Next of Kin:</label>
          <span>{getmember.nextof_kin}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>Marital Status:</label>
          <span>{getmember.marital_status}</span>
        </div>
        <hr />
        {showStus && (
          <>
            <div className="pyp">
              <label>Spouse Name:</label>
              <span>{getmember.spouse_name}</span>
            </div>
            <hr />
            <div className="pyp">
              <label>Number of Children:</label>
              <span>{getmember.number_children}</span>
            </div>
          </>
        )}
        <hr />
        <div className="pyp">
          <label>Profession:</label>
          <span>{getmember.profession}</span>
        </div>
        <hr />
        <div className="pyp">
          <label>New Member:</label>
          <span>{getmember.new_member}</span>
        </div>
        <hr />
        <div onClick={openEdit} className="submtBtn">
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Member;

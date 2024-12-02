import React, { useEffect, useState } from "react";
import axios from "axios";
import "./addMembers.scss";
import { useLocation } from "react-router-dom";

const AddMembers = () => {
  const optionsM = [
    { label: "Indicate", value: "" },
    { label: "Married", value: "Married" },
    { label: "Single", value: "Single" },
  ];

  const optionsNewM = [
    { label: "Indicate", value: "" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const optionsW = [
    { label: "Indicate", value: "" },
    { label: "Yes", value: "Yes" },
    { label: "No", value: "No" },
  ];

  const [status, setStatus] = useState(false);
  const [worker, setWorker] = useState("");
  const [marital, setMarital] = useState("");
  const [newMembers, setNewMembers] = useState("");
  const [serialNo, setSerialno] = useState("");
  const [fullName, setFullName] = useState(" ");
  const [action, setAction] = useState(false);
  const [allMembers, setallMembers] = useState([]);
  const [members, setMembers] = useState({
    full_names: "",
    serial_no: "",
    email: "",
    phone_no: null,
    address: "",
    bus_stop: "",
    birth_day: "",
    worker: "",
    nextof_kin: "",
    spouse_name: "",
    number_children: "",
    new_member: "",
    profession: "",
  });

  const location = useLocation();
  const id = location.state?.id;

  useEffect(() => {
    const getMembrs = async () => {
      try {
        const res = await axios.get(
          "https://peace-tab-database.onrender.com/api/member"
        );
        setallMembers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMembrs();
  }, [serialNo, fullName]);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(
          `https://peace-tab-database.onrender.com/api/member/${id}`
        );
        setMembers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMember();
  }, []);

  // const handleSelect = (e) => {
  //   const value = e.target.value;
  //   setWorker(value);
  // };
  // const handleMember = (e) => {
  //   const value = e.target.value;
  //   setNewMembers(value);
  // };

  // const handleNames = (e) => {
  //   const value = e.target.value;
  //   const trimmedVal = value.trim();
  //   setFullName(trimmedVal);
  // };

  // const handleSerialNo = (e) => {
  //   const value = e.target.value;
  //   const trimmedVal = value.toUpperCase().trim();
  //   setSerialno(trimmedVal);
  // };

  // const maritalSta = (e) => {};

  const handleChange = (e) => {
    if (e.target.value === "Married") {
      setStatus(true);
      setMarital(e.target.value);
    } else {
      setStatus(false);
    }
    setMembers((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const subMembers = {
    marital_status: marital,
    ...members,
  };

  // const updated = { ...subMembers };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      try {
        await axios.put(
          `https://peace-tab-database.onrender.com/api/member/update_member/${id}`,
          subMembers
        );
        alert("Member Updated");
      } catch (error) {
        console.log(error);
      }
    } else {
      allMembers.forEach((member) => {
        if (member.full_names === members.full_names) {
          alert("Name already in Databaase, plese change");
        }
      });

      allMembers.forEach((member) => {
        if (member.serial_no === members.serial_no) {
          alert("Serial No alredy in Database, Please change");
        }
      });
      try {
        console.log("about");
        await axios.post(
          "https://peace-tab-database.onrender.com/api/member/create_memeber",
          subMembers
        );
        console.log("sent");
        alert("Member created");
        wimdow.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="membersContainer">
      <div className="membersWrapper">
        <div className="subHead">
          <h3>Adding Members</h3>
        </div>
        <form className="addMembers" onSubmit={handleSubmit}>
          <div className="membrs">
            <label>Full Names</label>
            <input
              type="text"
              placeholder="Full Names"
              id="full_names"
              onChange={handleChange}
              value={members?.full_names}
            />
          </div>
          <div className="membrs">
            <label>Serial Number </label>
            <input
              type="text"
              placeholder="Serial Number"
              id="serial_no"
              onChange={handleChange}
              value={members?.serial_no}
            />
          </div>
          <div className="membrs">
            <label>Email </label>
            <input
              disabled={action}
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
              value={members?.email}
            />
          </div>
          <div className="membrs">
            <label>Phone Number</label>
            <input
              type="number"
              placeholder="Phone Number"
              id="phone_no"
              onChange={handleChange}
              value={members?.phone_no}
            />
          </div>
          <div className="membrs">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              onChange={handleChange}
              value={members?.address}
            />
          </div>
          <div className="membrs">
            <label>Bus-Stop</label>
            <input
              type="text"
              placeholder="Address"
              id="bus_stop"
              onChange={handleChange}
              value={members?.bus_stop}
            />
          </div>
          <div className="membrs">
            <label>Birthday</label>
            <input
              type="date"
              placeholder="Birthday"
              id="birth_day"
              onChange={handleChange}
              value={members?.birth_day}
            />
          </div>
          <div className="membrsOpt">
            <label>A Worker</label>
            <select className="select" id="worker" onChange={handleChange}>
              {optionsW.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div className="membrs">
            <label>Next of Kin</label>
            <input
              id="nextof_kin"
              onChange={handleChange}
              type="text"
              placeholder="Name"
              value={members?.nextof_kin}
            />
          </div>
          <div className="membrsOpt">
            <label>Marital Status</label>
            <select
              className="select"
              id="marital_status"
              onChange={(e) => handleChange(e)}
            >
              {optionsM.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          {status && (
            <div>
              <div className="membrs">
                <label>Spouse Name</label>
                <input
                  type="text"
                  placeholder="Spouse Name"
                  id="spouse_name"
                  onChange={handleChange}
                  value={members?.spouse_name}
                />
              </div>
              <div className="membrs">
                <label>Number of Children</label>
                <input
                  type="number"
                  id="number_children"
                  onChange={handleChange}
                  placeholder="Number of Children"
                  value={members?.number_children}
                />
              </div>
            </div>
          )}
          <div className="membrs">
            <label>Profession</label>
            <input
              type="text"
              id="profession"
              onChange={handleChange}
              placeholder="Profession"
              value={members?.profession}
            />
          </div>
          <div className="membrsOpt">
            <label>New Member</label>
            <select className="select" id="new_member" onChange={handleChange}>
              {optionsNewM.map((option) => (
                <option value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          <div type="submit" className="submtBtn">
            <button type="submit">{id ? "Update" : "Submit"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembers;

// https://peace-tab-database.onrender.com/

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./takeattendance.scss";

const TakeAttendance = () => {
  const preDate = new Date();
  const actaDate = preDate.getDate();

  const [allMem, setAllmem] = useState([]);
  const [seletDate, setSelectdate] = useState(actaDate);
  const [objtMem, setObjtMem] = useState({});
  const [objtMembr, setObjtMember] = useState([]);
  const [entredNum, setEnterNum] = useState(" ");

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await axios.get(
          "https://peace-tab-database.onrender.com/api/member"
        );
        setAllmem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, []);

  const checkSerialNO = (e) => {
    e.preventDefault();
    setEnterNum(e.target.value);
  };

  const selectDate = (e) => {
    e.preventDefault();
    setSelectdate(e.target.value);
  };

  const addToAttndnce = () => {
    if (entredNum === " ") return alert("Enter a Valid Serial Number");
    const value = allMem.find((memb) => memb.serial_no === entredNum);
    console.log(value);
    let temp = [...objtMembr];
    if (temp.includes(value)) return alert("already exist");
    setObjtMember([...objtMembr, value]);
  };

  const handleRemove = (e) => {
    const id = e.target.id;
    const temp = [...objtMembr];
    temp.splice(id, 1);
    setObjtMember(temp);
  };

  const absentee = async () => {
    const objt = objtMembr;
    const temp = allMem;

    for (let i = 1; i <= objt.length; i++) {
      temp.splice(objt[i], 1);
    }

    console.log(temp);
    console.log(objt);

    const present = {
      date: seletDate,
      present: objt,
    };
    const absent = {
      date: seletDate,
      absent: temp,
    };

    try {
      await axios.post(
        "https://peace-tab-database.onrender.com/api/presentMem/createpresent",
        present
      );
      alert("Attendance Taken");
    } catch (error) {
      console.log(error);
    }

    try {
      await axios.post(
        "https://peace-tab-database.onrender.com/api/absent/createabsent",
        absent
      );
      alert("Attendance Taken");
    } catch (error) {
      console.log(error);
    }
    window.location.reload();
  };

  return (
    <div className="atndnceWraper">
      <div className="container">
        <h2>Members Attendance</h2>

        <div className="dateSelect">
          <input
            type="date"
            placeholder="Select Date"
            className="DatePicker"
            value={seletDate}
            onChange={selectDate}
          />
        </div>

        <div className="inputDiv">
          <input
            type="text"
            placeholder="Enter Serial Number"
            onChange={checkSerialNO}
          />
          <button onClick={addToAttndnce}>Add</button>
        </div>

        <section className="tableDiv">
          <table className="tableTT">
            <tr className="tableHead">
              <th className="sn">Action</th>
              <th>Name</th>
              <th>Serial N0.</th>
              <th>Phone No</th>
              <th>Address</th>
            </tr>
            {objtMembr &&
              objtMembr.map((member) => (
                <tr className="tableData" key={member._id}>
                  <td className="sn">
                    <span id={member._id} onClick={handleRemove}>
                      remove
                    </span>
                  </td>
                  <td>{member.full_names}</td>
                  <td>{member.serial_no}</td>
                  <td>{member.phone_no}</td>
                  <td>{member.address}</td>
                </tr>
              ))}
          </table>
        </section>
        <div className="submit" onClick={absentee}>
          <button>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default TakeAttendance;

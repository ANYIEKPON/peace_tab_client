import React, { useState } from "react";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";
import "./report.scss";

const Report = () => {
  const preDate = new Date();
  const actaDate = preDate.getDate();
  const [seletDate, setSelectdate] = useState(actaDate);
  const [pres, setPresent] = useState([]);
  const [abss, setAbsent] = useState([]);

  const selectDate = (e) => {
    e.preventDefault();
    setSelectdate(e.target.value);
  };

  const getAbsent = async () => {
    try {
      const res = await axios.get(
        `https://peace-tab-database.onrender.com/api/absent/getbydate?date=${seletDate}`
      );
      const result = res.data.map((dat) => dat.absent);
      const [anoder] = result.map((dat) => dat);
      setAbsent(anoder);
    } catch (error) {
      console.log(error);
    }
  };

  const getPresent = async () => {
    try {
      const res = await axios.get(
        `https://peace-tab-database.onrender.com/api/presentMem/getbydate?date=${seletDate}`
      );
      const result = res.data.map((dat) => dat.present);
      const [anoder] = result.map((dat) => dat);
      setPresent(anoder);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getReport = () => {
    getAbsent();
    getPresent();
  };

  return (
    <div className="reportWrapper">
      <div className="container">
        <div className="wrapDiv">
          <div className="headerDateItem">
            <label>Select Date</label>
            <input
              type="date"
              placeholder="selectdate"
              className="DatePicker"
              value={seletDate}
              onChange={selectDate}
            />
            <button className="btbtn" onClick={getReport}>
              Check
            </button>
          </div>
          <div className="totalNum">
            <div className="present">
              <label>Total Present</label>
              <span>{pres.length}</span>
            </div>
            <div className="absent">
              <label>Total Absent</label>
              <span>{abss.length}</span>
            </div>
          </div>
        </div>
        <div className="dosePresent">
          <span>Member's Present</span>
          <section className="tableDiv">
            <table className="tableTT">
              <tr className="tableHead">
                <th className="sn">S/N</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Address</th>
              </tr>
              {pres &&
                pres.map((res) => (
                  <tr className="tableData">
                    <td className="sn">{res.serial_no}</td>
                    <td>{res.full_names}</td>
                    <td>{res.phone_no}</td>
                    <td>{res.address}</td>
                  </tr>
                ))}
            </table>
          </section>
        </div>
        <div className="doseAbsent">
          <span> Member's Absent</span>
          <section className="tableDiv">
            <table className="tableTT">
              <tr className="tableHead">
                <th className="sn">S/N</th>
                <th>Name</th>
                <th>Phone No</th>
                <th>Address</th>
              </tr>
              {abss &&
                abss.map((dat) => (
                  <tr className="tableData" key={dat.serial_no}>
                    <td className="sn">{dat.serial_no}</td>
                    <td>{dat.full_names}</td>
                    <td>{dat.phone_no}</td>
                    <td>{dat.address}</td>
                  </tr>
                ))}
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;

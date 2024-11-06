import React, { useState, useEffect } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts/BarChart";
import "./dashboard.scss";

const uData = [30, 20, 40, 38];
const pData = [40, 45, 35, 39];
const xLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];

const Dasboard = () => {
  const [month, setMonth] = useState("2024-10");
  const [resData, setResData] = useState([]);
  const [day, setDay] = useState(0);
  const [yearMonth, setYearMonth] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();
    setMonth(e.target.value);
  };

  const daay = month.split("-")[1] - 1;

  const calender = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "OCtober",
    "November",
    "December",
  ];

  console.log(typeof month);

  useEffect(() => {
    const getMembers = async () => {
      try {
        const res = await axios.get(
          "https://peace-tab-database.onrender.com/api/member"
        );
        setResData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMembers();

    const getNoBdays = () => {
      setYearMonth(daay);

      const newArr = [];

      resData.forEach((val) => {
        const { birth_day, ...restdat } = val;
        const res = birth_day.split("-")[1];
        newArr.push(parseInt(res));
      });

      const exactNum = newArr.filter((dayNum) => {
        return dayNum === daay;
      });

      setDay(exactNum.length);
    };

    getNoBdays();
  }, [month]);

  return (
    <div className="dashwrper">
      <div className="dashContner">
        <div className="dashboardDate">
          <label>Select Date :</label>
          <input
            type="month"
            placeholder="selectdate"
            className="DatePicker"
            onChange={handleChange}
            value={month}
            min="2024-10"
          />
          {/* <button className="btbtn">Check</button> */}
        </div>
        <div className="dashboardCard">
          <div className="card">
            <span>Total Members for {calender[daay]}</span>
            <h3>6</h3>
          </div>
          <div className="card">
            <span>Total New Member for {calender[daay]}</span>
            <h3>6</h3>
          </div>
          <div className="card">
            <span>Numbers of Birthday for {calender[daay]}</span>
            <h3>{day}</h3>
          </div>
        </div>
        {/* <div className="baarChart">
          <BarChart
            className="bar"
            width={400}
            height={350}
            series={[
              { data: pData, label: "men", id: "pvId", stack: "total" },
              { data: uData, label: "women", id: "uvId", stack: "total" },
            ]}
            xAxis={[{ data: xLabels, scaleType: "band" }]}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Dasboard;

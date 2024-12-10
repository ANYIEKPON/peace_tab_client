import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./members.scss";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Members = () => {
  const [members, setMembers] = useState([]);
  const [pages, setPages] = useState([]);
  const [display, setDisplay] = useState([]);
  const dat = useRef(members);

  const deleteMember = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(
        `https://peace-tab-database.onrender.com/api/member/deletemember/${e.target.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(members.length);

  useEffect(() => {
    const getMembers = async () => {
      const arr = [];
      try {
        const res = await axios.get(
          "https://peace-tab-database.onrender.com/api/member"
        );
        setMembers(res.data);
        const resData = members.slice(0, 8);
        setDisplay(resData);
        const numb = Math.ceil(members.length / 8);
        for (let i = 1; i <= numb; i++) {
          arr.push(i);
        }
        setPages(arr);
      } catch (error) {
        console.log(error);
      }
    };
    getMembers();
  }, []);

  const showDisplay = (e) => {
    //  const numbs = Math.ceil(members.length / 8);
    const numb = e.target.id;
    const numToUse = numb - 1;
    const fIndex = numToUse * 8;
    const jstRes = numb * 8;
    const addOne = jstRes;
    const res = members.slice(fIndex, addOne);
    setDisplay(res);

    // for(let i = 1; i = numb; i++) {

    // }
  };

  return (
    <div className="tableWrapper">
      <section className="tableSection">
        <table className="tableT">
          <tr className="tableHead">
            <th className="sn">Serial No.</th>
            <th className="ac">Action</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>Address</th>
            <th>Bus-stops</th>
            <th className="bstop">Birthday</th>
            <th>Profession</th>
            <th>New Member</th>
          </tr>
          {display &&
            display.map((member) => (
              <tr className="tableData" key={member._id}>
                <td className="sn">{member.serial_no}</td>
                <td className="editable">
                  <Link className="links" to={`/member/${member._id}`}>
                    <button className="edit">Edit</button>
                  </Link>
                  <button
                    id={member._id}
                    className="delete"
                    onClick={(e) => deleteMember(e)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <Link className="links" to={`/member/${member._id}`}>
                    {member.full_names}
                  </Link>
                </td>
                <td>{member.email}</td>
                <td>{member.phone_no}</td>
                <td>{member.address}</td>
                <td>{member.bus_stop}</td>
                <td className="bstop">{member.birth_day}</td>
                <td>{member.profession}</td>
                <td>{member.new_member}</td>
              </tr>
            ))}
        </table>
      </section>
      <section className="lastPart">
        <div className="lastUpdate">Last updated by Media Team</div>
        <div className="page">
          <span>
            page
            {pages.map((pp, i) => (
              <p id={i + 1} key={i} onClick={showDisplay}>
                {pp}
              </p>
            ))}
          </span>
          {/* <div>
            <MdOutlineKeyboardArrowLeft />
          </div>
          <div>
            <MdOutlineKeyboardArrowRight />
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default Members;

import React from "react";
import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allusers = useSelector((state) => state.app.users);
  const singleUser = allusers.find((ele) => ele.id === id);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="modalHeader">
          <h2>User Details</h2>
          <button className="closeButton" onClick={() => setShowPopup(false)}>
            Close
          </button>
        </div>
        {singleUser && (
          <table className="modalTable">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{singleUser.name}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{singleUser.email}</td>
              </tr>
              <tr>
                <th>Age</th>
                <td>{singleUser.age}</td>
              </tr>
              <tr>
                <th>Gender</th>
                <td>{singleUser.gender}</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CustomModal;

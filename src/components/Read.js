import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, showUser } from "../redux/userSlice";
import CustomModal from "./CustomModal";
import { toast } from "react-toastify";

const Read = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState();
  const [radioData, setRadioData] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { users, loading, searchData } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  const handleDelete = (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      dispatch(deleteUser(userId));
      toast.success("User deleted successfully!");
    }
  };

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <div>
      {showPopup && (
        <CustomModal id={id} showPopup={showPopup} setShowPopup={setShowPopup} />
      )}
      <h2>All Data</h2>
      <div className="form-check mb-3">
        <div className="form-check-inline">
          <input
            className="form-check-input"
            name="gender"
            checked={radioData === ""}
            type="radio"
            onChange={() => setRadioData("")}
          />
          <label className="form-check-label">All</label>
        </div>
        <div className="form-check-inline">
          <input
            className="form-check-input"
            name="gender"
            checked={radioData === "Male"}
            value="Male"
            type="radio"
            onChange={(e) => setRadioData(e.target.value)}
          />
          <label className="form-check-label" >Male</label>
        </div>
        <div className="form-check-inline">
          <input
            className="form-check-input"
            name="gender"
            value="Female"
            checked={radioData === "Female"}
            type="radio"
            onChange={(e) => setRadioData(e.target.value)}
          />
          <label className="form-check-label" >Female</label>
        </div>
      </div>

      <div>
        {users &&
          users
            .filter((ele) => {
              if (searchData.length === 0) {
                return ele;
              } else {
                return ele.name.toLowerCase().includes(searchData.toLowerCase());
              }
            })
            .filter((ele) => {
              if (radioData === "Male") {
                return ele.gender === radioData;
              } else if (radioData === "Female") {
                return ele.gender === radioData;
              } else return ele;
            })
            .map((ele) => (
              <div key={ele.id} className="card w-50 mx-auto my-2">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.gender}</p>
                  <button
                    className="card-link"
                    onClick={() => [setId(ele.id), setShowPopup(true)]}
                  >
                    View
                  </button>
                  <Link to={`/edit/${ele.id}`} className="card-link">Edit</Link>
                  <Link
                    onClick={() => handleDelete(ele.id)} // Use handleDelete here
                    className="card-link"
                  >
                    Delete
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Read;

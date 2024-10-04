import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../redux/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const users = useSelector((state) => state.app.users);
  const user = users.find((ele) => ele.id === parseInt(id));

  useEffect(() => {
    if (!user) {
      navigate("/read");
    }
  }, [user, navigate]);

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      age: user?.age || '',
      gender: user?.gender || '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .required("Name is required"),
      email: Yup.string().email("Invalid email format").required("Email is required"),
      age: Yup.number().positive("Age must be a positive number").required("Age is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      dispatch(updateUser({ ...user, ...values }));
      toast.success("User updated successfully!");
      navigate("/read");
    },
  });

  return (
    <div className="form-container my-5">
      <h2 className="text-center form-title">Edit the data</h2>
      <form className="form-box" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="name"
            className={`form-control custom-input ${formik.errors.name ? "is-invalid" : ""}`}
            value={formik.values.name}
            onChange={formik.handleChange}
            placeholder="Enter your name"
          />
          {formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
        </div>
        <div className="mb-3">
          <input
            type="email"
            name="email"
            className={`form-control custom-input ${formik.errors.email ? "is-invalid" : ""}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Enter your email"
          />
          {formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="age"
            className={`form-control custom-input ${formik.errors.age ? "is-invalid" : ""}`}
            value={formik.values.age}
            onChange={formik.handleChange}
            placeholder="Enter your age"
          />
          {formik.errors.age && <div className="invalid-feedback">{formik.errors.age}</div>}
        </div>
        <div className="mb-4">
          <div className="custom-radio-group">
            <label className="custom-radio">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formik.values.gender === "Male"}
                onChange={formik.handleChange}
              />
              <span className="radio-btn">Male</span>
            </label>
            <label className="custom-radio">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formik.values.gender === "Female"}
                onChange={formik.handleChange}
              />
              <span className="radio-btn">Female</span>
            </label>
          </div>
          {formik.errors.gender && <div className="text-danger">{formik.errors.gender}</div>}
        </div>

        <button type="submit" className="btn btn-primary custom-button">
          Submit
        </button>
        <Link to="/read" className="btn btn-danger custom-button">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default Update;

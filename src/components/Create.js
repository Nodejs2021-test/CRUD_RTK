import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../redux/userSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; 

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    age: "",
    gender: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    age: Yup.number().positive("Age must be a positive number").required("Age is required"),
    gender: Yup.string().required("Gender is required"),
  });

  const handleSubmit = (values) => {
    dispatch(createUser(values));
    toast.success("User created successfully!"); // Success toast
    navigate("/read");
  };

  return (
    <div className="form-container my-5">
      <h2 className="text-center form-title">Fill Your Information</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form className="form-box">
            <div className="mb-4">
              <Field
                type="text"
                name="name"
                className="form-control custom-input"
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="text-danger" />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                name="email"
                className="form-control custom-input"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-danger" />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                name="age"
                className="form-control custom-input"
                placeholder="Enter your age"
              />
              <ErrorMessage name="age" component="div" className="text-danger" />
            </div>
            <div className="mb-4">
              <div className="custom-radio-group">
                <label className="custom-radio">
                  <Field
                    type="radio"
                    name="gender"
                    value="Male"
                  />
                  <span className="radio-btn">Male</span>
                </label>
                <label className="custom-radio">
                  <Field
                    type="radio"
                    name="gender"
                    value="Female"
                  />
                  <span className="radio-btn">Female</span>
                </label>
              </div>
              <ErrorMessage name="gender" component="div" className="text-danger" />
            </div>

            <button type="submit" className="btn btn-primary custom-button">
              Submit
            </button>
            <Link to='/read' className="btn btn-danger custom-button">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;

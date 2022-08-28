import { Formik, Form } from "formik";
import React, { useState, CSSProperties } from "react";
import RegisterInput from "../inputs/registerinput";
import * as Yup from "yup";
import DateOfBirth from "./DateOfBirth";
import GenderSelect from "./GenderSelect";
import DotLoader from "react-spinners/DotLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfos = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "",
  };
  const [user, setUser] = useState(userInfos);
  const {
    first_name,
    last_name,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = user;
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const yearTemp = new Date().getFullYear();
  const years = Array.from(new Array(108), (val, index) => yearTemp - index);
  const months = Array.from(new Array(12), (val, index) => 1 + index);
  const getDays = () => {
    return new Date(bYear, bMonth, 0).getDate();
  };
  const days = Array.from(new Array(getDays()), (val, index) => 1 + index);
  const registerValidation = Yup.object({
    first_name: Yup.string()
      .required("Whats your first name?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ\s]+$/, "Number and special characters are not alowed."),
    last_name: Yup.string()
      .required("Whats your last name?")
      .min(2, "Last name must be between 2 and 16 characters.")
      .max(16, "Last name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ\s]+$/, "Number and special characters are not alowed."),
    email: Yup.string()
      .required("Email is required.")
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers letters and punctuation marks."
      )
      .min(6, "Password must be between 2 and 36 characters.")
      .max(36, "Password must be between 2 and 36 characters."),
  });

  const [dateError, setDateError] = useState("");
  const [genderError, setGenderError] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          first_name,
          last_name,
          email,
          password,
          bYear,
          bMonth,
          bDay,
          gender,
        }
      );
      setError("");
      setLoading(false);
      setSuccess(data.message);
      const { message, ...rest } = data;
      setTimeout(() => {
        dispatch({ type: "LOGIN", payload: rest });
        Cookies.set("user", JSON.stringify(rest));
        navigate("/");
      }, 2000);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.respone.data.message);
    }
  };
  console.log(success);
  return (
    <div className='blur'>
      <div className='register'>
        <div className='register_header'>
          <i className='exit_icon' onClick={() => setVisible(false)}></i>
          <span>Sign Up</span>
          <span>It's quick and easy</span>
        </div>
        <Formik
          enableReinitialize
          initialValues={{
            first_name,
            last_name,
            email,
            password,
            bYear,
            bMonth,
            bDay,
            gender,
          }}
          validationSchema={registerValidation}
          onSubmit={() => {
            let current_date = new Date();
            let picked_date = new Date(bYear, bMonth - 1, bDay);
            let atleast14 = new Date(1970 + 14, 0, 1);
            let noMoreThan70 = new Date(1970 + 70, 0, 1);
            if (current_date - picked_date < atleast14) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (current_date - picked_date > noMoreThan70) {
              setDateError(
                "It looks like you've entered the wrong info. Please make sure that you use your real date of birth."
              );
            } else if (gender === "") {
              setDateError("");
              setGenderError(
                "Please choose a gender. You can change who can see this later."
              );
            } else {
              setDateError("");
              setGenderError("");
              registerSubmit();
            }
          }}
        >
          {(formik) => (
            <Form className='register_form'>
              <div className='reg_line name'>
                <RegisterInput
                  type='text'
                  name='first_name'
                  placeholder='First Name'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='text'
                  name='last_name'
                  placeholder='Last Name'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_line'>
                <RegisterInput
                  type='text'
                  name='email'
                  placeholder='Mobile Phone or Email'
                  onChange={handleRegisterChange}
                />
                <RegisterInput
                  type='password'
                  name='password'
                  placeholder='New Password'
                  onChange={handleRegisterChange}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Date of birth <div className='i info_icon'></div>
                </div>
                <DateOfBirth
                  bDay={bDay}
                  bMonth={bMonth}
                  bYear={bYear}
                  dateError={dateError}
                  handleRegisterChange={handleRegisterChange}
                  days={days}
                  months={months}
                  years={years}
                />
              </div>
              <div className='reg_col'>
                <div className='reg_line_header'>
                  Gender <div className='i info_icon'></div>
                </div>
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
              </div>
              <div className='reg_infos'>
                By clicking Sign Up, you agree to our{" "}
                <span>Terms, Data Policy &nbsp;</span>
                and <span>Cookie Policy.</span> You may receive sms
                notifications from our service.
              </div>
              <div className='reg_btn_wrapper'>
                <button className='blue_btn open_signup'>Sign Up</button>
              </div>
              {error && <div className='error_text'>{error}</div>}
              {success && <div className='success_text'>{success}</div>}
              <DotLoader color='#1876f2' loading={loading} size={30} />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;

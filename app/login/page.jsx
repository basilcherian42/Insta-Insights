"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from './login.module.css'; 
import Link from 'next/link';
import login_validate from "./validatelogin";
import { useFormik } from "formik";
import CustomAlert2 from "../components/customalert2/CustomAlert2";
import CustomAlert3 from "../components/customalert3/CustomAlert3";
import { FaEyeSlash,FaEye } from "react-icons/fa";
import { HiAtSymbol } from "react-icons/hi2";


const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to track error message
  const [showAlert, setShowAlert] = useState(false);//this represents the state of alertbox when login is not successful
  const [showAlert2, setShowAlert2] = useState(false);// this represents the state of alertbox when login is successfull
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues:{
        email:'',
        password: ''
    },
    validate: login_validate
  });

  const submitHandler = async (data) => {
    setLoading(true); 
    const resdata = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(resdata);
    if (
      resdata.status === 400 ||
      resdata.status === 401 ||
      resdata.status === 403
    ) {
      setLoading(false); 
      setError("Invalid Credentials!!");
        setShowAlert(true); // Show the alert
    } else if (resdata.status === 500) {
      console.log("Server error!");
      setError("Server error!");
    } else {
      // alert('Login successful!');
      // router.push('/Services');
      setShowAlert2(true); // Show the alert
      // router.push('/Services');
      console.log(resdata);
    }
  };

  return (
    <div className="flex h-screen gradient__bg">
      <div className="m-auto bg-black rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
        <div className={styles.imgStyle}>
          <div className={styles.cartoonImg}>
            <div className={styles.cloud_one}></div>
            <div className={styles.cloud_two}></div>
          </div>
        </div>
        <div className="right flex flex-col justify-evenly bg-black rounded-tr-md rounded-br-md ">
          <div className="text-center py-10">
            <section className={styles.login_section}>
              <div className={styles.login_section}>
                <h1>LOGIN</h1>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                submitHandler({
                  email: e.target.email.value,
                  password: e.target.password.value,
                });
              }} className={styles.login_form}>
                <div className={styles.login_input}>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder='Email'
                    className={styles.login_input}
                    {...formik.getFieldProps('email')}
                  />
                   <span  className={styles.login_input_icon} >
                  <HiAtSymbol size={25} />
                  </span>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <span className="text-red-500">{formik.errors.email}</span>
                )}
                <div className={styles.login_input}>
                  <input
                    type={`${showPassword ? "text" :"password"}`}
                    id="password"
                    name="password"
                    placeholder='Password'
                    className={styles.login_input}
                  />                 
                  <span className={styles.login_input_icon} onClick={()=>  setShowPassword(!showPassword)}>
                      {showPassword ? <FaEye size={23} /> : <FaEyeSlash size={25} />}
                  </span>
                  
                </div>
                <div className={styles.login_button}>
                  <button type='submit' disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </form>
              {showAlert && error && <CustomAlert2 message={error} buttonText="OK" onClose={() => setShowAlert(false)} />}
              {showAlert2 && <CustomAlert3 buttonText="Explore Services" />}
              <p className={styles.login_signup}>Dont have an Account?  <Link href={'/register'}>Sign Up</Link></p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

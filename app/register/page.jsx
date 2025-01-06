'use client'
import React, { use, useState } from "react";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './register.module.css'; 
import Link from 'next/link';
import register_validate from "./validateregister";
import { useFormik } from "formik";
import { FaEyeSlash,FaEye } from "react-icons/fa";
import { HiAtSymbol } from "react-icons/hi2";


const Register = () => {
    const router = useRouter();
    const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "register";
    const [loading, setLoading] = useState(false); // State to track loading status
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);

    const formik =useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            cpassword:''
        },
        validate:register_validate
    })

    const submitHandler = async (data) => {

        const requestBody = {
            email: data.email,
            name: data.name,
            password: data.password
        }

        try {
            setLoading(true); 
            const response = await axios.post(baseURL, requestBody);
            console.log(response.data);
            alert('Account created!');
            router.push('/login');
            
        } catch (error) {
            setLoading(false); 
            console.error('Error:', error.response);
            // setError(error.response.data.message);
            setError(error.response ? error.response.data.message : Object.keys(formik.errors).length !== 0);

        }
   
    };
    

    return (
    <div className="flex h-screen gradient__bg">
        <div className="m-auto bg-black rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
            <div className={styles.imgStyle}>
                    <div className={styles.cartoonImg}>
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}> </div>
                    </div>
            </div>
            <div className="right flex flex-col justify-evenly  bg-black rounded-tr-md rounded-br-md ">
                <div className="text-center py-10">
                    <section className={styles.register_section}>
                        <div className={styles.register_section}>
                            <h1>REGISTRATION</h1>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                        <form className={styles.register_form} 
                        onSubmit={(e) => {
                            e.preventDefault();
                            submitHandler({
                                email: e.target.email.value,    
                                name: e.target.name.value,
                                password: e.target.password.value,
                            });
                        }}>
                            <div className={styles.register_input}>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder='Username'
                                    className={styles.register_input}
                                    {...formik.getFieldProps('name')}
                                />
                            </div>
                            {formik.touched.name && formik.errors.name && (
                                        <span className="text-red-500">{formik.errors.name}</span>
                                    )}                           
                            <div className={styles.register_input}>
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder='Email'
                                    className={styles.register_input}
                                    {...formik.getFieldProps('email')}
                                />
                                <span  className={styles.register_input_icon} >
                                    <HiAtSymbol size={25} />
                                </span>
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                        <span className="text-red-500">{formik.errors.email}</span>
                                    )}           
                            <div className={styles.register_input}>
                                <input
                                  type={`${showPassword ? "text" :"password"}`}
                                    name='password'
                                    placeholder='Password'
                                    className={styles.register_input}
                                    {...formik.getFieldProps('password')}
                                />
                                <span className={styles.register_input_icon} onClick={()=>  setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye size={23} /> : <FaEyeSlash size={25} />}
                                </span>
                            </div>
                            {formik.touched.password && formik.errors.password && (
                                        <span className="text-red-500">{formik.errors.password}</span>
                                    )}                            
                                <div className={styles.register_input}>
                                    <input
                                    type={`${showPassword ? "text" :"password"}`}
                                        name="cpassword"
                                        placeholder="Confirm Password"
                                        className={styles.register_input}
                                        {...formik.getFieldProps('cpassword')}
                                    />
                                    <span className={styles.register_input_icon} onClick={()=>  setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye size={23} /> : <FaEyeSlash size={25} />}
                                    </span>
                                </div>
                                {formik.touched.cpassword && formik.errors.cpassword && (
                                        <span className="text-red-500">{formik.errors.cpassword}</span>
                                    )}
                            <div className={styles.register_button}>
                                <button type='submit'  disabled={loading}>
                                {loading ? 'Registering,Hold on a minute...' : 'Register'}
                                </button>
                            </div>
                            
                        </form>
                        <p className={styles.register_signup}>Have an Account?  <Link href={'/login'}>Sign In</Link></p>

                    </section>
                </div>


            </div>
        </div>
    </div>
    );
};

export default Register;

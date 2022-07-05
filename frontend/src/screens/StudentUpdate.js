import axios from "axios";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {teacherregister, teacherupdate} from "../actions/teacherActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./Student.css";
import {studentupdate} from "../actions/studentActions";
const StudentUpdate = (props) => {
    let student = props.location.state;
    const dispatch = useDispatch();
    //TODO: Change to student fields (with the name in database)  start
    const [name, setName] = useState(student.student_name);
    const [email, setEmail] = useState(student.email);
    const [address, setAddress] = useState(student.address);
    const [gender, setGender] = useState(student.gender);
    const [phoneno, setPhoneno] = useState(student.contact_no);
    const [age, setAge] = useState(student.age);
    //TODO: Change to student fields end
    const [uploading, setUploading] = useState(false);

    const [valid, setValid] = useState(false);
    const [time, setTime] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        setValid(true);
        dispatch(
            studentupdate(
                student._id,
                //TODO: Change to student fields start
                name.trim(),
                email,
                address,
                gender,
                phoneno,
                age

                //TODO: Change to student fields end
            )
        );
        // setImage('')
        setTimeout(() => {
            setValid(false);
        }, 10000);
    };
    const userLogin = useSelector((state) => state.userLogin);
    // const userLogin = useSelector((state) => state.userLogin)

    const { userCred } = userLogin;

    // const studentRegister = useSelector((state) => state.studentRegister)
    const studentUpdate = useSelector((state) => state.studentUpdate);

    const { loading, success, error } = studentUpdate;
    useEffect(() => {
        if (!userCred) {
            props.history.push("/login");
        }
    }, [userCred, props.history]);
    return (
        //TODO: Fix form start
        <div className='container1' style={{ marginTop: "10px" }}>
            {loading ? (
                <Loader />
            ) : (
                <div className='outer-layout'>
                    <h1>Update Student</h1>
                    <form onSubmit={submitHandler}>
                        <div className='form-inner'>
                            <div className='form-control'>
                                <label htmlFor='name'>Full Name</label>
                                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className='form-control'>
                                <label htmlFor='name'>Email</label>
                                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Address</label>
                                <input
                                    type='text'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Gender</label>
                                <select required value={gender} onChange={(e) => setGender(e.target.value)}>
                                    {console.log(gender)}
                                    <option value=''>Select Gender</option>
                                    <option value='Male'>Male</option>

                                    <option value='Female'>Female</option>
                                    <option value='Others'>Others</option>
                                </select>
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Phone Number</label>
                                <input
                                    type='text'
                                    value={phoneno}
                                    onChange={(e) => setPhoneno(e.target.value)}
                                    required
                                />
                            </div>{" "}
                            <div className='form-control'>
                                <label htmlFor='name'>Age</label>
                                <input type='number' value={age} onChange={(e) => setAge(e.target.value)} required />
                            </div>
                        </div>

                        <button className='btn-register' type='submit'>
                            Update Student
                        </button>
                    </form>
                </div>
            )}
        </div>
        //TODO: Fix form end
    );
};

export default StudentUpdate;

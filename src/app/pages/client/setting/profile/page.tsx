"use client";
import "./profile.scss";
import AlertInputImg from "../../../../components/AlertInputImg";
import Image from "next/image";
import LogoUser from "../../../../../../public/img/logouser.jpg";
import { FaSave } from "react-icons/fa";
import { auth } from "../../../../config/Firebase";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { useFormik, Formik } from "formik";
import * as yup from "yup";
function Profile() {
   

    // info user
    const [img, setImg] = useState<string | any>(null);
    const [email, setEmail] = useState<string | any>("");
    const [displayName, setdisplayName] = useState<string | any>("");
    const [CreatedUser, setCreatedUser] = useState<string | any>("");
    // initialize variables
    const [emailupdate, setemailupdate] = useState<string | any>("");
    const [displayNameupdate, setdisplayNameupdate] = useState<string | any>(
        ""
    );
    const [handleCreatedUser, sethandleCreatedUser] = useState<string | any>(
        ""
    );
   
    // get data info user
    useEffect(() => {
        onAuthStateChanged(auth , (user : any) => {
            if (user) {
                setImg(user.photoURL);
                setEmail(user.email);
               
                setdisplayName(
                    user.displayName != null ? user.displayName : ""
                );
                setCreatedUser(user.metadata.createdAt);
            } else {
                console.log("no information and logout ");
            }
        });
    }, []);

    // handle data user
    useEffect(() => {
        const date = new Date(Number(CreatedUser));
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        const day = date.getDate();
        sethandleCreatedUser(`${day}/${month}/${year}`);
        setemailupdate(email);
        setdisplayNameupdate(displayName);
    
    }, [email, displayName]);
    // handle update user

    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Email không hợp lệ")
            .required("Email là bắt buộc"),
        displayName: yup
            .string()
            .min(3, "ít nhất 3 kí tự")
            .required("Họ Tên không để trống"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            displayName: "",
        },

        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            let data = {
                email: values.email,
                displayName: values.displayName,
            };
            updateProfile(auth.currentUser as any,data)
                .then((res) => {
                    console.log('update profile');
                    alert('Cập nhật Thành công')
                })
                .catch((error) => {
                    // An error occurred
                    // ...
                });
        },
    });
    useEffect(() => {
        formik.setValues({
            email: emailupdate,
            displayName: displayNameupdate,
        });
    }, [emailupdate, displayNameupdate]);
    return (
        <>
        
            <div className="flex justify-center items-center  flex-col	">
                <Image
                    className="border-3px mb-2"
                    src={img != null ? img : LogoUser}
                    width={100}
                    height={100}
                    alt="Picture of the author"
                />
                <AlertInputImg />
            </div>
            <div className="infoUser">
                <form action="" onSubmit={formik.handleSubmit}>
                    <div className="mb-3">
                        <label
                            className="text-base font-bold text-[#f98d8d]"
                            htmlFor="email"
                        >
                            Email
                        </label>{" "}
                        <br />
                        <input
                            className="w-full px-[14px] py-[12px] rounded"
                            type="email"
                            name="email"
                            id="email"
                            value={emailupdate && emailupdate}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setemailupdate(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error_message">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label
                            className="text-base font-bold text-[#f98d8d]"
                            htmlFor="displayName"
                        >
                            Họ và Tên
                        </label>{" "}
                        <br />
                        <input
                            className="w-full px-[14px] py-[12px] rounded"
                            type="text"
                            name="displayName"
                            id="displayName"
                            value={displayNameupdate && displayNameupdate}
                            onChange={(e) => {
                                formik.handleChange(e);
                                setdisplayNameupdate(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.displayName &&
                        formik.errors.displayName ? (
                            <div className="error_message">
                                {formik.errors.displayName}
                            </div>
                        ) : null}
                    </div>
                    {/* <div className="mb-3">
                        <label
                            className="text-base font-bold text-[#f98d8d]"
                            htmlFor="username"
                        >
                            Số Điện Thoại
                        </label>{" "}
                        <br />
                        <input
                            className="w-full px-[14px] py-[12px] rounded"
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            value={handlePhoneNumber && handlePhoneNumber}
                            onChange={(e) => {
                                formik.handleChange(e);
                                sethandlePhoneNumber(e.target.value);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phoneNumber &&
                        formik.errors.phoneNumber ? (
                            <div className="error_message">
                                {formik.errors.phoneNumber}
                            </div>
                        ) : null}
                    </div> */}
                    <div className="mb-3">
                        <label
                            className="text-base font-bold text-[#f98d8d]"
                            htmlFor=""
                        >
                            Ngày Tạo tài khoản
                        </label>{" "}
                        <br />
                        <input
                            type="text"
                            name="created"
                            id="created"
                            defaultValue={handleCreatedUser}
                            className="w-full px-[14px] py-[12px] rounded"
                            readOnly
                        />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="p-2 bg-[#b73a3a] rounded"
                        >
                            {" "}
                            Lưu <FaSave className="inline-block" />{" "}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Profile;

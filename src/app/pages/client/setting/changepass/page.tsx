"use client";
import { FaUserClock } from "react-icons/fa";
import { useFormik } from "formik";
import * as yup from "yup";
import { updatePassword } from "firebase/auth";
import { auth } from "../../../../config/Firebase";
import { useState } from "react";

function ChangPass() {
    const [error , seterror] = useState('')
    const validationSchema = yup.object().shape({
        pass: yup
            .string()
            .min(8, "mật khẩu ít nhất 8 kí tự")
            .required("mật khẩu không để trống")
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                "chứa ít nhất 1 chữ số , 1 từ viết Hoa và 1 từ viết thường "
            ),
        passconfir: yup
            .string()
            .min(8, "mật khẩu ít nhất 8 kí tự")
            .required("xác nhận mật khẩu không để trống")
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/,
                "chứa ít nhất 1 chữ số , 1 từ viết Hoa và 1 từ viết thường "
            ),
    });
    const formik = useFormik({
        initialValues: {
            pass: "",
            passconfir: "",
        },

        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (values.pass == values.passconfir) {
                seterror('')
                const user : any = auth.currentUser;
                updatePassword(user, values.passconfir)
                    .then(() => {
                    
                       alert('update thành công')
                    })
                    .catch((error) => {
                        // An error ocurred
                        // ...
                    });
            } else {
                seterror('mật khẩu không trùng khớp')
            }
        },
    });
    return (
        <>
            <div>
                <h3 className="text-center text-2xl font-bold text-gray-200 mb-3">
                    Đổi Mật Khẩu
                </h3>
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label
                            className="text-base font-bold text-[#f98d8d]"
                            htmlFor=""
                        >
                            Mật Khẩu Mới
                        </label>
                        <br />
                        <input
                            type="password"
                            name="pass"
                            id="pass"
                            className="w-full px-[14px] py-[12px] rounded"
                            value={formik.values.pass}
                            onChange={(e) => {
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.pass && formik.errors.pass ? (
                            <div className="error_message text-red-600">
                                {formik.errors.pass}
                            </div>
                        ) : null}
                    </div>
                    <div>
                        <label
                            className="text-base font-bold text-[#f98d8d]"
                            htmlFor=""
                        >
                            Xác nhận mật khẩu
                        </label>{" "}
                        <br />
                        <input
                            type="password"
                            name="passconfir"
                            id="passconfir"
                            value={formik.values.passconfir}
                            className="w-full px-[14px] py-[12px] rounded"
                            onChange={(e) => {
                                formik.handleChange(e);
                            }}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.passconfir &&
                        formik.errors.passconfir ? (
                            <div className="error_message text-red-600">
                                {formik.errors.passconfir} 
                            </div>
                        ) : null}
                        <span className="text-red-600">
                            {error}
                        </span>
                    </div>
                    <div className="text-center mt-3">
                        <button
                            type="submit"
                            className="p-2 bg-[#b73a3a] rounded"
                        >
                            {" "}
                            Xác nhận <FaUserClock className="inline-block" />{" "}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default ChangPass;

"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./login.scss";
import TagTitle from "../../../components/TagTitle";
import { FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../../config/Firebase";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../../store/store";
import { setAuthState } from "./authSlice";
export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [actionType, setActionType] = useState("");
    const [Mess, setMess] = useState("");
    const validationSchema = yup.object().shape({
        email: yup
            .string()
            .email("Email không hợp lệ")
            .required("Email là bắt buộc"),
        password: yup
            .string()
            .min(6, "ít nhất 6 kí tự")
            .required("Mật khẩu là bắt buộc"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            let data = {
                email: values.email,
                password: values.password,
            };

            if (actionType === "login") {
                signInWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        // Signed in
                        const user : any = userCredential.user;
                        if (user) {
                            resetForm();
                           
                            localStorage.setItem("id", user.uid);
                            localStorage.setItem(
                                "accessToken",
                                user.accessToken
                            );
                            dispatch(setAuthState(true));
                            router.replace("/");
                        }
                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        if (errorMessage && errorCode) {
                            setMess("sai tài khoản vui lòng thử lại ");
                        }
                    });
            } else if (actionType === "signup") {
                axios
                    .post(
                        "https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
                        data
                    )
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                createUserWithEmailAndPassword(auth, data.email, data.password)
                    .then((userCredential) => {
                        // Signed up
                        const user = userCredential.user;
                        if (user) {
                            resetForm();
                            console.log("user :", user);
                            setMess("Đăng kí thành công");
                        }

                        // ...
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // ..
                    });
            }
        },
    });
    const handlegoogleLogin =  () => {
        const provider = new GoogleAuthProvider();

        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential: any =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log('check token', token);
                
                // The signed-in user info.
                const user = result.user;
              
                localStorage.setItem("id", user.uid);
                localStorage.setItem(
                    "accessToken",
                    token
                );
                dispatch(setAuthState(true));
                router.replace("/");
                // IdP data available using getAdditionalUserInfo(result)
                // ...
                let data = {
                    email: user.email,
                }
                axios
                .post(
                    "https://phimlau-509fd-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
                    data
                )
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    };
    return (
        <>
            <TagTitle title={"Đăng Nhập Thành Viên "} />

            <div className="flex justify-center my-7">
                <Tabs defaultValue="account" className="w-[400px] Tabs">
                    <TabsList className="grid w-full grid-cols-2 TabsList">
                        <TabsTrigger
                            onClick={() => {
                                setMess("");
                            }}
                            value="account"
                        >
                            Đăng Nhập
                        </TabsTrigger>
                        <TabsTrigger
                            onClick={() => {
                                setMess("");
                            }}
                            value="password"
                        >
                            Đăng Kí
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="account">
                        <Card className="Card">
                            <form action="" onSubmit={formik.handleSubmit}>
                                <CardHeader>
                                    <CardTitle>Tài Khoản</CardTitle>
                                    <CardDescription>
                                        Hãy đăng nhập tài khoản để còn xem phim
                                        mới nhất
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="name">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="@email"
                                            required
                                        />
                                        {formik.touched.email &&
                                        formik.errors.email ? (
                                            <div className="error_message">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="username">
                                            Mật khẩu
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.password &&
                                        formik.errors.password ? (
                                            <div className="error_message">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                        {Mess && Mess ? (
                                            <div style={{ color: "red" }}>
                                                {" "}
                                                {Mess}{" "}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        className="mr-2"
                                        onClick={() => setActionType("login")}
                                    >
                                        Đăng Nhập
                                    </Button>
                                    <Button onClick={handlegoogleLogin}>
                                        Đăng Nhập
                                        <FaGoogle />
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        <Card className="Card">
                            <form action="" onSubmit={formik.handleSubmit}>
                                <CardHeader>
                                    <CardTitle>Tạo Tài Khoản</CardTitle>
                                    <CardDescription>
                                        Tạo Tài khoản để trở thành hội viên
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="current">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            placeholder="@email"
                                            required
                                        />
                                        {formik.touched.email &&
                                        formik.errors.email ? (
                                            <div className="error_message">
                                                {formik.errors.email}
                                            </div>
                                        ) : null}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="new">mật khẩu</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.password &&
                                        formik.errors.password ? (
                                            <div className="error_message">
                                                {formik.errors.password}
                                            </div>
                                        ) : null}
                                        {Mess && Mess ? (
                                            <div style={{ color: "green" }}>
                                                {" "}
                                                {Mess}{" "}
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => setActionType("signup")}
                                    >
                                        đăng kí
                                    </Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}

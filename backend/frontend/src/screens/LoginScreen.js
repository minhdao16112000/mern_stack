import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, FastField } from "formik";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../components/InputField/InputField";
import { login } from "../redux/actions/userActions";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const failMess = useSelector((state) => state.user.message_login_fail);
    const isLogged =
        JSON.parse(localStorage.getItem("userInfo")) !== null ? true : false;
    const initialValues = {
        email: "",
        password: "",
    };
    const notify = () =>
        toast.error(
            JSON.parse(localStorage.getItem("message-user_error")).message
        );
    const clearMess = () => {
        localStorage.removeItem("message-user_error");
    };
    useEffect(() => {
        document.title = "Customer Login";
        if (localStorage.getItem("message-user_error") && failMess) {
            notify();
            setTimeout(clearMess, 5000);
        } else {
            clearTimeout(clearMess);
        }
    }, [failMess]);

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập email"),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Ít nhất 8 kí tự, gồm chữ HOA, chữ thường, số và kí tự đặc biệt"
            )
            .required("Bạn phải nhập Mật khẩu"),
    });

    useEffect(() => {
        document.title = "Customer Login";
        if (isLogged) {
            history.push("/");
        }
    }, [isLogged, history]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) =>
                dispatch(
                    login({
                        email: values.email,
                        password: values.password,
                    })
                )
            }
        >
            {(FormikProps) => {
                // const { values, error, touched } = FormikProps;
                // console.log({ values, error, touched });
                return (
                    <div className="register-login-section spad">
                        <ToastContainer />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <div className="login-form">
                                        <h2>Đăng Nhập</h2>
                                        <Form>
                                            <FastField
                                                type="email"
                                                name="email"
                                                className="group-input"
                                                component={InputField}
                                                id="email"
                                                placeholder="Nhập email"
                                            />

                                            <FastField
                                                type="password"
                                                name="password"
                                                className="group-input"
                                                component={InputField}
                                                id="password"
                                                placeholder="Nhập mật khẩu"
                                            />
                                            <div className="group-input gi-check">
                                                <div className="gi-more">
                                                    <label htmlFor="save-pass">
                                                        Lưu Mật Khẩu
                                                        <input
                                                            type="checkbox"
                                                            id="save-pass"
                                                        />
                                                        <span className="checkmark"></span>
                                                    </label>
                                                    <Link
                                                        to="/forget-password"
                                                        className="forget-pass"
                                                    >
                                                        Quên mật khẩu
                                                    </Link>
                                                </div>
                                            </div>
                                            <button
                                                type="submit"
                                                className="site-btn login-btn"
                                            >
                                                Đăng nhập
                                            </button>
                                        </Form>
                                        <div className="switch-login">
                                            <Link
                                                to="/dang-ky"
                                                className="or-login"
                                            >
                                                Hoặc Tạo Tài Khoản
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

export default LoginScreen;

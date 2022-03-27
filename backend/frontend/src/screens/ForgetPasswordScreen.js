import { FastField, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import InputField from "../components/InputField/InputField";
import { forget } from "../redux/actions/userActions";
import MessageBox from "../components/Box/MessageBox";

const ForgetPasswordScreen = () => {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);
    const initialValues = {
        email: "",
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập email"),
    });

    // useEffect(() => {
    //     document.title = "Customer Login";
    //     if (isLogged) {
    //         history.push("/");
    //     }
    // }, [isLogged, history]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                dispatch(forget(values));
                setConfirm(true);
            }}
        >
            {(FormikProps) => {
                if (confirm === false) {
                    return (
                        <div className="register-login-section spad">
                            {/* <ToastContainer /> */}
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <div className="login-form">
                                            <h2>Quên Mật Khẩu</h2>
                                            <Form>
                                                <FastField
                                                    type="email"
                                                    name="email"
                                                    className="group-input"
                                                    component={InputField}
                                                    id="email"
                                                    placeholder="Nhập email"
                                                />
                                                <div className="group-input gi-check">
                                                    <div className="gi-more">
                                                        <a
                                                            href="/dang-nhap"
                                                            className="forget-pass"
                                                        >
                                                            Đăng Nhập
                                                        </a>
                                                    </div>
                                                </div>
                                                <button
                                                    type="submit"
                                                    className="site-btn login-btn"
                                                >
                                                    Gửi Email
                                                </button>
                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="register-login-section spad">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-6 offset-lg-3">
                                        <MessageBox variant="success">
                                            Kiểm Tra Email Của Bạn
                                        </MessageBox>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            }}
        </Formik>
    );
};

export default ForgetPasswordScreen;

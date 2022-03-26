import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import CheckboxField from "../components/InputField/CheckboxField";
import InputField from "../components/InputField/InputField";
import { register } from "../redux/actions/userActions";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isRegister =
        JSON.parse(localStorage.getItem("userInfo")) !== null ? true : false;
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address: "",
        sex: false,
    };
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .max(8, "Tối đa 8 kí tự")
            .required("Bạn phải nhập họ"),
        lastName: Yup.string()
            .max(8, "Tối đa 8 kí tự")
            .required("Bạn phải nhập Tên"),
        phone: Yup.string()
            .max(11, "Tối đa 11 kí tự")
            .required("Bạn phải nhập Số ĐT"),
        address: Yup.string().required("Bạn phải nhập địa chỉ"),
        email: Yup.string()
            .email("Email không hợp lệ")
            .required("Bạn phải nhập Email"),
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                "Ít nhất 8 kí tự, gồm chữ HOA, chữ thường, số và kí tự đặc biệt"
            )
            .required("Bạn phải nhập Mật khẩu"),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref("password"), null],
            "Bạn phải nhập lại đúng Mật khẩu "
        ),
    });
    const notify = () =>
        toast.error(JSON.parse(localStorage.getItem("message-user")).message);
    const clearMess = () => {
        localStorage.removeItem("message-user");
    };
    useEffect(() => {
        document.title = "Customer Register";
        if (isRegister) {
            notify();
            setTimeout(clearMess, 5000);
            history.push("/");
        }
    }, [isRegister, history]);
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) =>
                dispatch(
                    register({
                        firstName: values.firstName,
                        lastName: values.lastName,
                        email: values.email,
                        password: values.password,
                        phone: values.phone,
                        address: values.address,
                        sex: values.sex ? 1 : 0,
                    })
                )
            }
        >
            {(FormikProps) => {
                return (
                    <div className="register-login-section spad">
                        <ToastContainer />
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <div className="register-form">
                                        <h2>Đăng Ký</h2>
                                        <Form>
                                            <FastField
                                                type="firstName"
                                                name="firstName"
                                                component={InputField}
                                                className="group-input"
                                                id="firstName"
                                                placeholder="Nhập Họ"
                                            />
                                            <FastField
                                                type="lastName"
                                                name="lastName"
                                                className="group-input"
                                                component={InputField}
                                                id="lastName"
                                                placeholder="Nhập Tên"
                                            />
                                            <FastField
                                                type="phone"
                                                name="phone"
                                                className="group-input"
                                                component={InputField}
                                                id="phone"
                                                placeholder="Nhập Số Điện Thoại"
                                            />
                                            <FastField
                                                type="address"
                                                name="address"
                                                className="group-input"
                                                component={InputField}
                                                id="address"
                                                placeholder="Nhập Địa Chỉ"
                                            />
                                            <FastField
                                                type="email"
                                                name="email"
                                                className="group-input"
                                                component={InputField}
                                                id="email"
                                                placeholder="Nhập Email"
                                            />
                                            <FastField
                                                type="password"
                                                name="password"
                                                className="group-input"
                                                component={InputField}
                                                id="password"
                                                placeholder="Nhập Mật Khẩu"
                                            />
                                            <FastField
                                                type="password"
                                                name="confirmPassword"
                                                className="group-input"
                                                component={InputField}
                                                id="confirmPassword"
                                                placeholder="Xác Nhận Mật Khẩu"
                                            />
                                            <FastField
                                                type="checkbox"
                                                name="sex"
                                                component={CheckboxField}
                                                id="sex"
                                            />
                                            <button
                                                type="submit"
                                                className="site-btn register-btn"
                                            >
                                                ĐĂNG KÝ
                                            </button>
                                        </Form>
                                        <div className="switch-login">
                                            <Link
                                                to="/dang-nhap"
                                                className="or-login"
                                            >
                                                Hoặc Đăng Nhập
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

export default RegisterScreen;

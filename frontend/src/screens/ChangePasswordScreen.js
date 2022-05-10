import { FastField, Form, Formik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import InputField from '../components/InputField/InputField';
import { change } from '../redux/actions/userActions';

const ChangePasswordScreen = (props) => {
    const dispatch = useDispatch();
    const initialValues = {
        password: '',
        confirmPassword: '',
    };
    const user = localStorage.getItem('userInfo');
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'Ít nhất 8 kí tự, gồm chữ HOA, chữ thường, số và kí tự đặc biệt'
            )
            .required('Bạn phải nhập Mật khẩu'),
        confirmPassword: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Bạn phải nhập lại đúng Mật khẩu '
        ),
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
                // console.log(values);
                values.id = props.match.params.id;
                dispatch(change(values));
                // setConfirm(true);
            }}
        >
            {(FormikProps) => {
                return (
                    <div className="register-login-section spad">
                        {/* <ToastContainer /> */}
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-6 offset-lg-3">
                                    <div className="login-form">
                                        <h2>Đổi Mật Khẩu</h2>
                                        <Form>
                                            <FastField
                                                type="password"
                                                name="password"
                                                className="group-input"
                                                component={InputField}
                                                id="password"
                                                placeholder="Input new password"
                                            />
                                            <FastField
                                                type="password"
                                                name="confirmPassword"
                                                className="group-input"
                                                component={InputField}
                                                id="confirmPassword"
                                                placeholder="Confirm password"
                                            />
                                            <div className="group-input gi-check">
                                                {!user ? (
                                                    <div className="gi-more">
                                                        <a
                                                            href="/dang-nhap"
                                                            className="forget-pass"
                                                        >
                                                            Đăng nhập
                                                        </a>
                                                    </div>
                                                ) : (
                                                    <div className="gi-more">
                                                        <a
                                                            href="/thong-tin-tai-khoan"
                                                            className="forget-pass"
                                                        >
                                                            Quay trở lại
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="submit"
                                                className="site-btn login-btn"
                                            >
                                                Xác nhận
                                            </button>
                                        </Form>
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

export default ChangePasswordScreen;

import { FastField, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputField from '../components/InputField/InputField';
import TextareaField from '../components/InputField/TextareaField';
import { createContact } from '../redux/actions/contactAction';
import MessageBox from '../components/Box/MessageBox';
import './styles/contact.scss';

const ContactScreen = () => {
    const dispatch = useDispatch();
    const [confirm, setConfirm] = useState(false);

    var iframe = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.212910246738!2d106.71968101458927!3d10.79499889230891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527c2f8f30911%3A0x36ac5073f8c91acd!2sLandmark%2081!5e0!3m2!1svi!2s!4v1640851346635!5m2!1svi!2s" height="650" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;

    const tesst = () => {
        return {
            __html: iframe,
        };
    };

    const notify = () => {
        toast.error('Vui lòng nhập nội dung cần gửi ', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const initialValues = localStorage.getItem('userInfo')
        ? {
              name:
                  JSON.parse(localStorage.getItem('userInfo')).firstName +
                  ' ' +
                  JSON.parse(localStorage.getItem('userInfo')).lastName,
              email: JSON.parse(localStorage.getItem('userInfo')).email,
              message: '',
          }
        : {
              name: '',
              email: '',
              message: '',
          };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Bạn phải nhập tên'),
        email: Yup.string()
            .email('Email không hợp lệ')
            .required('Bạn phải nhập Email'),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(value) => {
                if (value.message.length === 0) {
                    notify();
                } else {
                    setConfirm(true);
                    dispatch(
                        createContact({
                            name: value.name,
                            email: value.email,
                            message: value.message,
                        })
                    );
                }
            }}
        >
            {(FormikProps) => {
                return (
                    <div>
                        {/*!-- Breadcrumb Section Begin --*/}
                        <div className="breacrumb-section">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="breadcrumb-text">
                                            <a href="/">
                                                <i className="fa fa-home"></i>{' '}
                                                Trang Chủ
                                            </a>
                                            <span>Liên Hệ</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*!-- Breadcrumb Section Begin --*/}

                        {/*!-- Map Section Begin --*/}
                        <div className="map spad show-map">
                            <div className="container">
                                <div className="map-inner">
                                    <div
                                        dangerouslySetInnerHTML={tesst()}
                                    ></div>
                                    <div className="icon">
                                        <i className="fa fa-map-marker"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*!-- Map Section Begin --*/}

                        {/*!-- Contact Section Begin --*/}
                        <section className="contact-section spad show-contact">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-5">
                                        <div className="contact-title">
                                            <h4>Liên Hệ Với Chúng Tôi</h4>
                                            <p>
                                                Liên hệ với Fashi theo thông tin
                                                bên dưới.
                                            </p>
                                        </div>
                                        <div className="contact-widget">
                                            <div className="cw-item">
                                                <div className="ci-icon">
                                                    <i className="ti-location-pin"></i>
                                                </div>
                                                <div className="ci-text">
                                                    <span>Địa Chỉ:</span>
                                                    <p>Tầng 16, Landmark 81</p>
                                                </div>
                                            </div>
                                            <div className="cw-item">
                                                <div className="ci-icon">
                                                    <i className="ti-mobile"></i>
                                                </div>
                                                <div className="ci-text">
                                                    <span>SĐT:</span>
                                                    <p>+84 386256124</p>
                                                </div>
                                            </div>
                                            <div className="cw-item">
                                                <div className="ci-icon">
                                                    <i className="ti-email"></i>
                                                </div>
                                                <div className="ci-text">
                                                    <span>Email:</span>
                                                    <p>
                                                        bluroller161@gmail.com
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 offset-lg-1">
                                        <div className="contact-form">
                                            <div className="leave-comment">
                                                <h4>
                                                    Gửi Vấn Đề Của Bạn Đến Fashi
                                                </h4>
                                                <p>
                                                    Nhân viên của Fashi sẽ liên
                                                    hệ với bạn sớm nhất.
                                                </p>
                                                {confirm === false ? (
                                                    <Form className="comment-form">
                                                        <div className="row">
                                                            <FastField
                                                                type="text"
                                                                name="name"
                                                                component={
                                                                    InputField
                                                                }
                                                                className="col-lg-6"
                                                                id="yourName"
                                                                placeholder="Nhập Tên Của Bạn"
                                                            />
                                                            <FastField
                                                                type="email"
                                                                name="email"
                                                                component={
                                                                    InputField
                                                                }
                                                                className="col-lg-6"
                                                                id="email"
                                                                placeholder="Nhập Email Của Bạn"
                                                            />
                                                            <FastField
                                                                type="textarea"
                                                                name="message"
                                                                component={
                                                                    TextareaField
                                                                }
                                                                rows="6"
                                                                className="col-lg-12"
                                                                id="note"
                                                                placeholder="Nhập Vấn Đề Của Bạn"
                                                            />
                                                            <div className="col-lg-12">
                                                                <button
                                                                    type="submit"
                                                                    className="site-btn"
                                                                >
                                                                    Gửi
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                ) : (
                                                    <MessageBox variant="success">
                                                        Đã gửi thành công !!!.
                                                    </MessageBox>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {/*!-- Contact Section End --*/}
                    </div>
                );
            }}
        </Formik>
    );
};

export default ContactScreen;

import { FastField, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
    detailsContact,
    sendReply,
} from "../../../../redux/actions/contactAction";
import CKEditorField from "../../add/CKEditorField";
import "../style.scss";

const FormEditContact = (props) => {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    const contact = useSelector((state) => state.contact.contact);

    const initialValues = {
        reply: "",
    };

    const validationSchema = Yup.object().shape({
        reply: Yup.string().required("Bạn phải nhập câu trả lời"),
    });

    useEffect(() => {
        document.title = "Manage Contacts";
        if (id) dispatch(detailsContact(id));

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            enableReinitialize
            initialValues={contact || initialValues}
            validationSchema={validationSchema}
            onSubmit={(value) => dispatch(sendReply(value))}
            // enableReinitialize
        >
            {(formikProps) => {
                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>
                                                    Phản Hồi Vấn Đề Khách Hàng
                                                </h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/contacts`}
                                                        className="main-btn active-btn btn-hover"
                                                    >
                                                        <i className="fas fa-chevron-circle-left"></i>
                                                        &ensp;Quay Lại Danh Sách
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        type="submit"
                                                        className="main-btn success-btn btn-hover"
                                                    >
                                                        <i className="fas fa-save"></i>
                                                        &ensp;Gửi và lưu phản
                                                        hồi
                                                    </button>
                                                </nav>
                                            </div>
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>
                                {/* ========== title-wrapper end ========== */}
                                {/* ========== form-elements-wrapper start ========== */}
                                <div className="form-elements-wrapper">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            {/* input style start */}
                                            <div className="card-style mb-30">
                                                <div
                                                    style={{ display: "flex" }}
                                                >
                                                    <div className="col-lg-6 info_customer">
                                                        <label htmlFor="fir">
                                                            Tên Khách Hàng
                                                        </label>
                                                        <p>
                                                            <strong>
                                                                {contact.name}
                                                            </strong>
                                                        </p>
                                                    </div>
                                                    <div className="col-lg-6 info_customer">
                                                        <label htmlFor="fir">
                                                            Email
                                                        </label>
                                                        <p>
                                                            <strong>
                                                                {contact.email}
                                                            </strong>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 ">
                                                    <label htmlFor="fir">
                                                        Vấn Đề Của Khách Hàng
                                                    </label>
                                                    <p>
                                                        <strong>
                                                            {contact.message}
                                                        </strong>
                                                    </p>
                                                </div>
                                                <div className="col-lg-12">
                                                    <FastField
                                                        label="Phản Hồi"
                                                        component={
                                                            CKEditorField
                                                        }
                                                        name="reply"
                                                        data={contact.reply}
                                                    />
                                                </div>
                                                {/* end input */}
                                            </div>
                                            {/* end card */}
                                            {/* ======= input style end ======= */}
                                        </div>
                                        {/* end col */}
                                    </div>
                                    {/* end row */}
                                </div>

                                {/* ========== form-elements-wrapper end ========== */}
                            </div>
                            {/* end container */}
                        </Form>
                    </section>
                );
            }}
        </Formik>
    );
};

export default FormEditContact;

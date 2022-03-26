import { FastField, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import {
    storeColor,
    storeColorAndContinue,
} from "../../../../redux/actions/productActions";
import AddField from "../../add/AddField";
import "../style.scss";

const FormAddColor = () => {
    const dispatch = useDispatch();

    const [save, setSave] = useState("true");

    const initialValues = {
        name: "",
        code: "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min("3", "Tên sản phẩm tối thiểu 3 kí tự")
            .max(100, "Tên sản phẩm tối đa 100 kí tự")
            .required("Bạn phải nhập tên màu"),
        code: Yup.string()
            .min("6", "Tên sản phẩm tối thiểu 6 kí tự")
            .max(10, "Tên sản phẩm tối đa 10 kí tự")
            .required("Bạn phải nhập mã màu"),
    });

    useEffect(() => {
        document.title = "Manage Colors";

        // notify();
        // setTimeout(clearMess, 5000);
        // history.push('/');

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                if (save === "true") {
                    dispatch(
                        storeColor({
                            name: values.name,
                            code: values.code,
                        })
                    );
                } else {
                    dispatch(
                        storeColorAndContinue({
                            name: values.name,
                            code: values.code,
                        })
                    );
                }
            }}
        >
            {(formikProps) => {
                // eslint-disable-next-line no-unused-vars
                const { values } = formikProps;
                return (
                    <section className="tab-components">
                        <Form>
                            <div className="container-fluid">
                                {/* ========== title-wrapper start ========== */}
                                <div className="title-wrapper pt-30">
                                    <div className="row align-items-center">
                                        <div className="col-md-6">
                                            <div className="title mb-30">
                                                <h2>Thêm Màu Sắc</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/colors`}
                                                        className="main-btn active-btn btn-hover"
                                                    >
                                                        <i className="fas fa-chevron-circle-left"></i>
                                                        &ensp;Quay Lại Danh Sách
                                                    </Link>
                                                    &nbsp;
                                                    <button
                                                        type="submit"
                                                        className="main-btn success-btn btn-hover"
                                                        onClick={() =>
                                                            setSave("true")
                                                        }
                                                    >
                                                        <i className="fas fa-save"></i>
                                                        &ensp;Lưu
                                                    </button>
                                                    &nbsp;
                                                    <button
                                                        type="submit"
                                                        className="main-btn info-btn btn-hover"
                                                        onClick={() =>
                                                            setSave("false")
                                                        }
                                                    >
                                                        <i className="far fa-save"></i>
                                                        &ensp;Lưu và tiếp tục
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
                                                <FastField
                                                    label="Tên Màu"
                                                    name="name"
                                                    component={AddField}
                                                    placeholder="Nhập Tên Màu"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    label="Mã Màu"
                                                    name="code"
                                                    component={AddField}
                                                    placeholder="Nhập Mã Màu"
                                                />
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

export default FormAddColor;

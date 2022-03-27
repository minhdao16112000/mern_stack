import { FastField, Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import {
    getCategories,
    storeCategory,
    storeCategoryAndContinue,
} from "../../../../redux/actions/categoryActions";
import AddField from "../../add/AddField";
import ImageField from "../../add/ImageField";
import MultiSelectField from "../../add/MultiSelectField";
import SelectField from "../../add/SelectField";

const FormAddCategory = () => {
    const dispatch = useDispatch();

    const [cate, setCate] = useState([]);
    const [file, setFile] = useState([]);
    const [save, setSave] = useState("true");

    const lstCate = useSelector((state) => state.category.categories);

    const initialValues = {
        name: "",
        image: "",
        parentCate: "",
        type: "0",
        status: "1",
    };

    const setSelectCate = () => {
        lstCate.Categories.forEach((value) => {
            let objCate = { value: value._id, label: value.name };
            setCate((oldVal) => [...oldVal, objCate]);
        });
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .min("2", "Tên danh mục sản phẩm tối thiểu 2 kí tự")
            .max(100, "Tên danh mục sản phẩm tối đa 100 kí tự")
            .required("Bạn phải nhập tên danh mục sản phẩm"),
        parentCate: Yup.string().required("Bạn phải chọn danh mục cha"),
        type: Yup.string().required("Bạn phải chọn kiểu cho danh mục sản phẩm"),
        status: Yup.string().required(
            "Bạn phải chọn trạng thái cho danh mục sản phẩm"
        ),
    });

    useEffect(() => {
        document.title = "Manage Categories";
        dispatch(getCategories());
        setSelectCate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                const value = {
                    name: values.name,
                    image: values.image,
                    parentCate: values.parentCate,
                    type: values.type,
                    status: values.status,
                };
                const formData = new FormData();
                for (let i = 0; i < file.length; i++) {
                    formData.append("image", file[i]);
                }
                formData.append("infos", JSON.stringify(value));
                if (save === "true") {
                    dispatch(storeCategory(formData));
                } else {
                    dispatch(storeCategoryAndContinue(formData));
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
                                                <h2>Thêm Danh Mục Sản Phẩm</h2>
                                            </div>
                                        </div>
                                        {/* end col */}
                                        <div className="col-md-6">
                                            <div className="breadcrumb-wrapper mb-30">
                                                <nav aria-label="breadcrumb">
                                                    <Link
                                                        to={`/admin/categories`}
                                                        className="main-btn active-btn btn-hover"
                                                    >
                                                        <i className="fas fa-chevron-circle-left"></i>
                                                        &ensp;Quay lại danh sách
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
                                                    label="Tên Danh Mục"
                                                    name="name"
                                                    component={AddField}
                                                    placeholder="Nhập Tên Danh Mục"
                                                />
                                                {/* end input */}
                                                <FastField
                                                    setFile={setFile}
                                                    name="image"
                                                    id="customFile"
                                                    component={ImageField}
                                                />
                                                {/* end input */}
                                                <Field
                                                    name="parentCate"
                                                    label="Danh Mục Cha"
                                                    component={MultiSelectField}
                                                    placeholder="Chọn danh mục cha..."
                                                    id="parentCate"
                                                    options={cate}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    name="type"
                                                    label="Phân Loại"
                                                    component={SelectField}
                                                    placeholder="Chọn phân loại.."
                                                    id="type"
                                                    options={[
                                                        {
                                                            value: "0",
                                                            label: "Tất cả",
                                                        },
                                                        {
                                                            value: "1",
                                                            label: "Nam",
                                                        },
                                                        {
                                                            value: "2",
                                                            label: "Nữ",
                                                        },
                                                        {
                                                            value: "3",
                                                            label: "Trẻ em",
                                                        },
                                                        {
                                                            value: "4",
                                                            label: "Nam và Nữ",
                                                        },
                                                        {
                                                            value: "5",
                                                            label: "Nữ và Trẻ em",
                                                        },
                                                    ]}
                                                />
                                                {/* end input */}
                                                <FastField
                                                    name="status"
                                                    label="Trạng Thái"
                                                    component={SelectField}
                                                    placeholder="Chọn trạng thái..."
                                                    id="status"
                                                    options={[
                                                        {
                                                            value: "1",
                                                            label: "Hiện",
                                                        },
                                                        {
                                                            value: "0",
                                                            label: "Ẩn",
                                                        },
                                                    ]}
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

export default FormAddCategory;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import { getCategories } from "../../../redux/actions/categoryActions";
import { deleteImages, getImages } from "../../../redux/actions/imageActions";
import ImageTable from "../../components/table/ImageTable";

const ListImages = () => {
    let { url } = useRouteMatch();
    const dispatch = useDispatch();
    const [deleteItems, setDeleteItems] = useState([]);
    const lstImages = useSelector((state) => state.image.images);

    const ClickDeleteHandler = () => {
        dispatch(deleteImages(deleteItems.toString()));
    };

    const checkButtonDelete = () => {
        if (deleteItems.length > 0) {
            return (
                <button
                    className="main-btn danger-btn btn-hover"
                    onClick={() => ClickDeleteHandler()}
                >
                    <i className="fas fa-minus-circle"></i>&ensp;Xóa(Đã Chọn)
                </button>
            );
        } else {
            return (
                <button className="main-btn danger-btn-outline" disabled>
                    <i className="fas fa-minus-circle"></i>&ensp;Xóa
                </button>
            );
        }
    };

    useEffect(() => {
        document.title = "Manage Images";
        dispatch(getImages());
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <section className="table-components">
            <div className="container-fluid">
                {/*-- ========== title-wrapper start ========== --*/}
                <div className="title-wrapper pt-30">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <div className="title mb-30">
                                <h2>Danh Sách Hình Ảnh</h2>
                            </div>
                        </div>
                        {/*-- end col --*/}
                        <div className="col-md-6">
                            <div className="breadcrumb-wrapper mb-30">
                                <nav aria-label="breadcrumb">
                                    <Link
                                        to={`${url}/add`}
                                        className="main-btn success-btn btn-hover"
                                    >
                                        <i className="fas fa-plus"></i>
                                        &ensp;Thêm
                                    </Link>
                                    &nbsp;
                                    {checkButtonDelete()}
                                    &nbsp;
                                    <Link
                                        to={`${url}/trash`}
                                        className="main-btn warning-btn btn-hover"
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                        &ensp;Thùng Rác (
                                        {lstImages.deletedCount})
                                    </Link>
                                </nav>
                            </div>
                        </div>
                        {/*-- end col --*/}
                    </div>
                    {/*-- end row --*/}
                </div>
                {/*-- ========== title-wrapper end ========== --*/}
                <ImageTable
                    list={lstImages.Images}
                    setDeleteItems={setDeleteItems}
                />
            </div>
            {/*-- end container --*/}
        </section>
    );
};

export default ListImages;

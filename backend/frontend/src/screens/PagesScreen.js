import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPageSlug } from "../redux/actions/pageActions";

const PagesScreen = (props) => {
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page.page);

    useEffect(() => {
        dispatch(getPageSlug(props.match.params.slug));
    }, [dispatch, props.match.params.slug]);
    return (
        <div>
            <div className="breacrumb-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb-text">
                                <Link to="/">
                                    <i className="fa fa-home"></i> Trang Chủ
                                </Link>
                                <span>{page.title}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="faq-section spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="faq-accordin">
                                <div
                                    className="accordion"
                                    id="accordionExample"
                                    dangerouslySetInnerHTML={{
                                        __html: page.content,
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PagesScreen;

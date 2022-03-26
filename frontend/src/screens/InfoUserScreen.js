import React from "react";
import { useHistory } from "react-router-dom";
import "./styles/infoUser.scss";

const InfoUserScreen = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const history = useHistory();
    return (
        <section className="tab-components info-list">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        {/* input style start */}
                        <div className="card-style mb-30 info_box">
                            <div>
                                <h4
                                    style={{
                                        fontSize: "25px",
                                        fontWeight: "700",
                                        color: "#595959",
                                        marginBottom: "5px",
                                    }}
                                >
                                    <i className="fas fa-info"></i> Thông Tin
                                    Của Bạn
                                </h4>
                                <div className="row">
                                    <div className="col-lg-12 ">
                                        {/* input style start */}
                                        <div className="card-style mb-30 info_box">
                                            <div className="row">
                                                <div className="col-lg-6 user">
                                                    <div className="info_oder info_user">
                                                        <div className="col-lg-4 text-center">
                                                            <label>
                                                                Họ và tên:
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-8 user_text">
                                                            <p>
                                                                <strong>
                                                                    {
                                                                        userInfo.firstName
                                                                    }{" "}
                                                                    {
                                                                        userInfo.lastName
                                                                    }
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="info_oder info_user">
                                                        <div className="col-lg-4 text-center">
                                                            <label>
                                                                Email:
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-8 user_text">
                                                            <p>
                                                                <strong>
                                                                    {
                                                                        userInfo.email
                                                                    }
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="info_oder info_user">
                                                        <div className="col-lg-4 text-center">
                                                            <label>
                                                                Số Điện Thoại:
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-8 user_text">
                                                            <p>
                                                                <strong>
                                                                    {
                                                                        userInfo.phone
                                                                    }
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="info_oder info_user">
                                                        <div className="col-lg-4 text-center">
                                                            <label>
                                                                Địa Chỉ:
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-8 user_text">
                                                            <p>
                                                                <strong>
                                                                    {
                                                                        userInfo.address
                                                                    }
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="info_oder info_user">
                                                        <div className="col-lg-4 text-center user_password">
                                                            <label>
                                                                Mật Khẩu:
                                                            </label>
                                                        </div>

                                                        <div className="col-lg-1 user_text user_password">
                                                            <p>
                                                                <strong>
                                                                    ********
                                                                </strong>
                                                            </p>
                                                        </div>
                                                        <div className="col-lg-5 info_user_button">
                                                            <button
                                                                className="main-btn rounded-full btn-hover change_password"
                                                                onClick={() =>
                                                                    history.push(
                                                                        "/change-password"
                                                                    )
                                                                }
                                                            >
                                                                Đổi Mật Khẩu
                                                            </button>
                                                        </div>
                                                    </div>
                                                    {/* end input */}
                                                </div>
                                                {/* end input */}
                                            </div>
                                            {/* end card */}
                                            {/* ======= input style end ======= */}
                                        </div>
                                    </div>
                                    {/* end col */}
                                </div>
                                {/* end row */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default InfoUserScreen;

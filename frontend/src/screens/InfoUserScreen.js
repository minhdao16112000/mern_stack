import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { USER_INFO_RESET } from '../constants/userConstant';
import { updateUserInfo } from '../redux/actions/userActions';
import './styles/infoUser.scss';

const InfoUserScreen = () => {
    const dispatch = useDispatch();
    const [checkEditInfo, setCheckEditInfo] = useState(false);
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const history = useHistory();
    const handleUser = useSelector((state) => state.user);

    const { error: errorHandle, userInfo: handleUserInfo } = handleUser;

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [phone, setPhone] = useState(userInfo.phone);
    const [address, setAddress] = useState(userInfo.address);
    const [dateOfBirth, setDateOfBirth] = useState(userInfo.dateOfBirth);
    const [sex, setSex] = useState(userInfo.sex);
    const [image, setImage] = useState(
        `http://localhost:5000/users/${userInfo.avatar}`
    );
    const [file, setFile] = useState([]);
    const [urlImage, setUrlImage] = useState('');

    const handleChangeImage = async (value) => {
        var output = document.getElementById('showImg');
        setUrlImage(output.src);
        output.src = URL.createObjectURL(value[0]);
        setImage(output.src);
        if (output) {
            output.onload = function () {
                var height = this.height;
                var width = this.width;
                if (width > 460 || height > 460) {
                    toast.warn(
                        'Kích thước hình ảnh không được vượt qua 160 x 160'
                    );
                    output.src = urlImage;
                    return;
                }
                URL.revokeObjectURL(output.src); // free memory
            };
        }
        setFile(value);
    };

    const handleCancelEdit = () => {
        setFirstName(userInfo.firstName);
        setLastName(userInfo.lastName);
        setPhone(userInfo.phone);
        setAddress(userInfo.address);
        setDateOfBirth(userInfo.dateOfBirth);
        setSex(userInfo.sex);
        userInfo.avatar ? setImage(image) : setImage(userInfo.avatar);
        setFile([]);
        if (urlImage.length !== 0) {
            document.getElementById('showImg').src = urlImage;
        }
        setCheckEditInfo(false);
    };

    const handleSaveEdit = () => {
        const formData = new FormData();
        const option = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            address: address,
            dateOfBirth: dateOfBirth,
            sex: sex,
        };
        if (image && image.length !== 0 && file.length !== 0) {
            option.avatar = image;

            for (let i = 0; i < file.length; i++) {
                formData.append('image', file[i]);
            }
        }
        formData.append('infos', JSON.stringify(option));
        dispatch(
            updateUserInfo({
                formData: formData,
                id: userInfo._id,
            })
        );
        setCheckEditInfo(false);
    };

    useEffect(() => {
        if (errorHandle && errorHandle.length !== 0) {
            toast.error(errorHandle);
        }

        if (handleUserInfo && handleUserInfo === true) {
            dispatch({ type: USER_INFO_RESET });
        }
    }, [dispatch, errorHandle, handleUserInfo]);

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
                                        fontSize: '25px',
                                        fontWeight: '700',
                                        color: '#595959',
                                        marginBottom: '5px',
                                    }}
                                >
                                    <i className="fas fa-info"></i> Thông Tin
                                    Của Bạn
                                </h4>
                                <div className="col-lg-6 btn-edit-info">
                                    {checkEditInfo === false ? (
                                        <button
                                            className="main-btn info-btn-outline rounded-md btn-hover"
                                            onClick={() =>
                                                setCheckEditInfo(true)
                                            }
                                        >
                                            Chỉnh Sửa Thông Tin
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                type="submit"
                                                className="main-btn light-btn rounded-md btn-hover"
                                                onClick={() =>
                                                    handleCancelEdit()
                                                }
                                            >
                                                Hủy
                                            </button>
                                            <button
                                                type="submit"
                                                className="main-btn info-btn rounded-md btn-hover"
                                                onClick={() => handleSaveEdit()}
                                            >
                                                Lưu Thay Đổi
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 ">
                                        {/* input style start */}
                                        <div className="card-style mb-30 info_box">
                                            <div className="row">
                                                <div className="col-lg-6 avatar-user">
                                                    <div className="info_oder info_user">
                                                        <div className="col-lg-12 d-flex justify-content-center align-items-center flex-row image-user">
                                                            {checkEditInfo ===
                                                            true ? (
                                                                <>
                                                                    {image &&
                                                                    image.length !==
                                                                        0 ? (
                                                                        <img
                                                                            src={`${image}`}
                                                                            id="showImg"
                                                                            alt="hình người dùng"
                                                                        />
                                                                    ) : userInfo.sex ===
                                                                      0 ? (
                                                                        <img
                                                                            id="showImg"
                                                                            src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                                                            alt="hình người dùng"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            id="showImg"
                                                                            src="https://images.clipartlogo.com/files/istock/previews/9730/97305655-avatar-icon-of-girl-in-a-wide-brim-felt-hat.jpg"
                                                                            alt="hình người dùng"
                                                                            style={{
                                                                                height: '160px;',
                                                                                width: '160px;',
                                                                            }}
                                                                        />
                                                                    )}
                                                                    <input
                                                                        style={{
                                                                            display:
                                                                                'none',
                                                                        }}
                                                                        type="file"
                                                                        id="customFile"
                                                                        name="avatar"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleChangeImage(
                                                                                e
                                                                                    .target
                                                                                    .files
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        htmlFor="customFile"
                                                                        className="main-btn light-btn rounded-full btn-hover input-image-user"
                                                                    >
                                                                        Chọn
                                                                        Hình
                                                                    </label>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    {userInfo.avatar ? (
                                                                        <img
                                                                            src={
                                                                                image
                                                                            }
                                                                            alt="hình người dùng"
                                                                        />
                                                                    ) : userInfo.sex ===
                                                                      0 ? (
                                                                        <img
                                                                            src="https://i.pinimg.com/originals/7c/c7/a6/7cc7a630624d20f7797cb4c8e93c09c1.png"
                                                                            alt="hình người dùng"
                                                                        />
                                                                    ) : (
                                                                        <img
                                                                            src="https://images.clipartlogo.com/files/istock/previews/9730/97305655-avatar-icon-of-girl-in-a-wide-brim-felt-hat.jpg"
                                                                            alt="hình người dùng"
                                                                        />
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* end input */}
                                                </div>
                                                {checkEditInfo === false ? (
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
                                                                        }{' '}
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
                                                                    Số Điện
                                                                    Thoại:
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
                                                            <div className="col-lg-4 text-center">
                                                                <label>
                                                                    Ngày Sinh:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <p>
                                                                    <strong>
                                                                        {new Date(
                                                                            userInfo.dateOfBirth
                                                                        )
                                                                            .toLocaleString(
                                                                                'en-CA'
                                                                            )
                                                                            .substring(
                                                                                0,
                                                                                10
                                                                            ) ||
                                                                            NaN}
                                                                    </strong>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="info_oder info_user">
                                                            <div className="col-lg-4 text-center">
                                                                <label>
                                                                    Giới Tính:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <p>
                                                                    <strong>
                                                                        {userInfo.sex ===
                                                                        0
                                                                            ? 'Nam'
                                                                            : 'Nữ'}
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
                                                                            `/change-password/${userInfo._id}`
                                                                        )
                                                                    }
                                                                >
                                                                    Đổi Mật Khẩu
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="col-lg-6 user">
                                                        <div className="info_oder info_user">
                                                            <div className="col-lg-4 text-center">
                                                                <label>
                                                                    Họ và tên:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <input
                                                                    className="input-info-user"
                                                                    name="firstName"
                                                                    type="text"
                                                                    defaultValue={
                                                                        firstName
                                                                    }
                                                                    placeholder="Nhập Họ Của Bạn"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setFirstName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                                <input
                                                                    className="input-info-user"
                                                                    type="text"
                                                                    name="lastName"
                                                                    defaultValue={
                                                                        lastName
                                                                    }
                                                                    placeholder="Nhập Tên Của Bạn"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setLastName(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
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
                                                                    Số Điện
                                                                    Thoại:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <input
                                                                    className="input-info-user"
                                                                    name="phone"
                                                                    type="number"
                                                                    defaultValue={
                                                                        phone
                                                                    }
                                                                    placeholder="Nhập Số Điện Thoại Của Bạn"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setPhone(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="info_oder info_user">
                                                            <div className="col-lg-4 text-center">
                                                                <label>
                                                                    Địa Chỉ:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <input
                                                                    className="input-info-user"
                                                                    type="text"
                                                                    name="address"
                                                                    defaultValue={
                                                                        address
                                                                    }
                                                                    placeholder="Nhập Địa Chỉ Của Bạn"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setAddress(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="info_oder info_user">
                                                            <div className="col-lg-4 text-center">
                                                                <label>
                                                                    Ngày Sinh:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <input
                                                                    className="input-info-user"
                                                                    name="dateOfBirth"
                                                                    type="date"
                                                                    defaultValue={new Date(
                                                                        dateOfBirth
                                                                    )
                                                                        .toLocaleString(
                                                                            'en-CA'
                                                                        )
                                                                        .substring(
                                                                            0,
                                                                            10
                                                                        )}
                                                                    placeholder="Nhập Ngày Sinh Của Bạn"
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setDateOfBirth(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="info_oder info_user">
                                                            <div className="col-lg-4 text-center">
                                                                <label>
                                                                    Giới Tính:
                                                                </label>
                                                            </div>

                                                            <div className="col-lg-8 user_text">
                                                                <select
                                                                    className="input-info-user"
                                                                    defaultValue={
                                                                        sex
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setSex(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                >
                                                                    <option value="0">
                                                                        Nam
                                                                    </option>
                                                                    <option value="1">
                                                                        Nữ
                                                                    </option>
                                                                </select>
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
                                                                            `/change-password/${userInfo._id}`
                                                                        )
                                                                    }
                                                                >
                                                                    Đổi Mật Khẩu
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
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

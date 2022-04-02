import api from '../../api';
import {
    REMOVE_USER,
    SET_USER,
    SET_ROLE,
    SET_USERS,
    USER_LOGIN_FAIL,
    RESET_MESSAGE,
} from '../../constants/userConstant';

//GET ACTION BEGIN
export const getUsers = () => async (dispatch) => {
    try {
        const res = await api.get('api/user');
        dispatch({
            type: SET_USERS,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        const res = await api.get('api/user/' + id + '/edit');
        dispatch({
            type: SET_USER,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getTrashUsers = () => async (dispatch) => {
    try {
        const res = await api.get('api/user/trash');
        dispatch({
            type: SET_USERS,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};

export const getRole = (data) => async (dispatch) => {
    try {
        const res = await api.post('api/user/userRole', { id: data });
        dispatch({
            type: SET_ROLE,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
    }
};
//GET ACTION BEGIN

//POST ACTION BEGIN
export const register = (data) => async (dispatch) => {
    try {
        // console.log(data)
        const res = await api.post('api/user/register', {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            phone: data.phone,
            sex: data.sex,
            address: data.address,
        });
        localStorage.setItem('userInfo', JSON.stringify(res.data.info));
        localStorage.setItem('message-user', JSON.stringify(res.data.message));
        dispatch({
            type: SET_USER,
            payload: res.data.info,
        });
        document.location.href = '/';
    } catch (e) {
        console.log(e);
    }
};

export const login = (data) => async (dispatch) => {
    try {
        const res = await api.post('api/user/login', {
            email: data.email,
            password: data.password,
        });
        if (res.data.info) {
            const user = {
                _id: res.data.info._id,
                firstName: res.data.info.firstName,
                lastName: res.data.info.lastName,
                phone: res.data.info.phone,
                email: res.data.info.email,
                address: res.data.info.address,
                role: res.data.info.role,
                sex: res.data.info.sex,
            };
            localStorage.setItem('userInfo', JSON.stringify(user));
            localStorage.setItem(
                'message-user',
                JSON.stringify(res.data.message)
            );
            dispatch({
                type: SET_USER,
                payload: res.data.info,
            });
            document.location.href = '/';
        } else {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: res.data.message,
            });
            localStorage.setItem(
                'message-user_error',
                JSON.stringify(res.data)
            );
        }
    } catch (error) {
        console.log(error.response);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response.data.message,
        });
        localStorage.setItem(
            'message-user_error',
            JSON.stringify(error.response.data)
        );
    } finally {
        dispatch({ type: RESET_MESSAGE });
    }
};
//POST ACTION END

//LOGOUT ACTION
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('persist:root');
    localStorage.setItem(
        'message-user',
        JSON.stringify({ message: 'Đăng xuất thành công!' })
    );
    dispatch({ type: REMOVE_USER });
    document.location.href = '/';
};

//DELETE ACTION BEGIN
export const deleteUsers = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete('api/user', { data: ids });
        if (isDeleted) {
            document.location.href = '/admin/users';
        }
    } catch (e) {
        console.log(e);
    }
};

export const destroyUsers = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete('api/user/force', { data: ids });
        if (isDestroy) {
            document.location.href = '/admin/users/trash';
        }
    } catch (e) {
        console.log(e);
    }
};
//DELETE ACTION END

//RESTORE ACTION
export const restoreUsers = (data) => async (dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch('api/user/restore', {
            data: ids.id.split(','),
        });
        if (isRestore) {
            document.location.href = '/admin/users/trash';
        }
    } catch (e) {
        console.log(e);
    }
};

//ADD FAVORITE ACTION
export const favoritesAdd = (data) => async (dispatch) => {
    try {
        const id = JSON.parse(localStorage.getItem('userInfo'))._id;
        const res = await api.patch('api/user/' + id + '/favorites', {
            idPro: data,
        });
        if (res.data) {
            console.log(res.data);
        }
    } catch (e) {
        console.log(e);
    }
};

//PUT ACTION
export const updateUser = (user) => async (dispatch) => {
    try {
        const data = await api.put(`api/user/${user.id}`, user);
        if (data) {
            console.log(data.data);
            document.location.href = '/admin/users';
        }
    } catch (e) {
        console.log(e);
    }
};

// Forget PassWord Begin
export const forget = (user) => async (dispatch) => {
    try {
        const data = await api.post(`api/user/forgetPassword`, user);
        alert('Vui lòng kiểm tra email của bạn');
        console.log(data);
        // localStorage.setItem('user', JSON.stringify(data.data));
    } catch (e) {
        console.log(e);
    }
};

export const change = (passWord) => async (dispatch) => {
    try {
        const userOld = JSON.parse(localStorage.getItem('user'));
        userOld.password = passWord.password;
        const data = await api.put(`api/user/changePassword`, userOld);
        alert('Bạn đã đổi mật khẩu thành công');
        if (data) {
            localStorage.setItem('userInfo', JSON.stringify(data.data.user));
            document.location.href = '/';
        }
    } catch (e) {
        console.log(e);
    }
};

// Forget PassWord End

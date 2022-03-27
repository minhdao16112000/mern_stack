import api from '../../api'
import { IMAGES, SET_IMAGE } from '../../constants/imageConstant';

//GET ACTIONS BEGIN

export const getImages = () => async (dispatch) => {
    try {
        const res = await api.get("api/image");
        dispatch({ type: IMAGES, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getImageSlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get(`api/image/${slug}`);
        dispatch({ type: SET_IMAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getImage = (id) => async (dispatch) => {
    try {
        const res = await api.get("api/image/"+ id + "/edit");
        dispatch({ type: SET_IMAGE, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getTrashImages = () => async (dispatch) => {
    try {
        const res = await api.get("api/image/trash");
        dispatch({ type: IMAGES, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}
//GET ACTIONS END

//Image ACTIONS BEGIN
export const storeImage = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post("api/image/store", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/images";
        }
    } catch (e) {
        console.log(e);
    }
}

export const storeImageAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post("api/image/store", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
        }
    } catch (e) {
        console.log(e);
    }
}

export const postImgImage = (data) => async (dispatch) => {
    try {
        await api.post("api/image/imagePost", data);
    } catch (e) {
        console.log(e);
    }
};
//Image ACTIONS END

//DELETE ACTION BEGIN
export const deleteImages = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/image", { data: ids })
        if (isDeleted) {
            document.location.href = "/admin/images";
        }
    } catch (e) {
        console.log(e);
    }
}

export const destroyImages = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/image/force", { data: ids })
        if (isDestroy) {
            document.location.href = "/admin/images/trash";
        }
    } catch (e) {
        console.log(e);
    }
}
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restoreImages = (data) => async (dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/image/restore", { data: ids.id.split(',') })
        if (isRestore) {
            document.location.href = "/admin/images/trash";
        }
    } catch (e) {
        console.log(e);
    }
}

export const activeImages = (data) => async (dispatch) => {
    try {
        const isActive = await api.patch("api/image/"+data)
        if (isActive) {
            document.location.href = "/admin/images";
        }
    } catch (e) {
        console.log(e);
    }
}
//PATCH ACTION END

//PUT ACTION BEGIN
export const updateImage = (image) => async (dispatch) => {
    try {
        const isSucc = await api.put(`api/image/${image.id}`, image.formData);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/images";
        }
    } catch (e) {
        console.log(e);
    }
}
//PUT ACTION END

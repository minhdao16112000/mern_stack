import api from '../../api'
import {
    POSTS_LIST,
    SET_POST,
} from "../../constants/postConstant";

//GET ACTIONS BEGIN

export const getPosts = () => async (dispatch) => {
    try {
        const res = await api.get("api/post");
        dispatch({ type: POSTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getPostSlug = (slug) => async (dispatch) => {
    try {
        const res = await api.get(`api/post/${slug}`);
        dispatch({ type: SET_POST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getPost = (id) => async (dispatch) => {
    try {
        const res = await api.get("api/post/"+ id + "/edit");
        dispatch({ type: SET_POST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}

export const getTrashPosts = () => async (dispatch) => {
    try {
        const res = await api.get("api/post/trash");
        dispatch({ type: POSTS_LIST, payload: res.data });
    } catch (e) {
        console.log(e);
    }
}
//GET ACTIONS END

//POST ACTIONS BEGIN
export const storePost = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post("api/post/store", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/posts";
        }
    } catch (e) {
        console.log(e);
    }
}

export const storePostAndContinue = (data) => async (dispatch) => {
    try {
        const isSucc = await api.post("api/post/store", data);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
        }
    } catch (e) {
        console.log(e);
    }
}

export const postImgPost = (data) => async (dispatch) => {
    try {
        await api.post("api/post/imagePost", data);
    } catch (e) {
        console.log(e);
    }
};
//POST ACTIONS END

//DELETE ACTION BEGIN
export const deletePosts = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDeleted = await api.delete("api/post", { data: ids })
        if (isDeleted) {
            document.location.href = "/admin/posts";
        }
    } catch (e) {
        console.log(e);
    }
}

export const destroyPosts = (data) => async (dispatch) => {
    try {
        const ids = { id: data };
        const isDestroy = await api.delete("api/post/force", { data: ids })
        if (isDestroy) {
            document.location.href = "/admin/posts/trash";
        }
    } catch (e) {
        console.log(e);
    }
}
//DELETE ACTION END

//PATCH ACTION BEGIN
export const restorePosts = (data) => async (dispatch) => {
    try {
        const ids = { id: data };

        const isRestore = await api.patch("api/post/restore", { data: ids.id.split(',') })
        if (isRestore) {
            document.location.href = "/admin/posts/trash";
        }
    } catch (e) {
        console.log(e);
    }
}

export const activePosts = (data) => async (dispatch) => {
    try {
        const isActive = await api.patch("api/post/"+data)
        if (isActive) {
            document.location.href = "/admin/posts";
        }
    } catch (e) {
        console.log(e);
    }
}
//PATCH ACTION END

//PUT ACTION BEGIN
export const updatePost = (post) => async (dispatch) => {
    try {
        const isSucc = await api.put(`api/post/${post.id}`, post.formData);
        if (isSucc) {
            console.log(isSucc.data);
            console.log("success");
            document.location.href = "/admin/posts";
        }
    } catch (e) {
        console.log(e);
    }
}
//PUT ACTION END

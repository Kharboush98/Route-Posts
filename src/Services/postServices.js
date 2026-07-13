import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getAllPosts(pages=1)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/posts` , {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        },
        params:{
            limit:25,
            page:pages,
        }
    })

    return data;
}

export async function getAllUserFollowersPosts(userId)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/posts/feed?only=following` , {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
        }
    })

    return data;
}

export async function getPostById(id)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/posts/${id}` , {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function createPost(formData)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.post(`${baseURL}/posts` , formData , {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function updatePost(formData , id)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.put(`${baseURL}/posts/${id}` , formData , {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function sharePost(id , body)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.post(`${baseURL}/posts/${id}/share` , body , {
        headers:{
            "Authorization": `Bearer ${token}`,
            "Content-Type" : "application/json",
        }
    })

    return data;
}

export async function deletePostByID(id)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.delete(`${baseURL}/posts/${id}` , {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
        }
    })

    return data;
}

export async function likeUnLikePost(id)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.put(`${baseURL}/posts/${id}/like` , 
        {},
        {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });

    return data;
}

export async function BookmarkPost(id)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.put(`${baseURL}/posts/${id}/bookmark` , 
        {},
        {
        headers:{
            "Authorization": `Bearer ${token}`
        }
    });

    return data;
}

import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function getAllPosts()
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/posts` , {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`
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
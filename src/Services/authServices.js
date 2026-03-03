import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export async function userRegister(body)
{
    let data = await axios.post(`${baseURL}/users/signup` , body , {
        headers:{
            "Content-Type" : "application/json",
        }
    })

    return data;
}

export async function userLogin(body)
{
    let data = await axios.post(`${baseURL}/users/signin` , body , {
        headers:{
            "Content-Type" : "application/json",
        }
    }) 

    return data;
}


export async function changePassword(body)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.patch(`${baseURL}/users/change-password` , body , {
        headers:{
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${token}`,
        }
    }) 

    return data;
}

export async function getAllUserPosts(userId)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/users/${userId}/posts` , {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })

    return data;
}

export async function getAllUserProfiles(userId)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/users/${userId}/profile` , {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })

    return data;
}
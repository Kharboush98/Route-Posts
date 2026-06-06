import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export async function getAllNotifications(page=1, limit=10)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/notifications?page=${page}&limit=${limit}` , {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })

    return data;
}

export async function getUnreadNotificationsCount()
{
    const token = localStorage.getItem("userToken");

    let data = await axios.get(`${baseURL}/notifications/unread-count` , {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })

    return data;
}

export async function markAsRead(notificationId)
{
    const token = localStorage.getItem("userToken");

    let data = await axios.patch(`${baseURL}/notifications/${notificationId}/read` , 
        {},
        {
            headers:{
                "Authorization": `Bearer ${token}`,
            }
    })

    return data;
}

export async function markAllAsRead()
{
    const token = localStorage.getItem("userToken");

    let data = await axios.patch(`${baseURL}/notifications/read-all` ,
        {},
        {
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    })

    return data;
}

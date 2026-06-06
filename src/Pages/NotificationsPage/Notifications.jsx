import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { RiCheckDoubleFill } from 'react-icons/ri';
import { getAllNotifications, getUnreadNotificationsCount, markAllAsRead, markAsRead } from '../../Services/notificationServices';
import { Button, Image } from '@heroui/react';
import { Link } from 'react-router'
import { toast } from 'react-toastify';

export default function Notifications() {

    // const [notification , setNotification]= useState([]);    

    function timeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const seconds = Math.floor((now - date) / 1000);

        if (seconds < 60) return `${seconds}s`;
        
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h`;
        
        const days = Math.floor(hours / 24);
        if (days < 30) return `${days}d`;
        
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo`;
        
        const years = Math.floor(months / 12);
        return `${years}y`;
    }

    const notificationMessages = {
        "like_post": "liked your post",
        "comment_post": "commented on your post",
        "share_post": "shared your post",
        "follow_user": "followed you!"
    }

    const {data : notification} = useQuery({
        queryKey:["getNotifications"],
        queryFn: ()=> getAllNotifications(),
        select:(data) => data?.data.data.notifications,
        staleTime: 30000,
    })

    const {data : count , isPending : countPending} = useQuery({
        queryKey:["getNotificationsCount"],
        queryFn: ()=> getUnreadNotificationsCount(),
        select:(data) => data?.data.data.unreadCount,
        staleTime: 30000,
    })

    const queryClient = useQueryClient()

    const {mutate : MarkNotAsRead , isPending} = useMutation({
        mutationFn:(notID)=> markAsRead(notID),
        onSuccess:(response)=>{
            toast.success(response.data.message)
            queryClient.invalidateQueries({ queryKey: ["getNotifications"] })
        },
        onError:(error)=>{
            toast.error("couldn't mark it as read")
        }
    })

    const {mutate : MarkAllNotAsRead} = useMutation({
        mutationFn:()=> markAllAsRead(),
        onSuccess:(response)=>{
            toast.success(response.data.message)
            queryClient.invalidateQueries({ queryKey: ["getNotifications"] })
        },
        onError:(error)=>{
            toast.error("couldn't mark All notifications as read")
        }
    })

    console.log(notification , "console");



    // async function getUsersPosts() {
    //     const response = await getAllNotifications();
    //     console.log(response.data.data.notifications);
    //     setNotification(response.data.data.notifications);
    // }

    // useEffect(()=>{
    //     getUsersPosts();
    // })


    return (
      <>
        <main className="bg-[#F0F2F5] min-h-screen">
          <div className="container px-3 py-4">
            <section className="rounded-xl border border-slate-200 bg-white shadow-sm sm:rounded-2xl">
              <div className="border-b border-slate-200 p-4 sm:p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-black text-slate-900 sm:text-2xl">
                      Notifications
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Realtime updates for likes, comments, shares, and follows.
                    </p>
                  </div>
                  <button onClick={()=>MarkAllNotAsRead()}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    disabled=""
                  >
                    <RiCheckDoubleFill className="text-xl" />
                    Mark all as read
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 sm:flex sm:items-center">
                  <button
                    type="button"
                    className="rounded-full px-4 py-1.5 text-sm font-bold transition bg-[#1877f2] text-white"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold transition bg-slate-100 text-slate-700 hover:bg-slate-200"
                  >
                    Unread {countPending ? "" : count}
                  </button>
                </div>
              </div>
              <div className="space-y-2 p-3 sm:p-4">
                {notification?.length > 0 ? (
                  notification.map((not) => (
                    <Link
                      to={
                        not?.type === "follow_user"
                          ? `/profile/${not?.entity?._id}`
                          : `/post/${not?.entity?.post || not?.entity?._id}`
                      }
                      key={not?._id}
                      className={`group relative flex gap-3 rounded-xl border p-3 transition sm:rounded-2xl sm:p-4
                                ${not?.isRead ? "border-slate-200 bg-white hover:bg-slate-50" : "border-[#dbeafe] bg-[#edf4ff]"} `}
                    >
                      <div className="relative shrink-0">
                        <button type="button" className="block cursor-pointer">
                          <Image
                            alt={not?.actor.name}
                            className="h-11 w-11 rounded-full object-cover"
                            src={not?.actor.photo}
                          ></Image>
                        </button>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-1.5 sm:gap-2">
                          <p className="text-sm leading-6 text-slate-800">
                            <button
                              type="button"
                              className="font-extrabold hover:text-[#1877f2] hover:underline"
                            >
                              {not?.actor.name}
                            </button>{" "}
                            {notificationMessages[not?.type] ??
                              "interacted with your post"}
                          </p>
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-xs font-semibold text-slate-500">
                              {timeAgo(not?.createdAt)}
                            </span>
                          </div>
                        </div>
                        <p className="mt-0.5 text-sm text-slate-600">
                          {not?.entity.body || not?.entity.content}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          {not?.isRead ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                              <FaCheck />
                              Read
                            </span>
                          ) : (
                            <button onClick={(e)=>{MarkNotAsRead(not?._id); e.preventDefault(); e.stopPropagation();}}
                            className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-xs font-bold text-[#1877f2] ring-1 ring-[#dbeafe] transition hover:bg-[#e7f3ff]">
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 p-4">
                    No notifications yet.
                  </p>
                )}
              </div>
            </section>
          </div>
        </main>
      </>
    )
}

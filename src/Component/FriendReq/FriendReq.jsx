import React from 'react'
import userImg from "../../assets/imgs/route.jpg"
import { FiUsers } from "react-icons/fi";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdPersonAdd } from "react-icons/io";


export default function FriendReq() {

  return (
    <>
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm space-y-2.5">
            <div className="mb-3 flex justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                    <FiUsers />
                    <h3>Suggested Users</h3>
                </div>

                <span className='rounded-full bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-600'>
                    5
                </span>
            </div>

            <div className="mb-3">
                <div className="relative block">
                    <FaMagnifyingGlass className='lucide lucide-search pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400'/>
                    <input type="text" placeholder="Search friends..." 
                    className='w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 outline-none focus:border-[#1877f2] focus:bg-white'/>
                </div>
            </div>

            <div className="space-y-3">
                <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                        <button type='button' className='flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50'>
                            <img src={userImg} alt="" className='class="h-10 w-10 rounded-full object-cover'/>
                            <div className="min-w-0">
                                <p className='truncate text-sm font-bold text-slate-900 hover:underline'>Ahmed bahnasy</p>
                                <p className='truncate text-xs text-slate-500'>@bahnasy</p>
                            </div>
                        </button>

                        <button className='inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]'>
                            <IoMdPersonAdd className='mr-0.5'/>
                            Follow
                        </button>
                    </div>

                    <div className='mt-2 flex items-center gap-2 text-[12px] font-semibold text-slate-500'>
                        <span className='rounded-full bg-slate-100 px-2 py-0.5'>106 Followers</span>
                        <span className='rounded-full bg-[#edf4ff] px-2 py-0.5 text-[#1877f2]'>1 Mutual</span>
                    </div>
                </div>
                <div className="rounded-xl border border-slate-200 p-2.5">
                    <div className="flex items-center justify-between gap-2">
                        <button type='button' className='flex min-w-0 items-center gap-2 rounded-lg px-1 py-1 text-left transition hover:bg-slate-50'>
                            <img src={userImg} alt="" className='class="h-10 w-10 rounded-full object-cover'/>
                            <div className="min-w-0">
                                <p className='truncate text-sm font-bold text-slate-900 hover:underline'>Ahmed bahnasy</p>
                                <p className='truncate text-xs text-slate-500'>@bahnasy</p>
                            </div>
                        </button>

                        <button className='inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold transition disabled:opacity-60 bg-[#e7f3ff] text-[#1877f2] hover:bg-[#d8ebff]'>
                            <IoMdPersonAdd className='mr-0.5'/>
                            Follow
                        </button>
                    </div>

                    <div className='mt-2 flex items-center gap-2 text-[12px] font-semibold text-slate-500'>
                        <span className='rounded-full bg-slate-100 px-2 py-0.5'>106 Followers</span>
                        <span className='rounded-full bg-[#edf4ff] px-2 py-0.5 text-[#1877f2]'>1 Mutual</span>
                    </div>
                </div>
            </div>

            <button className='mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 
                bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100'>
                View more
            </button>

        </div>
    </>
  )
}

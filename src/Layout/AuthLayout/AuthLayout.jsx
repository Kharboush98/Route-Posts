import React from 'react'
import { Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <>
      <div className="bg-[#F0F2F5] mx-auto w-full min-h-screen px-4 py-8 sm:py-12 lg:flex lg:items-center">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="w-full max-w-xl text-left">
              <h1 className='text-5xl font-extrabold -tracking-tight text-routeBlue sm:text-6xl lg:block'>Route Posts</h1>
              <p className='mt-4 text-2xl font-medium text-slate-800 lg:block'>Connect with friends and the world around you on Route Posts.</p>
            
              <div className="card mt-6 rounded-2xl border border-border bg-white/80 p-4 shadow-sm backdrop-blur sm:p-5">
                <p className='text-sm font-extrabold uppercase text-routeBlue'>About Route Academy</p>
                <p className='mt-1 text-lg font-bold text-slate-900'>Egypt's leading it training center since 2012</p>
                <p className='mt-2 text-sm leading-relaxed text-slate-700'>Route Academy is the premier IT training center in Egypt,
                   established in 2012. We specialize in delivering high-quality training courses in programming,
                   web development, and application development. We've identified the unique challenges people may face
                   when learning new technology and made efforts to provide strategies to overcome them.
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">

                  <div className="rounded-xl border border-border bg-[#f2f6ff] px-3 py-2">
                    <p className='text-routeBlue font-extrabold text-base'>2012</p>
                    <p className='text-[12px] font-bold uppercase tracking-wide text-slate-600'>Founded</p>
                  </div>

                  <div className="rounded-xl border border-border bg-[#f2f6ff] px-3 py-2">
                    <p className='text-routeBlue font-extrabold text-base'>40K+</p>
                    <p className='text-[12px] font-bold uppercase tracking-wide text-slate-600'>Graduates</p>
                  </div>

                  <div className="rounded-xl border border-border bg-[#f2f6ff] px-3 py-2">
                    <p className='text-routeBlue font-extrabold text-base'>50+</p>
                    <p className='text-[12px] font-bold uppercase tracking-wide text-slate-600'>Partner Companies</p>
                  </div>

                  <div className="rounded-xl border border-border bg-[#f2f6ff] px-3 py-2">
                    <p className='text-routeBlue font-extrabold text-base'>5</p>
                    <p className='text-[12px] font-bold uppercase tracking-wide text-slate-600'>Branches</p>
                  </div>

                  <div className="rounded-xl border border-border bg-[#f2f6ff] px-3 py-2">
                    <p className='text-routeBlue font-extrabold text-base'>20</p>
                    <p className='text-[12px] font-bold uppercase tracking-wide text-slate-600'>Diplomas Available</p>
                  </div>

                </div>
              </div>
            </div>
            
            <div className="w-full max-w-107.5 text-left">
              <Outlet/>
            </div>
        
          </div>
      </div>
    </>
  )
}

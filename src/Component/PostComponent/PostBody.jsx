import React from 'react'
import { Link } from 'react-router'

export default function PostBody({id , body , image , isShare , sharedPost}) {
  return (
    <>
      {/*text*/}
        <Link to={`/post/${id}`}>
            {body && (
                <div className='px-4 pb-3'>
                    <p className='leading-relaxed text-medium whitespace-pre-line wrap-break-word'>{body}</p>
                </div>
            )}
        </Link>
        
            
        {/* Image */}
        <Link to={`/post/${id}`}>
            {image && <img src={image} alt='post-image' className='w-full max-h-125 object-cover' />}
        </Link>

        {/* shared post */}
        {isShare && sharedPost && (
          <Link to={`/post/${sharedPost.id}`}>
            <div className='mx-4 mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3'>
              {/* shared post user */}
              <div className='flex items-center gap-2 mb-2'>
                <img src={sharedPost.user?.photo} alt={sharedPost.user?.name} className='h-8 w-8 rounded-full object-cover'/>
                <div>
                  <p className='text-sm font-bold text-slate-900'>{sharedPost.user?.name}</p>
                  <p className='text-xs text-slate-500'>@{sharedPost.user?.username}</p>
                </div>
              </div>

              {/* shared post body */}
              {sharedPost.body && (
                <p className='text-sm leading-relaxed text-slate-700 whitespace-pre-line'>{sharedPost.body}</p>
              )}

              {/* shared post image */}
              {sharedPost.image && (
                <img src={sharedPost.image} alt='shared-post' className='mt-2 w-full max-h-80 object-cover rounded-xl'/>
              )}
            </div>
          </Link>
      )}

    </>
  )
}

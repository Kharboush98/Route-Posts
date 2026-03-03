import React from 'react'
import { Link } from 'react-router'

export default function PostBody({id , body , image}) {
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
    </>
  )
}

import React from 'react'
import { useNavigate } from 'react-router-dom'

const BlogCard = ({blog}) => {

    const { title, description, category, image, _id} = blog
    const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/blog/${_id}`)} className='w-full rounded-lg overflow-hidden shadow sm:hover:scale-102 sm:hover:shadow-primary-dull duration-300 cursor-pointer'>
        <img src={image} alt="" className='aspect-video ' />
        <span className='ml-5 mt-4 px-3 py-1 inline-block bg-primary rounded-full text-white text-xs'>
            {category}
        </span>
        <div className='px-5 py-2'>
            <h5 className='mb-2 font-medium text-lg text-primary' >{title}</h5>
            <p className='mb-3 text-xs text-gray-600' dangerouslySetInnerHTML={{"__html" : description.slice(0,80)}}></p>
        </div>
    </div>
  )
}

export default BlogCard
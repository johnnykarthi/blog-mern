import React, { useState, useEffect } from 'react'
import BlogContent from './BlogContent'
import { useParams } from 'react-router-dom';
import BlogSkeletonLoading from './BlogSkeletonLoading';

export default function BlogContentLayout() {
    const { blogId } = useParams();
    const [blog, setBlog] = useState(null);
    const [isloading, setisLoading] = useState(false)
    const [error, setError] = useState(false);
    const [serverError, setServerError] = useState(false)

    useEffect(() => {
        const fetchBlog = async () => {
            setisLoading(true);
            try {
                const response = await fetch(`http://localhost:4500/api/${blogId}`)
                const data = await response.json()
                if (!response.ok) {
                    return setError(true)
                }
                setBlog(data)
            } catch (err) {
                setServerError(err.message)
            } finally {
                setisLoading(false);
            }
        }
        fetchBlog()
    }, [blogId])

    let errorMain = null;

    if (error) {
        errorMain = {
            url: "404.png",
            message: "404 - Blog not found"
        }
    }

    if (serverError) {
        errorMain = {
            url: "server-down.png",
            message: "500 - Internal Server Error"
        }
    }

    return (
        <>
            <div className="home">
                <h2 className="logo">JAYKAY BLOG</h2>
                {isloading && <BlogSkeletonLoading />}
                {blog && <BlogContent blog={blog} />}
                {errorMain && <div className='error-box'>
                    <div>
                        <img src={`../../assets/${errorMain.url}`} alt="" />
                    </div>
                    <p>{errorMain.message}</p>
                </div>}
            </div>
        </>
    )
}

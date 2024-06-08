import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import {format} from 'date-fns'

export default function Home() {

    const [pageNumber,setPageNumber] = useState(1);
    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState([]);
    const [hasmore,setHasmore] = useState(true);
    const [search,setSearch] = useState('');
    const observer = useRef();  // observer.current = undefined
    let result = [];

    if(!(blogPost.length === 0)) {
        result = blogPost.filter((blog) => blog.title.toLowerCase().includes(search.toLowerCase()) )
    }

    const lastBlogPost = useCallback(node => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if(loading) return;
            if (entries[0].isIntersecting && hasmore) {
                setPageNumber(prev => prev + 1);
            }
        });
       if(node) observer.current.observe(node)
       
    },[hasmore,loading])

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://blog-mern-e1ne.onrender.com/api?page=${pageNumber}&limit=7`);
                const json = await response.json();
                if(json.result.length === 0) return setHasmore(false);
                setBlogPost(prev => [...prev,...json.result]);
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false);
            }
        }
        fetchData()
    }, [pageNumber])

    const OnSearchHandler = (e)=>{
        setSearch(e.target.value) 
    }
    return (
        <div className="home">
            <h2 className="logo">JAYKAY BLOG</h2>
            <div className="search-container">
                <div className="search-input-box">
                    <input type="text" placeholder="Search..." value={search} className="search-input" onChange={OnSearchHandler} />
                    <i className="bi bi-search"></i>
                </div>
                <div className="tag-container">
                    <span className="tag">Javascript</span>
                    <span className="tag">CSS</span>
                    <span className="tag">Html</span>
                    <span className="tag">Java</span>
                    <span className="tag">Spring</span>
                    <span className="tag">MongoDB</span>
                    <span className="tag">Git</span>
                    <span className="tag">Express</span>
                    <span className="tag">Jwt</span>
                    <span className="tag">Typescript</span>
                    <span className="tag">Node</span>
                </div>
            </div>
            <div className="blog-container">
                {result.map((blog, i) => {
                    if (blogPost.length === i + 1) {
                        return (<div>
                            <Link to={`/${blog.blogId}`}>
                           
                            <div className="blog-post" ref={lastBlogPost}>
                                <p className="post-title">{blog.title}</p>
                                <div className="tag-box">{blog.tags.map((tag) => (
                                    <span className="tag tag-sm">{tag}</span>
                                ))}</div>
                                <p className="post-desc">{blog.description}</p>
                                <div className="footer-post"><span className="readmore">Readmore</span> <span className="date">{format(new Date(blog.createdAt), 'dd MMM, yyyy')}</span></div>
                            </div> </Link></div>
                        )
                    } else {
                        return (
                            <div>
                            <Link to={`/blog/${blog.blogId}`}>
                            <div className="blog-post">
                                <p className="post-title">{blog.title}</p>
                                <div className="tag-box">{blog.tags.map((tag) => (
                                    <span className="tag tag-sm">{tag}</span>
                                ))}</div>
                                <p className="post-desc">{blog.description}</p>
                                <div className="footer-post"><span className="readmore">Readmore</span> <span className="date">{format(new Date(blog.createdAt), 'dd MMM, yyyy')}</span></div>
                            </div>
                            </Link></div>
                        )
                    }
                }
                )
                }

            </div>
        </div>
    )
}

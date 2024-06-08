import React from 'react'

export default function BlogSkeletonLoading() {
    return (
        <>
            <div className="main">
                <p className="skeleton skeleton-head"></p>
                <p className="skeleton skeleton-head last"></p>
                <p className='skeleton skeleton-date'></p>
                <div className='skeleton-tag-box'>
                    <p className="skeleton-tag"></p>
                    <p className="skeleton-tag"></p>
                </div>
                <div className="icon-box">
                    <span className="skeleton-circle"></span>
                    <span className="skeleton-circle"></span>
                    <span className="skeleton-circle"></span>
                    <span className="skeleton-circle"></span>
                    <span className="skeleton-circle"></span>
                </div>
                <div className='skeleton-desc'>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text last'></p>
                </div>
                <div className="main-video">
                    <div className='skeleton-video'></div>
                    <h3 className='skeleton-center'><p className='skeleton skeleton-title'></p></h3>
                </div>
                <div className="skeleton-content">
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text last'></p>
                    <p className='skeleton skeleton-title'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text last'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text last'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text'></p>
                    <p className='skeleton skeleton-text last'></p>
                </div>
            </div>
        </>
    )
}

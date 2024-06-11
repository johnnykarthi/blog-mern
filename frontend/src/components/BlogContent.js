import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import rehypeRaw from 'rehype-raw'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function BlogContent({ blog }) {

  const renders = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  }

  async function multipleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href
        })
      } catch (e) {
        console.log("Sharing failed", e);
      }
      console.log('Shared successfully', {
        title: blog.title,
        text: blog.description,
        url: window.location.href
      });
    } else {
      console.log('Share not supported');
    }
  }

  return (
    <>
      <div className="main">
        <p className="main-title">{blog.title}</p>
        <h6 className="main-date">Last Updated : {format(new Date(blog.updatedAt), 'dd MMM, yyyy')} <br />Author : {blog.author}</h6>
        {blog.tags.map((tag) => (
          <span className="tag">{tag}</span>
        ))}
        <div className="icon-box">
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target='_blank' rel="noreferrer" ><span className="facebook"><i className="bi bi-facebook"></i></span></a>
          <a href={`https://api.whatsapp.com/send?text=${encodeURIComponent(window.location.href)}`} target='_blank' rel="noreferrer" ><span className="whatsapp"><i className="bi bi-whatsapp"></i></span></a>
          <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target='_blank' rel="noreferrer" ><span className="linkedin"><i className="bi bi-linkedin"></i></span></a>
          <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${encodeURIComponent(blog.title)}`} target='_blank' rel="noreferrer"><span className="twitter"><i className="bi bi-twitter-x"></i></span></a>
          <span className="share" onClick={multipleShare}><i className="bi bi-share-fill"></i></span>
        </div>

        {blog.videoLink &&
          <>
            <p className='main-desc'>{blog.description}</p>
            <div className="main-video">
              <div>
                <video src={blog.videoLink} width="100%" controls></video>
              </div>
              <div className='text-center'>
                <a href={blog.youtubeLink}>Watch on YouTube</a>
              </div>
            </div>
          </>
        }
        <div className="content">
          <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]} components={renders} children={blog.markdownContent}></ReactMarkdown>
        </div>
      </div>
    </>
  )
}



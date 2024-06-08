const Blog = require('../model/Blog');

const createBlog  = async(req,res)=>{
    const {blogId,title,description,tags,markdownContent,videoLink,youtubeLink} = req.body
    try{
        const response = await Blog.create({blogId,title,description,tags,markdownContent,videoLink,youtubeLink})
        res.status(201).json({response})
    }catch(e){
        res.json({error:e.message})
    }
}

const getBlog = async(req,res)=>{
    const page = req.query.page;
    const limit = req.query.limit;

    try{
        const response = await Blog.find().sort({createdAt:-1})

        if(!page && !limit){
          return res.json(response);
        }
        const temp = {};

        const startIndex = (page -1)*limit; 
        const endIndex = page * limit; 

        if(startIndex > 0){
            temp.prev = {
                page: parseInt(page) -1,
                limit: parseInt(limit)
            }
        }

        if(!(endIndex > response.length)){
            temp.next = {
                page : parseInt(page) +1,
                limit : parseInt(limit)
            }
        }

        const result = response.slice(startIndex,endIndex);

        res.json({result,...temp});

    }catch(e){
        res.json({error:e.message})
    }
}

const getMarkdown = async(req,res)=>{
    const {blogId} = req.params
    try{
        const response = await Blog.findOne({blogId})
        if(!response){
            return res.status(400).json({error:"Blog Id is invalid"})
        }
        res.status(200).json(response)
    }catch(e){
        res.json({error:e.message})
    }
}

const updateBlog = async(req, res)=>{
    const {blogId} = req.params
    console.log(blogId)
    try{
        const response = await Blog.findOneAndUpdate({blogId}, req.body)
        res.status(200).json(response)
    }catch(e){
        res.json({error:e.message})
    }
}

const deleteBlog = async(req, res)=>{
    const {blogId} = req.params

    try{
        const response = await Blog.findOneAndDelete({blogId})
        res.status(200).json(response)
    }catch(e){
        res.json({error:e.message})
    }
}



module.exports = {createBlog,getBlog,getMarkdown,updateBlog,deleteBlog}
const express = require('express')
const router = express.Router();

const {createBlog,getBlog,getMarkdown,updateBlog,deleteBlog} = require('../controller/BlogController')

router.get('/',getBlog)

router.get('/:blogId',getMarkdown)

router.post('/create', createBlog)

router.put('/update/:blogId', updateBlog)

router.delete('/delete/:blogId', deleteBlog)


module.exports = router;

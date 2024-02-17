const fs = require('fs');
const path = require('path');

const postsFilePath = path.join(__dirname, '../data/posts.json');

function readPosts(){
    try{
        if (fs.existsSync(postsFilePath)) {
            const postsData = fs.readFileSync(postsFilePath, 'utf8');
            return JSON.parse(postsData);
        } else {
            console.error('Posts file does not exist');
            return [];
        }
    } catch(error){
        console.error('Error reading posts:', error);
        return [];
    }
}

function writePosts(posts){
    try{
        fs.writeFileSync(postsFilePath, JSON.stringify(posts, null, 2), 'utf8');
    } catch(error){
        console.error('Error writing posts:', error);
    }
}

// generate id
function generateID(posts){
    const ids = posts.map(post => post.id);
    const max = Math.max(...ids);

    return max+1;
}

// get all posts
function getAllPosts(){
    return readPosts();
}

// get post by id
function getPost(id){
    const posts = readPosts();

    const post = posts.find(post => post.id == id)

    return post;
}

// create new post
function createPost(post){
    const posts = readPosts();

    post.id = generateID(posts);
    post.date = new Date().toISOString().substr(0, 10);

    posts.push(post);
    writePosts(posts);

    return post;
}

// update post by id
function updatePost(id, updatedPost){
    const posts = readPosts();

    const postIndex = posts.findIndex(post => post.id == id);

    if (postIndex === -1) {
        return null; 
    }

    if(updatedPost.title){
        posts[postIndex].title = updatedPost.title;
    }

    if(updatedPost.author){
        posts[postIndex].author = updatedPost.author;
    }

    if(updatedPost.content){
        posts[postIndex].content = updatedPost.content;
    }

    writePosts(posts);

    return posts[postIndex];
}

// delete post by id
function deletePost(id){
    const posts = readPosts();

    const postIndex = posts.findIndex(post => post.id == id)

    if (postIndex !== -1) {
        const deletedPost = posts.splice(postIndex, 1)[0];
        writePosts(posts);
        return deletedPost;
    } else {
        return []; 
    }
}

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
}
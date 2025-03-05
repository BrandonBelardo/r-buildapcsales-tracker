export const getNewPostList = async (newestStoredPostID, posts) => {
    // Given the newest recorded post id, we determine if the passed response has any
    // new posts and return them in a list

    const newPosts = [];

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].data.id !== newestStoredPostID) {
            newPosts.push(posts[i]);
        } else {
            break;
        }
    }
    
    return newPosts;

    
}
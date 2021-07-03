const { UserInputError, AuthenticationError } = require('apollo-server-errors');

const checkAuth = require('../../util/check-auth')
const Post = require('../../Models/Post')

module.exports = {
    Mutation: {
        async createComments (_, { postId, body }, context){
            const user = checkAuth(context);
            if(body.trim() === ''){
                throw new UserInputError('Empty comment', {
                    errors: {
                        body: 'Comments body must not be empty'
                    }
                })
            }
            const post = await Post.findById(postId)
            if(post){
                post.comments.unshift({
                    body,
                    username: user.username,
                    createdAt: new Date().toISOString()
                })
                await post.save()
                return post
            } else throw new UserInputError('Post not found')
        },
        async deleteComments(_, { postId, commentId}, context ){
            const { username } = checkAuth(context)
            const post = await Post.findById(postId)

            if (post){
                const commentsIndex = post.comments.findIndex(c => c.id === commentId)

                if(post.comments[commentsIndex].username === username){
                    post.comments.splice(commentsIndex, 1)
                    await post.save()
                    return post;
                } else {
                    throw new AuthenticationError('Action not allowed')
                }
            }else {
                throw new UserInputError('Post not found');
            }
        }
    }
}



const postsResolvers = require('./posts')
const userResolvers = require('./users')
const commentsResolvers = require('./comments')

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
   Query: {
    ...postsResolvers.Query
  },
  Mutation: {
      ...postsResolvers.Mutation,
      ...userResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
   Subscription: {
    ...postsResolvers.Subscription
  }
}




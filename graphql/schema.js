const fetch = require('isomorphic-fetch')

export const resolvers = {
  Query: {
    posts: function getPosts(root, args, ctx) {
      const { domain } = args
      return fetch(`https://${domain}/wp-json/wp/v2/posts/`)
        .then(res => res.json())
    },
    Post: {
      title: post => post.title.rendered,
      url: post => post.link,
      content: post => post.content.rendered,
      excerpt: post => post.excerpt.rendered
    }
  }
}
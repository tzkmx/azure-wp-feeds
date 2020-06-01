const fetch = require('isomorphic-fetch')

const resolvers = {
  Query: {
    posts: function getPosts(root, args, ctx) {
      const { domain } = args
      return fetch(`https://${domain}/wp-json/wp/v2/posts/`)
        .then(res => res.json())
    },
  },
  Post: {
    title: post => post.title.rendered,
    url: post => post.link,
    content: post => post.content.rendered,
    excerpt: post => post.excerpt.rendered
      .replace(/(<([^>]+)>)/ig,'')
      .replace(/\n/,'')
    ,
    date: post => post.modified,
    date_utc: post => post.modified_gmt
  }
}

module.exports.resolvers = resolvers

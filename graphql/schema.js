const fetch = require('isomorphic-fetch')
const { imageDataLoader } = require('./imageDataLoader')

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
      .replace(/(\[&hellip;\])/ig,'...')
      .replace(/(&[^;]+;)/ig,'')
      .replace(/\n/g,'')
      .trim()
    ,
    image: async function getFeaturedMedia(post, args) {
      const id = post.featured_media
      const domain = post.link.split('/').slice(0, 3).join('/')
      const imageData = await imageDataLoader(domain).load(id)
      const wantedSize = args['size']
      return imageData.media_details.sizes[wantedSize]
    },
    date: post => post.modified,
    date_utc: post => post.modified_gmt
  },
  PostThumbnail: {
    url: image => image.source_url
  }
}

module.exports.resolvers = resolvers

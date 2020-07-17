const DataLoader = require('dataloader')
const fetch = require('isomorphic-fetch')

const loaderRegistry = {}

function imageDataLoader (domain) {
  if (loaderRegistry[domain]) {
    return loaderRegistry[domain]
  }

  const batchLoaderFn = keys => {
    const ids = keys.join(',')
    const idsMap = keys.reduce(
      function (idsMap, id, index) {
        idsMap[id] = null
        return idsMap
    }, {})

    return fetch(`${domain}/wp-json/wp/v2/media/?orderby=include&include=${ids}`)
      .then(res => res.json())
      .then(function(responses) {
        if (responses.length === keys.length) {
          return responses
        }
        responses.forEach(function (imagePost) {
          const postId = imagePost.id
          idsMap[postId] = imagePost
        })
        return keys.reduce(function (acc, key) {
          const response = idsMap[key]
          const post = typeof response === 'undefined'
            ? null
            : response
          acc.push(response)
          return acc
        }, [])
      })
  }
  const loader = new DataLoader(batchLoaderFn)
  loaderRegistry[domain] = loader
  return loader
}

module.exports.imageDataLoader = imageDataLoader

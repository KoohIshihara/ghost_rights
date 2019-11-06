const appDomain = 'https://ghostright.io'
// const appDomain = 'http://localhost:5000'
const OGP_IMG_WIDTH = 1200
const OGP_IMG_HEIGHT = 630

module.exports = (title, subtitle, src, articleId) => {
  const SITEURL = appDomain
  const PAGEURL = `${SITEURL}/@article/${articleId}`
  const TITLE = title
  const DESCRIPTION = subtitle
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>${TITLE}</title>
    <meta property="og:title" content="${TITLE}">
    <meta property="og:image" content="${src}">
    <meta property="og:image:width" content="${OGP_IMG_WIDTH}">
    <meta property="og:image:height" content="${OGP_IMG_HEIGHT}">
    <meta property="og:description" content="${DESCRIPTION}">
    <meta property="og:url" content="${PAGEURL}">
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="${TITLE}">
    <meta name="twitter:site" content="${SITEURL}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${TITLE}">
    <meta name="twitter:image" content="${src}">
    <meta name="twitter:description" content="${DESCRIPTION}">
  </head>
  <body>
    <script type="text/javascript">window.location="/@article/${articleId}"</script>
  </body>
</html>
`
}
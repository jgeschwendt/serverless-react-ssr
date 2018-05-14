export default ({ content, context, helmet, introspectionQueryResultData, state, sheet }) => `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  <link href="https://fonts.googleapis.com/css?family=Caveat|Open+Sans:300,400,600,700|Quicksand" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/5.0.0/sanitize.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
  ${helmet.link.toString()}
  ${sheet.getStyleTags()}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${content}</div>
  <script>${`
    window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};
    window.__APOLLO_FRAGS__=${JSON.stringify(introspectionQueryResultData).replace(/</g, '\\u003c')};
    window.__LAMBDA_STATE__=${JSON.stringify(context).replace(/</g, '\\u003c')};
  `}</script>
  <script src="/static/vendors.js"></script>
  <script src="/static/main.js"></script>
</body>
</html>
`

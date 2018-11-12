export default ({
  content,
  context,
  extractor,
  helmet,
  introspectionQueryResultData,
  sheet,
  state,
  store
}) => `<!DOCTYPE html>
<html ${helmet.htmlAttributes.toString()}>
<head>
  <meta charSet="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/10up-sanitize.css/5.0.0/sanitize.min.css" />
  ${helmet.link.toString()}
  ${sheet.getStyleTags()}
</head>
<body ${helmet.bodyAttributes.toString()}>
  <div id="root">${content}</div>
  <script>${`
    window.__APOLLO_STATE__=${JSON.stringify(state).replace(/</g, '\\u003c')};
    window.__APOLLO_FRAGS__=${JSON.stringify(introspectionQueryResultData).replace(/</g, '\\u003c')};
    window.__LAMBDA_STATE__=${JSON.stringify(context).replace(/</g, '\\u003c')};
    window.__REDUX_STATE__=${JSON.stringify(store.getState()).replace(/</g, '\\u003c')};
  `}</script>
  ${extractor.getScriptTags()}
  <script src="/static/vendors.js"></script>
  <script src="/static/main.js"></script>
</body>
</html>
`

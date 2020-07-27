import React from 'react';
import { renderToString } from 'react-dom/server';

const template = (staticRoot: string, html: string) => `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>10x Data Fixer Prototype</title>
        <link rel="stylesheet" href="${staticRoot || ''}/frontend/bundle.css">
        <script src="${staticRoot || ''}/context/browser/browser.js"></script>
    </head>
    <body>
        <div id="app">${html}</div>
    </body>
</html>`;

const App = () => {
  return <div>{'Hello'}</div>;
};

export const getRenderPageAction = (staticRoot: string) => () => {
  return template(staticRoot, renderToString(<App />));
};

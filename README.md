# Atlas Copco - Small Entities

Client app the submit service jobs according to the specifications of small entities.

## Installation

If you don't have node installed. Follow instructions on [nodejs.org](http://nodejs.org).

```sh
npm install
```

This project uses [Webpack](http://webpack.github.io) as module bundler. This takes into account all dependencies and generates static assets that represents those modules. For more information, visit the documentation on the website.

It could be that the following packages need to be installed separately to enable the webpack binaries globally.

```sh
npm install webpack -g
npm install webpack-dev-server -g
```

## To Run

The compiled files are checked in. In theory you could simply open the index.html file in the dist folder to view the application. However, because we need a connection with SAP server, a proxy needs to be setup to route the requests (equipment details, job confirmation) back to SAP without CORS errors popping up. Because of this run the following command and keep the process running.

```sh
npm run dev
```

This will start the webpack-dev-server and serve the website at http://localhost:8080. Requests to SAP will be routes to AQ1. This inevitably means that you need to be able to reach the system. When outside the Atlas Copco domain, 502 bad gateway error will be printed in the console.

## Developing

While the above serves the website, it doesn't recompile files. The following watch task recompiles all files when a change occurs. Run the following command in a separate screen.

```sh
npm run watch
```

## Production

To prepare the files for production, an optimized configuration of webpack need to be used. Run the following command.

```sh
npm run deploy
```

The output is written to the same location, dist/bundle.js, but the contents is more optimized. I prefer committing the **development** versions of the bundle.js file.

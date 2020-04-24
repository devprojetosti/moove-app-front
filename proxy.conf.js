const proxy = [
  {
    context: '/moove',
    target: 'http://localhost:8080',
    pathRewrite: { '^/moove': '' }
  }
];
module.exports = proxy;

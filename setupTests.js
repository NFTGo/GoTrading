// const HTTP_PROXY = 'http://127.0.0.1:9999';

// // bootstrap();

// process.env.http_proxy = HTTP_PROXY;
// process.env.https_proxy = HTTP_PROXY;
// // export GLOBAL_AGENT_HTTP_PROXY=HTTP_PROXY

const nodefetch = require('node-fetch');
global.fetch = nodefetch;

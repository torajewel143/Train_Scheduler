var liveServer = require('live-server');

var params = {
    port: 8080,
    host: "0.0.0.0",
    root: "src",
    open: true,
    wait: 1000
};

liveServer.start(params);
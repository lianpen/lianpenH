/*
 * @Author: lianpen
 * @Date:   2018-05-10 09:52:10
 */

const app = require('./app')
var fs = require('fs');
const args = require('./args')
const port = args.port || 443

var https = require('https');
var options = {
	key: fs.readFileSync('./https/1532902641737.key'),
	cert: fs.readFileSync('./https/1532902641737.pem')
}
var httpsServer = https.createServer(options, app)

httpsServer.listen(port, function() {
	console.log('服务启动在' + port + '端口')
});
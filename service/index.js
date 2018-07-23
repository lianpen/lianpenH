/*
 * @Author: lianpen
 * @Date:   2018-05-10 09:52:10
 */

const app = require('./app')
var fs = require('fs');
const args = require('./args')
const port = args.port || 80

/*
var https = require('https');
var options = {
    key:fs.readFileSync('./https/production/214744561240215.key'),
    cert:fs.readFileSync('./https/production/214744561240215.pem')
}
console.log(options)
var httpsServer = https.createServer(options, app)

httpsServer.listen(port, function() {
	console.log('服务启动在' + port + '端口')
});
*/
app.listen(port, function() {
	console.log('服务启动在' + port + '端口')
});
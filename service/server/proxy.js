/*
 * @Author: lianpen
 * @Date:   2018-05-10 16:10:59
 */

let app

const args = require('../args')

const proxy = {
	/**
	 * 模块介入
	 */
	involve: _app => {
		app = _app
		const httpProxy = require('http-proxy')
		const proxyTarget = args.server || 'http://47.96.83.110:8080'
		const proxy = httpProxy.createProxyServer({
			target: proxyTarget,
			secure: false
		})
		proxy.on('error', function(err, request, response) {
			response.end('服务器未响应')
		})
		app.post('/web*', (req, res, next) => {
			proxy.web(req, res)
		})
	}
}

module.exports = proxy
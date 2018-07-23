/*
 * @Author: lianpen
 * @Date:   2018-05-10 16:11:45
 */

const path = require('path')
const express = require('express')
const args = require('../args')
const fs = require('fs')

/**
 * app
 */
let app

/**
 * 缓存的首页信息
 */
let indexCache

const file = {
	/**
	 * 模块介入
	 */
	involve: _app => {
		app = _app
		file.listen()
	},
	/**
	 * 监听文件
	 */
	listen: () => {
		file.listenIndex()
		const dist = path.join(__dirname, '../../dist')
		app.use(express.static(dist))
	},
	/**
	 * 监听首页请求
	 */
	listenIndex: () => {
		app.get('/', (req, res) => {
			const ip = file.get_client_ip(req)
			console.log(ip)
			res.send(indexCache)
		})
	},
	get_client_ip: req => {
		var ip = (
			req.headers['x-forwarded-for'] ||
			req.ip ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress || ''
		)
		if (ip.split(',').length > 0) {
			ip = ip.split(',')[0]
		}
		return ip
	},
	/**
	 * 缓存首页
	 */
	cacheIndex: () => {
		fs.readFile('../dist/index.html', (err, data) => {
			let dummy = data.toString()
			indexCache = dummy
		})
	}
}

file.cacheIndex()

module.exports = file
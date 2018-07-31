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
			const date = dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')
			console.log(date)
			const ip = file.get_client_ip(req)
			console.log(ip)
			res.send(indexCache)
		})
	},
	
	/**
	 * 获取请求ip
	 */
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

/**
 * 日期格式化
 */
function dateFormat(date, format) {
	var rules = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds()
	}
	if (/(y+)/i.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length))
	}
	for (var key in rules) {
		if (new RegExp("(" + key + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? rules[key] : ("00" + rules[key]).substr(("" + rules[key]).length))
		}
	}
	return format
}

file.cacheIndex()

module.exports = file
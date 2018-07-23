/*
 * @Author: lianpen
 * @Date:   2018-05-10 16:08:32
 */

const express = require('express')
const app = express()

/**
 * 启动gZip压缩
 */
const compression = require('compression')
app.use(compression())

/**
 * 静态文件服务
 */
const file = require('./server/file')
file.involve(app)

module.exports = app
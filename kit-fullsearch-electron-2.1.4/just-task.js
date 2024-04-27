const { task, logger } = require('just-task')
const fs = require('fs')
const download = require('download')
const path = require('path')

task('install', () => {
  return new Promise((resolve, reject) => {
    const curPkgMeta = require(path.join(__dirname, 'package.json'))
    const localPath = path.join(__dirname, 'lib')
    const downloadUrl = `https://yx-web-nosdn.netease.im/package/1678942239005/electron-tokenizer-plugin_v2.3.2.zip?download=electron-tokenizer-plugin_v2.3.2.zip`
    download(downloadUrl, localPath, {
      extract: true
    }).then(() => {
      const platform = process.env.npm_config_target_platform || process.platform
      const arch = process.env.npm_config_target_arch || process.arch
      logger.info(`[install] Download prebuilt binaries from ${downloadUrl}`)
      logger.info(`[install] Target platform: ${platform}`)
      logger.info(`[install] Target arch: ${arch}`)
      resolve()
    }).catch(err => {
      logger.warn(`[install] Failed to download package from: ${downloadUrl}`)
      reject()
    })
  })
})

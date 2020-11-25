## post下载

```js
export const exportPostApi = (form, url) => {
  return axios({ // 用axios发送post请求
    method: 'post',
    url: config.baseURL + url, // 请求地址
    data: form, // 参数
    responseType: 'blob', // 表明返回服务器返回的数据类型
    headers: {
      'Content-Type': 'application/json'
    },
    timeout: 30 * 1000
  })
}

const batchExport = (params, url, fileName) => {
  exportPostApi(params, url).then(res => { // 处理返回的文件流
    const data = res.data
    const url = window.URL.createObjectURL(new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    if (!fileName) {
      let contentDisposition = res.headers['content-disposition']
      if (contentDisposition) {
        fileName = window.decodeURI(res.headers['content-disposition'].split('=')[1], 'UTF-8')
      }
    }
    if (!fileName) {
      fileName = '任务列表.zip'
    }
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  })
}
```

## get请求
```js
export const exportPostApi = (url) => {
  return axios({
    method: 'get',
    url: url, // 请求地址
    data: '', // 参数
    responseType: 'blob' // 表明返回服务器返回的数据类型
  })
}

const batchExport = (url, fileName = '音频导出.zip') => {
  return exportPostApi(url).then(response => { // 处理返回的文件流
    const blob = new Blob([response.data])
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
    return Promise.resolve()
  }, (error) => {
    return Promise.reject(new Error(error))
  })
}

```
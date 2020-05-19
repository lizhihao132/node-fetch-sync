# node-fetch-sync
  基于 [node-fetch](https://github.com/node-fetch/node-fetch) 和 [@trustable/async_to_sync](https://github.com/juniorfans/async_to_sync) 实现的同步请求库。

## 使用方法
```
npm install node-fetch-sync
```

```
  const net = require('node_fetch_sync');
  let url = 'https://github.com/juniorfans';
	let options = {
		timeout: 1000, 
		method: "GET", 
		proxyUrl: "http://127.0.0.1:12759",
		resultType: 'text',
	};
	
	let resObj = net.syncFetch(url, options); 
```

请参考 [test.js](https://github.com/juniorfans/node-fetch-sync/blob/master/tests.js)

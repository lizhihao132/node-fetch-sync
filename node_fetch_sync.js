const asyncLib = require('@trustable/async_to_sync');
const asyncFuncChangeToSync = asyncLib.hookAsyncToSync;


/*
1. url, 请求的 url.

2. options, 配置项:
{
	method: 
	headers: 
	body: 
	redirect: 
	timeout: 
	proxyUrl: http/https 代理的 url
	dataType: 'text' 或 'buffer'. 默认为 'text'
}

3. 	callback, 回调函数, 参数: 
	errMsg: 空|null|undefined 表示无错误
	res: 数据
*/
function asyncFetch(url, options, callback){
	const HttpsProxyAgent = require('https-proxy-agent');
	const fetch = require('node-fetch');
	
	if(options.proxyUrl)
	{
		const HttpsProxyAgent = require('https-proxy-agent');
		options.agent = new HttpsProxyAgent(options.proxyUrl);
	}
	options.resultType = options.resultType || 'text';
	let resObj = {};
	fetch(url, options).then(function(res){
		if(res.ok){
			resObj.statusCode = res.status;
			resObj.header = res.headers
			resObj.cookies = res.headers.raw()['set-cookie'];
			
			if('text' != options.resultType){
				return res.buffer();
			}
			else{
				return res.text();
			}
		}else{
			callback(res.status, null);
		}
	}).then(function(res){
		resObj.data = res;
		callback(0, resObj);
	})
	.catch(function (err){
		callback(String(err), null);
	})
}

/*
参数:
	1. url: 请求的网址.
	2. options: 参考 asyncFetch.
	
返回:
	1. errMsg: 错误信息. 空|null|undefined 表示无错误
	2. res: 请求返回的数据
		statusCode 	: 状态码
		header		: 返回包中的 header
		cookies		: cookie
		data		: 返回包中的 body, 也即数据
*/
function syncFetch(url, options){
	let errMsg = null;
	let res = null;
	let waitTimeout = options.timeout ? (options.timeout+1000) : null;	//留 1 秒时间给数据传输.
	asyncFuncChangeToSync(asyncFetch, waitTimeout)(url, options, function(_err, _res){
		errMsg = _err;
		res = _res;
	});
	return {errMsg: errMsg, res: res};
}

module.exports = {
	asyncFetch: asyncFetch,
	syncFetch: syncFetch,
};

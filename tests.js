const net = require('./node_fetch_sync.js');

function test_node_fetch_async(){
	console.info("before asyncFetch");
	asyncFetch('https://github.com/', {timeout: 1000, method: "GET"}, function(err, res){console.info('error code:', err, ', document.length:', res.length)});
	console.info("after asyncFetch");
}


function test_node_fetch_async_sync(){
	console.info("before sync-asyncFetch");
	
	let url = 'https://github.com/juniorfans';
	let options = {
		timeout: 1000, 
		method: "GET", 
		proxyUrl: "http://127.0.0.1:12759",
		resultType: 'text',
	};
	
	let resObj = net.syncFetch(url, options);
	if(!resObj.errMsg || 0==resObj.errMsg.length){
		console.info('fetch success.', resObj.res.data.length);
	}else{
		console.info('fetch failed. errMsg:', res.errMsg);
	}
	
	console.info("after sync-asyncFetch");
}

test_node_fetch_async_sync();
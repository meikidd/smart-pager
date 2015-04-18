var ejs = require('ejs');
var assert = require('assert');
var join = require('path').join;
var read = require('fs').readFile;

function render(current, total) {
	assert(current, 'current page number is required');
	assert(total, 'total page count is required');

	if(typeof current !== 'number') {
		current = current*1;
	}
	if(typeof total !== 'number') {
		total = total*1;
	}

	return new Promise(function(resolve, reject) {
		var path = join(__dirname, 'pagination.ejs');
		read(path, 'utf8', function(err, data) {
			if(err) return reject(err);
			var html = ejs.render(data, {
				current: current, 
				total: total, 
				urlRule: ''
			});
			resolve(html);
		});
	});
}

module.exports = render;



// 生成翻页组件的html
exports.pagination = function(num, total, urlRule, sm) {
	urlRule = urlRule || '?page=';
	return new Promise(function(resolve, reject) {
		var path = join(__dirname, 'templates/pagination.ejs');
		read(path, 'utf8', function(err, data) {
			if(err) return reject(err);
			var html = ejs.render(data, {
				current:num, 
				total:total, 
				urlRule:urlRule,
				sm:sm||false
			});
			resolve(html);
		});
	});
};
const ejs = require('ejs');
const assert = require('assert');
const join = require('path').join;
const read = require('fs').readFile;

var template;

function render(current, total, urlRule) {
	assert(current, 'current page number is required');
	assert(total, 'total page count is required');

	if(typeof current !== 'number') {
		current = current*1;
	}
	if(typeof total !== 'number') {
		total = total*1;
	}
	if(!current) return;
	total = total || current;
	var options = {
		current: current,
		total: total,
		urlRule: urlRule || '/?page='
	};

	return new Promise(function(resolve, reject) {
		var path = join(__dirname, 'pagination.ejs');
		if(template) {
				resolve(ejs.render(template, options));
		}else{
			read(path, 'utf8', function(err, data) {
				if(err) return reject(err);
				template = data;
				resolve(ejs.render(template, options));
			});
		}
	});
}

module.exports = render;
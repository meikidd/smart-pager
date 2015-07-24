'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ejs = require('ejs');
var assert = require('assert');
var join = require('path').join;
var read = require('fs').readFile;

var SmartPager = (function () {
	function SmartPager(_ref) {
		var _ref$current = _ref.current;
		var current = _ref$current === undefined ? 1 : _ref$current;
		var total = _ref.total;
		var _ref$urlRule = _ref.urlRule;
		var urlRule = _ref$urlRule === undefined ? '?page=' : _ref$urlRule;
		var templateFile = _ref.templateFile;

		_classCallCheck(this, SmartPager);

		this.total = total;
		this.current = current;
		this.urlRule = urlRule;
		this.templateHtml = '';
		this.templateFile = templateFile || join(__dirname, '../src/pagination.ejs');
	}

	_createClass(SmartPager, [{
		key: 'render',
		value: function render(current, total) {
			if (current === undefined) current = this.current;
			var urlRule = arguments[2] === undefined ? this.urlRule : arguments[2];

			total = total || this.total || this.current;
			var templateHtml = this.templateHtml;
			var templateFile = this.templateFile;
			var options = { current: current, total: total, urlRule: urlRule };

			return new Promise(function (resolve, reject) {
				if (templateHtml) {
					resolve(ejs.render(templateHtml, options));
				} else {
					read(templateFile, 'utf8', function (err, data) {
						if (err) return reject(err);
						templateHtml = data;
						resolve(ejs.render(templateHtml, options));
					});
				}
			});
		}
	}]);

	return SmartPager;
})();

module.exports = SmartPager;

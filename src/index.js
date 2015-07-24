const ejs = require('ejs');
const assert = require('assert');
const join = require('path').join;
const read = require('fs').readFile;

class SmartPager {

  constructor({current = 1, total, urlRule = '?page=', templateFile}) {
  	this.total = total
  	this.current = current
  	this.urlRule = urlRule
  	this.templateHtml = ''
  	this.templateFile = templateFile || join(__dirname, '../src/pagination.ejs')
  }

  render(current = this.current, total, urlRule = this.urlRule) {

		total = total || this.total || this.current
		let templateHtml = this.templateHtml
		let templateFile = this.templateFile
		let options = {current, total, urlRule}

		return new Promise(function(resolve, reject) {
			if(templateHtml) {
					resolve(ejs.render(templateHtml, options))
			}else{
				read(templateFile, 'utf8', function(err, data) {
					if(err) return reject(err)
					templateHtml = data
					resolve(ejs.render(templateHtml, options))
				})
			}
		})
  }
}

module.exports = SmartPager;
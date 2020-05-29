var assert = require('assert').strict;
var Benchmark = require('benchmark');
var IJ2TPL = require('./lib/ij2tpl.min');
var Mustache = require('./lib/mustache.min');

Mustache.tags = ['{', '}'];

var renderData = (function() {
	var datas = [];
	for (var i = 0; i < 10240; i++)
		datas.push({ name: String(i) });

	return datas;
})();

var template = `{?.}Hello {name}!{/.}{!.}Oops! Something went wrong!{/.}`,
	template2 = `{#.}Hello {name}!{/.}{^.}Oops! Something went wrong!{/.}`,
	template3 = `{?.}Hello {name}!{*.}Oops! Something went wrong!{/.}`;

var result = Mustache.render(template2, renderData);

/**************** Start Parse Testings ****************/

new Benchmark.Suite()
.add('IJ2TPL.parse(template)', function() {
  Mustache.clearCache();
  IJ2TPL.parse(template);
})
.add('Mustache.parse(template2)', function() {
  Mustache.clearCache();
  Mustache.parse(template2);
})
.add('IJ2TPL.parse(template3)', function() {
  Mustache.clearCache();
  IJ2TPL.parse(template3);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest parser is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': false });

/**************** End of Parse Testings ****************/


/**************** Start Render Testings ****************/

// Pre-Parse
var ij2tpl = IJ2TPL.parse(template),
	_ = Mustache.parse(template2),
	ij2tpl2 = IJ2TPL.parse(template3);

// Render tests(renderData)
new Benchmark.Suite()
.add('IJ2TPL.render(renderData)', function() {
  assert.deepStrictEqual(result, ij2tpl.render(renderData));
})
.add('Mustache.render(renderData)', function() {
  assert.deepStrictEqual(result, Mustache.render(template2, renderData));
})
.add('IJ2TPL2.render(renderData)', function() {
  assert.deepStrictEqual(result, ij2tpl2.render(renderData));
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest renderer is ' + this.filter('fastest').map('name'));
})
// run async
.run({ 'async': false });

/**************** End of Render Testings ****************/

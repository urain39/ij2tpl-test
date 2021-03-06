var Benchmark = require('benchmark');
var IJ2TPL = require('./lib/ij2tpl.min');
var Mustache = require('./lib/mustache.min');

Mustache.tags = ['{', '}'];

var renderData = (function() {
	var datas = [];
	for (var i = 0; i < 9999; i++)
		datas.push({ name: String(i) });

	return datas;
})();

var template = `{?.}Hello {name}!{/.}`,
	template2 = `{#.}Hello {name}!{/.}`;


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
	_ = Mustache.parse(template2);

// Render tests(renderData)
new Benchmark.Suite()
.add('IJ2TPL.render(renderData)', function() {
  Mustache.clearCache();
  ij2tpl.render(renderData);
})
.add('Mustache.render(renderData)', function() {
  Mustache.clearCache();
  Mustache.render(template2, renderData);
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

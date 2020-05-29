var IJ2TPL = require('./lib/ij2tpl.min');

var Timer = {
	_time: 0,
	start: function() {
		this._time = Date.now();
	},
	stop: function() {
		return Date.now() - this._time;
	}
};

var renderData = (function() {
	var datas = [];
	for (var i = 0; i < 1024; i++)
		datas.push({ name: String(i) });

	return datas;
})();

var template = `{?.}Hello {name}!{/.}{!.}Oops! Something went wrong!{/.}{?.}Hello {name}!{/.}{!.}Oops! Something went wrong!{/.}`,
	template2 = `{?.}Hello {name}!{*.}Oops! Something went wrong!{/.}{?.}Hello {name}!{*.}Oops! Something went wrong!{/.}`;

template = IJ2TPL.parse(template),
template2 = IJ2TPL.parse(template2);

var result = template.render(renderData);

var total = 0,
	times = Math.floor(100 * Math.random());

function throw_() { throw Error('Assertion Error!'); }

for (var i = 0; i < times; i++) {
	Timer.start();
	template.render(renderData) === result ?
		void 0
		:
		throw_()
	;
	total += Timer.stop();
}

console.log('template Render took ' + total / times + '(' + total + '/' + times + ')' + ' ms');

total = 0,
times = Math.floor(100 * Math.random());

for (var i = 0; i < times; i++) {
	Timer.start();
	template2.render(renderData) === result ?
		void 0
		:
		throw_()
	;
	total += Timer.stop();
}

console.log('template2 Render took ' + total / times + '(' + total + '/' + times + ')' + ' ms');

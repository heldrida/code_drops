function init() {

	var animationFrame = new window.AnimationFrame(),
		friction = 0.0125,
		velocity = 0;

	// http://cubic-bezier.com/#0,0,0,1
	// easing is a function which projects x in [0.0, 1.0] onto the bezier-curve defined by the 4 points (see schema below).
	var easing = BezierEasing(0.25, 0.25, 0, 0.95);

	$(function() {
		var element = '.radial-container',
			$knob = $(element).find('input'),
			i = 0,
			stepIncrementAmount = 0.175,
			max = 88;

		$knob.knob({
			format: function(v) {
				var o = (v / 10).toFixed(1) + '',
					parts = o.split('.'),
					template = '<span>$1<span class="small">.$2</span></span>';

				/*
				parts.forEach(function (v, k) {
					template = template.replace('$' + (k + 1), v);
				});
				*/

				return (v / 10).toFixed(1);
			}
		});

		(function loop() {

			velocity = easing(i / 100) * 100;

			if (velocity <= max) {
				$knob.val(velocity).trigger('change');
				i += stepIncrementAmount;
				animationFrame.request(loop);
			}

		})();

	});

}

init();
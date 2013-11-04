require(['$api/audio', '$api/models'], function(audio, models) {
	'use strict';


	var bands = audio.BAND31,
		analyzer = audio.RealtimeAnalyzer.forPlayer(models.player, bands),
		num_bands = bands.length,
		bars = [],
		slices = document.querySelectorAll('.slice');
	for (var i = 0; i < num_bands * 2; i++) {
		var bar = document.createElement('div');
		bar.className = 'bar';
		bar.style.width = 50/num_bands + '%';
		document.getElementById('visualizer').appendChild( bar );

		bars.push(bar);
	}


		function getHeight ( segment ) {
			return Math.max( Math.min( Math.floor( segment + 60 ), 72 ), 0 ) / 72 * 100;
		}

		function getScale ( segment ) {
			return 1 + Math.max( Math.min( Math.floor( segment + 60 ), 72 ), 0 ) / 100;
		}

		analyzer.addEventListener('audio', function(evt) {
			var wave = evt.audio.spectrum;
			// There will be 256 samples, but we want to only display every [step]
			// samples because we have fewer than 256 rows.
			for (var i = 0; i < num_bands; i++) {
				/*db = data[i];
    l = Math.max(Math.min(Math.floor(db + 60), 72), 0) / 72 * vz.range;
    h = l * vz.bh;*/
				bars[ i ].style.height = getHeight( wave.left[ i ] ) + '%';
				bars[ num_bands * 2 - i - 1 ].style.height = getHeight( wave.right[ i ] ) + '%';
				if ( i === 4 ) slices[0].style.webkitTransform = 'rotate(13deg) skewY(-27deg) scale(' + getScale( wave.left[ i ] ) + ')';
				if ( i === 10 ) slices[1].style.webkitTransform = 'rotate(50deg) skewY(-27deg) scale(' + getScale( wave.left[ i ] ) + ')';
		}
	});
});
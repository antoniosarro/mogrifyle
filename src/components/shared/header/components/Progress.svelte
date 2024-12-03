<script lang="ts">
	import { navigating } from '$app/stores';
	import { browser } from '$app/environment';

	// Status
	let completed = $state(false);
	let updater: ReturnType<typeof setInterval>;

	// Width
	let minimum = 0.08;
	let maximum = 0.994;
	let stepSizes = [0, 0.005, 0.01, 0.02];
	let intervalTime = 700;
	let width = $state(minimum);

	let barStyle = $derived((width && width * 100 && `width: ${width * 100}%;`) || '');

	// Functions
	function start() {
		reset();
		animate();
	}

	function stop() {
		if (updater) {
			clearInterval(updater);
		}
	}

	function complete() {
		clearInterval(updater);
		width = 1;
		setTimeout(() => {
			completed = true;
			setTimeout(() => {
				completed = false;
				width = 0;
			}, intervalTime);
		}, intervalTime);
	}

	function reset() {
		width = minimum;
	}

	function getIncrement(value: number) {
		if (value >= 0 && value < 0.2) return 0.1;
		else if (value >= 0.2 && value < 0.5) return 0.04;
		else if (value >= 0.5 && value < 0.8) return 0.02;
		else if (value >= 0.8 && value < 0.99) return 0.005;
		return 0;
	}

	function animate() {
		if (updater) {
			clearInterval(updater);
		}
		updater = setInterval(() => {
			const randomStep = stepSizes[Math.floor(Math.random() * stepSizes.length)];
			const step = getIncrement(width) + randomStep;
			if (width < maximum) {
				width = width + step;
			}
			if (width > maximum) {
				width = maximum;
				stop();
			}
		}, intervalTime);
	}

	$effect(() => {
		if (browser) {
			if ($navigating) {
				start();
			} else {
				complete();
			}
		}
	});
</script>

<div class="progress-bar" class:progress-bar-hiding={completed} style={barStyle}></div>

<style lang="postcss">
	.progress-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 0.3rem;
		background-color: theme(colors.accent.500);
		transition: width 0.21s ease-in-out;
		z-index: 10;
	}

	.progress-bar-hiding {
		transition: top 0.8s ease;
		top: -8px;
	}
</style>

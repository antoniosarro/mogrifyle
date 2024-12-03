export function preventDefault<T extends Event>(fn: (event: T) => void) {
	return function (this: void, event: T) {
		event.preventDefault();
		fn.call(this, event);
	};
}

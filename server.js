import compression from '@polka/compression';
import { handler } from './build/handler.js';
import polka from 'polka';

polka()
	.use(handler)
	.use(compression())
	.listen(3000, (err) => {
		if (err) throw err;
		console.log(` > Running on <host>:3000`);
	});

import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Coin Market Cap Demo'
	}
});

export default app;
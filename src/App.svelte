<script>
	export let name;
	import { onMount } from 'svelte';
	import CryptoTab from './CryptoTab.svelte';
	import CategoryTab from './CategoryTab.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import { Tabs, Tab, TabContent, AppBar, MaterialApp } from 'svelte-materialify';

	const options = {
		duration: 2000
	}

	let activeCoinListDialog = false;

	onMount(() => {
	});


</script>

<main>

	<MaterialApp theme={'light'}>
		<AppBar>
			<div slot="title">Coin Market Cap API Demo</div>
		</AppBar>
		<Tabs centerActive>
			<div slot="tabs">
				<Tab>Cryptocurrency</Tab>
				<Tab>Category</Tab>
			</div>
			  <TabContent>
				<CryptoTab/>
			</TabContent>
			<TabContent>
				  <CategoryTab/>
			  </TabContent>
		  </Tabs>
	</MaterialApp>
		
	<SvelteToast {options} />
</main>

<style global>
	:global(body) {
		background-color: #202020;
		color: #bfc2c7;
		padding: 10px 20px;
	}
	div{
		margin-top: 20px;
	}
	.center_align{
		text-align: center;
	}
	.left_align{
		text-align: left;
	}
	.right_align { 
		text-align: right;
	}
</style>
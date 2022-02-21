<script>
	import { onMount } from 'svelte';
	import CryptoTab from './CryptoTab.svelte';
	import CategoryTab from './CategoryTab.svelte';
	import { Tabs,
			TabContent,
			Tab
	} from 'svelte-materialify';
</script>

<main>

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
</main>

<style global>
	:global(body) {
		padding: 0px;
	}
</style>
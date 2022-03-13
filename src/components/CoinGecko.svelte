<script>
	import { onMount } from 'svelte';
	import CoinGeckoChartTab from './CoinGeckoChartTab.svelte';
	import CoinGeckoMarketTab from "./CoinGeckoMarketTab.svelte";
	import CoinGeckoTickerTab from "./CoinGeckoTickerTab.svelte";

	import { Tabs,
			TabContent,
			Tab
	} from 'svelte-materialify';
</script>

<main>

	<Tabs centerActive>
		<div slot="tabs">
			<Tab>Market</Tab>
			<Tab>BTC Chart</Tab>
			<Tab>Ticker</Tab>
		</div>
		<TabContent>
			<CoinGeckoMarketTab/>
		</TabContent>
		<TabContent>
			<CoinGeckoChartTab/>
		</TabContent>
		<TabContent>
			<CoinGeckoTickerTab/>
		</TabContent>
	</Tabs>
</main>

<style global>
	:global(body) {
		padding: 0px;
	}
</style>
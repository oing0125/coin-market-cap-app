<script>
	export let name;
	import { onMount } from 'svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import {Router, Link, Route} from "svelte-navigator";
	import { List,
			Divider,
			NavigationDrawer,
			ListItemGroup,
			ListItem,
			Dialog,
			MaterialApp } from 'svelte-materialify';
	import CoinMarketCap from './components/CoinMarketCap.svelte';
	import CoinGecko from "./components/CoinGecko.svelte";
	const options = {
		duration: 2000
	}

	let activeCoinListDialog = false;

	onMount(() => {
	});

</script>

<main>

	<MaterialApp theme={'light'}>
		<Router>
			
		<div>
			<NavigationDrawer absolute class="teal theme--dark">
				<h4 class="text-h5 mb-2 mt-2 font-weight-bold text-center">API DEMO</h4>
				<Divider />
				<List nav dense>
				<ListItemGroup>
					<Link to="/" style="text-decoration:none;">
						<ListItem link>
							<span class="font-weight-medium white-text">
								Coin Market Cap
							</span>
						</ListItem>
					</Link>
					<Link to="/coin-gecko" style="text-decoration:none;">
						<ListItem link>
							<span class="font-weight-medium white-text">
								CoinGecko
							</span>
						</ListItem>
					</Link>
				</ListItemGroup>
				</List>
			</NavigationDrawer>
			<div style="margin-left: 256px; padding:15px 15px;">
				<Route path="/">
					<CoinMarketCap/>
				</Route>
				<Route path="coin-gecko">
					<CoinGecko/>
				</Route>
			</div>
		</div>

		</Router>
		  <Dialog class="pa-4 text-center" bind:active={activeCoinListDialog}>
			<p>This is Dialog 1</p>
		  </Dialog>

	</MaterialApp>
		
	<SvelteToast {options} />
</main>

<style global>
	:global(body) {
		padding: 0px;
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
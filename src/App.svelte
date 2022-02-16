<script>
	export let name;
	import { onMount } from 'svelte';
	import HttpClient from './utils/HttpClient'
	import Grid from "gridjs-svelte";
	import Table from './tables.svelte';
	import { get, writable } from 'svelte/store';
	import { toast } from '@zerodevx/svelte-toast';
	import { SvelteToast } from '@zerodevx/svelte-toast';
	import {Router, Link, Route} from "svelte-navigator";
	import JSONTree from 'svelte-json-tree';
	import { Tabs, 
			List,
			Divider,
			NavigationDrawer,
			ListItemGroup,
			ListItem,
			Icon,	
			Tab, TabContent, Dialog, AppBar, Button, Container, Row, Col, MaterialApp } from 'svelte-materialify';

	const options = {
		duration: 2000
	}

	let activeCoinListDialog = false;

	/* crypto grid variables */
	let gridCryptoData = writable([]);
	
	let oriCryptoData = [];
	gridCryptoData.subscribe(item => {
		oriCryptoData = item;
	});
	
	/* crypto categories grid variables */
	let gridCryptoCategoriesData = writable([]);

	let oriCryptoCategoriesData = [];
	gridCryptoCategoriesData.subscribe(item => {
		oriCryptoCategoriesData = item;
	});

	let dataSize = 10;
	let currentPageCrypto = 1;
	let currentPageCryptoCategories = 1;

	onMount(() => {
		getCryptoLatest();
		getCryptoCategories();
	});

	/* functions */
	function getCryptoLatest(){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/latest", {'size': dataSize, 'currentPage': currentPageCrypto}, callbackGetCrypto.bind(this));	
	}

	function getCryptoCategories(){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/categories", {'size': dataSize, 'currentPage': currentPageCryptoCategories}, callbackGetCryptoCategories.bind(this));	
	}

	function getCryptoCategory(id){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/category/"+id, {}, callbackGetCryptoCategoryById.bind(this));	
	}

	function openCoinListPopup(data){
		getCryptoCategory(data.id);
		activeCoinListDialog = true;
		window.console.log(data)
	}
	
	/* callback */
	function callbackGetCrypto(data){
		let list = get(gridCryptoData);
		data.data.forEach(element => list.push(element));
		gridCryptoData.set(list);
	}

	function callbackGetCryptoCategories(data){
		let list = get(gridCryptoCategoriesData);
		data.data.data.forEach(element => list.push(element));
		gridCryptoCategoriesData.set(list);
	}

	function callbackGetCryptoCategoryById(data){
		console.log(data);
	}

	/* event handler */
	function loadMoreCrtptoEventHandler(){
		currentPageCrypto = currentPageCrypto + 1;
		getCryptoLatest();
	}

	function loadMoreCrtptoCategoriesEventHandler(){
		currentPageCryptoCategories = currentPageCryptoCategories + 1;
		getCryptoCategories();
	}

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
					<ListItem link>
						<Link to="/">
							<span class="font-weight-medium">
								Coin Market Cap
							</span>
						</Link>
					</ListItem>
					<ListItem link>
						<span class="font-weight-medium">
							CoinGecko
						</span>
					</ListItem>
				</ListItemGroup>
				</List>
			</NavigationDrawer>
			<div style="margin-left: 256px;">
				<Route path="/">
				</Route>
				<Route path="coingecko"
				<Tabs centerActive>
					<div slot="tabs">
						<Tab>Cryptocurrency</Tab>
						<Tab>Category</Tab>
					</div>
					<TabContent>
						<Container>
							<Row>
								<Col cols={4}>
									<JSONTree value={oriCryptoData} />
									<div class="left_align">
									</div>
								</Col>
								<Col cols={8}>
									<Table tableData={$gridCryptoData}/>
									<div class="center_align">
										<Button on:click={loadMoreCrtptoEventHandler}> {"load more"} </Button>
									</div>
								</Col>
							</Row>
						</Container>
					</TabContent>
					<TabContent>
						<Container>
							<Row>
								<Col cols={4}>
									<JSONTree value={oriCryptoCategoriesData} />
									<div class="left_align">
									</div>
								</Col>
								<Col cols={8}>
									<Table tableData={$gridCryptoCategoriesData} clickable={true} clickEvent={openCoinListPopup}/>
									<div class="center_align">
										<Button on:click={loadMoreCrtptoCategoriesEventHandler}> {"load more"} </Button>
									</div>
								</Col>
							</Row>
						</Container>
					</TabContent>
				</Tabs>
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
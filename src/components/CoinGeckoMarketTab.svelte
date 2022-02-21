<script>
	import { onMount } from 'svelte';
	import Chart from "chart.js/dist/chart";
	import HttpClient from '../utils/HttpClient';
	import { writable, get } from 'svelte/store';
	import { DataTable,
			DataTableHead,
			DataTableCell,
			DataTableBody,
			Button,
			Dialog,
			DataTableRow} from 'svelte-materialify';
	import CoinGeckoCoinDetailDialog from "./CoinGeckoCoinDetailDialog.svelte";

	let dataList = [];
	let gridList = [];
	let size = 10;
	let currentPage = 1;
	let activeCoinDetailDialog = false;
	let selectedGeckoId;

	onMount(() => {
		getMarketList();
	});

	/* functions 	*/
	function getMarketList(){
		let httpClient = new HttpClient();
		httpClient.doGet("/gecko/coins", {}, callbackGet.bind(this));	
	}

	function clickCoinId(data){
		selectedGeckoId = data.id;
		activeCoinDetailDialog = true;
	}

	function showMoreData(){
		let currentGridList = gridList;
		dataList.slice((currentPage-1) * size, currentPage * size).forEach(item => currentGridList.push(item));
		currentPage = currentPage + 1;
		gridList = currentGridList;
	}

	/* callback */
	function callbackGet(data){
		dataList = data.result;
		gridList = [];
		currentPage = 1;
		showMoreData();
	}

	function loadMoreEventHandler(){
		showMoreData();
	}

	function formatNumber(num) {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}
</script>

<main>
	<DataTable>
		<DataTableHead>
		  <DataTableRow>
			<DataTableCell>logo</DataTableCell>
			<DataTableCell>ID</DataTableCell>
			<DataTableCell>Name</DataTableCell>
			<DataTableCell>Name(한국어)</DataTableCell>
			<DataTableCell>Symbol</DataTableCell>
			<DataTableCell>Price(USD)</DataTableCell>
			<DataTableCell>Price(BTC)</DataTableCell>
			<DataTableCell>Total Volume(USD)</DataTableCell>
			<DataTableCell>Change(24H)</DataTableCell>
		  </DataTableRow>
		</DataTableHead>
		<DataTableBody>
			{#each gridList as data}
				<DataTableRow>
					<DataTableCell><img src="{data.image.thumb}" alt="logo"/></DataTableCell>
					<DataTableCell><span class="clickable" on:click={clickCoinId(data)}>{data.id}</span></DataTableCell>
					<DataTableCell>{data.name}</DataTableCell>
					<DataTableCell>{data.localization.ko}</DataTableCell>
					<DataTableCell>{data.symbol}</DataTableCell>
					<DataTableCell numeric>{formatNumber(data.market_data.current_price.usd)}</DataTableCell>
					<DataTableCell numeric>{data.market_data.current_price.btc}</DataTableCell>
					<DataTableCell numeric>{formatNumber(data.market_data.total_volume.usd)}</DataTableCell>
					<DataTableCell numeric>{data.market_data.price_change_percentage_24h.toFixed(2)}%</DataTableCell>
				</DataTableRow>
			  {/each}
		</DataTableBody>
	  </DataTable>
	  <div class="center_align">
		<Button on:click={loadMoreEventHandler}> load more </Button>
	</div>
	<Dialog class="pa-4" width={1200} bind:active={activeCoinDetailDialog}>
		<CoinGeckoCoinDetailDialog geckoId={selectedGeckoId}/>
	</Dialog>
</main>

<style>
	div{
		margin: 20px 0px;
	}
	.clickable{
		text-decoration: underline;
		cursor: pointer;
	}
	.clickable:hover{
		font-weight: bold;
	}
</style>
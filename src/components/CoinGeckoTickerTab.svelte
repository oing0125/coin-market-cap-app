<script>
	import { onMount } from 'svelte';
	import HttpClient from '../utils/HttpClient';
	import {Button,
			DataTable,
			DataTableHead,
			DataTableCell,
			DataTableBody,
			DataTableRow
	} from 'svelte-materialify';


	let dataList = [];
	let gridList = [];
	let size = 100;
	let currentPage = 1;
	
	onMount(() => {
		callTickerList();
	});

	/* functions 	*/
	function syncTicker(){
		let httpClient = new HttpClient();
		httpClient.doGet("/gecko/ticker/sync", {}, callbackGet.bind(this));	
	}

	function callTickerList(){
		let httpClient = new HttpClient();
		httpClient.doGet("/gecko/ticker", {}, callbackList.bind(this));	
	}

	function showMoreData(){
		let currentGridList = gridList;
		dataList.slice((currentPage-1) * size, currentPage * size).forEach(item => currentGridList.push(item));
		currentPage = currentPage + 1;
		gridList = currentGridList;
	}

	/* callback */
	function callbackGet(data){
		window.console.log(data);
	}

	function callbackList(data){
		dataList = data;
		dataList.sort(function(a, b){
			return (b.last_traded_at > a.last_traded_at) ? 1 : -1;
		})
		gridList = [];
		currentPage = 1;
		showMoreData();
	}

	function loadMoreEventHandler(){
		showMoreData();
	}

</script>

<main>
	<div>
	<Button on:click={syncTicker}> Sync </Button>
	</div>
	<DataTable>
		<DataTableHead>
		  <DataTableRow>
			<DataTableCell>ID</DataTableCell>
			<DataTableCell>Market</DataTableCell>
			<DataTableCell>Pair</DataTableCell>
			<DataTableCell>Last(USD)</DataTableCell>
			<DataTableCell>Volume</DataTableCell>
			<DataTableCell>Spread(%)</DataTableCell>
			<DataTableCell>Last Traded At</DataTableCell>
		  </DataTableRow>
		</DataTableHead>
		<DataTableBody>
			{#each gridList as data}
				<DataTableRow>
					<DataTableCell>{data.id}</DataTableCell>
					<DataTableCell>{data.market}</DataTableCell>
					<DataTableCell>{data.base} / {data.target}</DataTableCell>
					<DataTableCell numeric>{data.last_usd}</DataTableCell>
					<DataTableCell numeric>{data.volume}</DataTableCell>
					<DataTableCell numeric>{data.spread_per}</DataTableCell>
					<DataTableCell>{data.last_traded_at}</DataTableCell>
				</DataTableRow>
			  {/each}
		</DataTableBody>
	  </DataTable>
	  <div class="center_align">
		<Button on:click={loadMoreEventHandler}> load more </Button>
	</div>
</main>

<style>
	div{
		margin: 20px 0px;
	}

</style>
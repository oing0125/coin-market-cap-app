<script>
	import { onMount } from 'svelte';
	import HttpClient from './utils/HttpClient';
	import {
		Container,
		Row,
		Col,
		Dialog,
		Button,
		DataTable,
		DataTableHead,
		DataTableRow,
		DataTableCell,
		Card,
		CardTitle,
		Divider,
		CardSubtitle,
		DataTableBody} from 'svelte-materialify';
	export let categoryId;

	onMount(() => {
		getCryptoCategoryInfo();
	});

	let categoryInfo = {};
	let coins = [];

	function getCryptoCategoryInfo(){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/category/"+categoryId, {}, callbackGet.bind(this));	
	}

	function callbackGet(data){
		categoryInfo = data.data[categoryId];
		coins = categoryInfo.coins;
		window.console.log(categoryInfo);
	}
</script>

<Container style="text-align:center;">
	<h2>Category 정보</h2>
	<div class="info_area">
		<div>Title: {categoryInfo.title}</div>
		<div>Description: {categoryInfo.description}</div>
		<div>ID: {categoryInfo.id}</div>
		<div>Market Cap: {categoryInfo.market_cap}</div>
		<div>volume: {categoryInfo.volume}</div>
	</div>
	<DataTable>
		<DataTableHead>
		  <DataTableRow>
			<DataTableCell>ID</DataTableCell>
			<DataTableCell>Name</DataTableCell>
			<DataTableCell>Symbol</DataTableCell>
			<DataTableCell>Slug</DataTableCell>
			<DataTableCell>Price($)</DataTableCell>
			<DataTableCell>Price(BTC)</DataTableCell>
		  </DataTableRow>
		</DataTableHead>
		<DataTableBody>
			{#each coins as coin}
				<DataTableRow>
					<DataTableCell>{coin.id}</DataTableCell>
					<DataTableCell>{coin.name}</DataTableCell>
					<DataTableCell>{coin.symbol}</DataTableCell>
					<DataTableCell>{coin.slug}</DataTableCell>
					<DataTableCell>{coin.quote.USD.price}</DataTableCell>
					<DataTableCell>{coin.quote.BTC.price}</DataTableCell>
				</DataTableRow>
			  {/each}
		</DataTableBody>
	  </DataTable>
</Container>


<style>

	h2, .info_area{
		margin: 15px 0px;
	}

	

	.clickble{
		cursor: pointer;
		text-decoration: underline;
	}
	.clickble:hover{
		font-weight: bold;
	}

</style>
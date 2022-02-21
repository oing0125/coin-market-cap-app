<script>
	import { onMount } from 'svelte';
	import HttpClient from '../utils/HttpClient';
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
		DataTableBody} from 'svelte-materialify';
	import { writable, get } from 'svelte/store';
	import JSONTree from 'svelte-json-tree';
	import CategoryDetailDialog from './CategoryDetailDialog.svelte';

	let activeCoinListDialog = false;

	let dataList = writable([]);
	let oriCryptoData;
	let size = 20;
	let currentPage = 1;
	let selectedCategoryId;

	onMount(() => {
		getCryptoCategories();
	});

	/* functions 	*/
	function getCryptoCategories(){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/categories", {'size': size, 'currentPage': currentPage}, callbackGet.bind(this));	
	}

	/* callback */
	function callbackGet(data){
		let list = get(dataList);
		data.data.data.forEach(element => list.push(element));
		oriCryptoData = list;
		dataList.set(list);
	}

	function loadMoreCrtptoEventHandler(){
		currentPage = currentPage + 1;
		getCryptoCategories();
	}
	
	function clickCategoryId(data){
		selectedCategoryId = data.id;
		activeCoinListDialog = true;
	}

</script>

<Container>
	<Row>
		<Col cols={4}>
			<JSONTree value={oriCryptoData} />
			<div class="left_align">
			</div>
		</Col>
		<Col cols={8} style="overflow: scroll">
			<DataTable>
				<DataTableHead>
				  <DataTableRow>
					<DataTableCell>ID</DataTableCell>
					<DataTableCell>Name</DataTableCell>
					<DataTableCell>Title</DataTableCell>
					<DataTableCell>Desc</DataTableCell>
					<DataTableCell>Number of Tokens</DataTableCell>
					<DataTableCell>Market Cap</DataTableCell>
				  </DataTableRow>
				</DataTableHead>
				<DataTableBody>
					{#each $dataList as data}
						<DataTableRow>
							<DataTableCell><span class="clickble" on:click={clickCategoryId(data)}>{data.id}</span></DataTableCell>
							<DataTableCell>{data.name}</DataTableCell>
							<DataTableCell>{data.title}</DataTableCell>
							<DataTableCell>{data.description}</DataTableCell>
							<DataTableCell>{data.num_tokens}</DataTableCell>
							<DataTableCell>{data.market_cap}</DataTableCell>
						</DataTableRow>
					  {/each}
				</DataTableBody>
			  </DataTable>
			<div class="center_align">
				<Button on:click={loadMoreCrtptoEventHandler}> {"load more"} </Button>
			</div>
		</Col>
	</Row>
	<Dialog class="pa-4" width={1200} bind:active={activeCoinListDialog}>
		<CategoryDetailDialog categoryId={selectedCategoryId}/>
	  </Dialog>
</Container>


<style>

	.clickble{
		cursor: pointer;
		text-decoration: underline;
	}
	.clickble:hover{
		font-weight: bold;
	}

</style>
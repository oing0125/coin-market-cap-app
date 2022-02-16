<script>
	import { onMount } from 'svelte';
	import HttpClient from './utils/HttpClient';
	import {
		Container,
		Row,
		Col,
		Button,
		DataTable,
		DataTableHead,
		Dialog,
		DataTableRow,
		DataTableCell,
		DataTableBody} from 'svelte-materialify';
	import { writable, get } from 'svelte/store';
	import JSONTree from 'svelte-json-tree';
	import CryptoDetailDialog from './CryptoDetailDialog.svelte';

	let dataList = writable([]);
	let oriCryptoData;
	let size = 20;
	let currentPage = 1;
	let activeCryptoDetailDialog = false;
	let selectedCryptoId;

	onMount(() => {
		getCryptoLatest();
	});

	/* functions 	*/
	function getCryptoLatest(){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/latest", {'size': size, 'currentPage': currentPage}, callbackGet.bind(this));	
	}

	/* callback */
	function callbackGet(data){
		let list = get(dataList);
		data.data.forEach(element => list.push(element));
		oriCryptoData = list;
		dataList.set(list);
	}

	function loadMoreCrtptoEventHandler(){
		currentPage = currentPage + 1;
		getCryptoLatest();
	}

	function clickRow(selectedId){
		selectedCryptoId = selectedId;
		activeCryptoDetailDialog = true;
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
					<DataTableCell>Symbol</DataTableCell>
					<DataTableCell>Slug</DataTableCell>
					<DataTableCell>Tags</DataTableCell>
				  </DataTableRow>
				</DataTableHead>
				<DataTableBody>
					{#each $dataList as data}
						<DataTableRow>
							<DataTableCell><span class="clickble" on:click={clickRow(data.id)}>{data.id}</span></DataTableCell>
							<DataTableCell>{data.name}</DataTableCell>
							<DataTableCell>{data.symbol}</DataTableCell>
							<DataTableCell>{data.slug}</DataTableCell>
							<DataTableCell>{data.tags}</DataTableCell>
						</DataTableRow>
					  {/each}
				</DataTableBody>
			  </DataTable>
			<div class="center_align">
				<Button on:click={loadMoreCrtptoEventHandler}> {"load more"} </Button>
			</div>
		</Col>
	</Row>
	<Dialog class="pa-4" width={1200} bind:active={activeCryptoDetailDialog}>
		<CryptoDetailDialog cryptoId={selectedCryptoId}/>
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
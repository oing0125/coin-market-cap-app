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
	export let cryptoId;

	onMount(() => {
		// getCryptoCoinInfo();
	});

	function getCryptoCoinInfo(){
		let httpClient = new HttpClient();
		httpClient.doGet("/crypto/info/"+cryptoId, {}, callbackGet.bind(this));	
	}

	function callbackGet(data){
		window.console.log(data);
	}
</script>

<main>
	<h2>Cryptocurrency 정보</h2>
	<div class="info_area">
		<div>ID: {cryptoId}</div>
	</div>
</main>

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
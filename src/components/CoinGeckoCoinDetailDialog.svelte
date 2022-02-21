<script>
	import { onMount } from 'svelte';
	import HttpClient from '../utils/HttpClient';
	import { Container,
			Row,
			Col,
			Divider,
			Textarea,
			DataTableRow} from 'svelte-materialify';

	export let geckoId;

	let coinInfo = {};

	onMount(() => {
		getCoinDetail();
	});

	/* functions 	*/
	function getCoinDetail(){
		let httpClient = new HttpClient();
		httpClient.doGet("/gecko/coins/" + geckoId, {}, callbackGet.bind(this));	
	}

	/* callback */
	function callbackGet(data){
		coinInfo = data;
	}

</script>

<main>
	{#if coinInfo.id}
		<div>
			<h3><img src="{coinInfo.image.small}" alt="logo"/>{coinInfo.name}({coinInfo.symbol})</h3>
			<Divider/>
			<div>
				<Textarea readonly filled value={coinInfo.description.ko}></Textarea>
				
			</div>
		</div>
		<Container>
			<Row>
				<Col cols=3 class="pa-2">
					<div>
						Categories
						<br/>
						- {coinInfo.categories}
					</div>
				</Col>
				<Col cols=3 class="pa-2">
					Homepage
					<br/>
					- {coinInfo.links.homepage}
				</Col>
				<Col cols=3 class="pa-2">
					Blockchain site
					<br/>
					- {coinInfo.links.blockchain_site}
				</Col>
				<Col cols=3 class="pa-2">
					<div>
						Forum
						<br/>
						- {coinInfo.links.official_forum_url}
					</div>
				</Col>
				<Col cols=3 class="pa-2">
					Genesis date
					<br/>
					- {coinInfo.genesis_date}
				</Col>
			</Row>
		</Container>
	{/if}
</main>

<style global>
</style>
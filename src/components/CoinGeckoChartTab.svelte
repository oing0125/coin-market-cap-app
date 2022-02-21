<script>
	import { onMount } from 'svelte';
	import Chart from "chart.js/dist/chart";
	import HttpClient from '../utils/HttpClient';
	import JSONTree from 'svelte-json-tree';
	import moment from "moment";
	import { ListItemGroup,
			Divider,
			ListItem} from 'svelte-materialify';
	let activeCoinListDialog = false;


	let chartDataList = [];
	let chartValues = [];
	let chartLabels = [];
	let chartCanvas;
	let ctx;
	let chart;

	let selectedDays = 2;
	let selectedInterval = 1;
	let daysList = [1, 14, 30, 'max'];
	let intervalList = ["hours", "daily"];

	onMount(() => {
		
		getTickers();
	});

	$: getTickers(selectedDays, selectedInterval);

	/* functions 	*/
	function getTickers(){
		let httpClient = new HttpClient();
		httpClient.doGet("/gecko/coins/bitcoin/market-chart", {interval: intervalList[selectedInterval], days: daysList[selectedDays], vsCurrency: "usd"}, callbackGet.bind(this));	
	}

	/* callback */
	function callbackGet(data){
		chartDataList = data.prices;
		ctx = chartCanvas.getContext('2d');
		chartValues = [];
		chartLabels = [];
		
		for(let chartData of chartDataList){
			let dateVal = new Date(chartData[0]);
			chartLabels.push(moment(dateVal).format('YYYY-MM-DD HH:mm:ss'));
			chartValues.push(chartData[1]);
		}
		if(chart){
			chart.destroy();
		}
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: chartLabels,
				datasets: [{
					label: 'BTC',
					backgroundColor: 'rgb(255, 99, 132)',
					borderColor: 'rgb(255, 99, 132)',
					data: chartValues
				}]
				
			},
			options:{
				responsive: true,
				plugins: {
					zoom: {
						// Container for pan options
						pan: {
							// Boolean to enable panning
							enabled: true,

							// Panning directions. Remove the appropriate direction to disable 
							// Eg. 'y' would only allow panning in the y direction
							mode: 'xy'
						},

						// Container for zoom options
						zoom: {
							// Boolean to enable zooming
							enabled: true,

							// Zooming directions. Remove the appropriate direction to disable 
							// Eg. 'y' would only allow zooming in the y direction
							mode: 'xy',
						}
					}
				}
			}
		});

	}

</script>

<main>
	<JSONTree value={chartDataList} />
	<div class="elevation-2" style="width:300px">
		- Interval
		<ListItemGroup mandatory bind:value={selectedInterval}>
			{#each intervalList as interval}
				<ListItem>{interval}</ListItem>
			{/each}
		</ListItemGroup>
		<br/>
		- days
		<ListItemGroup mandatory bind:value={selectedDays}>
		  <ListItem>1</ListItem>
		  <ListItem>14</ListItem>
		  <ListItem>30</ListItem>
		  <ListItem>max</ListItem>
		</ListItemGroup>
	  </div>
	<div class="chart-container" style="position: relative; width:60vw">
		<canvas bind:this={chartCanvas} id="myChart"></canvas>
	</div>
</main>

<style>
	div{
		margin: 20px 0px;
	}

</style>
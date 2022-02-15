<script>
	export let tableData = [
			{
				vitae : "dolorem",
				lectus : "ipsum",
				quisquam : "quia"
			},
			{
				vitae : "amet",
				lectus : "consectetur",
				quisquam : "adipisci"
			}
		];
	export let style;
    export let clickable = false;
    export let clickEvent;
</script>
<div class="table_area">
    <table class={style}>
        <thead>
            <tr>
                {#if tableData != null && tableData.length > 0}
                    {#each Object.keys(tableData[0]) as columnHeading}
                        <th>{columnHeading}</th>
                    {/each}
                {/if}
            <tr/>
        </thead>
        <tbody>
            {#each Object.values(tableData) as row}
                {#if clickable}
                    <tr on:click={clickEvent(row)} class="clickable">
                        {#each Object.values(row) as cell}
                        <td>{cell}</td>
                        {/each}
                    </tr>
                {:else}
                    <tr>
                        {#each Object.values(row) as cell}
                            <td>{cell}</td>
                        {/each}
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>
<style>
    .table_area{
        position: relative;
        overflow: scroll;
    }
	table, th, td {
		border: 1px solid;
		border-collapse: collapse;
		margin-bottom: 10px;
	}
    .clickable{
        cursor: pointer;
    }
    .clickable:hover{
        background-color: rgb(255, 253, 127);
        font-weight: bold;
    }
	
</style>

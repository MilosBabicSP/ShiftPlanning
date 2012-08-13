<div class="main files" id="da_fi">
    <div class="title">
        <h3><?=_s('Uploaded files')?></h3>
    </div>
    <ul class="timeSheet" id="da_fi_list">

    </ul>
	<form id="da_fi_form" class="hidden" method="post" action="api.php" target="_blank">
		<input value="" name="fid">
		<input name="module" value="admin.getfile">
		<input name="method" value="GET">
	</form>
</div>
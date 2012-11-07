<div class="main trade" id="">

	<div class="subLevel tradepick" style="position:relative;">
				<ul class="subMenu">
					<li class="single">
						<a href="#" id="swap" class="icoReqWor swap">
							<span><?=_s('Shift Trade')?></span>
						</a>
					</li>
					<li class="single">
						<a href="#" id="release"class="icoReqWor release">
							<span><?=_s('Shift Release')?></span>
						</a>
					</li>
				</ul>			
	</div>
	<div class="hidden" id="te_sc_shift_display_trade_swap">
		<div class="title1 wide" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">
		<h3>${schedule_name}</h3>
		</div>
		<div class="title wide">
		<div>
			<span>${start_date.weekday}, ${start_date.formatted}</span>
			${start_time.time} - ${end_time.time}
		</div>
		</div>
	<div class="subLevel" style="position:relative">
		<ul class="subMenu">
			<li class="first steps">
				<a id="step_back" href="#">
					<img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_pre.png">
				</a>
			</li>
			<span id="state">1</span>/3			
			<li class="last steps">
				<a id="step_next" href="#">
					<img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_nex.png">
				</a>
			</li>
		</ul>
	</div>
	<div class="title1 regular wide">
		<h3>Trade Shift : <span>${start_date.weekday}, ${start_date.formatted}</span></h3>
	</div>
	<div class="title wide">
	<p>1. You will be asked to enter your reason for requesting the Change, as well as to select possible shifts to trade with.</p>
	<p>2. Management will approve your request to change shift and employees will be notified</p>
	<p>3. If another employee accepts your shift, Management will confirm and the swap will be made.</p>
	<p><b>Note - </b>There is no guarantee that another employee will be able cover your shift or that management will approve your request. </p>
	</div>
	</div>

	<div class="hidden" id="te_sc_shift_display_trade_release">
		<div class="title1 wide" style="background-color: #${sp.schedule.getColorsBySchedule(schedule)[1]}; color: #${sp.schedule.getColorsBySchedule(schedule)[2]}">
		<h3>${schedule_name}</h3>
		</div>
		<div class="title wide">
		<div>
			<span>${start_date.weekday}, ${start_date.formatted}</span>
			${start_time.time} - ${end_time.time}
		</div>
		</div>
		<div class="subLevel" style="position:relative">
			<ul class="subMenu">
				<li class="first steps">
					<a id="step_back" href="#">
						<img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_pre.png">
					</a>
				</li>
				<span id="state">1</span>/3				
				<li class="last steps">
					<a id="step_next" href="#">
						<img width="16" height="16" src="<?php echo _fCdnPath_;?>images/sch_nex.png">
					</a>
				</li>
			</ul>
		</div>
	<div class="title1 regular wide">
		<h3>Release Shift : <span>${start_date.weekday}, ${start_date.formatted}</span></h3>
	</div>
	<div class="title wide">
	<p>1. You will be asked to enter your reason for requesting the Change, as well as to select possible employees to release your shift to.</p>
	<p>2. Management will approve your request to change shift and employees will be notified </p>
	<p>3. If another employee accepts your shift, Management will confirm and the trade will be made.</p>
	<p><b>Note - </b>There is no guarantee that another employee will be able cover your shift or that management will approve your request. </p>
	</div>
	</div>			

</div>
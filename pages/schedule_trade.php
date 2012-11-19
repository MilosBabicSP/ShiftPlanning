<div class="main trade" id="cs_sh_trade">

		<ul class="shifts">
		</ul>
		<div>
			<div class="cap trade">
				Trade or Release Shift
			</div>
			<ul class="step tradepick">
				<li>
					<div>
						<a id="swap" >Trade</a>
						<p>
							<?=_s('Will let you choose potential employees to pick-up this shift from you')?>
						</p>
					</div>
				</li>
				<li>
					<div>
						<a  id="release" >Release</a>
						<p>
							<?=_s('Will let you select shifts from other employees to trade this shift for')?>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="hidden" id="te_sc_shift_display_trade_swap">
			<div class="cap trade">
				Trade Shift
			</div>
			<div class="steps">
				<a class="fl" id="_back" swap="1" >Back</a>
				<a class="fr" id="_next" swap="1" >Continue</a>
				<span>Step<br/><span rel="self_state">1</span>/3</span>
			</div>
			<div class="greyed" step="step_1">
				<ol class="reg">
					<li>You will be asked to enter your reason for requesting the Change, as well as to select possible shifts to trade with.</li>
					<li>Management will approve your request to change shift and employees will be notified.</li>
					<li>If another employee accepts your shift, Management will confirm and the swap will be made.</li>
				</ol>
				<ul class="reg">
					<li><b>Note</b> - There is no guarantee that another employee will be able cover your shift or that management will approve your request.</li>
				</ul>
			</div>
			<div step="step_2">
				<div class="greyed">
					<div class="text">
						<h4>Reason for request</h4>
						<p>The more information you can provide the better odds your shift request will be successful.</p>
						<textarea cols="20" rows="4" name="reason_trade1">Add reason...</textarea>
						<p>The more information you can provide the better odds your shift request will be successful.</p>
					</div>
				</div>				
				<div class="greyed">
					<ul class="empList" id="empList1">
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
					</ul>
				</div>	
			</div>
			<div step="step_3">
				<div class="greyed">
					<div class="text">
						<h4>Shift trade Opened!</h4>
					</div>
					<div class="text">
						<h4>What you need to know</h4>
						<p>We have let the necessary people know that you need to have this shift cover. Please allow sufficient time for the parties involved to respond to your request.</p>
						<p><b>Note</b> - There is no guarantee that another employee will be able cover your shift or that management will approve your request. </p>
					</div>
					<div class="text">
						<h4>Notifications</h4>
						<p>You have currently selected to receive notifications via <b>SMS &amp; Email</b></p>
					</div>
				</div>				
			</div>
		</div>
		<div class="hidden" id="te_sc_shift_display_trade_release">
			<div class="cap trade">
				Release Shift
			</div>
			<div class="steps">
				<a class="fl" id="_back" swap="0" >Back</a>
				<a class="fr" id="_next" swap="0" >Continue</a>
				<span>Step<br/><span rel="self_state">1</span>/3</span>
			</div>
			<div class="greyed" step="step_1">
				<ol class="reg">
					<li>You will be asked to enter your reason for requesting the Change, as well as to select possible shifts to trade with.</li>
					<li>Management will approve your request to change shift and employees will be notified.</li>
					<li>If another employee accepts your shift, Management will confirm and the swap will be made.</li>
				</ol>
				<ul class="reg">
					<li><b>Note</b> - There is no guarantee that another employee will be able cover your shift or that management will approve your request.</li>
				</ul>
			</div>
			<div step="step_2">
				<div class="greyed">
					<div class="text">
						<h4>Reason for request</h4>
						<p>The more information you can provide the better odds your shift request will be successful.</p>
						<textarea cols="20" rows="4" name="reason_trade0">Add reason...</textarea>
						<p>The more information you can provide the better odds your shift request will be successful.</p>
					</div>
				</div>				
				<div class="greyed">
					<ul class="empList" id="empList0">
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
						<li><img style="display:block; height:30px; width:30px; background-color:#333"> <span>Marko Zivanovic</span></li>
					</ul>
				</div>	
			</div>
			<div step="step_3">
				<div class="greyed">
					<div class="text">
						<h4>Shift trade Opened!</h4>
					</div>
					<div class="text">
						<h4>What you need to know</h4>
						<p>We have let the necessary people know that you need to have this shift cover. Please allow sufficient time for the parties involved to respond to your request.</p>
						<p><b>Note</b> - There is no guarantee that another employee will be able cover your shift or that management will approve your request. </p>
					</div>
					<div class="text">
						<h4>Notifications</h4>
						<p>You have currently selected to receive notifications via <b>SMS &amp; Email</b></p>
					</div>
				</div>				
			</div>
		</div>
</div>
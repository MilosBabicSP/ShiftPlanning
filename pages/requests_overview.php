<div class="main overview" id="rq_ov">
    <ul class="requests">
        <li>
            <a class="fr" href="#" id="rq_rl_va" subpage="vacation"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span><?=_s('Vacation Requests');?></span>
            <?=_s('<info>0</info> Vacation Request(s) needing approval');?>
        </li>
        <li>
            <a class="fr" href="#" id="rq_rl_sp" subpage="shiftApprovals"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span><?=_s('Shift Approvals');?></span>
            <?=_s('<info>0</info> Shift(s) needing approval');?>
        </li>
        <li>
            <a class="fr" href="#" id="rq_rl_sr" subpage="openShifts"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span><?=_s('Shift Requests Waiting');?></span>
            <?=_s('There are <info>0</info> shift pickup request(s) waiting approval');?>
        </li>
        <li>
            <a class="fr" href="#" id="rq_rl_ast" subpage="shiftTrades"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span><?=_s('Approve Shift Trades');?></span>
            <?=_s('There is <info>0</info> open trade request(s) needing approval');?>
        </li>
        <li>
            <a class="fr" href="#" id="rq_rl_sv" subpage="openShifts"><img width="43" height="30" src="images/NextMenu.png"></a>
            <span><?=_s('Shift Available');?></span>
            <?=_s('There is <info>0</info>  Shifts(s) available for pickup');?>
        </li>
    </ul>
    <ul class="requests hidden" id="rq_ov_hd">
	<li>
	    <span><?=_s('No requests.');?></span>
	</li>
    </ul>
</div>
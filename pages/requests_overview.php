<div class="main overview" id="rq_ov">
    <div class="title">
        <h3><?= _s('Overview'); ?></h3>
    </div>
    <ul class="requests" id="rq_ov_loader"></ul>
    <ul class="widgets" id="rq_ov_widgets">
        <li class="shifts" id="rq_rl_va">
            <a href="#" subpage="vacation">
                <span class="icon">
                    <b></b>
                </span>
                <span class="details">
                    <p>
                        Vacation request(s)
                        <br />
                        needing <b>approval</b>
                    </p>
                </span>
            </a>
        </li>
        <li class="shifts" id="rq_rl_sp">
            <a href="#" subpage="shiftApprovals">
                <span class="icon">
                    <b></b>
                </span>
                <span class="details">
                    <p>
                        Shift(s)
                        <br />
                        needing <b>approval</b>
                    </p>
                </span>
            </a>
        </li>
        <li class="shifts" id="rq_rl_sr">
            <a href="#" subpage="openShifts">
                <span class="icon">
                    <b></b>
                </span>
                <span class="details">
                    <p>
                        Shift pickup request(s)
                        <br />
                        waiting <b>approval</b>
                    </p>
                </span>
            </a>
        </li>
        <li class="shifts" id="rq_rl_ast">
            <a href="#" subpage="shiftTrades">
                <span class="icon">
                    <b></b>
                </span>
                <span class="details">
                    <p>
                        Open trade request(s)
                        <br />
                        needing <b>approval</b>
                    </p>
                </span>
            </a>
        </li>
        <li class="shifts" id="rq_rl_sv">
            <a href="#" subpage="openShifts">
                <span class="icon">
                    <b></b>
                </span>
                <span class="details">
                    <p>
                        Shift(s)
                        <br />
                        available for <b>pickup</b>
                    </p>
                </span>
            </a>
        </li>
    </ul>
    <ul class="requests hidden" id="rq_ov_hd">
	<li>
	    <span><?=_s('No requests.');?></span>
	</li>
    </ul>
</div>
<div class="training">
    <a href="#" class="toggleMenu">
        <img width="24" height="24" src="<?php echo _fCdnPath_; ?>images/ShowHideMenu.png" />
    </a>
    <div class="subWrapp">
		<ul class="subNav training fl" page="training">
				<li class="first active">
					<a subpage="sections" href="#">
						<img width="16" height="16" src="<?php echo _fCdnPath_;?>images/book-open-bookmark.png">
					</a>
				</li>
				<li class="hidden">
					<a subpage="statistic" href="#">
						<img width="16" height="16" src="<?php echo _fCdnPath_;?>images/stats.png">
					</a>
				</li>
				</ul>
        <div class="trainingBar">
            <span id="user_progress">0</span>% <?=_s('Completed')?>
            <div class="barholder">
                <div class="progress" style="width:0%"></div>
            </div>
        </div>
    </div>
</div>
<div class="main inbox" id="da_in">
    <!-- Inbox -->
    <div class="title wide">
        <span class="fr"><a  id="da_in_nm_b" class="green"><?=_s('New Message')?></a></span>
        <h3><?=_s('Inbox')?></h3>
    </div>
    <div id="da_in_nm_f" class="hidden">
        <div class="newMsg wide" id="da_in_nm_f">
            <label><?=_s('Subject')?></label>
            <span class="input">
                <input type="text" name="" value="" id="da_in_nm_ti" />
            </span>
            <label><?=_s('To')?>:</label>
            <span class="input">
                <select id="da_in_nm_to"></select>
            </span>
            <label><?=_s('Message')?></label>
            <span class="input">
                <textarea id="da_in_nm_me"></textarea>
            </span>
        </div>
        <ul class="step">
            <li>
                <div>
                    <a href="#" id="da_wa_nm_ca" class="grey"><?=_s('Cancel')?></a>
                </div>
            </li>
            <li>
                <div>
                    <a  id="da_in_nm_sa" class="green"><span><?=_s('Send Message')?></span></a>
                </div>
            </li>
        </ul>
    </div>
    <ul class="inbox" id="da_in_me">

    </ul>
</div>
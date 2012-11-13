<div class="main inbox" id="da_in">
    <!-- Inbox -->
    <div class="title wide">
        <span class="fr"><a  id="da_in_nm_b"><?=_s('New Message')?></a></span>
        <h3><?=_s('Inbox')?></h3>
    </div>
    <div class="newMsg hidden wide" id="da_in_nm_f">
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
        <div class="title">
            <span class="fr"><a  id="da_in_nm_sa"><span><?=_s('Send Message')?></span></a></span>
            <span class="fl"><a  id="da_in_nm_ca"><?=_s('Cancel')?></a></span>
        </div>
    </div>
    <ul class="inbox" id="da_in_me">

    </ul>
</div>
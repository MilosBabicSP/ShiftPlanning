<div class="main wall" id="da_wa">
    <div class="head">
        <h2>Message Wall</h2>
        <span><a href="#">New Message</a></span>
    </div>
    <div class="welcome">
        <p><?=_s('Welcome Back,')?><br/>
            <span class="userName"></span><?=_s(' with ')?><company></company>
        </p>
    </div>
    <div class="title">
        <span class="fr"><a href="#" id="da_wa_nm_b"><?=_s('New Message')?></a></span>
        <h3><?=_s('Message Wall')?></h3>
    </div>
    <div class="newMsg hidden" id="da_wa_nm_f">
        <label><?=_s('Title')?></label>
        <span class="input">
            <input type="text" name="" value="" id="da_wa_nm_ti" />
        </span>
        <label><?=_s('Message')?></label>
        <span class="input">
            <textarea id="da_wa_nm_me"></textarea>
        </span>
        <div class="title">
            <span class="fr"><a href="#" id="da_wa_nm_sa"><span><?=_s('Save Message')?></span></a></span>
            <span class="fl"><a href="#" id="da_wa_nm_ca"><?=_s('Cancel')?></a></span>
        </div>
    </div>
    <ul class="msgWall" id="da_wa_li">

    </ul>
</div>
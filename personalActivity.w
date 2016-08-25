<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full user_center" xid="panel1"> 
      <div class="panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title"></div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="panel-content" xid="content1"><div xid="div_icon" class="user_head">
      <ins><img src="$UI/whganjiao/img/user.png" alt="" xid="image_icon"></img></ins>
  <span xid="span_name"></span></div>
  <div xid="div_paimin" class="same div_paimin">
    <img src="$UI/whganjiao/img/personal_icon1.png" alt="" xid="image_paimin"></img>
  <span xid="span_paimin"><![CDATA[学习排名]]>
  </span>
  <span xid="span_num" class="num"><![CDATA[4]]></span></div>

  <div xid="div_tongzhi" class="same div_tongzhi"><img src="$UI/whganjiao/img/personal_icon2.png" alt="" xid="image_tongzhi"></img>
  <span xid="span_tongzhi"><![CDATA[我的通知]]></span></div>
  <div xid="div_xinxi" class="same div_xinxi" bind-click="div_xinxiClick"><img src="$UI/whganjiao/img/personal_icon3.png" alt="" xid="image_xinxi"></img>
  <span xid="span_xinxi"><![CDATA[修改信息]]></span></div>
  <div xid="div_mima" class="same div_mima"><img src="$UI/whganjiao/img/personal_icon4.png" alt="" xid="image_mima"></img>
  <span xid="span_mima"><![CDATA[修改密码]]></span></div>
  <div xid="div_banghzu" class="same div_banghzu"><img src="$UI/whganjiao/img/personal_icon5.png" alt="" xid="image_bangzhu"></img>
  <span xid="span_bangzhu"><![CDATA[帮助咨询]]></span></div></div>
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>
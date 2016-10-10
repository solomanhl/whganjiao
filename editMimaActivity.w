<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full change_pass" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="修改密码"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">修改密码</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 label-first" xid="labelEdit1">
   <label class="x-label" xid="label1"><![CDATA[旧密码：]]></label>
   <span class="x-edit dif"><input component="$UI/system/components/justep/input/input" class="" xid="input_old"></input></span></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label2"><![CDATA[新密码：]]></label>
   <span class="x-edit dif"><input component="$UI/system/components/justep/input/input" class="" xid="input_new"></input></span></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 label-last" xid="labelEdit3">
   <label class="x-label" xid="label3"><![CDATA[确认新密码：]]></label>
   <span class="x-edit dif"><input component="$UI/system/components/justep/input/input" class="" xid="input_confirm" ></input></span></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="提交" xid="button_submit" bind-click="button_submitClick">
   <i xid="i1"></i>
   <span xid="span1">提交</span></a></div>
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>
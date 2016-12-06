<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;" onLoad="modelLoad" onunLoad="modelUnLoad"> 
  </div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full login" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" class="x-titlebar" title="用户登录">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">用户登录</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div xid="div_icon" class="user_img"><img src="$UI/whganjiao/img/user.png" alt="" xid="image_icon"></img></div>
  <div xid="div_input" class="login_input"><input component="$UI/system/components/justep/input/input" class="form-control" xid="input_user" placeHolder="请输入用户名"></input>
  <input component="$UI/system/components/justep/input/password" class="form-control" xid="password1" placeHolder="请输入密码"></input></div>
  <div xid="div_button" class="login_btn"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="登录" xid="button_login" bind-click="button_loginClick">
   <i xid="i1"></i>
   <span xid="span1">登录</span></a></div></div>
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>
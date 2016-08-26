<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:36px;left:75px;height:auto;" onParamsReceive="modelParamsReceive"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="data1" idColumn="id"><column label="用户id" name="id" type="Integer" xid="xid1"></column>
  <column label="登录名" name="username" type="String" xid="xid2"></column>
  <column label="状态" name="status" type="String" xid="xid3"></column>
  <column label="真实姓名" name="realname" type="String" xid="xid4"></column>
  <column label="工作单位" name="orgName" type="String" xid="xid5"></column>
  <column label="手机号" name="mobile" type="String" xid="xid6"></column>
  <data xid="default1">[]</data></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full user_info" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="修改信息"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">修改信息</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content" xid="content1"><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 label-first" xid="labelEdit1">
   <label class="x-label" xid="label1"><![CDATA[登录名：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_denglumin" bind-ref='$model.data1.ref("username")'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit2">
   <label class="x-label" xid="label2"><![CDATA[用户姓名：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_xinmin" bind-ref='$model.data1.ref("realname")'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit3">
   <label class="x-label" xid="label3"><![CDATA[职务：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_zhiwu"></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit4">
   <label class="x-label" xid="label4"><![CDATA[单位：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_danwei" bind-ref='$model.data1.ref("orgName")'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit6">
   <label class="x-label" xid="label6"><![CDATA[原手机号：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_yshouji" bind-ref='$model.data1.ref("mobile")'></div></div><div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30" xid="labelEdit5">
   <label class="x-label" xid="label5"><![CDATA[新手机号：]]></label>
   <span class="x-edit dif"><input component="$UI/system/components/justep/input/input" class="" xid="input1"></input></span>
   </div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 label-last" xid="labelEdit7">
   <label class="x-label" xid="label7"><![CDATA[邮箱：]]></label>
   <span  class="x-edit dif"><input component="$UI/system/components/justep/input/input" class="" xid="input2"></input></span></div>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default sub_btn" label="提交" xid="button_submit" bind-click="button_submitClick">
   <i xid="i1"></i>
   <span xid="span1">提交</span></a></div>
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>
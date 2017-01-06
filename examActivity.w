<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:129px;left:38px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad" onActive="modelActive"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="exam" idColumn="id" limit="-1"><column label="考试id" name="id" type="Integer" xid="xid1"></column>
  <column label="级别" name="level" type="String" xid="xid2"></column>
  <column label="考试名" name="name" type="String" xid="xid3"></column>
  <column label="分数" name="score" type="String" xid="xid4"></column>
  <column label="" name="udate" type="String" xid="xid5"></column>
  <column label="开始时间" name="startDate" type="String" xid="xid6"></column>
  <column label="结束时间" name="endDate" type="String" xid="xid7"></column>
  <column name="status" type="Integer" xid="xid8"></column>
  <column name="titleImg" type="String" xid="xid9"></column>
  <column label="是否通过" name="pass" type="Boolean" xid="xid10"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full exam" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="我的考试"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="返回" class="btn btn-default" onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span>返回</span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">我的考试</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C731F1EA1830000137FE1EA617201D6E" style="bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1" onPullDown="scrollView1PullDown" onPullUp="scrollView1PullUp">
   <div class="x-scroll-content" xid="div2"><span class="loading">  
                  <img src="$UI/whganjiao/img/loading.gif" alt="" xid="image_loading" bind-visible="isloading"></img>
                </span> <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="exam">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1" bind-click="li1Click">
    <dl>
      <dt><img alt="" xid="image1" bind-attr-src='$model.getServerImg( val("titleImg"))'></img></dt>
      <dd><span xid="span_title" bind-text='val("name")' class="title"></span>
  <ins><label xid="label1"><![CDATA[开始时间：]]></label><span xid="span4" bind-text='val("startDate")'></span></ins>
  <ins><label xid="label2"><![CDATA[结束时间：]]></label><span xid="span5" bind-text='val("endDate")'></span></ins>
  <ins bind-visible=' $model.shouldShowScore( val("status"))'><label xid="label3"><![CDATA[考试得分：]]></label><span  component="$UI/system/components/justep/output/output"  xid="output_score" bind-ref='ref("score")'></span><label  component="$UI/system/components/justep/output/output" class="state" xid="output_pass" bind-text=' $model.isPass( val("pass"))'></label></ins>
</dd>

    </dl>  
  
  <!-- <div xid="div1" bind-visible=' $model.shouldShowScore( val("status"))'><label xid="label3"><![CDATA[考试得分：]]></label>
  <div component="$UI/system/components/justep/output/output" class="x-output" xid="output_score" bind-ref='ref("score")'></div></div> -->
  <div component="$UI/system/components/justep/output/output" class="x-output status" xid="output_status" bind-text=' $model.setStatus( val("status"))' bind-css=' $model.bindStatusCSS(  val("status") )'></div>
  <!-- <div component="$UI/system/components/justep/output/output" class="x-output" xid="output_pass" bind-text=' $model.isPass( val("pass"))'></div> -->
</li></ul> </div>
  </div>
   </div></div>
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
<span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialog1" title="提示" type="OKCancel" onOK="messageDialog1OK"></span></div>
<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:315px;left:172px;" onParamsReceive="modelParamsReceive" onLoad="modelLoad" onunLoad="modelUnLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="peixun" idColumn="id" limit="6"><column label="线上培训集id" name="id" type="Integer" xid="xid1"></column>
  <column label="线上培训集名字" name="name" type="String" xid="xid3"></column>
  <column label="" name="udate" type="String" xid="xid5"></column>
  <column name="level" type="String" xid="xid2"></column>
  <column name="times" type="String" xid="xid4"></column>
  <column name="status" type="String" xid="xid6"></column>
  <column label="培训班开始时间" name="startDate" type="String" xid="xid7"></column>
  <column label="结束时间" name="endDate" type="String" xid="xid8"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full peixun" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="我的培训"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">我的培训</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view" xid="content1" _xid="C731F1EA1830000137FE1EA617201D6E" style="bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1" onPullDown="scrollView1PullDown" onPullUp="scrollView1PullUp">
   <div class="x-scroll-content" xid="div2"><span class="loading">  
                  <img src="$UI/whganjiao/img/loading.gif" alt="" xid="image_loading" bind-visible="isloading"></img>
                </span> <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="peixun">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1" bind-click="li1Click">
      <dl>
      <dt><img src="$UI/whganjiao/img/exam_pic.jpg" alt="" xid="image1"></img></dt><dd>
  <span xid="span_title" bind-text='val("name")' class="title"></span>
  <ins><label xid="label1"><![CDATA[开始时间：]]></label><span xid="span4" bind-text='val("startDate")'></span></ins>
  <ins><label xid="label2"><![CDATA[结束时间：]]></label><span xid="span5" bind-text='val("endDate")'></span></ins></dd>
  </dl>
  </li></ul> </div>
  </div>
   <div class="x-content-center x-pull-up" xid="div3">
    <span class="x-pull-up-label" xid="span2">加载更多...</span></div> </div></div>
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>
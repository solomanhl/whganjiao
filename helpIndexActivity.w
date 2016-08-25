<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="left:18px;top:83px;height:244px;"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="question" idColumn="id"><column name="id" type="Integer" xid="xid1"></column>
  <column name="question" type="String" xid="xid2"></column>
  <column name="answer" type="String" xid="xid3"></column>
  <data xid="default1">[{&quot;id&quot;:1,&quot;question&quot;:&quot;忘记密码怎么找回？&quot;},{&quot;id&quot;:2,&quot;question&quot;:&quot;如何在移动端上考试？&quot;},{&quot;id&quot;:3,&quot;question&quot;:&quot;如何查看我的排名？&quot;}]</data></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="帮助咨询"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">帮助咨询</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content  x-scroll-view help" xid="content1" _xid="C7322F424B60000193BE164010802A60" style="bottom: 0px;">
  <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1">
   <div class="x-content-center x-pull-down container" xid="div2">
    <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i1"></i>
    <span class="x-pull-down-label" xid="span1">下拉刷新...</span></div> 
   <div class="x-scroll-content" xid="div3">
  <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="question">
   <ul class="x-list-template" xid="listTemplateUl1">
    <li xid="li1"><div xid="div1"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output1" bind-ref='ref("question")'></div></div></li></ul> </div></div>
   <div class="x-content-center x-pull-up" xid="div4">
    <span class="x-pull-up-label" xid="span2">加载更多...</span></div> </div></div>
  </div> 
    <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>
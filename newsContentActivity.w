<?xml version="1.0" encoding="utf-8"?>
<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;" xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:109px;left:92px;height:auto;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="content" idColumn="id"><column label="contentID" name="id" type="Integer" xid="xid1"></column>
  <column label="作者" name="author" type="String" xid="xid2"></column>
  <column label="标题" name="title" type="String" xid="xid3"></column>
  <column label="状态" name="status" type="String" xid="xid4"></column>
  <column label="时间" name="date" type="String" xid="xid5"></column>
  <column label="正文" name="txt" type="String" xid="xid6"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" 
    class="x-panel x-full" xid="panel1"> 
      <div class="x-panel-top" xid="top1"> 
        <div component="$UI/system/components/justep/titleBar/titleBar" title="正文"
          class="x-titlebar">
          <div class="x-titlebar-left"> 
            <a component="$UI/system/components/justep/button/button"
              label="" class="btn btn-link btn-only-icon" icon="icon-chevron-left"
              onClick="{operation:'window.close'}" xid="backBtn"> 
              <i class="icon-chevron-left"/>  
              <span></span> 
            </a> 
          </div>  
          <div class="x-titlebar-title">正文</div>  
          <div class="x-titlebar-right reverse"> 
          </div>
        </div> 
      </div>  
    <div class="x-panel-content article_box" xid="content1">
      <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_title"></div>
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 date" xid="labelEdit_date">
        <label class="x-label" xid="label_date"><![CDATA[]]></label>
        <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_date"></div>
      </div>
      <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 date author" xid="labelEdit_author">
        <label class="x-label" xid="label_author"><![CDATA[]]></label>
        <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_author"></div>
      </div>
      <div component="$UI/system/components/justep/output/output" class="x-output text" xid="output_content"></div>
  </div>
  </div> 
</div>
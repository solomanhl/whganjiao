<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:44px;left:106px;height:auto;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dangan" idColumn="id">
      <column name="id" type="Integer" xid="xid1"></column>
  <column label="总学时、平均学时" name="examfinish" type="String" xid="xid2"></column>
  <column label="线下培训记录" name="trainingClassjoined" type="String" xid="xid3"></column>
  <column label="累计参加x次测试" name="examAll" type="String" xid="xid4"></column>
  <column label="修满X学时" name="times" type="String" xid="xid5"></column>
  <column name="trainingClassbegin" type="String" xid="xid6"></column>
  <column label="总学时" name="trainingClassfinish" type="String" xid="xid7"></column>
  <column label="学习客件数" name="coursestudy" type="String" xid="xid8"></column>
  <column name="coursejoined" type="String" xid="xid9"></column>
  <column label="完成课件数" name="coursefinish" type="String" xid="xid10"></column>
  <column label="选择课件数" name="courseAll" type="String" xid="xid11"></column>
  <column label="平均成绩学时" name="exambegin" type="String" xid="xid12"></column>
  <column label="总成绩学时" name="examjoined" type="String" xid="xid13"></column>
  <column label="全市排名" name="rank" type="String" xid="xid14"></column>
  <data xid="default1">[{&quot;id&quot;:1,&quot;examfinish&quot;:&quot;1&quot;,&quot;trainingClassjoined&quot;:&quot;1&quot;,&quot;examAll&quot;:&quot;1&quot;,&quot;times&quot;:&quot;1&quot;,&quot;trainingClassbegin&quot;:&quot;1&quot;,&quot;trainingClassfinish&quot;:&quot;1&quot;,&quot;coursestudy&quot;:&quot;1&quot;,&quot;coursejoined&quot;:&quot;1&quot;,&quot;coursefinish&quot;:&quot;1&quot;,&quot;courseAll&quot;:&quot;1&quot;,&quot;exambegin&quot;:&quot;1&quot;,&quot;examjoined&quot;:&quot;1&quot;,&quot;rank&quot;:&quot;1&quot;}]</data></div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="学习档案"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">学习档案</div>  
        <div class="x-titlebar-right reverse"></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"><div xid="div_title"><div component="$UI/system/components/justep/output/output" class="x-output" xid="output_username"></div>
  <div component="$UI/system/components/justep/output/output" class="x-output" xid="output_title"></div></div>
  <div xid="div_xuexi"><label xid="label1"><![CDATA[学习课件获得学时]]></label><div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables1" data="dangan">
   <columns xid="columns1"><column name="times" xid="column1" label="选择课件数" orderable="false"></column>
  <column name="coursefinish" xid="column2" label="完成课件数" orderable="false"></column>
  <column name="courseAll" xid="column3" label="获得总学时" orderable="false"></column></columns></div>
  </div>
  <div xid="div_pince"><label xid="label2"><![CDATA[参加课件评测获得学时]]></label>
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables2" data="dangan">
   <columns xid="columns2"><column name="examfinish" xid="column4" label="总成绩学时" orderable="false"></column>
  <column name="exambegin" xid="column5" label="平均成绩学时" orderable="false"></column>
  <column name="examjoined" xid="column6" label="总学时" orderable="false"></column>
  </columns></div></div>
  <div xid="div_xianxia"><label xid="label3"><![CDATA[线下培训档案]]></label>
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables3" data="dangan">
   <columns xid="columns3"><column name="trainingClassjoined" xid="column9" label="线下培训记录" orderable="false"></column>
  <column name="trainingClassfinish" xid="column10" label="总学时" orderable="false"></column></columns></div></div></div> 
  </div> 
</div>

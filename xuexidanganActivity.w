<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:44px;left:106px;height:auto;" onParamsReceive="modelParamsReceive" onLoad="modelLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="dangan" idColumn="id">
      <column name="id" type="Integer" xid="xid1"></column>
  <column label="培训班 学习" name="trainingclassLearning" type="String" xid="xid2"></column>
  <column label="培训班 参加" name="trainingclassJoined" type="String" xid="xid3"></column>
  <column label="培训班 完成" name="trainingclassFinished" type="String" xid="xid4"></column>
  <column label="考试中" name="examLearning" type="String" xid="xid18"></column>
  <column label="试获得学时 float" name="examcredithour" type="String" xid="xid6"></column>
  <column label="考试 参加" name="examJoined" type="String" xid="xid17"></column>
  <column label="考试 完成" name="examFinished" type="String" xid="xid7"></column>
  <column label="课程 学习" name="courseLearning" type="String" xid="xid8"></column>
  <column label="课程 加入" name="courseJoined" type="String" xid="xid9"></column>
  <column label="课程 完成" name="courseFinished" type="String" xid="xid11"></column>
  <column label="" name="date" type="String" xid="xid12"></column>
  <column label="课程获得学时 float" name="times" type="String" xid="xid13"></column>
  <column label="排名" name="ranking" type="String" xid="xid10"></column>
  <data xid="default1">[{&quot;id&quot;:0,&quot;examfinish&quot;:&quot;0&quot;,&quot;trainingClassjoined&quot;:&quot;0&quot;,&quot;examAll&quot;:&quot;0&quot;,&quot;times&quot;:&quot;0&quot;,&quot;trainingClassbegin&quot;:&quot;0&quot;,&quot;trainingClassfinish&quot;:&quot;0&quot;,&quot;coursestudy&quot;:&quot;0&quot;,&quot;coursejoined&quot;:&quot;0&quot;,&quot;coursefinish&quot;:&quot;0&quot;,&quot;courseAll&quot;:&quot;0&quot;,&quot;exambegin&quot;:&quot;0&quot;,&quot;examjoined&quot;:&quot;0&quot;,&quot;ranking&quot;:&quot;0&quot;,&quot;date&quot;:&quot;-&quot;}]</data>
  <column label="考试" name="examing" type="String" xid="xid14"></column></div>
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full files"
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
    <div class="x-panel-content" xid="content1"><span class="loading">  
                  <img src="$UI/whganjiao/img/loading.gif" alt="" xid="image_loading" bind-visible="isloading"></img>
                </span> <div xid="div_title" class="title"><div component="$UI/system/components/justep/output/output" class="x-output username" xid="output_username"></div>
  <div component="$UI/system/components/justep/output/output" class="x-output text" xid="output_title"></div></div>
  <div xid="div_xuexi" class="same"><label xid="label1"><![CDATA[学习课件获得学时]]></label><div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables1" data="dangan">
   <columns xid="columns1"><column name="courseJoined" xid="column3" label="选择课件" orderable="false"></column>
  <column name="courseLearning" xid="column8" label="学习课件" orderable="false"></column><column name="courseFinished" xid="column2" label="完成课件" orderable="false"></column>
  <column name="times" xid="column1" label="获得总学时" orderable="false"></column>
  </columns></div>
  </div>
  <div xid="div_pince"  class="same"><label xid="label2"><![CDATA[考试档案]]></label>
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables2" data="dangan">
   <columns xid="columns2"><column name="examJoined" xid="column6" label="参加" orderable="false"></column><column name="examLearning" xid="column5" label="考试" orderable="false"></column><column name="examFinished" xid="column4" label="完成" orderable="false"></column>
  
  </columns></div></div>
  <div xid="div_xianxia"  class="same"><label xid="label3"><![CDATA[培训班档案]]></label>
  <div component="$UI/system/components/justep/dataTables/dataTables" flexibleWidth="true" responsive="true" rowActiveClass="active" class="table table-hover table-striped" xid="dataTables3" data="dangan">
   <columns xid="columns3"><column name="trainingclassJoined" xid="column9" label="参加" orderable="false"></column>
  <column name="trainingclassLearning" xid="column7" label="学习" orderable="false"></column><column name="trainingclassFinished" xid="column10" label="完成" orderable="false"></column>
  </columns></div></div>
  </div> 
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>

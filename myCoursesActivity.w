<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="top:194px;left:15px;height:auto;"
    onParamsReceive="modelParamsReceive"><div component="$UI/system/components/justep/data/data" autoLoad="true" xid="course" idColumn="id"><column label="id" name="id" type="Integer" xid="xid1"></column>
  <column label="播放次数" name="time" type="String" xid="xid2"></column>
  <column name="level" type="String" xid="xid3"></column>
  <column label="课程状态" name="status" type="String" xid="xid4"></column>
  <column label="课程名" name="name" type="String" xid="xid5"></column>
  <column label="课程id" name="courseId" type="String" xid="xid6"></column>
  <column label="图片" name="titleImg" type="String" xid="xid7"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full myCourse"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="我的课程"
        class="x-titlebar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
            <i class="icon-chevron-left"/>  
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">我的课程</div>  
        <div class="x-titlebar-right reverse"></div> 
      </div> 
    </div>  
    <div class="x-panel-content  x-scroll-view course_box" xid="content1" _xid="C731F4F130A00001EE6263D0E270D2F0">
      <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
        xid="scrollView1" onPullDown="scrollView1PullDown" onPullUp="scrollView1PullUp"> 
        <div class="x-scroll-content" xid="div2">
          <div component="$UI/system/components/justep/list/list" class="x-list"
            xid="list1" data="course"> 
            <ul class="x-list-template" xid="listTemplateUl1"> 
              <li xid="li1" bind-click="li1Click">
              	<div class="media media_study" xid="media_sdudy"> 
                          <div class="media-left" xid="mediaLeft_study"> 
                            <span xid="span12"></span><img src="" alt="" xid="image_study" bind-attr-src='val("titleImg")' style="" ></img> 
                          </div>  
                          <div class="media-body" xid="mediaBody_study"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output title" xid="output_courseTille" bind-ref="ref(&quot;name&quot;)"/>  
                            <div xid="div_courseInfo">
                              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                                class="x-label-edit x-label30 count" xid="labelEdit_courseCount"> 
                                <label class="x-label" xid="label_courseCount"><![CDATA[选课人数：]]></label>  
                                <div component="$UI/system/components/justep/output/output"
                                  class="x-output x-edit" xid="output_courseCount"
                                  bind-ref='ref("time")'/>
                              </div> 
                            </div>
                          </div> 
                        </div>
              </li>
            </ul> 
          </div>
        </div>  
        <div class="x-content-center x-pull-up" xid="div3"> 
          <span class="x-pull-up-label" xid="span2">加载更多...</span>
        </div> 
      </div>
    </div> 
  </div> 
  <resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource>
</div>

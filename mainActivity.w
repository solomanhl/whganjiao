<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:106px;left:266px;"
    onModelConstruct="modelModelConstruct" onLoad="modelLoad" onunLoad="modelUnLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="news" idColumn="id" onCustomRefresh="newsCustomRefresh"> 
      <column label="ID" name="id" type="Integer" xid="xid1"/>  
      <column label="标题" name="title" type="String" xid="xid2"/>  
      <column label="摘要" name="description" type="String" xid="xid3"/>  
      <column label="正文" name="message" type="String" xid="xid3"/>  
      <data xid="default1">[]</data>  
      <column label="时间" name="date" type="String" xid="xid4"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="study_course" idColumn="id">
      <column label="课程id" name="id" type="Integer" xid="xid16"/>  
      <column label="课程名" name="name" type="String" xid="xid17"/>  
      <column label="课程截图" name="titleImg" type="String" xid="xid18"/>  
      <column label="讲师" name="teachers" type="String" xid="xid19"/>  
      <column label="选课人数" name="users" type="Integer" xid="xid20"/>  
      <column label="日期" name="cdate" type="String" xid="xid21"/>
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="course_group" idColumn="id" limit="-1">
      <column label="课程分类id" name="id" type="Integer" xid="xid22"></column>
  <column label="课程分类名" name="name" type="String" xid="xid23"></column>
  <data xid="default3">[]</data>
  <column label="分类下课程数量" name="count" type="Integer" xid="xid45"></column></div>
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="imgData" onCustomRefresh="imgDataCustomRefresh" idColumn="id"> 
      <column label="id" name="id" type="String" xid="xid5"></column>
  <column label="图片" name="fImgUrl" type="String" xid="xid6"></column>
  <column label="链接地址" name="fUrl" type="String" xid="xid7"></column>
  <column name="author" type="String" xid="xid25"></column>
  <column name="title" type="String" xid="xid26"></column>
  <column name="description" type="String" xid="xid27"></column>
  <column label="服务器图片相对路径" name="typeImg" type="String" xid="xid28"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="communicate" idColumn="id"> 
      <column label="id" name="id" type="String" xid="xid8"></column>
  <column label="评论者" name="realname" type="String" xid="xid9"></column>
  <column label="评论者头像" name="userImg" type="String" xid="xid10"></column>
  <column label="评论内容" name="content" type="String" xid="xid11"></column>
  <column label="评论时间" name="date" type="String" xid="xid12"></column>
  <column label="课程图像" name="titleImg" type="String" xid="xid13"></column>
  <column label="课程讲师" name="teacher" type="Integer" xid="xid14"></column>
  <column label="课程标题" name="title" type="Integer" xid="xid15"></column>
  <column label="课程id" name="courseId" type="String" xid="xid24"></column>
  <data xid="default2">[]</data></div> 
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="peixun" limit="-1" idColumn="id"><column label="线上培训集id" name="id" type="Integer" xid="xid29"></column>
  <column label="线上培训集名字" name="name" type="String" xid="xid30"></column>
  <column name="udate" type="String" xid="xid31"></column>
  <column name="level" type="String" xid="xid32"></column>
  <column name="times" type="String" xid="xid33"></column>
  <column label="培训班开始时间" name="startDate" type="String" xid="xid34"></column>
  <column label="结束时间" name="endDate" type="String" xid="xid35"></column>
  <column name="status" type="Integer" xid="xid36"></column>
  <column label="图片" name="titleImg" type="String" xid="xid46"></column></div>
  <div component="$UI/system/components/justep/data/data" autoLoad="true" xid="exam" limit="-1" idColumn="id"><column label="考试id" name="id" type="Integer" xid="xid37"></column>
  <column label="级别" name="level" type="String" xid="xid38"></column>
  <column label="考试名" name="name" type="String" xid="xid39"></column>
  <column label="分数" name="score" type="String" xid="xid40"></column>
  <column name="udate" type="String" xid="xid41"></column>
  <column label="开始时间" name="startDate" type="String" xid="xid42"></column>
  <column label="结束时间" name="endDate" type="String" xid="xid43"></column>
  <column name="status" type="Integer" xid="xid44"></column>
  <column label="图片" name="titleImg" type="String" xid="xid47"></column></div></div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="干部教育"
        class="x-titlebar" xid="titleBar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn" target="content_home" disabled="true"> 
            <span/> 
          </a> 
        </div>  
        <div class="x-titlebar-title">干部教育</div>  
        <div class="x-titlebar-right reverse"><a component="$UI/system/components/justep/button/button" class="btn btn-default" xid="button_search" onClick="button_searchClick" bind-visible="shouldShowSearch">
   <i xid="i5"></i>
   <span xid="span5"></span></a></div> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1"> 
        <div class="x-contents-content  x-scroll-view content_home" xid="content_home"
          onActive="content_homeActive"> 
          <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
            xid="panel_home"> 
            <div class="x-panel-content" xid="content2">
              <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
                xid="scrollView1" onPullDown="scrollView1PullDown" onPullUp="scrollView1PullUp"> 
                <div class="x-scroll-content" xid="div2"> 
                  <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified option_tab" tabbed="true" xid="buttonGroup_classify" selected="button_gonggao"><a component="$UI/system/components/justep/button/button" class="btn btn-default" label="通知公告" xid="button_gonggao" onClick="button_gonggaoClick">
   <i xid="i6"></i>
   <span xid="span6">通知公告</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="工作动态" xid="button_dongtai" onClick="button_dongtaiClick">
   <i xid="i7"></i>
   <span xid="span7">工作动态</span></a>
  <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="干教咨询" xid="button_zixun" onClick="button_zixunClick">
   <i xid="i8"></i>
   <span xid="span8">干教咨询</span></a></div>
   <div component="$UI/system/components/justep/panel/panel" class="x-panel x-card" xid="panel3">
   <div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel banner" xid="carousel1" auto="true"> 
                    <ol class="carousel-indicators" xid="ol1" bind-visible="false"/>  
                    <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="true" swipe="true" routable="false" xid="contentsImg"> 
                      <div class="x-contents-content" xid="contentImg"> 
                        <img src="" alt="" xid="image1" class="tb-img1" bind-click="openPageClick" pagename="./detail.w" /> 
                      </div> 
                    </div> 
                  </div></div>  
                <span class="loading">  
                  <img src="$UI/whganjiao/img/loading.gif" alt="" xid="image_loading" bind-visible="isloading"></img>
                </span> 
                <div component="$UI/system/components/justep/panel/panel" class="x-panel x-card" xid="panel5">
                <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="news" limit="20"> 
                    <ul class="x-list-template" xid="listTemplateUl1"> 
                      <li xid="li1" bind-click="li1Click"> 
                        <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_title" bind-ref="ref(&quot;title&quot;)" />  
                        <div component="$UI/system/components/justep/output/output" class="x-output message" xid="output_message" bind-ref="ref(&quot;description&quot;)" bind-visible="false" />  
                        <div component="$UI/system/components/justep/output/output" class="x-output date" xid="output_date" bind-text='val("date").substring(0, 10)'/> 
                      </li> 
                    </ul> 
                  </div></div></div>  
                 
              <div class="x-content-center x-pull-up" xid="div3"> 
                  <span class="x-pull-up-label" xid="span14"></span> 
                </div></div>
            </div> 
          </div>
        </div>  
        <div class="x-panel-content x-contents-content content_study  x-scroll-view " xid="content_study"
          onActive="content_studyActive" onactive="content_studyActive" onInactive="content_studyInactive"> 
          <div component="$UI/system/components/justep/button/buttonGroup" class="buttonGroup_study" tabbed="true" xid="buttonGroup_study" bind-visible="showContent" >
            <a component="$UI/system/components/justep/button/button" class="this" label="课程" xid="button1" onClick="button1Click">
          <span xid="span9">课程</span></a>
        <a component="$UI/system/components/justep/button/button" class="" label="培训班" xid="button2" onClick="button2Click">
   <span xid="span11">培训班</span></a>
  <a component="$UI/system/components/justep/button/button" class="" label="考试" xid="button3" onClick="button3Click">
   <span xid="span13">考试</span></a>
 </div>

   <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
            xid="panel_course" bind-visible="showCourse" id="panel_course"> 
            <div class="x-panel-content study_box" xid="content3">
              <a component="$UI/system/components/justep/button/button" class="btn btn-default button_more " xid="button_more" icon="" onClick="button_moreClick">
   <!-- <i xid="i14" class="linear linear-sad"></i> -->
   <span xid="span16">更多</span>
   <span xid="span16">课程</span>
 </a><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
                xid="scrollView_study" onPullUp="scrollView_studyPullUp" onPullDown="scrollView_studyPullDown"> 
                <div class="x-scroll-content" xid="div5">
                  <div component="$UI/system/components/justep/list/list" class="x-list"
                    xid="list_study" data="study_course" disablePullToRefresh="false"> 
                    <ul class="x-list-template" xid="listTemplateUl_study"> 
                      <li xid="li_study" bind-click="li_studyClick">
                        <div class="media media_study" xid="media_sdudy"> 
                          <div class="media-left" xid="mediaLeft_study"> 
                            <span xid="span12"/>
                            <img src="" alt="" xid="image_study" bind-attr-src=' $model.getServerImg(val("titleImg"))'
                              style=""/> 
                          </div>  
                          <div class="media-body" xid="mediaBody_study"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output title" xid="output_courseTille" bind-ref="ref(&quot;name&quot;)"/>  
                            <div component="$UI/system/components/justep/labelEdit/labelEdit"
                              class="x-label-edit x-label30 courseTeacher" xid="labelEdit_courseTeacher"> 
                              <label class="x-label" xid="label_courseTeacher"><![CDATA[讲师：]]></label>  
                              <div component="$UI/system/components/justep/output/output"
                                class="x-output x-edit" xid="output_courseTeacher"
                                bind-ref="ref(&quot;teachers&quot;)"/>
                            </div>  
                            <div xid="div_courseInfo">
                              <div component="$UI/system/components/justep/labelEdit/labelEdit"
                                class="x-label-edit x-label30 count" xid="labelEdit_courseCount"> 
                                <label class="x-label" xid="label_courseCount"><![CDATA[选课人数：]]></label>  
                                <div component="$UI/system/components/justep/output/output"
                                  class="x-output x-edit" xid="output_courseCount"
                                  bind-ref="ref(&quot;users&quot;)"/>
                              </div> 
                            </div>
                          <div component="$UI/system/components/justep/output/output" class="x-output status" xid="output_coursestatus" bind-text='$model.setCourseStatus( val("status"))' bind-css='$model.bindCourseStatusCSS( val("status"))'></div></div> 
                        </div>
                      </li>
                    </ul> 
                  </div>
                </div>  
                <div class="x-content-center x-pull-up" xid="div6"> 
                  <span class="x-pull-up-label" xid="span10">加载更多...</span>
                </div> 
              </div>
            </div> 
          </div>  
         <!--  <div id="blackbg"/>  -->
        <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel_class" bind-visible="showClass" id="panel_class">
   <div class="x-panel-content  x-scroll-view" xid="content7" _xid="C75596630C3000015D701F8810A057D0" style="top: 0px; bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView2">
   
   <div class="x-scroll-content study_box" xid="div4"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list2" data="peixun">
   <ul class="x-list-template" xid="listTemplateUl3">
    <li xid="li2" bind-click="li2Click"><div class="media media_study" xid="media1">
   <div class="media-left" xid="mediaLeft2">
    <a href="#" xid="a2">
     <img class="media-object" alt="" xid="image2" bind-attr-src='$model.getServerImg(val("titleImg"))'></img></a> </div> 
   <div class="media-body" xid="mediaBody3">
    <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_classtitle" bind-ref='ref("name")'></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 courseTeacher" xid="labelEdit1">
   <label class="x-label" xid="label1"><![CDATA[开始时间：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output2" bind-ref='ref("startDate")'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 courseTeacher" xid="labelEdit2">
   <label class="x-label" xid="label2"><![CDATA[结束时间：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output3" bind-ref='ref("endDate")'></div></div>
  <div component="$UI/system/components/justep/output/output" class="x-output status" xid="output_classstate" bind-text='$model.setClassStatus( val("status"))' bind-css='$model.bindClassStatusCSS( val("status"))'></div></div> </div></li></ul> </div></div>
   </div></div>
   </div><div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel_exam" bind-visible="showExam" id="panel_exam">
   <div class="x-panel-content  x-scroll-view" xid="content8" _xid="C75596645980000116FA35202B701CC1" style="top: 0px; bottom: 0px;"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView3">
   
   <div class="x-scroll-content study_box" xid="div11"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list3" data="exam">
   <ul class="x-list-template" xid="listTemplateUl4">
    <li xid="li3" bind-click="li3Click"><div class="media media_study" xid="media2">
   <div class="media-left" xid="mediaLeft3">
    <a href="#" xid="a3">
     <img class="media-object" alt="" xid="image3" bind-attr-src='$model.getServerImg(val("titleImg"))'></img></a> </div> 
   <div class="media-body" xid="mediaBody4">
    <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_examtitle" bind-ref='ref("name")'></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 courseTeacher" xid="labelEdit3">
   <label class="x-label" xid="label3"><![CDATA[开始时间]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output6" bind-ref='ref("startDate")'></div></div>
  <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 courseTeacher" xid="labelEdit4">
   <label class="x-label" xid="label4"><![CDATA[结束时间：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output7" bind-ref='ref("endDate")'></div></div>
  <div component="$UI/system/components/justep/output/output" class="x-output status" xid="output_examstate" bind-text='$model.setExamStatus( val("status"))' bind-css='$model.bindExamStatusCSS(  val("status") )'></div></div> </div></li></ul> </div></div>
   </div></div>
   </div><div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer1" src='./pleaseLogin.w' bind-visible="showLogin"></div>
  
  </div>  
        <div class="x-contents-content  x-scroll-view content_comm" xid="content_comm"
          onActive="content_commActive"> 
           
        <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel4" bind-visible="showContent">
   <div class="x-panel-content" xid="content4"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView_comm" onPullDown="scrollView_commPullDown" onPullUp="scrollView_commPullUp"> 
            <div class="x-content-center x-pull-down container" xid="div15"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i10" />  
              <span class="x-pull-down-label" xid="span19">下拉刷新...</span> 
            </div>  
            <div class="x-scroll-content" xid="div16"> 
              <div component="$UI/system/components/justep/list/list" class="x-list" xid="list_comm" data="communicate" limit="20"> 
                <ul class="x-list-template" xid="listTemplateUl2"> 
                  <li xid="li_comm"> 
                    <div class="media" xid="media_comm1"> 
                      <div class="media-left" xid="mediaLeft1"> 
                        <a href="#" xid="a1"> 
                          <img class="media-object" alt="" xid="image12" src="$UI/whganjiao/img/user_pic.png" />  
                          <span /> 
                        </a> 
                      </div>  
                      <div class="media-body" xid="mediaBody1"> 
                        <div xid="div_info" class="info"> 
                          <div component="$UI/system/components/justep/output/output" class="x-output author" xid="output_comm_author" bind-ref='ref("realname")' />
                          <div component="$UI/system/components/justep/output/output" class="x-output date" xid="output_dateline" bind-ref="ref(&quot;date&quot;)" bind-text='"2016-03-10"'/> 
                        </div>  
                        
                         
                      </div> 
                    </div> 
                  <div component="$UI/system/components/justep/output/output" class="x-output message" xid="output_txt" bind-ref="ref(&quot;content&quot;)" /><div class="media detail" xid="media_orien" bind-click="li_commClick"> 
                          <div class="media-left" xid="mediaLeft_orien"> 
                            <a href="#" xid="a_orien"> 
                              <span xid="span15" />
                              <img class="media-object" src="" alt="" xid="image_orien" bind-attr-src='$model.getServerImg(val("titleImg")) ' />
                            </a> 
                          </div>
                          <div class="media-body" xid="mediaBody2"> 
                            <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_title1" bind-ref="ref(&quot;title&quot;)" />  
                            <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 author2" xid="labelEdit_author2"> 
                              <label class="x-label" xid="label_author2"><![CDATA[讲师：]]></label>  
                              <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_author2" bind-ref="ref(&quot;teacher&quot;)" />
                            </div>
                          </div> 
                        </div></li> 
                </ul> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div17"> 
              <span class="x-pull-up-label" xid="span20">加载更多...</span> 
            </div> 
          </div></div>
   </div>
  <div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer2" src="./pleaseLogin.w" bind-visible="showLogin"></div></div>  
        <div class="x-contents-content content_me" xid="content_me" onActive="content_meActive"> 
          <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel6" bind-visible="showContent">
   <div class="x-panel-content" xid="content5"><div xid="div_icon" class="user_head">
    <ins><img src="$UI/whganjiao/img/user_pic.png" alt="" xid="image_icon"></img></ins>
    <span id="span_name" xid="span_name"><![CDATA[]]></span></div>
   <div xid="div_xinxi" class="same_me div_xinxi" bind-click="div_xinxiClick"><img src="$UI/whganjiao/img/personal_icon3.png" alt="" xid="image_xinxi"></img>
  <label xid="span_xinxi">修改信息</label></div>
  <div xid="div_mima" class="same_me div_mima" bind-click="div_mimaClick"><img src="$UI/whganjiao/img/personal_icon4.png" alt="" xid="image_mima"></img>
  <label xid="span_mima">修改密码</label></div>
  <div xid="div_dangan" class="div_dangan same_me" bind-click="div_danganClick"> 
            <img src="$UI/whganjiao/img/wenjianjia.png" alt="" xid="image_danganicon" />  
            <label xid="label_dangan"><![CDATA[学习档案]]></label> 
          </div><div xid="div_project" class="div_project same_me" bind-click="div_projectClick"> 
            <img src="$UI/whganjiao/img/daohang.png" alt="" xid="image_projecticon" />  
            <label xid="label_project"><![CDATA[我的课程]]></label> 
          </div><div xid="div_peixun" class="div_peixun same_me" bind-click="div_peixunClick"> 
            <img src="$UI/whganjiao/img/rili.png" alt="" xid="image_peixunicon" />  
            <label xid="label_peixun"><![CDATA[培训计划]]></label> 
          </div><div xid="div_banji" class="same_me div_banji" bind-click="div_banjiClick"> 
            <img src="$UI/whganjiao/img/laba.png" alt="" xid="image_banjiicon" />  
            <label xid="label_banji"><![CDATA[我的考试]]></label> 
          </div><div xid="div_huancun" class="same_me div_huancun" bind-visible="false"> 
            <img src="$UI/whganjiao/img/huancun.png" alt="" xid="image_huancunicon" />  
            <label xid="label_huancun"><![CDATA[离线缓存]]></label> 
          </div><div xid="div_dayi" class="div_dayi same_me" bind-click="div_dayiClick" bind-visible="false"> 
            <img src="$UI/whganjiao/img/zixun.png" alt="" xid="image_dayiicon" />  
            <label xid="label_dayi"><![CDATA[咨询答疑]]></label> 
          </div><div xid="div_shezhi" class="same_me div_shezhi" bind-visible="false"> 
            <img src="$UI/whganjiao/img/shezhi.png" alt="" xid="image_shezhiicon" />  
            <label xid="label_shezhi"><![CDATA[设置]]></label> 
          </div><a component="$UI/system/components/justep/button/button" class="btn btn-default exit_btn" label="退出账号" xid="button_exit" onClick="button_exitClick">
   <i xid="i9"></i>
   <span xid="span17">退出账号</span></a></div>
   </div>  
            
            
            
            
            
           
        
  
  
  <div component="$UI/system/components/justep/windowContainer/windowContainer" class="x-window-container" xid="windowContainer3" src="./pleaseLogin.w" bind-visible="showLogin"></div>
  </div> 
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified"
        tabbed="true" xid="buttonGroup1" selected="button_home"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          xid="button_home" target="content_home" icon="linear linear-envelope" label="首页"> 
          <i xid="i1" class="linear linear-envelope"/>  
          <span xid="span1" class="this">首页</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="学习" xid="button_study" icon="linear linear-code" target="content_study"> 
          <i xid="i2" class="linear linear-code"/>  
          <span xid="span2">学习</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="交流" xid="button_comm" icon="linear linear-dice" target="content_comm"> 
          <i xid="i3" class="linear linear-dice"/>
          <span xid="span3">交流</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="个人" xid="button_user" icon="linear linear-chevronrightcircle" target="content_me"> 
          <i xid="i4" class="linear linear-chevronrightcircle"/>
          <span xid="span4">个人</span> 
        </a> 
      </div> 
    </div> 
  </div>  
  <resource xid="resource2">
    <require xid="require1" url="css!$UI/whganjiao/base"/>  
    <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"/>
  </resource>
<div component="$UI/system/components/justep/popOver/popOver" class="x-popOver popOver_moreCourse" direction="left-bottom" xid="popOver_moreCourse" anchor="titleBar" opacity="0.2" position="left">
   <div class="x-popOver-overlay" xid="div7"></div>
   <div class="x-popOver-content  x-scroll-view" xid="div8">
  <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView4">
   
   <div class="x-scroll-content" xid="div10"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list_courseGroup" data="course_group"> 
        <ul class="x-list-template" xid="listTemplateUl_courseGroup"> 
          <li xid="li_courseGroup" bind-click="li_courseGroupClick">
            <div component="$UI/system/components/justep/output/output" class="x-output" xid="output_groupname" bind-ref='ref("name")'></div>
  <span component="$UI/system/components/justep/output/output" class="x-output count" xid="output_groupcount" bind-ref='ref("count")'></span></li>
        </ul> 
      </div></div>
   </div></div>
 </div>
  <span component="$UI/system/components/justep/timer/timer" xid="timer1" interval="60000" onTimer="timer1Timer" style="top:8px;left:107px;"></span>
  <span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialog1" title="提示" type="OKCancel" onOK="messageDialog1OK"></span>
  <span component="$UI/system/components/justep/messageDialog/messageDialog" xid="messageDialog_exit" title="提示" type="OKCancel" message="是否退出当前帐号？" onOK="messageDialog_exitOK"></span></div>

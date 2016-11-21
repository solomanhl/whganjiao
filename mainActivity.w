<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:106px;left:266px;"
    onModelConstruct="modelModelConstruct" onLoad="modelLoad" onunLoad="modelUnLoad"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="news" idColumn="id"> 
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
      <column label="课程分类id" name="id" type="Integer" xid="xid22"/>  
      <column label="课程分类名" name="name" type="String" xid="xid23"/>  
      <data xid="default3">[{"id":1,"name":"11"},{"id":2,"name":"22"}]</data>
    </div>
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
  </div>  
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
    xid="panel1"> 
    <div class="x-panel-top" xid="top1"> 
      <div component="$UI/system/components/justep/titleBar/titleBar" title="干部教育"
        class="x-titlebar" xid="titleBar"> 
        <div class="x-titlebar-left"> 
          <a component="$UI/system/components/justep/button/button" label=""
            class="btn btn-link btn-only-icon" icon="icon-chevron-left" onClick="{operation:'window.close'}"
            xid="backBtn"> 
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
                  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-card" xid="panel3">
   <div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel banner" xid="carousel1" auto="true"> 
                    <ol class="carousel-indicators" xid="ol1" />  
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
                  <span class="x-pull-up-label" xid="span14">加载更多...</span> 
                </div></div>
            </div> 
          </div>
        </div>  
        <div class="x-panel-content x-contents-content content_study  x-scroll-view " xid="content_study"
          onActive="content_studyActive" onactive="content_studyActive" onInactive="content_studyInactive"> 
          <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full"
            xid="panel2"> 
            <div class="x-panel-top studyTop" xid="top3">
              
            <div xid="div_studyMore"  class="studyMore">
                
                <a component="$UI/system/components/justep/button/button" class="btn btn-default btn_more" label="更多课程" xid="button_studyMore" onClick="button_studyMoreClick"> 
                  <span xid="span11">更多课程</span>  
                  <img src="img/arrow2.png" alt="" /> 
                </a></div></div>  
            <div class="x-panel-content study_box" xid="content3">
              <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
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
                          </div> 
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
        </div>  
        <div class="x-contents-content  x-scroll-view content_comm" xid="content_comm"
          onActive="content_commActive"> 
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
            xid="scrollView_comm" onPullDown="scrollView_commPullDown" onPullUp="scrollView_commPullUp"> 
            <div class="x-content-center x-pull-down container" xid="div15"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i10"/>  
              <span class="x-pull-down-label" xid="span19">下拉刷新...</span> 
            </div>  
            <div class="x-scroll-content" xid="div16"> 
              <div component="$UI/system/components/justep/list/list" class="x-list"
                xid="list_comm" data="communicate" limit="5"> 
                <ul class="x-list-template" xid="listTemplateUl2"> 
                  <li xid="li_comm" bind-click="li_commClick"> 
                    <div class="media" xid="media_comm1"> 
                      <div class="media-left" xid="mediaLeft1"> 
                        <a href="#" xid="a1"> 
                          <img class="media-object" alt="" xid="image12" src="$UI/whganjiao/img/user_pic.png"/>  
                          <span/> 
                        </a> 
                      </div>  
                      <div class="media-body" xid="mediaBody1"> 
                        <div xid="div_info" class="info"> 
                          <div component="$UI/system/components/justep/output/output"
                            class="x-output author" xid="output_comm_author" bind-ref='ref("realname")'/>
                          <div component="$UI/system/components/justep/output/output"
                            class="x-output date" xid="output_dateline" bind-ref="ref(&quot;date&quot;)"/> 
                        </div>  
                        <div component="$UI/system/components/justep/output/output"
                          class="x-output message" xid="output_txt" bind-ref="ref(&quot;content&quot;)"/>
                        <div class="media detail" xid="media_orien"> 
                          <div class="media-left" xid="mediaLeft_orien"> 
                            <a href="#" xid="a_orien"> 
                              <span xid="span15"/>
                              <img class="media-object" src="" alt="" xid="image_orien"
                                bind-attr-src='$model.getServerImg(val("titleImg")) '/>
                            </a> 
                          </div>
                          <div class="media-body" xid="mediaBody2"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output title" xid="output_title1" bind-ref="ref(&quot;title&quot;)"/>  
                            <div component="$UI/system/components/justep/labelEdit/labelEdit"
                              class="x-label-edit x-label30 author2" xid="labelEdit_author2"> 
                              <label class="x-label" xid="label_author2"><![CDATA[讲师：]]></label>  
                              <div component="$UI/system/components/justep/output/output"
                                class="x-output x-edit" xid="output_author2" bind-ref="ref(&quot;teacher&quot;)"/>
                            </div>
                          </div> 
                        </div> 
                      </div> 
                    </div> 
                  </li> 
                </ul> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div17"> 
              <span class="x-pull-up-label" xid="span20">加载更多...</span> 
            </div> 
          </div> 
        </div>  
        <div class="x-contents-content content_me" xid="content_me" onActive="content_meActive"> 
          <div xid="div_user" class="div_user" bind-click="div_userClick"> 
            <img alt="" xid="image_usericon" id="image_usericon"/>  
            <label xid="label_username" id="label_username" bind-text="localStorage['realname']"><![CDATA[请登录]]></label> 
          </div>  
          <div xid="div_project" class="div_project same_me" bind-click="div_projectClick"> 
            <img src="$UI/whganjiao/img/daohang.png" alt="" xid="image_projecticon"/>  
            <label xid="label_project"><![CDATA[我的课程]]></label> 
          </div>  
          <div xid="div_peixun" class="div_peixun same_me" bind-click="div_peixunClick"> 
            <img src="$UI/whganjiao/img/rili.png" alt="" xid="image_peixunicon"/>  
            <label xid="label_peixun"><![CDATA[培训计划]]></label> 
          </div>  
          <div xid="div_banji" class="same_me div_banji" bind-click="div_banjiClick"> 
            <img src="$UI/whganjiao/img/laba.png" alt="" xid="image_banjiicon"/>  
            <label xid="label_banji"><![CDATA[我的考试]]></label> 
          </div>  
          <div xid="div_dangan" class="div_dangan same_me" bind-click="div_danganClick"> 
            <img src="$UI/whganjiao/img/wenjianjia.png" alt="" xid="image_danganicon"/>  
            <label xid="label_dangan"><![CDATA[学习档案]]></label> 
          </div>  
          <div xid="div_huancun" class="same_me div_huancun" bind-visible="false"> 
            <img src="$UI/whganjiao/img/huancun.png" alt="" xid="image_huancunicon"/>  
            <label xid="label_huancun"><![CDATA[离线缓存]]></label> 
          </div>  
          <div xid="div_dayi" class="div_dayi same_me" bind-click="div_dayiClick" bind-visible="false"> 
            <img src="$UI/whganjiao/img/zixun.png" alt="" xid="image_dayiicon"/>  
            <label xid="label_dayi"><![CDATA[咨询答疑]]></label> 
          </div>  
          <div xid="div_shezhi" class="same_me div_shezhi" bind-visible="false"> 
            <img src="$UI/whganjiao/img/shezhi.png" alt="" xid="image_shezhiicon"/>  
            <label xid="label_shezhi"><![CDATA[设置]]></label> 
          </div> 
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
<div component="$UI/system/components/justep/popOver/popOver" class="x-popOver" direction="auto" xid="popOver_moreCourse" anchor="titleBar" opacity="0.2">
   <div class="x-popOver-overlay" xid="div7"></div>
   <div class="x-popOver-content" xid="div8"><div component="$UI/system/components/justep/list/list" class="x-list" xid="list_courseGroup" data="course_group"> 
                      <ul class="x-list-template" xid="listTemplateUl_courseGroup"> 
                        <li xid="li_courseGroup" bind-click="li_courseGroupClick">
                          <label xid="label_groupname" bind-text="ref(&quot;name&quot;)"><![CDATA[]]></label>
                        </li>
                      </ul> 
                    </div></div></div>
  <span component="$UI/system/components/justep/timer/timer" xid="timer1" interval="60000" onTimer="timer1Timer" style="top:10px;left:53px;"></span>
  </div>

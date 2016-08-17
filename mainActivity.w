<?xml version="1.0" encoding="utf-8"?>

<div xmlns="http://www.w3.org/1999/xhtml" component="$UI/system/components/justep/window/window" design="device:m;"
  xid="window" class="window">  
  <div component="$UI/system/components/justep/model/model" xid="model" style="height:auto;top:120px;left:755px;"
    onModelConstruct="modelModelConstruct"> 
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="news" idColumn="id"> 
      <column label="ID" name="id" type="Integer" xid="xid1"></column>
  <column label="标题" name="title" type="String" xid="xid2"></column>
  <column label="摘要" name="description" type="String" xid="xid3"></column>
  <column label="正文" name="message" type="String" xid="xid3"></column>
  <data xid="default1">[]</data>
  <column label="时间" name="date" type="String" xid="xid4"></column></div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="imgData" onCustomRefresh="imgDataCustomRefresh" idColumn="id"> 
      <column label="id" name="id" type="String" xid="xid5"/>  
      <column label="图片" name="fImgUrl" type="String" xid="xid6"/>  
      <column label="链接地址" name="fUrl" type="String" xid="xid7"/> 
    </div>  
    <div component="$UI/system/components/justep/data/data" autoLoad="true"
      xid="communicate" idColumn="id">
      <column label="id" name="id" type="String" xid="xid8"/>  
      <column label="作者" name="author" type="String" xid="xid9"/>  
      <column label="时间" name="dateline" type="String" xid="xid10"/>  
      <column label="交流内容" name="message" type="String" xid="xid11"/>  
      <column label="原帖标题" name="title" type="String" xid="xid12"/>  
      <column label="原帖作者" name="author2" type="String" xid="xid13"/>  
      <column label="点赞数" name="zanNum" type="Integer" xid="xid14"/>  
      <column label="评论数" name="pinNum" type="Integer" xid="xid15"/>  
      <data xid="default2">[{"id":"1","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"2","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"3","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"4","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"5","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"6","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"7","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"8","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"9","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"10","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"11","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"12","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"13","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"14","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7},{"id":"15","author":"李萌","dateline":"4分钟前","message":"在网络学习中，除了聆听教育专家和优秀老师的讲座，更可喜的是进一步加强和巩固我薄弱的课程。","title":"发展互联网工业，促进工业转型升级（上）","author2":"李某某","zanNum":144,"pinNum":7}]</data>
    </div>
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
        <div class="x-titlebar-right reverse"/> 
      </div> 
    </div>  
    <div class="x-panel-content" xid="content1"> 
      <div component="$UI/system/components/justep/contents/contents" class="x-contents x-full"
        active="0" xid="contents1"> 
        <div class="x-contents-content  x-scroll-view content_home" xid="content_home" onActive="content_homeActive"> 
          
  <div component="$UI/system/components/justep/panel/panel" class="x-panel x-full" xid="panel_home">
   <div class="x-panel-top" xid="top2"><div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified home_nav" tabbed="true" xid="buttonGroup_home"> 
                <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="最新资讯" xid="button_zixun"> 
                  <i xid="i5" />  
                  <span xid="span5" class="this">最新资讯</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="公告通知" xid="button_tongzhi"> 
                  <i xid="i6" />  
                  <span xid="span6">公告通知</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="网院简报" xid="button_jianbao"> 
                  <i xid="i7" />  
                  <span xid="span7">网院简报</span> 
                </a>  
                <a component="$UI/system/components/justep/button/button" class="btn btn-default" label="政策文件" xid="button_wenjian"> 
                  <i xid="i8" />  
                  <span xid="span8">政策文件</span> 
                </a> 
              </div></div>
   <div class="x-panel-content" xid="content2"><div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView" xid="scrollView1" onPullDown="scrollView1PullDown" onPullUp="scrollView1PullUp"> 
            <div class="x-content-center x-pull-down container" xid="div1"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i9" />  
              <span class="x-pull-down-label" xid="span13">下拉刷新...</span> 
            </div>  
            <div class="x-scroll-content" xid="div2"> 
                
              <div component="$UI/system/components/bootstrap/carousel/carousel" class="x-carousel" xid="carousel1" style="height:133px;" auto="true"> 
                <ol class="carousel-indicators" xid="ol1" />  
                <div class="x-contents carousel-inner" role="listbox" component="$UI/system/components/justep/contents/contents" active="0" slidable="true" wrap="true" swipe="true" routable="false" xid="contentsImg"> 
                  <div class="x-contents-content" xid="contentImg"> 
                    <img src="" alt="" xid="image1" class="tb-img1" bind-click="openPageClick" pagename="./detail.w" /> 
                  </div> 
                </div> 
              </div>  
              <div component="$UI/system/components/justep/list/list" class="x-list" xid="list1" data="news" limit="20"> 
                <ul class="x-list-template" xid="listTemplateUl1"> 
                  <li xid="li1" bind-click="li1Click"> 
                    <div component="$UI/system/components/justep/output/output" class="x-output title" xid="output_title" bind-ref='ref("title")' />  
                    <div component="$UI/system/components/justep/output/output" class="x-output message" xid="output_message" bind-ref='ref("description")' bind-visible="false"/>  
                    <div component="$UI/system/components/justep/output/output" class="x-output date" xid="output_date" bind-ref='ref("date")' /> 
                  </li> 
                </ul> 
              </div> 
            </div>  
            <div class="x-content-center x-pull-up" xid="div3"> 
              <span class="x-pull-up-label" xid="span14">加载更多...</span> 
            </div> 
          </div></div>
   </div></div>  
        <div class="x-contents-content content_study" xid="content_study" onActive="content_studyActive"> 
          <div xid="div4" class="title">          
            <span xid="span9"><![CDATA[课程频道]]></span> 
          </div>  
          <div xid="div5" class="course_list"> 
            <table class="table table-bordered table-hover table-striped" component="$UI/system/components/bootstrap/table/table"
              xid="table1"> 
              <tbody class="x-list-template" xid="listTemplate1"> 
                <tr xid="tr1"> 
                  <td xid="td1"> 
                    <div xid="div6"> 
                      <img src="$UI/whganjiao/img/class1.png" alt="" xid="image3"/>  
                      <span xid="span10"><![CDATA[时事热点]]></span> 
                    </div> 
                  </td>  
                  <td xid="td2"> 
                    <div xid="div7"> 
                      <img src="$UI/whganjiao/img/class2.png" alt="" xid="image4"/>  
                      <span xid="span11"><![CDATA[政治理论]]></span> 
                    </div> 
                  </td>  
                  <td xid="td3"> 
                    <div xid="div8"> 
                      <img src="$UI/whganjiao/img/class3.png" alt="" xid="image5"/>  
                      <span xid="span12"><![CDATA[公共管理]]></span> 
                    </div> 
                  </td> 
                </tr>  
                <tr xid="tr2"> 
                  <td xid="td4"> 
                    <div xid="div9"> 
                      <img src="$UI/whganjiao/img/class4.png" alt="" xid="image6"/>  
                      <span xid="span13"><![CDATA[经济管理]]></span> 
                    </div> 
                  </td>  
                  <td xid="td5"> 
                    <div xid="div10"> 
                      <img src="$UI/whganjiao/img/class5.png" alt="" xid="image7"/>  
                      <span xid="span14"><![CDATA[企业管理]]></span> 
                    </div> 
                  </td>  
                  <td xid="td6"> 
                    <div xid="div11"> 
                      <img src="$UI/whganjiao/img/class6.png" alt="" xid="image8"/>  
                      <span xid="span15"><![CDATA[党史建设]]></span> 
                    </div> 
                  </td> 
                </tr>  
                <tr xid="tr3"> 
                  <td xid="td7"> 
                    <div xid="div12"> 
                      <img src="$UI/whganjiao/img/class7.png" alt="" xid="image9"/>  
                      <span xid="span16"><![CDATA[法律法规]]></span> 
                    </div> 
                  </td>  
                  <td xid="td8"> 
                    <div xid="div13"> 
                      <img src="$UI/whganjiao/img/class8.png" alt="" xid="image10"/>  
                      <span xid="span17"><![CDATA[领导科学]]></span> 
                    </div> 
                  </td>  
                  <td xid="td9"> 
                    <div xid="div14"> 
                      <img src="$UI/whganjiao/img/class9.png" alt="" xid="image11"/>  
                      <span xid="span18"><![CDATA[人文素养]]></span> 
                    </div> 
                  </td> 
                </tr> 
              </tbody> 
            </table> 
          </div> 
        </div>  
        <div class="x-contents-content  x-scroll-view content_comm" xid="content_comm" onActive="content_commActive">
          <div class="x-scroll" component="$UI/system/components/justep/scrollView/scrollView"
            xid="scrollView_comm"> 
            <div class="x-content-center x-pull-down container" xid="div15"> 
              <i class="x-pull-down-img glyphicon x-icon-pull-down" xid="i10"/>  
              <span class="x-pull-down-label" xid="span19">下拉刷新...</span>
            </div>  
            <div class="x-scroll-content" xid="div16">
              <div component="$UI/system/components/justep/list/list" class="x-list"
                xid="list_comm" data="communicate" limit="5"> 
                <ul class="x-list-template" xid="listTemplateUl2"> 
                  <li xid="li2">
                    <div class="media" xid="media_comm1"> 
                      <div class="media-left" xid="mediaLeft1"> 
                        <a href="#" xid="a1"> 
                          <img class="media-object" src="$UI/whganjiao/img/user.png"
                            alt="" xid="image12"/>
                        </a> 
                      </div>  
                      <div class="media-body" xid="mediaBody1"> 
                        <div xid="div_info" class="info">
                          <div component="$UI/system/components/justep/output/output" class="x-output author" xid="output_comm_author" bind-ref="ref(&quot;author&quot;)" /><div component="$UI/system/components/justep/output/output" class="x-output date" xid="output_dateline" bind-ref="ref(&quot;dateline&quot;)" />
                        </div>  
                          
                        <div component="$UI/system/components/justep/output/output" class="x-output message" xid="output_txt" bind-ref='ref("message")'></div><div class="media detail" xid="media_orien"> 
                          <div class="media-body" xid="mediaBody2"> 
                            <div component="$UI/system/components/justep/output/output"
                              class="x-output title" xid="output_title1" bind-ref="ref(&quot;title&quot;)"/>  
                            <div component="$UI/system/components/justep/labelEdit/labelEdit" class="x-label-edit x-label30 author2" xid="labelEdit_author2">
   <label class="x-label" xid="label_author2"><![CDATA[讲师：]]></label>
   <div component="$UI/system/components/justep/output/output" class="x-output x-edit" xid="output_author2" bind-ref='ref("author2")'></div></div></div> 
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
          <div xid="div_user" class="div_user">
            <img src="$UI/whganjiao/img/user.png" alt="" xid="image_usericon"/>  
            <label xid="label_username"><![CDATA[请登录]]></label>            
          </div>
          <div xid="div_project" class="div_project same_me">
            <img src="$UI/whganjiao/img/daohang.png" alt="" xid="image_projecticon"/>  
            <label xid="label_project"><![CDATA[我的课程]]></label>  
          </div>
          <div xid="div_peixun" class="div_peixun same_me">
            <img src="$UI/whganjiao/img/rili.png" alt="" xid="image_peixunicon"/>  
            <label xid="label_peixun"><![CDATA[培训计划]]></label>  
          </div>
          <div xid="div_banji" class="same_me div_banji">
            <img src="$UI/whganjiao/img/laba.png" alt="" xid="image_banjiicon"/>  
            <label xid="label_banji"><![CDATA[班级公告]]></label> 
          </div>
          <div xid="div_dangan" class="div_dangan same_me">
            <img src="$UI/whganjiao/img/wenjianjia.png" alt="" xid="image_danganicon"/>  
            <label xid="label_dangan"><![CDATA[学习档案]]></label>  
          </div>
          <div xid="div_huancun" class="same_me div_huancun">
            <img src="$UI/whganjiao/img/huancun.png" alt="" xid="image_huancunicon"/>  
            <label xid="label_huancun"><![CDATA[离线缓存]]></label>  
          </div>
          <div xid="div_dayi" class="div_dayi same_me">
            <img src="$UI/whganjiao/img/zixun.png" alt="" xid="image_dayiicon"/>  
            <label xid="label_dayi"><![CDATA[咨询答疑]]></label>  
          </div>
          <div xid="div_shezhi" class="same_me div_shezhi">
            <img src="$UI/whganjiao/img/shezhi.png" alt="" xid="image_shezhiicon"/>  
            <label xid="label_shezhi"><![CDATA[设置]]></label>  
          </div>
        </div>
      </div> 
    </div>  
    <div class="x-panel-bottom" xid="bottom1"> 
      <div component="$UI/system/components/justep/button/buttonGroup" class="btn-group x-card btn-group-justified buttonGroup"
        tabbed="true" xid="buttonGroup1"> 
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="首页" xid="button_home" icon="linear linear-envelope" target="content_home">           
          <span xid="span1" class="this">首页</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="学习" xid="button_study" icon="linear linear-code" target="content_study">           
          <span xid="span2">学习</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="交流" xid="button_comm" icon="linear linear-dice" target="content_comm">          
          <span xid="span3">交流</span> 
        </a>  
        <a component="$UI/system/components/justep/button/button" class="btn btn-default btn-icon-top"
          label="个人" xid="button_user" icon="linear linear-chevronrightcircle" target="content_me">           
          <span xid="span4">个人</span> 
        </a> 
      </div> 
    </div> 
  </div> 
<resource xid="resource2"><require xid="require1" url="css!$UI/whganjiao/base"></require>
  <require xid="require2" url="$UI/whganjiao/jquery-1.10.2.min"></require></resource></div>

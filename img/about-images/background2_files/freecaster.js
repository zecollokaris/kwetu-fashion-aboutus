var fc_freecaster=true;function get_cookie(name)
{var cookies,key,val;cookies=document.cookie.split(";");for(var i=0;i<cookies.length;i++)
{key=cookies[i].substr(0,cookies[i].indexOf("="));val=cookies[i].substr(cookies[i].indexOf("=")+1);key=key.replace(/^\s+|\s+$/g,"");if(key==name)return decodeURIComponent(val);}
return null;}
function set_cookie(name,value,expire_seconds)
{value=encodeURIComponent(value);if(expire_seconds)
{var date=new Date();date.setTime(date.getTime()+expire_seconds*1000);value+="; expires="+date.toUTCString();}
value+="; path=/";document.cookie=name+"="+value;}
var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];var days_short=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];var months=['January','February','March','April','May','June','July','August','September','October','November','December'];var months_short=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];function strftime(format,timestamp)
{var date=new Date(timestamp*1000);var parts=format.split('%');var l=parts.length;var result=parts[0];var i,x,y;for(i=1;i<parts.length;i++)
{var part=parts[i];var option=part.charAt(0);part=part.substr(1);switch(option)
{case'a':result+=days_short[date.getDay()];break;case'A':result+=days[date.getDay()];break;case'd':x=date.getDate();if(x<10)result+='0';result+=x;break;case'e':x=date.getDate();if(x<10)result+=' ';result+=x;break;case'u':x=date.getDay();if(x==0)x=7;result+=x;break;case'w':result+=date.getDay();break;case'b':case'h':result+=months_short[date.getMonth()];break;case'B':result+=months[date.getMonth()];break;case'm':x=date.getMonth()+1;if(x<10)result+='0';result+=x;break;case'C':result+=Math.floor(date.getFullYear()/100);break;case'y':x=date.getFullYear()%100;if(x<10)result+='0';result+=x;break;case'Y':result+=date.getFullYear();break;case'H':x=date.getHours();if(x<10)result+='0';result+=x;break;case'I':x=date.getHours()%12;if(x<10)result+='0';result+=x;break;case'l':x=(date.getHours()+11)%12+1;if(x<10)result+=' ';result+=x;break;case'M':x=date.getMinutes();if(x<10)result+='0';result+=x;break;case'p':if(date.getHours()<12)result+='AM';else result+='PM';break;case'P':if(date.getHours()<12)result+='am';else result+='pm';break;case'r':y=date.getHours();x=y%12;if(x<10)result+='0';result+=x+':';x=date.getMinutes();if(x<10)result+='0';result+=x+':';x=date.getSeconds();if(x<10)result+='0';result+=x+' ';if(y<12)result+='AM';else result+='PM';break;case'R':x=date.getHours();if(x<10)result+='0';result+=x+':';x=date.getMinutes();if(x<10)result+='0';result+=x;break;case'S':x=date.getSeconds();if(x<10)result+='0';result+=x;break;case'T':x=date.getHours();if(x<10)result+='0';result+=x+':';x=date.getMinutes();if(x<10)result+='0';result+=x+':';x=date.getSeconds();if(x<10)result+='0';result+=x;break;case'X':result+=date.toLocaleTimeString();break;case'z':x=date.getTimezoneOffset();if(x<0)
{x=-x;result+='-';}
else
{result+='+';}
y=Math.floor(x/60);if(y<10)result+='0';result+=y;x=x%60;if(x<10)result+='0';result+=x;break;case'Z':var m;x=date.toString();if(m=x.match(/\((.*?)\)$/))
{result+=m[1];}
else if(m=x.match(/(GMT[+-][0-9]+)/))
{result+=m[1];}
break;case'c':result+=date.toLocaleString();break;case'D':x=date.getMonth()+1;if(x<10)result+='0';result+=x+'/';x=date.getDate();if(x<10)result+='0';result+=x+'/';x=date.getFullYear()%100;if(x<10)result+='0';result+=x;break;case'F':x=date.getFullYear()%100;if(x<10)result+='0';result+=x+'-';x=date.getMonth()+1;if(x<10)result+='0';result+=x+'-';x=date.getDate();if(x<10)result+='0';result+=x;break;case's':result+=Math.floor(date.getTime()/1000);break;case'x':result+=date.toLocaleDateString();break;}
result+=part;}
return result;}
var time_offset=parseInt(get_cookie("to"));var countdown_timer;window.fcTimeSet=function(){set_time_offset((time_server>0)?(time_server-new Date().getTime()):0);};if(time_offset)set_time_offset();else time_offset=0;if((typeof timezone_offset!="undefined")&&(timezone_offset==true))
{timezone_offset=new Date().getTimezoneOffset();set_cookie("tzo",timezone_offset);if(window.console!=undefined)console.log("Timezone offset: "+timezone_offset);}
jQuery(init_countdowns);function init_countdowns()
{(function($){$(".countdown_livedate").each(function(){var template=$(this).attr("data-livedate-template");if(template)
{$(this).html(strftime(template,$(this).attr("data-countdown-date")));}});})(jQuery);update_countdowns();start_countdown();}
function set_time_offset(to)
{if(to)
{time_offset=to;set_cookie("to",time_offset,1800);if(window.console!=undefined)
{console.log("Setting time offset: "+time_offset);}}
else if((time_offset)&&(window.console!=undefined))
{console.log("Time offset: "+time_offset);}
window.setTimeout(start_countdown,1100-(new Date().getTime()%1000));}
function start_countdown()
{if(countdown_timer)window.clearInterval(countdown_timer);countdown_timer=window.setInterval(update_countdowns,1000);}
function update_countdowns()
{(function($){$(".countdown_date").each(function(){var cd=$(this);var date=cd.attr("data-countdown-date")*1000;if((!time_offset)&&(window.time_server==undefined))
{window.time_server=0;if(window.time_server_url!=undefined)
{var js,id='fctimeserver';if(!document.getElementById(id))
{js=document.createElement('script');js.id=id;js.async=true;js.src=window.time_server_url;document.getElementsByTagName('head')[0].appendChild(js);}}
else
{$.ajax({url:"//time.akamai.com/",success:function(res){window.time_server=res*1000;setTimeout(function(){if((window.fcTimeSet)&&(!window.fcTimeSet.hasRun))
{window.fcTimeSet.hasRun=true;fcTimeSet();}},0);}});}}
if(date)
{var d=new Date();var left=Math.round((date-(d.getTime()+time_offset))/1000);if(left<0)left=0;var countdown;var remaining=left;var seconds=remaining%60;remaining=Math.floor(remaining/60);var minutes=remaining%60;remaining=Math.floor(remaining/60);var hours=remaining%24;var days=Math.floor(remaining/24);if(hours<10)hours="0"+hours;if(minutes<10)minutes="0"+minutes;if(seconds<10)seconds="0"+seconds;if((left>0)&&(cd.hasClass("live_now")))
{cd.removeClass("live_now");cd.attr("data-countdown-now",cd.html());}
if(!cd.hasClass("live_now"))
{var part_days=cd.find(".countdown_days");if(part_days.length>0)
{if(days<10)days="0"+days;part_days.text(days);cd.find(".countdown_hours").text(hours);cd.find(".countdown_minutes").text(minutes);cd.find(".countdown_seconds").text(seconds);}
else
{if(days>0)countdown=days+" days "+hours+":"+minutes+":"+seconds;else countdown=hours+":"+minutes+":"+seconds;var template;if(window.fcplayerCountdownTemplate)
{template=fcplayerCountdownTemplate(left,parseInt(days),parseInt(hours),parseInt(minutes),parseInt(seconds));}
if(!template)
{template=cd.attr("data-countdown-template");}
if(template)
{if(template.indexOf("%minutes")>=0)
{if(!days)template=template.replace(/^.*%hours/,"%hours");countdown=template.replace("%days",days).replace("%hours",hours).replace("%minutes",minutes).replace("%seconds",seconds);}
else if(template.indexOf("%MM")>=0)
{if(days<10)days="0"+days;countdown=template.replace("%DD",days).replace("%HH",hours).replace("%MM",minutes).replace("%SS",seconds);}
else
{countdown=template.replace("%s",countdown);}}
cd.html(countdown);}}
if(left>0)
{cd.removeClass("live_now").trigger("countdowntick",[left,new Date(date),days,hours,minutes,seconds]);}
else if(!cd.hasClass("live_now"))
{var countdown_now=cd.attr("data-countdown-now");if(countdown_now!="on")
{if(countdown_now)cd.html(countdown_now);cd.addClass("live_now").attr("data-countdown-now","on").trigger("livenow");}}}});})(jQuery);}
if(typeof window.onPlayerReady=="undefined")
{window._fcpr=window._fcpr||[];var fcpr_playerready=(typeof playerReady=='function')?playerReady:undefined;var fcpr_instances=[];try
{Object.defineProperty(_fcpr,"push",{configurable:false,enumerable:false,writable:false,value:function(){for(var i=0,n=this.length,l=arguments.length;i<l;i++,n++)
{var callback=arguments[i];this[n]=callback;for(var j=0;j<fcpr_instances.length;j++)
{try
{callback(fcpr_instances[j]);}
catch(e){}}}
return n;}});}
catch(e)
{var _l=_fcpr.length;setInterval(function(){for(;_l<_fcpr.length;_l++)
{var callback=_fcpr[_l];for(var j=0;j<fcpr_instances.length;j++)
{try
{callback(fcpr_instances[j]);}
catch(e){}}}},100);}
window.playerReady=function(obj,no_add)
{if(fcpr_playerready)fcpr_playerready.call(this,obj);if(!no_add)addPlayer(fcplayer(obj.id));};window.onPlayerReady=function(callback)
{_fcpr.push(callback);};window.addPlayer=function(player)
{fcpr_instances.push(player);for(var i=0;i<_fcpr.length;i++)
{try
{_fcpr[i].call(this,player);}
catch(e)
{if(window.console)console.log('FCPlayer PlayerReady callback exception',e);}}};}
onPlayerReady(function(p){var $=window.jQuery;var c=p.config();var id=(typeof p.id=="string")?p.id:p.id();if(c.debug)
{p.on("all",function(event,data){if((event=="time")||(event=="bufferChange"))return;console.log(event,data);});}
function ajax(url,on_success,on_error,args)
{if(window.jwplayer)
{jwplayer.utils.ajax(url,on_success,on_error,args);}
else
{$.ajax({url:url,success:function(data,status,xhr){on_success(xhr);},error:on_error});}}
function is_mobile()
{return navigator.userAgent.match(/(iP(hone|ad|od)|Android)/i);}
var LOCK_COUNTDOWN=0x01;var LOCK_LIVEDONE=0x02;var LOCK_PREMIUM=0x04;var LOCK_GEOLOCK=0x08;var source_url=window.source_url||((window.top==window)?window.location.href:document.referrer);var item=p.item();var config=p.config("freecaster");var container=$(p.getContainer());var lock=0;var had_controls=p.controls();var had_autoplay=p.autoplay()||!!config.autoplay;var has_played=false;var poster_width=640;container.find(".jw-overlays").addClass("fc-overlays");container.find(".jw-preview").addClass("fc-poster");if(!had_controls)container.addClass("fc-flag-controls-disabled");var _load=p.load;p.load=function(playlist)
{if(typeof playlist=="string")
{getVideo(playlist,function(item){_load.call(p,item);},function(error,url,xhr){throw"Could not load playlist: "+error;});}
else
{_load.call(p,playlist);}};var icon_hd=container.find(".jw-icon-hd");p.on("beforePlay buffer play",function(e){if(lock)p.stop(true);else if(e.type="play")has_played=true;}).on("playlistItem",function(e){has_played=false;poster_width=640;updatePosterframe(p.config("width"),p.config("height"));p.trigger("fcplayerUpdate",e.item);setTimeout(function(){if(lock)p.controls(false);},0);}).on("resize",function(e){updatePosterframe(e.width,e.height);}).on("meta",checkQualityMenu).on("time",function(e){var streamType=jwplayer.utils.streamType||jwplayer.utils.adaptiveType;var position_type=streamType(e.position);var duration_type=streamType(e.duration);container.toggleClass("fc-flag-live",(duration_type=="DVR")&&(position_type!="DVR"));container.toggleClass("fc-flag-dvr",(duration_type=="DVR")&&(position_type=="DVR"));}).on("levelsChanged",function(e){if(!e.currentQuality)return;icon_hd.addClass("fc-switching");}).on("visualQuality",function(e){var label=((e.level.label)&&(e.level.label!="auto"))?e.level.label:e.level.height+"p";icon_hd.attr("data-quality",label).removeClass("fc-switching");});icon_hd.attr("data-quality","Auto");if((config.servicepath)&&(!config.noactions))
{p.on("play",function(e){var item=p.item();if((p.currentTime()==0)&&(item)&&(item.mediaid))
{var img=document.createElement("img");img.src=config.servicepath+"action/play-0pc/"+item.mediaid+"?source_url="+encodeURIComponent(source_url);}}).on("complete",function(e){var item=p.item();if((item)&&(item.mediaid))
{var img=document.createElement("img");img.src=config.servicepath+"action/play-100pc/"+item.mediaid+"?source_url="+encodeURIComponent(source_url);}});}
var default_css=document.getElementById("fcplayer-css");if(!default_css)
{default_css=document.createElement("style");default_css.id="fcplayer-css";default_css.type="text/css";default_css.innerHTML=".fcplayer .countdown,.fcplayer .countdown_livedate,.fcplayer .countdown_date{cursor:default;display:none}.fcplayer > .fc-countdown .countdown_livedate,.fcplayer > .fc-countdown .countdown_date{display:block}.fcplayer > .fc-countdown:not(.jw-flag-audio-player) .countdown{display:block;pointer-events:all}.fcplayer .livedone{display:none}.fcplayer > .fc-livedone .livedone{display:block;pointer-events:all}.fcplayer .geolock{display:none}.fcplayer > .fc-geolock .geolock{display:block;pointer-events:all}.fcplayer .premium{display:none}.fcplayer .premium .premium_verify_container{display:none;margin:0 auto}.fcplayer .premium .premium_verify{animation:spin 2s linear infinite;-webkit-animation:spin 2s linear infinite;display:table-cell;font-family:\"jw-icons\";font-size:2em;line-height:1em;text-align:center;vertical-align:middle}.fcplayer .premium .premium_verify:before{content:\"\\e601\"}.fcplayer > .fc-premium:not(.fc-countdown):not(.fc-geolock) .premium{display:block;pointer-events:all;z-index:1}.fcplayer > .fc-premium.fc-premium-verifying .premium_unlock{display:none}.fcplayer > .fc-premium.fc-premium-verifying .premium_verify_container{display:table}.fcplayer .countdown_unlock{cursor:pointer;display:none}.fcplayer > .fc-premium.fc-countdown:not(.fc-premium-verifying):not(.fc-geolock) .countdown_unlock{display:block}.fcplayer > .fc-locked .jw-display-icon-container,.fcplayer > .fc-countdown .jw-title{display:none !important}.fcplayer > .fc-locked .fc-overlays{z-index:1}.fcplayer > .jw-flag-audio-player .jw-controls,.fcplayer > .fc-countdown:not(.jw-flag-user-inactive) .jw-controls,.fcplayer > .fc-livedone:not(.jw-flag-user-inactive) .jw-controls{display:block !important;visibility:visible !important;z-index:0}.fcplayer > .jw-flag-audio-player:not(.fc-flag-controls-disabled) .jw-controlbar,.fcplayer > .fc-countdown:not(.jw-flag-user-inactive):not(.fc-flag-controls-disabled) .jw-controlbar,.fcplayer > .fc-livedone:not(.jw-flag-user-inactive):not(.fc-flag-controls-disabled) .jw-controlbar{display:table !important}.fcplayer > .fc-locked .jw-icon-playback,.fcplayer > .fc-locked .jw-icon-rewind,.fcplayer > .fc-locked .jw-slider-time,.fcplayer > .fc-locked .jw-text-elapsed,.fcplayer > .fc-locked .jw-text-duration,.fcplayer > .fc-locked.fc-mobile .jw-controlbar{display:none !important}.fcplayer > .jw-flag-audio-player .countdown_livedate,.fcplayer > .jw-flag-audio-player .countdown_date{float:left;font:inherit;margin:0}.fcplayer > .jw-flag-audio-player .countdown_date{float:right;margin-right:0.5em}.fcplayer .livedone,.fcplayer .geolock{background:-webkit-linear-gradient(top, rgba(0,0,0,0) 0, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0) 100%);background:linear-gradient(to bottom, rgba(0,0,0,0) 0, rgba(0,0,0,0.75) 25%, rgba(0,0,0,0.75) 75%, rgba(0,0,0,0) 100%);left:0;padding:5em 0;position:absolute;right:0;text-align:center;top:50%;-webkit-transform:translateY(-50%);-moz-transform:translateY(-50%);-ms-transform:translateY(-50%);-o-transform:translateY(-50%);transform:translateY(-50%)}.fcplayer > .fc-flag-live .jw-controlbar-right-group .jw-text-duration,.fcplayer > .fc-flag-dvr .jw-controlbar-right-group .jw-text-duration{display:inline-block;height:2em;line-height:2em;overflow:hidden;padding:0;position:relative;text-indent:-10000px;width:5em}.fcplayer > .fc-flag-live .jw-controlbar-right-group .jw-text-duration:before,.fcplayer > .fc-flag-dvr .jw-controlbar-right-group .jw-text-duration:before{background:red;border-radius:100%;content:\" \";display:block;height:1em;left:0.7em;position:absolute;top:0.5em;-webkit-transition:background 0.2s ease;-moz-transition:background 0.2s ease;-ms-transition:background 0.2s ease;-o-transition:background 0.2s ease;transition:background 0.2s ease;width:1em}.fcplayer > .fc-flag-dvr .jw-controlbar-right-group .jw-text-duration:before{background:gray}.fcplayer > .fc-flag-live .jw-controlbar-right-group .jw-text-duration:after,.fcplayer > .fc-flag-dvr .jw-controlbar-right-group .jw-text-duration:after{content:\"LIVE\";display:block;position:absolute;right:0.7em;text-align:right;top:0}.fcplayer > .fc-flag-dvr .jw-controlbar-right-group .jw-text-duration:after{content:\"DVR\"}.fcplayer > .vjs-controls-disabled .vjs-poster{display:block !important}.fcplayer .jw-slider-horizontal,.fcplayer .jw-slider-vertical,.fcplayer .jw-menu,.fcplayer .jw-menu li{outline:none}";document.getElementsByTagName('head')[0].appendChild(default_css);}
container.on("mousemove",".countdown,.livedone,.geolock,.premium",function(e){var event=document.createEvent("MouseEvent");event.initMouseEvent("mousemove",true,true,window,null,0,0,0,0,false,false,false,false,0,null);container.find(".fc-overlays").get(0).dispatchEvent(event);});function checkQualityMenu(e)
{var qualities=container.find(".jw-icon-hd .jw-menu .jw-option");var prev_item;qualities.each(function(id,item){if(prev_item)
{if($(item).text()==$(prev_item).text())
{$(item).hide();}}
prev_item=item;})}
function getVideo(token,callback_success,callback_error)
{var player_config=p.config();var path=config.get_video_path||"get/video/%token/JW7?loc=%loc&source_url=%source_url";path=path.replace("%token",token).replace("%source_url",encodeURIComponent(source_url));if(player_config.loc)
{path=path.replace("%loc",player_config.loc);}
else
{path=path.replace("%loc","en_GB");}
ajax(config.player_root+path,function(xhr){var item=JSON.parse(xhr.responseText);item.mediaid=token;callback_success(item);p.trigger("fcplayerUpdate",item);},callback_error,true);}
function updatePosterframe(width,height)
{var citem=p.item();if(citem.mediaid==item.mediaid)citem=item;if(!citem.posterframes)return;var lr=0.0;var cwidth=0;for(cwidth in citem.posterframes)
{cwidth=parseInt(cwidth);if(cwidth==width)break;var cr=Math.abs(1.0/((cwidth/width)-1));if(cr<lr)break;lr=cr;}
if(cwidth>poster_width)
{poster_width=cwidth;var img=document.createElement("img");img.onload=function(){container.find(".fc-poster").css('backgroundImage','url("'+img.src+'")');};img.src=citem.image=citem.posterframes[cwidth];}}
function lockPlayer(lock_id)
{lock|=lock_id;container.addClass("fc-locked");p.controls(false);p.stop();if((lock&LOCK_COUNTDOWN)&&(has_played)&&(c.advertising)&&(c.advertising.tag))
{p.playAd(c.advertising.tag);}}
function unlockPlayer(lock_id)
{lock&=~lock_id;if(!lock)
{container.removeClass("fc-locked");if(had_controls)p.controls(true);if(had_autoplay)
{setTimeout(function(){p.play(true);},0);}
if((has_played)&&(c.advertising)&&(c.advertising.tag))
{p.playAd(c.advertising.tag);}
return true;}
return false;}
function updatePlayer()
{var item=p.item();if((!item)||((!item.live)&&(!item.countdown)))
{setTimeout(updatePlayer,10000);return;}
getVideo(item.mediaid,function(i){setTimeout(updatePlayer,10000);if(i.live_done!=item.live_done)
{item.live_done=i.live_done;livedoneUpdate(item);}
if(i.geolock!=item.geolock)
{item.geolock=i.geolock;geolockUpdate(item);}
if((i.countdown!=item.countdown)||(i.countdown_timestamp!=item.countdown_timestamp))
{item.countdown=i.countdown;item.countdown_timestamp=i.countdown_timestamp;countdownUpdate(item);}
item.premium=i.premium;premiumUpdate(item);},function(error,url,xhr){setTimeout(updatePlayer,60000);});}
setTimeout(updatePlayer,10000);var has_countdown=((item.countdown)&&(item.countdown_timestamp));var countdown_ticks=0;if(has_countdown)lockPlayer(LOCK_COUNTDOWN);var countdown=$("<div>").attr("id",id+"_freecaster_countdown");countdown.addClass("jw-reset countdown").css({height:"auto",top:0,right:0,bottom:0,left:0,position:"absolute",width:"auto"});var countdown_livedate=$("<div>").attr("id",id+"_freecaster_countdown_livedate").appendTo(countdown);countdown_livedate.addClass("countdown_livedate");countdown_livedate.html(strftime(config.template_livedate,item.countdown_timestamp));var countdown_date=$("<div>").attr("id",id+"_freecaster_countdown_date").appendTo(countdown);countdown_date.addClass("countdown_date");countdown_date.html("&nbsp;");countdown_date.attr("data-countdown-date",(has_countdown)?item.countdown_timestamp:0);countdown_date.attr("data-countdown-template",config.template_countdown);countdown_date.on("countdowntick",function(e,left,date){countdown_ticks++;countdownEnabled();}).on("livenow",function(e){p.trigger("fcplayerCountdownZero");countdownDisabled();});var countdown_unlock=$("<a>").addClass('countdown_unlock').appendTo(countdown);countdown_unlock.html(config.premium_unlock);countdown.appendTo(container.find(".fc-poster"));if(has_countdown)
{setTimeout(function(){countdownEnabled();init_countdowns();},0);}
countdownResize();p.on("playlistItem",function(e){countdownUpdate(e.item);}).on("resize",function(e){var dest=(e.height<=(is_mobile()?70:40))?container.find(".jw-controlbar-center-group"):countdown;if(countdown_livedate.parent().get(0)!=dest[0])
{countdown_date.prependTo(dest);countdown_livedate.prependTo(dest);}
setTimeout(countdownResize,0);});function countdownEnabled()
{if(!container.hasClass("fc-countdown"))
{has_countdown=true;container.addClass("fc-countdown");lockPlayer(LOCK_COUNTDOWN);}
p.trigger("fcplayerCountdownEnabled");}
function countdownDisabled()
{if(has_countdown)
{has_countdown=false;if((unlockPlayer(LOCK_COUNTDOWN))&&(had_autoplay)&&(countdown_ticks>3))
{p.one("buffer play",function(e){if(e.newstate=="playing")
{container.removeClass("fc-countdown");}});setTimeout(function(){container.removeClass("fc-countdown");},3000);}
else
{container.removeClass("fc-countdown");}
p.trigger("fcplayerCountdownDisabled");}}
function countdownUpdate(item)
{if((item.countdown)&&(item.countdown_timestamp))
{var template_livedate=countdown_livedate.attr("data-livedate-template");if(!template_livedate)template_livedate=config.template_livedate;countdown_livedate.html(strftime(template_livedate,item.countdown_timestamp));countdown_date.attr("data-countdown-date",item.countdown_timestamp).removeAttr("data-countdown-now");}
else
{countdown_date.attr("data-countdown-date",0);countdownDisabled();}}
function countdownResize()
{if(!container)return;countdown.css({fontSize:(container.height()/30)+"px"});}
var has_livedone=false;var livedone=$("<div>").attr("id",id+"_freecaster_livedone");livedone.addClass("jw-reset livedone");livedone.html(config.live_done_message);if(config.live_done_image)
{var livedone_img=$("<img>");livedone_img.attr("src",config.live_done_image);$("<br><br>").appendTo(livedone);livedone_img.appendTo(livedone);}
livedone.appendTo(container.find(".fc-poster"));if(item.live_done)livedoneEnable();livedoneResize();p.on("playlistItem",function(e){livedoneUpdate(e.item);}).on("resize",livedoneResize);function livedoneEnable()
{if(!has_livedone)
{has_livedone=true;container.addClass("fc-livedone");lockPlayer(LOCK_LIVEDONE);}}
function livedoneDisable()
{if(has_livedone)
{has_livedone=false;container.removeClass("fc-livedone");unlockPlayer(LOCK_LIVEDONE);}}
function livedoneUpdate(item)
{if(item.live_done)
{livedoneEnable();}
else
{livedoneDisable();}}
function livedoneResize()
{if(!container)return;livedone.css({fontSize:(container.height()/30)+"px"});}
var has_geolock=false;var _geolock=null;var geolock=$("<div>").attr("id",id+"_freecaster_geolock");geolock.addClass("jw-reset geolock");geolock.html(config.geolock_message);geolock.appendTo(container.find(".fc-poster"));geolockResize();p.on("playlistItem",function(e){geolockUpdate(e.item);}).on("resize",geolockResize);function geolockEnable()
{if(!has_geolock)
{has_geolock=true;container.addClass("fc-geolock");lockPlayer(LOCK_GEOLOCK);}
p.trigger("fcplayerGeolockEnabled");}
function geolockDisable()
{if(has_geolock)
{has_geolock=false;container.removeClass("fc-geolock");unlockPlayer(LOCK_GEOLOCK);p.trigger("fcplayerGeolockDisabled");}}
function geolockUpdate(item)
{var geolock=item.geolock;if(!geolock)geolock=null;if(geolock===_geolock)return;_geolock=geolock;if(!geolock)
{geolockDisable();return;}
ajax(config.servicepath+"geo/"+encodeURIComponent(geolock),function(xhr){var data=xhr.responseText.replace(/^\s+|\s+$/g,"");if(data=="KO")
{geolockEnable();}
else
{geolockDisable();}},function(error,url,xhr){_geolock=null;geolockDisable();setTimeout(function(){geolockUpdate(item);},10000);},true);}
function geolockResize()
{if(!container)return;geolock.css({fontSize:(container.height()/30)+"px"});}
var has_premium=false;var updatingToken=false;var firstUpdate=true;var premium=$("<div>").attr("id",id+"_freecaster_premium");premium.addClass("jw-reset premium");var premium_description=$("<p>").addClass("premium_desciption").appendTo(premium);var premium_unlock=$("<a>").addClass("premium_unlock").appendTo(premium);$('<div class="premium_verify_container"><div class="premium_verify"></div></div>').appendTo(premium);var premium_info=$("<a>").addClass("premium_info").appendTo(premium);premium.appendTo(container.find(".fc-poster"));if(item.premium)premiumEnable();premiumResize();p.on("playlistItem",function(e){premiumUpdate(e.item,true);tokenUpdate(e);}).on("resize",premiumResize).on("mediaError",function(e){if(e.message.indexOf("403")>0)
{var item=p.item();if(item.tokenized)
{item.tokenized=false;item.file=item.original_file;item.sources=duplicateArray(item.original_sources);premiumEnable();}}});function tokenUpdate(e)
{var item;if((e)&&(e.item))
{item=e.item;if(!item.original_file)
{item.original_file=item.file;item.original_sources=duplicateArray(item.sources);}}
else
{item=p.item();}
if((item.original_file)&&(item.original_file.indexOf("%TOKEN")<0))
{premiumDisable();return;}
if(updatingToken)return;updatingToken=true;if(firstUpdate)
{container.addClass("fc-premium-verifying");firstUpdate=false;}
if(!item.tokenized)
{premiumEnable();}
var streams=[];var i,h;var url=config.premium_token_url;if(!item.original_sources.length)
{h=item.original_file.indexOf("#");if(h>0)
{item.open_item=decodeURIComponent(item.original_file.substr(h+1));item.original_file=item.original_file.substr(0,h);}
i=item.original_file.indexOf("/",10);streams.push(getStreamPath(item.original_file.substr(i)));}
else
{for(i=0;i<item.original_sources.length;i++)
{h=item.original_sources[i].file.indexOf("#");if(h>0)
{item.open_item=decodeURIComponent(item.original_sources[i].file.substr(h+1));item.original_sources[i].file=item.original_sources[i].file.substr(0,h);}
streams.push(getStreamPath(item.original_sources[i].file));}}
var items=(item.premium&&item.premium.items)?item.premium.items:item.open_item;url+="?items="+encodeURIComponent(items);for(i=0;i<streams.length;i++)
{var stream=streams[i];url+="&streams[]="+encodeURIComponent(stream);}
ajax(url,function(xhr){var data=xhr.responseText.replace(/^\s+|\s+$/g,"");if(data)
{var lines=data.split("\n");var i;if(!item.sources.length)
{item.file=item.original_file.replace(streams[0],lines[0]);}
else
{for(i=0;i<item.sources.length;i++)
{item.sources[i].file=item.original_sources[i].file.replace(streams[i],lines[i]);}}
if(!item.tokenized)
{item.tokenized=true;p.load(item);}
premiumDisable();}
else
{if(item.tokenized)
{item.tokenized=false;item.file=item.original_file;item.sources=duplicateArray(item.original_sources);}
premiumEnable();}
setTimeout(tokenUpdate,30000);updatingToken=false;container.removeClass("fc-premium-verifying");},function(error,url,xhr){setTimeout(tokenUpdate,60000);updatingToken=false;container.removeClass("fc-premium-verifying");},{withCredentials:true});}
function duplicateArray(src)
{var ret=[];for(var i=0;i<src.length;i++)
{ret.push($.extend({},src[i]));}
return ret;}
function getStreamPath(url)
{var p=0;if(url.indexOf("//")!==0)
{p=url.indexOf("://");if(p<0)return url;}
p=url.indexOf("/",p+3);return url.substr(p);}
function premiumEnable()
{if(!has_premium)
{has_premium=true;container.addClass("fc-premium");lockPlayer(LOCK_PREMIUM);}
p.trigger("fcplayerPremiumEnabled");}
function premiumDisable()
{if(has_premium)
{has_premium=false;container.removeClass("fc-premium");unlockPlayer(LOCK_PREMIUM);p.trigger("fcplayerPremiumDisabled");}}
function premiumUpdate(item,first)
{if(first)firstUpdate=true;if(!item.premium)return;premium_description.html(item.premium.unlock_description);premium_info.html(item.premium.unlock_info_caption).attr("href",item.premium.unlock_info_url);premium_unlock.html(item.premium.unlock_caption).attr("href",item.premium.unlock_url);countdown_unlock.html(item.premium.unlock_caption).attr("href",item.premium.unlock_url);}
function premiumResize()
{if(!container)return;premium.css({fontSize:(container.height()/30)+"px"});}
if(config.watermark_path)
{var watermark=$("<a>").addClass("jw-reset watermark").attr("href",config.watermark_href).css({pointerEvents:"all"});var css={maxHeight:(config.watermark_h*100/360)+"%",maxWidth:(config.watermark_w*100/640)+"%",position:"absolute"};if(config.watermark_position.match(/bottom/))css.bottom="1em";else css.top="1em";if(config.watermark_position.match(/left/))css.left="1em";else css.right="1em";$("<img>").attr("src",config.watermark_path).css(css).appendTo(watermark);watermark.appendTo(container.find(".fc-overlays"));watermarkResize();p.on("resize",watermarkResize);function watermarkResize()
{if(!container)return;watermark.css({fontSize:(container.height()/30)+"px"});}}
var controlbar=container.find(".jw-controlbar");var slider_time=controlbar.find(".jw-slider-time");var slider_volume=controlbar.find(".jw-slider-volume");controlbar.find(".jw-slider-horizontal,.jw-slider-vertical").removeAttr("aria-hidden").attr("tabindex",0).attr("aria-valuemin",0).attr("aria-valuemax",100).attr("role","slider");slider_time.attr("aria-valuenow",0);slider_volume.attr("aria-valuenow",p.getVolume());if((window.fc_locale)&&(fc_locale.player))
{slider_volume.attr("aria-label",fc_locale.player.volume);}
controlbar.find(".jw-icon-cc,.jw-icon-audio-tracks").removeAttr("aria-hidden");container.removeAttr("tabindex");controlbar.find("[aria-hidden=true]").removeAttr("aria-label").removeAttr("tabindex");container.on("keydown",function(e){if(/13|37|39|38|40|67|77|70/.test(e.keyCode))
{e.stopPropagation();e.preventDefault();return false;}})
container.find("div[role=button],div[role=slider]").on("keydown",function(e){var el=$(this);if(e.keyCode==27)
{el.removeClass("jw-open");this.blur();return true;}
if((el.attr("role")=="button")&&((e.keyCode==32)||(e.keyCode==13)))
{if(el.hasClass("jw-icon-tooltip"))
{el.find(".jw-menu").attr("tabindex",0);el.find(".jw-menu li").attr("tabindex",0);if(e.target.className.match(/jw-item-/))
{var event=document.createEvent("MouseEvent");event.initMouseEvent("mousedown",true,true,window,null,0,0,0,0,false,false,false,false,0,null);e.target.dispatchEvent(event);setTimeout(function(){event.initMouseEvent("mouseup",true,true,window,null,0,0,0,0,false,false,false,false,0,null);e.target.dispatchEvent(event);},0);}
if(el.hasClass("jw-toggle"))
{el.toggleClass("jw-off");}
else
{el.toggleClass("jw-open");if(el.hasClass("jw-open"))
{el.find(".jw-menu .jw-active-option").focus();}}
el.triggerHandler("click");}
else if(el.hasClass("jw-icon-playback"))
{p.play();}
else if(el.hasClass("jw-icon-fullscreen"))
{p.setFullscreen();}
e.stopPropagation();return false;}
else if((el.attr("role")=="button")&&(el.hasClass("jw-icon-tooltip"))&&(el.find(".jw-menu").length)&&((e.keyCode==38)||(e.keyCode==40)))
{var menu_item=el.find(".jw-menu .jw-option:focus");var next_item;if(e.keyCode==38)
{next_item=menu_item.prev(".jw-option");}
else if(e.keyCode==40)
{next_item=menu_item.next(".jw-option");}
if((next_item)&&(next_item.length))
{next_item.focus();}
e.stopPropagation();return false;}
else if((el.attr("role")=="slider")||(el.hasClass("jw-icon-volume")))
{var volume=p.getVolume();var position=p.getPosition();var type=(el.hasClass("jw-icon-volume"))?"volume":this.className.match(/jw-slider-([a-z]+)/)[1];var inc_vol=0,inc_pos=0;switch(e.keyCode)
{case 0x21:if(type=="volume")
{inc_vol=50;}
else if(type=="time")
{inc_pos=30;}
break;case 0x22:if(type=="volume")
{inc_vol=-50;}
else if(type=="time")
{inc_pos=-30;}
break;case 0x23:if(type=="volume")
{inc_vol=-volume;}
else if(type=="time")
{inc_pos=-position;}
break;case 0x24:if(type=="volume")
{inc_vol=100-volume;}
break;case 0x25:case 0x28:if(type=="volume")
{inc_vol=-5;}
else if(type=="time")
{inc_pos=-10;}
break;case 0x26:case 0x27:if(type=="volume")
{inc_vol=5;}
else if(type=="time")
{inc_pos=10;}
break;}
if((!inc_vol)&&(!inc_pos))return;e.stopPropagation();if(inc_vol)
{if((inc_vol>0)&&(volume<100))
{volume=Math.min(100,volume+inc_vol);}
else if((inc_vol<0)&&(volume>0))
{volume=Math.max(0,volume+inc_vol);}
else
{return false;}
p.setVolume(volume);return false;}
if(inc_pos)
{if(inc_pos>0)
{position+=inc_pos;}
else if((inc_pos<0)&&(position>0))
{position=Math.max(0,position+inc_pos);}
else
{return false;}
p.play(true);p.seek(position);return false;}}
if(/13|32|37|39|38|40|67|77|70/.test(e.keyCode))
{e.stopPropagation();e.preventDefault();return false;}});container.on("mouseenter mouseleave click","[aria-expanded]",function(e){var el=$(this);setTimeout(function(){el.attr("aria-expanded",el.hasClass("jw-open")?"true":"false");},1);});setInterval(function(){if(container.find(":focus").length>0)
{var event=document.createEvent("MouseEvent");event.initMouseEvent("mousemove",true,true,window,null,0,0,0,0,false,false,false,false,0,null);container.find(".fc-overlays").get(0).dispatchEvent(event);}},500);p.on("playlistItem",function(e){slider_time.attr("aria-valuemax",p.getDuration());slider_time.attr("aria-valuenow",0);controlbar.find(".jw-icon").removeAttr("aria-expanded");controlbar.find(".jw-icon:not(.jw-toggle):not(.jw-icon-inline):not([aria-hidden=true])").attr("aria-expanded","false");});p.on("time",function(e){slider_time.attr("aria-valuemax",p.getDuration());slider_time.attr("aria-valuenow",e.position);}).on("volume",function(e){slider_volume.attr("aria-valuenow",e.volume);}).on("mute",function(e){slider_volume.attr("aria-valuenow",(e.mute)?p.getVolume():0);}).on("play",function(e){if((window.fc_locale)&&(fc_locale.player))
{controlbar.find(".jw-icon-playback").attr("aria-label",fc_locale.player.pause);}}).on("pause idle complete",function(e){if((window.fc_locale)&&(fc_locale.player))
{controlbar.find(".jw-icon-playback").attr("aria-label",fc_locale.player.play);}}).on("captionsList",function(e){if((window.fc_locale)&&(fc_locale.player))
{controlbar.find(".jw-icon-cc").attr("aria-label",(e.tracks.length>2)?fc_locale.player.captions:(p.getCurrentCaptions())?fc_locale.player.captions_on:fc_locale.player.captions_off);}}).on("captionsChanged",function(e){if((window.fc_locale)&&(fc_locale.player))
{controlbar.find(".jw-icon-cc").attr("aria-label",(e.tracks.length>2)?fc_locale.player.captions:(e.track)?fc_locale.player.captions_on:fc_locale.player.captions_off);}});if(item.youbora!==undefined)
{if(!item.youbora.username)
{var session_id=get_cookie("YBSID");if(!session_id)
{session_id=guid();set_cookie("YBSID",session_id,86400);}
item.youbora.username=session_id;}
if(!item.youbora.transactionCode)
{item.youbora.transactionCode=get_cookie("ref");}}
function guid()
{function s4()
{return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}
return s4()+s4()+'-'+s4()+'-'+s4()+'-'+s4()+'-'+s4()+s4()+s4();}});
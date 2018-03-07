jwplayer.api.events={JWPLAYER_READY:'jwplayerReady',JWPLAYER_FULLSCREEN:'jwplayerFullscreen',JWPLAYER_RESIZE:'jwplayerResize',JWPLAYER_ERROR:'jwplayerError',JWPLAYER_MEDIA_BEFOREPLAY:'jwplayerMediaBeforePlay',JWPLAYER_MEDIA_BEFORECOMPLETE:'jwplayerMediaBeforeComplete',JWPLAYER_COMPONENT_SHOW:'jwplayerComponentShow',JWPLAYER_COMPONENT_HIDE:'jwplayerComponentHide',JWPLAYER_MEDIA_BUFFER:'jwplayerMediaBuffer',JWPLAYER_MEDIA_BUFFER_FULL:'jwplayerMediaBufferFull',JWPLAYER_MEDIA_ERROR:'jwplayerMediaError',JWPLAYER_MEDIA_LOADED:'jwplayerMediaLoaded',JWPLAYER_MEDIA_COMPLETE:'jwplayerMediaComplete',JWPLAYER_MEDIA_SEEK:'jwplayerMediaSeek',JWPLAYER_MEDIA_TIME:'jwplayerMediaTime',JWPLAYER_MEDIA_VOLUME:'jwplayerMediaVolume',JWPLAYER_MEDIA_META:'jwplayerMediaMeta',JWPLAYER_MEDIA_MUTE:'jwplayerMediaMute',JWPLAYER_PLAYER_STATE:'jwplayerPlayerState',JWPLAYER_PLAYLIST_LOADED:'jwplayerPlaylistLoaded',JWPLAYER_PLAYLIST_ITEM:'jwplayerPlaylistItem',JWPLAYER_INSTREAM_CLICK:'jwplayerInstreamClicked',JWPLAYER_INSTREAM_DESTROYED:'jwplayerInstreamDestroyed',FCPLAYER_READY:'fcplayerReady',FCPLAYER_UPDATE:'fcplayerUpdate',FCPLAYER_COUNTDOWN_ENABLED:'fcplayerCountdownEnabled',FCPLAYER_COUNTDOWN_DISABLED:'fcplayerCountdownDisabled',FCPLAYER_COUNTDOWN_TICK:'fcplayerCountdownTick',FCPLAYER_COUNTDOWN_ZERO:'fcplayerCountdownZero',FCPLAYER_PREMIUM_ENABLED:'fcplayerPremiumEnabled',FCPLAYER_PREMIUM_DISABLED:'fcplayerPremiumDisabled',FCPLAYER_PREMIUM_HIDE:'fcplayerPremiumHide',FCPLAYER_CHAPTER_UPDATE:'fcplayerChapterUpdate',FCPLAYER_CHAPTER_MARKER:'fcplayerChapterMarker',FCPLAYER_CHAPTER_ENTER:'fcplayerChapterEnter',FCPLAYER_CHAPTER_LEAVE:'fcplayerChapterLeave',FCPLAYER_CHAPTER_SHOW:'fcplayerChapterShow',FCPLAYER_CHAPTER_HIDE:'fcplayerChapterHide',FCPLAYER_CHAPTER_CLICK:'fcplayerChapterClick',FCPLAYER_HOTSPOTS_LOADED:'fcplayerHotspotsLoaded',FCPLAYER_HOTSPOT_SHOW:'fcplayerHotspotShow',FCPLAYER_HOTSPOT_HIDE:'fcplayerHotspotHide',FCPLAYER_HOTSPOT_MOVE:'fcplayerHotspotMove',FCPLAYER_HOTSPOT_MOUSEENTER:'fcplayerHotspotMouseEnter',FCPLAYER_HOTSPOT_MOUSELEAVE:'fcplayerHotspotMouseLeave',FCPLAYER_HOTSPOT_CLICK:'fcplayerHotspotClick'};if(!Array.prototype.indexOf)
{Array.prototype.indexOf=function(obj,start){for(var i=(start||0),j=this.length;i<j;i++)
{if(this[i]===obj){return i;}}
return-1;}}
var _fcpr=_fcpr||[];_fcpr.unshift(function(p){var event_map={seek:"seeked","playlistLoaded":"playlist"};var event_warn={bufferFull:true,loaded:true,playlistUpdated:true,componentShow:"componentShow/Hide events are deprecated. Check for CSS classes instead.",componentHide:"componentShow/Hide events are deprecated. Check for CSS classes instead."};var on_state=[];var container=p.getContainer();function warn(msg,caller_line)
{if(window.console)
{if(typeof caller_line=="undefined")
{try
{caller_line=(new Error).stack.split("\n");caller_line="\n"+caller_line.slice(3,4).join("\n");}
catch(e)
{caller_line=null;}}
else if(caller_line===false)
{caller_line="";}
console.warn("[FCPlayer] "+msg,caller_line);}}
function translate_event(event)
{var new_event=event.replace(/jwplayer(Media|View)?/,"");new_event=new_event.charAt(0).toLowerCase()+new_event.slice(1);if(event_map[new_event])new_event=event_map[new_event];if(event_warn[new_event])
{if(event_warn[new_event]===true)console.warn("The "+event+" event is deprecated.");else console.warn(event_warn[new_event]);return;}
return new_event;}
function trigger_state(e)
{e.oldstate=e.oldstate.toUpperCase();e.newstate=e.newstate.toUpperCase();for(var i=0;i<on_state.length;i++)
{on_state[i].call(p,e);}}
p.on("play",function(e){e.newstate="playing";trigger_state(e);}).on("pause",function(e){e.newstate="paused";trigger_state(e);}).on("buffer",function(e){trigger_state(e);}).on("idle",function(e){e.newstate="idle";trigger_state(e);});p.eventListener=function(e,c){var e2=translate_event(e);warn(".eventListener('"+e+"') is deprecated. Please use .on('"+e2+"') instead.");switch(e2)
{case"playerState":on_state.push(c);break;default:p.on(e2,c);}};p.removeEventListener=function(e,c){var e2=translate_event(e);warn(".removeEventListener('"+e+"') is deprecated. Please use .off('"+e2+"') instead.");switch(e2)
{case"playerState":var i=on_state.indexOf(c);if(i>=0)on_state.splice(i,1);break;default:p.off(e2,c);}};var _getPlugin=p.getPlugin;p.getPlugin=function(plugin){if(plugin=="controlbar")
{warn(".getPlugin('"+plugin+"') is deprecated. Use CSS or embed parameters instead.");return{show:function(){jQuery(container).find(".jw-controlbar").show();},hide:function(){jQuery(container).find(".jw-controlbar").hide();}};}
return _getPlugin.call(p,plugin);};if(typeof playerReady=="function")
{if(typeof fcpr_playerready!=="undefined")
{warn("playerReady() is deprecated.",false);}
var e={id:p.id};playerReady(e,true);}
if(typeof fcplayerReady=="function")
{warn("fcplayerReady() is deprecated.",false);fcplayerReady(p);}});
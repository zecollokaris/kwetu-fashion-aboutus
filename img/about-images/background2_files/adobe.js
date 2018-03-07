onPlayerReady(function(player){var config=(!!(player.config&&player.config.constructor&&player.config.call&&player.config.apply))?player.config("fc_aa"):player.config.fc_aa;if((!config)||(!config.server))return;var dataMapping=config.data_mapping;var item;var playing=false;var video_id=null;var s=AppMeasurement.getInstance(config.rsid);var v=Visitor.getInstance(config.mcorgid);s.visitorNamespace=config.namespace;s.trackingServer=v.trackingServer=config.server;s.trackingServerSecure=v.trackingServerSecure=config.server_ssl;s.dc="122";s.visitor=v;if(player.config.debug)s.debugTracking=true;s.trackLocal=true;s.loadModule("Media");s.Media.trackUsingContextData=true;if(config.custom_vars)
{s.Media.monitor=function(s,media){var i,v,val;var vars=[],keys=[];for(v in config.custom_vars)
{switch(v)
{case"source":val=top.document.location.hostname.replace(/^www\./,"");break;case"type":val=((item.live)||(item.duration<0))?"Live":((item.countdown_date)?"Replay":"VOD");break;}
vars.push(config.custom_vars[v]);keys=config.custom_vars[v].split(",");for(i=0;i<keys.length;i++)
{s[keys[i]]=val;}}
s.trackingVars=vars.join(",");};}
player.onPlaylistItem(function(e){var playlist=player.getPlaylist();var contextDataMapping=dataMapping;item=playlist[e.index];video_id=item.video_id||item.mediaid;if(!item.live)
{var milestones=[];for(var i in config.milestones)milestones.push(i);contextDataMapping['a.media.milestones']=config.milestones;s.Media.trackSeconds=false;s.Media.trackMilestones=milestones.join(",");}
else
{s.Media.trackSeconds=15;s.Media.trackMilestones=false;}
s.Media.contextDataMapping=contextDataMapping;s.Media.open(video_id+":"+item.title,(item.live)?-1:item.duration,"FCPlayer");playing=true;});player.onBuffer(function(e){if(!playing)return;s.Media.stop(item.video_id+":"+item.title,player.getPosition());});player.onComplete(function(e){if(!playing)return;s.Media.stop(video_id+":"+item.title,player.getPosition());s.Media.close(video_id+":"+item.title);playing=false;});player.onIdle(function(e){if(!playing)return;s.Media.stop(video_id+":"+item.title,player.getPosition());s.Media.close(video_id+":"+item.title);playing=false;});player.onPause(function(e){s.Media.stop(video_id+":"+item.title,player.getPosition());});player.onPlay(function(e){var pos;if(!playing)
{s.Media.open(video_id+":"+item.title,(item.live)?-1:item.duration,"FCPlayer");playing=true;pos=0;}
else
{pos=player.getPosition();if(isNaN(pos))pos=0;}
s.Media.play(video_id+":"+item.title,pos);});player.onSeek(function(e){s.Media.stop(video_id+":"+item.title,e.position);s.Media.play(video_id+":"+item.title,e.offset);});var hb=setInterval(function(){if((playing)&&(fcplayer(player.id)===null))
{s.Media.stop(video_id+":"+item.title,player.getPosition());s.Media.close(video_id+":"+item.title);playing=false;clearInterval(hb);}},1000);});
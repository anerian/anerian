var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;

if( IE6 ) {
  alert("We are very sorry IE6 is no longer a supported browser.  Please Upgrade");
}

var openMenuId = null;

function ID(id) { return document.getElementById(id); }

function openMenu(id) {
  if( openMenuId ) { ID(openMenuId).style.display = "none"; releaseCloseEvent(); }
  ID(id).style.display = "block";
  openMenuId = id;
  attachCloseEvent();
  return false;
}

function closeMenu(e) {
  var evt = e || window.event;
  var menu = ID(openMenuId);
  var root = ID(openMenuId + '-root');
  var target = evt.target || evt.srcElement;
  if( !isParent(target, menu) && !isParent(target, root) ) {
    if( openMenuId ) { ID(openMenuId).style.display = "none"; }
    releaseCloseEvent();
    openMenuId = null;
  }
}

function attachCloseEvent() {
  try {
    attachEvt(document.body,'click', closeMenu);
  } catch( e ) {
    console.error(e);
  }
}

function releaseCloseEvent() {
  detachEvt(document.body,'click', closeMenu);
}

function isParent(chkEl,topEl) {
  if( chkEl == topEl ) { return true; }
  while( chkEl && chkEl.parentNode != topEl && chkEl != document.body ) {
    chkEl = chkEl.parentNode;
  }
  return (chkEl != document.body);
}
// find the first non text node parent
function parentEl(el) {
  while( el && el.parentNode && el.parentNode.nodeType != 1 ) {
    el = el.parentNode;
  }
  return el.parentNode;
}

// xb event handlers
function attachEvt(el,evt,hdlr) {
  if( document.addEventListener )
    el.addEventListener(evt,hdlr,false); 
  else
    el.attachEvent("on"+evt,hdlr);
}
function detachEvt(el,evt,hdlr) {
  if( document.addEventListener )
    el.removeEventListener(evt,hdlr,false);
  else
    el.detachEvent("on"+evt,hdlr);
}
if( !Function.prototype.bind ) {
  Function.prototype.bind = function () {
    var args = new Array();
    var __method = this;
    for( var i = 0, len = arguments.length; i < len; ++i ) { args.push(arguments[i]); }
    var object = args.shift();
    return function() {
      return __method.apply(object, args);
    }
  }
}

function log(msg) {
  ID('debug').innerHTML += msg + "<br/>";
}

function loadVideo(vid) {
  var video = ID(vid.id);
  if( video && video.play ) {
    // we're html5 cool, maybe we should break out the canvas tag for some hotness? yeah, v2 cool
    if( vid.autoplay == true || vid.autoplay == "true" ) { video.play(); }
    else {
      video.setAttribute("controls","on");
      ID(vid.id.replace(/-video$/,'-splash')).parentNode.removeChild(ID(vid.id.replace(/-video$/,'-splash')));
    }
  }
  else {
    // load up the flash
     /* Copyright 2009 Flowplayer Oy */
     (function(){function g(o){console.log("$f.fireEvent",[].slice.call(o))}function k(q){if(!q||typeof q!="object"){return q}var o=new q.constructor();for(var p in q){if(q.hasOwnProperty(p)){o[p]=k(q[p])}}return o}function m(t,q){if(!t){return}var o,p=0,r=t.length;if(r===undefined){for(o in t){if(q.call(t[o],o,t[o])===false){break}}}else{for(var s=t[0];p<r&&q.call(s,p,s)!==false;s=t[++p]){}}return t}function c(o){return ID(o)}function i(q,p,o){if(typeof p!="object"){return q}if(q&&p){m(p,function(r,s){if(!o||typeof s!="function"){q[r]=s}})}return q}function n(s){var q=s.indexOf(".");if(q!=-1){var p=s.substring(0,q)||"*";var o=s.substring(q+1,s.length);var r=[];m(document.getElementsByTagName(p),function(){if(this.className&&this.className.indexOf(o)!=-1){r.push(this)}});return r}}function f(o){o=o||window.event;if(o.preventDefault){o.stopPropagation();o.preventDefault()}else{o.returnValue=false;o.cancelBubble=true}return false}function j(q,o,p){q[o]=q[o]||[];q[o].push(p)}function e(){return"_"+(""+Math.random()).substring(2,10)}var h=function(t,r,s){var q=this;var p={};var u={};q.index=r;if(typeof t=="string"){t={url:t}}i(this,t,true);m(("Begin*,Start,Pause*,Resume*,Seek*,Stop*,Finish*,LastSecond,Update,BufferFull,BufferEmpty,BufferStop").split(","),function(){var v="on"+this;if(v.indexOf("*")!=-1){v=v.substring(0,v.length-1);var w="onBefore"+v.substring(2);q[w]=function(x){j(u,w,x);return q}}q[v]=function(x){j(u,v,x);return q};if(r==-1){if(q[w]){s[w]=q[w]}if(q[v]){s[v]=q[v]}}});i(this,{onCuepoint:function(x,w){if(arguments.length==1){p.embedded=[null,x];return q}if(typeof x=="number"){x=[x]}var v=e();p[v]=[x,w];if(s.isLoaded()){s._api().fp_addCuepoints(x,r,v)}return q},update:function(w){i(q,w);if(s.isLoaded()){s._api().fp_updateClip(w,r)}var v=s.getConfig();var x=(r==-1)?v.clip:v.playlist[r];i(x,w,true)},_fireEvent:function(v,y,w,A){if(v=="onLoad"){m(p,function(B,C){if(C[0]){s._api().fp_addCuepoints(C[0],r,B)}});return false}A=A||q;if(v=="onCuepoint"){var z=p[y];if(z){return z[1].call(s,A,w)}}if(v=="onStart"||v=="onUpdate"){i(A,y);if(!A.duration){A.duration=y.metaData.duration}else{A.fullDuration=y.metaData.duration}}var x=true;m(u[v],function(){x=this.call(s,A,y,w)});return x}});if(t.onCuepoint){var o=t.onCuepoint;q.onCuepoint.apply(q,typeof o=="function"?[o]:o);delete t.onCuepoint}m(t,function(v,w){if(typeof w=="function"){j(u,v,w);delete t[v]}});if(r==-1){s.onCuepoint=this.onCuepoint}};var l=function(p,r,q,t){var s={};var o=this;var u=false;if(t){i(s,t)}m(r,function(v,w){if(typeof w=="function"){s[v]=w;delete r[v]}});i(this,{animate:function(y,z,x){if(!y){return o}if(typeof z=="function"){x=z;z=500}if(typeof y=="string"){var w=y;y={};y[w]=z;z=500}if(x){var v=e();s[v]=x}if(z===undefined){z=500}r=q._api().fp_animate(p,y,z,v);return o},css:function(w,x){if(x!==undefined){var v={};v[w]=x;w=v}r=q._api().fp_css(p,w);i(o,r);return o},show:function(){this.display="block";q._api().fp_showPlugin(p);return o},hide:function(){this.display="none";q._api().fp_hidePlugin(p);return o},toggle:function(){this.display=q._api().fp_togglePlugin(p);return o},fadeTo:function(y,x,w){if(typeof x=="function"){w=x;x=500}if(w){var v=e();s[v]=w}this.display=q._api().fp_fadeTo(p,y,x,v);this.opacity=y;return o},fadeIn:function(w,v){return o.fadeTo(1,w,v)},fadeOut:function(w,v){return o.fadeTo(0,w,v)},getName:function(){return p},getPlayer:function(){return q},_fireEvent:function(w,v,x){if(w=="onUpdate"){var y=q._api().fp_getPlugin(p);if(!y){return}i(o,y);delete o.methods;if(!u){m(y.methods,function(){var A=""+this;o[A]=function(){var B=[].slice.call(arguments);var C=q._api().fp_invoke(p,A,B);return C=="undefined"?o:C}});u=true}}var z=s[w];if(z){z.apply(o,v);if(w.substring(0,1)=="_"){delete s[w]}}}})};function b(o,t,z){var E=this,y=null,x,u,p=[],s={},B={},r,v,w,D,A,q;i(E,{id:function(){return r},isLoaded:function(){return(y!==null)},getParent:function(){return o},hide:function(F){if(F){o.style.height="0px"}if(y){y.style.height="0px"}return E},show:function(){o.style.height=q+"px";if(y){y.style.height=A+"px"}return E},isHidden:function(){return y&&parseInt(y.style.height,10)===0},load:function(F){if(!y&&E._fireEvent("onBeforeLoad")!==false){m(a,function(){this.unload()});x=o.innerHTML;if(x&&!flashembed.isSupported([9,0])){wrappper.innerHTML=""}flashembed(o,t,{config:z});if(F){F.cached=true;j(B,"onLoad",F)}}return E},unload:function(){try{if(!y||y.fp_isFullscreen()){return E}}catch(F){return E}if(x.replace(/\s/g,"")!==""){if(E._fireEvent("onBeforeUnload")===false){return false}y.fp_close();y=null;o.innerHTML=x;E._fireEvent("onUnload")}return E},getClip:function(F){if(F===undefined){F=D}return p[F]},getCommonClip:function(){return u},getPlaylist:function(){return p},getPlugin:function(F){var H=s[F];if(!H&&E.isLoaded()){var G=E._api().fp_getPlugin(F);if(G){H=new l(F,G,E);s[F]=H}}return H},getScreen:function(){return E.getPlugin("screen")},getControls:function(){return E.getPlugin("controls")},getConfig:function(F){return F?k(z):z},getFlashParams:function(){return t},loadPlugin:function(I,H,K,J){if(typeof K=="function"){J=K;K={}}var G=J?e():"_";E._api().fp_loadPlugin(I,H,K,G);var F={};F[G]=J;var L=new l(I,null,E,F);s[I]=L;return L},getState:function(){return y?y.fp_getState():-1},play:function(F){function G(){if(F!==undefined){E._api().fp_play(F)}else{E._api().fp_play()}}if(y){G()}else{E.load(function(){G()})}return E},getVersion:function(){var G="flowplayer.js 3.1.0";if(y){var F=y.fp_getVersion();F.push(G);return F}return G},_api:function(){if(!y){throw"Flowplayer "+E.id()+" not loaded when calling an API method"}return y},setClip:function(F){E.setPlaylist([F]);return E},getIndex:function(){return w}});m(("Click*,Load*,Unload*,Keypress*,Volume*,Mute*,Unmute*,PlaylistReplace,Fullscreen*,FullscreenExit,Error").split(","),function(){var F="on"+this;if(F.indexOf("*")!=-1){F=F.substring(0,F.length-1);var G="onBefore"+F.substring(2);E[G]=function(H){j(B,G,H);return E}}E[F]=function(H){j(B,F,H);return E}});m(("pause,resume,mute,unmute,stop,toggle,seek,getStatus,getVolume,setVolume,getTime,isPaused,isPlaying,startBuffering,stopBuffering,isFullscreen,reset,close,setPlaylist").split(","),function(){var F=this;E[F]=function(G){if(!y){return E}var H=(G===undefined)?y["fp_"+F]():y["fp_"+F](G);return H=="undefined"?E:H}});E._fireEvent=function(O){if(typeof O=="string"){O=[O]}var P=O[0];var L=O[1];var K=O[2];var J=O[3];if(z.debug){g(O)}if(!y&&P=="onLoad"&&L=="player"){y=y||c(v);A=y.clientHeight;m(p,function(){this._fireEvent("onLoad")});m(s,function(Q,R){R._fireEvent("onUpdate")});u._fireEvent("onLoad")}if(P=="onLoad"&&L!="player"){return}if(P=="onError"){if(typeof L=="string"||(typeof L=="number"&&typeof K=="number")){L=K;K=J}}if(P=="onContextMenu"){m(z.contextMenu[L],function(Q,R){R.call(E)});return}if(P=="onPluginEvent"){var F=L.name||L;var G=s[F];if(G){G._fireEvent("onUpdate",L);G._fireEvent(K,O.slice(3))}return}if(P=="onPlaylistReplace"){p=[];var M=0;m(L,function(){p.push(new h(this,M++,E))})}var N=true;if(typeof L=="number"&&L<p.length){D=L;var H=p[L];if(H){N=H._fireEvent(P,K,J)}if(!H||N!==false){N=u._fireEvent(P,K,J,H)}}var I=0;m(B[P],function(){N=this.call(E,L,K);if(this.cached){B[P].splice(I,1)}if(N===false){return false}I++});return N};function C(){if($f(o)){$f(o).getParent().innerHTML="";w=$f(o).getIndex();a[w]=E}else{a.push(E);w=a.length-1}q=parseInt(o.style.height,10)||o.clientHeight;if(typeof t=="string"){t={src:t}}r=o.id||"fp"+e();v=t.id||r+"_api";t.id=v;z.playerId=r;if(typeof z=="string"){z={clip:{url:z}}}if(typeof z.clip=="string"){z.clip={url:z.clip}}z.clip=z.clip||{};if(o.getAttribute("href",2)&&!z.clip.url){z.clip.url=o.getAttribute("href",2)}u=new h(z.clip,-1,E);z.playlist=z.playlist||[z.clip];var F=0;m(z.playlist,function(){var H=this;if(typeof H=="object"&&H.length){H={url:""+H}}m(z.clip,function(I,J){if(J!==undefined&&H[I]===undefined&&typeof J!="function"){H[I]=J}});z.playlist[F]=H;H=new h(H,F,E);p.push(H);F++});m(z,function(H,I){if(typeof I=="function"){j(B,H,I);delete z[H]}});m(z.plugins,function(H,I){if(I){s[H]=new l(H,I,E)}});if(!z.plugins||z.plugins.controls===undefined){s.controls=new l("controls",null,E)}s.canvas=new l("canvas",null,E);t.bgcolor=t.bgcolor||"#000000";t.version=t.version||[9,0];t.expressInstall="http://www.flowplayer.org/swf/expressinstall.swf";function G(H){if(!E.isLoaded()&&E._fireEvent("onBeforeClick")!==false){E.load()}return f(H)}x=o.innerHTML;if(x.replace(/\s/g,"")!==""){if(o.addEventListener){o.addEventListener("click",G,false)}else{if(o.attachEvent){o.attachEvent("onclick",G)}}}else{if(o.addEventListener){o.addEventListener("click",f,false)}E.load()}}if(typeof o=="string"){flashembed.domReady(function(){var F=c(o);if(!F){throw"Flowplayer cannot access element: "+o}else{o=F;C()}})}else{C()}}var a=[];function d(o){this.length=o.length;this.each=function(p){m(o,p)};this.size=function(){return o.length}}window.flowplayer=window.$f=function(){var p=null;var o=arguments[0];if(!arguments.length){m(a,function(){if(this.isLoaded()){p=this;return false}});return p||a[0]}if(arguments.length==1){if(typeof o=="number"){return a[o]}else{if(o=="*"){return new d(a)}m(a,function(){if(this.id()==o.id||this.id()==o||this.getParent()==o){p=this;return false}});return p}}if(arguments.length>1){var r=arguments[1];var q=(arguments.length==3)?arguments[2]:{};if(typeof o=="string"){if(o.indexOf(".")!=-1){var t=[];m(n(o),function(){t.push(new b(this,k(r),k(q)))});return new d(t)}else{var s=c(o);return new b(s!==null?s:o,r,q)}}else{if(o){return new b(o,r,q)}}}return null};i(window.$f,{fireEvent:function(){var o=[].slice.call(arguments);var q=$f(o[0]);return q?q._fireEvent(o.slice(1)):null},addPlugin:function(o,p){b.prototype[o]=p;return $f},each:m,extend:i});if(document.all){window.onbeforeunload=function(){$f("*").each(function(){if(this.isLoaded()){this.close()}})}}if(typeof jQuery=="function"){jQuery.prototype.flowplayer=function(q,p){if(!arguments.length||typeof arguments[0]=="number"){var o=[];this.each(function(){var r=$f(this);if(r){o.push(r)}});return arguments.length?o[arguments[0]]:new d(o)}return this.each(function(){$f(this,k(q),p?k(p):{})})}}})();(function(){var e=typeof jQuery=="function";function i(){if(c.done){return false}var k=document;if(k&&k.getElementsByTagName&&k.getElementById&&k.body){clearInterval(c.timer);c.timer=null;for(var j=0;j<c.ready.length;j++){c.ready[j].call()}c.ready=null;c.done=true}}var c=e?jQuery:function(j){if(c.done){return j()}if(c.timer){c.ready.push(j)}else{c.ready=[j];c.timer=setInterval(i,13)}};function f(k,j){if(j){for(key in j){if(j.hasOwnProperty(key)){k[key]=j[key]}}}return k}function g(j){switch(h(j)){case"string":j=j.replace(new RegExp('(["\\\\])',"g"),"\\$1");j=j.replace(/^\s?(\d+)%/,"$1pct");return'"'+j+'"';case"array":return"["+b(j,function(m){return g(m)}).join(",")+"]";case"function":return'"function()"';case"object":var k=[];for(var l in j){if(j.hasOwnProperty(l)){k.push('"'+l+'":'+g(j[l]))}}return"{"+k.join(",")+"}"}return String(j).replace(/\s/g," ").replace(/\'/g,'"')}function h(k){if(k===null||k===undefined){return false}var j=typeof k;return(j=="object"&&k.push)?"array":j}if(window.attachEvent){window.attachEvent("onbeforeunload",function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){}})}function b(j,m){var l=[];for(var k in j){if(j.hasOwnProperty(k)){l[k]=m(j[k])}}return l}function a(q,s){var o=f({},q);var r=document.all;var m='<object width="'+o.width+'" height="'+o.height+'"';if(r&&!o.id){o.id="_"+(""+Math.random()).substring(9)}if(o.id){m+=' id="'+o.id+'"'}o.src+=((o.src.indexOf("?")!=-1?"&":"?")+Math.random());if(o.w3c||!r){m+=' data="'+o.src+'" type="application/x-shockwave-flash"'}else{m+=' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'}m+=">";if(o.w3c||r){m+='<param name="movie" value="'+o.src+'" />'}o.width=o.height=o.id=o.w3c=o.src=null;for(var j in o){if(o[j]!==null){m+='<param name="'+j+'" value="'+o[j]+'" />'}}var n="";if(s){for(var l in s){if(s[l]!==null){n+=l+"="+(typeof s[l]=="object"?g(s[l]):s[l])+"&"}}n=n.substring(0,n.length-1);m+='<param name="flashvars" value=\''+n+"' />"}m+="</object>";return m}function d(l,o,k){var j=flashembed.getVersion();f(this,{getContainer:function(){return l},getConf:function(){return conf},getVersion:function(){return j},getFlashvars:function(){return k},getApi:function(){return l.firstChild},getHTML:function(){return a(o,k)}});var p=o.version;var q=o.expressInstall;var n=!p||flashembed.isSupported(p);if(n){o.onFail=o.version=o.expressInstall=null;l.innerHTML=a(o,k)}else{if(p&&q&&flashembed.isSupported([6,65])){f(o,{src:q});k={MMredirectURL:location.href,MMplayerType:"PlugIn",MMdoctitle:document.title};l.innerHTML=a(o,k)}else{if(l.innerHTML.replace(/\s/g,"")!==""){}else{l.innerHTML="<h2>Flash version "+p+" or greater is required</h2><h3>"+(j[0]>0?"Your version is "+j:"You have no flash plugin installed")+"</h3>"+(l.tagName=="A"?"<p>Click here to download latest version</p>":"<p>Download latest version from <a href='http://www.adobe.com/go/getflashplayer'>here</a></p>");if(l.tagName=="A"){l.href="http://www.adobe.com/go/getflashplayer"}}}}if(!n&&o.onFail){var m=o.onFail.call(this);if(typeof m=="string"){l.innerHTML=m}}}window.flashembed=function(k,l,j){if(typeof k=="string"){var m=ID(k);if(m){k=m}else{c(function(){flashembed(k,l,j)});return}}if(!k){return}var n={width:"100%",height:"100%",allowFullScreen:true,allowscriptaccess:"always",quality:"high",version:null,onFail:null,expressInstall:null,w3c:false};if(typeof l=="string"){l={src:l}}f(n,l);return new d(k,n,j)};f(window.flashembed,{getVersion:function(){var l=[0,0];if(navigator.plugins&&typeof navigator.plugins["Shockwave Flash"]=="object"){var k=navigator.plugins["Shockwave Flash"].description;if(typeof k!="undefined"){k=k.replace(/^.*\s+(\S+\s+\S+$)/,"$1");var m=parseInt(k.replace(/^(.*)\..*$/,"$1"),10);var q=/r/.test(k)?parseInt(k.replace(/^.*r(.*)$/,"$1"),10):0;l=[m,q]}}else{if(window.ActiveXObject){try{var o=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(p){try{o=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");l=[6,0];o.AllowScriptAccess="always"}catch(j){if(l[0]==6){return}}try{o=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(n){}}if(typeof o=="object"){k=o.GetVariable("$version");if(typeof k!="undefined"){k=k.replace(/^\S+\s+(.*)$/,"$1").split(",");l=[parseInt(k[0],10),parseInt(k[2],10)]}}}}return l},isSupported:function(j){var l=flashembed.getVersion();var k=(l[0]>j[0])||(l[0]==j[0]&&l[1]>=j[1]);return k},domReady:c,asString:g,getHTML:a});if(e){jQuery.prototype.flashembed=function(k,j){return this.each(function(){flashembed(this,k,j)})}}})();

     if( vid.autoplay ) {
       var controls = {url: "http://anerian.ws/flash/flowplayer/flowplayer.controls-3.1.0.swf",
                       backgroundColor: "#ffffff", buttonColor: "#ffffff", backgroundGradient:'none', all: false };
     } else {
       var controls = {url: "http://anerian.ws/flash/flowplayer/flowplayer.controls-3.1.0.swf", all: true};
     }
	   var config = {
       plugins: {
          pseudo: {url: "http://anerian.ws/flash/flowplayer/flowplayer.pseudostreaming-3.1.2.swf"},
          controls: controls
       },
       clip: {url: (flashembed.isSupported([9,115]) ? (vid.base + ".flv") : (vid.base + ".flv")), autoPlay: vid.autoplay, provider: "pseudo", scale: 'orig'},
       onFail: function() {
          // no flash try quicktime and then fail
       //   ID(vid.id.replace(/-video$/,'-parent')).innerHTML = 
       } 
     };
     var player = flowplayer(vid.id.replace(/-video$/,'-parent'), {src:"http://anerian.ws/flash/flowplayer/flowplayer-3.1.0.swf",wmode: 'transparent'}, config);
     if( vid.autoplay ) { player.play(); }
  }
}

function loadVideos() {
  if( window.page_videos && page_videos.length ) {
    for( var i = 0, len = window.page_videos.length; i < len; ++i ) {
      loadVideo(page_videos[i]);
    }
  }
}
setTimeout(loadVideos,100);

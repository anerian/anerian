var IE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;

var openMenuId = null;

function ID(id) { return document.getElementById(id); }

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
if( !Function.prototype.bindAsEventListener ) {
  Function.prototype.bindAsEventListener = function () {
    var args = new Array();
    var __method = this;
    for( var i = 0, len = arguments.length; i < len; ++i ) { args.push(arguments[i]); }
    var object = args.shift();
    return function(event) {
      return __method.apply(object, [event || window.event].concat(args));
    }
  }
}

function html5VideoCheck() {
  try {
    var vid = document.createElement("video");
    if( vid.canPlayType && (vid.canPlayType('video/mp4') || vid.canPlayType('video/ogg')) ) {
      return true;
    }
    else {
      return false;
    }
  } catch( e ) {
    return false; // ie, or no video tag etc..
  }
}

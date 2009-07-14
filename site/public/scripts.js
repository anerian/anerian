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

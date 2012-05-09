/*! jQuery v1.6.4 http://jquery.com/ | http://jquery.org/license */
(function(a,b){function cu(a){return f.isWindow(a)?a:a.nodeType===9?a.defaultView||a.parentWindow:!1}function cr(a){if(!cg[a]){var b=c.body,d=f("<"+a+">").appendTo(b),e=d.css("display");d.remove();if(e==="none"||e===""){ch||(ch=c.createElement("iframe"),ch.frameBorder=ch.width=ch.height=0),b.appendChild(ch);if(!ci||!ch.createElement)ci=(ch.contentWindow||ch.contentDocument).document,ci.write((c.compatMode==="CSS1Compat"?"<!doctype html>":"")+"<html><body>"),ci.close();d=ci.createElement(a),ci.body.appendChild(d),e=f.css(d,"display"),b.removeChild(ch)}cg[a]=e}return cg[a]}function cq(a,b){var c={};f.each(cm.concat.apply([],cm.slice(0,b)),function(){c[this]=a});return c}function cp(){cn=b}function co(){setTimeout(cp,0);return cn=f.now()}function cf(){try{return new a.ActiveXObject("Microsoft.XMLHTTP")}catch(b){}}function ce(){try{return new a.XMLHttpRequest}catch(b){}}function b$(a,c){a.dataFilter&&(c=a.dataFilter(c,a.dataType));var d=a.dataTypes,e={},g,h,i=d.length,j,k=d[0],l,m,n,o,p;for(g=1;g<i;g++){if(g===1)for(h in a.converters)typeof h=="string"&&(e[h.toLowerCase()]=a.converters[h]);l=k,k=d[g];if(k==="*")k=l;else if(l!=="*"&&l!==k){m=l+" "+k,n=e[m]||e["* "+k];if(!n){p=b;for(o in e){j=o.split(" ");if(j[0]===l||j[0]==="*"){p=e[j[1]+" "+k];if(p){o=e[o],o===!0?n=p:p===!0&&(n=o);break}}}}!n&&!p&&f.error("No conversion from "+m.replace(" "," to ")),n!==!0&&(c=n?n(c):p(o(c)))}}return c}function bZ(a,c,d){var e=a.contents,f=a.dataTypes,g=a.responseFields,h,i,j,k;for(i in g)i in d&&(c[g[i]]=d[i]);while(f[0]==="*")f.shift(),h===b&&(h=a.mimeType||c.getResponseHeader("content-type"));if(h)for(i in e)if(e[i]&&e[i].test(h)){f.unshift(i);break}if(f[0]in d)j=f[0];else{for(i in d){if(!f[0]||a.converters[i+" "+f[0]]){j=i;break}k||(k=i)}j=j||k}if(j){j!==f[0]&&f.unshift(j);return d[j]}}function bY(a,b,c,d){if(f.isArray(b))f.each(b,function(b,e){c||bA.test(a)?d(a,e):bY(a+"["+(typeof e=="object"||f.isArray(e)?b:"")+"]",e,c,d)});else if(!c&&b!=null&&typeof b=="object")for(var e in b)bY(a+"["+e+"]",b[e],c,d);else d(a,b)}function bX(a,c){var d,e,g=f.ajaxSettings.flatOptions||{};for(d in c)c[d]!==b&&((g[d]?a:e||(e={}))[d]=c[d]);e&&f.extend(!0,a,e)}function bW(a,c,d,e,f,g){f=f||c.dataTypes[0],g=g||{},g[f]=!0;var h=a[f],i=0,j=h?h.length:0,k=a===bP,l;for(;i<j&&(k||!l);i++)l=h[i](c,d,e),typeof l=="string"&&(!k||g[l]?l=b:(c.dataTypes.unshift(l),l=bW(a,c,d,e,l,g)));(k||!l)&&!g["*"]&&(l=bW(a,c,d,e,"*",g));return l}function bV(a){return function(b,c){typeof b!="string"&&(c=b,b="*");if(f.isFunction(c)){var d=b.toLowerCase().split(bL),e=0,g=d.length,h,i,j;for(;e<g;e++)h=d[e],j=/^\+/.test(h),j&&(h=h.substr(1)||"*"),i=a[h]=a[h]||[],i[j?"unshift":"push"](c)}}}function by(a,b,c){var d=b==="width"?a.offsetWidth:a.offsetHeight,e=b==="width"?bt:bu;if(d>0){c!=="border"&&f.each(e,function(){c||(d-=parseFloat(f.css(a,"padding"+this))||0),c==="margin"?d+=parseFloat(f.css(a,c+this))||0:d-=parseFloat(f.css(a,"border"+this+"Width"))||0});return d+"px"}d=bv(a,b,b);if(d<0||d==null)d=a.style[b]||0;d=parseFloat(d)||0,c&&f.each(e,function(){d+=parseFloat(f.css(a,"padding"+this))||0,c!=="padding"&&(d+=parseFloat(f.css(a,"border"+this+"Width"))||0),c==="margin"&&(d+=parseFloat(f.css(a,c+this))||0)});return d+"px"}function bl(a,b){b.src?f.ajax({url:b.src,async:!1,dataType:"script"}):f.globalEval((b.text||b.textContent||b.innerHTML||"").replace(bd,"/*$0*/")),b.parentNode&&b.parentNode.removeChild(b)}function bk(a){f.nodeName(a,"input")?bj(a):"getElementsByTagName"in a&&f.grep(a.getElementsByTagName("input"),bj)}function bj(a){if(a.type==="checkbox"||a.type==="radio")a.defaultChecked=a.checked}function bi(a){return"getElementsByTagName"in a?a.getElementsByTagName("*"):"querySelectorAll"in a?a.querySelectorAll("*"):[]}function bh(a,b){var c;if(b.nodeType===1){b.clearAttributes&&b.clearAttributes(),b.mergeAttributes&&b.mergeAttributes(a),c=b.nodeName.toLowerCase();if(c==="object")b.outerHTML=a.outerHTML;else if(c!=="input"||a.type!=="checkbox"&&a.type!=="radio"){if(c==="option")b.selected=a.defaultSelected;else if(c==="input"||c==="textarea")b.defaultValue=a.defaultValue}else a.checked&&(b.defaultChecked=b.checked=a.checked),b.value!==a.value&&(b.value=a.value);b.removeAttribute(f.expando)}}function bg(a,b){if(b.nodeType===1&&!!f.hasData(a)){var c=f.expando,d=f.data(a),e=f.data(b,d);if(d=d[c]){var g=d.events;e=e[c]=f.extend({},d);if(g){delete e.handle,e.events={};for(var h in g)for(var i=0,j=g[h].length;i<j;i++)f.event.add(b,h+(g[h][i].namespace?".":"")+g[h][i].namespace,g[h][i],g[h][i].data)}}}}function bf(a,b){return f.nodeName(a,"table")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function V(a,b,c){b=b||0;if(f.isFunction(b))return f.grep(a,function(a,d){var e=!!b.call(a,d,a);return e===c});if(b.nodeType)return f.grep(a,function(a,d){return a===b===c});if(typeof b=="string"){var d=f.grep(a,function(a){return a.nodeType===1});if(Q.test(b))return f.filter(b,d,!c);b=f.filter(b,d)}return f.grep(a,function(a,d){return f.inArray(a,b)>=0===c})}function U(a){return!a||!a.parentNode||a.parentNode.nodeType===11}function M(a,b){return(a&&a!=="*"?a+".":"")+b.replace(y,"`").replace(z,"&")}function L(a){var b,c,d,e,g,h,i,j,k,l,m,n,o,p=[],q=[],r=f._data(this,"events");if(!(a.liveFired===this||!r||!r.live||a.target.disabled||a.button&&a.type==="click")){a.namespace&&(n=new RegExp("(^|\\.)"+a.namespace.split(".").join("\\.(?:.*\\.)?")+"(\\.|$)")),a.liveFired=this;var s=r.live.slice(0);for(i=0;i<s.length;i++)g=s[i],g.origType.replace(w,"")===a.type?q.push(g.selector):s.splice(i--,1);e=f(a.target).closest(q,a.currentTarget);for(j=0,k=e.length;j<k;j++){m=e[j];for(i=0;i<s.length;i++){g=s[i];if(m.selector===g.selector&&(!n||n.test(g.namespace))&&!m.elem.disabled){h=m.elem,d=null;if(g.preType==="mouseenter"||g.preType==="mouseleave")a.type=g.preType,d=f(a.relatedTarget).closest(g.selector)[0],d&&f.contains(h,d)&&(d=h);(!d||d!==h)&&p.push({elem:h,handleObj:g,level:m.level})}}}for(j=0,k=p.length;j<k;j++){e=p[j];if(c&&e.level>c)break;a.currentTarget=e.elem,a.data=e.handleObj.data,a.handleObj=e.handleObj,o=e.handleObj.origHandler.apply(e.elem,arguments);if(o===!1||a.isPropagationStopped()){c=e.level,o===!1&&(b=!1);if(a.isImmediatePropagationStopped())break}}return b}}function J(a,c,d){var e=f.extend({},d[0]);e.type=a,e.originalEvent={},e.liveFired=b,f.event.handle.call(c,e),e.isDefaultPrevented()&&d[0].preventDefault()}function D(){return!0}function C(){return!1}function m(a,c,d){var e=c+"defer",g=c+"queue",h=c+"mark",i=f.data(a,e,b,!0);i&&(d==="queue"||!f.data(a,g,b,!0))&&(d==="mark"||!f.data(a,h,b,!0))&&setTimeout(function(){!f.data(a,g,b,!0)&&!f.data(a,h,b,!0)&&(f.removeData(a,e,!0),i.resolve())},0)}function l(a){for(var b in a)if(b!=="toJSON")return!1;return!0}function k(a,c,d){if(d===b&&a.nodeType===1){var e="data-"+c.replace(j,"-$1").toLowerCase();d=a.getAttribute(e);if(typeof d=="string"){try{d=d==="true"?!0:d==="false"?!1:d==="null"?null:f.isNaN(d)?i.test(d)?f.parseJSON(d):d:parseFloat(d)}catch(g){}f.data(a,c,d)}else d=b}return d}var c=a.document,d=a.navigator,e=a.location,f=function(){function K(){if(!e.isReady){try{c.documentElement.doScroll("left")}catch(a){setTimeout(K,1);return}e.ready()}}var e=function(a,b){return new e.fn.init(a,b,h)},f=a.jQuery,g=a.$,h,i=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,j=/\S/,k=/^\s+/,l=/\s+$/,m=/\d/,n=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,o=/^[\],:{}\s]*$/,p=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,q=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,r=/(?:^|:|,)(?:\s*\[)+/g,s=/(webkit)[ \/]([\w.]+)/,t=/(opera)(?:.*version)?[ \/]([\w.]+)/,u=/(msie) ([\w.]+)/,v=/(mozilla)(?:.*? rv:([\w.]+))?/,w=/-([a-z]|[0-9])/ig,x=/^-ms-/,y=function(a,b){return(b+"").toUpperCase()},z=d.userAgent,A,B,C,D=Object.prototype.toString,E=Object.prototype.hasOwnProperty,F=Array.prototype.push,G=Array.prototype.slice,H=String.prototype.trim,I=Array.prototype.indexOf,J={};e.fn=e.prototype={constructor:e,init:function(a,d,f){var g,h,j,k;if(!a)return this;if(a.nodeType){this.context=this[0]=a,this.length=1;return this}if(a==="body"&&!d&&c.body){this.context=c,this[0]=c.body,this.selector=a,this.length=1;return this}if(typeof a=="string"){a.charAt(0)!=="<"||a.charAt(a.length-1)!==">"||a.length<3?g=i.exec(a):g=[null,a,null];if(g&&(g[1]||!d)){if(g[1]){d=d instanceof e?d[0]:d,k=d?d.ownerDocument||d:c,j=n.exec(a),j?e.isPlainObject(d)?(a=[c.createElement(j[1])],e.fn.attr.call(a,d,!0)):a=[k.createElement(j[1])]:(j=e.buildFragment([g[1]],[k]),a=(j.cacheable?e.clone(j.fragment):j.fragment).childNodes);return e.merge(this,a)}h=c.getElementById(g[2]);if(h&&h.parentNode){if(h.id!==g[2])return f.find(a);this.length=1,this[0]=h}this.context=c,this.selector=a;return this}return!d||d.jquery?(d||f).find(a):this.constructor(d).find(a)}if(e.isFunction(a))return f.ready(a);a.selector!==b&&(this.selector=a.selector,this.context=a.context);return e.makeArray(a,this)},selector:"",jquery:"1.6.4",length:0,size:function(){return this.length},toArray:function(){return G.call(this,0)},get:function(a){return a==null?this.toArray():a<0?this[this.length+a]:this[a]},pushStack:function(a,b,c){var d=this.constructor();e.isArray(a)?F.apply(d,a):e.merge(d,a),d.prevObject=this,d.context=this.context,b==="find"?d.selector=this.selector+(this.selector?" ":"")+c:b&&(d.selector=this.selector+"."+b+"("+c+")");return d},each:function(a,b){return e.each(this,a,b)},ready:function(a){e.bindReady(),B.done(a);return this},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},slice:function(){return this.pushStack(G.apply(this,arguments),"slice",G.call(arguments).join(","))},map:function(a){return this.pushStack(e.map(this,function(b,c){return a.call(b,c,b)}))},end:function(){return this.prevObject||this.constructor(null)},push:F,sort:[].sort,splice:[].splice},e.fn.init.prototype=e.fn,e.extend=e.fn.extend=function(){var a,c,d,f,g,h,i=arguments[0]||{},j=1,k=arguments.length,l=!1;typeof i=="boolean"&&(l=i,i=arguments[1]||{},j=2),typeof i!="object"&&!e.isFunction(i)&&(i={}),k===j&&(i=this,--j);for(;j<k;j++)if((a=arguments[j])!=null)for(c in a){d=i[c],f=a[c];if(i===f)continue;l&&f&&(e.isPlainObject(f)||(g=e.isArray(f)))?(g?(g=!1,h=d&&e.isArray(d)?d:[]):h=d&&e.isPlainObject(d)?d:{},i[c]=e.extend(l,h,f)):f!==b&&(i[c]=f)}return i},e.extend({noConflict:function(b){a.$===e&&(a.$=g),b&&a.jQuery===e&&(a.jQuery=f);return e},isReady:!1,readyWait:1,holdReady:function(a){a?e.readyWait++:e.ready(!0)},ready:function(a){if(a===!0&&!--e.readyWait||a!==!0&&!e.isReady){if(!c.body)return setTimeout(e.ready,1);e.isReady=!0;if(a!==!0&&--e.readyWait>0)return;B.resolveWith(c,[e]),e.fn.trigger&&e(c).trigger("ready").unbind("ready")}},bindReady:function(){if(!B){B=e._Deferred();if(c.readyState==="complete")return setTimeout(e.ready,1);if(c.addEventListener)c.addEventListener("DOMContentLoaded",C,!1),a.addEventListener("load",e.ready,!1);else if(c.attachEvent){c.attachEvent("onreadystatechange",C),a.attachEvent("onload",e.ready);var b=!1;try{b=a.frameElement==null}catch(d){}c.documentElement.doScroll&&b&&K()}}},isFunction:function(a){return e.type(a)==="function"},isArray:Array.isArray||function(a){return e.type(a)==="array"},isWindow:function(a){return a&&typeof a=="object"&&"setInterval"in a},isNaN:function(a){return a==null||!m.test(a)||isNaN(a)},type:function(a){return a==null?String(a):J[D.call(a)]||"object"},isPlainObject:function(a){if(!a||e.type(a)!=="object"||a.nodeType||e.isWindow(a))return!1;try{if(a.constructor&&!E.call(a,"constructor")&&!E.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}var d;for(d in a);return d===b||E.call(a,d)},isEmptyObject:function(a){for(var b in a)return!1;return!0},error:function(a){throw a},parseJSON:function(b){if(typeof b!="string"||!b)return null;b=e.trim(b);if(a.JSON&&a.JSON.parse)return a.JSON.parse(b);if(o.test(b.replace(p,"@").replace(q,"]").replace(r,"")))return(new Function("return "+b))();e.error("Invalid JSON: "+b)},parseXML:function(c){var d,f;try{a.DOMParser?(f=new DOMParser,d=f.parseFromString(c,"text/xml")):(d=new ActiveXObject("Microsoft.XMLDOM"),d.async="false",d.loadXML(c))}catch(g){d=b}(!d||!d.documentElement||d.getElementsByTagName("parsererror").length)&&e.error("Invalid XML: "+c);return d},noop:function(){},globalEval:function(b){b&&j.test(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(x,"ms-").replace(w,y)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toUpperCase()===b.toUpperCase()},each:function(a,c,d){var f,g=0,h=a.length,i=h===b||e.isFunction(a);if(d){if(i){for(f in a)if(c.apply(a[f],d)===!1)break}else for(;g<h;)if(c.apply(a[g++],d)===!1)break}else if(i){for(f in a)if(c.call(a[f],f,a[f])===!1)break}else for(;g<h;)if(c.call(a[g],g,a[g++])===!1)break;return a},trim:H?function(a){return a==null?"":H.call(a)}:function(a){return a==null?"":(a+"").replace(k,"").replace(l,"")},makeArray:function(a,b){var c=b||[];if(a!=null){var d=e.type(a);a.length==null||d==="string"||d==="function"||d==="regexp"||e.isWindow(a)?F.call(c,a):e.merge(c,a)}return c},inArray:function(a,b){if(!b)return-1;if(I)return I.call(b,a);for(var c=0,d=b.length;c<d;c++)if(b[c]===a)return c;return-1},merge:function(a,c){var d=a.length,e=0;if(typeof c.length=="number")for(var f=c.length;e<f;e++)a[d++]=c[e];else while(c[e]!==b)a[d++]=c[e++];a.length=d;return a},grep:function(a,b,c){var d=[],e;c=!!c;for(var f=0,g=a.length;f<g;f++)e=!!b(a[f],f),c!==e&&d.push(a[f]);return d},map:function(a,c,d){var f,g,h=[],i=0,j=a.length,k=a instanceof e||j!==b&&typeof j=="number"&&(j>0&&a[0]&&a[j-1]||j===0||e.isArray(a));if(k)for(;i<j;i++)f=c(a[i],i,d),f!=null&&(h[h.length]=f);else for(g in a)f=c(a[g],g,d),f!=null&&(h[h.length]=f);return h.concat.apply([],h)},guid:1,proxy:function(a,c){if(typeof c=="string"){var d=a[c];c=a,a=d}if(!e.isFunction(a))return b;var f=G.call(arguments,2),g=function(){return a.apply(c,f.concat(G.call(arguments)))};g.guid=a.guid=a.guid||g.guid||e.guid++;return g},access:function(a,c,d,f,g,h){var i=a.length;if(typeof c=="object"){for(var j in c)e.access(a,j,c[j],f,g,d);return a}if(d!==b){f=!h&&f&&e.isFunction(d);for(var k=0;k<i;k++)g(a[k],c,f?d.call(a[k],k,g(a[k],c)):d,h);return a}return i?g(a[0],c):b},now:function(){return(new Date).getTime()},uaMatch:function(a){a=a.toLowerCase();var b=s.exec(a)||t.exec(a)||u.exec(a)||a.indexOf("compatible")<0&&v.exec(a)||[];return{browser:b[1]||"",version:b[2]||"0"}},sub:function(){function a(b,c){return new a.fn.init(b,c)}e.extend(!0,a,this),a.superclass=this,a.fn=a.prototype=this(),a.fn.constructor=a,a.sub=this.sub,a.fn.init=function(d,f){f&&f instanceof e&&!(f instanceof a)&&(f=a(f));return e.fn.init.call(this,d,f,b)},a.fn.init.prototype=a.fn;var b=a(c);return a},browser:{}}),e.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(a,b){J["[object "+b+"]"]=b.toLowerCase()}),A=e.uaMatch(z),A.browser&&(e.browser[A.browser]=!0,e.browser.version=A.version),e.browser.webkit&&(e.browser.safari=!0),j.test(" ")&&(k=/^[\s\xA0]+/,l=/[\s\xA0]+$/),h=e(c),c.addEventListener?C=function(){c.removeEventListener("DOMContentLoaded",C,!1),e.ready()}:c.attachEvent&&(C=function(){c.readyState==="complete"&&(c.detachEvent("onreadystatechange",C),e.ready())});return e}(),g="done fail isResolved isRejected promise then always pipe".split(" "),h=[].slice;f.extend({_Deferred:function(){var a=[],b,c,d,e={done:function(){if(!d){var c=arguments,g,h,i,j,k;b&&(k=b,b=0);for(g=0,h=c.length;g<h;g++)i=c[g],j=f.type(i),j==="array"?e.done.apply(e,i):j==="function"&&a.push(i);k&&e.resolveWith(k[0],k[1])}return this},resolveWith:function(e,f){if(!d&&!b&&!c){f=f||[],c=1;try{while(a[0])a.shift().apply(e,f)}finally{b=[e,f],c=0}}return this},resolve:function(){e.resolveWith(this,arguments);return this},isResolved:function(){return!!c||!!b},cancel:function(){d=1,a=[];return this}};return e},Deferred:function(a){var b=f._Deferred(),c=f._Deferred(),d;f.extend(b,{then:function(a,c){b.done(a).fail(c);return this},always:function(){return b.done.apply(b,arguments).fail.apply(this,arguments)},fail:c.done,rejectWith:c.resolveWith,reject:c.resolve,isRejected:c.isResolved,pipe:function(a,c){return f.Deferred(function(d){f.each({done:[a,"resolve"],fail:[c,"reject"]},function(a,c){var e=c[0],g=c[1],h;f.isFunction(e)?b[a](function(){h=e.apply(this,arguments),h&&f.isFunction(h.promise)?h.promise().then(d.resolve,d.reject):d[g+"With"](this===b?d:this,[h])}):b[a](d[g])})}).promise()},promise:function(a){if(a==null){if(d)return d;d=a={}}var c=g.length;while(c--)a[g[c]]=b[g[c]];return a}}),b.done(c.cancel).fail(b.cancel),delete b.cancel,a&&a.call(b,b);return b},when:function(a){function i(a){return function(c){b[a]=arguments.length>1?h.call(arguments,0):c,--e||g.resolveWith(g,h.call(b,0))}}var b=arguments,c=0,d=b.length,e=d,g=d<=1&&a&&f.isFunction(a.promise)?a:f.Deferred();if(d>1){for(;c<d;c++)b[c]&&f.isFunction(b[c].promise)?b[c].promise().then(i(c),g.reject):--e;e||g.resolveWith(g,b)}else g!==a&&g.resolveWith(g,d?[a]:[]);return g.promise()}}),f.support=function(){var a=c.createElement("div"),b=c.documentElement,d,e,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u;a.setAttribute("className","t"),a.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>",d=a.getElementsByTagName("*"),e=a.getElementsByTagName("a")[0];if(!d||!d.length||!e)return{};g=c.createElement("select"),h=g.appendChild(c.createElement("option")),i=a.getElementsByTagName("input")[0],k={leadingWhitespace:a.firstChild.nodeType===3,tbody:!a.getElementsByTagName("tbody").length,htmlSerialize:!!a.getElementsByTagName("link").length,style:/top/.test(e.getAttribute("style")),hrefNormalized:e.getAttribute("href")==="/a",opacity:/^0.55$/.test(e.style.opacity),cssFloat:!!e.style.cssFloat,checkOn:i.value==="on",optSelected:h.selected,getSetAttribute:a.className!=="t",submitBubbles:!0,changeBubbles:!0,focusinBubbles:!1,deleteExpando:!0,noCloneEvent:!0,inlineBlockNeedsLayout:!1,shrinkWrapBlocks:!1,reliableMarginRight:!0},i.checked=!0,k.noCloneChecked=i.cloneNode(!0).checked,g.disabled=!0,k.optDisabled=!h.disabled;try{delete a.test}catch(v){k.deleteExpando=!1}!a.addEventListener&&a.attachEvent&&a.fireEvent&&(a.attachEvent("onclick",function(){k.noCloneEvent=!1}),a.cloneNode(!0).fireEvent("onclick")),i=c.createElement("input"),i.value="t",i.setAttribute("type","radio"),k.radioValue=i.value==="t",i.setAttribute("checked","checked"),a.appendChild(i),l=c.createDocumentFragment(),l.appendChild(a.firstChild),k.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,a.innerHTML="",a.style.width=a.style.paddingLeft="1px",m=c.getElementsByTagName("body")[0],o=c.createElement(m?"div":"body"),p={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},m&&f.extend(p,{position:"absolute",left:"-1000px",top:"-1000px"});for(t in p)o.style[t]=p[t];o.appendChild(a),n=m||b,n.insertBefore(o,n.firstChild),k.appendChecked=i.checked,k.boxModel=a.offsetWidth===2,"zoom"in a.style&&(a.style.display="inline",a.style.zoom=1,k.inlineBlockNeedsLayout=a.offsetWidth===2,a.style.display="",a.innerHTML="<div style='width:4px;'></div>",k.shrinkWrapBlocks=a.offsetWidth!==2),a.innerHTML="<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>",q=a.getElementsByTagName("td"),u=q[0].offsetHeight===0,q[0].style.display="",q[1].style.display="none",k.reliableHiddenOffsets=u&&q[0].offsetHeight===0,a.innerHTML="",c.defaultView&&c.defaultView.getComputedStyle&&(j=c.createElement("div"),j.style.width="0",j.style.marginRight="0",a.appendChild(j),k.reliableMarginRight=(parseInt((c.defaultView.getComputedStyle(j,null)||{marginRight:0}).marginRight,10)||0)===0),o.innerHTML="",n.removeChild(o);if(a.attachEvent)for(t in{submit:1,change:1,focusin:1})s="on"+t,u=s in a,u||(a.setAttribute(s,"return;"),u=typeof a[s]=="function"),k[t+"Bubbles"]=u;o=l=g=h=m=j=a=i=null;return k}(),f.boxModel=f.support.boxModel;var i=/^(?:\{.*\}|\[.*\])$/,j=/([A-Z])/g;f.extend({cache:{},uuid:0,expando:"jQuery"+(f.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:!0},hasData:function(a){a=a.nodeType?f.cache[a[f.expando]]:a[f.expando];return!!a&&!l(a)},data:function(a,c,d,e){if(!!f.acceptData(a)){var g,h,i=f.expando,j=typeof c=="string",k=a.nodeType,l=k?f.cache:a,m=k?a[f.expando]:a[f.expando]&&f.expando;if((!m||e&&m&&l[m]&&!l[m][i])&&j&&d===b)return;m||(k?a[f.expando]=m=++f.uuid:m=f.expando),l[m]||(l[m]={},k||(l[m].toJSON=f.noop));if(typeof c=="object"||typeof c=="function")e?l[m][i]=f.extend(l[m][i],c):l[m]=f.extend(l[m],c);g=l[m],e&&(g[i]||(g[i]={}),g=g[i]),d!==b&&(g[f.camelCase(c)]=d);if(c==="events"&&!g[c])return g[i]&&g[i].events;j?(h=g[c],h==null&&(h=g[f.camelCase(c)])):h=g;return h}},removeData:function(a,b,c){if(!!f.acceptData(a)){var d,e=f.expando,g=a.nodeType,h=g?f.cache:a,i=g?a[f.expando]:f.expando;if(!h[i])return;if(b){d=c?h[i][e]:h[i];if(d){d[b]||(b=f.camelCase(b)),delete d[b];if(!l(d))return}}if(c){delete h[i][e];if(!l(h[i]))return}var j=h[i][e];f.support.deleteExpando||!h.setInterval?delete h[i]:h[i]=null,j?(h[i]={},g||(h[i].toJSON=f.noop),h[i][e]=j):g&&(f.support.deleteExpando?delete a[f.expando]:a.removeAttribute?a.removeAttribute(f.expando):a[f.expando]=null)}},_data:function(a,b,c){return f.data(a,b,c,!0)},acceptData:function(a){if(a.nodeName){var b=f.noData[a.nodeName.toLowerCase()];if(b)return b!==!0&&a.getAttribute("classid")===b}return!0}}),f.fn.extend({data:function(a,c){var d=null;if(typeof a=="undefined"){if(this.length){d=f.data(this[0]);if(this[0].nodeType===1){var e=this[0].attributes,g;for(var h=0,i=e.length;h<i;h++)g=e[h].name,g.indexOf("data-")===0&&(g=f.camelCase(g.substring(5)),k(this[0],g,d[g]))}}return d}if(typeof a=="object")return this.each(function(){f.data(this,a)});var j=a.split(".");j[1]=j[1]?"."+j[1]:"";if(c===b){d=this.triggerHandler("getData"+j[1]+"!",[j[0]]),d===b&&this.length&&(d=f.data(this[0],a),d=k(this[0],a,d));return d===b&&j[1]?this.data(j[0]):d}return this.each(function(){var b=f(this),d=[j[0],c];b.triggerHandler("setData"+j[1]+"!",d),f.data(this,a,c),b.triggerHandler("changeData"+j[1]+"!",d)})},removeData:function(a){return this.each(function(){f.removeData(this,a)})}}),f.extend({_mark:function(a,c){a&&(c=(c||"fx")+"mark",f.data(a,c,(f.data(a,c,b,!0)||0)+1,!0))},_unmark:function(a,c,d){a!==!0&&(d=c,c=a,a=!1);if(c){d=d||"fx";var e=d+"mark",g=a?0:(f.data(c,e,b,!0)||1)-1;g?f.data(c,e,g,!0):(f.removeData(c,e,!0),m(c,d,"mark"))}},queue:function(a,c,d){if(a){c=(c||"fx")+"queue";var e=f.data(a,c,b,!0);d&&(!e||f.isArray(d)?e=f.data(a,c,f.makeArray(d),!0):e.push(d));return e||[]}},dequeue:function(a,b){b=b||"fx";var c=f.queue(a,b),d=c.shift(),e;d==="inprogress"&&(d=c.shift()),d&&(b==="fx"&&c.unshift("inprogress"),d.call(a,function(){f.dequeue(a,b)})),c.length||(f.removeData(a,b+"queue",!0),m(a,b,"queue"))}}),f.fn.extend({queue:function(a,c){typeof a!="string"&&(c=a,a="fx");if(c===b)return f.queue(this[0],a);return this.each(function(){var b=f.queue(this,a,c);a==="fx"&&b[0]!=="inprogress"&&f.dequeue(this,a)})},dequeue:function(a){return this.each(function(){f.dequeue(this,a)})},delay:function(a,b){a=f.fx?f.fx.speeds[a]||a:a,b=b||"fx";return this.queue(b,function(){var c=this;setTimeout(function(){f.dequeue(c,b)},a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,c){function m(){--h||d.resolveWith(e,[e])}typeof a!="string"&&(c=a,a=b),a=a||"fx";var d=f.Deferred(),e=this,g=e.length,h=1,i=a+"defer",j=a+"queue",k=a+"mark",l;while(g--)if(l=f.data(e[g],i,b,!0)||(f.data(e[g],j,b,!0)||f.data(e[g],k,b,!0))&&f.data(e[g],i,f._Deferred(),!0))h++,l.done(m);m();return d.promise()}});var n=/[\n\t\r]/g,o=/\s+/,p=/\r/g,q=/^(?:button|input)$/i,r=/^(?:button|input|object|select|textarea)$/i,s=/^a(?:rea)?$/i,t=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,u,v;f.fn.extend({attr:function(a,b){return f.access(this,a,b,!0,f.attr)},removeAttr:function(a){return this.each(function(){f.removeAttr(this,a)})},prop:function(a,b){return f.access(this,a,b,!0,f.prop)},removeProp:function(a){a=f.propFix[a]||a;return this.each(function(){try{this[a]=b,delete this[a]}catch(c){}})},addClass:function(a){var b,c,d,e,g,h,i;if(f.isFunction(a))return this.each(function(b){f(this).addClass(a.call(this,b,this.className))});if(a&&typeof a=="string"){b=a.split(o);for(c=0,d=this.length;c<d;c++){e=this[c];if(e.nodeType===1)if(!e.className&&b.length===1)e.className=a;else{g=" "+e.className+" ";for(h=0,i=b.length;h<i;h++)~g.indexOf(" "+b[h]+" ")||(g+=b[h]+" ");e.className=f.trim(g)}}}return this},removeClass:function(a){var c,d,e,g,h,i,j;if(f.isFunction(a))return this.each(function(b){f(this).removeClass(a.call(this,b,this.className))});if(a&&typeof a=="string"||a===b){c=(a||"").split(o);for(d=0,e=this.length;d<e;d++){g=this[d];if(g.nodeType===1&&g.className)if(a){h=(" "+g.className+" ").replace(n," ");for(i=0,j=c.length;i<j;i++)h=h.replace(" "+c[i]+" "," ");g.className=f.trim(h)}else g.className=""}}return this},toggleClass:function(a,b){var c=typeof a,d=typeof b=="boolean";if(f.isFunction(a))return this.each(function(c){f(this).toggleClass(a.call(this,c,this.className,b),b)});return this.each(function(){if(c==="string"){var e,g=0,h=f(this),i=b,j=a.split(o);while(e=j[g++])i=d?i:!h.hasClass(e),h[i?"addClass":"removeClass"](e)}else if(c==="undefined"||c==="boolean")this.className&&f._data(this,"__className__",this.className),this.className=this.className||a===!1?"":f._data(this,"__className__")||""})},hasClass:function(a){var b=" "+a+" ";for(var c=0,d=this.length;c<d;c++)if(this[c].nodeType===1&&(" "+this[c].className+" ").replace(n," ").indexOf(b)>-1)return!0;return!1},val:function(a){var c,d,e=this[0];if(!arguments.length){if(e){c=f.valHooks[e.nodeName.toLowerCase()]||f.valHooks[e.type];if(c&&"get"in c&&(d=c.get(e,"value"))!==b)return d;d=e.value;return typeof d=="string"?d.replace(p,""):d==null?"":d}return b}var g=f.isFunction(a);return this.each(function(d){var e=f(this),h;if(this.nodeType===1){g?h=a.call(this,d,e.val()):h=a,h==null?h="":typeof h=="number"?h+="":f.isArray(h)&&(h=f.map(h,function(a){return a==null?"":a+""})),c=f.valHooks[this.nodeName.toLowerCase()]||f.valHooks[this.type];if(!c||!("set"in c)||c.set(this,h,"value")===b)this.value=h}})}}),f.extend({valHooks:{option:{get:function(a){var b=a.attributes.value;return!b||b.specified?a.value:a.text}},select:{get:function(a){var b,c=a.selectedIndex,d=[],e=a.options,g=a.type==="select-one";if(c<0)return null;for(var h=g?c:0,i=g?c+1:e.length;h<i;h++){var j=e[h];if(j.selected&&(f.support.optDisabled?!j.disabled:j.getAttribute("disabled")===null)&&(!j.parentNode.disabled||!f.nodeName(j.parentNode,"optgroup"))){b=f(j).val();if(g)return b;d.push(b)}}if(g&&!d.length&&e.length)return f(e[c]).val();return d},set:function(a,b){var c=f.makeArray(b);f(a).find("option").each(function(){this.selected=f.inArray(f(this).val(),c)>=0}),c.length||(a.selectedIndex=-1);return c}}},attrFn:{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0},attrFix:{tabindex:"tabIndex"},attr:function(a,c,d,e){var g=a.nodeType;if(!a||g===3||g===8||g===2)return b;if(e&&c in f.attrFn)return f(a)[c](d);if(!("getAttribute"in a))return f.prop(a,c,d);var h,i,j=g!==1||!f.isXMLDoc(a);j&&(c=f.attrFix[c]||c,i=f.attrHooks[c],i||(t.test(c)?i=v:u&&(i=u)));if(d!==b){if(d===null){f.removeAttr(a,c);return b}if(i&&"set"in i&&j&&(h=i.set(a,d,c))!==b)return h;a.setAttribute(c,""+d);return d}if(i&&"get"in i&&j&&(h=i.get(a,c))!==null)return h;h=a.getAttribute(c);return h===null?b:h},removeAttr:function(a,b){var c;a.nodeType===1&&(b=f.attrFix[b]||b,f.attr(a,b,""),a.removeAttribute(b),t.test(b)&&(c=f.propFix[b]||b)in a&&(a[c]=!1))},attrHooks:{type:{set:function(a,b){if(q.test(a.nodeName)&&a.parentNode)f.error("type property can't be changed");else if(!f.support.radioValue&&b==="radio"&&f.nodeName(a,"input")){var c=a.value;a.setAttribute("type",b),c&&(a.value=c);return b}}},value:{get:function(a,b){if(u&&f.nodeName(a,"button"))return u.get(a,b);return b in a?a.value:null},set:function(a,b,c){if(u&&f.nodeName(a,"button"))return u.set(a,b,c);a.value=b}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(a,c,d){var e=a.nodeType;if(!a||e===3||e===8||e===2)return b;var g,h,i=e!==1||!f.isXMLDoc(a);i&&(c=f.propFix[c]||c,h=f.propHooks[c]);return d!==b?h&&"set"in h&&(g=h.set(a,d,c))!==b?g:a[c]=d:h&&"get"in h&&(g=h.get(a,c))!==null?g:a[c]},propHooks:{tabIndex:{get:function(a){var c=a.getAttributeNode("tabindex");return c&&c.specified?parseInt(c.value,10):r.test(a.nodeName)||s.test(a.nodeName)&&a.href?0:b}}}}),f.attrHooks.tabIndex=f.propHooks.tabIndex,v={get:function(a,c){var d;return f.prop(a,c)===!0||(d=a.getAttributeNode(c))&&d.nodeValue!==!1?c.toLowerCase():b},set:function(a,b,c){var d;b===!1?f.removeAttr(a,c):(d=f.propFix[c]||c,d in a&&(a[d]=!0),a.setAttribute(c,c.toLowerCase()));return c}},f.support.getSetAttribute||(u=f.valHooks.button={get:function(a,c){var d;d=a.getAttributeNode(c);return d&&d.nodeValue!==""?d.nodeValue:b},set:function(a,b,d){var e=a.getAttributeNode(d);e||(e=c.createAttribute(d),a.setAttributeNode(e));return e.nodeValue=b+""}},f.each(["width","height"],function(a,b){f.attrHooks[b]=f.extend(f.attrHooks[b],{set:function(a,c){if(c===""){a.setAttribute(b,"auto");return c}}})})),f.support.hrefNormalized||f.each(["href","src","width","height"],function(a,c){f.attrHooks[c]=f.extend(f.attrHooks[c],{get:function(a){var d=a.getAttribute(c,2);return d===null?b:d}})}),f.support.style||(f.attrHooks.style={get:function(a){return a.style.cssText.toLowerCase()||b},set:function(a,b){return a.style.cssText=""+b}}),f.support.optSelected||(f.propHooks.selected=f.extend(f.propHooks.selected,{get:function(a){var b=a.parentNode;b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex);return null}})),f.support.checkOn||f.each(["radio","checkbox"],function(){f.valHooks[this]={get:function(a){return a.getAttribute("value")===null?"on":a.value}}}),f.each(["radio","checkbox"],function(){f.valHooks[this]=f.extend(f.valHooks[this],{set:function(a,b){if(f.isArray(b))return a.checked=f.inArray(f(a).val(),b)>=0}})});var w=/\.(.*)$/,x=/^(?:textarea|input|select)$/i,y=/\./g,z=/ /g,A=/[^\w\s.|`]/g,B=function(a){return a.replace(A,"\\$&")};f.event={add:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){if(d===!1)d=C;else if(!d)return;var g,h;d.handler&&(g=d,d=g.handler),d.guid||(d.guid=f.guid++);var i=f._data(a);if(!i)return;var j=i.events,k=i.handle;j||(i.events=j={}),k||(i.handle=k=function(a){return typeof f!="undefined"&&(!a||f.event.triggered!==a.type)?f.event.handle.apply(k.elem,arguments):b}),k.elem=a,c=c.split(" ");var l,m=0,n;while(l=c[m++]){h=g?f.extend({},g):{handler:d,data:e},l.indexOf(".")>-1?(n=l.split("."),l=n.shift(),h.namespace=n.slice(0).sort().join(".")):(n=[],h.namespace=""),h.type=l,h.guid||(h.guid=d.guid);var o=j[l],p=f.event.special[l]||{};if(!o){o=j[l]=[];if(!p.setup||p.setup.call(a,e,n,k)===!1)a.addEventListener?a.addEventListener(l,k,!1):a.attachEvent&&a.attachEvent("on"+l,k)}p.add&&(p.add.call(a,h),h.handler.guid||(h.handler.guid=d.guid)),o.push(h),f.event.global[l]=!0}a=null}},global:{},remove:function(a,c,d,e){if(a.nodeType!==3&&a.nodeType!==8){d===!1&&(d=C);var g,h,i,j,k=0,l,m,n,o,p,q,r,s=f.hasData(a)&&f._data(a),t=s&&s.events;if(!s||!t)return;c&&c.type&&(d=c.handler,c=c.type);if(!c||typeof c=="string"&&c.charAt(0)==="."){c=c||"";for(h in t)f.event.remove(a,h+c);return}c=c.split(" ");while(h=c[k++]){r=h,q=null,l=h.indexOf(".")<0,m=[],l||(m=h.split("."),h=m.shift(),n=new RegExp("(^|\\.)"+f.map(m.slice(0).sort(),B).join("\\.(?:.*\\.)?")+"(\\.|$)")),p=t[h];if(!p)continue;if(!d){for(j=0;j<p.length;j++){q=p[j];if(l||n.test(q.namespace))f.event.remove(a,r,q.handler,j),p.splice(j--,1)}continue}o=f.event.special[h]||{};for(j=e||0;j<p.length;j++){q=p[j];if(d.guid===q.guid){if(l||n.test(q.namespace))e==null&&p.splice(j--,1),o.remove&&o.remove.call(a,q);if(e!=null)break}}if(p.length===0||e!=null&&p.length===1)(!o.teardown||o.teardown.call(a,m)===!1)&&f.removeEvent(a,h,s.handle),g=null,delete 
t[h]}if(f.isEmptyObject(t)){var u=s.handle;u&&(u.elem=null),delete s.events,delete s.handle,f.isEmptyObject(s)&&f.removeData(a,b,!0)}}},customEvent:{getData:!0,setData:!0,changeData:!0},trigger:function(c,d,e,g){var h=c.type||c,i=[],j;h.indexOf("!")>=0&&(h=h.slice(0,-1),j=!0),h.indexOf(".")>=0&&(i=h.split("."),h=i.shift(),i.sort());if(!!e&&!f.event.customEvent[h]||!!f.event.global[h]){c=typeof c=="object"?c[f.expando]?c:new f.Event(h,c):new f.Event(h),c.type=h,c.exclusive=j,c.namespace=i.join("."),c.namespace_re=new RegExp("(^|\\.)"+i.join("\\.(?:.*\\.)?")+"(\\.|$)");if(g||!e)c.preventDefault(),c.stopPropagation();if(!e){f.each(f.cache,function(){var a=f.expando,b=this[a];b&&b.events&&b.events[h]&&f.event.trigger(c,d,b.handle.elem)});return}if(e.nodeType===3||e.nodeType===8)return;c.result=b,c.target=e,d=d!=null?f.makeArray(d):[],d.unshift(c);var k=e,l=h.indexOf(":")<0?"on"+h:"";do{var m=f._data(k,"handle");c.currentTarget=k,m&&m.apply(k,d),l&&f.acceptData(k)&&k[l]&&k[l].apply(k,d)===!1&&(c.result=!1,c.preventDefault()),k=k.parentNode||k.ownerDocument||k===c.target.ownerDocument&&a}while(k&&!c.isPropagationStopped());if(!c.isDefaultPrevented()){var n,o=f.event.special[h]||{};if((!o._default||o._default.call(e.ownerDocument,c)===!1)&&(h!=="click"||!f.nodeName(e,"a"))&&f.acceptData(e)){try{l&&e[h]&&(n=e[l],n&&(e[l]=null),f.event.triggered=h,e[h]())}catch(p){}n&&(e[l]=n),f.event.triggered=b}}return c.result}},handle:function(c){c=f.event.fix(c||a.event);var d=((f._data(this,"events")||{})[c.type]||[]).slice(0),e=!c.exclusive&&!c.namespace,g=Array.prototype.slice.call(arguments,0);g[0]=c,c.currentTarget=this;for(var h=0,i=d.length;h<i;h++){var j=d[h];if(e||c.namespace_re.test(j.namespace)){c.handler=j.handler,c.data=j.data,c.handleObj=j;var k=j.handler.apply(this,g);k!==b&&(c.result=k,k===!1&&(c.preventDefault(),c.stopPropagation()));if(c.isImmediatePropagationStopped())break}}return c.result},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(a){if(a[f.expando])return a;var d=a;a=f.Event(d);for(var e=this.props.length,g;e;)g=this.props[--e],a[g]=d[g];a.target||(a.target=a.srcElement||c),a.target.nodeType===3&&(a.target=a.target.parentNode),!a.relatedTarget&&a.fromElement&&(a.relatedTarget=a.fromElement===a.target?a.toElement:a.fromElement);if(a.pageX==null&&a.clientX!=null){var h=a.target.ownerDocument||c,i=h.documentElement,j=h.body;a.pageX=a.clientX+(i&&i.scrollLeft||j&&j.scrollLeft||0)-(i&&i.clientLeft||j&&j.clientLeft||0),a.pageY=a.clientY+(i&&i.scrollTop||j&&j.scrollTop||0)-(i&&i.clientTop||j&&j.clientTop||0)}a.which==null&&(a.charCode!=null||a.keyCode!=null)&&(a.which=a.charCode!=null?a.charCode:a.keyCode),!a.metaKey&&a.ctrlKey&&(a.metaKey=a.ctrlKey),!a.which&&a.button!==b&&(a.which=a.button&1?1:a.button&2?3:a.button&4?2:0);return a},guid:1e8,proxy:f.proxy,special:{ready:{setup:f.bindReady,teardown:f.noop},live:{add:function(a){f.event.add(this,M(a.origType,a.selector),f.extend({},a,{handler:L,guid:a.handler.guid}))},remove:function(a){f.event.remove(this,M(a.origType,a.selector),a)}},beforeunload:{setup:function(a,b,c){f.isWindow(this)&&(this.onbeforeunload=c)},teardown:function(a,b){this.onbeforeunload===b&&(this.onbeforeunload=null)}}}},f.removeEvent=c.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){a.detachEvent&&a.detachEvent("on"+b,c)},f.Event=function(a,b){if(!this.preventDefault)return new f.Event(a,b);a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault()?D:C):this.type=a,b&&f.extend(this,b),this.timeStamp=f.now(),this[f.expando]=!0},f.Event.prototype={preventDefault:function(){this.isDefaultPrevented=D;var a=this.originalEvent;!a||(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){this.isPropagationStopped=D;var a=this.originalEvent;!a||(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=D,this.stopPropagation()},isDefaultPrevented:C,isPropagationStopped:C,isImmediatePropagationStopped:C};var E=function(a){var b=a.relatedTarget,c=!1,d=a.type;a.type=a.data,b!==this&&(b&&(c=f.contains(this,b)),c||(f.event.handle.apply(this,arguments),a.type=d))},F=function(a){a.type=a.data,f.event.handle.apply(this,arguments)};f.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){f.event.special[a]={setup:function(c){f.event.add(this,b,c&&c.selector?F:E,a)},teardown:function(a){f.event.remove(this,b,a&&a.selector?F:E)}}}),f.support.submitBubbles||(f.event.special.submit={setup:function(a,b){if(!f.nodeName(this,"form"))f.event.add(this,"click.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="submit"||c==="image")&&f(b).closest("form").length&&J("submit",this,arguments)}),f.event.add(this,"keypress.specialSubmit",function(a){var b=a.target,c=f.nodeName(b,"input")||f.nodeName(b,"button")?b.type:"";(c==="text"||c==="password")&&f(b).closest("form").length&&a.keyCode===13&&J("submit",this,arguments)});else return!1},teardown:function(a){f.event.remove(this,".specialSubmit")}});if(!f.support.changeBubbles){var G,H=function(a){var b=f.nodeName(a,"input")?a.type:"",c=a.value;b==="radio"||b==="checkbox"?c=a.checked:b==="select-multiple"?c=a.selectedIndex>-1?f.map(a.options,function(a){return a.selected}).join("-"):"":f.nodeName(a,"select")&&(c=a.selectedIndex);return c},I=function(c){var d=c.target,e,g;if(!!x.test(d.nodeName)&&!d.readOnly){e=f._data(d,"_change_data"),g=H(d),(c.type!=="focusout"||d.type!=="radio")&&f._data(d,"_change_data",g);if(e===b||g===e)return;if(e!=null||g)c.type="change",c.liveFired=b,f.event.trigger(c,arguments[1],d)}};f.event.special.change={filters:{focusout:I,beforedeactivate:I,click:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(c==="radio"||c==="checkbox"||f.nodeName(b,"select"))&&I.call(this,a)},keydown:function(a){var b=a.target,c=f.nodeName(b,"input")?b.type:"";(a.keyCode===13&&!f.nodeName(b,"textarea")||a.keyCode===32&&(c==="checkbox"||c==="radio")||c==="select-multiple")&&I.call(this,a)},beforeactivate:function(a){var b=a.target;f._data(b,"_change_data",H(b))}},setup:function(a,b){if(this.type==="file")return!1;for(var c in G)f.event.add(this,c+".specialChange",G[c]);return x.test(this.nodeName)},teardown:function(a){f.event.remove(this,".specialChange");return x.test(this.nodeName)}},G=f.event.special.change.filters,G.focus=G.beforeactivate}f.support.focusinBubbles||f.each({focus:"focusin",blur:"focusout"},function(a,b){function e(a){var c=f.event.fix(a);c.type=b,c.originalEvent={},f.event.trigger(c,null,c.target),c.isDefaultPrevented()&&a.preventDefault()}var d=0;f.event.special[b]={setup:function(){d++===0&&c.addEventListener(a,e,!0)},teardown:function(){--d===0&&c.removeEventListener(a,e,!0)}}}),f.each(["bind","one"],function(a,c){f.fn[c]=function(a,d,e){var g;if(typeof a=="object"){for(var h in a)this[c](h,d,a[h],e);return this}if(arguments.length===2||d===!1)e=d,d=b;c==="one"?(g=function(a){f(this).unbind(a,g);return e.apply(this,arguments)},g.guid=e.guid||f.guid++):g=e;if(a==="unload"&&c!=="one")this.one(a,d,e);else for(var i=0,j=this.length;i<j;i++)f.event.add(this[i],a,g,d);return this}}),f.fn.extend({unbind:function(a,b){if(typeof a=="object"&&!a.preventDefault)for(var c in a)this.unbind(c,a[c]);else for(var d=0,e=this.length;d<e;d++)f.event.remove(this[d],a,b);return this},delegate:function(a,b,c,d){return this.live(b,c,d,a)},undelegate:function(a,b,c){return arguments.length===0?this.unbind("live"):this.die(b,null,c,a)},trigger:function(a,b){return this.each(function(){f.event.trigger(a,b,this)})},triggerHandler:function(a,b){if(this[0])return f.event.trigger(a,b,this[0],!0)},toggle:function(a){var b=arguments,c=a.guid||f.guid++,d=0,e=function(c){var e=(f.data(this,"lastToggle"+a.guid)||0)%d;f.data(this,"lastToggle"+a.guid,e+1),c.preventDefault();return b[e].apply(this,arguments)||!1};e.guid=c;while(d<b.length)b[d++].guid=c;return this.click(e)},hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)}});var K={focus:"focusin",blur:"focusout",mouseenter:"mouseover",mouseleave:"mouseout"};f.each(["live","die"],function(a,c){f.fn[c]=function(a,d,e,g){var h,i=0,j,k,l,m=g||this.selector,n=g?this:f(this.context);if(typeof a=="object"&&!a.preventDefault){for(var o in a)n[c](o,d,a[o],m);return this}if(c==="die"&&!a&&g&&g.charAt(0)==="."){n.unbind(g);return this}if(d===!1||f.isFunction(d))e=d||C,d=b;a=(a||"").split(" ");while((h=a[i++])!=null){j=w.exec(h),k="",j&&(k=j[0],h=h.replace(w,""));if(h==="hover"){a.push("mouseenter"+k,"mouseleave"+k);continue}l=h,K[h]?(a.push(K[h]+k),h=h+k):h=(K[h]||h)+k;if(c==="live")for(var p=0,q=n.length;p<q;p++)f.event.add(n[p],"live."+M(h,m),{data:d,selector:m,handler:e,origType:h,origHandler:e,preType:l});else n.unbind("live."+M(h,m),e)}return this}}),f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),function(a,b){f.fn[b]=function(a,c){c==null&&(c=a,a=null);return arguments.length>0?this.bind(b,a,c):this.trigger(b)},f.attrFn&&(f.attrFn[b]=!0)}),function(){function u(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}if(i.nodeType===1){f||(i.sizcache=c,i.sizset=g);if(typeof b!="string"){if(i===b){j=!0;break}}else if(k.filter(b,[i]).length>0){j=i;break}}i=i[a]}d[g]=j}}}function t(a,b,c,d,e,f){for(var g=0,h=d.length;g<h;g++){var i=d[g];if(i){var j=!1;i=i[a];while(i){if(i.sizcache===c){j=d[i.sizset];break}i.nodeType===1&&!f&&(i.sizcache=c,i.sizset=g);if(i.nodeName.toLowerCase()===b){j=i;break}i=i[a]}d[g]=j}}}var a=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,d=0,e=Object.prototype.toString,g=!1,h=!0,i=/\\/g,j=/\W/;[0,0].sort(function(){h=!1;return 0});var k=function(b,d,f,g){f=f||[],d=d||c;var h=d;if(d.nodeType!==1&&d.nodeType!==9)return[];if(!b||typeof b!="string")return f;var i,j,n,o,q,r,s,t,u=!0,w=k.isXML(d),x=[],y=b;do{a.exec(""),i=a.exec(y);if(i){y=i[3],x.push(i[1]);if(i[2]){o=i[3];break}}}while(i);if(x.length>1&&m.exec(b))if(x.length===2&&l.relative[x[0]])j=v(x[0]+x[1],d);else{j=l.relative[x[0]]?[d]:k(x.shift(),d);while(x.length)b=x.shift(),l.relative[b]&&(b+=x.shift()),j=v(b,j)}else{!g&&x.length>1&&d.nodeType===9&&!w&&l.match.ID.test(x[0])&&!l.match.ID.test(x[x.length-1])&&(q=k.find(x.shift(),d,w),d=q.expr?k.filter(q.expr,q.set)[0]:q.set[0]);if(d){q=g?{expr:x.pop(),set:p(g)}:k.find(x.pop(),x.length===1&&(x[0]==="~"||x[0]==="+")&&d.parentNode?d.parentNode:d,w),j=q.expr?k.filter(q.expr,q.set):q.set,x.length>0?n=p(j):u=!1;while(x.length)r=x.pop(),s=r,l.relative[r]?s=x.pop():r="",s==null&&(s=d),l.relative[r](n,s,w)}else n=x=[]}n||(n=j),n||k.error(r||b);if(e.call(n)==="[object Array]")if(!u)f.push.apply(f,n);else if(d&&d.nodeType===1)for(t=0;n[t]!=null;t++)n[t]&&(n[t]===!0||n[t].nodeType===1&&k.contains(d,n[t]))&&f.push(j[t]);else for(t=0;n[t]!=null;t++)n[t]&&n[t].nodeType===1&&f.push(j[t]);else p(n,f);o&&(k(o,h,f,g),k.uniqueSort(f));return f};k.uniqueSort=function(a){if(r){g=h,a.sort(r);if(g)for(var b=1;b<a.length;b++)a[b]===a[b-1]&&a.splice(b--,1)}return a},k.matches=function(a,b){return k(a,null,null,b)},k.matchesSelector=function(a,b){return k(b,null,null,[a]).length>0},k.find=function(a,b,c){var d;if(!a)return[];for(var e=0,f=l.order.length;e<f;e++){var g,h=l.order[e];if(g=l.leftMatch[h].exec(a)){var j=g[1];g.splice(1,1);if(j.substr(j.length-1)!=="\\"){g[1]=(g[1]||"").replace(i,""),d=l.find[h](g,b,c);if(d!=null){a=a.replace(l.match[h],"");break}}}}d||(d=typeof b.getElementsByTagName!="undefined"?b.getElementsByTagName("*"):[]);return{set:d,expr:a}},k.filter=function(a,c,d,e){var f,g,h=a,i=[],j=c,m=c&&c[0]&&k.isXML(c[0]);while(a&&c.length){for(var n in l.filter)if((f=l.leftMatch[n].exec(a))!=null&&f[2]){var o,p,q=l.filter[n],r=f[1];g=!1,f.splice(1,1);if(r.substr(r.length-1)==="\\")continue;j===i&&(i=[]);if(l.preFilter[n]){f=l.preFilter[n](f,j,d,i,e,m);if(!f)g=o=!0;else if(f===!0)continue}if(f)for(var s=0;(p=j[s])!=null;s++)if(p){o=q(p,f,s,j);var t=e^!!o;d&&o!=null?t?g=!0:j[s]=!1:t&&(i.push(p),g=!0)}if(o!==b){d||(j=i),a=a.replace(l.match[n],"");if(!g)return[];break}}if(a===h)if(g==null)k.error(a);else break;h=a}return j},k.error=function(a){throw"Syntax error, unrecognized expression: "+a};var l=k.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(a){return a.getAttribute("href")},type:function(a){return a.getAttribute("type")}},relative:{"+":function(a,b){var c=typeof b=="string",d=c&&!j.test(b),e=c&&!d;d&&(b=b.toLowerCase());for(var f=0,g=a.length,h;f<g;f++)if(h=a[f]){while((h=h.previousSibling)&&h.nodeType!==1);a[f]=e||h&&h.nodeName.toLowerCase()===b?h||!1:h===b}e&&k.filter(b,a,!0)},">":function(a,b){var c,d=typeof b=="string",e=0,f=a.length;if(d&&!j.test(b)){b=b.toLowerCase();for(;e<f;e++){c=a[e];if(c){var g=c.parentNode;a[e]=g.nodeName.toLowerCase()===b?g:!1}}}else{for(;e<f;e++)c=a[e],c&&(a[e]=d?c.parentNode:c.parentNode===b);d&&k.filter(b,a,!0)}},"":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("parentNode",b,f,a,e,c)},"~":function(a,b,c){var e,f=d++,g=u;typeof b=="string"&&!j.test(b)&&(b=b.toLowerCase(),e=b,g=t),g("previousSibling",b,f,a,e,c)}},find:{ID:function(a,b,c){if(typeof b.getElementById!="undefined"&&!c){var d=b.getElementById(a[1]);return d&&d.parentNode?[d]:[]}},NAME:function(a,b){if(typeof b.getElementsByName!="undefined"){var c=[],d=b.getElementsByName(a[1]);for(var e=0,f=d.length;e<f;e++)d[e].getAttribute("name")===a[1]&&c.push(d[e]);return c.length===0?null:c}},TAG:function(a,b){if(typeof b.getElementsByTagName!="undefined")return b.getElementsByTagName(a[1])}},preFilter:{CLASS:function(a,b,c,d,e,f){a=" "+a[1].replace(i,"")+" ";if(f)return a;for(var g=0,h;(h=b[g])!=null;g++)h&&(e^(h.className&&(" "+h.className+" ").replace(/[\t\n\r]/g," ").indexOf(a)>=0)?c||d.push(h):c&&(b[g]=!1));return!1},ID:function(a){return a[1].replace(i,"")},TAG:function(a,b){return a[1].replace(i,"").toLowerCase()},CHILD:function(a){if(a[1]==="nth"){a[2]||k.error(a[0]),a[2]=a[2].replace(/^\+|\s*/g,"");var b=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2]==="even"&&"2n"||a[2]==="odd"&&"2n+1"||!/\D/.test(a[2])&&"0n+"+a[2]||a[2]);a[2]=b[1]+(b[2]||1)-0,a[3]=b[3]-0}else a[2]&&k.error(a[0]);a[0]=d++;return a},ATTR:function(a,b,c,d,e,f){var g=a[1]=a[1].replace(i,"");!f&&l.attrMap[g]&&(a[1]=l.attrMap[g]),a[4]=(a[4]||a[5]||"").replace(i,""),a[2]==="~="&&(a[4]=" "+a[4]+" ");return a},PSEUDO:function(b,c,d,e,f){if(b[1]==="not")if((a.exec(b[3])||"").length>1||/^\w/.test(b[3]))b[3]=k(b[3],null,null,c);else{var g=k.filter(b[3],c,d,!0^f);d||e.push.apply(e,g);return!1}else if(l.match.POS.test(b[0])||l.match.CHILD.test(b[0]))return!0;return b},POS:function(a){a.unshift(!0);return a}},filters:{enabled:function(a){return a.disabled===!1&&a.type!=="hidden"},disabled:function(a){return a.disabled===!0},checked:function(a){return a.checked===!0},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return a.selected===!0},parent:function(a){return!!a.firstChild},empty:function(a){return!a.firstChild},has:function(a,b,c){return!!k(c[3],a).length},header:function(a){return/h\d/i.test(a.nodeName)},text:function(a){var b=a.getAttribute("type"),c=a.type;return a.nodeName.toLowerCase()==="input"&&"text"===c&&(b===c||b===null)},radio:function(a){return a.nodeName.toLowerCase()==="input"&&"radio"===a.type},checkbox:function(a){return a.nodeName.toLowerCase()==="input"&&"checkbox"===a.type},file:function(a){return a.nodeName.toLowerCase()==="input"&&"file"===a.type},password:function(a){return a.nodeName.toLowerCase()==="input"&&"password"===a.type},submit:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"submit"===a.type},image:function(a){return a.nodeName.toLowerCase()==="input"&&"image"===a.type},reset:function(a){var b=a.nodeName.toLowerCase();return(b==="input"||b==="button")&&"reset"===a.type},button:function(a){var b=a.nodeName.toLowerCase();return b==="input"&&"button"===a.type||b==="button"},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},focus:function(a){return a===a.ownerDocument.activeElement}},setFilters:{first:function(a,b){return b===0},last:function(a,b,c,d){return b===d.length-1},even:function(a,b){return b%2===0},odd:function(a,b){return b%2===1},lt:function(a,b,c){return b<c[3]-0},gt:function(a,b,c){return b>c[3]-0},nth:function(a,b,c){return c[3]-0===b},eq:function(a,b,c){return c[3]-0===b}},filter:{PSEUDO:function(a,b,c,d){var e=b[1],f=l.filters[e];if(f)return f(a,c,b,d);if(e==="contains")return(a.textContent||a.innerText||k.getText([a])||"").indexOf(b[3])>=0;if(e==="not"){var g=b[3];for(var h=0,i=g.length;h<i;h++)if(g[h]===a)return!1;return!0}k.error(e)},CHILD:function(a,b){var c=b[1],d=a;switch(c){case"only":case"first":while(d=d.previousSibling)if(d.nodeType===1)return!1;if(c==="first")return!0;d=a;case"last":while(d=d.nextSibling)if(d.nodeType===1)return!1;return!0;case"nth":var e=b[2],f=b[3];if(e===1&&f===0)return!0;var g=b[0],h=a.parentNode;if(h&&(h.sizcache!==g||!a.nodeIndex)){var i=0;for(d=h.firstChild;d;d=d.nextSibling)d.nodeType===1&&(d.nodeIndex=++i);h.sizcache=g}var j=a.nodeIndex-f;return e===0?j===0:j%e===0&&j/e>=0}},ID:function(a,b){return a.nodeType===1&&a.getAttribute("id")===b},TAG:function(a,b){return b==="*"&&a.nodeType===1||a.nodeName.toLowerCase()===b},CLASS:function(a,b){return(" "+(a.className||a.getAttribute("class"))+" ").indexOf(b)>-1},ATTR:function(a,b){var c=b[1],d=l.attrHandle[c]?l.attrHandle[c](a):a[c]!=null?a[c]:a.getAttribute(c),e=d+"",f=b[2],g=b[4];return d==null?f==="!=":f==="="?e===g:f==="*="?e.indexOf(g)>=0:f==="~="?(" "+e+" ").indexOf(g)>=0:g?f==="!="?e!==g:f==="^="?e.indexOf(g)===0:f==="$="?e.substr(e.length-g.length)===g:f==="|="?e===g||e.substr(0,g.length+1)===g+"-":!1:e&&d!==!1},POS:function(a,b,c,d){var e=b[2],f=l.setFilters[e];if(f)return f(a,c,b,d)}}},m=l.match.POS,n=function(a,b){return"\\"+(b-0+1)};for(var o in l.match)l.match[o]=new RegExp(l.match[o].source+/(?![^\[]*\])(?![^\(]*\))/.source),l.leftMatch[o]=new RegExp(/(^(?:.|\r|\n)*?)/.source+l.match[o].source.replace(/\\(\d+)/g,n));var p=function(a,b){a=Array.prototype.slice.call(a,0);if(b){b.push.apply(b,a);return b}return a};try{Array.prototype.slice.call(c.documentElement.childNodes,0)[0].nodeType}catch(q){p=function(a,b){var c=0,d=b||[];if(e.call(a)==="[object Array]")Array.prototype.push.apply(d,a);else if(typeof a.length=="number")for(var f=a.length;c<f;c++)d.push(a[c]);else for(;a[c];c++)d.push(a[c]);return d}}var r,s;c.documentElement.compareDocumentPosition?r=function(a,b){if(a===b){g=!0;return 0}if(!a.compareDocumentPosition||!b.compareDocumentPosition)return a.compareDocumentPosition?-1:1;return a.compareDocumentPosition(b)&4?-1:1}:(r=function(a,b){if(a===b){g=!0;return 0}if(a.sourceIndex&&b.sourceIndex)return a.sourceIndex-b.sourceIndex;var c,d,e=[],f=[],h=a.parentNode,i=b.parentNode,j=h;if(h===i)return s(a,b);if(!h)return-1;if(!i)return 1;while(j)e.unshift(j),j=j.parentNode;j=i;while(j)f.unshift(j),j=j.parentNode;c=e.length,d=f.length;for(var k=0;k<c&&k<d;k++)if(e[k]!==f[k])return s(e[k],f[k]);return k===c?s(a,f[k],-1):s(e[k],b,1)},s=function(a,b,c){if(a===b)return c;var d=a.nextSibling;while(d){if(d===b)return-1;d=d.nextSibling}return 1}),k.getText=function(a){var b="",c;for(var d=0;a[d];d++)c=a[d],c.nodeType===3||c.nodeType===4?b+=c.nodeValue:c.nodeType!==8&&(b+=k.getText(c.childNodes));return b},function(){var a=c.createElement("div"),d="script"+(new Date).getTime(),e=c.documentElement;a.innerHTML="<a name='"+d+"'/>",e.insertBefore(a,e.firstChild),c.getElementById(d)&&(l.find.ID=function(a,c,d){if(typeof c.getElementById!="undefined"&&!d){var e=c.getElementById(a[1]);return e?e.id===a[1]||typeof e.getAttributeNode!="undefined"&&e.getAttributeNode("id").nodeValue===a[1]?[e]:b:[]}},l.filter.ID=function(a,b){var c=typeof a.getAttributeNode!="undefined"&&a.getAttributeNode("id");return a.nodeType===1&&c&&c.nodeValue===b}),e.removeChild(a),e=a=null}(),function(){var a=c.createElement("div");a.appendChild(c.createComment("")),a.getElementsByTagName("*").length>0&&(l.find.TAG=function(a,b){var c=b.getElementsByTagName(a[1]);if(a[1]==="*"){var d=[];for(var e=0;c[e];e++)c[e].nodeType===1&&d.push(c[e]);c=d}return c}),a.innerHTML="<a href='#'></a>",a.firstChild&&typeof a.firstChild.getAttribute!="undefined"&&a.firstChild.getAttribute("href")!=="#"&&(l.attrHandle.href=function(a){return a.getAttribute("href",2)}),a=null}(),c.querySelectorAll&&function(){var a=k,b=c.createElement("div"),d="__sizzle__";b.innerHTML="<p class='TEST'></p>";if(!b.querySelectorAll||b.querySelectorAll(".TEST").length!==0){k=function(b,e,f,g){e=e||c;if(!g&&!k.isXML(e)){var h=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);if(h&&(e.nodeType===1||e.nodeType===9)){if(h[1])return p(e.getElementsByTagName(b),f);if(h[2]&&l.find.CLASS&&e.getElementsByClassName)return p(e.getElementsByClassName(h[2]),f)}if(e.nodeType===9){if(b==="body"&&e.body)return p([e.body],f);if(h&&h[3]){var i=e.getElementById(h[3]);if(!i||!i.parentNode)return p([],f);if(i.id===h[3])return p([i],f)}try{return p(e.querySelectorAll(b),f)}catch(j){}}else if(e.nodeType===1&&e.nodeName.toLowerCase()!=="object"){var m=e,n=e.getAttribute("id"),o=n||d,q=e.parentNode,r=/^\s*[+~]/.test(b);n?o=o.replace(/'/g,"\\$&"):e.setAttribute("id",o),r&&q&&(e=e.parentNode);try{if(!r||q)return p(e.querySelectorAll("[id='"+o+"'] "+b),f)}catch(s){}finally{n||m.removeAttribute("id")}}}return a(b,e,f,g)};for(var e in a)k[e]=a[e];b=null}}(),function(){var a=c.documentElement,b=a.matchesSelector||a.mozMatchesSelector||a.webkitMatchesSelector||a.msMatchesSelector;if(b){var d=!b.call(c.createElement("div"),"div"),e=!1;try{b.call(c.documentElement,"[test!='']:sizzle")}catch(f){e=!0}k.matchesSelector=function(a,c){c=c.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!k.isXML(a))try{if(e||!l.match.PSEUDO.test(c)&&!/!=/.test(c)){var f=b.call(a,c);if(f||!d||a.document&&a.document.nodeType!==11)return f}}catch(g){}return k(c,null,null,[a]).length>0}}}(),function(){var a=c.createElement("div");a.innerHTML="<div class='test e'></div><div class='test'></div>";if(!!a.getElementsByClassName&&a.getElementsByClassName("e").length!==0){a.lastChild.className="e";if(a.getElementsByClassName("e").length===1)return;l.order.splice(1,0,"CLASS"),l.find.CLASS=function(a,b,c){if(typeof b.getElementsByClassName!="undefined"&&!c)return b.getElementsByClassName(a[1])},a=null}}(),c.documentElement.contains?k.contains=function(a,b){return a!==b&&(a.contains?a.contains(b):!0)}:c.documentElement.compareDocumentPosition?k.contains=function(a,b){return!!(a.compareDocumentPosition(b)&16)}:k.contains=function(){return!1},k.isXML=function(a){var b=(a?a.ownerDocument||a:0).documentElement;return b?b.nodeName!=="HTML":!1};var v=function(a,b){var c,d=[],e="",f=b.nodeType?[b]:b;while(c=l.match.PSEUDO.exec(a))e+=c[0],a=a.replace(l.match.PSEUDO,"");a=l.relative[a]?a+"*":a;for(var g=0,h=f.length;g<h;g++)k(a,f[g],d);return k.filter(e,d)};f.find=k,f.expr=k.selectors,f.expr[":"]=f.expr.filters,f.unique=k.uniqueSort,f.text=k.getText,f.isXMLDoc=k.isXML,f.contains=k.contains}();var N=/Until$/,O=/^(?:parents|prevUntil|prevAll)/,P=/,/,Q=/^.[^:#\[\.,]*$/,R=Array.prototype.slice,S=f.expr.match.POS,T={children:!0,contents:!0,next:!0,prev:!0};f.fn.extend({find:function(a){var b=this,c,d;if(typeof a!="string")return f(a).filter(function(){for(c=0,d=b.length;c<d;c++)if(f.contains(b[c],this))return!0});var e=this.pushStack("","find",a),g,h,i;for(c=0,d=this.length;c<d;c++){g=e.length,f.find(a,this[c],e);if(c>0)for(h=g;h<e.length;h++)for(i=0;i<g;i++)if(e[i]===e[h]){e.splice(h--,1);break}}return e},has:function(a){var b=f(a);return this.filter(function(){for(var a=0,c=b.length;a<c;a++)if(f.contains(this,b[a]))return!0})},not:function(a){return this.pushStack(V(this,a,!1),"not",a)},filter:function(a){return this.pushStack(V(this,a,!0),"filter",a)},is:function(a){return!!a&&(typeof a=="string"?f.filter(a,this).length>0:this.filter(a).length>0)},closest:function(a,b){var c=[],d,e,g=this[0];if(f.isArray(a)){var h,i,j={},k=1;if(g&&a.length){for(d=0,e=a.length;d<e;d++)i=a[d],j[i]||(j[i]=S.test(i)?f(i,b||this.context):i);while(g&&g.ownerDocument&&g!==b){for(i in j)h=j[i],(h.jquery?h.index(g)>-1:f(g).is(h))&&c.push({selector:i,elem:g,level:k});g=g.parentNode,k++}}return c}var l=S.test(a)||typeof a!="string"?f(a,b||this.context):0;for(d=0,e=this.length;d<e;d++){g=this[d];while(g){if(l?l.index(g)>-1:f.find.matchesSelector(g,a)){c.push(g);break}g=g.parentNode;if(!g||!g.ownerDocument||g===b||g.nodeType===11)break}}c=c.length>1?f.unique(c):c;return this.pushStack(c,"closest",a)},index:function(a){if(!a)return this[0]&&this[0].parentNode?this.prevAll().length:-1;if(typeof a=="string")return f.inArray(this[0],f(a));return f.inArray(a.jquery?a[0]:a,this)},add:function(a,b){var c=typeof a=="string"?f(a,b):f.makeArray(a&&a.nodeType?[a]:a),d=f.merge(this.get(),c);return this.pushStack(U(c[0])||U(d[0])?d:f.unique(d))},andSelf:function(){return this.add(this.prevObject)}}),f.each({parent:function(a){var b=a.parentNode;return b&&b.nodeType!==11?b:null},parents:function(a){return f.dir(a,"parentNode")},parentsUntil:function(a,b,c){return f.dir(a,"parentNode",c)},next:function(a){return f.nth(a,2,"nextSibling")},prev:function(a){return f.nth(a,2,"previousSibling")},nextAll:function(a){return f.dir(a,"nextSibling")},prevAll:function(a){return f.dir(a,"previousSibling")},nextUntil:function(a,b,c){return f.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return f.dir(a,"previousSibling",c)},siblings:function(a){return f.sibling(a.parentNode.firstChild,a)},children:function(a){return f.sibling(a.firstChild)},contents:function(a){return f.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:f.makeArray(a.childNodes)}},function(a,b){f.fn[a]=function(c,d){var e=f.map(this,b,c),g=R.call(arguments);N.test(a)||(d=c),d&&typeof d=="string"&&(e=f.filter(d,e)),e=this.length>1&&!T[a]?f.unique(e):e,(this.length>1||P.test(d))&&O.test(a)&&(e=e.reverse());return this.pushStack(e,a,g.join(","))}}),f.extend({filter:function(a,b,c){c&&(a=":not("+a+")");return b.length===1?f.find.matchesSelector(b[0],a)?[b[0]]:[]:f.find.matches(a,b)},dir:function(a,c,d){var e=[],g=a[c];while(g&&g.nodeType!==9&&(d===b||g.nodeType!==1||!f(g).is(d)))g.nodeType===1&&e.push(g),g=g[c];return e},nth:function(a,b,c,d){b=b||1;var e=0;for(;a;a=a[c])if(a.nodeType===1&&++e===b)break;return a},sibling:function(a,b){var c=[];for(;a;a=a.nextSibling)a.nodeType===1&&a!==b&&c.push(a);return c}});var W=/ jQuery\d+="(?:\d+|null)"/g,X=/^\s+/,Y=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,Z=/<([\w:]+)/,$=/<tbody/i,_=/<|&#?\w+;/,ba=/<(?:script|object|embed|option|style)/i,bb=/checked\s*(?:[^=]|=\s*.checked.)/i,bc=/\/(java|ecma)script/i,bd=/^\s*<!(?:\[CDATA\[|\-\-)/,be={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]};be.optgroup=be.option,be.tbody=be.tfoot=be.colgroup=be.caption=be.thead,be.th=be.td,f.support.htmlSerialize||(be._default=[1,"div<div>","</div>"]),f.fn.extend({text:function(a){if(f.isFunction(a))return this.each(function(b){var c=f(this);c.text(a.call(this,b,c.text()))});if(typeof a!="object"&&a!==b)return this.empty().append((this[0]&&this[0].ownerDocument||c).createTextNode(a));return f.text(this)},wrapAll:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapAll(a.call(this,b))});if(this[0]){var b=f(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&a.firstChild.nodeType===1)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){if(f.isFunction(a))return this.each(function(b){f(this).wrapInner(a.call(this,b))});return this.each(function(){var b=f(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){return this.each(function(){f(this).wrapAll(a)})},unwrap:function(){return this.parent().each(function(){f.nodeName(this,"body")||f(this).replaceWith(this.childNodes)}).end()},append:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.appendChild(a)})},prepend:function(){return this.domManip(arguments,!0,function(a){this.nodeType===1&&this.insertBefore(a,this.firstChild)})},before:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this)});if(arguments.length){var a=f(arguments[0]);a.push.apply(a,this.toArray());return this.pushStack(a,"before",arguments)}},after:function(){if(this[0]&&this[0].parentNode)return this.domManip(arguments,!1,function(a){this.parentNode.insertBefore(a,this.nextSibling)});if(arguments.length){var a=this.pushStack(this,"after",arguments);a.push.apply(a,f(arguments[0]).toArray());return a}},remove:function(a,b){for(var c=0,d;(d=this[c])!=null;c++)if(!a||f.filter(a,[d]).length)!b&&d.nodeType===1&&(f.cleanData(d.getElementsByTagName("*")),f.cleanData([d])),d.parentNode&&d.parentNode.removeChild(d);return this},empty:function(){for(var a=0,b;(b=this[a])!=null;a++){b.nodeType===1&&f.cleanData(b.getElementsByTagName("*"));while(b.firstChild)b.removeChild(b.firstChild)}return this},clone:function(a,b){a=a==null?!1:a,b=b==null?a:b;return this.map(function(){return f.clone(this,a,b)})},html:function(a){if(a===b)return this[0]&&this[0].nodeType===1?this[0].innerHTML.replace(W,""):null;if(typeof a=="string"&&!ba.test(a)&&(f.support.leadingWhitespace||!X.test(a))&&!be[(Z.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(Y,"<$1></$2>");try{for(var c=0,d=this.length;c<d;c++)this[c].nodeType===1&&(f.cleanData(this[c].getElementsByTagName("*")),this[c].innerHTML=a)}catch(e){this.empty().append(a)}}else f.isFunction(a)?this.each(function(b){var c=f(this);c.html(a.call(this,b,c.html()))}):this.empty().append(a);return this},replaceWith:function(a){if(this[0]&&this[0].parentNode){if(f.isFunction(a))return this.each(function(b){var c=f(this),d=c.html();c.replaceWith(a.call(this,b,d))});typeof a!="string"&&(a=f(a).detach());return this.each(function(){var b=this.nextSibling,c=this.parentNode;f(this).remove(),b?f(b).before(a):f(c).append(a)})}return this.length?this.pushStack(f(f.isFunction(a)?a():a),"replaceWith",a):this},detach:function(a){return this.remove(a,!0)},domManip:function(a,c,d){var e,g,h,i,j=a[0],k=[];if(!f.support.checkClone&&arguments.length===3&&typeof j=="string"&&bb.test(j))return this.each(function(){f(this).domManip(a,c,d,!0)});if(f.isFunction(j))return this.each(function(e){var g=f(this);a[0]=j.call(this,e,c?g.html():b),g.domManip(a,c,d)});if(this[0]){i=j&&j.parentNode,f.support.parentNode&&i&&i.nodeType===11&&i.childNodes.length===this.length?e={fragment:i}:e=f.buildFragment(a,this,k),h=e.fragment,h.childNodes.length===1?g=h=h.firstChild:g=h.firstChild;if(g){c=c&&f.nodeName(g,"tr");for(var l=0,m=this.length,n=m-1;l<m;l++)d.call(c?bf(this[l],g):this[l],e.cacheable||m>1&&l<n?f.clone(h,!0,!0):h)}k.length&&f.each(k,bl)}return this}}),f.buildFragment=function(a,b,d){var e,g,h,i;b&&b[0]&&(i=b[0].ownerDocument||b[0]),i.createDocumentFragment||(i=c),a.length===1&&typeof a[0]=="string"&&a[0].length<512&&i===c&&a[0].charAt(0)==="<"&&!ba.test(a[0])&&(f.support.checkClone||!bb.test(a[0]))&&(g=!0,h=f.fragments[a[0]],h&&h!==1&&(e=h)),e||(e=i.createDocumentFragment(),f.clean
(a,i,e,d)),g&&(f.fragments[a[0]]=h?e:1);return{fragment:e,cacheable:g}},f.fragments={},f.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){f.fn[a]=function(c){var d=[],e=f(c),g=this.length===1&&this[0].parentNode;if(g&&g.nodeType===11&&g.childNodes.length===1&&e.length===1){e[b](this[0]);return this}for(var h=0,i=e.length;h<i;h++){var j=(h>0?this.clone(!0):this).get();f(e[h])[b](j),d=d.concat(j)}return this.pushStack(d,a,e.selector)}}),f.extend({clone:function(a,b,c){var d=a.cloneNode(!0),e,g,h;if((!f.support.noCloneEvent||!f.support.noCloneChecked)&&(a.nodeType===1||a.nodeType===11)&&!f.isXMLDoc(a)){bh(a,d),e=bi(a),g=bi(d);for(h=0;e[h];++h)g[h]&&bh(e[h],g[h])}if(b){bg(a,d);if(c){e=bi(a),g=bi(d);for(h=0;e[h];++h)bg(e[h],g[h])}}e=g=null;return d},clean:function(a,b,d,e){var g;b=b||c,typeof b.createElement=="undefined"&&(b=b.ownerDocument||b[0]&&b[0].ownerDocument||c);var h=[],i;for(var j=0,k;(k=a[j])!=null;j++){typeof k=="number"&&(k+="");if(!k)continue;if(typeof k=="string")if(!_.test(k))k=b.createTextNode(k);else{k=k.replace(Y,"<$1></$2>");var l=(Z.exec(k)||["",""])[1].toLowerCase(),m=be[l]||be._default,n=m[0],o=b.createElement("div");o.innerHTML=m[1]+k+m[2];while(n--)o=o.lastChild;if(!f.support.tbody){var p=$.test(k),q=l==="table"&&!p?o.firstChild&&o.firstChild.childNodes:m[1]==="<table>"&&!p?o.childNodes:[];for(i=q.length-1;i>=0;--i)f.nodeName(q[i],"tbody")&&!q[i].childNodes.length&&q[i].parentNode.removeChild(q[i])}!f.support.leadingWhitespace&&X.test(k)&&o.insertBefore(b.createTextNode(X.exec(k)[0]),o.firstChild),k=o.childNodes}var r;if(!f.support.appendChecked)if(k[0]&&typeof (r=k.length)=="number")for(i=0;i<r;i++)bk(k[i]);else bk(k);k.nodeType?h.push(k):h=f.merge(h,k)}if(d){g=function(a){return!a.type||bc.test(a.type)};for(j=0;h[j];j++)if(e&&f.nodeName(h[j],"script")&&(!h[j].type||h[j].type.toLowerCase()==="text/javascript"))e.push(h[j].parentNode?h[j].parentNode.removeChild(h[j]):h[j]);else{if(h[j].nodeType===1){var s=f.grep(h[j].getElementsByTagName("script"),g);h.splice.apply(h,[j+1,0].concat(s))}d.appendChild(h[j])}}return h},cleanData:function(a){var b,c,d=f.cache,e=f.expando,g=f.event.special,h=f.support.deleteExpando;for(var i=0,j;(j=a[i])!=null;i++){if(j.nodeName&&f.noData[j.nodeName.toLowerCase()])continue;c=j[f.expando];if(c){b=d[c]&&d[c][e];if(b&&b.events){for(var k in b.events)g[k]?f.event.remove(j,k):f.removeEvent(j,k,b.handle);b.handle&&(b.handle.elem=null)}h?delete j[f.expando]:j.removeAttribute&&j.removeAttribute(f.expando),delete d[c]}}}});var bm=/alpha\([^)]*\)/i,bn=/opacity=([^)]*)/,bo=/([A-Z]|^ms)/g,bp=/^-?\d+(?:px)?$/i,bq=/^-?\d/,br=/^([\-+])=([\-+.\de]+)/,bs={position:"absolute",visibility:"hidden",display:"block"},bt=["Left","Right"],bu=["Top","Bottom"],bv,bw,bx;f.fn.css=function(a,c){if(arguments.length===2&&c===b)return this;return f.access(this,a,c,!0,function(a,c,d){return d!==b?f.style(a,c,d):f.css(a,c)})},f.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=bv(a,"opacity","opacity");return c===""?"1":c}return a.style.opacity}}},cssNumber:{fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":f.support.cssFloat?"cssFloat":"styleFloat"},style:function(a,c,d,e){if(!!a&&a.nodeType!==3&&a.nodeType!==8&&!!a.style){var g,h,i=f.camelCase(c),j=a.style,k=f.cssHooks[i];c=f.cssProps[i]||i;if(d===b){if(k&&"get"in k&&(g=k.get(a,!1,e))!==b)return g;return j[c]}h=typeof d,h==="string"&&(g=br.exec(d))&&(d=+(g[1]+1)*+g[2]+parseFloat(f.css(a,c)),h="number");if(d==null||h==="number"&&isNaN(d))return;h==="number"&&!f.cssNumber[i]&&(d+="px");if(!k||!("set"in k)||(d=k.set(a,d))!==b)try{j[c]=d}catch(l){}}},css:function(a,c,d){var e,g;c=f.camelCase(c),g=f.cssHooks[c],c=f.cssProps[c]||c,c==="cssFloat"&&(c="float");if(g&&"get"in g&&(e=g.get(a,!0,d))!==b)return e;if(bv)return bv(a,c)},swap:function(a,b,c){var d={};for(var e in b)d[e]=a.style[e],a.style[e]=b[e];c.call(a);for(e in b)a.style[e]=d[e]}}),f.curCSS=f.css,f.each(["height","width"],function(a,b){f.cssHooks[b]={get:function(a,c,d){var e;if(c){if(a.offsetWidth!==0)return by(a,b,d);f.swap(a,bs,function(){e=by(a,b,d)});return e}},set:function(a,b){if(!bp.test(b))return b;b=parseFloat(b);if(b>=0)return b+"px"}}}),f.support.opacity||(f.cssHooks.opacity={get:function(a,b){return bn.test((b&&a.currentStyle?a.currentStyle.filter:a.style.filter)||"")?parseFloat(RegExp.$1)/100+"":b?"1":""},set:function(a,b){var c=a.style,d=a.currentStyle,e=f.isNaN(b)?"":"alpha(opacity="+b*100+")",g=d&&d.filter||c.filter||"";c.zoom=1;if(b>=1&&f.trim(g.replace(bm,""))===""){c.removeAttribute("filter");if(d&&!d.filter)return}c.filter=bm.test(g)?g.replace(bm,e):g+" "+e}}),f(function(){f.support.reliableMarginRight||(f.cssHooks.marginRight={get:function(a,b){var c;f.swap(a,{display:"inline-block"},function(){b?c=bv(a,"margin-right","marginRight"):c=a.style.marginRight});return c}})}),c.defaultView&&c.defaultView.getComputedStyle&&(bw=function(a,c){var d,e,g;c=c.replace(bo,"-$1").toLowerCase();if(!(e=a.ownerDocument.defaultView))return b;if(g=e.getComputedStyle(a,null))d=g.getPropertyValue(c),d===""&&!f.contains(a.ownerDocument.documentElement,a)&&(d=f.style(a,c));return d}),c.documentElement.currentStyle&&(bx=function(a,b){var c,d=a.currentStyle&&a.currentStyle[b],e=a.runtimeStyle&&a.runtimeStyle[b],f=a.style;!bp.test(d)&&bq.test(d)&&(c=f.left,e&&(a.runtimeStyle.left=a.currentStyle.left),f.left=b==="fontSize"?"1em":d||0,d=f.pixelLeft+"px",f.left=c,e&&(a.runtimeStyle.left=e));return d===""?"auto":d}),bv=bw||bx,f.expr&&f.expr.filters&&(f.expr.filters.hidden=function(a){var b=a.offsetWidth,c=a.offsetHeight;return b===0&&c===0||!f.support.reliableHiddenOffsets&&(a.style.display||f.css(a,"display"))==="none"},f.expr.filters.visible=function(a){return!f.expr.filters.hidden(a)});var bz=/%20/g,bA=/\[\]$/,bB=/\r?\n/g,bC=/#.*$/,bD=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,bE=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,bF=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,bG=/^(?:GET|HEAD)$/,bH=/^\/\//,bI=/\?/,bJ=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,bK=/^(?:select|textarea)/i,bL=/\s+/,bM=/([?&])_=[^&]*/,bN=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,bO=f.fn.load,bP={},bQ={},bR,bS,bT=["*/"]+["*"];try{bR=e.href}catch(bU){bR=c.createElement("a"),bR.href="",bR=bR.href}bS=bN.exec(bR.toLowerCase())||[],f.fn.extend({load:function(a,c,d){if(typeof a!="string"&&bO)return bO.apply(this,arguments);if(!this.length)return this;var e=a.indexOf(" ");if(e>=0){var g=a.slice(e,a.length);a=a.slice(0,e)}var h="GET";c&&(f.isFunction(c)?(d=c,c=b):typeof c=="object"&&(c=f.param(c,f.ajaxSettings.traditional),h="POST"));var i=this;f.ajax({url:a,type:h,dataType:"html",data:c,complete:function(a,b,c){c=a.responseText,a.isResolved()&&(a.done(function(a){c=a}),i.html(g?f("<div>").append(c.replace(bJ,"")).find(g):c)),d&&i.each(d,[c,b,a])}});return this},serialize:function(){return f.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?f.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||bK.test(this.nodeName)||bE.test(this.type))}).map(function(a,b){var c=f(this).val();return c==null?null:f.isArray(c)?f.map(c,function(a,c){return{name:b.name,value:a.replace(bB,"\r\n")}}):{name:b.name,value:c.replace(bB,"\r\n")}}).get()}}),f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(a,b){f.fn[b]=function(a){return this.bind(b,a)}}),f.each(["get","post"],function(a,c){f[c]=function(a,d,e,g){f.isFunction(d)&&(g=g||e,e=d,d=b);return f.ajax({type:c,url:a,data:d,success:e,dataType:g})}}),f.extend({getScript:function(a,c){return f.get(a,b,c,"script")},getJSON:function(a,b,c){return f.get(a,b,c,"json")},ajaxSetup:function(a,b){b?bX(a,f.ajaxSettings):(b=a,a=f.ajaxSettings),bX(a,b);return a},ajaxSettings:{url:bR,isLocal:bF.test(bS[1]),global:!0,type:"GET",contentType:"application/x-www-form-urlencoded",processData:!0,async:!0,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":bT},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":a.String,"text html":!0,"text json":f.parseJSON,"text xml":f.parseXML},flatOptions:{context:!0,url:!0}},ajaxPrefilter:bV(bP),ajaxTransport:bV(bQ),ajax:function(a,c){function w(a,c,l,m){if(s!==2){s=2,q&&clearTimeout(q),p=b,n=m||"",v.readyState=a>0?4:0;var o,r,u,w=c,x=l?bZ(d,v,l):b,y,z;if(a>=200&&a<300||a===304){if(d.ifModified){if(y=v.getResponseHeader("Last-Modified"))f.lastModified[k]=y;if(z=v.getResponseHeader("Etag"))f.etag[k]=z}if(a===304)w="notmodified",o=!0;else try{r=b$(d,x),w="success",o=!0}catch(A){w="parsererror",u=A}}else{u=w;if(!w||a)w="error",a<0&&(a=0)}v.status=a,v.statusText=""+(c||w),o?h.resolveWith(e,[r,w,v]):h.rejectWith(e,[v,w,u]),v.statusCode(j),j=b,t&&g.trigger("ajax"+(o?"Success":"Error"),[v,d,o?r:u]),i.resolveWith(e,[v,w]),t&&(g.trigger("ajaxComplete",[v,d]),--f.active||f.event.trigger("ajaxStop"))}}typeof a=="object"&&(c=a,a=b),c=c||{};var d=f.ajaxSetup({},c),e=d.context||d,g=e!==d&&(e.nodeType||e instanceof f)?f(e):f.event,h=f.Deferred(),i=f._Deferred(),j=d.statusCode||{},k,l={},m={},n,o,p,q,r,s=0,t,u,v={readyState:0,setRequestHeader:function(a,b){if(!s){var c=a.toLowerCase();a=m[c]=m[c]||a,l[a]=b}return this},getAllResponseHeaders:function(){return s===2?n:null},getResponseHeader:function(a){var c;if(s===2){if(!o){o={};while(c=bD.exec(n))o[c[1].toLowerCase()]=c[2]}c=o[a.toLowerCase()]}return c===b?null:c},overrideMimeType:function(a){s||(d.mimeType=a);return this},abort:function(a){a=a||"abort",p&&p.abort(a),w(0,a);return this}};h.promise(v),v.success=v.done,v.error=v.fail,v.complete=i.done,v.statusCode=function(a){if(a){var b;if(s<2)for(b in a)j[b]=[j[b],a[b]];else b=a[v.status],v.then(b,b)}return this},d.url=((a||d.url)+"").replace(bC,"").replace(bH,bS[1]+"//"),d.dataTypes=f.trim(d.dataType||"*").toLowerCase().split(bL),d.crossDomain==null&&(r=bN.exec(d.url.toLowerCase()),d.crossDomain=!(!r||r[1]==bS[1]&&r[2]==bS[2]&&(r[3]||(r[1]==="http:"?80:443))==(bS[3]||(bS[1]==="http:"?80:443)))),d.data&&d.processData&&typeof d.data!="string"&&(d.data=f.param(d.data,d.traditional)),bW(bP,d,c,v);if(s===2)return!1;t=d.global,d.type=d.type.toUpperCase(),d.hasContent=!bG.test(d.type),t&&f.active++===0&&f.event.trigger("ajaxStart");if(!d.hasContent){d.data&&(d.url+=(bI.test(d.url)?"&":"?")+d.data,delete d.data),k=d.url;if(d.cache===!1){var x=f.now(),y=d.url.replace(bM,"$1_="+x);d.url=y+(y===d.url?(bI.test(d.url)?"&":"?")+"_="+x:"")}}(d.data&&d.hasContent&&d.contentType!==!1||c.contentType)&&v.setRequestHeader("Content-Type",d.contentType),d.ifModified&&(k=k||d.url,f.lastModified[k]&&v.setRequestHeader("If-Modified-Since",f.lastModified[k]),f.etag[k]&&v.setRequestHeader("If-None-Match",f.etag[k])),v.setRequestHeader("Accept",d.dataTypes[0]&&d.accepts[d.dataTypes[0]]?d.accepts[d.dataTypes[0]]+(d.dataTypes[0]!=="*"?", "+bT+"; q=0.01":""):d.accepts["*"]);for(u in d.headers)v.setRequestHeader(u,d.headers[u]);if(d.beforeSend&&(d.beforeSend.call(e,v,d)===!1||s===2)){v.abort();return!1}for(u in{success:1,error:1,complete:1})v[u](d[u]);p=bW(bQ,d,c,v);if(!p)w(-1,"No Transport");else{v.readyState=1,t&&g.trigger("ajaxSend",[v,d]),d.async&&d.timeout>0&&(q=setTimeout(function(){v.abort("timeout")},d.timeout));try{s=1,p.send(l,w)}catch(z){s<2?w(-1,z):f.error(z)}}return v},param:function(a,c){var d=[],e=function(a,b){b=f.isFunction(b)?b():b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};c===b&&(c=f.ajaxSettings.traditional);if(f.isArray(a)||a.jquery&&!f.isPlainObject(a))f.each(a,function(){e(this.name,this.value)});else for(var g in a)bY(g,a[g],c,e);return d.join("&").replace(bz,"+")}}),f.extend({active:0,lastModified:{},etag:{}});var b_=f.now(),ca=/(\=)\?(&|$)|\?\?/i;f.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return f.expando+"_"+b_++}}),f.ajaxPrefilter("json jsonp",function(b,c,d){var e=b.contentType==="application/x-www-form-urlencoded"&&typeof b.data=="string";if(b.dataTypes[0]==="jsonp"||b.jsonp!==!1&&(ca.test(b.url)||e&&ca.test(b.data))){var g,h=b.jsonpCallback=f.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,i=a[h],j=b.url,k=b.data,l="$1"+h+"$2";b.jsonp!==!1&&(j=j.replace(ca,l),b.url===j&&(e&&(k=k.replace(ca,l)),b.data===k&&(j+=(/\?/.test(j)?"&":"?")+b.jsonp+"="+h))),b.url=j,b.data=k,a[h]=function(a){g=[a]},d.always(function(){a[h]=i,g&&f.isFunction(i)&&a[h](g[0])}),b.converters["script json"]=function(){g||f.error(h+" was not called");return g[0]},b.dataTypes[0]="json";return"script"}}),f.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(a){f.globalEval(a);return a}}}),f.ajaxPrefilter("script",function(a){a.cache===b&&(a.cache=!1),a.crossDomain&&(a.type="GET",a.global=!1)}),f.ajaxTransport("script",function(a){if(a.crossDomain){var d,e=c.head||c.getElementsByTagName("head")[0]||c.documentElement;return{send:function(f,g){d=c.createElement("script"),d.async="async",a.scriptCharset&&(d.charset=a.scriptCharset),d.src=a.url,d.onload=d.onreadystatechange=function(a,c){if(c||!d.readyState||/loaded|complete/.test(d.readyState))d.onload=d.onreadystatechange=null,e&&d.parentNode&&e.removeChild(d),d=b,c||g(200,"success")},e.insertBefore(d,e.firstChild)},abort:function(){d&&d.onload(0,1)}}}});var cb=a.ActiveXObject?function(){for(var a in cd)cd[a](0,1)}:!1,cc=0,cd;f.ajaxSettings.xhr=a.ActiveXObject?function(){return!this.isLocal&&ce()||cf()}:ce,function(a){f.extend(f.support,{ajax:!!a,cors:!!a&&"withCredentials"in a})}(f.ajaxSettings.xhr()),f.support.ajax&&f.ajaxTransport(function(c){if(!c.crossDomain||f.support.cors){var d;return{send:function(e,g){var h=c.xhr(),i,j;c.username?h.open(c.type,c.url,c.async,c.username,c.password):h.open(c.type,c.url,c.async);if(c.xhrFields)for(j in c.xhrFields)h[j]=c.xhrFields[j];c.mimeType&&h.overrideMimeType&&h.overrideMimeType(c.mimeType),!c.crossDomain&&!e["X-Requested-With"]&&(e["X-Requested-With"]="XMLHttpRequest");try{for(j in e)h.setRequestHeader(j,e[j])}catch(k){}h.send(c.hasContent&&c.data||null),d=function(a,e){var j,k,l,m,n;try{if(d&&(e||h.readyState===4)){d=b,i&&(h.onreadystatechange=f.noop,cb&&delete cd[i]);if(e)h.readyState!==4&&h.abort();else{j=h.status,l=h.getAllResponseHeaders(),m={},n=h.responseXML,n&&n.documentElement&&(m.xml=n),m.text=h.responseText;try{k=h.statusText}catch(o){k=""}!j&&c.isLocal&&!c.crossDomain?j=m.text?200:404:j===1223&&(j=204)}}}catch(p){e||g(-1,p)}m&&g(j,k,m,l)},!c.async||h.readyState===4?d():(i=++cc,cb&&(cd||(cd={},f(a).unload(cb)),cd[i]=d),h.onreadystatechange=d)},abort:function(){d&&d(0,1)}}}});var cg={},ch,ci,cj=/^(?:toggle|show|hide)$/,ck=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,cl,cm=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],cn;f.fn.extend({show:function(a,b,c){var d,e;if(a||a===0)return this.animate(cq("show",3),a,b,c);for(var g=0,h=this.length;g<h;g++)d=this[g],d.style&&(e=d.style.display,!f._data(d,"olddisplay")&&e==="none"&&(e=d.style.display=""),e===""&&f.css(d,"display")==="none"&&f._data(d,"olddisplay",cr(d.nodeName)));for(g=0;g<h;g++){d=this[g];if(d.style){e=d.style.display;if(e===""||e==="none")d.style.display=f._data(d,"olddisplay")||""}}return this},hide:function(a,b,c){if(a||a===0)return this.animate(cq("hide",3),a,b,c);for(var d=0,e=this.length;d<e;d++)if(this[d].style){var g=f.css(this[d],"display");g!=="none"&&!f._data(this[d],"olddisplay")&&f._data(this[d],"olddisplay",g)}for(d=0;d<e;d++)this[d].style&&(this[d].style.display="none");return this},_toggle:f.fn.toggle,toggle:function(a,b,c){var d=typeof a=="boolean";f.isFunction(a)&&f.isFunction(b)?this._toggle.apply(this,arguments):a==null||d?this.each(function(){var b=d?a:f(this).is(":hidden");f(this)[b?"show":"hide"]()}):this.animate(cq("toggle",3),a,b,c);return this},fadeTo:function(a,b,c,d){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=f.speed(b,c,d);if(f.isEmptyObject(a))return this.each(e.complete,[!1]);a=f.extend({},a);return this[e.queue===!1?"each":"queue"](function(){e.queue===!1&&f._mark(this);var b=f.extend({},e),c=this.nodeType===1,d=c&&f(this).is(":hidden"),g,h,i,j,k,l,m,n,o;b.animatedProperties={};for(i in a){g=f.camelCase(i),i!==g&&(a[g]=a[i],delete a[i]),h=a[g],f.isArray(h)?(b.animatedProperties[g]=h[1],h=a[g]=h[0]):b.animatedProperties[g]=b.specialEasing&&b.specialEasing[g]||b.easing||"swing";if(h==="hide"&&d||h==="show"&&!d)return b.complete.call(this);c&&(g==="height"||g==="width")&&(b.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY],f.css(this,"display")==="inline"&&f.css(this,"float")==="none"&&(f.support.inlineBlockNeedsLayout?(j=cr(this.nodeName),j==="inline"?this.style.display="inline-block":(this.style.display="inline",this.style.zoom=1)):this.style.display="inline-block"))}b.overflow!=null&&(this.style.overflow="hidden");for(i in a)k=new f.fx(this,b,i),h=a[i],cj.test(h)?k[h==="toggle"?d?"show":"hide":h]():(l=ck.exec(h),m=k.cur(),l?(n=parseFloat(l[2]),o=l[3]||(f.cssNumber[i]?"":"px"),o!=="px"&&(f.style(this,i,(n||1)+o),m=(n||1)/k.cur()*m,f.style(this,i,m+o)),l[1]&&(n=(l[1]==="-="?-1:1)*n+m),k.custom(m,n,o)):k.custom(m,h,""));return!0})},stop:function(a,b){a&&this.queue([]),this.each(function(){var a=f.timers,c=a.length;b||f._unmark(!0,this);while(c--)a[c].elem===this&&(b&&a[c](!0),a.splice(c,1))}),b||this.dequeue();return this}}),f.each({slideDown:cq("show",1),slideUp:cq("hide",1),slideToggle:cq("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){f.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),f.extend({speed:function(a,b,c){var d=a&&typeof a=="object"?f.extend({},a):{complete:c||!c&&b||f.isFunction(a)&&a,duration:a,easing:c&&b||b&&!f.isFunction(b)&&b};d.duration=f.fx.off?0:typeof d.duration=="number"?d.duration:d.duration in f.fx.speeds?f.fx.speeds[d.duration]:f.fx.speeds._default,d.old=d.complete,d.complete=function(a){f.isFunction(d.old)&&d.old.call(this),d.queue!==!1?f.dequeue(this):a!==!1&&f._unmark(this)};return d},easing:{linear:function(a,b,c,d){return c+d*a},swing:function(a,b,c,d){return(-Math.cos(a*Math.PI)/2+.5)*d+c}},timers:[],fx:function(a,b,c){this.options=b,this.elem=a,this.prop=c,b.orig=b.orig||{}}}),f.fx.prototype={update:function(){this.options.step&&this.options.step.call(this.elem,this.now,this),(f.fx.step[this.prop]||f.fx.step._default)(this)},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null))return this.elem[this.prop];var a,b=f.css(this.elem,this.prop);return isNaN(a=parseFloat(b))?!b||b==="auto"?0:b:a},custom:function(a,b,c){function g(a){return d.step(a)}var d=this,e=f.fx;this.startTime=cn||co(),this.start=a,this.end=b,this.unit=c||this.unit||(f.cssNumber[this.prop]?"":"px"),this.now=this.start,this.pos=this.state=0,g.elem=this.elem,g()&&f.timers.push(g)&&!cl&&(cl=setInterval(e.tick,e.interval))},show:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.show=!0,this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur()),f(this.elem).show()},hide:function(){this.options.orig[this.prop]=f.style(this.elem,this.prop),this.options.hide=!0,this.custom(this.cur(),0)},step:function(a){var b=cn||co(),c=!0,d=this.elem,e=this.options,g,h;if(a||b>=e.duration+this.startTime){this.now=this.end,this.pos=this.state=1,this.update(),e.animatedProperties[this.prop]=!0;for(g in e.animatedProperties)e.animatedProperties[g]!==!0&&(c=!1);if(c){e.overflow!=null&&!f.support.shrinkWrapBlocks&&f.each(["","X","Y"],function(a,b){d.style["overflow"+b]=e.overflow[a]}),e.hide&&f(d).hide();if(e.hide||e.show)for(var i in e.animatedProperties)f.style(d,i,e.orig[i]);e.complete.call(d)}return!1}e.duration==Infinity?this.now=b:(h=b-this.startTime,this.state=h/e.duration,this.pos=f.easing[e.animatedProperties[this.prop]](this.state,h,0,1,e.duration),this.now=this.start+(this.end-this.start)*this.pos),this.update();return!0}},f.extend(f.fx,{tick:function(){for(var a=f.timers,b=0;b<a.length;++b)a[b]()||a.splice(b--,1);a.length||f.fx.stop()},interval:13,stop:function(){clearInterval(cl),cl=null},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(a){f.style(a.elem,"opacity",a.now)},_default:function(a){a.elem.style&&a.elem.style[a.prop]!=null?a.elem.style[a.prop]=(a.prop==="width"||a.prop==="height"?Math.max(0,a.now):a.now)+a.unit:a.elem[a.prop]=a.now}}}),f.expr&&f.expr.filters&&(f.expr.filters.animated=function(a){return f.grep(f.timers,function(b){return a===b.elem}).length});var cs=/^t(?:able|d|h)$/i,ct=/^(?:body|html)$/i;"getBoundingClientRect"in c.documentElement?f.fn.offset=function(a){var b=this[0],c;if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);try{c=b.getBoundingClientRect()}catch(d){}var e=b.ownerDocument,g=e.documentElement;if(!c||!f.contains(g,b))return c?{top:c.top,left:c.left}:{top:0,left:0};var h=e.body,i=cu(e),j=g.clientTop||h.clientTop||0,k=g.clientLeft||h.clientLeft||0,l=i.pageYOffset||f.support.boxModel&&g.scrollTop||h.scrollTop,m=i.pageXOffset||f.support.boxModel&&g.scrollLeft||h.scrollLeft,n=c.top+l-j,o=c.left+m-k;return{top:n,left:o}}:f.fn.offset=function(a){var b=this[0];if(a)return this.each(function(b){f.offset.setOffset(this,a,b)});if(!b||!b.ownerDocument)return null;if(b===b.ownerDocument.body)return f.offset.bodyOffset(b);f.offset.initialize();var c,d=b.offsetParent,e=b,g=b.ownerDocument,h=g.documentElement,i=g.body,j=g.defaultView,k=j?j.getComputedStyle(b,null):b.currentStyle,l=b.offsetTop,m=b.offsetLeft;while((b=b.parentNode)&&b!==i&&b!==h){if(f.offset.supportsFixedPosition&&k.position==="fixed")break;c=j?j.getComputedStyle(b,null):b.currentStyle,l-=b.scrollTop,m-=b.scrollLeft,b===d&&(l+=b.offsetTop,m+=b.offsetLeft,f.offset.doesNotAddBorder&&(!f.offset.doesAddBorderForTableAndCells||!cs.test(b.nodeName))&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),e=d,d=b.offsetParent),f.offset.subtractsBorderForOverflowNotVisible&&c.overflow!=="visible"&&(l+=parseFloat(c.borderTopWidth)||0,m+=parseFloat(c.borderLeftWidth)||0),k=c}if(k.position==="relative"||k.position==="static")l+=i.offsetTop,m+=i.offsetLeft;f.offset.supportsFixedPosition&&k.position==="fixed"&&(l+=Math.max(h.scrollTop,i.scrollTop),m+=Math.max(h.scrollLeft,i.scrollLeft));return{top:l,left:m}},f.offset={initialize:function(){var a=c.body,b=c.createElement("div"),d,e,g,h,i=parseFloat(f.css(a,"marginTop"))||0,j="<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";f.extend(b.style,{position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"}),b.innerHTML=j,a.insertBefore(b,a.firstChild),d=b.firstChild,e=d.firstChild,h=d.nextSibling.firstChild.firstChild,this.doesNotAddBorder=e.offsetTop!==5,this.doesAddBorderForTableAndCells=h.offsetTop===5,e.style.position="fixed",e.style.top="20px",this.supportsFixedPosition=e.offsetTop===20||e.offsetTop===15,e.style.position=e.style.top="",d.style.overflow="hidden",d.style.position="relative",this.subtractsBorderForOverflowNotVisible=e.offsetTop===-5,this.doesNotIncludeMarginInBodyOffset=a.offsetTop!==i,a.removeChild(b),f.offset.initialize=f.noop},bodyOffset:function(a){var b=a.offsetTop,c=a.offsetLeft;f.offset.initialize(),f.offset.doesNotIncludeMarginInBodyOffset&&(b+=parseFloat(f.css(a,"marginTop"))||0,c+=parseFloat(f.css(a,"marginLeft"))||0);return{top:b,left:c}},setOffset:function(a,b,c){var d=f.css(a,"position");d==="static"&&(a.style.position="relative");var e=f(a),g=e.offset(),h=f.css(a,"top"),i=f.css(a,"left"),j=(d==="absolute"||d==="fixed")&&f.inArray("auto",[h,i])>-1,k={},l={},m,n;j?(l=e.position(),m=l.top,n=l.left):(m=parseFloat(h)||0,n=parseFloat(i)||0),f.isFunction(b)&&(b=b.call(a,c,g)),b.top!=null&&(k.top=b.top-g.top+m),b.left!=null&&(k.left=b.left-g.left+n),"using"in b?b.using.call(a,k):e.css(k)}},f.fn.extend({position:function(){if(!this[0])return null;var a=this[0],b=this.offsetParent(),c=this.offset(),d=ct.test(b[0].nodeName)?{top:0,left:0}:b.offset();c.top-=parseFloat(f.css(a,"marginTop"))||0,c.left-=parseFloat(f.css(a,"marginLeft"))||0,d.top+=parseFloat(f.css(b[0],"borderTopWidth"))||0,d.left+=parseFloat(f.css(b[0],"borderLeftWidth"))||0;return{top:c.top-d.top,left:c.left-d.left}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||c.body;while(a&&!ct.test(a.nodeName)&&f.css(a,"position")==="static")a=a.offsetParent;return a})}}),f.each(["Left","Top"],function(a,c){var d="scroll"+c;f.fn[d]=function(c){var e,g;if(c===b){e=this[0];if(!e)return null;g=cu(e);return g?"pageXOffset"in g?g[a?"pageYOffset":"pageXOffset"]:f.support.boxModel&&g.document.documentElement[d]||g.document.body[d]:e[d]}return this.each(function(){g=cu(this),g?g.scrollTo(a?f(g).scrollLeft():c,a?c:f(g).scrollTop()):this[d]=c})}}),f.each(["Height","Width"],function(a,c){var d=c.toLowerCase();f.fn["inner"+c]=function(){var a=this[0];return a&&a.style?parseFloat(f.css(a,d,"padding")):null},f.fn["outer"+c]=function(a){var b=this[0];return b&&b.style?parseFloat(f.css(b,d,a?"margin":"border")):null},f.fn[d]=function(a){var e=this[0];if(!e)return a==null?null:this;if(f.isFunction(a))return this.each(function(b){var c=f(this);c[d](a.call(this,b,c[d]()))});if(f.isWindow(e)){var g=e.document.documentElement["client"+c],h=e.document.body;return e.document.compatMode==="CSS1Compat"&&g||h&&h["client"+c]||g}if(e.nodeType===9)return Math.max(e.documentElement["client"+c],e.body["scroll"+c],e.documentElement["scroll"+c],e.body["offset"+c],e.documentElement["offset"+c]);if(a===b){var i=f.css(e,d),j=parseFloat(i);return f.isNaN(j)?i:j}return this.css(d,typeof a=="string"?a:a+"px")}}),a.jQuery=a.$=f})(window);
 /*
 * timeago: a jQuery plugin, version: 0.9.3 (2011-01-21)
 * @requires jQuery v1.2.3 or later
 *
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowFuture: false,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        numbers: []
      }
    },
    inWords: function(distanceMillis) {
      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
        distanceMillis = Math.abs(distanceMillis);
      }

      var seconds = distanceMillis / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 48 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.floor(days)) ||
        days < 60 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.floor(days / 30)) ||
        years < 2 && substitute($l.year, 1) ||
        substitute($l.years, Math.floor(years));

      return $.trim([prefix, words, suffix].join(" "));
    },
    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d\d\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      return new Date(s);
    },
    datetime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      var isTime = $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
      var iso8601 = isTime ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    }
  });

  $.fn.timeago = function() {
    var self = this;
    self.each(refresh);

    var $s = $t.settings;
    if ($s.refreshMillis > 0) {
      setInterval(function() { self.each(refresh); }, $s.refreshMillis);
    }
    return self;
  };

  function refresh() {
    var data = prepareData(this);
    if (!isNaN(data.datetime)) {
      $(this).text(inWords(data.datetime));
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if (text.length > 0) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}(jQuery));

 /*!
 * jQuery Templates Plugin 1.0.0pre
 * http://github.com/jquery/jquery-tmpl
 * Requires jQuery 1.4.2
 *
 * Copyright Software Freedom Conservancy, Inc.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
(function( jQuery, undefined ){
	var oldManip = jQuery.fn.domManip, tmplItmAtt = "_tmplitem", htmlExpr = /^[^<]*(<[\w\W]+>)[^>]*$|\{\{\! /,
		newTmplItems = {}, wrappedItems = {}, appendToTmplItems, topTmplItem = { key: 0, data: {} }, itemKey = 0, cloneIndex = 0, stack = [];

	function newTmplItem( options, parentItem, fn, data ) {
		// Returns a template item data structure for a new rendered instance of a template (a 'template item').
		// The content field is a hierarchical array of strings and nested items (to be
		// removed and replaced by nodes field of dom elements, once inserted in DOM).
		var newItem = {
			data: data || (data === 0 || data === false) ? data : (parentItem ? parentItem.data : {}),
			_wrap: parentItem ? parentItem._wrap : null,
			tmpl: null,
			parent: parentItem || null,
			nodes: [],
			calls: tiCalls,
			nest: tiNest,
			wrap: tiWrap,
			html: tiHtml,
			update: tiUpdate
		};
		if ( options ) {
			jQuery.extend( newItem, options, { nodes: [], parent: parentItem });
		}
		if ( fn ) {
			// Build the hierarchical content to be used during insertion into DOM
			newItem.tmpl = fn;
			newItem._ctnt = newItem._ctnt || newItem.tmpl( jQuery, newItem );
			newItem.key = ++itemKey;
			// Keep track of new template item, until it is stored as jQuery Data on DOM element
			(stack.length ? wrappedItems : newTmplItems)[itemKey] = newItem;
		}
		return newItem;
	}

	// Override appendTo etc., in order to provide support for targeting multiple elements. (This code would disappear if integrated in jquery core).
	jQuery.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var ret = [], insert = jQuery( selector ), elems, i, l, tmplItems,
				parent = this.length === 1 && this[0].parentNode;

			appendToTmplItems = newTmplItems || {};
			if ( parent && parent.nodeType === 11 && parent.childNodes.length === 1 && insert.length === 1 ) {
				insert[ original ]( this[0] );
				ret = this;
			} else {
				for ( i = 0, l = insert.length; i < l; i++ ) {
					cloneIndex = i;
					elems = (i > 0 ? this.clone(true) : this).get();
					jQuery( insert[i] )[ original ]( elems );
					ret = ret.concat( elems );
				}
				cloneIndex = 0;
				ret = this.pushStack( ret, name, insert.selector );
			}
			tmplItems = appendToTmplItems;
			appendToTmplItems = null;
			jQuery.tmpl.complete( tmplItems );
			return ret;
		};
	});

	jQuery.fn.extend({
		// Use first wrapped element as template markup.
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( data, options, parentItem ) {
			return jQuery.tmpl( this[0], data, options, parentItem );
		},

		// Find which rendered template item the first wrapped DOM element belongs to
		tmplItem: function() {
			return jQuery.tmplItem( this[0] );
		},

		// Consider the first wrapped element as a template declaration, and get the compiled template or store it as a named template.
		template: function( name ) {
			return jQuery.template( name, this[0] );
		},

		domManip: function( args, table, callback, options ) {
			if ( args[0] && jQuery.isArray( args[0] )) {
				var dmArgs = jQuery.makeArray( arguments ), elems = args[0], elemsLength = elems.length, i = 0, tmplItem;
				while ( i < elemsLength && !(tmplItem = jQuery.data( elems[i++], "tmplItem" ))) {}
				if ( tmplItem && cloneIndex ) {
					dmArgs[2] = function( fragClone ) {
						// Handler called by oldManip when rendered template has been inserted into DOM.
						jQuery.tmpl.afterManip( this, fragClone, callback );
					};
				}
				oldManip.apply( this, dmArgs );
			} else {
				oldManip.apply( this, arguments );
			}
			cloneIndex = 0;
			if ( !appendToTmplItems ) {
				jQuery.tmpl.complete( newTmplItems );
			}
			return this;
		}
	});

	jQuery.extend({
		// Return wrapped set of template items, obtained by rendering template against data.
		tmpl: function( tmpl, data, options, parentItem ) {
			var ret, topLevel = !parentItem;
			if ( topLevel ) {
				// This is a top-level tmpl call (not from a nested template using {{tmpl}})
				parentItem = topTmplItem;
				tmpl = jQuery.template[tmpl] || jQuery.template( null, tmpl );
				wrappedItems = {}; // Any wrapped items will be rebuilt, since this is top level
			} else if ( !tmpl ) {
				// The template item is already associated with DOM - this is a refresh.
				// Re-evaluate rendered template for the parentItem
				tmpl = parentItem.tmpl;
				newTmplItems[parentItem.key] = parentItem;
				parentItem.nodes = [];
				if ( parentItem.wrapped ) {
					updateWrapped( parentItem, parentItem.wrapped );
				}
				// Rebuild, without creating a new template item
				return jQuery( build( parentItem, null, parentItem.tmpl( jQuery, parentItem ) ));
			}
			if ( !tmpl ) {
				return []; // Could throw...
			}
			if ( typeof data === "function" ) {
				data = data.call( parentItem || {} );
			}
			if ( options && options.wrapped ) {
				updateWrapped( options, options.wrapped );
			}
			ret = jQuery.isArray( data ) ?
				jQuery.map( data, function( dataItem ) {
					return dataItem ? newTmplItem( options, parentItem, tmpl, dataItem ) : null;
				}) :
				[ newTmplItem( options, parentItem, tmpl, data ) ];
			return topLevel ? jQuery( build( parentItem, null, ret ) ) : ret;
		},

		// Return rendered template item for an element.
		tmplItem: function( elem ) {
			var tmplItem;
			if ( elem instanceof jQuery ) {
				elem = elem[0];
			}
			while ( elem && elem.nodeType === 1 && !(tmplItem = jQuery.data( elem, "tmplItem" )) && (elem = elem.parentNode) ) {}
			return tmplItem || topTmplItem;
		},

		// Set:
		// Use $.template( name, tmpl ) to cache a named template,
		// where tmpl is a template string, a script element or a jQuery instance wrapping a script element, etc.
		// Use $( "selector" ).template( name ) to provide access by name to a script block template declaration.

		// Get:
		// Use $.template( name ) to access a cached template.
		// Also $( selectorToScriptBlock ).template(), or $.template( null, templateString )
		// will return the compiled template, without adding a name reference.
		// If templateString includes at least one HTML tag, $.template( templateString ) is equivalent
		// to $.template( null, templateString )
		template: function( name, tmpl ) {
			if (tmpl) {
				// Compile template and associate with name
				if ( typeof tmpl === "string" ) {
					// This is an HTML string being passed directly in.
					tmpl = buildTmplFn( tmpl );
				} else if ( tmpl instanceof jQuery ) {
					tmpl = tmpl[0] || {};
				}
				if ( tmpl.nodeType ) {
					// If this is a template block, use cached copy, or generate tmpl function and cache.
					tmpl = jQuery.data( tmpl, "tmpl" ) || jQuery.data( tmpl, "tmpl", buildTmplFn( tmpl.innerHTML ));
					// Issue: In IE, if the container element is not a script block, the innerHTML will remove quotes from attribute values whenever the value does not include white space.
					// This means that foo="${x}" will not work if the value of x includes white space: foo="${x}" -> foo=value of x.
					// To correct this, include space in tag: foo="${ x }" -> foo="value of x"
				}
				return typeof name === "string" ? (jQuery.template[name] = tmpl) : tmpl;
			}
			// Return named compiled template
			return name ? (typeof name !== "string" ? jQuery.template( null, name ):
				(jQuery.template[name] ||
					// If not in map, and not containing at least on HTML tag, treat as a selector.
					// (If integrated with core, use quickExpr.exec)
					jQuery.template( null, htmlExpr.test( name ) ? name : jQuery( name )))) : null;
		},

		encode: function( text ) {
			// Do HTML encoding replacing < > & and ' and " by corresponding entities.
			return ("" + text).split("<").join("&lt;").split(">").join("&gt;").split('"').join("&#34;").split("'").join("&#39;");
		}
	});

	jQuery.extend( jQuery.tmpl, {
		tag: {
			"tmpl": {
				_default: { $2: "null" },
				open: "if($notnull_1){__=__.concat($item.nest($1,$2));}"
				// tmpl target parameter can be of type function, so use $1, not $1a (so not auto detection of functions)
				// This means that {{tmpl foo}} treats foo as a template (which IS a function).
				// Explicit parens can be used if foo is a function that returns a template: {{tmpl foo()}}.
			},
			"wrap": {
				_default: { $2: "null" },
				open: "$item.calls(__,$1,$2);__=[];",
				close: "call=$item.calls();__=call._.concat($item.wrap(call,__));"
			},
			"each": {
				_default: { $2: "$index, $value" },
				open: "if($notnull_1){$.each($1a,function($2){with(this){",
				close: "}});}"
			},
			"if": {
				open: "if(($notnull_1) && $1a){",
				close: "}"
			},
			"else": {
				_default: { $1: "true" },
				open: "}else if(($notnull_1) && $1a){"
			},
			"html": {
				// Unecoded expression evaluation.
				open: "if($notnull_1){__.push($1a);}"
			},
			"=": {
				// Encoded expression evaluation. Abbreviated form is ${}.
				_default: { $1: "$data" },
				open: "if($notnull_1){__.push($.encode($1a));}"
			},
			"!": {
				// Comment tag. Skipped by parser
				open: ""
			}
		},

		// This stub can be overridden, e.g. in jquery.tmplPlus for providing rendered events
		complete: function( items ) {
			newTmplItems = {};
		},

		// Call this from code which overrides domManip, or equivalent
		// Manage cloning/storing template items etc.
		afterManip: function afterManip( elem, fragClone, callback ) {
			// Provides cloned fragment ready for fixup prior to and after insertion into DOM
			var content = fragClone.nodeType === 11 ?
				jQuery.makeArray(fragClone.childNodes) :
				fragClone.nodeType === 1 ? [fragClone] : [];

			// Return fragment to original caller (e.g. append) for DOM insertion
			callback.call( elem, fragClone );

			// Fragment has been inserted:- Add inserted nodes to tmplItem data structure. Replace inserted element annotations by jQuery.data.
			storeTmplItems( content );
			cloneIndex++;
		}
	});

	//========================== Private helper functions, used by code above ==========================

	function build( tmplItem, nested, content ) {
		// Convert hierarchical content into flat string array
		// and finally return array of fragments ready for DOM insertion
		var frag, ret = content ? jQuery.map( content, function( item ) {
			return (typeof item === "string") ?
				// Insert template item annotations, to be converted to jQuery.data( "tmplItem" ) when elems are inserted into DOM.
				(tmplItem.key ? item.replace( /(<\w+)(?=[\s>])(?![^>]*_tmplitem)([^>]*)/g, "$1 " + tmplItmAtt + "=\"" + tmplItem.key + "\" $2" ) : item) :
				// This is a child template item. Build nested template.
				build( item, tmplItem, item._ctnt );
		}) :
		// If content is not defined, insert tmplItem directly. Not a template item. May be a string, or a string array, e.g. from {{html $item.html()}}.
		tmplItem;
		if ( nested ) {
			return ret;
		}

		// top-level template
		ret = ret.join("");

		// Support templates which have initial or final text nodes, or consist only of text
		// Also support HTML entities within the HTML markup.
		ret.replace( /^\s*([^<\s][^<]*)?(<[\w\W]+>)([^>]*[^>\s])?\s*$/, function( all, before, middle, after) {
			frag = jQuery( middle ).get();

			storeTmplItems( frag );
			if ( before ) {
				frag = unencode( before ).concat(frag);
			}
			if ( after ) {
				frag = frag.concat(unencode( after ));
			}
		});
		return frag ? frag : unencode( ret );
	}

	function unencode( text ) {
		// Use createElement, since createTextNode will not render HTML entities correctly
		var el = document.createElement( "div" );
		el.innerHTML = text;
		return jQuery.makeArray(el.childNodes);
	}

	// Generate a reusable function that will serve to render a template against data
	function buildTmplFn( markup ) {
		return new Function("jQuery","$item",
			// Use the variable __ to hold a string array while building the compiled template. (See https://github.com/jquery/jquery-tmpl/issues#issue/10).
			"var $=jQuery,call,__=[],$data=$item.data;" +

			// Introduce the data as local variables using with(){}
			"with($data){__.push('" +

			// Convert the template into pure JavaScript
			jQuery.trim(markup)
				.replace( /([\\'])/g, "\\$1" )
				.replace( /[\r\t\n]/g, " " )
				.replace( /\$\{([^\}]*)\}/g, "{{= $1}}" )
				.replace( /\{\{(\/?)(\w+|.)(?:\(((?:[^\}]|\}(?!\}))*?)?\))?(?:\s+(.*?)?)?(\(((?:[^\}]|\}(?!\}))*?)\))?\s*\}\}/g,
				function( all, slash, type, fnargs, target, parens, args ) {
					var tag = jQuery.tmpl.tag[ type ], def, expr, exprAutoFnDetect;
					if ( !tag ) {
						throw "Unknown template tag: " + type;
					}
					def = tag._default || [];
					if ( parens && !/\w$/.test(target)) {
						target += parens;
						parens = "";
					}
					if ( target ) {
						target = unescape( target );
						args = args ? ("," + unescape( args ) + ")") : (parens ? ")" : "");
						// Support for target being things like a.toLowerCase();
						// In that case don't call with template item as 'this' pointer. Just evaluate...
						expr = parens ? (target.indexOf(".") > -1 ? target + unescape( parens ) : ("(" + target + ").call($item" + args)) : target;
						exprAutoFnDetect = parens ? expr : "(typeof(" + target + ")==='function'?(" + target + ").call($item):(" + target + "))";
					} else {
						exprAutoFnDetect = expr = def.$1 || "null";
					}
					fnargs = unescape( fnargs );
					return "');" +
						tag[ slash ? "close" : "open" ]
							.split( "$notnull_1" ).join( target ? "typeof(" + target + ")!=='undefined' && (" + target + ")!=null" : "true" )
							.split( "$1a" ).join( exprAutoFnDetect )
							.split( "$1" ).join( expr )
							.split( "$2" ).join( fnargs || def.$2 || "" ) +
						"__.push('";
				}) +
			"');}return __;"
		);
	}
	function updateWrapped( options, wrapped ) {
		// Build the wrapped content.
		options._wrap = build( options, true,
			// Suport imperative scenario in which options.wrapped can be set to a selector or an HTML string.
			jQuery.isArray( wrapped ) ? wrapped : [htmlExpr.test( wrapped ) ? wrapped : jQuery( wrapped ).html()]
		).join("");
	}

	function unescape( args ) {
		return args ? args.replace( /\\'/g, "'").replace(/\\\\/g, "\\" ) : null;
	}
	function outerHtml( elem ) {
		var div = document.createElement("div");
		div.appendChild( elem.cloneNode(true) );
		return div.innerHTML;
	}

	// Store template items in jQuery.data(), ensuring a unique tmplItem data data structure for each rendered template instance.
	function storeTmplItems( content ) {
		var keySuffix = "_" + cloneIndex, elem, elems, newClonedItems = {}, i, l, m;
		for ( i = 0, l = content.length; i < l; i++ ) {
			if ( (elem = content[i]).nodeType !== 1 ) {
				continue;
			}
			elems = elem.getElementsByTagName("*");
			for ( m = elems.length - 1; m >= 0; m-- ) {
				processItemKey( elems[m] );
			}
			processItemKey( elem );
		}
		function processItemKey( el ) {
			var pntKey, pntNode = el, pntItem, tmplItem, key;
			// Ensure that each rendered template inserted into the DOM has its own template item,
			if ( (key = el.getAttribute( tmplItmAtt ))) {
				while ( pntNode.parentNode && (pntNode = pntNode.parentNode).nodeType === 1 && !(pntKey = pntNode.getAttribute( tmplItmAtt ))) { }
				if ( pntKey !== key ) {
					// The next ancestor with a _tmplitem expando is on a different key than this one.
					// So this is a top-level element within this template item
					// Set pntNode to the key of the parentNode, or to 0 if pntNode.parentNode is null, or pntNode is a fragment.
					pntNode = pntNode.parentNode ? (pntNode.nodeType === 11 ? 0 : (pntNode.getAttribute( tmplItmAtt ) || 0)) : 0;
					if ( !(tmplItem = newTmplItems[key]) ) {
						// The item is for wrapped content, and was copied from the temporary parent wrappedItem.
						tmplItem = wrappedItems[key];
						tmplItem = newTmplItem( tmplItem, newTmplItems[pntNode]||wrappedItems[pntNode] );
						tmplItem.key = ++itemKey;
						newTmplItems[itemKey] = tmplItem;
					}
					if ( cloneIndex ) {
						cloneTmplItem( key );
					}
				}
				el.removeAttribute( tmplItmAtt );
			} else if ( cloneIndex && (tmplItem = jQuery.data( el, "tmplItem" )) ) {
				// This was a rendered element, cloned during append or appendTo etc.
				// TmplItem stored in jQuery data has already been cloned in cloneCopyEvent. We must replace it with a fresh cloned tmplItem.
				cloneTmplItem( tmplItem.key );
				newTmplItems[tmplItem.key] = tmplItem;
				pntNode = jQuery.data( el.parentNode, "tmplItem" );
				pntNode = pntNode ? pntNode.key : 0;
			}
			if ( tmplItem ) {
				pntItem = tmplItem;
				// Find the template item of the parent element.
				// (Using !=, not !==, since pntItem.key is number, and pntNode may be a string)
				while ( pntItem && pntItem.key != pntNode ) {
					// Add this element as a top-level node for this rendered template item, as well as for any
					// ancestor items between this item and the item of its parent element
					pntItem.nodes.push( el );
					pntItem = pntItem.parent;
				}
				// Delete content built during rendering - reduce API surface area and memory use, and avoid exposing of stale data after rendering...
				delete tmplItem._ctnt;
				delete tmplItem._wrap;
				// Store template item as jQuery data on the element
				jQuery.data( el, "tmplItem", tmplItem );
			}
			function cloneTmplItem( key ) {
				key = key + keySuffix;
				tmplItem = newClonedItems[key] =
					(newClonedItems[key] || newTmplItem( tmplItem, newTmplItems[tmplItem.parent.key + keySuffix] || tmplItem.parent ));
			}
		}
	}

	//---- Helper functions for template item ----

	function tiCalls( content, tmpl, data, options ) {
		if ( !content ) {
			return stack.pop();
		}
		stack.push({ _: content, tmpl: tmpl, item:this, data: data, options: options });
	}

	function tiNest( tmpl, data, options ) {
		// nested template, using {{tmpl}} tag
		return jQuery.tmpl( jQuery.template( tmpl ), data, options, this );
	}

	function tiWrap( call, wrapped ) {
		// nested template, using {{wrap}} tag
		var options = call.options || {};
		options.wrapped = wrapped;
		// Apply the template, which may incorporate wrapped content,
		return jQuery.tmpl( jQuery.template( call.tmpl ), call.data, options, call.item );
	}

	function tiHtml( filter, textOnly ) {
		var wrapped = this._wrap;
		return jQuery.map(
			jQuery( jQuery.isArray( wrapped ) ? wrapped.join("") : wrapped ).filter( filter || "*" ),
			function(e) {
				return textOnly ?
					e.innerText || e.textContent :
					e.outerHTML || outerHtml(e);
			});
	}

	function tiUpdate() {
		var coll = this.nodes;
		jQuery.tmpl( null, null, null, this).insertBefore( coll[0] );
		jQuery( coll ).remove();
	}
})( jQuery );

 /*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);
 jQuery.expr[':'].Contains = function(a,i,m){
     return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
};
 (function(d){function z(K,h,G){var I=this,M=G,J,L,l,H={},m=false;this.settings=M;this.values=null;this.val=null;this.temp=null;this.setDefaults=function(N){d.extend(i,N)};this.enable=function(){M.disabled=false;if(d(K).is(":input")){d(K).prop("disabled",false)}};this.scroll=function(P,S,R,T,N){P.attr("style",(R?(w+"-transition:all "+R.toFixed(1)+"s ease-out;"):"")+(k?(w+"-transform:translate3d(0,"+(S*y)+"px,0);"):("top:"+(S*y)+"px;")));function Q(V,U,X,W){return X*Math.sin(V/W*(Math.PI/2))+U}if(R){var O=0;clearInterval(H[N]);H[N]=setInterval(function(){O+=0.1;P.data("pos",Math.round(Q(O,T,S-T,R)));if(O>=R){clearInterval(H[N]);P.data("pos",S)}},100)}else{P.data("pos",S)}};this.disable=function(){M.disabled=true;if(d(K).is(":input")){d(K).prop("disabled",true)}};this.formatDate=function(W,O,P){if(!O){return null}var X=d.extend({},this.settings,P),U=function(Y){var Z=0;while(S+1<W.length&&W.charAt(S+1)==Y){Z++;S++}return Z},R=function(Z,aa,Y){var ab=""+aa;if(U(Z)){while(ab.length<Y){ab="0"+ab}}return ab},Q=function(Y,ab,aa,Z){return(U(Y)?Z[ab]:aa[ab])},N="",V=false;for(var S=0;S<W.length;S++){if(V){if(W.charAt(S)=="'"&&!U("'")){V=false}else{N+=W.charAt(S)}}else{switch(W.charAt(S)){case"d":N+=R("d",O.getDate(),2);break;case"D":N+=Q("D",O.getDay(),X.dayNamesShort,X.dayNames);break;case"o":N+=R("o",(O.getTime()-new Date(O.getFullYear(),0,0).getTime())/86400000,3);break;case"m":N+=R("m",O.getMonth()+1,2);break;case"M":N+=Q("M",O.getMonth(),X.monthNamesShort,X.monthNames);break;case"y":N+=(U("y")?O.getFullYear():(O.getYear()%100<10?"0":"")+O.getYear()%100);break;case"h":var T=O.getHours();N+=R("h",(T>12?(T-12):(T==0?12:T)),2);break;case"H":N+=R("H",O.getHours(),2);break;case"i":N+=R("i",O.getMinutes(),2);break;case"s":N+=R("s",O.getSeconds(),2);break;case"a":N+=O.getHours()>11?"pm":"am";break;case"A":N+=O.getHours()>11?"PM":"AM";break;case"'":if(U("'")){N+="'"}else{V=true}break;default:N+=W.charAt(S)}}}return N};this.parseDate=function(ad,W,af){var R=new Date();if(!ad||!W){return R}W=(typeof W=="object"?W.toString():W+"");var T=d.extend({},this.settings,af),O=R.getFullYear(),ah=R.getMonth()+1,ab=R.getDate(),Q=-1,ae=R.getHours(),X=R.getMinutes(),P=R.getSeconds(),U=-1,aa=false,V=function(aj){var ak=(N+1<ad.length&&ad.charAt(N+1)==aj);if(ak){N++}return ak},ai=function(ak){V(ak);var al=(ak=="@"?14:(ak=="!"?20:(ak=="y"?4:(ak=="o"?3:2))));var am=new RegExp("^\\d{1,"+al+"}");var aj=W.substr(ac).match(am);if(!aj){throw"Missing number at position "+ac}ac+=aj[0].length;return parseInt(aj[0],10)},S=function(ak,am,aj){var an=(V(ak)?aj:am);for(var al=0;al<an.length;al++){if(W.substr(ac,an[al].length).toLowerCase()==an[al].toLowerCase()){ac+=an[al].length;return al+1}}throw"Unknown name at position "+ac},Z=function(){if(W.charAt(ac)!=ad.charAt(N)){throw"Unexpected literal at position "+ac}ac++},ac=0;for(var N=0;N<ad.length;N++){if(aa){if(ad.charAt(N)=="'"&&!V("'")){aa=false}else{Z()}}else{switch(ad.charAt(N)){case"d":ab=ai("d");break;case"D":S("D",T.dayNamesShort,T.dayNames);break;case"o":Q=ai("o");break;case"m":ah=ai("m");break;case"M":ah=S("M",T.monthNamesShort,T.monthNames);break;case"y":O=ai("y");break;case"H":ae=ai("H");break;case"h":ae=ai("h");break;case"i":X=ai("i");break;case"s":P=ai("s");break;case"a":U=S("a",["am","pm"],["am","pm"])-1;break;case"A":U=S("A",["am","pm"],["am","pm"])-1;break;case"'":if(V("'")){Z()}else{aa=true}break;default:Z()}}}if(O<100){O+=new Date().getFullYear()-new Date().getFullYear()%100+(O<=T.shortYearCutoff?0:-100)}if(Q>-1){ah=1;ab=Q;do{var Y=32-new Date(O,ah-1,32).getDate();if(ab<=Y){break}ah++;ab-=Y}while(true)}ae=(U==-1)?ae:((U&&ae<12)?(ae+12):(!U&&ae==12?0:ae));var ag=new Date(O,ah-1,ab,ae,X,P);if(ag.getFullYear()!=O||ag.getMonth()+1!=ah||ag.getDate()!=ab){throw"Invalid date"}return ag};this.setValue=function(O){if(O==undefined){O=true}var N=this.formatResult();this.val=N;this.values=this.temp.slice(0);if(O&&d(K).is(":input")){d(K).val(N).change()}};this.getDate=function(){var O=this.values;if(M.preset=="date"){return new Date(O[J],O[L],O[l])}if(M.preset=="time"){var N=(M.ampm)?((O[M.seconds?3:2]=="PM"&&(O[0]-0)<12)?(O[0]-0+12):(O[M.seconds?3:2]=="AM"&&(O[0]==12)?0:O[0])):O[0];return new Date(1970,0,1,N,O[1],M.seconds?O[2]:null)}if(M.preset=="datetime"){var N=(M.ampm)?((O[M.seconds?6:5]=="PM"&&(O[3]-0)<12)?(O[3]-0+12):(O[M.seconds?6:5]=="AM"&&(O[3]==12)?0:O[3])):O[3];return new Date(O[J],O[L],O[l],N,O[4],M.seconds?O[5]:null)}};this.setDate=function(P,O){if(M.preset.match(/date/i)){this.temp[J]=P.getFullYear();this.temp[L]=P.getMonth();this.temp[l]=P.getDate()}if(M.preset=="time"){var N=P.getHours();this.temp[0]=(M.ampm)?(N>12?(N-12):(N==0?12:N)):N;this.temp[1]=P.getMinutes();if(M.seconds){this.temp[2]=P.getSeconds()}if(M.ampm){this.temp[M.seconds?3:2]=N>11?"PM":"AM"}}if(M.preset=="datetime"){var N=P.getHours();this.temp[3]=(M.ampm)?(N>12?(N-12):(N==0?12:N)):N;this.temp[4]=P.getMinutes();if(M.seconds){this.temp[5]=P.getSeconds()}if(M.ampm){this.temp[M.seconds?6:5]=N>11?"PM":"AM"}}this.setValue(O)};this.parseValue=function(R){if(this.preset){var N=[];if(M.preset=="date"){try{var Q=this.parseDate(M.dateFormat,R,M)}catch(P){var Q=new Date()}N[J]=Q.getFullYear();N[L]=Q.getMonth();N[l]=Q.getDate()}else{if(M.preset=="time"){try{var Q=this.parseDate(M.timeFormat,R,M)}catch(P){var Q=new Date()}var O=Q.getHours();N[0]=(M.ampm)?(O>12?(O-12):(O==0?12:O)):O;N[1]=Q.getMinutes();if(M.seconds){N[2]=Q.getSeconds()}if(M.ampm){N[M.seconds?3:2]=O>11?"PM":"AM"}}else{if(M.preset=="datetime"){try{var Q=this.parseDate(M.dateFormat+" "+M.timeFormat,R,M)}catch(P){var Q=new Date()}var O=Q.getHours();N[J]=Q.getFullYear();N[L]=Q.getMonth();N[l]=Q.getDate();N[3]=(M.ampm)?(O>12?(O-12):(O==0?12:O)):O;N[4]=Q.getMinutes();if(M.seconds){N[5]=Q.getSeconds()}if(M.ampm){N[M.seconds?6:5]=O>11?"PM":"AM"}}}}return N}return M.parseValue(R,this)};this.formatResult=function(){var O=this.temp;if(this.preset){if(M.preset=="date"){return this.formatDate(M.dateFormat,new Date(O[J],O[L],O[l]),M)}else{if(M.preset=="datetime"){var N=(M.ampm)?((O[M.seconds?6:5]=="PM"&&(O[3]-0)<12)?(O[3]-0+12):(O[M.seconds?6:5]=="AM"&&(O[3]==12)?0:O[3])):O[3];return this.formatDate(M.dateFormat+" "+M.timeFormat,new Date(O[J],O[L],O[l],N,O[4],M.seconds?O[5]:null),M)}else{if(M.preset=="time"){var N=(M.ampm)?((O[M.seconds?3:2]=="PM"&&(O[0]-0)<12)?(O[0]-0+12):(O[M.seconds?3:2]=="AM"&&(O[0]==12)?0:O[0])):O[0];return this.formatDate(M.timeFormat,new Date(1970,0,1,N,O[1],M.seconds?O[2]:null),M)}}}}return M.formatResult(O)};this.validate=function(O){if(this.preset&&M.preset.match(/date/i)&&((O==J)||(O==L)||(O==-1))){var P=32-new Date(this.temp[J],this.temp[L],32).getDate()-1;var N=d("ul:eq("+l+")",h);d("li",N).show();d("li:gt("+P+")",N).hide();if(this.temp[l]>P){this.scroll(N,s-P-1);this.temp[l]=d("li:eq("+P+")",N).data("val")}}else{M.validate(O)}};this.hide=function(){if(M.onClose(this.val,this)===false){return false}d(".dwtd").prop("disabled",false).removeClass("dwtd");d(K).blur();h.hide();n.hide();m=false;if(this.preset){M.wheels=null}d(window).unbind("resize.dw")};this.show=function(){if(M.disabled||m){return false}M.beforeShow(K,this);y=M.height;s=Math.round(M.rows/2);a=this;this.init();if(this.preset){M.wheels=new Array();if(M.preset.match(/date/i)){var N={};for(var P=0;P<3;P++){if(P==J){N[M.yearText]={};for(var S=M.startYear;S<=M.endYear;S++){N[M.yearText][S]=M.dateOrder.search(/yy/i)<0?S.toString().substr(2,2):S.toString()}}else{if(P==L){N[M.monthText]={};for(var S=0;S<12;S++){N[M.monthText][S]=(M.dateOrder.search(/MM/)<0?(M.dateOrder.search(/M/)<0?(M.dateOrder.search(/mm/)<0?(S+1):(S<9)?("0"+(S+1)):(S+1)):M.monthNamesShort[S]):M.monthNames[S])}}else{if(P==l){N[M.dayText]={};for(var S=1;S<32;S++){N[M.dayText][S]=M.dateOrder.search(/dd/i)<0?S:(S<10)?("0"+S):S}}}}}M.wheels.push(N)}if(M.preset.match(/time/i)){M.stepHour=(M.stepHour<1)?1:parseInt(M.stepHour);M.stepMinute=(M.stepMinute<1)?1:parseInt(M.stepMinute);M.stepSecond=(M.stepSecond<1)?1:parseInt(M.stepSecond);var N={};N[M.hourText]={};for(var S=(M.ampm?1:0);S<(M.ampm?13:24);S+=M.stepHour){N[M.hourText][S]=(S<10)?("0"+S):S}N[M.minuteText]={};for(var S=0;S<60;S+=M.stepMinute){N[M.minuteText][S]=(S<10)?("0"+S):S}if(M.seconds){N[M.secText]={};for(var S=0;S<60;S+=M.stepSecond){N[M.secText][S]=(S<10)?("0"+S):S}}if(M.ampm){N[M.ampmText]={};N[M.ampmText]["AM"]="AM";N[M.ampmText]["PM"]="PM"}M.wheels.push(N)}}d(".dwc",h).remove();for(var S=0;S<M.wheels.length;S++){var O=d('<div class="dwc'+(M.mode=="clickpick"?" dwpm":"")+'"><div class="dwwc dwrc"><div class="clear" style="clear:both;"></div></div>').insertBefore(d(".dwbc",h));for(var R in M.wheels[S]){var T=d(".dwwc .clear",O);var N=d('<div class="dwwl dwrc">'+(M.mode=="clickpick"?'<div class="dwwb dwwbp">+</div><div class="dwwb dwwbm">&ndash;</div>':"")+'<div class="dwl">'+R+'</div><div class="dww dwrc"><ul></ul><div class="dwwo"></div></div><div class="dwwol"></div></div>').insertBefore(T);for(var Q in M.wheels[S][R]){d('<li class="val_'+Q+'">'+M.wheels[S][R][Q]+"</li>").data("val",Q).appendTo(d("ul",N))}}}d(".dww ul",h).each(function(V){var U=d("li",this).index(d("li.val_"+I.temp[V],this));while((U<0)&&(--I.temp[V]>=0)){U=d("li",this).index(d("li.val_"+I.temp[V],this))}I.scroll(d(this),s-(U<0?0:U)-1)});d(".dwv",h).html(this.formatResult());I.validate(-1);d("#dw_set",h).text(M.setText).unbind().bind("click",function(U){I.setValue();M.onSelect(I.val,a);I.hide();return false});d("#dw_cancel",h).text(M.cancelText).unbind().bind("click",function(U){M.onCancel(I.val,a);I.hide();return false});d(":input:not(:disabled)").addClass("dwtd");d(":input").prop("disabled",true);n.show();h.attr("class","dw "+M.theme).show();m=true;d(".dww, .dwwl",h).height(M.rows*y);d(".dww",h).each(function(){d(this).width(d(this).parent().width()<M.width?M.width:d(this).parent().width())});d(".dwbc a",h).attr("class",M.btnClass);d(".dww li, .dwwb",h).css({height:y,lineHeight:y+"px"});d(".dwwc",h).each(function(){var U=0;d(".dwwl",this).each(function(){U+=d(this).outerWidth(true)});d(this).width(U)});d(".dwc",h).each(function(){d(this).width(d(".dwwc",this).outerWidth(true))});this.pos();d(window).bind("resize.dw",function(){I.pos()})};this.pos=function(){var N=0,Q=0,T=d(window).width(),P=d(window).height(),R=d(window).scrollTop(),O,S;d(".dwc",h).each(function(){O=d(this).outerWidth(true);N+=O;Q=(O>Q)?O:Q});O=N>T?Q:N;h.width(O);O=h.outerWidth();S=h.outerHeight();h.css({left:(T-O)/2,top:R+(P-S)/2});n.height(0);n.height(d(document).height())};this.init=function(){var N=M.dateOrder.search(/y/i),O=M.dateOrder.search(/m/i),P=M.dateOrder.search(/d/i);J=N<O?(N<P?0:1):(N<P?1:2);L=O<N?(O<P?0:1):(O<P?1:2);l=P<N?(P<O?0:1):(P<O?1:2);this.preset=(M.wheels===null);this.temp=((d(K).is("input")&&this.val!==null&&this.val!=d(K).val())||this.values===null)?this.parseValue(d(K).val()?d(K).val():""):this.values.slice(0);this.setValue(false)};this.init();if(d(K).is(":input")&&M.showOnFocus){d(K).data("dwro",d(K).prop("readonly")).prop("readonly",true)}d(K).addClass("scroller").unbind("focus.dw").bind("focus.dw",function(N){if(M.showOnFocus){I.show()}})}function F(l){for(var h in l){if(D[l[h]]!==undefined){return true}}return false}function b(){var h=["Webkit","Moz","O","ms"];for(var l in h){if(F([h[l]+"Transform"])){return"-"+h[l].toLowerCase()}}return""}var o,n,y,s,u,a,j={},C=new Date(),x=C.getTime(),r=false,E=null,e,t,p,c,f,D=document.createElement(D).style,k=F(["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"])&&"webkitPerspective" in document.documentElement.style,w=b(),g=("ontouchstart" in window),v=g?"touchstart":"mousedown",B=g?"touchmove":"mousemove",q=g?"touchend":"mouseup",i={width:80,height:40,rows:3,disabled:false,showOnFocus:true,wheels:null,theme:"",mode:"scroller",preset:"date",dateFormat:"mm/dd/yy",dateOrder:"mmddy",ampm:true,seconds:false,timeFormat:"hh:ii A",startYear:C.getFullYear()-100,endYear:C.getFullYear()+1,monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",setText:"Set",cancelText:"Cancel",btnClass:"dwb",stepHour:1,stepMinute:1,stepSecond:1,beforeShow:function(){},onClose:function(){},onSelect:function(){},onCancel:function(){},formatResult:function(m){var h="";for(var l=0;l<m.length;l++){h+=(l>0?" ":"")+m[l]}return h},parseValue:function(m,I){var L=I.settings.wheels,J=m.split(" "),h=[],K=0;for(var H=0;H<L.length;H++){for(var G in L[H]){K++;for(var M in L[H][G]){h.push(M);break}}}return J.length==K?J:h},validate:function(){return true}},A={init:function(L){if(L===undefined){L={}}var H={};if(L.theme=="ios"){H.dateOrder="MMdyy";H.rows=5;H.height=30;H.width=55}if(L.mode=="clickpick"){H.height=50;H.rows=3}var l=d.extend({},i,H,L),h=false,J=false;if(d(".dw").length){n=d(".dwo");o=d(".dw")}else{n=d('<div class="dwo"></div>').hide().appendTo("body");o=d('<div class="dw"><div class="dwv">&nbsp;</div><div class="dwbc" style="clear:both;"><span class="dwbw dwb-s"><a id="dw_set" href="#"></a></span><span class="dwbw dwb-c"><a id="dw_cancel" href="#"></a></span></div></div>');o.hide().appendTo("body");function K(M){return g?M.originalEvent.changedTouches[0].pageY:M.pageY}function G(N,P,O,Q){var M=d("ul",o).index(N);P=P>(s-1)?(s-1):P;P=P<(s-u)?(s-u):P;a.scroll(N,P,O?(P==Q?0.1:Math.abs((P-Q)*0.1)):0,Q,M);a.temp[M]=d("li:eq("+(s-1-P)+")",N).data("val");a.validate(M);d(".dwv",o).html(a.formatResult())}function I(M){if(h){var N=M.data("pos"),O=N-1;O=O<(s-u)?(s-1):O;G(M,O)}else{clearInterval(h)}}function m(M){if(J){var N=M.data("pos"),O=N+1;O=O>(s-1)?(s-u):O;G(M,O)}else{clearInterval(J)}}d(document).bind(B,function(M){if(r){M.preventDefault();t=K(M);var N=f+(t-e)/y;N=N>(s-1+1)?(s-1+1):N;N=N<(s-u-1)?(s-u-1):N;a.scroll(E,N)}});d(document).bind(q,function(O){if(r){O.preventDefault();var N=new Date()-p;var Q=f+(t-e)/y;Q=Q>(s-1+1)?(s-1+1):Q;Q=Q<(s-u-1)?(s-u-1):Q;if(N<300){var M=(t-e)/N;var P=(M*M)/(2*0.0006);if(t-e<0){P=-P}}else{var P=t-e}G(E,Math.round(f+P/y),true,Math.round(Q));r=false;E=null}clearInterval(h);clearInterval(J);h=false;J=false;d(".dwb-a").removeClass("dwb-a")});o.delegate(".dwwl","DOMMouseScroll mousewheel",function(O){O.preventDefault();O=O.originalEvent;var Q=O.wheelDelta?(O.wheelDelta/120):(O.detail?(-O.detail/3):0),M=d("ul",this),N=M.data("pos"),P=Math.round(N+Q);u=d("li:visible",M).length;G(M,P)}).delegate(".dwb, .dwwb",v,function(M){d(this).addClass("dwb-a")}).delegate(".dwwbp",v,function(N){N.preventDefault();var M=d(this).closest(".dwwl").find("ul");u=d("li:visible",M).length;clearInterval(h);h=setInterval(function(){I(M)},200);I(M)}).delegate(".dwwbm",v,function(N){N.preventDefault();var M=d(this).closest(".dwwl").find("ul");u=d("li:visible",M).length;clearInterval(J);J=setInterval(function(){m(M)},200);m(M)}).delegate(".dwwl",v,function(M){if(!r&&a.settings.mode=="scroller"){M.preventDefault();r=true;E=d("ul",this);f=E.data("pos");u=d("li:visible",E).length;e=K(M);p=new Date();t=e;a.scroll(E,f)}})}return this.each(function(){if(!this.id){x+=1;this.id="scoller"+x}j[this.id]=new z(this,o,l)})},enable:function(){return this.each(function(){if(j[this.id]){j[this.id].enable()}})},disable:function(){return this.each(function(){if(j[this.id]){j[this.id].disable()}})},isDisabled:function(){if(j[this[0].id]){return j[this[0].id].settings.disabled}},option:function(h,l){return this.each(function(){if(j[this.id]){if(typeof h==="object"){d.extend(j[this.id].settings,h)}else{j[this.id].settings[h]=l}j[this.id].init()}})},setValue:function(l,h){if(h==undefined){h=false}return this.each(function(){if(j[this.id]){j[this.id].temp=l;j[this.id].setValue(l,h)}})},getValue:function(){if(j[this[0].id]){return j[this[0].id].values}},setDate:function(l,h){if(h==undefined){h=false}return this.each(function(){if(j[this.id]){j[this.id].setDate(l,h)}})},getDate:function(){if(j[this[0].id]){return j[this[0].id].getDate()}},show:function(){if(j[this[0].id]){return j[this[0].id].show()}},hide:function(){return this.each(function(){if(j[this.id]){j[this.id].hide()}})},destroy:function(){return this.each(function(){if(j[this.id]){d(this).unbind("focus.dw").removeClass("scroller");if(d(this).is(":input")){d(this).prop("readonly",d(this).data("dwro"))}delete j[this.id]}})}};d.fn.scroller=function(h){if(A[h]){return A[h].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof h==="object"||!h){return A.init.apply(this,arguments)}else{d.error("Unknown method")}}};d.scroller=new z(null,null,i)})(jQuery);

 var SPModelSchedule = function(){
    this.model = 'schedule';
}

SPModelSchedule.prototype.vacation = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}

SPModelSchedule.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}



//Prepare data
SPModelSchedule.prototype.schedulesByUser = function(id){
    if (typeof sp.staff.data.employees[id] != 'undefined'){
        return (typeof sp.staff.data.employees[id].schedules == 'undefined') ? {} : sp.staff.data.employees[id].schedules;
    } else {
        return {};
    }
}

SPModelSchedule.prototype.allSchedules = function(r){
    if (typeof r == 'undefined'){
        return sp.schedule.data.schedules;
    } else {
        spModel.schedule.get('schedules', {}, function(response){
            sp.schedule.raw.schedules = response.data;
            sp.schedule.data.schedules = sp.map(response.data);
            return sp.schedule.data.schedules;
        }, function(response){
            Log.log('implement');
            return {};
        })
    }
}

 var SPModelRequests = function(){
    this.model = 'requests';
}

SPModelRequests.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}
 var SPModelAdmin = function(){
    this.model = 'admin';
}

SPModelAdmin.prototype.vacations = function(module, method, data, success, error){
    sp.api(this.model + '.' + module, method, data, success, error);
}
 var SPModelMessaging = function(){
    this.model = 'messaging';
}

SPModelMessaging.prototype.wall = function(module, method, data, success, error){
    var self = this;
    sp.api(this.model + '.' + module, method, data, function(response){
        if(typeof success == 'function'){
            if (method == 'get'){
                response.data = self.prepareWallMessages(response.data);
            }
            success.call(this, response);
        }
    }, error);
}


SPModelMessaging.prototype.prepareWallMessages = function(response){
    var data = [];
               
    $.each(response,function(){
        var comments = [];
        if(typeof this.comments != 'undefined'){
            $.each(this.comments,function(){
                comments.push({
                    id: this.id,
                    avatar: sp.getAvatar(this.user.id),
                    userName: this.user.name,
                    userId : this.user.id,
                    time: $.timeago(new Date(this.date*1000)),
                    comment: this.comment_formatted,
                    full : true,
                    owner : (parseInt(sp.staff.admin.info.group) <= 3 || this.user.id == sp.staff.admin.info.id) ? 1 : 0
                });
            });
        }
        data.push({
            id: this.id,
            avatar: sp.getAvatar(this.user.id),
            userName: this.user.name,
            userId : this.user.id,
            time: $.timeago(new Date(this.date*1000)),
            sticky: parseInt(this.sticky),
            title: this.title_formatted,
            post: this.post_formatted,
            comments: comments,
            owner : (parseInt(sp.staff.admin.info.group) <= 3 || this.user.id == sp.staff.admin.info.id) ? 1 : 0
        });
    });
    return data;
}
 var SPModelTimeClock = function(){
    this.model = 'timeclock';
}


SPModelTimeClock.prototype.dtc = function(id, callback){
    spModel.timeclock.del('timeclock', {id : id}, function(response){
        callback(response);
    });
}
 var SPModelStaff = function(){
    this.model = 'staff';
}

SPModelStaff.prototype.allStaff = function(scheduleId){
    if (typeof scheduleId == 'undefined'){
        return sp.staff.raw.employees;
    } else {
        spModel.staff.get('employees', {schedule : scheduleId}, function(response){
            return response.data;
        }, function(response){
            Log.log('implement');
            return {};
        });
    }
}

SPModelStaff.prototype.allSkills = function(r){
    if (typeof r == 'undefined'){
        return (sp.staff.raw.skills == null) ? [] : sp.staff.raw.skills;
    } else {
        spModel.schedule.get('schedules', {}, function(response){
            sp.staff.raw.skills = response.data;
            sp.staff.data.skills = sp.map(response.data);
            return sp.staff.raw.skills;
        }, function(response){
            Log.log('implement');
            return {};
        });
    }
}

SPModelStaff.prototype.reset = function(){
    spModel.staff.get('employees', {}, function(response){
        sp.staff.raw.employees = response.data;
        sp.staff.data.employees = sp.map(response.data);
    });
}

SPModelStaff.prototype.getEmployeeById = function(id){
    if (typeof sp.staff.data.employees[id] == 'undefined'){
        sp.showError('Employee doesn\'t exists');
        return sp.staff.admin.info;
    }
    return sp.staff.data.employees[id];
}

SPModelStaff.prototype.addEmployee = function(data){
    sp.staff.raw.employees.push(data);
    sp.staff.data.employees['' + data.id] = data
}
 var SPModelPayroll = function(){
    this.model = 'payroll';
}

 var SPModelLocation = function(){
    this.model = 'location';
}


SPModelLocation.prototype.locationsList = function(r){
    if (typeof r != 'undefined' && r == true){
        spModel.location.get('locations', {}, function(response){
            sp.staff.raw.locations = response.data;
            sp.staff.data.locations = sp.map(response.data);
        });
    } else {
        return sp.staff.data.locations;
    }
}
 function strtotime (str, now) {
    // http://kevin.vanzonneveld.net
    // +   original by: Caio Ariede (http://caioariede.com)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: David
    // +   improved by: Caio Ariede (http://caioariede.com)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Wagner B. Soares
    // +   bugfixed by: Artur Tchernychev
    // %        note 1: Examples all have a fixed timestamp to prevent tests to fail because of variable time(zones)
    // *     example 1: strtotime('+1 day', 1129633200);
    // *     returns 1: 1129719600
    // *     example 2: strtotime('+1 week 2 days 4 hours 2 seconds', 1129633200);
    // *     returns 2: 1130425202
    // *     example 3: strtotime('last month', 1129633200);
    // *     returns 3: 1127041200
    // *     example 4: strtotime('2009-05-04 08:30:00');
    // *     returns 4: 1241418600
    var i, l, match, s, parse = '';

    str = str.replace(/\s{2,}|^\s|\s$/g, ' '); // unecessary spaces
    str = str.replace(/[\t\r\n]/g, ''); // unecessary chars
    if (str === 'now') {
        return now === null || isNaN(now) ? new Date().getTime() / 1000 | 0 : now | 0;
    } else if (!isNaN(parse = Date.parse(str))) {
        return parse / 1000 | 0;
    } else if (now) {
        now = new Date(now * 1000); // Accept PHP-style seconds
    } else {
        now = new Date();
    }

    str = str.toLowerCase();

    var __is = {
        day: {
            'sun': 0,
            'mon': 1,
            'tue': 2,
            'wed': 3,
            'thu': 4,
            'fri': 5,
            'sat': 6
        },
        mon: [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec'
        ]
    };

    var process = function (m) {
        var ago = (m[2] && m[2] === 'ago');
        var num = (num = m[0] === 'last' ? -1 : 1) * (ago ? -1 : 1);

        switch (m[0]) {
            case 'last':
            case 'next':
                switch (m[1].substring(0, 3)) {
                    case 'yea':
                        now.setFullYear(now.getFullYear() + num);
                        break;
                    case 'mon':
                        now.setMonth(now.getMonth() + num);
                        break;
                    case 'wee':
                        now.setDate(now.getDate() + (num * 7));
                        break;
                    case 'day':
                        now.setDate(now.getDate() + num);
                        break;
                    case 'hou':
                        now.setHours(now.getHours() + num);
                        break;
                    case 'min':
                        now.setMinutes(now.getMinutes() + num);
                        break;
                    case 'sec':
                        now.setSeconds(now.getSeconds() + num);
                        break;
                    default:
                        var day = __is.day[m[1].substring(0, 3)];
                        if (typeof day !== 'undefined') {
                            var diff = day - now.getDay();
                            if (diff === 0) {
                                diff = 7 * num;
                            } else if (diff > 0) {
                                if (m[0] === 'last') {
                                    diff -= 7;
                                }
                            } else {
                                if (m[0] === 'next') {
                                    diff += 7;
                                }
                            }
                            now.setDate(now.getDate() + diff);
                        }
                }
                break;

            default:
                if (/\d+/.test(m[0])) {
                    num *= parseInt(m[0], 10);

                    switch (m[1].substring(0, 3)) {
                        case 'yea':
                            now.setFullYear(now.getFullYear() + num);
                            break;
                        case 'mon':
                            now.setMonth(now.getMonth() + num);
                            break;
                        case 'wee':
                            now.setDate(now.getDate() + (num * 7));
                            break;
                        case 'day':
                            now.setDate(now.getDate() + num);
                            break;
                        case 'hou':
                            now.setHours(now.getHours() + num);
                            break;
                        case 'min':
                            now.setMinutes(now.getMinutes() + num);
                            break;
                        case 'sec':
                            now.setSeconds(now.getSeconds() + num);
                            break;
                    }
                } else {
                    return false;
                }
                break;
        }
        return true;
    };

    match = str.match(/^(\d{2,4}-\d{2}-\d{2})(?:\s(\d{1,2}:\d{2}(:\d{2})?)?(?:\.(\d+))?)?$/);
    if (match !== null) {
        if (!match[2]) {
            match[2] = '00:00:00';
        } else if (!match[3]) {
            match[2] += ':00';
        }

        s = match[1].split(/-/g);

        s[1] = __is.mon[s[1] - 1] || s[1];
        s[0] = +s[0];

        s[0] = (s[0] >= 0 && s[0] <= 69) ? '20' + (s[0] < 10 ? '0' + s[0] : s[0] + '') : (s[0] >= 70 && s[0] <= 99) ? '19' + s[0] : s[0] + '';
        return parseInt(this.strtotime(s[2] + ' ' + s[1] + ' ' + s[0] + ' ' + match[2]) + (match[4] ? match[4] / 1000 : ''), 10);
    }

    var regex = '([+-]?\\d+\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday)' + '|(last|next)\\s' + '(years?|months?|weeks?|days?|hours?|min|minutes?|sec|seconds?' + '|sun\\.?|sunday|mon\\.?|monday|tue\\.?|tuesday|wed\\.?|wednesday' + '|thu\\.?|thursday|fri\\.?|friday|sat\\.?|saturday))' + '(\\sago)?';

    match = str.match(new RegExp(regex, 'gi')); // Brett: seems should be case insensitive per docs, so added 'i'
    if (match === null) {
        return false;
    }

    for (i = 0, l = match.length; i < l; i++) {
        if (!process(match[i].split(' '))) {
            return false;
        }
    }

    return now.getTime() / 1000 | 0;
}

var months =  [
'Jan',
'Feb',
'Mar',
'Apr',
'May',
'Jun',
'Jul',
'Aug',
'Sep',
'Oct',
'Nov',
'Dec'
];

var daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday', 
    'Saturday' 
]

var daysOfWeekS = [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri', 
    'Sat' 
]
        
        
function date (format, timestamp) {
    // http://kevin.vanzonneveld.net
    // +   original by: Carlos R. L. Rodrigues (http://www.jsfromhell.com)
    // +      parts by: Peter-Paul Koch (http://www.quirksmode.org/js/beat.html)
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: MeEtc (http://yass.meetcweb.com)
    // +   improved by: Brad Touesnard
    // +   improved by: Tim Wiel
    // +   improved by: Bryan Elliott
    //
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: David Randall
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +  derived from: gettimeofday
    // +      input by: majak
    // +   bugfixed by: majak
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Alex
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   improved by: Theriault
    // +   improved by: Thomas Beaucourt (http://www.webapp.fr)
    // +   improved by: JT
    // +   improved by: Theriault
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   bugfixed by: omid (http://phpjs.org/functions/380:380#comment_137122)
    // +      input by: Martin
    // +      input by: Alex Wilson
    // %        note 1: Uses global: php_js to store the default timezone
    // %        note 2: Although the function potentially allows timezone info (see notes), it currently does not set
    // %        note 2: per a timezone specified by date_default_timezone_set(). Implementers might use
    // %        note 2: this.php_js.currentTimezoneOffset and this.php_js.currentTimezoneDST set by that function
    // %        note 2: in order to adjust the dates in this function (or our other date functions!) accordingly
    // *     example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400);
    // *     returns 1: '09:09:40 m is month'
    // *     example 2: date('F j, Y, g:i a', 1062462400);
    // *     returns 2: 'September 2, 2003, 2:26 am'
    // *     example 3: date('Y W o', 1062462400);
    // *     returns 3: '2003 36 2003'
    // *     example 4: x = date('Y m d', (new Date()).getTime()/1000); 
    // *     example 4: (x+'').length == 10 // 2009 01 09
    // *     returns 4: true
    // *     example 5: date('W', 1104534000);
    // *     returns 5: '53'
    // *     example 6: date('B t', 1104534000);
    // *     returns 6: '999 31'
    // *     example 7: date('W U', 1293750000.82); // 2010-12-31
    // *     returns 7: '52 1293750000'
    // *     example 8: date('W', 1293836400); // 2011-01-01
    // *     returns 8: '52'
    // *     example 9: date('W Y-m-d', 1293974054); // 2011-01-02
    // *     returns 9: '52 2011-01-02'
    var that = this,
    jsdate, f, formatChr = /\\?([a-z])/gi,
    formatChrCb,
    // Keep this here (works, but for code commented-out
    // below for file size reasons)
    //, tal= [],
    _pad = function (n, c) {
        if ((n = n + '').length < c) {
            return new Array((++c) - n.length).join('0') + n;
        }
        return n;
    },
    txt_words = ["Sun", "Mon", "Tues", "Wednes", "Thurs", "Fri", "Satur", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    formatChrCb = function (t, s) {
        return f[t] ? f[t]() : s;
    };
    f = {
        // Day
        d: function () { // Day of month w/leading 0; 01..31
            return _pad(f.j(), 2);
        },
        D: function () { // Shorthand day name; Mon...Sun
            return f.l().slice(0, 3);
        },
        j: function () { // Day of month; 1..31
            return jsdate.getDate();
        },
        l: function () { // Full day name; Monday...Sunday
            return txt_words[f.w()] + 'day';
        },
        N: function () { // ISO-8601 day of week; 1[Mon]..7[Sun]
            return f.w() || 7;
        },
        S: function () { // Ordinal suffix for day of month; st, nd, rd, th
            var j = f.j();
            return j < 4 | j > 20 && ['st', 'nd', 'rd'][j%10 - 1] || 'th'; 
        },
        w: function () { // Day of week; 0[Sun]..6[Sat]
            return jsdate.getDay();
        },
        z: function () { // Day of year; 0..365
            var a = new Date(f.Y(), f.n() - 1, f.j()),
            b = new Date(f.Y(), 0, 1);
            return Math.round((a - b) / 864e5) + 1;
        },

        // Week
        W: function () { // ISO-8601 week number
            var a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3),
            b = new Date(a.getFullYear(), 0, 4);
            return _pad(1 + Math.round((a - b) / 864e5 / 7), 2);
        },

        // Month
        F: function () { // Full month name; January...December
            return txt_words[6 + f.n()];
        },
        m: function () { // Month w/leading 0; 01...12
            return _pad(f.n(), 2);
        },
        M: function () { // Shorthand month name; Jan...Dec
            return f.F().slice(0, 3);
        },
        n: function () { // Month; 1...12
            return jsdate.getMonth() + 1;
        },
        t: function () { // Days in month; 28...31
            return (new Date(f.Y(), f.n(), 0)).getDate();
        },

        // Year
        L: function () { // Is leap year?; 0 or 1
            var j = f.Y();
            return j%4==0 & j%100!=0 | j%400==0;
        },
        o: function () { // ISO-8601 year
            var n = f.n(),
            W = f.W(),
            Y = f.Y();
            return Y + (n === 12 && W < 9 ? -1 : n === 1 && W > 9);
        },
        Y: function () { // Full year; e.g. 1980...2010
            return jsdate.getFullYear();
        },
        y: function () { // Last two digits of year; 00...99
            return (f.Y() + "").slice(-2);
        },

        // Time
        a: function () { // am or pm
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: function () { // AM or PM
            return f.a().toUpperCase();
        },
        B: function () { // Swatch Internet time; 000..999
            var H = jsdate.getUTCHours() * 36e2,
            // Hours
            i = jsdate.getUTCMinutes() * 60,
            // Minutes
            s = jsdate.getUTCSeconds(); // Seconds
            return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3);
        },
        g: function () { // 12-Hours; 1..12
            return f.G() % 12 || 12;
        },
        G: function () { // 24-Hours; 0..23
            return jsdate.getHours();
        },
        h: function () { // 12-Hours w/leading 0; 01..12
            return _pad(f.g(), 2);
        },
        H: function () { // 24-Hours w/leading 0; 00..23
            return _pad(f.G(), 2);
        },
        i: function () { // Minutes w/leading 0; 00..59
            return _pad(jsdate.getMinutes(), 2);
        },
        s: function () { // Seconds w/leading 0; 00..59
            return _pad(jsdate.getSeconds(), 2);
        },
        u: function () { // Microseconds; 000000-999000
            return _pad(jsdate.getMilliseconds() * 1000, 6);
        },

        // Timezone
        e: function () { // Timezone identifier; e.g. Atlantic/Azores, ...
            // The following works, but requires inclusion of the very large
            // timezone_abbreviations_list() function.
            /*              return this.date_default_timezone_get();
*/
            throw 'Not supported (see source code of date() for timezone on how to add support)';
        },
        I: function () { // DST observed?; 0 or 1
            // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
            // If they are not equal, then DST is observed.
            var a = new Date(f.Y(), 0),
            // Jan 1
            c = Date.UTC(f.Y(), 0),
            // Jan 1 UTC
            b = new Date(f.Y(), 6),
            // Jul 1
            d = Date.UTC(f.Y(), 6); // Jul 1 UTC
            return 0 + ((a - c) !== (b - d));
        },
        O: function () { // Difference to GMT in hour format; e.g. +0200
            var tzo = jsdate.getTimezoneOffset(),
            a = Math.abs(tzo);
            return (tzo > 0 ? "-" : "+") + _pad(Math.floor(a / 60) * 100 + a % 60, 4);
        },
        P: function () { // Difference to GMT w/colon; e.g. +02:00
            var O = f.O();
            return (O.substr(0, 3) + ":" + O.substr(3, 2));
        },
        T: function () { // Timezone abbreviation; e.g. EST, MDT, ...
            // The following works, but requires inclusion of the very
            // large timezone_abbreviations_list() function.
            /*              var abbr = '', i = 0, os = 0, default = 0;
            if (!tal.length) {
                tal = that.timezone_abbreviations_list();
            }
            if (that.php_js && that.php_js.default_timezone) {
                default = that.php_js.default_timezone;
                for (abbr in tal) {
                    for (i=0; i < tal[abbr].length; i++) {
                        if (tal[abbr][i].timezone_id === default) {
                            return abbr.toUpperCase();
                        }
                    }
                }
            }
            for (abbr in tal) {
                for (i = 0; i < tal[abbr].length; i++) {
                    os = -jsdate.getTimezoneOffset() * 60;
                    if (tal[abbr][i].offset === os) {
                        return abbr.toUpperCase();
                    }
                }
            }
*/
            return 'UTC';
        },
        Z: function () { // Timezone offset in seconds (-43200...50400)
            return -jsdate.getTimezoneOffset() * 60;
        },

        // Full Date/Time
        c: function () { // ISO-8601 date.
            return 'Y-m-d\\Th:i:sP'.replace(formatChr, formatChrCb);
        },
        r: function () { // RFC 2822
            return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb);
        },
        U: function () { // Seconds since UNIX epoch
            return jsdate / 1000 | 0;
        }
    };
    this.date = function (format, timestamp) {
        that = this;
        jsdate = (timestamp == null ? new Date() : // Not provided
            (timestamp instanceof Date) ? new Date(timestamp) : // JS Date()
            new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
            );
        return format.replace(formatChr, formatChrCb);
    };
    return this.date(format, timestamp);
}

function now(timestamp){
    if (typeof timestamp != 'undefined'){
        return new Date(timestamp * 1000); 
    } else {
        return new Date();
    }
}

function formatted(type){
    var res = '';
    var s;
    switch (type){
        case 'today':
            s = Date.parse('today');
            res = s.toString(cal.dformat);
            break;
        case 'nowT':
            var ct = Date.parse('now').getTime();
            var czm = Date.parse('now').getTimezoneOffset() * 60 * 1000;
            var tz = sp.staff.admin.settings.timezone;
            var tzf = tz.split(',');
            tzf = tzf[0].split(':');
            var h = parseInt(tzf[0]) * 60*60;
            var mp = 1; //(parseInt(tzf[0]) * 60*60)/Math.abs(parseInt(tzf[0]) * 60*60);
            var min = (tzf[1] * 60);
	    var d = new Date((ct + czm + (mp * (Math.abs(h) + min)) * 1000) + (0));
            //var d = new Date((ct + czm + (mp * (Math.abs(h) + min)) * 1000) + (60*60*1000));
            res = d.toString(cal.tstring);
            break;
       default:
           res = type.toString('dddd, ' + cal.dformat);
    }
    return res;
}
 var cookieExpire = 2629743;
function setCookie(c_name,value,exdays)
{
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
}
      
function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++)
    {
	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
	x=x.replace(/^\s+|\s+$/g,"");
	if (x==c_name)
	{
	    return unescape(y);
	}
    }
}

 var CacheCore = function(){
    this.cache = {};
    this.dependencies = {
        dashboard : {
            main : {
                type : 'time',
                attr : '0'
            },
            inbox : {
                type : 'time',
                attr : '0'
            },
            settings : {
                type : 'time',
                attr : '0'
            }
        },
        staff : {
            staffList : {
                type : 'time',
                attr : '0'
            },
            addEmployee : {
                type : 'time',
                attr : '0'
            },
            fastAssignment : {
                type : 'time',
                attr : '0'
            }
        },
        timeClock : {
            overview : {
                type : 'time',
                attr : '0'
            },
            addClockTime : {
                type : 'time',
                attr : '0'
            },
            manageTimeSheets : {
                type : 'time',
                attr : '0'
            }
        }
    };
}

CacheCore.prototype.addDependecy = function(data){
    this.dependencies[data.page][data.subpage] = data.depends
}


//if page is already used display page without calling inner javascript of that page.
CacheCore.prototype.readC = function(page, subpage){
    var c = page + '.' + subpage;
    if (typeof this.cache[c] != 'undefined'){
        return false;
    } else {
        if (this.dependencies[page][subpage].type == 'time'){
            var self = this;
            setTimeout(function(){
                delete self.cache[c];
            },this.dependencies[page][subpage].attr);
        }
        this.cache[c] = true;
    }
    return true;
}


CacheCore.prototype.clearChangeCache = function(apiCall){
    var self = this;
    $.each(self.dependencies, function(i, item){
        $.each(item, function(iL2, itemL2){
            if (itemL2.type == 'change' && $.inArray(apiCall, itemL2.attr)){
                self.cache[i + '.' + iL2] = null;
            }
        });
    });
}

CacheCore.prototype.flushAll = function(){
    this.cache = {};
}






 /**
 * @version: 1.0 Alpha-1
 */

if(!Date || !Date.CultureInfo || Date.CultureInfo.name==''){
Date.CultureInfo={name:"en-US",englishName:"English (United States)",nativeName:"English (United States)",dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],abbreviatedDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],shortestDayNames:["Su","Mo","Tu","We","Th","Fr","Sa"],firstLetterDayNames:["S","M","T","W","T","F","S"],monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],abbreviatedMonthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],amDesignator:"AM",pmDesignator:"PM",firstDayOfWeek:0,twoDigitYearMax:2029,dateElementOrder:"mdy",formatPatterns:{shortDate:"M/d/yyyy",longDate:"dddd, MMMM dd, yyyy",shortTime:"h:mm tt",longTime:"h:mm:ss tt",fullDateTime:"dddd, MMMM dd, yyyy h:mm:ss tt",sortableDateTime:"yyyy-MM-ddTHH:mm:ss",universalSortableDateTime:"yyyy-MM-dd HH:mm:ssZ",rfc1123:"ddd, dd MMM yyyy HH:mm:ss GMT",monthDay:"MMMM dd",yearMonth:"MMMM, yyyy"},regexPatterns:{jan:/^jan(uary)?/i,feb:/^feb(ruary)?/i,mar:/^mar(ch)?/i,apr:/^apr(il)?/i,may:/^may/i,jun:/^jun(e)?/i,jul:/^jul(y)?/i,aug:/^aug(ust)?/i,sep:/^sep(t(ember)?)?/i,oct:/^oct(ober)?/i,nov:/^nov(ember)?/i,dec:/^dec(ember)?/i,sun:/^su(n(day)?)?/i,mon:/^mo(n(day)?)?/i,tue:/^tu(e(s(day)?)?)?/i,wed:/^we(d(nesday)?)?/i,thu:/^th(u(r(s(day)?)?)?)?/i,fri:/^fr(i(day)?)?/i,sat:/^sa(t(urday)?)?/i,future:/^next/i,past:/^last|past|prev(ious)?/i,add:/^(\+|aft(er)?|from|hence)/i,subtract:/^(\-|bef(ore)?|ago)/i,yesterday:/^yes(terday)?/i,today:/^t(od(ay)?)?/i,tomorrow:/^tom(orrow)?/i,now:/^n(ow)?/i,millisecond:/^ms|milli(second)?s?/i,second:/^sec(ond)?s?/i,minute:/^mn|min(ute)?s?/i,hour:/^h(our)?s?/i,week:/^w(eek)?s?/i,month:/^m(onth)?s?/i,day:/^d(ay)?s?/i,year:/^y(ear)?s?/i,shortMeridian:/^(a|p)/i,longMeridian:/^(a\.?m?\.?|p\.?m?\.?)/i,timezone:/^((e(s|d)t|c(s|d)t|m(s|d)t|p(s|d)t)|((gmt)?\s*(\+|\-)\s*\d\d\d\d?)|gmt|utc)/i,ordinalSuffix:/^\s*(st|nd|rd|th)/i,timeContext:/^\s*(\:|a(?!u|p)|p)/i},timezones:[{name:"UTC",offset:"-000"},{name:"GMT",offset:"-000"},{name:"EST",offset:"-0500"},{name:"EDT",offset:"-0400"},{name:"CST",offset:"-0600"},{name:"CDT",offset:"-0500"},{name:"MST",offset:"-0700"},{name:"MDT",offset:"-0600"},{name:"PST",offset:"-0800"},{name:"PDT",offset:"-0700"}]};
}
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,p=function(s,l){if(!l){l=2;}
return("000"+s).slice(l*-1);};$P.clearTime=function(){this.setHours(0);this.setMinutes(0);this.setSeconds(0);this.setMilliseconds(0);return this;};$P.setTimeToNow=function(){var n=new Date();this.setHours(n.getHours());this.setMinutes(n.getMinutes());this.setSeconds(n.getSeconds());this.setMilliseconds(n.getMilliseconds());return this;};$D.today=function(){return new Date().clearTime();};$D.compare=function(date1,date2){if(isNaN(date1)||isNaN(date2)){throw new Error(date1+" - "+date2);}else if(date1 instanceof Date&&date2 instanceof Date){return(date1<date2)?-1:(date1>date2)?1:0;}else{throw new TypeError(date1+" - "+date2);}};$D.equals=function(date1,date2){return(date1.compareTo(date2)===0);};$D.getDayNumberFromName=function(name){var n=$C.dayNames,m=$C.abbreviatedDayNames,o=$C.shortestDayNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s||o[i].toLowerCase()==s){return i;}}
return-1;};$D.getMonthNumberFromName=function(name){var n=$C.monthNames,m=$C.abbreviatedMonthNames,s=name.toLowerCase();for(var i=0;i<n.length;i++){if(n[i].toLowerCase()==s||m[i].toLowerCase()==s){return i;}}
return-1;};$D.isLeapYear=function(year){return((year%4===0&&year%100!==0)||year%400===0);};$D.getDaysInMonth=function(year,month){return[31,($D.isLeapYear(year)?29:28),31,30,31,30,31,31,30,31,30,31][month];};$D.getTimezoneAbbreviation=function(offset){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].offset===offset){return z[i].name;}}
return null;};$D.getTimezoneOffset=function(name){var z=$C.timezones,p;for(var i=0;i<z.length;i++){if(z[i].name===name.toUpperCase()){return z[i].offset;}}
return null;};$P.clone=function(){return new Date(this.getTime());};$P.compareTo=function(date){return Date.compare(this,date);};$P.equals=function(date){return Date.equals(this,date||new Date());};$P.between=function(start,end){return this.getTime()>=start.getTime()&&this.getTime()<=end.getTime();};$P.isAfter=function(date){return this.compareTo(date||new Date())===1;};$P.isBefore=function(date){return(this.compareTo(date||new Date())===-1);};$P.isToday=function(){return this.isSameDay(new Date());};$P.isSameDay=function(date){return this.clone().clearTime().equals(date.clone().clearTime());};$P.addMilliseconds=function(value){this.setMilliseconds(this.getMilliseconds()+value);return this;};$P.addSeconds=function(value){return this.addMilliseconds(value*1000);};$P.addMinutes=function(value){return this.addMilliseconds(value*60000);};$P.addHours=function(value){return this.addMilliseconds(value*3600000);};$P.addDays=function(value){this.setDate(this.getDate()+value);return this;};$P.addWeeks=function(value){return this.addDays(value*7);};$P.addMonths=function(value){var n=this.getDate();this.setDate(1);this.setMonth(this.getMonth()+value);this.setDate(Math.min(n,$D.getDaysInMonth(this.getFullYear(),this.getMonth())));return this;};$P.addYears=function(value){return this.addMonths(value*12);};$P.add=function(config){if(typeof config=="number"){this._orient=config;return this;}
var x=config;if(x.milliseconds){this.addMilliseconds(x.milliseconds);}
if(x.seconds){this.addSeconds(x.seconds);}
if(x.minutes){this.addMinutes(x.minutes);}
if(x.hours){this.addHours(x.hours);}
if(x.weeks){this.addWeeks(x.weeks);}
if(x.months){this.addMonths(x.months);}
if(x.years){this.addYears(x.years);}
if(x.days){this.addDays(x.days);}
return this;};var $y,$m,$d;$P.getWeek=function(){var a,b,c,d,e,f,g,n,s,w;$y=(!$y)?this.getFullYear():$y;$m=(!$m)?this.getMonth()+1:$m;$d=(!$d)?this.getDate():$d;if($m<=2){a=$y-1;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=0;f=$d-1+(31*($m-1));}else{a=$y;b=(a/4|0)-(a/100|0)+(a/400|0);c=((a-1)/4|0)-((a-1)/100|0)+((a-1)/400|0);s=b-c;e=s+1;f=$d+((153*($m-3)+2)/5)+58+s;}
g=(a+b)%7;d=(f+g-e)%7;n=(f+3-d)|0;if(n<0){w=53-((g-s)/5|0);}else if(n>364+s){w=1;}else{w=(n/7|0)+1;}
$y=$m=$d=null;return w;};$P.getISOWeek=function(){$y=this.getUTCFullYear();$m=this.getUTCMonth()+1;$d=this.getUTCDate();return p(this.getWeek());};$P.setWeek=function(n){return this.moveToDayOfWeek(1).addWeeks(n-this.getWeek());};$D._validate=function(n,min,max,name){if(typeof n=="undefined"){return false;}else if(typeof n!="number"){throw new TypeError(n+" is not a Number.");}else if(n<min||n>max){throw new RangeError(n+" is not a valid value for "+name+".");}
return true;};$D.validateMillisecond=function(value){return $D._validate(value,0,999,"millisecond");};$D.validateSecond=function(value){return $D._validate(value,0,59,"second");};$D.validateMinute=function(value){return $D._validate(value,0,59,"minute");};$D.validateHour=function(value){return $D._validate(value,0,23,"hour");};$D.validateDay=function(value,year,month){return $D._validate(value,1,$D.getDaysInMonth(year,month),"day");};$D.validateMonth=function(value){return $D._validate(value,0,11,"month");};$D.validateYear=function(value){return $D._validate(value,0,9999,"year");};$P.set=function(config){if($D.validateMillisecond(config.millisecond)){this.addMilliseconds(config.millisecond-this.getMilliseconds());}
if($D.validateSecond(config.second)){this.addSeconds(config.second-this.getSeconds());}
if($D.validateMinute(config.minute)){this.addMinutes(config.minute-this.getMinutes());}
if($D.validateHour(config.hour)){this.addHours(config.hour-this.getHours());}
if($D.validateMonth(config.month)){this.addMonths(config.month-this.getMonth());}
if($D.validateYear(config.year)){this.addYears(config.year-this.getFullYear());}
if($D.validateDay(config.day,this.getFullYear(),this.getMonth())){this.addDays(config.day-this.getDate());}
if(config.timezone){this.setTimezone(config.timezone);}
if(config.timezoneOffset){this.setTimezoneOffset(config.timezoneOffset);}
if(config.week&&$D._validate(config.week,0,53,"week")){this.setWeek(config.week);}
return this;};$P.moveToFirstDayOfMonth=function(){return this.set({day:1});};$P.moveToLastDayOfMonth=function(){return this.set({day:$D.getDaysInMonth(this.getFullYear(),this.getMonth())});};$P.moveToNthOccurrence=function(dayOfWeek,occurrence){var shift=0;if(occurrence>0){shift=occurrence-1;}
else if(occurrence===-1){this.moveToLastDayOfMonth();if(this.getDay()!==dayOfWeek){this.moveToDayOfWeek(dayOfWeek,-1);}
return this;}
return this.moveToFirstDayOfMonth().addDays(-1).moveToDayOfWeek(dayOfWeek,+1).addWeeks(shift);};$P.moveToDayOfWeek=function(dayOfWeek,orient){var diff=(dayOfWeek-this.getDay()+7*(orient||+1))%7;return this.addDays((diff===0)?diff+=7*(orient||+1):diff);};$P.moveToMonth=function(month,orient){var diff=(month-this.getMonth()+12*(orient||+1))%12;return this.addMonths((diff===0)?diff+=12*(orient||+1):diff);};$P.getOrdinalNumber=function(){return Math.ceil((this.clone().clearTime()-new Date(this.getFullYear(),0,1))/86400000)+1;};$P.getTimezone=function(){return $D.getTimezoneAbbreviation(this.getUTCOffset());};$P.setTimezoneOffset=function(offset){var here=this.getTimezoneOffset(),there=Number(offset)*-6/10;return this.addMinutes(there-here);};$P.setTimezone=function(offset){return this.setTimezoneOffset($D.getTimezoneOffset(offset));};$P.hasDaylightSavingTime=function(){return(Date.today().set({month:0,day:1}).getTimezoneOffset()!==Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.isDaylightSavingTime=function(){return(this.hasDaylightSavingTime()&&new Date().getTimezoneOffset()===Date.today().set({month:6,day:1}).getTimezoneOffset());};$P.getUTCOffset=function(){var n=this.getTimezoneOffset()*-10/6,r;if(n<0){r=(n-10000).toString();return r.charAt(0)+r.substr(2);}else{r=(n+10000).toString();return"+"+r.substr(1);}};$P.getElapsed=function(date){return(date||new Date())-this;};if(!$P.toISOString){$P.toISOString=function(){function f(n){return n<10?'0'+n:n;}
return'"'+this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z"';};}
$P._toString=$P.toString;$P.toString=function(format){var x=this;if(format&&format.length==1){var c=$C.formatPatterns;x.t=x.toString;switch(format){case"d":return x.t(c.shortDate);case"D":return x.t(c.longDate);case"F":return x.t(c.fullDateTime);case"m":return x.t(c.monthDay);case"r":return x.t(c.rfc1123);case"s":return x.t(c.sortableDateTime);case"t":return x.t(c.shortTime);case"T":return x.t(c.longTime);case"u":return x.t(c.universalSortableDateTime);case"y":return x.t(c.yearMonth);}}
var ord=function(n){switch(n*1){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th";}};return format?format.replace(/(\\)?(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|S)/g,function(m){if(m.charAt(0)==="\\"){return m.replace("\\","");}
x.h=x.getHours;switch(m){case"hh":return p(x.h()<13?(x.h()===0?12:x.h()):(x.h()-12));case"h":return x.h()<13?(x.h()===0?12:x.h()):(x.h()-12);case"HH":return p(x.h());case"H":return x.h();case"mm":return p(x.getMinutes());case"m":return x.getMinutes();case"ss":return p(x.getSeconds());case"s":return x.getSeconds();case"yyyy":return p(x.getFullYear(),4);case"yy":return p(x.getFullYear());case"dddd":return $C.dayNames[x.getDay()];case"ddd":return $C.abbreviatedDayNames[x.getDay()];case"dd":return p(x.getDate());case"d":return x.getDate();case"MMMM":return $C.monthNames[x.getMonth()];case"MMM":return $C.abbreviatedMonthNames[x.getMonth()];case"MM":return p((x.getMonth()+1));case"M":return x.getMonth()+1;case"t":return x.h()<12?$C.amDesignator.substring(0,1):$C.pmDesignator.substring(0,1);case"tt":return x.h()<12?$C.amDesignator:$C.pmDesignator;case"S":return ord(x.getDate());default:return m;}}):this._toString();};}());
(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo,$N=Number.prototype;$P._orient=+1;$P._nth=null;$P._is=false;$P._same=false;$P._isSecond=false;$N._dateElement="day";$P.next=function(){this._orient=+1;return this;};$D.next=function(){return $D.today().next();};$P.last=$P.prev=$P.previous=function(){this._orient=-1;return this;};$D.last=$D.prev=$D.previous=function(){return $D.today().last();};$P.is=function(){this._is=true;return this;};$P.same=function(){this._same=true;this._isSecond=false;return this;};$P.today=function(){return this.same().day();};$P.weekday=function(){if(this._is){this._is=false;return(!this.is().sat()&&!this.is().sun());}
return false;};$P.at=function(time){return(typeof time==="string")?$D.parse(this.toString("d")+" "+time):this.set(time);};$N.fromNow=$N.after=function(date){var c={};c[this._dateElement]=this;return((!date)?new Date():date.clone()).add(c);};$N.ago=$N.before=function(date){var c={};c[this._dateElement]=this*-1;return((!date)?new Date():date.clone()).add(c);};var dx=("sunday monday tuesday wednesday thursday friday saturday").split(/\s/),mx=("january february march april may june july august september october november december").split(/\s/),px=("Millisecond Second Minute Hour Day Week Month Year").split(/\s/),pxf=("Milliseconds Seconds Minutes Hours Date Week Month FullYear").split(/\s/),nth=("final first second third fourth fifth").split(/\s/),de;$P.toObject=function(){var o={};for(var i=0;i<px.length;i++){o[px[i].toLowerCase()]=this["get"+pxf[i]]();}
return o;};$D.fromObject=function(config){config.week=null;return Date.today().set(config);};var df=function(n){return function(){if(this._is){this._is=false;return this.getDay()==n;}
if(this._nth!==null){if(this._isSecond){this.addSeconds(this._orient*-1);}
this._isSecond=false;var ntemp=this._nth;this._nth=null;var temp=this.clone().moveToLastDayOfMonth();this.moveToNthOccurrence(n,ntemp);if(this>temp){throw new RangeError($D.getDayName(n)+" does not occur "+ntemp+" times in the month of "+$D.getMonthName(temp.getMonth())+" "+temp.getFullYear()+".");}
return this;}
return this.moveToDayOfWeek(n,this._orient);};};var sdf=function(n){return function(){var t=$D.today(),shift=n-t.getDay();if(n===0&&$C.firstDayOfWeek===1&&t.getDay()!==0){shift=shift+7;}
return t.addDays(shift);};};for(var i=0;i<dx.length;i++){$D[dx[i].toUpperCase()]=$D[dx[i].toUpperCase().substring(0,3)]=i;$D[dx[i]]=$D[dx[i].substring(0,3)]=sdf(i);$P[dx[i]]=$P[dx[i].substring(0,3)]=df(i);}
var mf=function(n){return function(){if(this._is){this._is=false;return this.getMonth()===n;}
return this.moveToMonth(n,this._orient);};};var smf=function(n){return function(){return $D.today().set({month:n,day:1});};};for(var j=0;j<mx.length;j++){$D[mx[j].toUpperCase()]=$D[mx[j].toUpperCase().substring(0,3)]=j;$D[mx[j]]=$D[mx[j].substring(0,3)]=smf(j);$P[mx[j]]=$P[mx[j].substring(0,3)]=mf(j);}
var ef=function(j){return function(){if(this._isSecond){this._isSecond=false;return this;}
if(this._same){this._same=this._is=false;var o1=this.toObject(),o2=(arguments[0]||new Date()).toObject(),v="",k=j.toLowerCase();for(var m=(px.length-1);m>-1;m--){v=px[m].toLowerCase();if(o1[v]!=o2[v]){return false;}
if(k==v){break;}}
return true;}
if(j.substring(j.length-1)!="s"){j+="s";}
return this["add"+j](this._orient);};};var nf=function(n){return function(){this._dateElement=n;return this;};};for(var k=0;k<px.length;k++){de=px[k].toLowerCase();$P[de]=$P[de+"s"]=ef(px[k]);$N[de]=$N[de+"s"]=nf(de);}
$P._ss=ef("Second");var nthfn=function(n){return function(dayOfWeek){if(this._same){return this._ss(arguments[0]);}
if(dayOfWeek||dayOfWeek===0){return this.moveToNthOccurrence(dayOfWeek,n);}
this._nth=n;if(n===2&&(dayOfWeek===undefined||dayOfWeek===null)){this._isSecond=true;return this.addSeconds(this._orient);}
return this;};};for(var l=0;l<nth.length;l++){$P[nth[l]]=(l===0)?nthfn(-1):nthfn(l);}}());
(function(){Date.Parsing={Exception:function(s){this.message="Parse error at '"+s.substring(0,10)+" ...'";}};var $P=Date.Parsing;var _=$P.Operators={rtoken:function(r){return function(s){var mx=s.match(r);if(mx){return([mx[0],s.substring(mx[0].length)]);}else{throw new $P.Exception(s);}};},token:function(s){return function(s){return _.rtoken(new RegExp("^\s*"+s+"\s*"))(s);};},stoken:function(s){return _.rtoken(new RegExp("^"+s));},until:function(p){return function(s){var qx=[],rx=null;while(s.length){try{rx=p.call(this,s);}catch(e){qx.push(rx[0]);s=rx[1];continue;}
break;}
return[qx,s];};},many:function(p){return function(s){var rx=[],r=null;while(s.length){try{r=p.call(this,s);}catch(e){return[rx,s];}
rx.push(r[0]);s=r[1];}
return[rx,s];};},optional:function(p){return function(s){var r=null;try{r=p.call(this,s);}catch(e){return[null,s];}
return[r[0],r[1]];};},not:function(p){return function(s){try{p.call(this,s);}catch(e){return[null,s];}
throw new $P.Exception(s);};},ignore:function(p){return p?function(s){var r=null;r=p.call(this,s);return[null,r[1]];}:null;},product:function(){var px=arguments[0],qx=Array.prototype.slice.call(arguments,1),rx=[];for(var i=0;i<px.length;i++){rx.push(_.each(px[i],qx));}
return rx;},cache:function(rule){var cache={},r=null;return function(s){try{r=cache[s]=(cache[s]||rule.call(this,s));}catch(e){r=cache[s]=e;}
if(r instanceof $P.Exception){throw r;}else{return r;}};},any:function(){var px=arguments;return function(s){var r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){r=null;}
if(r){return r;}}
throw new $P.Exception(s);};},each:function(){var px=arguments;return function(s){var rx=[],r=null;for(var i=0;i<px.length;i++){if(px[i]==null){continue;}
try{r=(px[i].call(this,s));}catch(e){throw new $P.Exception(s);}
rx.push(r[0]);s=r[1];}
return[rx,s];};},all:function(){var px=arguments,_=_;return _.each(_.optional(px));},sequence:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;if(px.length==1){return px[0];}
return function(s){var r=null,q=null;var rx=[];for(var i=0;i<px.length;i++){try{r=px[i].call(this,s);}catch(e){break;}
rx.push(r[0]);try{q=d.call(this,r[1]);}catch(ex){q=null;break;}
s=q[1];}
if(!r){throw new $P.Exception(s);}
if(q){throw new $P.Exception(q[1]);}
if(c){try{r=c.call(this,r[1]);}catch(ey){throw new $P.Exception(r[1]);}}
return[rx,(r?r[1]:s)];};},between:function(d1,p,d2){d2=d2||d1;var _fn=_.each(_.ignore(d1),p,_.ignore(d2));return function(s){var rx=_fn.call(this,s);return[[rx[0][0],r[0][2]],rx[1]];};},list:function(p,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return(p instanceof Array?_.each(_.product(p.slice(0,-1),_.ignore(d)),p.slice(-1),_.ignore(c)):_.each(_.many(_.each(p,_.ignore(d))),px,_.ignore(c)));},set:function(px,d,c){d=d||_.rtoken(/^\s*/);c=c||null;return function(s){var r=null,p=null,q=null,rx=null,best=[[],s],last=false;for(var i=0;i<px.length;i++){q=null;p=null;r=null;last=(px.length==1);try{r=px[i].call(this,s);}catch(e){continue;}
rx=[[r[0]],r[1]];if(r[1].length>0&&!last){try{q=d.call(this,r[1]);}catch(ex){last=true;}}else{last=true;}
if(!last&&q[1].length===0){last=true;}
if(!last){var qx=[];for(var j=0;j<px.length;j++){if(i!=j){qx.push(px[j]);}}
p=_.set(qx,d).call(this,q[1]);if(p[0].length>0){rx[0]=rx[0].concat(p[0]);rx[1]=p[1];}}
if(rx[1].length<best[1].length){best=rx;}
if(best[1].length===0){break;}}
if(best[0].length===0){return best;}
if(c){try{q=c.call(this,best[1]);}catch(ey){throw new $P.Exception(best[1]);}
best[1]=q[1];}
return best;};},forward:function(gr,fname){return function(s){return gr[fname].call(this,s);};},replace:function(rule,repl){return function(s){var r=rule.call(this,s);return[repl,r[1]];};},process:function(rule,fn){return function(s){var r=rule.call(this,s);return[fn.call(this,r[0]),r[1]];};},min:function(min,rule){return function(s){var rx=rule.call(this,s);if(rx[0].length<min){throw new $P.Exception(s);}
return rx;};}};var _generator=function(op){return function(){var args=null,rx=[];if(arguments.length>1){args=Array.prototype.slice.call(arguments);}else if(arguments[0]instanceof Array){args=arguments[0];}
if(args){for(var i=0,px=args.shift();i<px.length;i++){args.unshift(px[i]);rx.push(op.apply(null,args));args.shift();return rx;}}else{return op.apply(null,arguments);}};};var gx="optional not ignore cache".split(/\s/);for(var i=0;i<gx.length;i++){_[gx[i]]=_generator(_[gx[i]]);}
var _vector=function(op){return function(){if(arguments[0]instanceof Array){return op.apply(null,arguments[0]);}else{return op.apply(null,arguments);}};};var vx="each any all".split(/\s/);for(var j=0;j<vx.length;j++){_[vx[j]]=_vector(_[vx[j]]);}}());(function(){var $D=Date,$P=$D.prototype,$C=$D.CultureInfo;var flattenAndCompact=function(ax){var rx=[];for(var i=0;i<ax.length;i++){if(ax[i]instanceof Array){rx=rx.concat(flattenAndCompact(ax[i]));}else{if(ax[i]){rx.push(ax[i]);}}}
return rx;};$D.Grammar={};$D.Translator={hour:function(s){return function(){this.hour=Number(s);};},minute:function(s){return function(){this.minute=Number(s);};},second:function(s){return function(){this.second=Number(s);};},meridian:function(s){return function(){this.meridian=s.slice(0,1).toLowerCase();};},timezone:function(s){return function(){var n=s.replace(/[^\d\+\-]/g,"");if(n.length){this.timezoneOffset=Number(n);}else{this.timezone=s.toLowerCase();}};},day:function(x){var s=x[0];return function(){this.day=Number(s.match(/\d+/)[0]);};},month:function(s){return function(){this.month=(s.length==3)?"jan feb mar apr may jun jul aug sep oct nov dec".indexOf(s)/4:Number(s)-1;};},year:function(s){return function(){var n=Number(s);this.year=((s.length>2)?n:(n+(((n+2000)<$C.twoDigitYearMax)?2000:1900)));};},rday:function(s){return function(){switch(s){case"yesterday":this.days=-1;break;case"tomorrow":this.days=1;break;case"today":this.days=0;break;case"now":this.days=0;this.now=true;break;}};},finishExact:function(x){x=(x instanceof Array)?x:[x];for(var i=0;i<x.length;i++){if(x[i]){x[i].call(this);}}
var now=new Date();if((this.hour||this.minute)&&(!this.month&&!this.year&&!this.day)){this.day=now.getDate();}
if(!this.year){this.year=now.getFullYear();}
if(!this.month&&this.month!==0){this.month=now.getMonth();}
if(!this.day){this.day=1;}
if(!this.hour){this.hour=0;}
if(!this.minute){this.minute=0;}
if(!this.second){this.second=0;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.day>$D.getDaysInMonth(this.year,this.month)){throw new RangeError(this.day+" is not a valid value for days.");}
var r=new Date(this.year,this.month,this.day,this.hour,this.minute,this.second);if(this.timezone){r.set({timezone:this.timezone});}else if(this.timezoneOffset){r.set({timezoneOffset:this.timezoneOffset});}
return r;},finish:function(x){x=(x instanceof Array)?flattenAndCompact(x):[x];if(x.length===0){return null;}
for(var i=0;i<x.length;i++){if(typeof x[i]=="function"){x[i].call(this);}}
var today=$D.today();if(this.now&&!this.unit&&!this.operator){return new Date();}else if(this.now){today=new Date();}
var expression=!!(this.days&&this.days!==null||this.orient||this.operator);var gap,mod,orient;orient=((this.orient=="past"||this.operator=="subtract")?-1:1);if(!this.now&&"hour minute second".indexOf(this.unit)!=-1){today.setTimeToNow();}
if(this.month||this.month===0){if("year day hour minute second".indexOf(this.unit)!=-1){this.value=this.month+1;this.month=null;expression=true;}}
if(!expression&&this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(!this.month){this.month=temp.getMonth();}
this.year=temp.getFullYear();}
if(expression&&this.weekday&&this.unit!="month"){this.unit="day";gap=($D.getDayNumberFromName(this.weekday)-today.getDay());mod=7;this.days=gap?((gap+(orient*mod))%mod):(orient*mod);}
if(this.month&&this.unit=="day"&&this.operator){this.value=(this.month+1);this.month=null;}
if(this.value!=null&&this.month!=null&&this.year!=null){this.day=this.value*1;}
if(this.month&&!this.day&&this.value){today.set({day:this.value*1});if(!expression){this.day=this.value*1;}}
if(!this.month&&this.value&&this.unit=="month"&&!this.now){this.month=this.value;expression=true;}
if(expression&&(this.month||this.month===0)&&this.unit!="year"){this.unit="month";gap=(this.month-today.getMonth());mod=12;this.months=gap?((gap+(orient*mod))%mod):(orient*mod);this.month=null;}
if(!this.unit){this.unit="day";}
if(!this.value&&this.operator&&this.operator!==null&&this[this.unit+"s"]&&this[this.unit+"s"]!==null){this[this.unit+"s"]=this[this.unit+"s"]+((this.operator=="add")?1:-1)+(this.value||0)*orient;}else if(this[this.unit+"s"]==null||this.operator!=null){if(!this.value){this.value=1;}
this[this.unit+"s"]=this.value*orient;}
if(this.meridian&&this.hour){if(this.meridian=="p"&&this.hour<12){this.hour=this.hour+12;}else if(this.meridian=="a"&&this.hour==12){this.hour=0;}}
if(this.weekday&&!this.day&&!this.days){var temp=Date[this.weekday]();this.day=temp.getDate();if(temp.getMonth()!==today.getMonth()){this.month=temp.getMonth();}}
if((this.month||this.month===0)&&!this.day){this.day=1;}
if(!this.orient&&!this.operator&&this.unit=="week"&&this.value&&!this.day&&!this.month){return Date.today().setWeek(this.value);}
if(expression&&this.timezone&&this.day&&this.days){this.day=this.days;}
return(expression)?today.add(this):today.set(this);}};var _=$D.Parsing.Operators,g=$D.Grammar,t=$D.Translator,_fn;g.datePartDelimiter=_.rtoken(/^([\s\-\.\,\/\x27]+)/);g.timePartDelimiter=_.stoken(":");g.whiteSpace=_.rtoken(/^\s*/);g.generalDelimiter=_.rtoken(/^(([\s\,]|at|@|on)+)/);var _C={};g.ctoken=function(keys){var fn=_C[keys];if(!fn){var c=$C.regexPatterns;var kx=keys.split(/\s+/),px=[];for(var i=0;i<kx.length;i++){px.push(_.replace(_.rtoken(c[kx[i]]),kx[i]));}
fn=_C[keys]=_.any.apply(null,px);}
return fn;};g.ctoken2=function(key){return _.rtoken($C.regexPatterns[key]);};g.h=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2]|[1-9])/),t.hour));g.hh=_.cache(_.process(_.rtoken(/^(0[0-9]|1[0-2])/),t.hour));g.H=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3]|[0-9])/),t.hour));g.HH=_.cache(_.process(_.rtoken(/^([0-1][0-9]|2[0-3])/),t.hour));g.m=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.minute));g.mm=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.minute));g.s=_.cache(_.process(_.rtoken(/^([0-5][0-9]|[0-9])/),t.second));g.ss=_.cache(_.process(_.rtoken(/^[0-5][0-9]/),t.second));g.hms=_.cache(_.sequence([g.H,g.m,g.s],g.timePartDelimiter));g.t=_.cache(_.process(g.ctoken2("shortMeridian"),t.meridian));g.tt=_.cache(_.process(g.ctoken2("longMeridian"),t.meridian));g.z=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zz=_.cache(_.process(_.rtoken(/^((\+|\-)\s*\d\d\d\d)|((\+|\-)\d\d\:?\d\d)/),t.timezone));g.zzz=_.cache(_.process(g.ctoken2("timezone"),t.timezone));g.timeSuffix=_.each(_.ignore(g.whiteSpace),_.set([g.tt,g.zzz]));g.time=_.each(_.optional(_.ignore(_.stoken("T"))),g.hms,g.timeSuffix);g.d=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1]|\d)/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.dd=_.cache(_.process(_.each(_.rtoken(/^([0-2]\d|3[0-1])/),_.optional(g.ctoken2("ordinalSuffix"))),t.day));g.ddd=g.dddd=_.cache(_.process(g.ctoken("sun mon tue wed thu fri sat"),function(s){return function(){this.weekday=s;};}));g.M=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d|\d)/),t.month));g.MM=_.cache(_.process(_.rtoken(/^(1[0-2]|0\d)/),t.month));g.MMM=g.MMMM=_.cache(_.process(g.ctoken("jan feb mar apr may jun jul aug sep oct nov dec"),t.month));g.y=_.cache(_.process(_.rtoken(/^(\d\d?)/),t.year));g.yy=_.cache(_.process(_.rtoken(/^(\d\d)/),t.year));g.yyy=_.cache(_.process(_.rtoken(/^(\d\d?\d?\d?)/),t.year));g.yyyy=_.cache(_.process(_.rtoken(/^(\d\d\d\d)/),t.year));_fn=function(){return _.each(_.any.apply(null,arguments),_.not(g.ctoken2("timeContext")));};g.day=_fn(g.d,g.dd);g.month=_fn(g.M,g.MMM);g.year=_fn(g.yyyy,g.yy);g.orientation=_.process(g.ctoken("past future"),function(s){return function(){this.orient=s;};});g.operator=_.process(g.ctoken("add subtract"),function(s){return function(){this.operator=s;};});g.rday=_.process(g.ctoken("yesterday tomorrow today now"),t.rday);g.unit=_.process(g.ctoken("second minute hour day week month year"),function(s){return function(){this.unit=s;};});g.value=_.process(_.rtoken(/^\d\d?(st|nd|rd|th)?/),function(s){return function(){this.value=s.replace(/\D/g,"");};});g.expression=_.set([g.rday,g.operator,g.value,g.unit,g.orientation,g.ddd,g.MMM]);_fn=function(){return _.set(arguments,g.datePartDelimiter);};g.mdy=_fn(g.ddd,g.month,g.day,g.year);g.ymd=_fn(g.ddd,g.year,g.month,g.day);g.dmy=_fn(g.ddd,g.day,g.month,g.year);g.date=function(s){return((g[$C.dateElementOrder]||g.mdy).call(this,s));};g.format=_.process(_.many(_.any(_.process(_.rtoken(/^(dd?d?d?|MM?M?M?|yy?y?y?|hh?|HH?|mm?|ss?|tt?|zz?z?)/),function(fmt){if(g[fmt]){return g[fmt];}else{throw $D.Parsing.Exception(fmt);}}),_.process(_.rtoken(/^[^dMyhHmstz]+/),function(s){return _.ignore(_.stoken(s));}))),function(rules){return _.process(_.each.apply(null,rules),t.finishExact);});var _F={};var _get=function(f){return _F[f]=(_F[f]||g.format(f)[0]);};g.formats=function(fx){if(fx instanceof Array){var rx=[];for(var i=0;i<fx.length;i++){rx.push(_get(fx[i]));}
return _.any.apply(null,rx);}else{return _get(fx);}};g._formats=g.formats(["\"yyyy-MM-ddTHH:mm:ssZ\"","yyyy-MM-ddTHH:mm:ssZ","yyyy-MM-ddTHH:mm:ssz","yyyy-MM-ddTHH:mm:ss","yyyy-MM-ddTHH:mmZ","yyyy-MM-ddTHH:mmz","yyyy-MM-ddTHH:mm","ddd, MMM dd, yyyy H:mm:ss tt","ddd MMM d yyyy HH:mm:ss zzz","MMddyyyy","ddMMyyyy","Mddyyyy","ddMyyyy","Mdyyyy","dMyyyy","yyyy","Mdyy","dMyy","d"]);g._start=_.process(_.set([g.date,g.time,g.expression],g.generalDelimiter,g.whiteSpace),t.finish);g.start=function(s){try{var r=g._formats.call({},s);if(r[1].length===0){return r;}}catch(e){}
return g._start.call({},s);};$D._parse=$D.parse;$D.parse=function(s){var r=null;if(!s){return null;}
if(s instanceof Date){return s;}
try{r=$D.Grammar.start.call({},s.replace(/^\s*(\S*(\s+\S+)*)\s*$/,"$1"));}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};$D.getParseFunction=function(fx){var fn=$D.Grammar.formats(fx);return function(s){var r=null;try{r=fn.call({},s);}catch(e){return null;}
return((r[1].length===0)?r[0]:null);};};$D.parseExact=function(s,fx){return $D.getParseFunction(fx)(s);};}());
 /**
 * @version: 1.0 Alpha-1
 */

(function () {
    var $D = Date,
        $P = $D.prototype,
        $C = $D.CultureInfo,
        $f = [],
        p = function (s, l) {
            if (!l) {
                l = 2;
            }
            return ("000" + s).slice(l * -1);
        };

    /**
     * Converts a PHP format string to Java/.NET format string.
     * A PHP format string can be used with .$format or .format.
     * A Java/.NET format string can be used with .toString().
     * The .parseExact function will only accept a Java/.NET format string
     *
     * Example
     <pre>
     var f1 = "%m/%d/%y"
     var f2 = Date.normalizeFormat(f1); // "MM/dd/yy"

     new Date().format(f1);    // "04/13/08"
     new Date().$format(f1);   // "04/13/08"
     new Date().toString(f2);  // "04/13/08"

     var date = Date.parseExact("04/13/08", f2); // Sun Apr 13 2008
     </pre>
     * @param {String}   A PHP format string consisting of one or more format spcifiers.
     * @return {String}  The PHP format converted to a Java/.NET format string.
     */
    $D.normalizeFormat = function (format) {
        $f = [];
        var t = new Date().$format(format);
        return $f.join("");
    };

    /**
     * Format a local Unix timestamp according to locale settings
     *
     * Example
     <pre>
     Date.strftime("%m/%d/%y", new Date());       // "04/13/08"
     Date.strftime("c", "2008-04-13T17:52:03Z");  // "04/13/08"
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @param {Number}   The number representing the number of seconds that have elapsed since January 1, 1970 (local time).
     * @return {String}  A string representation of the current Date object.
     */
    $D.strftime = function (format, time) {
        return new Date(time * 1000).$format(format);
    };

    /**
     * Parse any textual datetime description into a Unix timestamp.
     * A Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
     *
     * Example
     <pre>
     Date.strtotime("04/13/08");              // 1208044800
     Date.strtotime("1970-01-01T00:00:00Z");  // 0
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @param {Object}   A string or date object.
     * @return {String}  A string representation of the current Date object.
     */
    $D.strtotime = function (time) {
        var d = $D.parse(time);
        d.addMinutes(d.getTimezoneOffset() * -1);
        return Math.round($D.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds()) / 1000);
    };

    /**
     * Converts the value of the current Date object to its equivalent string representation using a PHP/Unix style of date format specifiers.
     *
     * The following descriptions are from http://www.php.net/strftime and http://www.php.net/manual/en/function.date.php.
     * Copyright � 2001-2008 The PHP Group
     *
     * Format Specifiers
     <pre>
    Format  Description                                                                  Example
    ------  ---------------------------------------------------------------------------  -----------------------
     %a     abbreviated weekday name according to the current localed                    "Mon" through "Sun"
     %A     full weekday name according to the current locale                            "Sunday" through "Saturday"
     %b     abbreviated month name according to the current locale                       "Jan" through "Dec"
     %B     full month name according to the current locale                              "January" through "December"
     %c     preferred date and time representation for the current locale                "4/13/2008 12:33 PM"
     %C     century number (the year divided by 100 and truncated to an integer)         "00" to "99"
     %d     day of the month as a decimal number                                         "01" to "31"
     %D     same as %m/%d/%y                                                             "04/13/08"
     %e     day of the month as a decimal number, a single digit is preceded by a space  "1" to "31"
     %g     like %G, but without the century                                             "08"
     %G     The 4-digit year corresponding to the ISO week number (see %V).              "2008"
            This has the same format and value as %Y, except that if the ISO week number
            belongs to the previous or next year, that year is used instead.
     %h     same as %b                                                                   "Jan" through "Dec"
     %H     hour as a decimal number using a 24-hour clock                               "00" to "23"
     %I     hour as a decimal number using a 12-hour clock                               "01" to "12"
     %j     day of the year as a decimal number                                          "001" to "366"
     %m     month as a decimal number                                                    "01" to "12"
     %M     minute as a decimal number                                                   "00" to "59"
     %n     newline character                                                            "\n"
     %p     either "am" or "pm" according to the given time value, or the                "am" or "pm"
            corresponding strings for the current locale
     %r     time in a.m. and p.m. notation                                               "8:44 PM"
     %R     time in 24 hour notation                                                     "20:44"
     %S     second as a decimal number                                                   "00" to "59"
     %t     tab character                                                                "\t"
     %T     current time, equal to %H:%M:%S                                              "12:49:11"
     %u     weekday as a decimal number ["1", "7"], with "1" representing Monday         "1" to "7"
     %U     week number of the current year as a decimal number, starting with the       "0" to ("52" or "53")
            first Sunday as the first day of the first week
     %V     The ISO 8601:1988 week number of the current year as a decimal number,       "00" to ("52" or "53")
            range 01 to 53, where week 1 is the first week that has at least 4 days
            in the current year, and with Monday as the first day of the week.
            (Use %G or %g for the year component that corresponds to the week number
            for the specified timestamp.)
     %W     week number of the current year as a decimal number, starting with the       "00" to ("52" or "53")
            first Monday as the first day of the first week
     %w     day of the week as a decimal, Sunday being "0"                               "0" to "6"
     %x     preferred date representation for the current locale without the time        "4/13/2008"
     %X     preferred time representation for the current locale without the date        "12:53:05"
     %y     year as a decimal number without a century                                   "00" "99"
     %Y     year as a decimal number including the century                               "2008"
     %Z     time zone or name or abbreviation                                            "UTC", "EST", "PST"
     %z     same as %Z
     %%     a literal "%" character                                                      "%"

     d      Day of the month, 2 digits with leading zeros                                "01" to "31"
     D      A textual representation of a day, three letters                             "Mon" through "Sun"
     j      Day of the month without leading zeros                                       "1" to "31"
     l      A full textual representation of the day of the week (lowercase "L")         "Sunday" through "Saturday"
     N      ISO-8601 numeric representation of the day of the week (added in PHP 5.1.0)  "1" (for Monday) through "7" (for Sunday)
     S      English ordinal suffix for the day of the month, 2 characters                "st", "nd", "rd" or "th". Works well with j
     w      Numeric representation of the day of the week                                "0" (for Sunday) through "6" (for Saturday)
     z      The day of the year (starting from "0")                                      "0" through "365"
     W      ISO-8601 week number of year, weeks starting on Monday                       "00" to ("52" or "53")
     F      A full textual representation of a month, such as January or March           "January" through "December"
     m      Numeric representation of a month, with leading zeros                        "01" through "12"
     M      A short textual representation of a month, three letters                     "Jan" through "Dec"
     n      Numeric representation of a month, without leading zeros                     "1" through "12"
     t      Number of days in the given month                                            "28" through "31"
     L      Whether it's a leap year                                                     "1" if it is a leap year, "0" otherwise
     o      ISO-8601 year number. This has the same value as Y, except that if the       "2008"
            ISO week number (W) belongs to the previous or next year, that year
            is used instead.
     Y      A full numeric representation of a year, 4 digits                            "2008"
     y      A two digit representation of a year                                         "08"
     a      Lowercase Ante meridiem and Post meridiem                                    "am" or "pm"
     A      Uppercase Ante meridiem and Post meridiem                                    "AM" or "PM"
     B      Swatch Internet time                                                         "000" through "999"
     g      12-hour format of an hour without leading zeros                              "1" through "12"
     G      24-hour format of an hour without leading zeros                              "0" through "23"
     h      12-hour format of an hour with leading zeros                                 "01" through "12"
     H      24-hour format of an hour with leading zeros                                 "00" through "23"
     i      Minutes with leading zeros                                                   "00" to "59"
     s      Seconds, with leading zeros                                                  "00" through "59"
     u      Milliseconds                                                                 "54321"
     e      Timezone identifier                                                          "UTC", "EST", "PST"
     I      Whether or not the date is in daylight saving time (uppercase i)             "1" if Daylight Saving Time, "0" otherwise
     O      Difference to Greenwich time (GMT) in hours                                  "+0200", "-0600"
     P      Difference to Greenwich time (GMT) with colon between hours and minutes      "+02:00", "-06:00"
     T      Timezone abbreviation                                                        "UTC", "EST", "PST"
     Z      Timezone offset in seconds. The offset for timezones west of UTC is          "-43200" through "50400"
            always negative, and for those east of UTC is always positive.
     c      ISO 8601 date                                                                "2004-02-12T15:19:21+00:00"
     r      RFC 2822 formatted date                                                      "Thu, 21 Dec 2000 16:01:07 +0200"
     U      Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                   "0"
     </pre>
     * @param {String}   A format string consisting of one or more format spcifiers [Optional].
     * @return {String}  A string representation of the current Date object.
     */
    $P.$format = function (format) {
        var x = this,
            y,
            t = function (v) {
                $f.push(v);
                return x.toString(v);
            };

        return format ? format.replace(/(%|\\)?.|%%/g,
        function (m) {
            if (m.charAt(0) === "\\" || m.substring(0, 2) === "%%") {
                return m.replace("\\", "").replace("%%", "%");
            }
            switch (m) {
            case "d":
            case "%d":
                return t("dd");
            case "D":
            case "%a":
                return t("ddd");
            case "j":
            case "%e":
                return t("d");
            case "l":
            case "%A":
                return t("dddd");
            case "N":
            case "%u":
                return x.getDay() + 1;
            case "S":
                return t("S");
            case "w":
            case "%w":
                return x.getDay();
            case "z":
                return x.getOrdinalNumber();
            case "%j":
                return p(x.getOrdinalNumber(), 3);
            case "%U":
                var d1 = x.clone().set({month: 0, day: 1}).addDays(-1).moveToDayOfWeek(0),
                    d2 = x.clone().addDays(1).moveToDayOfWeek(0, -1);
                return (d2 < d1) ? "00" : p((d2.getOrdinalNumber() - d1.getOrdinalNumber()) / 7 + 1);
            case "W":
            case "%V":
                return x.getISOWeek();
            case "%W":
                return p(x.getWeek());
            case "F":
            case "%B":
                return t("MMMM");
            case "m":
            case "%m":
                return t("MM");
            case "M":
            case "%b":
            case "%h":
                return t("MMM");
            case "n":
                return t("M");
            case "t":
                return $D.getDaysInMonth(x.getFullYear(), x.getMonth());
            case "L":
                return ($D.isLeapYear(x.getFullYear())) ? 1 : 0;
            case "o":
            case "%G":
                return x.setWeek(x.getISOWeek()).toString("yyyy");
            case "%g":
                return x.$format("%G").slice(-2);
            case "Y":
            case "%Y":
                return t("yyyy");
            case "y":
            case "%y":
                return t("yy");
            case "a":
            case "%p":
                return t("tt").toLowerCase();
            case "A":
                return t("tt").toUpperCase();
            case "g":
            case "%I":
                return t("h");
            case "G":
                return t("H");
            case "h":
                return t("hh");
            case "H":
            case "%H":
                return t("HH");
            case "i":
            case "%M":
                return t("mm");
            case "s":
            case "%S":
                return t("ss");
            case "u":
                return p(x.getMilliseconds(), 3);
            case "I":
                return (x.isDaylightSavingTime()) ? 1 : 0;
            case "O":
                return x.getUTCOffset();
            case "P":
                y = x.getUTCOffset();
                return y.substring(0, y.length - 2) + ":" + y.substring(y.length - 2);
            case "e":
            case "T":
            case "%z":
            case "%Z":
                return x.getTimezone();
            case "Z":
                return x.getTimezoneOffset() * -60;
            case "B":
                var now = new Date();
                return Math.floor(((now.getHours() * 3600) + (now.getMinutes() * 60) + now.getSeconds() + (now.getTimezoneOffset() + 60) * 60) / 86.4);
            case "c":
                return x.toISOString().replace(/\"/g, "");
            case "U":
                return $D.strtotime("now");
            case "%c":
                return t("d") + " " + t("t");
            case "%C":
                return Math.floor(x.getFullYear() / 100 + 1);
            case "%D":
                return t("MM/dd/yy");
            case "%n":
                return "\\n";
            case "%t":
                return "\\t";
            case "%r":
                return t("hh:mm tt");
            case "%R":
                return t("H:mm");
            case "%T":
                return t("H:mm:ss");
            case "%x":
                return t("d");
            case "%X":
                return t("t");
            default:
                $f.push(m);
			    return m;
            }
        }
        ) : this._toString();
    };

    if (!$P.format) {
        $P.format = $P.$format;
    }
}());
 /*
objSort v 1.1
copyright 2006 Thomas Frank

This program is free software under the terms of the 
GNU General Public License version 2 as published by the Free 
Software Foundation. It is distributed without any warranty.
*/

tfObjSort={
	init:function(){
		Array.prototype.objSort=function(){
			tfObjSort.setThings(this);
			var a=arguments;
			var x=tfObjSort;
			x.a=[];x.d=[];
			for(var i=0;i<a.length;i++){
				if(typeof a[i]=="string"){x.a.push(a[i]);x.d.push(1)};
				if(a[i]===-1){x.d[x.d.length-1]=-1}
			}
			return this.sort(tfObjSort.sorter);
		};
		Array.prototype.strSort=function(){
			tfObjSort.setThings(this);
			return this.sort(tfObjSort.charSorter)
		}
	},
	sorter:function(x,y){
		var a=tfObjSort.a
		var d=tfObjSort.d
		var r=0
		for(var i=0;i<a.length;i++){
			if(typeof x+typeof y!="objectobject"){return typeof x=="object"?-1:1};
			var m=x[a[i]]; var n=y[a[i]];
			var t=typeof m+typeof n;
			if(t=="booleanboolean"){m*=-1;n*=-1}
			else if(t.split("string").join("").split("number").join("")!=""){continue};
			r=m-n;
			if(isNaN(r)){r=tfObjSort.charSorter(m,n)};
			if(r!=0){return r*d[i]}
		}
		return r
	},
	charSorter:function(x,y){
		if(tfObjSort.ignoreCase){x=x.toLowerCase();y=y.toLowerCase()};
		var s=tfObjSort.chars;
		if(!s){return x>y?1:x<y?-1:0};
		x=x.split("");y=y.split("");l=x.length>y.length?y.length:x.length;
		var p=0;
		for(var i=0;i<l;i++){
			p=s.indexOf(x[i])-s.indexOf(y[i]);
			if(p!=0){break};
		};
		if(p==0){p=x.length-y.length};
		return p
	},
	setThings:function(x){
		this.ignoreCase=x.sortIgnoreCase;
		var s=x.sortCharOrder;
		if(!s){this.chars=false;return true};
		if(!s.sort){s=s.split(",")};
		var a="";
		for(var i=1;i<1024;i++){a+=String.fromCharCode(i)};
		for(var i=0;i<s.length;i++){
			z=s[i].split("");
			var m=z[0]; var n=z[1]; var o="";
			if(z[2]=="_"){o=n+m} else {o=m+n};
			a=a.split(m).join("").split(n).join(o);
		};
		this.chars=a
	}
};
tfObjSort.init();




 /**
* jQuery custom event "outerClick".
* @author David Brockman Smoliansky http://littleroom.se/
* @license GNU Lesser General Public License: http://creativecommons.org/licenses/LGPL/2.1/
* @version 1.0.1
* 2009/02/24
*/

/*global jQuery */
(function ($, elements, OUTER_CLICK, LENGTH) {

    /**
* Check if the event should be fired.
* @param {Object} event The click event.
* @private
*/
    function check(event) {
        for (var target = event.target, i = 0, l = elements[LENGTH], el; i < l; i++) {
            el = elements[i];
            if (el !== target && !(el.contains ? el.contains(target) : el.compareDocumentPosition ? el.compareDocumentPosition(target) & 16 : true)) {
                $.event.trigger(OUTER_CLICK, event, el);
            }
        }
    }


    $.event.special[OUTER_CLICK] = {

        setup: function () {
            if (!elements[LENGTH]) {
                // elements list is empty: attach the listener.
                $.event.add(document, 'click', check);
            }
            if ($.inArray(this, elements) < 0) {
                elements[elements[LENGTH]] = this;
            }
        },

        teardown: function () {
            for (var filtered = [], i = 0, j = 0, l = elements[LENGTH], el; i < l; i++) {
                el = elements[i];
                if (el !== this) {
                    filtered[j++] = el;
                }
            }
            elements[LENGTH] = 0;
            if (!elements.push.apply(elements, filtered)) {
                // elements list is empty: detach the listener.
                $.event.remove(document, 'click', check);
            }
        }

    };


    /**
* The outerClick event is fired when an element outside of the target element is clicked.
* Event helper outerClick: $.fn.outerClick
*
* @param {Function} [fn] A function to bind to the outerClick event on each of the matched elements.
* If fn is omitted the event is instead triggered.
* @return {jQuery} Returns the jQuery object.
*/
    $.fn[OUTER_CLICK] = function (fn) {
        return fn ? this.bind(OUTER_CLICK, fn) : this.trigger(OUTER_CLICK);
    };

})(jQuery, [], 'outerClick', 'length');
 function ShiftPlanning(){
    this.raw = {};
    //api cals
    this.apiCalls = {};
    this.successMessage = '';
    var self = this;
    this.initialize();
    return true;
}

ShiftPlanning.prototype = {
    multiApi: function(calls, callback){
        var data = [];
        $.each(calls,function(index,item){

            var call = {
                module: item[0],
                method: item[1]
            };
            $.each(item[2],function(argIndex, argItem){
                call[argIndex] = argItem;
            });
            data.push(call);
        });
        
        var xhr = $.ajax({
            url: 'api.php',
            dataType: 'json',
            type: 'post',
            data: 'multi=1&data=' + JSON.stringify(data),
            cache: false,
            success: function(response){
                if(typeof callback == 'function'){
                    callback.call(this,response);
                }
            }
        });
    },
    api: function(module, method, arguments, callback, errorCallback){
        var self = this;
        //check is same api call runing and if it's running don't alow new one
        var a = module + '.' + method + '.' + JSON.stringify(arguments);
        if (typeof this.apiCalls[a] != 'undefined' && this.apiCalls[a] != null){
            return false;
        }
        var data = {
            module: module,
            method: method
        };
        $.each(arguments,function(index, item){
            data[index] = item;
        });
        this.globalLoader();
        this.apiCalls[a] = $.ajax({
            url: 'api.php',
            dataType: 'json',
            type: 'post',
            data: data,
            cache: false,
            success: function(response){
                self.apiCalls[a] = null;
                var closeLoader = true;
                $.each(self.apiCalls, function(i, item){
                    if (item != null){
                        closeLoader = false;
                    }
                });
                if (closeLoader){
                    $('.globalLoader').remove();
                    self.apiCalls = {};
                }
                if(response.status == 3){
                    //We are not logged in!
                    sp.hash('logout');
                    user.loggedIn = 0;
                    user.name = '';
                    user.company = '';
                    sp.staff.data.employees = {};
                    $('.applicationContainer').fadeOut(500,function(){
                        $('body').addClass('login');
                        $('html').css('height','100%');
                        $('.loginContainer').fadeIn(500);
                    });
                } else if(response.status == 1){
                    if(typeof callback == 'function'){
                        if (response.data == false || response.data == null){
                            response.data = [];
                        }
                        callback.call(this,response);
                    }
                } else {
                    if(typeof errorCallback == 'function'){
                        errorCallback.call(this,response);
                    }
                }
            }

        });
    },
    loadPage: function(page){
        //Load the page from the module, handle this a little better
        if(user.loggedIn){
            if(typeof this[page] != 'undefined'){
                $('#pages #' + page + ' > div').hide();
                $('#pages #' + page).show();
                $('.subNavigation > div').hide();
                $('.subNavigation > div.' + page).show();
                $('.subNavigation > div.' + page + ' li:first a').trigger(clickEvent);
                this[page].loadPage();
            } else {
                //console.log(page+ ' page does not exist.');
            }
        }
    },
    nl2br: function(str){
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br />$2');
    },
    map: function(data){
        if (data == null){
            return {};
        }
        var obj = {};
        $.each(data,function(){
            obj[''+this.id] = this;
        });
        return obj;
    },
    hash: function(newHash){
        if(typeof newHash != 'undefined'){
            window.location.hash = newHash;
        }
        return window.location.hash.substring(1);
    },
    outerHtml: function(obj){
        return $('<div>').append(obj.clone()).remove().html();
    },
    hasPermission: function(needed){
        var perm = sp.staff.admin.info.group;
        if (perm <= needed){
            return true;
        } else {
            return false;
        }
    },
    currentTime: function(){
        var currentTime = new Date();
        return months[currentTime.getMonth()] + ' ' + currentTime.getDate() + ', ' + currentTime.getFullYear() + ' - ' + currentTime.getHours() + ':' + ((currentTime.getMinutes().length == 1) ? '0'+currentTime.getMinutes() : currentTime.getMinutes());
    },
    currentUnixTime : function(){
        var foo = new Date; // Generic JS date object
        var unixtime_ms = foo.getTime(); // Returns milliseconds since the epoch
        var unixtime = parseInt(unixtime_ms / 1000);
        return unixtime;
    },
    date : function(timestamp){
        var d = new Date(timestamp);
        return d.getDate();
    },
    correctTime : function(time){
        if (time < 10){
            return '0' + time;
        } else {
            return time;
        }
    },
    strReplace: function(search, replace, subject, count) {
        var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
        s = [].concat(s);
        if (count) {
            this.window[count] = 0;
        }

        for (i = 0, sl = s.length; i < sl; i++) {
            if (s[i] === '') {
                continue;
            }
            for (j = 0, fl = f.length; j < fl; j++) {
                temp = s[i] + '';
                repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                s[i] = (temp).split(f[j]).join(repl);
                if (count && s[i] !== temp) {
                    this.window[count] += (temp.length - s[i].length) / f[j].length;
                }
            }
        }
        return sa ? s : s[0];
    },
    getAvatar : function(id){
        return (typeof sp.staff.data.employees[id] != 'undefined' && typeof sp.staff.data.employees[id].avatar != 'undefined' && sp.staff.data.employees[id].avatar != '' && typeof sp.staff.data.employees[id].avatar.small != 'undefined') ? sp.staff.data.employees[id].avatar.small : 'images/no-avatar.png';
    },
    isL : function(data){
	if ($.trim(data).length > 0){
	    return true;
	} else {
	    return false;
	}
    },
    isC : function(sel){
	return $(sel).hasClass('check');
    }
}



 var ShiftPlanningModel = function(){
    //do we run initialize
    this.cache = {};
    //current diff
    this.diff = '';
}

ShiftPlanningModel.prototype.addModel = function(model, addClass){
    //we extends add class with base methods and initalize it into model object
    $.extend(addClass.prototype, spModel);
    if (typeof this[model] == 'undefined'){
        this[model] = new addClass;
    }
}

ShiftPlanningModel.prototype.get = function(module, data, success, error){
    var self = this;
//    self.cacheDiff(data);
//    if (self.isSetCache(module)){
//        success(self.getCache(module));
//    } else {
        if (typeof this[module] == 'undefined'){
            sp.api(this.model + '.' + module, 'get', data, function(response) {
                //self.setCache(module, sp.map(response.data));
                if(typeof success == 'function'){
                    success.call(this, response);
                }
            }, function(response){
                //self.clearCache(module);
                sp.showError(response.error);
                if(typeof error == 'function'){
                    error.call(this, error);
                }
            });
        } else {
            this[module](module, 'get', data, function(response){
                //self.setCache(module, sp.map(response.data));
                if(typeof success == 'function'){
                    success.call(this, response);
                }
            }, function(response){
                //self.clearCache(module);
                sp.showError(response.error);
                if(typeof error == 'function'){
                    error.call(this, response);
                }
            });
        }
    //}
}

ShiftPlanningModel.prototype.update = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'update', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'update', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, response);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.create = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'create', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'create', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            //self.clearCache(module);
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, response);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.del = function(module, data, success, error){
    var self = this;
    //    self.cacheDiff(data);
    //    if (self.isSetCache(module)){
    //        success(self.getCache(module));
    //    } else {
    if (typeof this[module] == 'undefined'){
        sp.api(this.model + '.' + module, 'delete', data, function(response) {
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    } else {
        this[module](module, 'delete', data, function(response){
            //self.setCache(module, sp.map(response.data));
            if(typeof success == 'function'){
                success.call(this, response);
            }
        }, function(response){
            sp.showError(response.error);
            if(typeof error == 'function'){
                error.call(this, error);
            }
        });
    }
//}
}

ShiftPlanningModel.prototype.set = function(module){
    
}

ShiftPlanningModel.prototype.setCache = function(field, data){
    if (typeof this.cache[field] == 'unfedined'){
        this.cache[field] = {};
    }
    this.cache[field][this.diff] = data;
}

ShiftPlanningModel.prototype.clearCache = function(field){
    this.cache[field] = {};
}

ShiftPlanningModel.prototype.getCache = function(field){
    return this.cache[field];
}

ShiftPlanningModel.prototype.isSetCache = function(field){
    if (typeof this.cache[field] != 'undefined' && this.cache[field].length > 0){
        return true;
    } else {
        return false;
    }
}

//different data for same modul
ShiftPlanningModel.prototype.cacheDiff = function(diff){
    if (typeof diff != 'undefined'){
        this.diff = JSON.stringify(diff);
    } else {
        if (this.diff.length == 0){
            Log.log('Please set diff');
        } else {
            return this.diff;
        }
    }
    return true;
}




var spModel = new ShiftPlanningModel();


//adding classes
spModel.addModel('schedule', SPModelSchedule);
spModel.addModel('requests', SPModelRequests);
spModel.addModel('admin', SPModelAdmin);
spModel.addModel('messaging', SPModelMessaging);
spModel.addModel('timeclock', SPModelTimeClock);
spModel.addModel('staff', SPModelStaff);
spModel.addModel('payroll', SPModelPayroll);
spModel.addModel('location', SPModelLocation);
 var ShiftPlanningView = function(){
    
}

ShiftPlanningView.prototype.optionSchedules = function(id, m){
    if (typeof m == 'undefined'){
	m = false;
    }
    var opt;
    var self = this;
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    if (!m){
	opt = '<option disabled="disabled" selected="selected" value="0">Select Schedule</option>';
    } else {
	opt = '<option disabled="disabled" selected="selected" value="0">Select Schedule</option>';
    }
    $.each(data, function(i, item){
        if (self.checkPerm(item)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
    });
    
    return opt;
}

ShiftPlanningView.prototype.staffOption = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option disabled="disabled" selected="selected" value="0">Select Employee</option>';
	var l;
	if (sp.staff.admin.info.group == 4){
	    l = sp.staff.fixed.employees;
	} else {
	    l = spModel.staff.allStaff();
	}
        $.each(l, function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.staffFilter = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt = '';
    if (notAdmin == false){
	if (sp.staff.admin.info.group <= 3){
	    opt = '<option value="0">All Employees</option>';
	}
	var l;
	
	if (sp.staff.admin.info.group == 4){
	    l = sp.staff.fixed.employees;
	} else {
	    l = spModel.staff.allStaff();
	}
        $.each(l, function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.scheduleFilter = function(id, deep){
    if (typeof deep == 'undefined'){
	deep = false;
    }
    var self = this;
    var opt = '';
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    if (sp.staff.admin.info.group <= 3){
	opt = '<option value="0">All Positions</option>';
    }
    
    $.each(data, function(i, item){
        if (self.checkPerm(item, deep)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
    });
    
    return opt;
}

ShiftPlanningView.prototype.schedulerFilter = function(id, deep){
    if (typeof deep == 'undefined'){
	deep = false;
    }
    var self = this;
    var data;
    if (typeof id == 'undefined' || id == 0){
        data = spModel.schedule.allSchedules();
    } else {
        data = spModel.schedule.schedulesByUser(id);
    }
    var opt = '';
    $.each(data, function(i, item){
        if (self.checkPerm(item, deep)){
            opt += '<option value="' + i + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        }
    });
    
    return opt;
}

ShiftPlanningView.prototype.skillsFilter = function(notAdmin){
    if (typeof notAdmin == 'undefined'){
        notAdmin = false;
    }
    var opt;
    if (notAdmin == false){
        opt = '<option value="0">All Skills</option>';
        $.each(spModel.staff.allSkills(), function(i, item){
            opt += '<option value="' + item.id + '">' + ((typeof item == 'object') ? item.name : item) + '</option>';
        });
    } else {
        opt = '<option value="' + sp.staff.admin.info.id + '">' + sp.staff.admin.info.name + '</option>';
    }
    return opt;
}

ShiftPlanningView.prototype.locationSelector = function(type){
    if (typeof type == 'undefined'){
        type = 2;
    }
    var opt = '<option value="0" selected="selected">' + ((type == 1) ? 'Select Location' : 'Select Work Slot') + '</option>';
    opt += '<optgroup lable="locations">';
    $.each(spModel.location.locationsList(), function(i, item){
        if (item.type == type){
            opt += '<option value="' + item.id + '">' + item.name + '</option>';
        }
    });
    opt += '</optgroup><optgroup><option value="add" type="' + type + '">' + ((type == 1) ? 'New Location?' : 'New Work Slot?') + '</option></optgroup>';
    return opt;
}

ShiftPlanningView.prototype.timeRanges = function(){
    var times = spRanges.createSelector('times');
    var res = '<option value="-1">Select</option>';
    $.each(times, function(i, item){
        res += '<option value="' + i + '" >' + item + '</option>'; 
    });
    
    return res;
}

ShiftPlanningView.prototype.editableSchedules = function(employee){
    var l = '';
    var i = 2;
    $.each(spModel.schedule.allSchedules(), function(i2, item){
        var c = (typeof employee.schedules != 'undefined' && typeof employee.schedules[item.id] != 'undefined') ? 'check"' : '';
        l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
        l += '  <div>';
        l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
        l += '  </div>';
        l += '</li>';
        i++;
    });
    
    return (l.length > 0) ? l : this.emptyResult('No positions to display', 'li', 'noBorder');
}

ShiftPlanningView.prototype.editableSkills = function(employee){
    var l = '';
    var i = 2;
    $.each(spModel.staff.allSkills(), function(i2, item){
        var c = (typeof employee.skills != 'undefined' && typeof employee.skills[item.id] != 'undefined') ? 'check' : '';
        l += '<li class="' + ((i % 2 == 0) ? 'even' : 'odd') + '">';
        l += '  <div>';
        l += '      <span class="checkbox ' + c + '" itemId=' + item.id + '>' + item.name + '</span>';
        l += '  </div>';
        l += '</li>';
        i++;
    });
    
    return (l.length > 0) ? l : this.emptyResult('No skills to display', 'li', 'noBorder');
}

ShiftPlanningView.prototype.ulLoader = function(){
    return '<li class="loading"></li>';
}

ShiftPlanningView.prototype.divLoader = function(){
    return '<div class="loading"></div>';
}

ShiftPlanningView.prototype.emptyResult = function(text, tag, cl){
    if (typeof cl == 'undefined'){
	cl = '';
    }
    if (typeof tag == 'undefined'){
        tag = 'div'
    }
    if (typeof text == 'undefined'){
        text = 'Na data for selected criteria!';
    }
    return '<' + tag + ' class="additional ' + cl + '"><p>' + text + '</p></' + tag + '>'
}

ShiftPlanningView.prototype.checkPerm = function(item, deep){
    if (typeof deep == 'undefined'){
	deep = false;
    }
    var c = 1;
    if (deep){
	c = 2;
    }
    var perm = true;
    if (typeof item.perms != 'undefined'){
        if (item.perms >= c){
            perm = true;
        } else {
            perm = false;
        }
    }
    return perm;
}

ShiftPlanningView.prototype.fixCurrency = function(cId, r){
    if (typeof r == 'undefined'){
	r = false;
    }
    var c = spRanges.currencies[cId];
    
    if (!r){
	$('span.currency').html(c);
    } else {
	return c;
    }
    
}

var spView = new ShiftPlanningView();
 var ShiftPlanningRanges = function(){
    this.times = {
	0 : {
	    title : 'Today',
	    start_time : Date.parse('today').getTime(),
	    end_time : Date.parse('today').add(1).days().getTime()
	},
	1 : {
	    title : 'Yesterday',
	    start_time : Date.parse('yesterday').getTime(),
	    end_time : Date.parse('yesterday').add(1).days().getTime()
	},
	2 : {
	    title : 'Last 7 Days',
	    start_time : strtotime('now -7 day')*1000,
	    end_time : strtotime('now')*1000
	},
	3 : {
	    title : 'This Week',
	    start_time : Date.parse('sunday').getTime(),
	    end_time : Date.parse('next saturday').getTime()
	},
	4 : {
	    title : 'Last Week',
	    start_time : Date.parse('today').moveToDayOfWeek(0).addWeeks(-2).getTime(),
	    end_time : Date.parse('previous saturday').getTime()
	},
	5 : {
	    title : 'This Month',
	    start_time : strtotime('now -'+ (now().getDate() -1) + ' days')*1000,
	    end_time : Date.parse('today').moveToLastDayOfMonth().getTime()
	},
	6 : {
	    title : 'Last Month',
	    start_time : strtotime('now -'+ (now().getDate() +30) + ' days')*1000,
	    end_time : strtotime('now -'+ (now().getDate()) + ' days')*1000
	},
	7 : {
	    title : 'One Year',
	    start_time : strtotime('last year')*1000,
	    end_time : strtotime('now')*1000
	}
    };
    this.currencies = ['',
    '$', '&#163;', '&#8364;', '&#8360;', '&#165;', '&#8361;', 'R', 'kr', '&#8369;', 'RM'
    ]
}

ShiftPlanningRanges.prototype.fixRanges = function(){
    var self = this;
    var czm = Date.parse('now').getTimezoneOffset() * 60 * 1000;
    var tz = sp.staff.admin.settings.timezone;
    var tzf = tz.split(',');
    tzf = tzf[0].split(':');
    var h = parseInt(tzf[0]) * 60*60;
    var mp = (parseInt(tzf[0]) * 60*60)/Math.abs(parseInt(tzf[0]) * 60*60);
    var min = (tzf[1] * 60);
    $.each(this.times, function(i, item){
	self.times[i].start_date = item.start_date + czm + (mp * (Math.abs(h) + min)) * 1000;
	self.times[i].end_date = item.end_date + czm + (mp * (Math.abs(h) + min)) * 1000;
    });
    self.times[3] = {
	title : 'This Week',
	start_time : Date.parse('sunday').add(sp.staff.admin.settings.startday - 1).days().getTime(),
	end_time : Date.parse('next saturday').add(sp.staff.admin.settings.startday - 1).days().getTime()
    }
    self.times[4] = {
	title : 'Last Week',
	start_time : Date.parse('today').moveToDayOfWeek(0).addWeeks(-2).add(sp.staff.admin.settings.startday - 1).days().getTime(),
	end_time : Date.parse('previous saturday').add(sp.staff.admin.settings.startday - 1).days().getTime()
    }
}




ShiftPlanningRanges.prototype.getRange = function(range, id){
    return this[range][id];
}

ShiftPlanningRanges.prototype.createSelector = function(range){
    var res = [];
    $.each(this[range], function(i, item){
	res.push(item.title);
    });
    
    return res;
}

var spRanges = new ShiftPlanningRanges();
 function ShiftPlanningStaff(){
    this.changed = true;
    this.page = 6;
    this.initialize();
    return true;
}

ShiftPlanningStaff.prototype = {
    data: {},
    raw: {},
    fixed : {},
    admin: {},
    initialize: function(){
        
    },
    login: function(username, password){

    },
    loadPage : function(){
        
    }
    
}




 function ShiftPlanningSchedule(){
    this.initialize();
    this.fix = 86000;
    this.raw = {};
    this.data = {};
    this.prepared = {};
    this.shifts = {};
    this.shift = {};
    this.loaded = false;
    this.edit = false;
    this.fromDashboard = false;
    this.settings = {
        mode : 'employee',
        start_date : 'yesterday',
        end_date : 'yesterday'
    };
    this.page = 'today';
    this.conflicts = {};
    return true;
}

ShiftPlanningSchedule.prototype = {
    initialize: function(){
        
    },
    loadPage : function(){
        
    },
    setConflicts : function(conf){
	var self = this;
	$.each(conf, function(i, item){
	    self.conflicts[item.shift + ''] = item;
	});
    }
    
}




 function ShiftPlanningDashboard(){
    this.initialize();
}

ShiftPlanningDashboard.prototype = {
    templates: {},
    initialize: function(){
        
    },
    loadPage: function(){

    }
    
}




 function ShiftPlanningTimeClock(){
    this.initialize();
    this.timeSheetsData = {};
    this.actco = false;
    this.current = {};
    this.edit = false;
    return true;
}

ShiftPlanningTimeClock.prototype = {
    times : {
        0 : {
            start_time : strtotime('now'),
            end_time : strtotime('now +1 day')
        },
        1 : {
            start_time : strtotime('now -2 day'),
            end_time : strtotime('now')
        },
        2 : {
            start_time : strtotime('now -7 day'),
            end_time : strtotime('now +1 day')
        },
        3 : {
            start_time : Date.parse('monday').getTime()/1000,
            end_time : Date.parse('next sunday').getTime()/1000
        },
        4 : {
            start_time : ((Date.parse('monday').getTime()/1000) - 604800),
            end_time : Date.parse('sunday').getTime()/1000
        }
    }
}
 var ShiftPlanningReports = function(){
    this.initialize();
    this.locations = '';
    this.positions = '';
    this.employees = '';
    this.skills = '';
    this.page = 'allReports';
    this.timeLine = '';
}

ShiftPlanningReports.prototype = {
    initialize: function(){
        //some event
    },
    loadPage : function(){
    },    
    times : {
        0 : {
            start_time : strtotime('now'),
            end_time : strtotime('now +1 day')
        },
        1 : {
            start_time : strtotime('now -2 day'),
            end_time : strtotime('now')
        },
        2 : {
            start_time : strtotime('now -7 day'),
            end_time : strtotime('now')
        },
        3 : {
            start_time : Date.parse('monday').getTime()/1000,
            end_time : Date.parse('next sunday').getTime()/1000
        },
        4 : {
            start_time : ((Date.parse('monday').getTime()/1000) - 604800),
            end_time : Date.parse('sunday').getTime()/1000
        },
        5 : {
            start_time : strtotime('now -'+ (now().getDate() -1) + ' days'),
            end_time : strtotime('now +1 day')
        },
        6 : {
            start_time : strtotime('now -'+ (now().getDate() +30) + ' days'),
            end_time : strtotime('now -'+ (now().getDate() -1) + ' days')
        },
        7 : {
            start_time : strtotime('last year'),
            end_time : strtotime('now +1 day')
        }
    }
}
 var ShiftPlanningRequests = function(){
    this.initialize();
    this.positions = '';
    this.employees = '';
    this.shifts = [];
    this.shiftsR = [];
    this.vacations = [];
    this.current = {};
    this.trades = {
        'manage': [],
        'requested' : [],
        'avaiting' : []
    };
}

ShiftPlanningRequests.prototype = {
    initialize: function(){
        //some event
    },
    loadPage : function(){
        
    }
}
 function ShiftPlanningLocation(){
    this.initialize();
    return true;
}

ShiftPlanningLocation.prototype = {
    data: {},
    raw: {},
    initialize: function(){
        $(document).ready(function(){
            $('#wrapper').delegate('select.locations', 'change', function(){
                var obj = $(this);
                if ($(this).val() == 'add'){
                    var loc = prompt ("Enter location name.","");
                    if (loc != null){
                        spModel.location.create('location', {name : loc, type : $(this).find('option:last').attr('type')}, function(response){
                            obj.find('optgroup:first').append('<option value="' + response.data.id + '">' + response.data.name + '</option>');
                            obj.val(obj.find('optgroup:first option:last').val());
                            spModel.location.locationsList(true);
                        });
                    }
                }
            });
        });
    }
    
}


 var ShiftPlanningPermissions = function(){
    this.superUser = 1;
    this.manager = 2;
    this.supervisor = 3;
    this.scheduler = 4;
    this.employee = 5;
    this.employees = {};
    this.initialize();
}

ShiftPlanningPermissions.prototype = {
    initialize : function(){
        
    }
}
 ShiftPlanningStaff.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.prepareConfig();
        }
        $('#lo_b').bind(clickEvent, function(){
            self.login(); 
        });
	
	$('#lo_f .checkbox').bind(clickEvent, function(){
	    $(this).toggleClass('check');
	})
        
        self.listEvents();
        self.addStaffEvents();
        self.fastAssignmentEvents();
    });
}


ShiftPlanningStaff.prototype.loadSubPageEvents = function(subpage){
    $('#st_tp_menu').hide();
    this[subpage + 'SubEvents']();
}

ShiftPlanningStaff.prototype.listEvents = function(){
    var self = this;
    $('#st_sn_ga').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $('#st_li_ga').removeClass('small').addClass('big');
    });
    
    $('#st_sn_li').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).parents('ul').find('li').removeClass('active');
        $(this).parent().addClass('active');
        $('#st_li_ga').removeClass('big').addClass('small');
    });
    
    $('#st_li_se_b').bind(clickEvent, function(e){
        e.preventDefault();
        var s = $('#st_li_se_te').val();
        if (s.length == 0 || s == 'Search...'){
            $('#st_li_ga li').show();
            $('#st_li_ga').show();
            $('#st_li .noResults').hide();
        } else {
            $('#st_li_ga li').hide();
            $('#st_li_ga').show();
            $('#st_li .noResults').hide();
            $('#st_li_ga li').find('span:Contains("'+s+'")').parents('li').show();
            if ($('#st_li_ga li').find('span:Contains("'+s+'")').parents('li').length == 0){
                $('#st_li .noResults').show();
                $('#st_li_ga').hide();
            }
        }
    });
    $('#st_li_ga').delegate('li', clickEvent, function(){
        var id = $(this).attr('staffId');
        if (sp.permissions.hasPermission('visible_staff_details')){
            self.displayEmployee(id);
        }
    });
}

ShiftPlanningStaff.prototype.addStaffEvents = function(){
    var self = this;
    $('#st_ae_sa').bind(clickEvent, function(){
        $(this).toggleClass('check');
    });
    
    $('#st_ae_ce_b').bind(clickEvent, function(e){
        e.preventDefault();
        self.createEmployee($(this));
    });
}

ShiftPlanningStaff.prototype.fastAssignmentEvents = function(){
    var self = this;
    $('#st_fa_el').bind('change', function(){
        self.loadFastAssignment($(this).val());
    });
    
    $('#st_fa ul.detailsGrid ul').delegate('.checkbox', clickEvent, function(e){
        var sid = $(this).attr('itemId');
        var skills = ($(this).parents('.skills').length > 0) ? true : false;
        var checked = ($(this).hasClass('check')) ? true : false;
        var obj = this;
	$(obj).parent().addClass('loading');
        var data = {
            id : $('#st_fa_cu').val()
        }
        if (skills){
            if (checked) {
                data.removeskill = sid;
            } else {
                data.addskill = sid;
            }
        } else {
            if (checked) {
                data.removeschedule = sid;
            } else {
                data.addschedule = sid;
            }
        }
        spModel.staff.update('employee', data, function(response){
            if (checked) {
                $(obj).removeClass('check');
            } else {
                $(obj).addClass('check');
            }
	    $(obj).parent().removeClass('loading');
            sp.dashboard.updateUser($('#st_fa_cu').val(), response, false);
        });
    });
}

ShiftPlanningStaff.prototype.listSubEvents = function(){
    $('#st_tp_menu').show();
    $('#st_li_ga').html($.tmpl($('#te_st_list'), spModel.staff.allStaff()));
    $('#st_li_ga li').show();
    $('#st_li_se_te').val('').trigger('blur');
}

ShiftPlanningStaff.prototype.addStaffSubEvents = function(){
    this.resetAddEmployee();
}

ShiftPlanningStaff.prototype.fastAssignmentSubEvents = function(){
    $('#st_fa_el').html(spView.staffOption());
    $('#st_fa_po').hide();
    $('#st_fa_sk').hide();
}

//Functions
ShiftPlanningStaff.prototype.displayEmployee = function(id){
    $('#st_tp_menu').hide();
    $('#pages > div').hide();
    $('#pages #dashboard .main').hide();
    $('#pages #dashboard .mainSub').hide();
    $('#pages #dashboard').show();
    $('#pages #dashboard .main.settings').show();
    $('#pages #dashboard .mainSub.settings').show();
    sp.dashboard.settingsSubEvents(spModel.staff.getEmployeeById(id));
}


//Get all fast assignment info.
ShiftPlanningStaff.prototype.loadFastAssignment = function(id){
    var employee = spModel.staff.getEmployeeById(id);
    $('#st_fa_cu').val(id);
    $('#st_fa_po ul.detailsGrid ul').html(spView.editableSchedules(employee));
    $('#st_fa_sk ul.detailsGrid ul').html(spView.editableSkills(employee));
    
    $('#st_fa_po').show();
    $('#st_fa_sk').show();
}

ShiftPlanningStaff.prototype.createEmployee = function(c){
    $(c).addClass('loading');
    var self = this;
    var data = {};
    data.name = $('#st_ae_i_n').val();
    //if ($.trim($('#st_ae_i_nn').val()).length > 0){
        data.nick_name = $('#st_ae_i_nn').val();
    //}
    //if ($.trim($('#st_ae_i_e').val()).length > 0){
        data.email = $('#st_ae_i_e').val();
    //}
    
    //if ($.trim($('#st_ae_i_eid').val()).length > 0){
        data.eid = $('#st_ae_i_eid').val();
    //}
    
    //if ($.trim($('#st_ae_i_eid').val()).length > 0){
        data.username = $('#st_ae_i_un').val();
    //}
    
    //if ($.trim($('#st_ae_i_hw').val()).length > 0){
        data.wage = $('#st_ae_i_hw').val();
    //}
    
    //if ($.trim($('#st_ae_i_no').val()).length > 0){
        data.notes = $('#st_ae_i_no').val();
    //}
    
    if ($('#st_ae_sa').hasClass('check')){
        data.send_activation = 1;
    }
    
    spModel.staff.create('employee', data, function(response){
        $(c).removeClass('loading');
        spModel.staff.addEmployee(response.data);
        self.displayEmployee(response.data.id);
        sp.showSuccess('Employee successfully created!');
    }, function(){
        $(c).removeClass('loading');
    });
}


ShiftPlanningStaff.prototype.resetAddEmployee = function(){
    $('#st_ae_i_n').val('');
    $('#st_ae_i_nn').val('');
    $('#st_ae_i_e').val('');
    $('#st_ae_i_eid').val('');
    $('#st_ae_i_un').val('');
    $('#st_ae_i_hw').val('');
    $('#st_ae_i_no').val('');
    $('#st_ae_sa').removeClass('check');
}

//Rest
ShiftPlanningStaff.prototype.login = function(){
    var u = $('#lo_u').val();
    var p = $('#lo_p').val();
    var self = this;
    sp.api('staff.login', 'GET', {
        username: u, 
        password: p
    }, function(loginResponse){
        sp.staff.admin.info = loginResponse.data.employee;
        var calls = [
        ['staff.employees','GET', {}],
        ['schedule.schedules','GET', {
            'perms':1
        }],
        ['admin.settings', 'GET', {}],
        ['staff.skills', 'GET', {}],
        ['location.locations', 'GET', {}]
        ]
        sp.multiApi(calls, function(response){
            sp.api('api.config', 'GET', {}, function(config){
                //was hitting the 5 request limit for multi api so we needed to send a separate call
                $('.loginContainer').fadeOut(500, function(){
                    user.loggedIn = 1;
                    user.name = loginResponse.data.employee.name;
                    user.company = loginResponse.data.business.name;
                    user.phone = loginResponse.data.business.phone;
                    sp.staff.raw.employees = response[0].data;
                    sp.staff.data.employees = sp.map(response[0].data);
                    sp.schedule.raw.schedules = response[1].data;
                    sp.schedule.data.schedules = sp.map(response[1].data);
                    sp.staff.admin.settings = response[2].data;
                    sp.staff.raw.skills = response[3].data;
                    sp.staff.data.skills = sp.map(response[3].data);
                    sp.staff.raw.locations = response[4].data;
                    sp.staff.data.locations = sp.map(response[4].data);
                    sp.staff.admin.info.dfAvatar = sp.getAvatar(sp.staff.admin.info.id);
                    sp.raw.config = config.data;
                    sp.schedule.dateId = sp.raw.config.today.id;
                    $('body').removeClass('login');
                    $('.notification').remove();
                    $('html').css('height','auto');
                    $('.applicationContainer').fadeIn(500);
                    sp.hash('dashboard');
                    self.prepareConfig();
                    $('.userName').html(user.name);
                    sp.permissions.preparePermissions();
		    spRanges.fixRanges();
		    sp.staff.fixed.employees = sp.permissions.fixStaffListing();
		    sp.raw.config.today.formatted = Date.parse(sp.raw.config.today.formatted).toString(cal.dformat);
		    if ($('#lo_f .checkbox').hasClass('check')){
			setCookie('shiftplanning_mobile_rememberme', 1, cookieExpire);
			setCookie('shiftplanning_mobile_usertoken', loginResponse.token, cookieExpire);
			setCookie('shiftplanning_mobile_userid', loginResponse.data.employee.id, cookieExpire);
			setCookie('shiftplanning_mobile_username', user.name, cookieExpire);
			setCookie('shiftplanning_mobile_usercompany', user.company, cookieExpire);
			setCookie('shiftplanning_mobile_userphone', user.phone, cookieExpire);
		    }
                });
            });
        });

    }, function(response){
        $('.login .error').html(response.error);
        $('.login .error').slideDown(500);
        $('.login input:first').focus();
        
    });
}


ShiftPlanningStaff.prototype.logout = function(){
    var c = confirm('Are you sure you want to logout?');
    if (!c){
        return false;
    }
    sp.api('staff.logout', 'GET', {}, function(response){
	setCookie('shiftplanning_mobile_rememberme', 0, cookieExpire);
        window.location.reload();
    }, function(response){
        sp.showError(response.error);
    });
}


ShiftPlanningStaff.prototype.prepareConfig = function(){
    var currency = {
        1: '$',
        2: '&#163;',
        3: '&#8364;',
        4: '&#8360;',
        5: '&#165;',
        6: '&#8361;',
        7: 'R',
        8: 'kr',
        9: '&#8369;',
        10: 'RM'
    }
    var tmpDate = new Date();
    var def = {
        month: tmpDate.getMonth(), 
        year: tmpDate.getFullYear(), 
        day: tmpDate.getDate()
    };
    cal = {
        startday: sp.staff.admin.settings.startday,
        currency: currency[sp.staff.admin.settings.currency],
        tmode: (sp.staff.admin.settings['24hr'] == "1"? 24 : 12),
        tstring: (parseInt(sp.staff.admin.settings['24hr']) == 1) ? 'HH:mm' : 'h:mm tt',
        dformat: sp.strReplace(['M','d', 'm', 'Y', 'j'], ['MMM', 'dd', 'MM', 'yyyy', 'd'], sp.staff.admin.settings.date),
        dpformat: sp.strReplace(['d', 'm', 'Y', 'M', 'j'], ['dd', 'mm', 'yy', 'M', 'd'], sp.staff.admin.settings.date),
        user: sp.staff.admin.info.id,
        view: 'week',
        mode: 'overview',
        schedule: '',
        lastlength: 8,
        focus: 'employee',
        today: tmpDate.getMonth()+'/'+tmpDate.getDate()+'/'+tmpDate.getFullYear(),
        month: def.month,
        year: def.year,
        day: def.day,
        firstday: '',
        lastday: '' ,
        cache: {},
        lastcall: '',
        firsttime: 0,
        height: 960,
        timeline: {},
        shifts: {},
        schedules: {},
        locations: {},
        skills: {},
        employees: {},
        total: {},
        conflicts: {},
        locked: 0
    };    
}
 ShiftPlanningDashboard.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.wallEvents();
        self.inboxEvents();
        self.settingsEvents();
        self.upcomingShiftsEvents();
        self.whosonnowEvents();
    });
}

ShiftPlanningDashboard.prototype.loadSubPageEvents = function(subpage){
    switch(subpage){
        case 'wall':
            this.wallSubEvents();
            break;
        case 'upcomingShifts':
            this.upcomingShiftsSubEvents();
            break;
        case 'inbox':
            this.inboxSubEvents();
            break;
        case 'settings':
            this.settingsSubEvents();
            break;
        case 'whosonnow':
            this.whosonnowSubEvents();
            break;
        case 'logout':
            sp.staff.logout();
            break;
        case 'pingUser':
            this.pingUser();
            break;
    }
}

ShiftPlanningDashboard.prototype.wallEvents = function(){
    var self = this;
    $('#da_wa_nm_b').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_wa_nm_f').toggleClass('hidden');
        $('#da_wa_nm_ti').val('');
        $('#da_wa_nm_me').val('');
    });
    
    $('#da_wa_nm_st').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).toggleClass('check');
    });
    
    $('#da_wa_nm_ca').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_wa_nm_b').trigger(clickEvent);
    });
    
    $('#da_wa_nm_sa').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var data = {};
        if (sp.isL($('#da_wa_nm_ti').val())){
            data.title = $.trim($('#da_wa_nm_ti').val());
        } else {
            data.title = '';
        }
	
        if (!sp.isL($('#da_wa_nm_me').val())){
            sp.showError('Message must be entered');
            return false;
        }
        data.post = $.trim($('#da_wa_nm_me').val());
        spModel.messaging.create('wall', data, function(response){
            obj.removeClass('loading');
            $('#da_wa_nm_f').toggleClass('hidden');
            $('#da_wa_nm_ti').val('');
            $('#da_wa_nm_me').val('');
            self.wallSubEvents();
        }, function(){
            obj.removeClass('loading');
        });
    })
    
    $('#da_wa_li').delegate('.msgRpl, .cmtCount', clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('rel');
        if (!$('#da_wa_msg_' + id).find('.cmts').is(':visible')){
            $('#da_wa_msg_' + id).find('.cmtCount').hide();
            $('#da_wa_msg_' + id).find('.cmts').show();
            if ($(this).hasClass('msgRpl')){
                $('#da_wa_msg_' + id).find('input[type=text]').focus();
            }
        } else {
            if ($(this).hasClass('msgRpl')){
                $('#da_wa_msg_' + id).find('input[type=text]').val($('#da_wa_msg_' + id).find('input[type=text]').attr('origin'));
            }
            $('#da_wa_msg_' + id).find('.cmtCount').show();
            $('#da_wa_msg_' + id).find('.cmts').hide();
        }
    });
    
    $('#da_wa_li').delegate('.msgDel', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var c = confirm('Do you want to delete this message?');
        if (c){
            var id = $(this).attr('rel');
            var del = 'message';
            if ($(this).hasClass('comment')){
                del = 'comment';
            }
            spModel.messaging.del('wall', {
                id : id, 
                'delete' : del
            }, function(response){
                obj.parent().fadeOut('fast', function(){
                    $(this).remove();
                });
            });
        }
    });

    $('#da_wa_li').delegate('input[type=text]', 'focus', function(){
        $(this).attr('origin',$(this).val());
        $(this).val('');
    });
    
    $('#da_wa_li').delegate('input[type=submit]', clickEvent, function(){
        var obj = $(this);
        var id = $(this).attr('rel');
        var post = $.trim($('#da_wa_msg_' + id + ' input[type=text]').val());
        if (post.length == 0 || post == 'Write a comment...'){
            alert('Please write your message');
            return false;
        }
        spModel.messaging.create('wall', {
            post: post, 
            id: id
        }, function(response) {
            var d = {
                avatar : sp.staff.admin.info.dfAvatar,
                id : id,
                userName : sp.staff.admin.info.name,
                comment: post,
                time : 'Now',
                full : false
            }
            obj.parent().before($.tmpl($('#te_da_wa_me_co'), d));
            $('#da_wa_msg_' + id + ' input[type=text]').val('Write a comment...');
        });
        
        return true;
    });
}

ShiftPlanningDashboard.prototype.upcomingShiftsEvents = function(){
    $('#da_up_li').delegate('li a', clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('rel'), 
            detailed : 1
        }, function(response){
            sp.schedule.fromDashboard = true;
            sp.schedule.shift = response.data;
            sp.loadSubPage('', 'schedule', 'shiftDisplay');
        });
    });
}

ShiftPlanningDashboard.prototype.inboxEvents = function(){
    var self = this;
    $('#da_in_me').delegate('.msgHead', clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('messageId');
        var obj = $(this);
        if (obj.hasClass('extended')){
            obj.parent().toggleClass('extended');
        } else {
            $(obj).addClass('loading');
            spModel.messaging.update('message', {
                id : id, 
                read : 1
            }, function(response){
                obj.parent().toggleClass('extended');
                obj.parent().removeClass('unread');
                $(obj).removeClass('loading');
            });
        }
    });
    
    $('#da_in_nm_b, #da_in_nm_ca').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_in_nm_f').toggleClass('hidden');
        $('#da_in_nm_ti').val('');
        $('#da_in_nm_me').val('');
        $('#da_in_nm_to').val(0);
    });
    
    $('#da_in_nm_sa').bind(clickEvent, function(e){
        self.sendMessage();
    });
    
    $('#da_in_me').delegate('a.butRpl', clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('rel');
        $('#da_in_msg_' + id).find('.newMsg').show(function(){
            var obj = $(this);
            obj.find('input[type=text]').val('re: ' + $('#da_in_msg_' + id).find('.msgHead h5').html());
        });
    });
    
    $('#da_in_me').delegate('a.butDel', clickEvent, function(e){
        e.preventDefault();
        var c = confirm('Are you sure you want to delete this messaage?');
        if (!c){
            return false;
        }
        var id = $(this).attr('rel');
        spModel.messaging.del('message', {
            id : id
        }, function(response){
            $('#da_in_msg_' + id).fadeOut('fast', function(){
                $(this).remove();
            });
        });
        
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fr', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this).parents('.newMsg');
        var curr = $(this).find('a');
        curr.addClass('loading');
        var data = {
            subject : obj.find('input[type=text]').val(),
            message : obj.find('textarea').val(),
            to : obj.find('input[type=hidden]').val()
        };
        
        spModel.messaging.create('message', data, function(resonse){
            self.inboxSubEvents();
        }, function(){
            curr.removeClass('loading');
        });
    });
    
    $('#da_in_me').delegate('.msgBody .newMsg .title .fl', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this).parents('.newMsg');
        obj.find('input[type=text]').val('');
        obj.find('textarea').val('');
        obj.hide('fast');
    });
}

ShiftPlanningDashboard.prototype.settingsEvents = function(){
    var self = this;
    $('#dashboard .search.settings.mainSub li a').bind(clickEvent, function(e){
        e.preventDefault();
        $('#da_se > div').hide();
        $('#dashboard .search.settings.mainSub li').removeClass('active');
        switch ($(this).attr('subpage')){
            case 'overview':
                self.prefillOverview(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
                break;
            case 'edit':
                self.prepareEditDetails(sp.staff.data.employees[$('#da_se_cur_us_id').val()]);
                break;
        }
        $('#da_se_' + $(this).attr('subpage')).show();
        $(this).parent().addClass('active');
        sp.fixCheckboxes();
    });
    
    $('#da_se').delegate('.checkbox', clickEvent, function(){
        var sid = $(this).attr('itemId');
        var skills = ($(this).parents('.skills').length > 0) ? true : false;
        var checked = ($(this).hasClass('check')) ? true : false;
        var obj = this;
        $(obj).parent().addClass('loading');
        var data = {
            id : $('#da_se_cur_us_id').val()
        }
        if (skills){
            if (checked) {
                data.removeskill = sid;
            } else {
                data.addskill = sid;
            }
        } else {
            if (checked) {
                data.removeschedule = sid;
            } else {
                data.addschedule = sid;
            }
        }
        spModel.staff.update('employee', data, function(response){
            if (checked) {
                $(obj).removeClass('check');
            } else {
                $(obj).addClass('check');
            }
            $(obj).parent().removeClass('loading');
            self.updateUser($('#da_se_cur_us_id').val(), response, false);
        });
    });
    
    $('#da_se_ed_ue').bind(clickEvent, function(e){
        $(this).addClass('loading');
        e.preventDefault();
        self.saveEditForm($(this));
    });
    
    $('textarea#da_se_ov_no, textarea#da_se_ed_no').bind('blur', function(){
        self.updateNotes($(this).val());
    });
    
    $('#da_se_pa_up').bind(clickEvent, function(e){
        e.preventDefault();
        self.changePassword();
    });
    
    $('#da_se_ov_aa a').bind(clickEvent, function(e){
        e.preventDefault();
        var c = confirm('Are you sure?');
        if (c){
            self.adminActions(this);
        }
    })
}

ShiftPlanningDashboard.prototype.whosonnowEvents = function(){
    var self=this;
    
    $('#da_wo .timeSheet').delegate('a.fr',clickEvent,function(e){
        e.preventDefault();
        self.pingID = $(this).attr('userID')
        var employee=sp.staff.data.employees[self.pingID];
        if(employee.cell_phone.length==0 && employee.email==null || employee.email.length == 0){
            sp.showError("This user haven't set cell phone or email");
        }else{
            sp.loadSubPage('', 'dashboard', 'pingUser');
        }
        
    })
    $('#pingUser .backMenu').bind(clickEvent,function(e){
        e.preventDefault();
        $('#da_who_tmpl div').unbind(clickEvent);
        $('#da_who_send').unbind(clickEvent);
        $('.subNavigation .dashboard li.active a').trigger('click');
    })
}

//sub page events
ShiftPlanningDashboard.prototype.wallSubEvents = function(){
    if (parseInt(sp.staff.admin.settings.message_wall_on) != 0){
        $('#da_wa_li').html(spView.ulLoader());
        spModel.messaging.get('wall', {}, function(response){
            if (response.data.length > 0){
                $('#da_wa_li').html($.tmpl($('#te_da_wa_me'), response.data));
            } else {
                $('#da_wa_li').html(spView.emptyResult('No wall messages', 'li'));
            }
        }, function(){
            $('#da_wa_li').html(spView.emptyResult('Something went wrong', 'li'));
        });
    }
}


ShiftPlanningDashboard.prototype.upcomingShiftsSubEvents = function(){
    $('#da_up_li').html(spView.ulLoader());
    $('#da_up_li').show();
    $('#da_up_li').next().hide();
    var send = {
        start_date: 'today', 
        end_date: 'today +2 months', 
        mode: 'employee'
    };
    send.employees = sp.staff.admin.info.id;
    spModel.schedule.get('shifts', send, function(response){
        var data = [];
        if(typeof response.data != 'undefined' && response.data.length > 0){
            data = response.data;
        }
        if (data.length > 0){
            $('#da_up_li').html($.tmpl($('#te_da_up_li'), data));
            $('#da_up_li').next().hide();
        } else {
            $('#da_up_li').hide()
            $('#da_up_li').next().show();
        }
    });
}

ShiftPlanningDashboard.prototype.inboxSubEvents = function(){
    $('#da_in_me').html(spView.ulLoader());
    spModel.messaging.get('messages', {
        mode : 'to'
    }, function(response){
        if (response.data.length > 0){
            $('#da_in_me').html($.tmpl($('#te_da_wa_in'), response.data));
        } else {
            $('#da_in_me').html(spView.emptyResult('No messages in your inbox', 'li'));
        }
    }, function(response){
        $('#da_in_me').html(spView.emptyResult('Something went wrong', 'li'));
    });
    
    $('#da_in_nm_to').html(spView.staffOption());
}

ShiftPlanningDashboard.prototype.settingsSubEvents = function(employee){
    var self = this;
    
    if (typeof employee == 'undefined'){
        employee = sp.staff.admin.info;
    }
    
    if (employee.id == sp.staff.admin.info.id){
        $('#dashboard .search').show();
        if (!sp.permissions.hasPermission('edit_profile')){
            $('#dashboard .filters a[subpage=edit]').hide();
        } else {
            $('#dashboard .filters a[subpage=edit]').show();
        }
    } else {
        if (sp.staff.admin.info.group > 4){
            $('#dashboard .search').hide();
        } else {
            $('#dashboard .filters a[subpage=edit]').show();
            $('#dashboard .search').show();
        }
    }
    
    if (employee.group == 2){
        $('#da_se_ov_aa .button').hide();
    } else {
        $('#da_se_ov_aa .button').show();
    }
    
    
    
    if (sp.staff.admin.info.group > 3){
	$('#da_se_ov_wa').parent().hide();
    } else {
	$('#da_se_ov_wa').parent().show();
    }

    
    
    //prefill
    self.prefillOverview(employee);
    self.prepareEditDetails(employee);
    self.preparePasswordField(employee);
    
    $('#dashboard .search.settings.mainSub li a:first').trigger(clickEvent);
    
    sp.fixCheckboxes();
}

ShiftPlanningDashboard.prototype.whosonnowSubEvents = function(){
    $('#wrapper > .subNavigation').show();
    this.getWhosOn();        
}

//functions
ShiftPlanningDashboard.prototype.prefillOverview = function(employee){
    var p = {};
    
    $.each(employee, function(i, item){
        if (item == null || item.length == 0){
            item = '&nbsp;';
        }
        p[i] = item;
    })
    
    employee = p;
    //this page needs to be cached after first load and to be reprepared if data are changed - DONE
    $('#da_se_cur_us_id').val(employee.id);
    
    $('#da_se_ov_fn').html(employee.name);
    $('#da_se_ov_id').html(employee.eid);
    $('#da_se_ov_un').html(employee.username);
    $('#da_se_ov_mo').html(employee.cell_phone);
    $('#da_se_ov_ho').html(employee.home_phone);
    $('#da_se_ov_em').html(employee.email);
    if ($.trim(employee.wage).length != 0){
        $('#da_se_ov_wa').html(spView.fixCurrency(sp.staff.admin.settings.currency, true) + employee.wage);
    }
    
    var status_name = 'Administrative accounts cannot be de-activated.';
    var status = 'User has actived his/her account.';
    
    if (parseInt(employee.status) == 1 && parseInt(employee.group) > 2){
        status_name = 'User Account is Enabled.';
    } else if (parseInt(employee.status) == 0 && parseInt(employee.group) > 2){
        status_name = 'User Account is Enabled.';
        status = 'User account is not activated.';
    }
    
    if (sp.staff.admin.info.group > 3){
        $('#da_se_ov_aa').hide();
        $('#da_se_ov_aa').prev().hide();
    } else {
        $('#da_se_ov_aa').prev().show();
        $('#da_se_ov_aa').show();
    }
    if (employee.status == 0){
        $('#da_se_ov_aa a[type=activate]').show();
        $('#da_se_ov_aa a[type=manualyActivate]').show();
    } else {
        $('#da_se_ov_aa a[type=activate]').hide();
        $('#da_se_ov_aa a[type=manualyActivate]').hide();
    }
    
    $('#da_se_ov_st').html(status);
    $('#da_se_ov_ac').html(status_name);
    
    //transfer month number into month name
    if (employee.birth_month != 0 && employee.birth_day != 0) {
        $('#da_se_ov_bd').html(months[employee.birth_month-1] + ' ' + employee.birth_day);
    } else {
        $('#da_se_ov_bd').html('&nbsp;');
    }
        
    


    $('#da_se_ov_po').html(spView.editableSchedules(employee));

    $('#da_se_ov_sk').html(spView.editableSkills(employee));
    $('#da_se_ov_no').html((employee.notes.length > 0) ? employee.notes : '');
    $('#da_se_ov_pos').html('');
    if (typeof employee.schedules != 'undefined'){
        var pos = '';
        $.each(employee.schedules, function(i, item){
            pos += item + ', ';
        });
        $('#da_se_ov_pos').html(pos.substr(0,pos.length - 2));
    }
//approvers missing
}

ShiftPlanningDashboard.prototype.prepareEditDetails = function(employee){
    var p = {};
    $.each(employee, function(i, item){
        if (item == null || item.length == 0){
            item = '';
        }
        p[i] = item;
    });
    
    employee = p;
    
    //this page needs to be cached after first load and to be reprepared if data are changed
    $('#da_se_ed_na').val(employee.name);
    $('#da_se_ed_em').val(employee.email);
    $('#da_se_ed_nn').val(employee.nick_name);
    $('#da_se_ed_us').val(employee.username);
    //mobile phone
    var mphone = (employee.cell_phone == null) ? '---'.split('-') : employee.cell_phone.split('-');
    $('#da_se_ed_mph_0').val(mphone[0]);
    $('#da_se_ed_mph_1').val(mphone[1]);
    $('#da_se_ed_mph_2').val(mphone[2]);
    //home phone
    var hphone = (employee.home_phone == null) ? '---'.split('-') : employee.home_phone.split('-');
    $('#da_se_ed_hph_0').val(hphone[0]);
    $('#da_se_ed_hph_1').val(hphone[1]);
    $('#da_se_ed_hph_2').val(hphone[2]);
    
    $('#da_se_ed_ad').val(employee.address);
    $('#da_se_ed_ci').val(employee.city);
    $('#da_se_ed_sp').val(employee.state);
    $('#da_se_ed_pz').val(employee.zip);
    
    $('#da_se_ed_bday_m').val(employee.birth_month);
    $('#da_se_ed_bday_d').val(employee.birth_day);
    $('#da_se_ed_no').val(employee.notes);
    
    
    $('#da_se_ed_po').html(spView.editableSchedules(employee));
    $('#da_se_ed_sk').html(spView.editableSkills(employee));
    $('#da_se_ed_no').html((employee.notes != null && employee.notes.length > 0) ? employee.notes : '');
    
}

ShiftPlanningDashboard.prototype.preparePasswordField = function(){
    $('#da_se_pa_np').val('');
    $('#da_se_pa_cp').val('');
}

ShiftPlanningDashboard.prototype.getWhosOn = function () {
    var data = [];
    $('#da_wo_li').html(spView.ulLoader());
    spModel.schedule.get('shifts', {
        mode:'onnow'
    }, function(response){
        var count=0;
        $.each(response.data, function(key,value){
            if( typeof value.employees != 'undefined' && value.employees != null){
                $.each(value.employees, function(i,item){
                    var d={
                        userID:item.id,
                        avatar:sp.getAvatar(item.id),
                        name:item.name,
                        position:value.schedule_name,
                        start_time:value.start_time.time,
                        end_time:value.end_time.time
                    }
                    count++;
                    data.push(d)                        
                })

            }
        })
        if(count==0){
            $('#da_wo_li').html(spView.emptyResult('No one is scheduled to work right now.','li'))
        }else{
        $('#da_wo_li').html($.tmpl($('#te_da_onnow'),data));
        }
    })    
}
//
ShiftPlanningDashboard.prototype.pingUser = function(data) {
    var self=this;
    var employee=sp.staff.data.employees[self.pingID];
    employee.company=user.company;
    employee.company_phone=user.phone;
    $('#wrapper > .subNavigation').hide();
    $('#da_who_ping').html($.tmpl($('#te_da_ping'),employee));
    
    //binding ping actions
    $('#da_who_tmpl div.title1').bind(clickEvent,function(){
        $('#da_who_txt').val($(this).find('span').html())
    })
    $('#da_who_send').bind(clickEvent,function(e){
        e.preventDefault();
        self.sendPingMessage()
    })          
}

ShiftPlanningDashboard.prototype.sendPingMessage = function(){
    var txt=$('#da_who_txt').val();
    spModel.staff.create('ping',{
        to:this.pingID,
        message:txt
    },function(response){
        sp.showSuccess('Ping sent to user');
        setTimeout(function(){
            $('#pingUser .backMenu').trigger('click')
            },3000)
    })
}

ShiftPlanningDashboard.prototype.sendMessage = function(){
    var self = this;
    var data = {
        subject : $('#da_in_nm_ti').val(),
        message : $('#da_in_nm_me').val(),
        to  : $('#da_in_nm_to').val()
    }
    
    spModel.messaging.create('message', data, function(response){
        $('#da_in_nm_b').trigger(clickEvent);
        self.inboxSubEvents();
    });
}

ShiftPlanningDashboard.prototype.changePassword = function (){
    var self = this;
    var eId = $('#da_se_cur_us_id').val();
    if ($('#da_se_pa_np').val().length > 6 && $('#da_se_pa_np').val() == $('#da_se_pa_cp').val()){
        spModel.staff.update('employee', {
            id : eId, 
            password: $('#da_se_pa_np').val()
        }, function(response){
            self.updateUser(eId, response);
        });
    } else {
        //add other error type
        sp.showError('Password length must be over 6 chars and passwords must match.');
    }
}

ShiftPlanningDashboard.prototype.saveEditForm = function(obj){
    //missing wage
    //missing location, mininum weekly hours, maximum weekly hours, auto approve shift requests
    // mising calendar size
    //privacy settings
    var eId = $('#da_se_cur_us_id').val();
    var self = this;
    var data = {};
   
    data.id = eId;
    data.name = $('#da_se_ed_na').val();
    data.email = $('#da_se_ed_em').val();
    
    if ($('#da_se_ed_nn').val().length > 0){
        data.nick_name = $('#da_se_ed_nn').val();
    }
    
    if ($('#da_se_ed_us').val().length > 3){
        data.username = $('#da_se_ed_us').val();
    }
    
    if ($('#da_se_ed_ad').val().length > 0){
        data.address = $('#da_se_ed_ad').val();
    }
    
    if ($('#da_se_ed_ci').val().length > 0){
        data.city = $('#da_se_ed_ci').val();
    }

    if ($('#da_se_ed_sp').val().length > 0){
        data.state = $('#da_se_ed_sp').val();
    }
    if ($('#da_se_ed_pz').val().length > 0){
        data.zip = $('#da_se_ed_pz').val();
    }
    
    data.birth_day = $('#da_se_ed_bday_d').val();
    data.birth_month = $('#da_se_ed_bday_m').val();
    
    if ($('#da_se_ed_mph_0').val().length > 0 && $('#da_se_ed_mph_1').val().length > 0 && $('#da_se_ed_mph_2').val().length > 0){
        data.cell_phone = $('#da_se_ed_mph_0').val() + '-' + $('#da_se_ed_mph_1').val() + '-' + $('#da_se_ed_mph_2').val();
    }
    
    if ($('#da_se_ed_hph_0').val().length > 0 && $('#da_se_ed_hph_1').val().length > 0 && $('#da_se_ed_hph_2').val().length > 0){
        data.home_phone = $('#da_se_ed_hph_0').val() + '-' + $('#da_se_ed_hph_1').val() + '-' + $('#da_se_ed_hph_2').val();
    }
    
    
    spModel.staff.update('employee', data, function(response){
        obj.removeClass('loading');
        self.updateUser(eId, response);
    }, function(){
        obj.removeClass('loading');
    });
}

ShiftPlanningDashboard.prototype.adminActions = function(obj){
    var eId = $('#da_se_cur_us_id').val();
    var type = $(obj).attr('type');
    var method = 'update';
    var data = {
        id : eId
    }
    if (type == 'deactivate'){
        data.status = -1
    } else if (type == 'delete'){
        method = 'delete'
    } else if (type == 'activate'){
        data.send_activation = 1;
    } else {
        data.status = 1;
    }
    sp.api('staff.employee',method,data,function(response){
        sp.staff.getStaff(function(){
            if (type == 'deactivate'){
                sp.showSuccess('User deactivated!');
                $('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
            } else if (type == 'delete'){
                sp.showSuccess('User deleted!');
                $('.subNavigation .staff .subWrapp a[subpage=list]').trigger(clickEvent);
            } else if (type == 'activate'){
                sp.showSuccess('Activation successfully sent.');
                $(obj).hide();
            } else {
                sp.showSuccess('Employee activated successfully.');
                $('#da_se_ov_aa a[type=activate]').hide();
                $(obj).hide();
                $('#da_se_ov_st').html('User Account is Enabled.');
            }
        });
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningDashboard.prototype.updateUser = function(id, res, over){
    if (typeof over == 'undefined'){
        over = true;
    }
    
    if (id == sp.staff.admin.info.id){
        sp.staff.admin.info = res.data;
    }
    sp.staff.data.employees['' + id] = res.data;
    
    if (over){
        this.settingsSubEvents(sp.staff.data.employees['' + id]);
    }
    
    
    
    sp.showSuccess('Selected user updated.');
}

ShiftPlanningDashboard.prototype.updateNotes = function(text){
    if (sp.hasPermission(4) || parseInt($('#da_se_cur_us_id').val()) == sp.staff.admin.info.id){
        var self = this;
        var eId = $('#da_se_cur_us_id').val();
        spModel.staff.update('employee', {
            id : eId, 
            notes : text
        }, function(response){
            self.updateUser(eId, response);
        });
    }
}

//get all staff and add it to main variables
ShiftPlanningStaff.prototype.getStaff = function(callback){
    sp.api('staff.employees','get',{},function(response){
        sp.staff.raw.employees = response.data;
        sp.staff.data.employees = sp.map(response.data);
        if (typeof callback != 'undefined'){
            callback();
        }
    }, function(response){
        sp.showError(response.error);
    });   
}

ShiftPlanningDashboard.prototype.loadPage = function(){
    
    }




 ShiftPlanningTimeClock.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.addClockTimeEvents();
        self.manageTimeSheetsEvents();
        self.displayTimeSheetsEvents();
    });
}

ShiftPlanningTimeClock.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    if (subpage == 'displayTimeClock'){
        $('.subNavigation').hide();
    }
    this[subpage + 'SubEvents']();
}

ShiftPlanningTimeClock.prototype.overviewEvents = function(){
    var self = this;
    $('#tc_ov_ci').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.timeclock.get('clockin', {}, function(response){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').show();
            $('#tc_ov_co').show();
            $('#tc_ov_ca').attr('rel', response.data.id);
            $('#tc_ov_no').val('');
            $('#tc_ov_ss').val(0);
        });
    });
    
    $('#tc_ov_co').bind(clickEvent, function(e){
        e.preventDefault();
	var data = {}
	if ($('#tc_ov_ss').val() != 0){
	    data.schedule = $('#tc_ov_ss').val();
	}

	if ($('#tc_ov_no').val() != 0){
	    data.notes = $('#tc_ov_no').val();
	}
        spModel.timeclock.get('clockout', data, function(response){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').hide();
            $('#tc_ov_ci').show();
        });
    });
    
    $('#tc_ov_ss').bind('change', function(){
        self.saveClockInChanges();
    });
    
    $('#tc_ov_no').bind('blur', function(){
        self.saveClockInChanges();
    });
    
    $('#tc_ov_sa').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveClockInChanges();
    });
    
    $('#tc_ov_ca').bind(clickEvent, function(e){
        e.preventDefault();
        spModel.timeclock.dtc($(this).attr('rel'), function(){
            $('#tc_ov_cb span.fr a').hide();
            $('#tc_ov_cf').hide();
            $('#tc_ov_ci').show();
        });
    })
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsEvents = function(){
    var self = this;
    $('#tc_mts_adv').bind(clickEvent, function(e){
        e.preventDefault();
        if ($('#tc_mts_hiin').hasClass('hidden')){
            $(this).html('Simple');
        } else {
            $(this).html('Advanced');
        }
        $('#tc_mts_hiin').toggleClass('hidden');
    });
    
    $('#tc_mts_tr').bind('change', function(){
        if ($(this).val() != '-1'){
            self.getTimeSheets();
        }
    });
    
    $('#tc_mts_sh').delegate('li', clickEvent, function(e){
        if (e.target.className != 'tPending'){
            $(this).addClass('loading');
            spModel.timeclock.get('timeclock', {
                id : $(this).attr('timeclockId')
                }, function(response){
                self.current = response.data;
                sp.loadSubPage('', 'timeClock', 'displayTimeClock');
            });
        }
    });
    
    $('#timeClock .displayTimeClock .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .timeClock li.active a').trigger(clickEvent);
    });
    
    $('#tc_mts_hiin select, #tc_mts_au').bind('change', function(){
        self.showHideTimeSheets();
    });
    
    $('#tc_dtc_buttons a').bind(clickEvent, function(e){
        e.preventDefault();
        var id = $(this).attr('rel');
        switch ($(this).attr('class')){
            case 'approve':
                spModel.timeclock.update('timeclock', {
                    id : id, 
                    approved : 1
                }, function(){
                    sp.showSuccess('Timeclock updated');
                    $('.subNavigation .timeClock li.active a').trigger(clickEvent);
                });
                break;
            case 'unapprove':
                spModel.timeclock.update('timeclock', {
                    id : id, 
                    approved : 0
                }, function(){
                    sp.showSuccess('Timeclock updated');
                    $('.subNavigation .timeClock li.active a').trigger(clickEvent);
                });
                break;
            case 'edit':
                self.edit = true;
                sp.loadSubPage('', 'timeClock', 'addClockTime');
                break;
            case 'delete':
                var c = confirm('Are you sure?');
                if (c){
                    spModel.timeclock.del('timeclock', {
                        id : id
                    }, function(){
                        $('.subNavigation .timeClock li.active a').trigger(clickEvent);
                    });
                }
                break;
        }
    });
    
    $('#tc_mts_sh').delegate('li span.tPending', clickEvent, function(e){
        $(this).parent('li').addClass('loading');
        spModel.timeclock.get('clockout', {
            employee : $(this).attr('user')
            }, function(){
            sp.showSuccess('User clocked out');
            self.getTimeSheets();
        });
    });
}

ShiftPlanningTimeClock.prototype.addClockTimeEvents = function(){
    var self = this;
    $('#tc_act_onci').bind(clickEvent, function(){
        $(this).toggleClass('check');
        $('#tc_act .detailsGrid .odd').toggleClass('nonVisible');
    });
    
    $('#tc_act_sa_b').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveClockTime(false);
    });
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsEvents = function(){
    var self=this;
    $('#tc_dts_au').bind('change',function(){
        self.showHideTimeSheetsPro();
    })
    $('#tc_dts_tr').bind('change',function(){
        if($(this).val() != '-1'){
            self.getMyTimeSheets();
        }
    })
}

ShiftPlanningTimeClock.prototype.displayTimeSheetsSubEvents = function (){
    var self=this;
    $('#tc_dts_tr').html(spView.timeRanges());
    $('#tc_dts_tr').val(3);
    this.getMyTimeSheets();
//    spModel.timeclock.get('timeclocks',{},function(response){
//        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
//        
//    })
}

ShiftPlanningTimeClock.prototype.overviewSubEvents = function(){
    $('#tc_ov_cf').hide();
    $('#tc_ov_cb span.fr a').hide();
    $('#tc_ov_ss').html(spView.optionSchedules(sp.staff.admin.info.id));
    
    if (parseInt(sp.staff.admin.settings.tc_terminal_lock) == 0){
	$('#tc_ov_cb').show();
	$('#tc_ov_ad').hide();
	spModel.timeclock.get('status', {
	    details : 1
	}, function(response){
	    $('#tc_ov_cb span.fr a').hide();
	    if (response.data != 'out'){
		$('#tc_ov_cf').show();
		$('#tc_ov_co').show();
		$('#tc_ov_ca').attr('rel', response.data.id);
		if (response.data.schedule != null){
		    $('#tc_ov_ss').val(response.data.schedule.id)
		}
		if (response.data.notes != null){
		    $('#tc_ov_no').val(response.data.notes);
		}
	    } else {
		$('#tc_ov_cf').hide();
		$('#tc_ov_ci').show();
	    }
	});
    } else {
	$('#tc_ov_cb').hide();
	$('#tc_ov_cf').hide();
	$('#tc_ov_ad').show();
    }
    

    
    $('#tc_ov_cb .icoClock time').html(sp.raw.config.today.formatted);
    $('#tc_ov_cb .icoClock span').html(formatted('nowT'));
}

ShiftPlanningTimeClock.prototype.manageTimeSheetsSubEvents = function(){
    var self = this;
    var s = Date.parse('today at 9am');
    var e = Date.parse('today at 5pm');
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#tc_mts_sd_i').scroller('destroy');
    $('#tc_mts_sd_i').val(s.toString(cal.dformat));
    $('#tc_mts_sd_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#tc_mts_tr').val(-1);
            self.getTimeSheets();
        }
    });
    
    $('#tc_mts_ed_i').scroller('destroy');
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));
    $('#tc_mts_ed_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#tc_mts_tr').val(-1);
            self.getTimeSheets();
        }
    });
    
    
    $('#tc_mts_tr').html(spView.timeRanges());
    $('#tc_mts_tr').val(3);
    
    
    $('#tc_mts_scl').html(spView.scheduleFilter(0, true));
    $('#tc_mts_eml').html(spView.staffFilter());
    self.getTimeSheets();
}

ShiftPlanningTimeClock.prototype.addClockTimeSubEvents = function(){
    var emp = {};
    if (this.edit != false){
        emp = this.current;
        $('#tc_act .title h3').html('Edit Clock Time');
        $('#tc_act_tc_id').removeClass('editOn').addClass('editOn');
        $('#tc_act_tc_id').val(emp.id);
	emp.in_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.in_time.time);
	emp.out_time.time = sp.strReplace(['am','pm'],[' AM',' PM'],emp.out_time.time);
	emp.in_time.day = Date.parse(emp.in_time.day).toString(cal.dformat);
	emp.out_time.day = Date.parse(emp.out_time.day).toString(cal.dformat);
    } else {
        $('#tc_act .title h3').html('Add Clock Time');
        $('#tc_act_tc_id').removeClass('editOn');
        emp.in_timestamp = Date.parse('today at 9am').getTime()/1000;
        emp.out_timestamp = Date.parse('today at 5pm').getTime()/1000;
    }
    
    $('#tc_act_sc').html(spView.optionSchedules(sp.staff.admin.info.group > 4 ? sp.staff.admin.info.id : 0));
    $('#tc_act_em').html(spView.staffOption(sp.staff.admin.info.group > 4 ? true : false));
    
    var s = new Date(emp.in_timestamp*1000);
    var e = new Date(emp.out_timestamp*1000);
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#tc_act_tclin').scroller('destroy');
    $('#tc_act_tclin').val((this.edit) ? emp.in_time.time : s.toString(tf));
    $("#tc_act_tclin").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    

    
    //$('#tc_act_c_co_dp_i').val(outD.toString(cal.dformat));
    
    $('#tc_act_tclou').scroller('destroy');
    $('#tc_act_tclou').val((this.edit) ? emp.out_time.time : e.toString(tf));
    $("#tc_act_tclou").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    $('#tc_act_c_cl_dp_i').scroller('destroy');
    $('#tc_act_c_cl_dp_i').val((this.edit) ? emp.in_time.day : s.toString(cal.dformat));
    $('#tc_act_c_cl_dp_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#tc_act_c_co_dp_i').scroller('destroy');
    $('#tc_act_c_co_dp_i').val((this.edit) ? emp.out_time.day : e.toString(cal.dformat));
    $('#tc_act_c_co_dp_i').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    
    $('#tc_act_no').val((this.edit) ? emp.notes : '');
    $('#tc_act_em').val((this.edit) ? emp.employee.id : 0);
    $('#tc_act_sc').val((this.edit) ? (emp.schedule != null) ? emp.schedule.id : 0 : 0);
    
    this.edit = false;
}

ShiftPlanningTimeClock.prototype.displayTimeClockSubEvents = function(){
    this.current.employee.avatar = sp.getAvatar(this.current.employee.id);
    $('#tc_dtc').html($.tmpl($('#te_tc_dtc'), this.current));
    $('#tc_dtc_buttons a').attr('rel', this.current.id);
    
    if (parseInt(this.current.approved_by) != 0){
        $('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('unapprove');
    } else {
        $('#tc_dtc_buttons a#tc_dtc_ap').removeClass('approve').removeClass('unapprove').addClass('approve');
    }
}















// Functions
ShiftPlanningTimeClock.prototype.getTimeSheets = function(){
    $('#tc_mts_sh').html(spView.divLoader());
    var self = this;
    var d = {};
    
    var period = $('#tc_mts_tr').val();
    var times = {};
    if (period != "-1"){
        times = spRanges.getRange('times', period);
    } else {
        times = {
            start_time : Date.parse($('#tc_mts_sd_i').val()).getTime(),
            end_time : Date.parse($('#tc_mts_ed_i').val()).getTime()
        }
    }
    var p = new Date(times.start_time);
    var e = new Date(times.end_time);
    
    $('#tc_mts_sd_i').val(p.toString(cal.dformat));
    $('#tc_mts_ed_i').val(e.toString(cal.dformat));
    
    d.start_date = p.toString(cal.dformat);
    d.end_date = e.toString(cal.dformat);
    
    spModel.timeclock.get('timeclocks', d, function(response){
        self.renderManageTimeSheets(response.data); 
    });
}

ShiftPlanningTimeClock.prototype.getMyTimeSheets = function(){
    var self=this;
    var interval=$('#tc_dts_tr').val();
    var times={}
    var params={}
  
    times=spRanges.getRange('times', interval);
    
    var startT = new Date(times.start_time);
    var endT = new Date(times.end_time);
    
    params.start_date=startT.toString(cal.dformat);
    params.end_date=endT.toString(cal.dformat);
    
    spModel.timeclock.get('timeclocks',params,function(response){
        $('#tc_dts_ul').html($.tmpl($('#te_tc_dts_li'), response.data));
        self.showHideTimeSheetsPro();
    })
}
ShiftPlanningTimeClock.prototype.renderManageTimeSheets = function(data){
    var l = data.length;
    var res = {};
    while (l--){
        var item = data[l];
        var ident = (Date.parse(item.in_time.day).getTime()/1000) + '';
        if (typeof res[ident] == 'undefined'){
            res[ident] = {
                month : item.in_time.day,
                rest : [],
                ident : parseInt(ident)
            }
        }
        var obj = this.rItem(item);
        res[ident].rest.push(obj); 
    }
    
    $.each(res, function(i, item){
        res[i].rest.reverse();
    });
    var r = [];
    var counter = 0;
    $.each(res, function(i, item){
        r[counter] = item;
        counter++;
    });
    r.objSort('ident');
    r.reverse();
    
    
    
    $('#tc_mts_sh').html('');
    $('#tc_mts_sh').html($.tmpl($('#te_tc_mts_li'), r));
    
    this.showHideTimeSheets();
}

ShiftPlanningTimeClock.prototype.rItem = function(item){
    var o = {};
    var status = 2;
    if (parseInt(item.approved_by) > 0){
        status = 1;
    }
    var dl = (item.in_location == item.out_location) ? '0' : '1';
    var sc = (item.schedule != null && typeof item.schedule.id != 'undefined') ? item.schedule.id : item.schedule;
    var scn = (item.schedule != null && typeof item.schedule.name != 'undefined') ? item.schedule.name : '';
    o = {
        id : item.id,
        name : item.employee.name,    
        user : item.employee.id,
        st : item.in_time,
        out : item.out_time,
        dl : dl,
        length : item.length,
        schedule : sc,
        scn : scn,
        status : status,
        approved_by : item.approved_by
    };
    
    return o;
}

ShiftPlanningTimeClock.prototype.showHideTimeSheetsPro = function (){
    var sel=$('#tc_dts_au').val();
    switch(sel){
        case '2':
            $('#tc_dts_ul li').hide();
            $('#tc_dts_ul').find('li.app_0').show();
            break;
        case '1':
            $('#tc_dts_ul li').show();
            $('#tc_dts_ul').find('li.app_0').hide();
            break;
        case '0':
            $('#tc_dts_ul li').show();
            break;
    }    
}

ShiftPlanningTimeClock.prototype.showHideTimeSheets = function(){
    //$('#tc_mts_slist tr').removeClass('odd');
    var s = parseInt($('#tc_mts_au').val());
    var e = parseInt($('#tc_mts_eml').val());
    var sc = parseInt($('#tc_mts_scl').val());
    var search = '';
    if (s != 0){
        search += '.s_' + s;
    }
    
    if (e != 0){
        search += '.e_' + e;
    }
    
    if (sc != 0){
        search += '.sc_' + sc;
    }
    
    $('#tc_mts_sh').find('li').hide();
    $('#tc_mts_sh').find('li'+search).show();
    
    $('#tc_mts_sh div.title').hide();
    $('#tc_mts_sh ul li:visible').parents('.timeSheet').prev().show();
    
    if ($('#tc_mts_sh ul li:visible').length > 0){
	$('#tc_mts_sh').next().hide();
    } else {
	$('#tc_mts_sh').next().show();
    }
    
//    $('#tc_mts_slist tr').each(function(i, item){
//        if (i % 2 == 0){
//            $(this).addClass('odd');
//        }
//    })
}

ShiftPlanningTimeClock.prototype.saveClockInChanges = function(){
    var data = {
        id : $('#tc_ov_ca').attr('rel')
    }
    
    if ($('#tc_ov_ss').val() != 0){
        data.schedule = $('#tc_ov_ss').val();
    }
    
    if ($('#tc_ov_no').val() != 0){
        data.notes = $('#tc_ov_no').val();
    }
    
    spModel.timeclock.update('timeclock', data, function(){
        sp.showSuccess('Timeclock updated');
    });
}

ShiftPlanningTimeClock.prototype.saveClockTime = function(){
    var data = {};
    var f = 'create';
    if ($('#tc_act_tc_id').hasClass('editOn') == true){
        f = 'update';
        data.id = $('#tc_act_tc_id').val();
    }
    
    data.schedule = $('#tc_act_sc').val();
    data.employee = $('#tc_act_em').val();
    
    data.start_time = $('#tc_act_tclin').val();
    data.start_date = $('#tc_act_c_cl_dp_i').val();
    
    if (!$('#tc_act .detailsGrid .odd').hasClass('nonVisible')){
        data.end_time = $('#tc_act_tclou').val();
        data.end_date = $('#tc_act_c_co_dp_i').val();
    }
    
    data.notes = $('#tc_act_no').val();
    
    spModel.timeclock[f]('timeclock', data, function(response){
	sp.showSuccess('Clock Time added');
        $('.subNavigation div.timeClock ul.timeClock a[subpage=manageTimeSheets]').trigger(clickEvent);
    });
}


ShiftPlanningTimeClock.prototype.loadPage = function(){
    
    }
 ShiftPlanningReports.prototype.initialize = function(){
    var self = this;
    this.reports = [];
    $(document).ready(function(){
        self.allReportsEvents();
    });
}

ShiftPlanningReports.prototype.allReportsEvents = function(){
    var self = this;
    $('#reports .advancedButton').bind(clickEvent, function(e){
        e.preventDefault();
        if ($(this).hasClass('advancedOpened')){
            $(this).removeClass('advancedOpened');
            $(this).html('Advanced');
            $(this).parents('.main').find('li.advancedMenu').toggleClass('hidden');
        } else {
            $(this).addClass('advancedOpened');
            $(this).html('Simple');
            $(this).parents('.main').find('li.advancedMenu').toggleClass('hidden');
        }
    });
    
    $('#reports .timeSelector').bind('change', function(ep){
        var val = $(this).val();
        if (val != '-1' && val != '99'){
            var times = spRanges.getRange('times', val);
            var s = new Date(times.start_time);
            var e = new Date(times.end_time);
            $('#reports .' + self.page +' .timeFromSelector').val(s.toString(cal.dformat));
            $('#reports .' + self.page +' .timeToSelector').val(e.toString(cal.dformat));
            self.displayReports();
        }
    });
    
    $('#reports .checkbox').bind(clickEvent, function(){
        $(this).toggleClass('check');
        self.displayReports();
    });
    
    $('#reports .employeeSelector, #reports .advancedMenu select').bind('change', function(){
        self.displayReports();
    });
    
    $('#reports .listReports').delegate('a.fr', clickEvent, function(e){
        e.preventDefault();
        self.cId = $(this).attr('rel');
        sp.loadSubPage('', 'reports', 'singleViewDisplay');
    });
    
    $('#re_si_inf').bind(clickEvent, function(e){
        e.preventDefault();
        $('#wrapper > .subNavigation').show();
        $('#wrapper > .subNavigation .reports li.active a').trigger(clickEvent);
    });
}

ShiftPlanningReports.prototype.allReportsSubEvents = function(){
    var self = this;
    spView.fixCurrency(sp.staff.admin.settings.currency);
    $('#reports .timeSelector').html(spView.timeRanges());
    $('#reports .timeSelector').val(3);
    $('#reports .employeeSelector').html(spView.staffFilter());
    $('#reports .positionsSelector').html(spView.scheduleFilter());
    $('#reports .skillsSelector').html(spView.skillsFilter());
    var times = spRanges.getRange('times', $('#reports .timeSelector:visible').val());
    var s = new Date(times.start_time);
    var e = new Date(times.end_time);
    $('#reports .timeFromSelector').scroller('destroy');
    $('#reports .timeFromSelector').val(s.toString(cal.dformat));
    $('#reports .timeFromSelector').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#reports .' + self.page +' .timeSelector').val(-1);
            self.displayReports();
        }
    });
    
    $('#reports .timeToSelector').scroller('destroy');
    $('#reports .timeToSelector').val(e.toString(cal.dformat));
    $('#reports .timeToSelector').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat),
        onSelect : function(){
            $('#reports .' + self.page +' .timeSelector').val(-1);
            self.displayReports();
        }
    });
}

ShiftPlanningReports.prototype.displayReports = function(){
    if (this.page == 'singleViewDisplay'){
        return false;
    }
    
    var self = this;
    var page = this.page;
    var origin = this.page;
    
    $('#reports .' + origin + ' .totals').show();
    $('#reports .' + origin + ' .noResults').hide();

    var data = {
        type : page.toLowerCase()
    }
    
    if (page == 'confirmedTimeSheets'){
        data.type = 'timesheets'; 
    }
    
    data.start_date = $('#reports .' + origin +' .timeFromSelector').val();
    data.end_date = $('#reports .' + origin +' .timeToSelector').val();
    $('#reports .' + origin +' time.from').html($('#reports .' + origin +' .timeFromSelector').val());
    $('#reports .' + origin +' time.to').html($('#reports .' + origin +' .timeToSelector').val());
    data.schedule = $('#reports .' + origin + ' .positionsSelector').val();
    data.employee = $('#reports .' + origin + ' .employeeSelector').val();
    data.skill = $('#reports .' + origin + ' .skillsSelector').val();
    
    if ($('#reports .' + origin + ' .re_deductBreaks').hasClass('check')){
        data.deduct_breaks = 1;
    } else {
        data.deduct_breaks = 0;
    }
    
    if ($('#reports .' + origin + ' .re_groupResults').hasClass('check')){
        data.group_results = 1;
    } else {
        data.group_results = 0;
    }
    
    if ($('#reports .' + origin + ' .re_showEmpty').hasClass('check')){
        data.show_empty = 1;
    } else {
        data.show_empty = 0;
    }
    spModel.payroll.get('report', data, function(response){
        if (response.data.length == 0){
            $('#reports .' + origin + ' .totals').hide();
            $('#reports .' + origin + ' .notif').show();
        }
        var total = {colspan : 5, regular : 0, special : 0, overtime : 0, total : 0, cost : 0}
        var d = []
        $.each(response.data, function(i, item){
            total.regular = total.regular + Number(item.hours.regular);
            total.special = total.special + Number(item.hours.special);
            total.overtime = total.overtime + Number(item.hours.overtime);
            total.total = total.total + Number(item.hours.total);
            total.cost = total.cost + Number(item.hours.cost);
            d[i] = item;
            d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
            d[i].rId = i;
        });
        self.reports = d;
        $('#reports .' + origin + ' .listReports').html($.tmpl($('#te_re_info'), d));
        $('#reports .' + origin + ' .TSregular > span > span').html(total.regular.toFixed(2));
        $('#reports .' + origin + ' .TSspecial > span > span').html(total.special.toFixed(2));
        $('#reports .' + origin + ' .TSovertime > span > span').html(total.overtime.toFixed(2));
        $('#reports .' + origin + ' .TStotal > span > span').html(total.total.toFixed(2) + ' Hours');
        $('#reports .' + origin + ' .TScost > span > span:not(.currency)').html(total.cost.toFixed(2));
    });
}

ShiftPlanningReports.prototype.singleViewDisplay = function(id){
    $('#wrapper > .subNavigation').hide();
    var item = this.reports[id];
    $('#re_di_item').html($.tmpl($('#te_re_' + this.page + '_' + (($('#reports .' + this.page + ' .re_groupResults').hasClass('check')) ? '1' : '0')), item));
    
    spView.fixCurrency(sp.staff.admin.settings.currency);
}

ShiftPlanningReports.prototype.loadSubPageEvents = function(subpage){
    if (subpage == 'singleViewDisplay'){
        this.singleViewDisplay(this.cId);
    } else {
        var self = this;
        this.page = subpage;
        setTimeout(function(){
            self.displayReports();
        }, 100);
    }
}

ShiftPlanningReports.prototype.loadPage = function(){
    this.allReportsSubEvents();
}

 ShiftPlanningRequests.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.overviewEvents();
        self.vacationEvents();
        self.openShiftsEvents();
        self.shiftTradesEvents();
        self.shiftApprovalsEvents();
    });
}


ShiftPlanningRequests.prototype.loadSubPageEvents = function(subpage){
    $('.subNavigation').show();
    switch (subpage){
        case 'overview':
            this.overviewSubEvents();
            break;
        case 'vacation':
            this.vacationSubEvents();
            break;
        case 'shiftTrades':
            this.shiftTradesSubEvents();
            break;
        case 'shiftApprovals':
            this.shiftApprovalsSubEvents();
            break;
        case 'openShifts':
            this.openShiftsSubEvents();
            break;
        case 'vacationRequestManage':
            $('.subNavigation').hide();
            this.displayVacationRequest();
            break;
        case 'shiftTradeManager':
            $('.subNavigation').hide();
            this.displayShiftTradeManager();
            break;
        case 'shiftTradeManagerAP':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerAP();
            break;    
        case 'shiftTradeManagerIM':
            $('.subNavigation').hide();
            this.displayShiftTradeManagerIM();
            break;
        case 'openShiftsOpen':
            $('.subNavigation').hide();
            this.displayOpenShifts();
            break;
        case 'openShiftsRequest':
            $('.subNavigation').hide();
            this.displayOpenRequests();
            break;
        case 'shiftApprovalsSingle':
            $('.subNavigation').hide();
            this.shiftApprovalsSingle();
            break;
    }
}


//initialize events
ShiftPlanningRequests.prototype.overviewEvents = function(){
    //we open page based on subpage found in a tag
    $('#requests #rq_ov a').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .requests li a[subpage=' + $(this).attr('subpage') + ']').trigger(clickEvent);
    });
    
    $('#requests .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        $('.subNavigation .requests li a[subpage=' + $(this).attr('subpage') + ']').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.vacationEvents = function(){
    var self = this;
    var p = $('#requests #rq_va');
    var t = $('#rq_va table');
    
    $('#rq_va_sr').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.addVacationRequest($(this));
    });
    
    $('#rq_va_fr').scroller();
    $('#rq_va_to').scroller();
    
    
    $('#rq_va_rq').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.vacations[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'vacationRequestManage');
    });
    
    
    $('#rq_va_ma_acp').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.approveVacationRequest($(this));
    });
    
    $('#rq_va_ma_dec').bind(clickEvent, function(e){
        e.preventDefault();
        $(this).addClass('loading');
        self.declineVacationRequest($(this));
    });
    
    $('#rq_va_spd').bind(clickEvent, function(e){
        e.preventDefault();
        $('#rq_va_up .pastDate').toggleClass('hidden');
    });
    
    $('#rq_va').delegate('a.deleteVacation', clickEvent, function(e){
        e.preventDefault();
        self.cancelVacationRequest($(this).attr('rel'));
    });
}

ShiftPlanningRequests.prototype.openShiftsEvents = function(){
    var self = this;
    $('#rq_os_os').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.shifts[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsOpen');
    });
    
    $('#rq_os_spr').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.shiftsR[$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'openShiftsRequest');
    });
    
    $('#rq_os_sub').delegate('#rq_os_rtw.icoReqWor', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.update('shift', {
            id : $(this).attr('rel'), 
            add : sp.staff.admin.info.id
        }, function(response){
            obj.removeClass('loading').removeClass('icoReqWork').addClass('icoReqCan').html('<span>Cancel pending request</span>');
        });
    });
    
    $('#rq_os_sub').delegate('#rq_os_rtw.icoReqCan', clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        spModel.schedule.update('shift', {
            id : $(this).attr('rel'), 
            remove : sp.staff.admin.info.id
        }, function(response){
            obj.removeClass('loading').removeClass('icoReqCan').removeClass('icoReqWork').html('Request Removed');
        });
    });
    
    $('#rq_os_spr_sub a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var data = {
            id : $(this).attr('rel'),
            type : 'openshifts'
        }
        
        if ($(this).hasClass('approve')){
            data.mode = 'approve';
        } else {
            data.mode = 'reject';
        }
        spModel.schedule.update('requests', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=openShifts]').trigger(clickEvent);
        }, function(response){
            obj.removeClass('loading');
        });
    });
}

ShiftPlanningRequests.prototype.shiftTradesEvents = function(){
    var self = this;
    $('#rq_st_mst').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['manage'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManager');
    });
    
    $('#rq_st_ap').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['avaiting'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerAP');
    });
    
    $('#rq_st_im').delegate('a', clickEvent, function(e){
        e.preventDefault();
        self.current = self.trades['requested'][$(this).attr('rel')];
        sp.loadSubPage('', 'requests', 'shiftTradeManagerIM');
    });
    
    $('#rq_st_mst_s').delegate('.traders a', clickEvent, function(e){
        var obj = $(this);
        obj.addClass('loading');
        e.preventDefault();
        var id = $(this).attr('tradeId');
        var uId = $(this).attr('userId');
        var data = {
            trade: id,
            user: uId
        }
        
        if ($(this).hasClass('accept')){
            data.action = 'accept';
        } else {
            data.action = 'reject';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_mts_sub ul a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var id = $(this).attr('rel');
        var data = {
            id : id
        }
        
        if ($(this).hasClass('activate')){
            data.action = 'activate';
        }
        
        if ($(this).hasClass('cancel')){
            data.action = 'cancel';
            var c = confirm('Are you sure you want to cancel this request?');
            if (!c){
                obj.removeClass('loading');
                return false;
            }
        }
        
        if ($(this).hasClass('deactivate')){
            data.action = 'deactivate';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            if (data.action == 'activate'){
                sp.showSuccess('Shift trade accepted, waiting for potentional acceptors to accept.');
            } else if (data.action == 'deactivate'){
                sp.showSuccess('Shift trade rejected.');
            } else {
                sp.showSuccess('Shift trade canceled.');
            }
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_ap_sub ul a').bind(clickEvent, function(e){
        var obj = $(this);
        obj.addClass('loading');
        e.preventDefault();
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('accept')){
            data.action = 'accept';
        } else {
            data.action = 'reject';
        }
        
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            sp.showSuccess('Shift trade pick up ' + data.action + 'ed');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        }, function(response){
            sp.showError(response.error);
        });
    });
    
    $('#rq_st_im_sm a').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        obj.addClass('loading');
        var id = $(this).attr('rel');
        var data = {
            trade : id
        }
        
        if ($(this).hasClass('cancel')){
            var c = confirm('Are you sure you want to cancel this request?');
            if (!c){
                obj.removeClass('loading');
                return false;
            }
            data.action = 'cancel';
        }
        spModel.schedule.update('trade', data, function(response){
            obj.removeClass('loading');
            $('.subNavigation .requests li a[subpage=shiftTrades]').trigger(clickEvent);
        });
    });
}

ShiftPlanningRequests.prototype.shiftApprovalsEvents = function(){
    var self = this;
    $('#rq_sa select').bind('change', function(){
        self.shiftApproveList();
    });
    
    $('#rq_sa_ho').delegate('.checkbox', clickEvent, function(){
        var obj = $(this);
        if (!obj.hasClass('check')){
            var id = obj.attr('shiftId');
            spModel.schedule.update('shiftapprove', {
                id: id
            }, function(response){
                obj.addClass('check');
                self.addShift(id, response.data);
            }, function(response){
                sp.showError(response.error);
            });
        }
    });
    
    $('#rq_sa_ho').delegate('span.names, span.time', clickEvent, function(){
        var main = $(this).parent();
        main.addClass('loading');
        var id = main.find('.checkbox').attr('shiftId');
        var check = main.find('.checkbox').hasClass('check');
        if (check){
            spModel.schedule.get('shiftapprove', {
                id : id
            }, function(response){
                var shift = self.getShift(id);
                if (shift.employees != null){
                    $.each(response.data, function(i, item){
                        $.each(shift.employees, function(i2, item2){
                            if (item2.id == item.employee){
                                shift.employees[i2].shift = item
                            }
                        });
                    });
                }
                self.current = self.fixShiftsApproval(shift);
                sp.loadSubPage('', 'requests', 'shiftApprovalsSingle');
            }, function(response){
                main.removeClass('loading');
                sp.showError(response.data);
            });
        } else {
            spModel.schedule.update('shiftapprove', {
                id : id
            }, function(response){
                main.find('.checkbox').addClass('check');
                self.addShift(id, response.data);
                self.current = self.fixShiftsApproval(response.data);
                sp.loadSubPage('', 'requests', 'shiftApprovalsSingle');
            }, function(response){
                main.removeClass('loading');
                sp.showError(response.data);
            });
        }
    });
    
    $('#rq_sa_s').delegate('.checkbox', clickEvent, function(){
        $(this).toggleClass('check');
    });
    
    $('#rq_sa_sub .icoReqWor').bind(clickEvent, function(e){
        e.preventDefault();
        self.saveShiftApprove();
    })
}

//sub events
ShiftPlanningRequests.prototype.overviewSubEvents = function(){
    spModel.admin.get('nrequests', {}, function(response){
        if (typeof response.data.vacation == 'undefined'){
            response.data.vacation = 0;
        }
        if (typeof response.data.shift_approval == 'undefined'){
            response.data.shift_approval = 0;
        }
        if (typeof response.data.shift_request_waiting == 'undefined'){
            response.data.shift_request_waiting = 0;
        }
        if (typeof response.data.trade_approval == 'undefined'){
            response.data.trade_approval = 0;
        }
        if (typeof response.data.trade_approval == 'undefined'){
            response.data.trade_approval = 0;
        }
        if (typeof response.data.shift_available == 'undefined'){
            response.data.shift_available = 0;
        }
        
        if (response.data.vacation == 0){
            $('#rq_rl_va').parent().hide();
        } else {
            $('#rq_rl_va').parent().show();
        }
        
        if (response.data.shift_approval == 0){
            $('#rq_rl_sp').parent().hide();
        } else {
            $('#rq_rl_sp').parent().show();
        }
        
        if (response.data.shift_request_waiting == 0){
            $('#rq_rl_sr').parent().hide();
        } else {
            $('#rq_rl_sr').parent().show();
        }
        
        if (response.data.trade_approval == 0){
            $('#rq_rl_ast').parent().hide();
        } else {
            $('#rq_rl_ast').parent().show();
        }
        
        if (response.data.shift_available == 0){
            $('#rq_rl_sv').parent().hide();
        } else {
            $('#rq_rl_sv').parent().show();
        }
        
        $('#rq_rl_va').parent().find('info').html(response.data.vacation);
        $('#rq_rl_sp').parent().find('info').html(response.data.shift_approval);
        $('#rq_rl_sr').parent().find('info').html(response.data.shift_request_waiting);
        $('#rq_rl_ast').parent().find('info').html(response.data.trade_approval);
        $('#rq_rl_sv').parent().find('info').html(response.data.shift_available);
	
	if ($('#rq_ov .requests:first li:visible').length == 0){
	    $('#rq_ov_hd').show();
	} else {
	    $('#rq_ov_hd').hide();
	}
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.vacationSubEvents = function(){
    var self = this;
    $('#rq_va_en').html(spView.staffOption((sp.staff.admin.info.group <= 4) ? false : true));
    $('#rq_va_spd').hide()


    $('#rq_va_rq').html(spView.ulLoader());
    $('#rq_va_aa').html(spView.ulLoader());
    $('#rq_va_up').html(spView.ulLoader());

    $('#rq_va_rq').show();
    $('#rq_va_aa').show();
    $('#rq_va_up').show();

    $('#rq_va_rq').next().hide();
    $('#rq_va_aa').next().hide();
    $('#rq_va_up').next().hide();
    
    
    $('#rq_va_ma_acp, #rq_va_ma_dec').removeClass('loading');
    
    
    if (sp.staff.admin.info.group <= 4){
        spModel.schedule.get('vacations', {
            mode: 'manage'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_va_rq').hide();
                $('#rq_va_rq').next().show();
            } else {
                $('#rq_va_rq').show();
                $('#rq_va_rq').next().hide();
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.vacations = d;
                $('#rq_va_rq').html($.tmpl($('#te_rq_va_ma'), d));
            }
        });
    } else {
	$('#rq_va_rq').hide();
	$('#rq_va_rq').next().show();
    }

    spModel.schedule.get('vacations', {
        mode: 'requested'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_va_aa').hide();
            $('#rq_va_aa').next().show();
        } else {
            $('#rq_va_aa').show();
            $('#rq_va_aa').next().hide();
            $('#rq_va_aa').html($.tmpl($('#te_rq_va_aa'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    //    
    //    //getting upcoming confirmed vacations
    spModel.schedule.get('vacations', {start_date : 'last year', end_date : 'next year'}, function(response){
        if (response.data.length == 0){
            $('#rq_va_up').hide();
            $('#rq_va_up').next().show();
        } else {
	    response.data = self.clearVacations(response.data);
            $('#rq_va_up').show();
            $('#rq_va_up').next().hide();
            $('#rq_va_up').html($.tmpl($('#te_rq_va_up'), response.data));
	    if ($('#rq_va_up .pastDate').length > 0){
		$('#rq_va_spd').show();
	    } else {
		$('#rq_va_spd').hide();
	    }
        }
    }, function(response){
        sp.showError(response.error);
    });
//    
//    $('#rq_va_up').addClass('appHidden');
}

ShiftPlanningRequests.prototype.openShiftsSubEvents = function(){
    var self = this;
    
    $('#rq_os_os').html(spView.ulLoader());
    
    $('#rq_os_os').next().hide();
    
    $('#rq_os_spr').prev().show();
    $('#rq_os_spr').html(spView.ulLoader());
    $('#rq_os_spr').next().hide();
    
    
    
    spModel.schedule.get('shifts', {
        mode: 'open', 
        detailed : 1
    }, function(response){
        if (response.data.length == 0){
            $('#rq_os_os').hide();
            $('#rq_os_os').next().show();
        } else {
            $('#rq_os_os').show();
            $('#rq_os_os').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].rId = i;
            });
            self.shifts = d;
            $('#rq_os_os').html($.tmpl($('#te_rq_os_os'), response.data));
        }
    }, function(response){
        sp.showError(response.error);
    });
    
    
    if (sp.staff.admin.info.group < 4){
        spModel.schedule.get('shifts', {
            mode: 'openapproval',
            detailed : 1
        }, function(response){
            if (response.data.length == 0){
                $('#rq_os_spr').hide();
                $('#rq_os_spr').next().show();
            } else {
                $('#rq_os_spr').show();
                $('#rq_os_spr').next().hide();
                response.data = self.prepareOpenShiftsNA(response.data);
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.shiftsR = d;
                $('#rq_os_spr').html($.tmpl($('#te_rq_os_spr'), response.data));
            }
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        $('#rq_os_spr').prev().hide();
        $('#rq_os_spr').hide();
        $('#rq_os_spr').next().hide();
    }
}

ShiftPlanningRequests.prototype.shiftTradesSubEvents = function(){
    var self = this;
    $('#rq_st_mst').html(spView.ulLoader());
    $('#rq_st_ap').html(spView.ulLoader());
    $('#rq_st_im').html(spView.ulLoader());
    
    $('#rq_st_mst').show();
    $('#rq_st_ap').show();
    $('#rq_st_im').show();
    
    $('#rq_st_mst').next().hide();
    $('#rq_st_ap').next().hide();
    $('#rq_st_im').next().hide();
    if (sp.staff.admin.info.group <= 4){
        spModel.schedule.get('trades', {
            mode : 'manage'
        }, function(response){
            if (response.data.length == 0){
                $('#rq_st_mst').hide();
                $('#rq_st_mst').next().show();
            } else {
                $('#rq_st_mst').show();
                $('#rq_st_mst').next().hide();
                var d = [];
                $.each(response.data, function(i, item){
                    d[i] = item;
                    d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                    d[i].rId = i;
                });
                self.trades['manage'] = d;
                $('#rq_st_mst').html($.tmpl($('#te_rq_st_mst'), d));
            }
        }, function(response){
            sp.showError(response.error);
        });
    } else {
        $('#rq_st_mst').hide();
        $('#rq_st_mst').next().show();
    }
    //    
    spModel.schedule.get('trades', {}, function(response){
        if (response.data.length == 0){
            $('#rq_st_ap').hide();
            $('#rq_st_ap').next().show();
        } else {
            $('#rq_st_ap').show();
            $('#rq_st_ap').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                d[i].rId = i;
            });
            self.trades['avaiting'] = d;
            $('#rq_st_ap').html($.tmpl($('#te_rq_st_ap'), d));
        }
    }, function(response){
        sp.showError(response.error);
    });
        
    spModel.schedule.get('trades', {
        mode : 'requested'
    }, function(response){
        if (response.data.length == 0){
            $('#rq_st_im').hide();
            $('#rq_st_im').next().show();
        } else {
            $('#rq_st_im').show();
            $('#rq_st_im').next().hide();
            var d = [];
            $.each(response.data, function(i, item){
                d[i] = item;
                d[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png',
                d[i].rId = i;
            });
            self.trades['requested'] = d;
            $('#rq_st_im').html($.tmpl($('#te_rq_st_ap'), d));
        }
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.clearVacations = function(data){
    var vacations = [];
    $.each(data, function(i, item){
	if (item.employee == sp.staff.admin.info.id){
	    vacations.push(item);
	}
    });
    
    return vacations;
}

ShiftPlanningRequests.prototype.shiftApprovalsSubEvents = function(){
    $('#rq_sa_po').html(spView.scheduleFilter());
    $('#rq_sa_em').html(spView.staffFilter());
    $('#rq_sa_ho').html(spView.divLoader());
    this.shiftApproveList();
}

//functions

ShiftPlanningRequests.prototype.shiftApproveList = function(){
    this.shifts = [];
    $('#rq_sa_ho').html(spView.divLoader());
    var self = this;
    var data = {
        mode: 'confirm'
    }
    
    if ($('#rq_sa_po').val() != 0){
        data.schedule = $('#rq_sa_po').val();
    }
    
    if ($('#rq_sa_em').val() != 0){
        data.employees = $('#rq_sa_em').val();
    }
    
    spModel.schedule.get('shifts', data, function(response){
        if (response.data.length > 0){
            $('#rq_sa_ho').html($.tmpl($('#te_rq_sa'), self.prepareShiftApprovals(response.data)));
        } else {
            $('#rq_sa_ho').html(spView.emptyResult());
        }
    }, function(response){
        sp.showError(response.error);
    });
}

ShiftPlanningRequests.prototype.prepareShiftApprovals = function(data){
    var res = {};
    $.each(data, function(i, item){
        var t = item.start_date.formatted + '';
        if (typeof res[t] == 'undefined'){
            res[t] = {
                shiftDate : item.start_date.formatted,
                shifts : [item]
            }
        } else {
            res[t].shifts.push(item);
        }
    });
    var a = [];
    
    $.each(res, function(i, item){
        a.push(item);
    });
    
    return a;
}

ShiftPlanningRequests.prototype.addVacationRequest = function(obj){
    var self = this;
    if ($.trim($('#rq_va_fr').val()).length == 0){
        sp.showError('Please select FROM time');
        obj.removeClass('loading');
        return false;
    }
    
    if ($.trim($('#rq_va_to').val()).length == 0){
        sp.showError('Please select TO time');
        obj.removeClass('loading');
        return false;
    }
    
    var data = {
        start_date : $('#rq_va_fr').val(),
        end_date : $('#rq_va_to').val(),
        employee : $('#rq_va_en').val(),
        comments : $('#rq_va_wc').val()
    };
    
    spModel.schedule.create('vacation', data, function(response){
        self.vacationSubEvents();
        obj.removeClass('loading');
    });
}

ShiftPlanningRequests.prototype.displayVacationRequest = function(){
    $('#rq_va_ma_s').html($.tmpl($('#te_rq_va_ma_s'), this.current));
    
    
}

ShiftPlanningRequests.prototype.displayShiftTradeManager = function(){
    
    $('#rq_st_mst_s').html($.tmpl($('#te_rq_st_mst_s'), this.prepareSingleViewTrade(this.current)));
    console.log(this.current);
    $('#rq_st_mts_sub ul a').attr('rel', this.current.id);
    
    if (parseInt(this.current.confirm_before) == 0){
        $('#rq_st_mts_fm').show();
        $('#rq_st_mts_sm').hide();
    } else {
        $('#rq_st_mts_sm').show();
        $('#rq_st_mts_fm').hide();
    }
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerIM = function(){
    
    $('#rq_st_im_s').html($.tmpl($('#te_rq_st_im_s'), this.current));
    
    $('#rq_st_im_sm a').attr('rel', this.current.id);
}

ShiftPlanningRequests.prototype.displayShiftTradeManagerAP = function(){
    
    $('#rq_st_ap_s').html($.tmpl($('#te_rq_st_ap_s'), this.current));
    
    $('#rq_st_ap_sub ul a').attr('rel', this.current.trade_id);
    
    if (parseInt(this.current.confirmed) == 1){
        $('#rq_st_ap_sub ul').hide();
    } else {
        $('#rq_st_ap_sub ul').show();
    }
}

ShiftPlanningRequests.prototype.displayOpenShifts = function(){
    $('#rq_os_rtw').removeClass('icoReqCan').addClass('icoReqWork').html('<span>Request to work</span>');
    
    $('#rq_os_os_s').html($.tmpl($('#te_rq_os_os_s'), this.current));
    
    var h = '';
    var s = this.current.status;
    if (s == 10 || s == 4){
        h = '<a class="icoReqWor" href="#" id="rq_os_rtw" rel="' + this.current.id + '"><span>Request to work</span></a>';
    } else if (s == 1){
        h = 'Management rejected your request for this shift';
    } else if (s == 0){
        h = '<a class="icoReqCan" href="#" id="rq_os_rtw" rel="' + this.current.id + '"><span>Cancel pending request</span></a>';
    } else if (s == 2){
        h = 'Already on this shift';
    } else {
        h = 'Will put you into overtime';
    }
    
    $('#rq_os_sub .subMenu .single').html(h);
}

ShiftPlanningRequests.prototype.displayOpenRequests = function(){
    $('#rq_os_spr_s').html($.tmpl($('#te_rq_os_spr_s'), this.current));
    
    $('#rq_os_spr_sub a').attr('rel',this.current.full.request_id);
}

ShiftPlanningRequests.prototype.shiftApprovalsSingle = function(){
    $('#rq_sa_s').html($.tmpl($('#te_rq_sa_s'), this.current));
    $('#rq_sa_s .shiftStartInput').scroller('destroy');
    $('#rq_sa_s .shiftEndInput').scroller('destroy');
    
    $('#rq_sa_s .shiftStartInput').scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    $('#rq_sa_s .shiftEndInput').scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
}

ShiftPlanningRequests.prototype.approveVacationRequest = function(obj){
    var self = this;
    spModel.schedule.update('vacation', {
        id: self.current.id, 
        status : 1
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.declineVacationRequest = function(obj){
    var self = this;
    spModel.schedule.update('vacation', {
        id: self.current.id, 
        status : -1
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.cancelVacationRequest = function(id){
    spModel.schedule.update('vacation', {
        id: id, 
        status : -2
    }, function(){
        $('.subNavigation .requests li a[subpage=vacation]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.prepareSingleViewTrade = function (data){
    if (data.traders.count == 0){
        data.traders.data = [];
    }
    var d = [];
    $.each(data.traders.data, function(i, item){
        var p = item;
        p.avatar = (typeof sp.staff.data.employees[item.user] != 'undefined' && typeof sp.staff.data.employees[item.user].avatar != 'undefined' && sp.staff.data.employees[item.user].avatar != '' && typeof sp.staff.data.employees[item.user].avatar.small != 'undefined') ? sp.staff.data.employees[item.user].avatar.small : 'images/no-avatar.png';
        d.push(p);
    });
    
    data.traders.data = d;
    return data;
}

ShiftPlanningRequests.prototype.prepareOpenShiftsNA = function(data){
    var res = {};
    $.each(data, function(i, item){
        $.each(item.requests, function(iV2, itemV2){
            item.user_name = itemV2.name;
            item.user_id = itemV2.id;
            item.avatar = sp.getAvatar(itemV2.id);
            res[item.user_id + item.start_date.formatted + item.start_time.time + item.end_time.time + item.schedule_name] = {
                user_name : itemV2.name,
                user_id : itemV2.id,
                start_date : item.start_date.formatted,
                hours : item.start_time.time + ' - ' + item.end_time.time,
                schedule_name : item.schedule_name,
                notes : item.notes,
                id : item.id,
                rId : item.request_id,
                full : item
            };
        });
    });
    var p = [];
    $.each(res, function(i, item){
        p.push(item);
    });
    return p;
}

ShiftPlanningRequests.prototype.saveShiftApprove = function(){
    var self = this;
    var data = [];
    $.each($('#rq_sa_s .save'), function(){
        var t = {
            employee: $(this).attr('userId'),
            id : $(this).attr('shiftId'),
            start_time : $(this).find('.shiftStartInput').val(),
            end_time : $(this).find('.shiftEndInput').val()
        }
        if (!$(this).find('.checkbox').hasClass('check')){
            t.absent = 1
        }
        var tmp = ['schedule.shiftapprove', 'update', t];
        data.push(tmp);
    });
    
    sp.multiApi(data, function(response){
        $('.subNavigation .requests li a[subpage=shiftApprovals]').trigger(clickEvent);
    });
}

ShiftPlanningRequests.prototype.addShift = function(id, data, field){
    if (typeof field != 'undefined'){
        this.shifts[parseInt(id) + ''][field] = data;
    } else {
        this.shifts[parseInt(id) + ''] = data;
    }
}

ShiftPlanningRequests.prototype.getShift = function(id){
    return this.shifts[id];
}

ShiftPlanningRequests.prototype.fixShiftsApproval = function(data){
    if (data.employees != null){
        $.each(data.employees, function(i, item){
            if (typeof data.employees[i].shift == 'undefined'){
                data.employees[i].shift = data;
                data.employees[i].shift.absent = 0;
            }
        });
    }
    return data;
}

ShiftPlanningRequests.prototype.loadPage = function(){
    
    }
 ShiftPlanningSchedule.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        self.allPageEvents();
    });
}

ShiftPlanningSchedule.prototype.allPageEvents = function(){
    var self = this;
    $('#sc_fl').bind('change', function(e){
        var val = $(this).val();
        if (parseInt(val) != val){
            self.settings.mode = val;
        } else {
            self.settings.mode = 'schedule';
            self.settings.schedule = val;
        }
        self.displayShifts();
    });
    
    $('#sc_prev_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(-1).day().toString(cal.dformat));
        self.nextPrevPrepare('prev');
    });
    
    $('#sc_next_day').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_to_sub').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(1).day().toString(cal.dformat));
        self.nextPrevPrepare('next');
    });
    
    $('#sc_prev_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(-1).toString('MMMM yyyy'));
        $('#sc_days_m').hide();
        self.displayShifts();
    });
    
    $('#sc_next_month').bind(clickEvent, function(e){
        e.preventDefault();
        $('#sc_mo_di').html(Date.parse($.trim($('#sc_mo_di').html())).addMonths(1).toString('MMMM yyyy'));
        $('#sc_days_m').hide();
        self.displayShifts();
    });
    
    
    $('#sc_ca_bo').delegate('td:not(.notM)', clickEvent, function(){
        $('#sc_ca_bo td').removeClass('today');
        $(this).addClass('today');
        var i = $(this).attr('time');
        if (typeof self.shifts[i] != 'undefined'){
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').hide();
            $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), self.shifts[i].shifts));
        } else {
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
        $('#sc_to_sub').html(Date.parse(i + ' ' + $.trim($('#sc_mo_di').html())).toString(cal.dformat));
        $('#sc_days_m').show();
    });
    
    $('#sc_td_list').delegate('tr', clickEvent, function(e){
        if (!$(this).hasClass('isShift')){
            return false;
        }
        $(this).addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('shiftId'), 
            detailed : 1
        }, function(response){
            self.shift = response.data;
            sp.loadSubPage('', 'schedule', 'shiftDisplay');
        });
    });
    
    $('#schedule .shiftDisplay .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        if (self.fromDashboard){
            self.fromDashboard = false;
            $('.subNavigation').show();
            $('.subNavigation .dashboard li a[subpage=upcomingShifts]').trigger(clickEvent);
        } else {
	    if ($('#sc_sub_shift_display ul a.publish').attr('first') == 'false'){
		self.resetPublishFields(true);
	    } else {
		$('.subNavigation .schedule li.active a').trigger(clickEvent);
	    }
        }
    });
    
    $('#schedule .addShift .backMenu').bind(clickEvent, function(e){
        e.preventDefault();
        if ($(this).attr('bck') == 'edit'){
            spModel.schedule.get('shift', {
                id : $('#sc_edit_id').val(), 
                detailed : 1
            }, function(response){
                self.shift = response.data;
                sp.loadSubPage('', 'schedule', 'shiftDisplay');
            });
        } else {
            $('.subNavigation .schedule li.active a').trigger(clickEvent);
        }
    });
    
    $('#sc_sub_shift_display ul a.edit').bind(clickEvent, function(e){
        e.preventDefault();
        var o = $(this);
        o.addClass('loading');
        spModel.schedule.get('shift', {
            id : $(this).attr('rel'), 
            detailed:  1
        }, function(response){
            o.removeClass('loading');
            self.shift = response.data;
            self.edit = true;
            sp.loadSubPage('', 'schedule', 'addShift');
        }, function(){
            o.removeClass('loading');
        });
    });
    
    $('#sc_sub_shift_display ul a.publish').bind(clickEvent, function(e){
	e.preventDefault();
	if ($(this).attr('first') == 'true'){
	    $('#te_sc_shift_display_info').hide();
	    $('#te_sc_shift_display_publish').show();
	    $(this).attr('first', 'false');
	    return false;
	}
	var obj = $(this);
	obj.addClass('loading');
	if (typeof self.conflicts[obj.attr('rel')] != 'undefined'){
	    var c = confirm(self.conflicts[obj.attr('rel')].title);
	    if (c){
		spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
		    sp.showSuccess(response.data);
		    obj.removeClass('loading');
		    obj.hide();
		    self.resetPublishFields(true);
		});
	    } else {
		obj.removeClass('loading');
	    }
	} else {
	    spModel.schedule.get('conflicts', {schedule : $(this).attr('rel')}, function(response){
		self.setConflicts(response.data);
		if (typeof self.conflicts[obj.attr('rel')] != 'undefined'){
		    var c = confirm('This shift has conflicts, but you can\'t fix them from mobile app. Force publish?');
		    if (c){
			spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
			    sp.showSuccess(response.data);
			    obj.removeClass('loading');
			    obj.hide();
			    self.resetPublishFields(true);
			});
		    } else {
			obj.removeClass('loading');
		    }
		} else {
		    spModel.schedule.get('publish', {shifts: obj.attr('rel'), notify: $('#te_sc_shift_display_publish .radio.check').attr('value'), message: $('#tc_sc_shift_display_publish_textarea textarea').val()}, function(response){
			sp.showSuccess(response.data);
			obj.removeClass('loading');
			obj.hide();
			self.resetPublishFields(true);
		    });
		}
	    });
	}
    });
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_publish .radio', clickEvent, function(){
	$('#te_sc_shift_display_publish .radio').removeClass('check');
	$(this).addClass('check');
    });
    
    $('#sc_shift_display').delegate('#te_sc_shift_display_publish .checkbox', clickEvent, function(){
	$(this).toggleClass('check');
	$('#tc_sc_shift_display_publish_textarea').toggle();
    });
    
    $('#sc_refresh').bind(clickEvent, function(e){
        e.preventDefault();
        self.displayShifts();
    });
    
    $('#sc_add').bind(clickEvent, function(e){
        e.preventDefault();
        sp.loadSubPage('', 'schedule', 'addShift');
    });
    
    $('#sc_add_add').bind(clickEvent, function(e){
        e.preventDefault();
        var obj = $(this);
        var isEdit = ($('#sc_edit_id').val() != 0) ? true : false;
        obj.addClass('loading');
        var data = {
            schedule : $('#sc_add_sc').val(),
            location : $('#sc_add_lo').val(),
            title : $('#sc_add_ti').val(),
            start_time : $('#sc_date_st').val(),
            end_time : $('#sc_date_et').val(),
            start_date : $('#sc_date_sd').val(),
            end_date : $('#sc_date_ed').val(),
            notes : $('#sc_add_no').val()
        }
        
        var method = 'create';
        if (isEdit){
            method = 'update';
            data.id = $('#sc_edit_id').val();
        }

        spModel.schedule[method]('shift', data, function(response){
            spModel.schedule.get('shift', {
                id : response.data.id, 
                detailed : 1
            }, function(r1){
                if (!isEdit){
                    obj.removeClass('loading');
                    self.shift = r1.data;
                    self.edit = true;
                    sp.loadSubPage('', 'schedule', 'addShift');
                } else {
                    spModel.schedule.get('shift', {
                        id : $('#sc_edit_id').val(), 
                        detailed : 1
                    }, function(response){
                        self.shift = response.data;
                        sp.loadSubPage('', 'schedule', 'shiftDisplay');
                        sp.showSuccess('Shift Updated');
                    });
                }
            });
        }, function(){
            obj.removeClass('loading');
        });
    });
    
    $('#sc_add_user').delegate('.checkbox', clickEvent, function(){
        
        var data = {
            id : $('#sc_edit_id').val()
        }
        var obj = $(this);
        //add loader
        obj.parent().addClass('loading');
        
        if (obj.hasClass('check')){
            data.remove = obj.attr('user');
        } else {
            data.add = obj.attr('user');
        }
        spModel.schedule.update('shift', data, function(response){
            spModel.schedule.get('shift', {
                id : response.data.id, 
                detailed : 1
            }, function(r1){
                obj.parent().removeClass('loading');
                self.shift = r1.data;
                self.edit = true;
                sp.loadSubPage('', 'schedule', 'addShift');
            }, function(){
                obj.parent().removeClass('loading');
            });
        }, function(){
            obj.parent().removeClass('loading');
        });
    });
    
    $('#sc_edit_submenu .subMenu a').bind(clickEvent, function(e){
        var obj = $(this);
        e.preventDefault();
        obj.addClass('loading');
        spModel.schedule.update('shiftapprove', {
            id : $('#sc_edit_id').val()
        }, function(response){
            sp.showSuccess('Shift approved');
            obj.removeClass('loading');
            obj.hide();
        }, function(){
            obj.removeClass('loading');
        })
    });
}

ShiftPlanningSchedule.prototype.loadSubPageEvents = function(subpage){
    $('#sc_edit_id').val(0);
    $('.subNavigation').show();
    $('#sc_additional_menu').show();
    if (subpage == 'shiftDisplay' || subpage == 'addShift'){
        $('.subNavigation').hide();
    }
    
    if (subpage == 'addShift'){
        $('#sc_additional_menu').hide();
    }
    this[subpage + 'SubEvents']();
}

//sub events
ShiftPlanningSchedule.prototype.todaySubEvents = function(){
    $('#sc_to_sub').html(sp.raw.config.today.formatted);
    $('#sc_to_sub').prev().html('Today');
    this.page = 'today';
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.daySubEvents = function(){
    this.page = 'day';
    $('#sc_to_sub').prev().html('Current Day');
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.monthSubEvents = function(){
    this.page = 'month';
    $('#sc_to_sub').prev().html('Selected Day');
    $('#sc_mo_di').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).add(1).day().toString('MMMM yyyy'));
    this.displayShifts();
}

ShiftPlanningSchedule.prototype.shiftDisplaySubEvents = function(){
    this.shift = this.cleanPerm(this.shift);
    if (this.fromDashboard){
        $('#sc_sub_shift_display a.edit').hide();
	$('#sc_sub_shift_display a.publish').hide();
    } else {
        if (this.shift.perms == 0){
            $('#sc_sub_shift_display a.edit').hide();
	    $('#sc_sub_shift_display a.publish').hide();
        } else if (this.shift.perms == 1){
            $('#sc_sub_shift_display a.edit').hide();
	    $('#sc_sub_shift_display a.publish').hide();
        } else {
	    if (this.shift.published == 0){
		$('#sc_sub_shift_display a.publish').show();
		$('#sc_sub_shift_display a.publish span').html('Publish');
	    } else if (this.shift.published < this.shift.edited && this.shift.published != 0) {
		$('#sc_sub_shift_display a.publish').show();
		$('#sc_sub_shift_display a.publish span').html('Republish');
	    } else {
		$('#sc_sub_shift_display a.publish').hide();
	    }
	    if (sp.staff.admin.settings.draft == 0){
		$('#sc_sub_shift_display a.publish').hide();
	    }
	    
            $('#sc_sub_shift_display a.edit').show();
        }
	$('#sc_sub_shift_display a.publish').attr('first','true');
    }
    var e = [];
    if (typeof this.shift.employees != 'undefined' && this.shift.employees != null){
        $.each(this.shift.employees, function(i, item){
            e[i] = item;
            e[i].avatar = (typeof sp.staff.data.employees[item.userid] != 'undefined' && typeof sp.staff.data.employees[item.userid].avatar != 'undefined' && sp.staff.data.employees[item.userid].avatar != '' && typeof sp.staff.data.employees[item.userid].avatar.small != 'undefined') ? sp.staff.data.employees[item.userid].avatar.small : 'images/no-avatar.png';
        });
        this.shift.employees = e;
    } else {
        this.shift.employees = [];
    }
    $('#sc_shift_display').html($.tmpl($('#te_sc_shift_display'), this.shift));
    
    
    this.resetPublishFields(true);
    
    $('#sc_sub_shift_display ul a').attr('rel', this.shift.id);
}

ShiftPlanningSchedule.prototype.resetPublishFields = function(f){
    if (typeof f == 'undefined'){
	f = false;
    }
    
    if (f){
	$('#te_sc_shift_display_publish').hide();
	$('#te_sc_shift_display_info').show();
    }
    
    $('#te_sc_shift_display_publish .radio').removeClass('check');
    $('#te_sc_shift_display_publish .checkbox').removeClass('check');
    $('#te_sc_shift_display_publish .radio[value=1]').addClass('check');
    $('#tc_sc_shift_display_publish_textarea').hide();
    $('#tc_sc_shift_display_publish_textarea textarea').val('');
    $('#sc_sub_shift_display ul a.publish').attr('first', 'true');
}

ShiftPlanningSchedule.prototype.addShiftSubEvents = function(){
    var self = this;
    $('#sc_add_user').hide();
    $('#sc_add_sc').html(spView.schedulerFilter(0, true));
    $('#sc_add_lo').html(spView.locationSelector());
    $('#sc_add_add').removeClass('loading');
    var emp = {};
    if (this.edit != false){
        emp = this.shift;
        emp.start_date.formatted = Date.parse(emp.start_date.formatted + ' ' + emp.start_time.time).getTime()/1000;
        emp.end_date.formatted = Date.parse(emp.end_date.formatted + ' ' + emp.end_time.time).getTime()/1000;
        if (emp.schedule != null) $('#sc_add_sc').val(emp.schedule);
        if (emp.schedule != null) $('#sc_add_sc').val(emp.schedule);
    } else {
        emp.start_date = {};
        emp.end_date = {};
        emp.start_date.formatted = Date.parse('today at 9am').getTime()/1000;
        emp.end_date.formatted = Date.parse('today at 5pm').getTime()/1000;
    }
    
    var s = new Date(emp.start_date.formatted*1000);
    var e = new Date(emp.end_date.formatted*1000);
    
    var tf = (cal.tmode == 24)? 'HH:mm' : 'hh:mm tt';
    
    $('#sc_date_st').scroller('destroy');
    $('#sc_date_st').val(s.toString(tf));
    $("#sc_date_st").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    
    $('#sc_date_et').scroller('destroy');
    $('#sc_date_et').val(e.toString(tf));
    $("#sc_date_et").scroller({
        preset : 'time',
        ampm: (cal.tmode==24?false:true),
        stepMinute: 15,
        timeFormat: sp.strReplace(['tt','mm'],['A','ii'],cal.tstring)
    });
    
    $('#sc_date_sd').scroller('destroy');
    $('#sc_date_sd').val(s.toString(cal.dformat));
    $('#sc_date_sd').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    $('#sc_date_ed').scroller('destroy');
    $('#sc_date_ed').val(e.toString(cal.dformat));
    $('#sc_date_ed').scroller({
        preset : 'date',
        dateFormat : (sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat) == 'mmM d, yy') ? sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).substr(2, sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat).length) : sp.strReplace(['MM','yyyy'],['mm','yy'],cal.dformat),
        dateOrder: sp.strReplace(['MM','yyyy',' ','-','/'],['mm','yy','','',''],cal.dformat)
    });
    
    
    $('#sc_add_no').val((this.edit) ? emp.notes : '');
    $('#sc_add_ti').val((this.edit) ? emp.title : '');
    $('#sc_add_lo').val((this.edit) ? (emp.location != 0) ? emp.location.id : 0 : 0);
    
    if (this.edit){
        $('#sc_add_add span').html('Save Shift');
        $('#sc_edit_id').val(emp.id);
        $('#sc_edit_submenu .backMenu').attr('bck', 'edit');
        if (emp.confirmed == 0 && emp.end_date.id < sp.raw.config.today.id && sp.staff.admin.settings.shift_confirm == 1){
            $('#sc_edit_submenu .subMenu').show();
        } else {
            $('#sc_edit_submenu .subMenu').hide();
        }
    } else {
        $('#sc_edit_submenu .subMenu').hide();
        $('#sc_edit_submenu .backMenu').attr('bck', 'add');
        $('#sc_add_add span').html('Add Shift And Set Users');
    }
    //prepare users
    if (this.edit){
        $('#sc_add_user .working ul').html((emp.staff.scheduled == null) ? spView.emptyResult('No scheduled employees for selected shift', 'li') : $.tmpl($('#te_sc_usersW'), this.prepareStaff(emp.staff.scheduled)));
        delete emp.staff.scheduled;
        
        $.each(emp.staff, function(i, item){
            if (item == null){
                $('#sc_add_user div[type=' + i + ']').hide();
            } else {
                $('#sc_add_user div[type=' + i + '] ul.detailsGrid li ul').html($.tmpl($('#te_sc_users'), self.prepareStaff(item)));
            }
        });
        $.each($('#sc_add_user .detailsGrid ul'), function(i, item){
            $.each($(item).find('li'), function(iV2, itemV2){
                if (iV2 % 2 == 0){
                    $(this).addClass('even');
                } else {
                    $(this).addClass('odd');
                }
            });
        });
        $('#sc_add_user').show();
    }

    this.edit = false;
}

ShiftPlanningSchedule.prototype.prepareStaff = function(staff){
    var l = staff.length;
    var res = [];
    while (l--){
        res.push(sp.staff.data.employees[staff[l][0]]);
    }
    return res;
}

ShiftPlanningSchedule.prototype.nextPrevPrepare = function(type){
    var self = this;
    $('#sc_mo_di').html(Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString('MMMM yyyy'));
    if (this.page == 'today'){
        $('.subNavigation .schedule li a[subpage=day]').trigger(clickEvent);
    } else if (this.page == 'day'){
        this.displayShifts();
    } else if (this.page == 'month'){
        var i = parseInt($('#sc_ca_bo .today').attr('time'));
        // get 
        var cD = $.trim($('#sc_mo_di').html());
        
        var sD = Date.parse(cD).moveToFirstDayOfMonth().getDate();

        //end of month
        var eD = Date.parse(cD).moveToLastDayOfMonth().getDate();
        if (type == 'prev'){
            if (i == 1){
                self.displayShifts(eD);
            } else {
                i--; 
                $('#sc_ca_fi_' + i).trigger(clickEvent)
            }
        } else {
            i++;
            if ($('#sc_ca_fi_' + i).length == 0){
                self.displayShifts(1);
            } else {
                $('#sc_ca_fi_' + i).trigger(clickEvent)
            }
        }
    }
}

ShiftPlanningSchedule.prototype.displayShifts = function(sDay){
    var self = this;
    if (this.page == 'month'){
        this.generateCalendar();
    }
    $('#sc_td_list').parent().hide();
    $('#sc_td .loading').show();
    $('#sc_td .additional').hide();
    $('#sc_ca_bo').parent().addClass('loading');

    
    var data = this.getSettings();
    
    spModel.schedule.get('shifts', data, function(response){
        $('#sc_ca_bo').parent().removeClass('loading');
        if (response.data.length > 0){
	    response.data = self.cleanPerms(response.data);
            if (self.page == 'month'){
                self.fillCalendar(response.data);
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts_months'), self.shifts));
                if (typeof sDay != 'undefined'){
                    $('#sc_ca_fi_' + sDay).trigger(clickEvent);
                }
            } else {
                $('#sc_td_list').html($.tmpl($('#te_sc_shifts'), response.data));
            }
            $('#sc_td_list').parent().show();
            $('#sc_td .loading').hide();
	    $('#sc_td_list .dTitle  span').each(function(){
                var o = $(this).find('t:last');
		if ($(o).html() != null){
		    $(o).html($(o).html().substr(0,($(o).html().length -2 )));
		}
            });
        } else {
            if (self.page == 'month'){
                if (typeof sDay != 'undefined'){
                    $('#sc_ca_fi_' + sDay).trigger(clickEvent);
                }
            }
            $('#sc_td_list').parent().hide();
            $('#sc_td .loading').hide();
            $('#sc_td .additional').show();
        }
    });
}

ShiftPlanningSchedule.prototype.cleanPerms = function(data){
    var self = this;
    $.each(data, function(i, item){
	data[i] = self.cleanPerm(item);
    });
    
    return data;
}

ShiftPlanningSchedule.prototype.cleanPerm = function(data){
    if (data.employees != null){
	if (data.perms < 2 && sp.staff.admin.settings.visible_coworkers == 0){
	    var e = [];
	    $.each(data.employees, function(i, item){
		if (item.id == sp.staff.admin.info.id){
		    e.push(item);
		}
	    });
	    data.employees = e;
	}
    }
    
    return data;
}

ShiftPlanningSchedule.prototype.clearSchedules = function(){
    var schedules = {};
    $.each(sp.schedule.data.schedules, function(i, item){
	if (spView.checkPerm(item, true)){
	    schedules[i +''] = item;
	}
    });
    
    return schedules;
}

ShiftPlanningSchedule.prototype.checkSchedulePerm = function(scheduleID){
    if (typeof sp.schedule.data.schedules[scheduleID] == 'undefined'){
	return 0;
    } else {
	return sp.schedule.data.schedules[scheduleID].perms;
    }
}

ShiftPlanningSchedule.prototype.fillCalendar = function(data){
    var res = {};
    $.each(data, function(i, item){
        if (typeof res[item.start_date.day + ''] == 'undefined'){
            res[item.start_date.day + ''] = {
                dateToday : item.start_date.formatted,
                shifts : []
            };
        }
        res[item.start_date.day+ ''].shifts.push(item);
    });
    $('#sc_ca_bo td').removeClass('hasAny');
    
    var fin = []
    $.each(res, function(i, item){
        fin[i] = item;
        $('#sc_ca_fi_' + i).addClass('hasAny');
    });
    
    
    
    this.shifts = fin;
}

ShiftPlanningSchedule.prototype.getColorsBySchedule = function(id){
    if (typeof sp.schedule.data.schedules[id] != 'undefined'){
        return sp.raw.config.newcolorsets[sp.schedule.data.schedules[id].color];
    } else {
        return ['000', 'aaa', 'fff', 'fff', '000'];
    }
}

ShiftPlanningSchedule.prototype.getSettings = function(){
    if (this.page != 'month'){
        this.settings.start_date = Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString(cal.dformat);
        this.settings.end_date = Date.parseExact($.trim($('#sc_to_sub').html()), cal.dformat).toString(cal.dformat);
    } else {
        this.settings.start_date = Date.parse($.trim($('#sc_mo_di').html())).moveToFirstDayOfMonth().toString(cal.dformat);
        this.settings.end_date = Date.parse($.trim($('#sc_mo_di').html())).moveToLastDayOfMonth().toString(cal.dformat);
    }
    
    return this.settings;
}

ShiftPlanningSchedule.prototype.setSettings = function(){
    $('#sc_start_day').val(this.settings.start_date);
    $('#sc_end_day').val(this.settings.end_day);
    $('#sc_mode').val(this.settings.end_day);
    $('#sc_schedule').val(this.settings.end_day);
}

ShiftPlanningSchedule.prototype.generateCalendar = function(){
    var month = '';
    
    
    //now attach selection
    $('#sc_ca_he').html(this.generateTop());
    $('#sc_ca_bo').html(this.generateMiddle());
}




ShiftPlanningSchedule.prototype.generateTop = function(){
    var b = cal.startday - 1;
    var res = '';
    if (b>0){
        for (var i = b; i<7; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
        for (var i = 0; i<b; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
    } else {
        for (var i = 0; i<7; i++){
            res += '<th>' + daysOfWeekS[i] + '</th>';
        }
    }
    
    return res;
}

ShiftPlanningSchedule.prototype.generateMiddle = function(currentDate){
    //definig rows
    var rows;
    
    //define days from old month
    var bm;
    
    //define current day full date
    var cD = (typeof currentDate == 'undefined') ? $.trim($('#sc_mo_di').html()) : currentDate;
    
    //
    
    //start of month
    var s = Date.parse(cD).moveToFirstDayOfMonth().getDate();
    
    //end of month
    var e = Date.parse(cD).moveToLastDayOfMonth().getDate();
    
    //position from which we start calendar
    var startPosition = Date.parse(cD).moveToFirstDayOfMonth().getDay() - (cal.startday - 1);
    
    //how much days had last month
    var lM = Date.parse($.trim($('#sc_to_sub').html())).addMonths(-1).moveToLastDayOfMonth().getDate();
    
    //calculate how much days to display from old month
    if (startPosition >= 0){
        bm = startPosition;
    } else {
        bm = 7 + startPosition;
    }
   
    
    //calculate last month
    var startDayLastMonth = (lM - bm) + 1;
    
    //number of displayed days in this month;
    
    var res = '';
    
    var daysArray = new Array();
    
    for (var i = startDayLastMonth; i <= lM; i++){
        daysArray.push('<td class="notM">' + i + '</td>');
    }
    
    for (var i = s; i <= e; i++){
        daysArray.push('<td id="sc_ca_fi_' + i + '" time="' + i + '">' + i + '</td>');
    }
    
    var cp = 7 - (daysArray.length % 7);
    
    for (var i = 1; i<= cp; i++){
        daysArray.push('<td class="notM">' + i + '</td>');
    }
    
    for (var c = 0; c < daysArray.length / 7; c++){
        res += '<tr>' + daysArray.slice(c * 7, (c+1) * 7).join('') + '</tr>';
    }
    //class "today" is for selecting today
    return res;
}


ShiftPlanningSchedule.prototype.loadPage = function(){
    var opt = '';
    opt += '<option value="employee">My Schedules</option>';
    opt += '<option value="overview">Schedule Overview</option>';
    opt += spView.schedulerFilter();
    $('#sc_fl').html(opt);
    
    this.generateCalendar();
}
 ShiftPlanningPermissions.prototype.initialize = function(){
    var self = this;
    $(document).ready(function(){
        if (user.loggedIn == 1){
            self.preparePermissions();
        }
    });
}


//hide all html parts of system wich permissions i don't have
ShiftPlanningPermissions.prototype.preparePermissions = function(){
    //missing view reports
    //missing edit profile
    
    var perms = sp.staff.admin.settings;
    var group = sp.staff.admin.info.group
 
     //Message Wall (is vissible)
    if (parseInt(perms.message_wall_on) == 0){
        $('#da_wa_nm_b').remove();
        $('#da_wa_nm_f').remove();
        $('#da_wa_li').html(spView.emptyResult('Message wall is off. Please contact your manager for more info.', 'li'));
    }
    
    //remove button for writing new wall message
    if (group > this.supervisor && parseInt(perms.message_wall_emp) == 0){
        $('#da_wa_nm_b').remove();
        $('#da_wa_nm_f').remove();
    }
    
    //Add class to ul to hide wall comments
    if (parseInt(perms.message_wall_comments) == 0){
        $('#da_wa_li').addClass('permMsgCommentOff');
    }
    
    //remove button for inbox if perms aren't met'
    if (group >= this.scheduler && parseInt(perms.pm) == 0){
        $('#da_in_nm_b').unbind(clickEvent);
        $('#da_in_nm_b').remove();
	

    }
    
    if (perms.shift_confirm == 0){
	$('.subNavigation .reports a[subpage=confirmedHours]').remove();
    }
    
    //fix employee only perms
    if (group >= this.employee){        
        $('#da_se_ov_no, #da_se_ed_no').parents('.detailsGrid').remove();
        
        $('#sc_add').parent().remove();
	
	//remove manage timeclock
	$('#tc_mts_sub_button').remove();
        $('#tc_mts').remove();
	
	$('.subNavigation .requests a[subpage=shiftApprovals]').remove();
	$('#rq_sa').remove();
    }
    
    if (group >= this.scheduler){

        $('#menu_reports').remove();
        $('#reports').remove();
	
	$('#da_se .aPerm').remove();
	
	//remove staff fast assignment and add staff for employee
        $('.subNavigation .staff a[subpage=addStaff]').remove();
        $('.subNavigation .staff a[subpage=fastAssignment]').remove();
        $('#staff .addStaff').remove();
        $('#st_fa').remove();
    }
   
    if (group > this.supervisor){
//        $('#da_se_ov_aa').prev().remove();
//        $('#da_se_ov_aa').remove();
    }
    
    //Employees can manually add time clocks
    if (group >= this.scheduler && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_act_sub_button').remove();
    }
    
    //Time Clock Module is on
    if (parseInt(perms.timeclock) == 0){
        $('#menu #menu_timeClock').unbind(clickEvent);
        $('#menu #menu_timeClock').remove();
        $('#timeClock').remove();
        $('.subNavigation div.timeClock').remove();
	$('.subNavigation .reports a[subpage=confirmedTimeSheets]').remove();
    }

    //Employees can view staff gallery
    if (group >= this.employee && parseInt(perms.visible_staff) == 0){
        $('#menu #menu_staff').unbind(clickEvent);
        $('#menu #menu_staff').remove();
        $('#staff').remove();
        $('.subNavigation div.staff').remove();
    }
    
/*    
    //Employee can send private messages
    if (group >= this.employee && parseInt(perms.pm) == 0){
        $('#da_in_nm_b').unbind(clickEvent);
        $('#da_in_nm_b').remove();
    }
    
//    //Employee can view Who's on now
//    if (group >= this.employee && parseInt(perms.on_now) == 0){
//        $('#da_who').remove();
//    }
//      This doesn't exists on mobile version for now
    

    
    //Employees can manually add time clocks
    if (group >= this.employee && parseInt(perms.tc_empl_addtime) == 0){
        $('#tc_mts_sub_button').parent().remove();
        $('#tc_act_sub_button').remove();
    }
    
    //Message Wall
    if (parseInt(perms.message_wall_on) == 0){
        $('#da_w').remove();
        $('#da_nm_f').remove();
        $('#da_w_title').remove();
    }
    
    
    if (group > this.manager && parseInt(perms.message_wall_emp) == 0){
        $('#da_nmb').remove();
        $('#da_nm_f').remove();
    }
    
    if (group > this.supervisor){
        $('#footer_manageTimeSheets').parent().remove();
        $('#tc_manageTimeSheets').remove();
        $('#footer_addEmployee').parent().remove();
        $('#st_ae').remove();
        $('#footer_fastAssignment').parent().remove();
        $('#st_fa').remove();
        $('#da_se_ov_p .aPerm').remove();
        $('#menu_reports').remove();
        $('#reports').remove();
        $('#rq_rl_va, #rq_rl_sp, #rq_rl_sr, #rq_rl_ast').parent().hide();
        $('#rq_rl .breaker').hide();
        $('#rq_rl .breaker:last, #rq_rl .breaker:first,').show();
    }
    
    if (group > this.scheduler){
        $('#rq_va_rq').remove();
        $('ul.requests a[subPage=shiftApprovals]').parent().remove();
    }
*/
}

ShiftPlanningPermissions.prototype.hasPermission = function(type){
    var perms = sp.staff.admin.settings;
    var group = sp.staff.admin.info.group;
    switch (type){
        case 'visible_staff_details':
            //Employees can view staff contact details (staff gallery must be checked)
            if (group >= this.employee && parseInt(perms.visible_staff_details) == 0){
                return false;
            }
            break;
        case 'edit_profile':
            if (group > this.scheduler && parseInt(perms.edit_profile) == 0){
                return false;
            }
            break;
        case 'message_wall_comments':
            if (group > this.manager && parseInt(perms.message_wall_comments) == 0){
                return false;
            }
            break;

    }
    return true;
}

ShiftPlanningPermissions.prototype.fixStaffListing = function(){
    var st = sp.staff.data.employees;
    var sc = sp.schedule.clearSchedules();
    var employees = {};
    
    $.each(sc, function(i, item){
	$.each(st, function(eI, eItem){
	    if (eItem.schedules != null && typeof eItem.schedules[item.id] != 'undefined'){
		employees[eItem.id +''] = eItem;
	    }
	});
    });
    
    return employees;
}

 //creation of touchmove event used for tablet/mobile devices
var cal;
var lastTouch;
var clickEvent = 'click';
var deviceAgent = navigator.userAgent.toLowerCase();
var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
if (agentID) {
    clickEvent = 'touch';
}

jQuery.event.special.touch = {
    setup: function(data,namespaces){
        var elem = this, $elem = jQuery(elem);
        if (window.Touch) {
            $elem.bind('touchstart', jQuery.event.special.touch.onTouchStart);
            $elem.bind('touchmove', jQuery.event.special.touch.onTouchMove);
            $elem.bind('touchend', jQuery.event.special.touch.onTouchEnd);
        } else {
            $elem.bind('click', jQuery.event.special.touch.click);
        }
    },
    click: function (event) {
        event.type = "touch";
        jQuery.event.handle.apply(this, arguments);
    },

    teardown: function (namespaces) {
        var elem = this, $elem = jQuery(elem);
        if (window.Touch) {
            $elem.unbind('touchstart', jQuery.event.special.touch.onTouchStart);
            $elem.unbind('touchmove', jQuery.event.special.touch.onTouchMove);
            $elem.unbind('touchend', jQuery.event.special.touch.onTouchEnd);
        } else {
            $elem.unbind('click', jQuery.event.special.touch.click);
        }
    },

    onTouchStart: function (e) {
        this.moved = false;
        lastTouch = e.originalEvent.targetTouches[0];
    },

    onTouchMove: function (e) {
        this.moved = true;
    },

    onTouchEnd: function (event) {
        if (!this.moved) {
            event.type = "touch";
            jQuery.event.handle.apply(this, arguments)
        }
    }
}

ShiftPlanning.prototype.toggleMenu = function(){
    $('#menu').toggleClass('hidden');
    $('#wrapper').toggleClass('extended');
}

ShiftPlanning.prototype.loadSubPage = function(obj, page, subpage){
    if (subpage == 'logout'){
        sp.staff.logout();
        return false;
    }
    
    if (obj != ''){
        obj.parent().parent().find('li').removeClass('active');
        obj.parent().addClass('active');
    }
    
    $('.subNavigation > div').hide();
    $('.subNavigation > div.' + page).show();
    
    $('#pages > div').hide();
    $('#pages #' + page + ' .main').hide();
    $('#pages #' + page + ' .mainSub').hide();
    $('#pages #' + page).show();
    $('#pages #' + page + ' .main.' + subpage).show();
    $('#pages #' + page + ' .mainSub.' + subpage).show();
    
    if (typeof this[page] != 'undefined' && 'loadSubPageEvents' in this[page]){
        this[page].loadSubPageEvents(subpage);
    }
    
    sp.fixCheckboxes();
}

ShiftPlanning.prototype.initialize = function(){
    var self = this;
    $(window).hashchange(function(){
        if (sp.hash().length > 0) {
            if ($('#menu [page=' + sp.hash() + ']').length > 0){
                $('#pages > div').hide();
                setTimeout(function(){
                    $('#menu [page=' + sp.hash() + ']').parent().parent().find('li').removeClass('active');
                    $('#menu [page=' + sp.hash() + ']').parent().addClass('active');
                    self.loadPage(sp.hash());
                }, 50);
            }
        }
    });  
    $(document).ready(function(){
        init();
        $('.toggleMenu').bind('click', function(e){
            e.preventDefault();
            self.toggleMenu();
        });
        
        if(user.loggedIn){
            $('.loginContainer').hide();
            $('body').removeClass('login');
            $('html').css('height','auto');
            $('.applicationContainer').show();
            if (sp.hash().length == 0 || sp.hash() == 'login'){
                sp.hash('dashboard');
            }
        } else {
            $('.loginContainer').show();
            $('body').addClass('login');
            sp.hash('login');
            $('#lo_u').focus();
        }
        
        $('#wrapper .subNavigation .subNav:not(.notMain) a').bind(clickEvent, function(e){
            e.preventDefault();
            self.loadSubPage($(this), $(this).parent().parent().attr('page'), $(this).attr('subpage'));
        });
        
        $('#menu .mainNav > li > a').bind(clickEvent, function(e){
            e.preventDefault();
            if ($(this).attr('page') == sp.hash()){
                return false;
            }
            self.toggleMenu();
            sp.hash($(this).attr('page'));
        });
        $(window).hashchange();
        
        setInterval(function(){
            $('#menu').css('height', ($(window).height() > $(document).height() ? $(window).height() : $(document).height()));
        }, 1000);
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());
        
        //all mainUser names to lead to settings 
        $('.userName').bind(clickEvent, function(){
            sp.loadSubPage('', 'dashboard', 'settings');
        });
        
        $('#wrapper').bind(clickEvent, function(e){
            if ($('#wrapper').hasClass('extended') && !$(e.target.parentElement).hasClass('toggleMenu')){
                self.toggleMenu();
            }
        })
    });
    
    $(window).bind('resize', function(){
        $('#wrapper').width($(window).width());
        $('body').width($(window).width());
    });
}

ShiftPlanning.prototype.globalLoader = function(){
    
}

ShiftPlanning.prototype.fixCheckboxes = function(){
    $('#pages .checkbox:visible').removeClass('failsafe');
    $('#pages .checkbox:visible').each(function(i, item){
	if ($(this).outerHeight(true) > 45){
	    $(this).addClass('failsafe');
	}
    });
}

ShiftPlanning.prototype.showSuccess = function(text){
    $('body').append('<div class="notification success hidden">' + text + '</div>');
    $('body > .notification').css('top', $(document).scrollTop());
    $('body > .notification').fadeIn('fast', function(){
        setTimeout(function(){
            $('body > .notification').fadeOut('fast', function(){
                $('body > .notification').remove();
            });
        }, 3000);
    });
}

ShiftPlanning.prototype.showError = function(text){
    $('body').append('<div class="notification error hidden">' + text + '</div>');
    $('body > .notification').css('top', $(document).scrollTop());
    $('body > .notification').fadeIn('fast', function(){
        setTimeout(function(){
            $('body > .notification').fadeOut('fast', function(){
                $('body > .notification').remove();
            });
        }, 3000);
    });
}

//Initalizing javascript library
var sp = new ShiftPlanning();
ShiftPlanning.prototype.staff = new ShiftPlanningStaff();
ShiftPlanning.prototype.schedule = new ShiftPlanningSchedule();
ShiftPlanning.prototype.dashboard = new ShiftPlanningDashboard();
ShiftPlanning.prototype.timeClock = new ShiftPlanningTimeClock();
ShiftPlanning.prototype.reports = new ShiftPlanningReports();
ShiftPlanning.prototype.requests = new ShiftPlanningRequests();
ShiftPlanning.prototype.location = new ShiftPlanningLocation();
ShiftPlanning.prototype.permissions = new ShiftPlanningPermissions();
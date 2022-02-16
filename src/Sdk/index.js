!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["@zilla/connect.js"]=t():e["@zilla/connect.js"]=t()}(this,(function(){return(()=>{var e={364:(e,t,n)=>{"use strict";var r=n(288);const o=n(669),i=()=>{},a=e=>{throw new Error(`${e} is required`)};function s(){if(!(this instanceof s))return new s}s.prototype.openById=function({publicKey:e,orderCode:t,onClose:n=i,onSuccess:l,onLoad:d=i,onEvent:c=i,...u}){"object"!=typeof arguments[0]&&console.warn(`DEPRECATED: ZILLA CONNECT EXPECTED 1 ARGUMENT, BUT GOT ${arguments.length}`),this.orderCode=t||a("ORDER_CODE"),this.publicKey=e||a("PUBLIC KEY"),this.config={...u},s.prototype.onLoad=d,s.prototype.onClose=n,s.prototype.onSuccess=l||a("onSuccess callback"),s.prototype.onEvent=c,s.prototype.utils=r(),s.prototype.utils.addStyle(),s.prototype.utils.addLoader(),o.get(`https://bnpl-gateway-dev.zilla.africa/sdk/bnpl/purchase-order/${t}/valid-for-payment`,{headers:{"public-key":s.prototype.utils.encodePublicKey(this.publicKey)}}).then((({data:e})=>{let t={type:"zilla.valid_order",data:{timestamp:Date.now()}};this.onEvent("ORDER_VALID",t.data),e.data.validForPayment&&(s.prototype.utils.init({paymentLink:e.data.paymentLink,onload:this.onLoad,onevent:this.onEvent}),s.prototype.open())})).catch((()=>{let e={type:"zilla.order_invalid",data:{data:"error validation orderCode",timestamp:Date.now()}};this.onEvent("ERROR",e.data),alert("error processing order"),s.prototype.close()}))},s.prototype.openNew=function({publicKey:e,amount:t,clientOrderReference:n,title:l,productCategory:d,redirectUrl:c,onClose:u=i,onSuccess:p,onLoad:f=i,onEvent:h=i,...m}){"object"!=typeof arguments[0]&&console.warn(`DEPRECATED: ZILLA CONNECT EXPECTED 1 ARGUMENT, BUT GOT ${arguments.length}`),this.publicKey=e||a("PUBLIC KEY"),this.amount=t||a("AMOUNT"),this.title=l||a("TITLE"),this.clientOrderReference=n||a("CLIENT_ORDER_REFERENCE"),this.config={...m},this.productCategory=d,this.redirectUrl=c,s.prototype.onLoad=f,s.prototype.onClose=u,s.prototype.onSuccess=p||a("onSuccess callback"),s.prototype.onEvent=h,s.prototype.utils=r(),s.prototype.utils.addStyle(),s.prototype.utils.addLoader(),o.post("https://bnpl-gateway-dev.zilla.africa/sdk/bnpl/purchase-order/create-with-pk",{amount:this.amount,title:this.title,clientOrderReference:this.clientOrderReference,productCategory:this.productCategory,redirectUrl:this.redirectUrl},{headers:{"public-key":s.prototype.utils.encodePublicKey(this.publicKey)}}).then((({data:e})=>{let t={type:"zilla.valid_order",data:{timestamp:Date.now()}};this.onEvent("ORDER_VALID",t.data),s.prototype.utils.init({paymentLink:e.data.paymentLink,onload:this.onLoad,onevent:this.onEvent}),s.prototype.open()})).catch((()=>{let e={type:"zilla.order_invalid",data:{data:"error creating order",timestamp:Date.now()}};this.onEvent("ERROR",e.data),s.prototype.close(),alert("error processing order")}))},s.prototype.open=function(){s.prototype.utils.openWidget(),s.prototype.eventHandler=function(e){switch(e.data.type){case"zilla.widget.closed":this.onEvent("CLOSE_WIDGET",e.data.data),window.removeEventListener("message",this.eventHandler,!1),s.prototype.utils.closeWidget(),this.onClose();break;case"zilla.completed_payment":this.onSuccess(e.data.data),this.onEvent("SUCCESS",e.data.data),s.prototype.close();break;case"zilla.event":this.onEvent("EVENT",e.data.data);break;case"Zilla.error":this.onEvent("ERROR",e.data.data)}}.bind(this),window.addEventListener("message",this.eventHandler,!1)},s.prototype.close=function(){window.removeEventListener("message",this.eventHandler,!1),s.prototype.utils.closeWidget(),this.onClose()},"undefined"!=typeof window&&(window.Connect=s),e.exports=s},669:(e,t,n)=>{e.exports=n(609)},448:(e,t,n)=>{"use strict";var r=n(867),o=n(26),i=n(372),a=n(327),s=n(97),l=n(109),d=n(985),c=n(61),u=n(655),p=n(263);e.exports=function(e){return new Promise((function(t,n){var f,h=e.data,m=e.headers,y=e.responseType;function v(){e.cancelToken&&e.cancelToken.unsubscribe(f),e.signal&&e.signal.removeEventListener("abort",f)}r.isFormData(h)&&delete m["Content-Type"];var g=new XMLHttpRequest;if(e.auth){var b=e.auth.username||"",w=e.auth.password?unescape(encodeURIComponent(e.auth.password)):"";m.Authorization="Basic "+btoa(b+":"+w)}var E=s(e.baseURL,e.url);function x(){if(g){var r="getAllResponseHeaders"in g?l(g.getAllResponseHeaders()):null,i={data:y&&"text"!==y&&"json"!==y?g.response:g.responseText,status:g.status,statusText:g.statusText,headers:r,config:e,request:g};o((function(e){t(e),v()}),(function(e){n(e),v()}),i),g=null}}if(g.open(e.method.toUpperCase(),a(E,e.params,e.paramsSerializer),!0),g.timeout=e.timeout,"onloadend"in g?g.onloadend=x:g.onreadystatechange=function(){g&&4===g.readyState&&(0!==g.status||g.responseURL&&0===g.responseURL.indexOf("file:"))&&setTimeout(x)},g.onabort=function(){g&&(n(c("Request aborted",e,"ECONNABORTED",g)),g=null)},g.onerror=function(){n(c("Network Error",e,null,g)),g=null},g.ontimeout=function(){var t=e.timeout?"timeout of "+e.timeout+"ms exceeded":"timeout exceeded",r=e.transitional||u.transitional;e.timeoutErrorMessage&&(t=e.timeoutErrorMessage),n(c(t,e,r.clarifyTimeoutError?"ETIMEDOUT":"ECONNABORTED",g)),g=null},r.isStandardBrowserEnv()){var k=(e.withCredentials||d(E))&&e.xsrfCookieName?i.read(e.xsrfCookieName):void 0;k&&(m[e.xsrfHeaderName]=k)}"setRequestHeader"in g&&r.forEach(m,(function(e,t){void 0===h&&"content-type"===t.toLowerCase()?delete m[t]:g.setRequestHeader(t,e)})),r.isUndefined(e.withCredentials)||(g.withCredentials=!!e.withCredentials),y&&"json"!==y&&(g.responseType=e.responseType),"function"==typeof e.onDownloadProgress&&g.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&g.upload&&g.upload.addEventListener("progress",e.onUploadProgress),(e.cancelToken||e.signal)&&(f=function(e){g&&(n(!e||e&&e.type?new p("canceled"):e),g.abort(),g=null)},e.cancelToken&&e.cancelToken.subscribe(f),e.signal&&(e.signal.aborted?f():e.signal.addEventListener("abort",f))),h||(h=null),g.send(h)}))}},609:(e,t,n)=>{"use strict";var r=n(867),o=n(849),i=n(321),a=n(185);var s=function e(t){var n=new i(t),s=o(i.prototype.request,n);return r.extend(s,i.prototype,n),r.extend(s,n),s.create=function(n){return e(a(t,n))},s}(n(655));s.Axios=i,s.Cancel=n(263),s.CancelToken=n(972),s.isCancel=n(502),s.VERSION=n(636).version,s.all=function(e){return Promise.all(e)},s.spread=n(713),s.isAxiosError=n(268),e.exports=s,e.exports.default=s},263:e=>{"use strict";function t(e){this.message=e}t.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},t.prototype.__CANCEL__=!0,e.exports=t},972:(e,t,n)=>{"use strict";var r=n(263);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise((function(e){t=e}));var n=this;this.promise.then((function(e){if(n._listeners){var t,r=n._listeners.length;for(t=0;t<r;t++)n._listeners[t](e);n._listeners=null}})),this.promise.then=function(e){var t,r=new Promise((function(e){n.subscribe(e),t=e})).then(e);return r.cancel=function(){n.unsubscribe(t)},r},e((function(e){n.reason||(n.reason=new r(e),t(n.reason))}))}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.prototype.subscribe=function(e){this.reason?e(this.reason):this._listeners?this._listeners.push(e):this._listeners=[e]},o.prototype.unsubscribe=function(e){if(this._listeners){var t=this._listeners.indexOf(e);-1!==t&&this._listeners.splice(t,1)}},o.source=function(){var e;return{token:new o((function(t){e=t})),cancel:e}},e.exports=o},502:e=>{"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},321:(e,t,n)=>{"use strict";var r=n(867),o=n(327),i=n(782),a=n(572),s=n(185),l=n(875),d=l.validators;function c(e){this.defaults=e,this.interceptors={request:new i,response:new i}}c.prototype.request=function(e){"string"==typeof e?(e=arguments[1]||{}).url=arguments[0]:e=e||{},(e=s(this.defaults,e)).method?e.method=e.method.toLowerCase():this.defaults.method?e.method=this.defaults.method.toLowerCase():e.method="get";var t=e.transitional;void 0!==t&&l.assertOptions(t,{silentJSONParsing:d.transitional(d.boolean),forcedJSONParsing:d.transitional(d.boolean),clarifyTimeoutError:d.transitional(d.boolean)},!1);var n=[],r=!0;this.interceptors.request.forEach((function(t){"function"==typeof t.runWhen&&!1===t.runWhen(e)||(r=r&&t.synchronous,n.unshift(t.fulfilled,t.rejected))}));var o,i=[];if(this.interceptors.response.forEach((function(e){i.push(e.fulfilled,e.rejected)})),!r){var c=[a,void 0];for(Array.prototype.unshift.apply(c,n),c=c.concat(i),o=Promise.resolve(e);c.length;)o=o.then(c.shift(),c.shift());return o}for(var u=e;n.length;){var p=n.shift(),f=n.shift();try{u=p(u)}catch(e){f(e);break}}try{o=a(u)}catch(e){return Promise.reject(e)}for(;i.length;)o=o.then(i.shift(),i.shift());return o},c.prototype.getUri=function(e){return e=s(this.defaults,e),o(e.url,e.params,e.paramsSerializer).replace(/^\?/,"")},r.forEach(["delete","get","head","options"],(function(e){c.prototype[e]=function(t,n){return this.request(s(n||{},{method:e,url:t,data:(n||{}).data}))}})),r.forEach(["post","put","patch"],(function(e){c.prototype[e]=function(t,n,r){return this.request(s(r||{},{method:e,url:t,data:n}))}})),e.exports=c},782:(e,t,n)=>{"use strict";var r=n(867);function o(){this.handlers=[]}o.prototype.use=function(e,t,n){return this.handlers.push({fulfilled:e,rejected:t,synchronous:!!n&&n.synchronous,runWhen:n?n.runWhen:null}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,(function(t){null!==t&&e(t)}))},e.exports=o},97:(e,t,n)=>{"use strict";var r=n(793),o=n(303);e.exports=function(e,t){return e&&!r(t)?o(e,t):t}},61:(e,t,n)=>{"use strict";var r=n(481);e.exports=function(e,t,n,o,i){var a=new Error(e);return r(a,t,n,o,i)}},572:(e,t,n)=>{"use strict";var r=n(867),o=n(527),i=n(502),a=n(655),s=n(263);function l(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new s("canceled")}e.exports=function(e){return l(e),e.headers=e.headers||{},e.data=o.call(e,e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers),r.forEach(["delete","get","head","post","put","patch","common"],(function(t){delete e.headers[t]})),(e.adapter||a.adapter)(e).then((function(t){return l(e),t.data=o.call(e,t.data,t.headers,e.transformResponse),t}),(function(t){return i(t)||(l(e),t&&t.response&&(t.response.data=o.call(e,t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)}))}},481:e=>{"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e.isAxiosError=!0,e.toJSON=function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}},e}},185:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){t=t||{};var n={};function o(e,t){return r.isPlainObject(e)&&r.isPlainObject(t)?r.merge(e,t):r.isPlainObject(t)?r.merge({},t):r.isArray(t)?t.slice():t}function i(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(e[n],t[n])}function a(e){if(!r.isUndefined(t[e]))return o(void 0,t[e])}function s(n){return r.isUndefined(t[n])?r.isUndefined(e[n])?void 0:o(void 0,e[n]):o(void 0,t[n])}function l(n){return n in t?o(e[n],t[n]):n in e?o(void 0,e[n]):void 0}var d={url:a,method:a,data:a,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:l};return r.forEach(Object.keys(e).concat(Object.keys(t)),(function(e){var t=d[e]||i,o=t(e);r.isUndefined(o)&&t!==l||(n[e]=o)})),n}},26:(e,t,n)=>{"use strict";var r=n(61);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},527:(e,t,n)=>{"use strict";var r=n(867),o=n(655);e.exports=function(e,t,n){var i=this||o;return r.forEach(n,(function(n){e=n.call(i,e,t)})),e}},655:(e,t,n)=>{"use strict";var r=n(867),o=n(16),i=n(481),a={"Content-Type":"application/x-www-form-urlencoded"};function s(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var l,d={transitional:{silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},adapter:(("undefined"!=typeof XMLHttpRequest||"undefined"!=typeof process&&"[object process]"===Object.prototype.toString.call(process))&&(l=n(448)),l),transformRequest:[function(e,t){return o(t,"Accept"),o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(s(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)||t&&"application/json"===t["Content-Type"]?(s(t,"application/json"),function(e,t,n){if(r.isString(e))try{return(t||JSON.parse)(e),r.trim(e)}catch(e){if("SyntaxError"!==e.name)throw e}return(n||JSON.stringify)(e)}(e)):e}],transformResponse:[function(e){var t=this.transitional||d.transitional,n=t&&t.silentJSONParsing,o=t&&t.forcedJSONParsing,a=!n&&"json"===this.responseType;if(a||o&&r.isString(e)&&e.length)try{return JSON.parse(e)}catch(e){if(a){if("SyntaxError"===e.name)throw i(e,this,"E_JSON_PARSE");throw e}}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],(function(e){d.headers[e]={}})),r.forEach(["post","put","patch"],(function(e){d.headers[e]=r.merge(a)})),e.exports=d},636:e=>{e.exports={version:"0.24.0"}},849:e=>{"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},327:(e,t,n)=>{"use strict";var r=n(867);function o(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var a=[];r.forEach(t,(function(e,t){null!=e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,(function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),a.push(o(t)+"="+o(e))})))})),i=a.join("&")}if(i){var s=e.indexOf("#");-1!==s&&(e=e.slice(0,s)),e+=(-1===e.indexOf("?")?"?":"&")+i}return e}},303:e=>{"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},372:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,a){var s=[];s.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&s.push("expires="+new Date(n).toGMTString()),r.isString(o)&&s.push("path="+o),r.isString(i)&&s.push("domain="+i),!0===a&&s.push("secure"),document.cookie=s.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},793:e=>{"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},268:e=>{"use strict";e.exports=function(e){return"object"==typeof e&&!0===e.isAxiosError}},985:(e,t,n)=>{"use strict";var r=n(867);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},16:(e,t,n)=>{"use strict";var r=n(867);e.exports=function(e,t){r.forEach(e,(function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])}))}},109:(e,t,n)=>{"use strict";var r=n(867),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,a={};return e?(r.forEach(e.split("\n"),(function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(a[t]&&o.indexOf(t)>=0)return;a[t]="set-cookie"===t?(a[t]?a[t]:[]).concat([n]):a[t]?a[t]+", "+n:n}})),a):a}},713:e=>{"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},875:(e,t,n)=>{"use strict";var r=n(636).version,o={};["object","boolean","number","function","string","symbol"].forEach((function(e,t){o[e]=function(n){return typeof n===e||"a"+(t<1?"n ":" ")+e}}));var i={};o.transitional=function(e,t,n){function o(e,t){return"[Axios v"+r+"] Transitional option '"+e+"'"+t+(n?". "+n:"")}return function(n,r,a){if(!1===e)throw new Error(o(r," has been removed"+(t?" in "+t:"")));return t&&!i[r]&&(i[r]=!0,console.warn(o(r," has been deprecated since v"+t+" and will be removed in the near future"))),!e||e(n,r,a)}},e.exports={assertOptions:function(e,t,n){if("object"!=typeof e)throw new TypeError("options must be an object");for(var r=Object.keys(e),o=r.length;o-- >0;){var i=r[o],a=t[i];if(a){var s=e[i],l=void 0===s||a(s,i,e);if(!0!==l)throw new TypeError("option "+i+" must be "+l)}else if(!0!==n)throw Error("Unknown option "+i)}},validators:o}},867:(e,t,n)=>{"use strict";var r=n(849),o=Object.prototype.toString;function i(e){return"[object Array]"===o.call(e)}function a(e){return void 0===e}function s(e){return null!==e&&"object"==typeof e}function l(e){if("[object Object]"!==o.call(e))return!1;var t=Object.getPrototypeOf(e);return null===t||t===Object.prototype}function d(e){return"[object Function]"===o.call(e)}function c(e,t){if(null!=e)if("object"!=typeof e&&(e=[e]),i(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:i,isArrayBuffer:function(e){return"[object ArrayBuffer]"===o.call(e)},isBuffer:function(e){return null!==e&&!a(e)&&null!==e.constructor&&!a(e.constructor)&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)},isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:s,isPlainObject:l,isUndefined:a,isDate:function(e){return"[object Date]"===o.call(e)},isFile:function(e){return"[object File]"===o.call(e)},isBlob:function(e){return"[object Blob]"===o.call(e)},isFunction:d,isStream:function(e){return s(e)&&d(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product&&"NativeScript"!==navigator.product&&"NS"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)},forEach:c,merge:function e(){var t={};function n(n,r){l(t[r])&&l(n)?t[r]=e(t[r],n):l(n)?t[r]=e({},n):i(n)?t[r]=n.slice():t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,(function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t})),e},trim:function(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")},stripBOM:function(e){return 65279===e.charCodeAt(0)&&(e=e.slice(1)),e}}},288:e=>{"use strict";e.exports=()=>{function e(){let e=document.createElement("div"),t=document.createElement("div");e.setAttribute("id","zilla-app-loader"),e.classList.add("app-loader"),t.classList.add("app-loader__spinner");for(let e=0;e<12;e++){let e=document.createElement("div");t.appendChild(e)}return e.appendChild(t),e}return{openWidget:function(){var e=document.getElementById("zilla--widget-div"),t=document.getElementById("zilla-app-loader"),n=document.getElementById("zilla--frame-id");e.style.visibility="visible",e.style.display="flex",t.style.display="block",setTimeout((()=>{!function(){var e=document.getElementById("zilla--widget-div"),t=document.getElementById("zilla--frame-id");e.style.display="flex",t.style.display="block",e.style.visibility="visible",t.style.visibility="visible"}(),n.focus({preventScroll:!1}),e.focus({preventScroll:!1});let t=new Event("message"),r={type:"zilla.widget_opened",data:{timestamp:Date.now()}};t.data=Object.assign({},r),window.dispatchEvent(t)}),2e3)},closeWidget:function(){!function(){if(document.getElementById("zilla--frame-id")){var e=document.getElementById("zilla--frame-id");e.style.display="none",e.style.visibility="hidden"}var t=document.getElementById("zilla--widget-div");t.classList.add("remove-widget"),t.style.display="none",t.style.visibility="hidden"}()},createLoader:e,addStyle:function(){let e=document.createElement("style");e.type="text/css",e.innerText=r,document.head.appendChild(e)},addLoader:function(){document.getElementById("zilla--widget-div")&&document.getElementById("zilla--frame-id")&&document.getElementById("zilla--widget-div").remove();var n=document.createElement("div"),r=e();n.setAttribute("id","zilla--widget-div"),n.setAttribute("style",t),document.body.insertBefore(n,document.body.childNodes[0]),document.getElementById("zilla--widget-div").appendChild(r),n.style.visibility="visible",n.style.display="flex",r.style.display="block"},encodePublicKey:function(e){return window.btoa(unescape(encodeURIComponent(e)))},init:function(e){const{onload:t,paymentLink:r,onevent:o}=e;let i=`${r}?type=sdk`;var a=document.createElement("IFRAME");a.src=i,a.setAttribute("style",n),a.setAttribute("id","zilla--frame-id"),a.setAttribute("allowfullscreen","true"),a.setAttribute("frameborder",0),a.setAttribute("title","Zilla checkout"),a.setAttribute("sandbox","allow-forms allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-popups"),a.onload=function(){var e=document.getElementById("zilla-app-loader");"visible"===a.style.visibility&&(e.style.display="none"),t();let n=new Event("message"),r={type:"zilla.widget_loaded",data:{timestamp:Date.now()}};n.data=Object.assign({},r),window.dispatchEvent(n),o("LOADED",n.data.data)},document.getElementById("zilla--widget-div").appendChild(a)}}};const t="position:fixed;overflow: hidden;display: none;justify-content: center;align-items: center;z-index: 999999999;height: 100%;width: 100%;color: transparent;background: rgba(0, 0, 0, 0.6);visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;transition: all 0.3s linear;",n="position: fixed;overflow: hidden;z-index: 999999999;width: 100%;height: 100%;transition: opacity 0.3s ease 0s;visibility:hidden;margin: 0;top:0;right:0;bottom:0;left:0;",r=".app-loader {\n  text-align: center;\n  color: white;\n  margin-right: -30px;\n  width: 100%;\n  position: fixed;\n}\n.remove-widget{\n    opacity: 0;\n}\n@keyframes example {\n    from {background-color: red;}\n    to {background-color: yellow;}\n  }\n@-webkit-keyframes app-loader__spinner {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n.app-loader__spinner {\n  position: relative;\n  display: inline-block;\n  width: fit-content;\n}\n.app-loader__spinner div {\n  position: absolute;\n  -webkit-animation: app-loader__spinner linear 1s infinite;\n  animation: app-loader__spinner linear 1s infinite;\n  background: white;\n  width: 10px;\n  height: 30px;\n  border-radius: 40%;\n  -webkit-transform-origin: 5px 65px;\n  transform-origin: 5px 65px;\n}\n.app-loader__spinner div:nth-child(1) {\n  -webkit-transform: rotate(0deg);\n  transform: rotate(0deg);\n  -webkit-animation-delay: -0.916666666666667s;\n  animation-delay: -0.916666666666667s;\n}\n.app-loader__spinner div:nth-child(2) {\n  -webkit-transform: rotate(30deg);\n  transform: rotate(30deg);\n  -webkit-animation-delay: -0.833333333333333s;\n  animation-delay: -0.833333333333333s;\n}\n.app-loader__spinner div:nth-child(3) {\n  -webkit-transform: rotate(60deg);\n  transform: rotate(60deg);\n  -webkit-animation-delay: -0.75s;\n  animation-delay: -0.75s;\n}\n.app-loader__spinner div:nth-child(4) {\n  -webkit-transform: rotate(90deg);\n  transform: rotate(90deg);\n  -webkit-animation-delay: -0.666666666666667s;\n  animation-delay: -0.666666666666667s;\n}\n.app-loader__spinner div:nth-child(5) {\n  -webkit-transform: rotate(120deg);\n  transform: rotate(120deg);\n  -webkit-animation-delay: -0.583333333333333s;\n  animation-delay: -0.583333333333333s;\n}\n.app-loader__spinner div:nth-child(6) {\n  -webkit-transform: rotate(150deg);\n  transform: rotate(150deg);\n  -webkit-animation-delay: -0.5s;\n  animation-delay: -0.5s;\n}\n.app-loader__spinner div:nth-child(7) {\n  -webkit-transform: rotate(180deg);\n  transform: rotate(180deg);\n  -webkit-animation-delay: -0.416666666666667s;\n  animation-delay: -0.416666666666667s;\n}\n.app-loader__spinner div:nth-child(8) {\n  -webkit-transform: rotate(210deg);\n  transform: rotate(210deg);\n  -webkit-animation-delay: -0.333333333333333s;\n  animation-delay: -0.333333333333333s;\n}\n.app-loader__spinner div:nth-child(9) {\n  -webkit-transform: rotate(240deg);\n  transform: rotate(240deg);\n  -webkit-animation-delay: -0.25s;\n  animation-delay: -0.25s;\n}\n.app-loader__spinner div:nth-child(10) {\n  -webkit-transform: rotate(270deg);\n  transform: rotate(270deg);\n  -webkit-animation-delay: -0.166666666666667s;\n  animation-delay: -0.166666666666667s;\n}\n.app-loader__spinner div:nth-child(11) {\n  -webkit-transform: rotate(300deg);\n  transform: rotate(300deg);\n  -webkit-animation-delay: -0.083333333333333s;\n  animation-delay: -0.083333333333333s;\n}\n.app-loader__spinner div:nth-child(12) {\n  -webkit-transform: rotate(330deg);\n  transform: rotate(330deg);\n  -webkit-animation-delay: 0s;\n  animation-delay: 0s;\n}\n.app-loader__spinner {\n  -webkit-transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);\n  transform: translate(-20px, -20px) scale(0.2) translate(20px, 20px);\n}\n"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r](i,i.exports,n),i.exports}return n(288),n(364)})()}));
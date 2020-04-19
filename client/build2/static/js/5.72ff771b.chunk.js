(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[5],{186:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.geoPropTypes=t.geolocated=void 0;var r,n=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,o):{};r.get||r.set?Object.defineProperty(t,o,r):t[o]=e[o]}return t.default=e,t}(o(0)),a=(r=o(5))&&r.__esModule?r:{default:r};function i(e){return(i="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(){return(c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e}).apply(this,arguments)}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,o){return t&&u(e.prototype,t),o&&u(e,o),e}function d(e,t){return!t||"object"!==i(t)&&"function"!==typeof t?f(e):t}function p(e){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&y(e,t)}function y(e,t){return(y=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function b(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var g=function(e){return"Geolocated(".concat(e.displayName||e.name||"Component",")")};t.geolocated=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.positionOptions,o=void 0===t?{enableHighAccuracy:!0,maximumAge:0,timeout:1/0}:t,r=e.isOptimisticGeolocationEnabled,i=void 0===r||r,u=e.userDecisionTimeout,y=void 0===u?null:u,v=e.suppressLocationOnMount,h=void 0!==v&&v,O=e.watchPosition,E=void 0!==O&&O,_=e.geolocationProvider,j=void 0===_?"undefined"!==typeof navigator&&navigator.geolocation:_;return function(e){var t=function(t){function r(e){var t;return s(this,r),b(f(t=d(this,p(r).call(this,e))),"isCurrentlyMounted",!1),b(f(t),"cancelUserDecisionTimeout",(function(){t.userDecisionTimeoutId&&clearTimeout(t.userDecisionTimeoutId)})),b(f(t),"onPositionError",(function(e){t.cancelUserDecisionTimeout(),t.isCurrentlyMounted&&t.setState({coords:null,isGeolocationEnabled:!1,positionError:e}),t.props.onError&&t.props.onError(e)})),b(f(t),"onPositionSuccess",(function(e){t.cancelUserDecisionTimeout(),t.isCurrentlyMounted&&t.setState({coords:e.coords,isGeolocationEnabled:!0,positionError:null}),t.props.onSuccess&&t.props.onSuccess(e)})),b(f(t),"getLocation",(function(){if(!j||!j.getCurrentPosition||!j.watchPosition)throw new Error("The provided geolocation provider is invalid");var e=(E?j.watchPosition:j.getCurrentPosition).bind(j);y&&(t.userDecisionTimeoutId=setTimeout((function(){t.onPositionError()}),y)),t.watchId=e(t.onPositionSuccess,t.onPositionError,o)})),t.state={coords:null,isGeolocationAvailable:Boolean(j),isGeolocationEnabled:i,positionError:null},t}return m(r,t),l(r,[{key:"componentDidMount",value:function(){this.isCurrentlyMounted=!0,h||this.getLocation()}},{key:"componentWillUnmount",value:function(){this.isCurrentlyMounted=!1,this.cancelUserDecisionTimeout(),E&&j.clearWatch(this.watchId)}},{key:"render",value:function(){return n.default.createElement(e,c({},this.state,this.props))}}]),r}(n.Component);return t.displayName=g(e),t.propTypes={onError:a.default.func,onSuccess:a.default.func},t}};var v={coords:a.default.shape({latitude:a.default.number,longitude:a.default.number,altitude:a.default.number,accuracy:a.default.number,altitudeAccuracy:a.default.number,heading:a.default.number,speed:a.default.number}),isGeolocationAvailable:a.default.bool,isGeolocationEnabled:a.default.bool,positionError:a.default.shape({code:a.default.oneOf([1,2,3]),message:a.default.string}),watchPosition:a.default.bool};t.geoPropTypes=v},187:function(e,t,o){},188:function(e,t,o){},192:function(e,t,o){"use strict";o.r(t);var r=o(26),n=o(11),a=o(12),i=o(14),c=o(13),s=o(15),u=o(0),l=o.n(u),d=o(62),p=o(1),f=o(19),m=o.n(f),y=o(75);o.n(y).a.config();var b=window.location.href,g=o(186),v=function(e){function t(e){var o;return Object(n.a)(this,t),(o=Object(i.a)(this,Object(c.a)(t).call(this,e))).state={latitude:0,longitude:0,fullAddress:"",si:"",gu:"",dong:""},o}return Object(s.a)(t,e),Object(a.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){var o=!0;return this.state.latitude===t.latitude&&(o=!1),o}},{key:"componentDidUpdate",value:function(){var e=this,t=this.state,o=t.latitude,r=t.longitude;if(o>0){var n="https://dapi.kakao.com/v2/local/geo/coord2address.json?x="+r+"&y="+o+"&input_coord=WGS84";m.a.get(n,{headers:{Authorization:"KakaoAK b1e65b62b8c869dfb380e5edd7226199"}}).then((function(t){var o=t.data.documents[0].address.address_name;e.props.getGeolocation(o)})).catch((function(e){console.log(e)}))}}},{key:"render",value:function(){return null}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.coords&&0===t.latitude?{latitude:e.coords.latitude,longitude:e.coords.longitude}:null}}]),t}(u.Component),h=Object(g.geolocated)({positionOptions:{enableHighAccuracy:!1},userDecisionTimeout:5e3})(v),O=o(43),E=(o(187),function(e){var t=e.store,o=t.store_id,r=t.store_name,n=t.store_category,a=(t.store_hasBooking,t.store_promotionTitle,t.store_x,t.store_y,t.store_distance,t.store_imageSrc),i=(t.store_virtualPhone,t.store_phone),c=t.store_roadAddr,s=(t.store_commonAddr,t.store_addr,t.store_blogCafeReviewCount,t.store_bookingReviewCount,t.store_totalReviewCount),u=t.store_tags,d=t.store_priceCategory,p=(t.store_url,t.store_pk_address,t.date,"https://store.naver.com/restaurants/detail?id=".concat(o));return l.a.createElement("a",{href:p,target:"_blank"},l.a.createElement("div",{className:"store-card-wrap"},l.a.createElement("div",{className:"store-card"},l.a.createElement("div",{className:"store-card-image"},l.a.createElement("img",{src:a,alt:r})),l.a.createElement("div",{className:"store-card-contents"},l.a.createElement("div",{className:"store-card-name"},r),l.a.createElement("div",{className:"store-card-category"},n),l.a.createElement("div",{className:"store-card-address"},c),l.a.createElement("div",{className:"store-card-phone"},i),l.a.createElement("div",{className:"store-card-review"},"\uc804\uccb4 \ub9ac\ubdf0 \uac1c\uc218: ",s,"\uac1c"),l.a.createElement("div",{className:"store-card-tag"},u.length>0&&""!==u[0]?u.map((function(e){return"".concat(e,", ")})):"\ud0dc\uadf8 \uc5c6\uc74c"),l.a.createElement("div",{className:"store-card-priceCategory"},"\uac00\uaca9: ",d||"????")))))});o(188);function _(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}var j=function(e){function t(){var e,o;Object(n.a)(this,t);for(var a=arguments.length,s=new Array(a),u=0;u<a;u++)s[u]=arguments[u];return(o=Object(i.a)(this,(e=Object(c.a)(t)).call.apply(e,[this].concat(s)))).getGeolocation=function(e){if(-1===e)o.props.geolocationFailure("\ud604\uc7ac \uc0ac\uc6a9\uc911\uc778 \ube0c\ub77c\uc6b0\uc800\ub294 \uc704\uce58\ub97c \uac00\uc838\uc62c \uc218\uac00 \uc5c6\uc2b5\ub2c8\ub2e4.");else if(-2===e)o.props.geolocationFailure("\ud604\uc7ac\uc704\uce58 \uac00\uc838\uc624\uae30 \uae30\ub2a5\uc774 \ucc28\ub2e8\ub418\uc5c8\uc2b5\ub2c8\ub2e4.");else{var t=o.props.store.requestData;t=function(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?_(o,!0).forEach((function(t){Object(r.a)(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):_(o).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}({},t,{address:e}),o.props.geolocationSuccess(e),o.props.getStoreList(t)}},o}return Object(s.a)(t,e),Object(a.a)(t,[{key:"componentDidMount",value:function(){this.props.geolocationPending()}},{key:"render",value:function(){var e,t=this.props,o=t.geolocation,r=t.store,n=o.pending,a=o.error,i=o.errorMessage,c=r.pending,s=r.error,u=r.list;return a||s||!Object(O.a)(u.errors)?e=a?l.a.createElement("div",null,i):s?l.a.createElement("div",null," \uc2dd\uc0c1 \ubaa9\ub85d\uc744 \ubd88\ub7ec \uc62c \uc218 \uc5c6\uc2b5\ub2c8\ub2e4. \ubb38\uc81c\uac00 \uc9c0\uc18d \ub420 \uacbd\uc6b0 \uad00\ub9ac\uc790\uc5d0\uac8c \ubb38\uc758\ud574\uc8fc\uc138\uc694."):l.a.createElement("div",null,u.errors.crawling_error):n||c?e=l.a.createElement("div",null," \ub85c\ub529\uc911..."):(u=u.result)&&(e=l.a.createElement("div",{className:"card-wrap"},u.map((function(e,t){return l.a.createElement(E,{store:e,key:"store_".concat(t)})})))),l.a.createElement("div",{className:"StoreContainer"},l.a.createElement(h,{getGeolocation:this.getGeolocation}),e)}}]),t}(u.Component);t.default=Object(d.b)((function(e){return{geolocation:e.geolocation,store:e.store}}),{geolocationPending:function(){return function(e){e({type:p.e})}},geolocationSuccess:function(e){return function(t){t({type:p.f,payload:e})}},geolocationFailure:function(e){return function(t){t({type:p.d,payload:e})}},getStoreList:function(e){return function(t){t({type:p.a,payload:e}),t({type:p.h});var o="http://localhost:4000";-1===b.indexOf("localhost")&&(o="http://13.209.228.126:4000"),m.a.post("".concat(o,"/api/store/list"),e).then((function(e){t({type:p.i,payload:e.data.data})})).catch((function(e){t({type:p.c,payload:e.response.data.errors})}))}},updateAddress:function(e){return function(t){t({type:p.a,payload:e})}}})(j)}}]);
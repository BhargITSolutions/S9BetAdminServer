Handlebars.registerHelper("xif",function(e,r){return Handlebars.helpers.x.apply(this,[e,r])?r.fn(this):r.inverse(this)}),Handlebars.registerHelper("x",function(expression,options){var result,context=this;with(context)result=function(){try{return eval(expression)}catch(e){console.warn("â€¢Expression: {{x '"+expression+"'}}\nâ€¢JS-Error: ",e,"\nâ€¢Context: ",context)}}.call(context);return result}),Handlebars.registerHelper("z",function(){var e=arguments[arguments.length-1];return delete arguments[arguments.length-1],Handlebars.helpers.x.apply(this,[Array.prototype.slice.call(arguments,0).join(""),e])}),Handlebars.registerHelper("zif",function(){var e=arguments[arguments.length-1];return delete arguments[arguments.length-1],Handlebars.helpers.x.apply(this,[Array.prototype.slice.call(arguments,0).join(""),e])?e.fn(this):e.inverse(this)}),util={prop:function(){if("string"==typeof props&&(props=props.split(".")),!props||!props.length)return obj;if(obj&&Object.prototype.hasOwnProperty.call(obj,props[0])){var e=obj[props[0]];return props.shift(),util.prop(e,props)}return null},isNumber:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},daysInMonth:function(e,r){return r=r||(new Date).getFullYear(),/8|3|5|10/.test(e)?30:1==e?(r%4||!(r%100))&&r%400?28:29:31},uppercaseFirstLetter:function(e){return e||(e=""),e.charAt(0).toUpperCase()+e.slice(1)},hasNumber:function(e){return!isNaN(parseFloat(e))},truncate:function(e,r){return"string"!=typeof e?e:(r=util.isNumber(r)?r:20,e.length<=r?e:e.substr(0,r-3)+"...")}},Handlebars.registerHelper("u",function(){var e="",r=Array.prototype.slice.call(arguments,0);if(r.length&&(e=r[0],r.shift(),r.pop()),util.hasOwnProperty(e))return"function"==typeof util[e]?util[e].apply(util,r):util[e];log.error("util."+e+" is not a function nor a property")}),Handlebars.registerHelper("uif",function(){var e=arguments[arguments.length-1];return Handlebars.helpers.u.apply(this,arguments)?e.fn(this):e.inverse(this)}),Handlebars.registerHelper("g",function(){var e,r;if(arguments.length&&(e=arguments[0],delete arguments[0],delete arguments[arguments.length-1]),null!=(r=util.prop(window,e)))return"function"==typeof r?r.apply({},arguments):r;log.warn("window."+e+" is not a function nor a property")}),Handlebars.registerHelper("gif",function(){var e=arguments[arguments.length-1];return Handlebars.helpers.g.apply(this,arguments)?e.fn(this):e.inverse(this)}),Handlebars.registerHelper("geach",function(e,r){var t=util.prop(window,arguments[0]);return _.isArray(t)||(t=[]),Handlebars.helpers.each.apply(this,[t,r])});
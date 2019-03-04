'use strict';(function(a){'use strict';function b(a,b){return b.randomize?a.sort(function(){return .5<Math.random()?1:-1}):a}function c(b,c,d,e){function f(){b.trigger('open.keypad',[c])}if(a.isArray(d))c.appendTo(document.body).css({position:'fixed',left:d[0]+'px',top:d[1]+'px'}).fadeIn('fast',f);else if('string'===a.type(d))if(0===d.indexOf('custom'))c.addClass(d).appendTo(e||document.body).fadeIn('fast',f);else{var g=b.offset();c.insertAfter(b).css({position:'absolute',left:g.left,top:g.top+('up'===d?-c.height():b.height()+parseInt(b.css('border-width-top'))+parseInt(b.css('padding-bottom'))+parseInt(b.css('padding-bottom')))})['up'===d?'fadeIn':'slideDown']('fast',f)}}function d(a){return'<a class="btn backspace">'+a.textBackspace+'</a><a class="btn clear">'+a.textClear+'</a><a class="btn ok">'+a.textOK+'</a>'}function e(a){return a?' style="font-size: '+a+'px"':''}function f(a){return' '===a?'&nbsp;':'&'===a?'&amp;':'>'===a?'&gt;':'<'===a?'&lt;':a}function g(b,c,d){'p'==d.pad?h(b,c,d):b.on('click touchend','a',function(){var e=a(this);if(e.is('.disabled')||e.is('.blank'))return!1;if(!e.is('.btn')){var f=e.is('.space')?' ':e.text(),g=c.val()+f,h=g.length,i=d.length||Infinity;if(d.valid&&!1===d.valid(g,f,h-1,h>=i))return c.addClass('keypad-error'),setTimeout(function(){c.removeClass('keypad-error'),c.trigger('error.keypad')},d.errorTime),!1;c.val(g),l(b,c,d)}else if(e.is('.backspace')){var k=c.val();c.val(k.substr(0,k.length-1)),b.find('a.disabled').removeClass('disabled'),c.trigger('backspace.keypad')}else if(e.is('.clear'))c.val(''),b.find('a.disabled').removeClass('disabled'),c.trigger('clear.keypad');else if(e.is('.ok'))m(c,b,d);else if(e.is('.capital')){var j=e.text()===d.textLowerCase;b.find('.letters>a').each(function(){var b=a(this);b.text(b.text()[j?'toLowerCase':'toUpperCase']())}),e.text(d[j?'textUpperCase':'textLowerCase'])}return c.trigger('input.keypad',[b,this]),!1})}function h(b,c,d){b.on('click touchend','a',function(){var e=a(this);if(e.is('.disabled')||e.is('.blank'))return!1;var f=b.find('div.input>label');if(e.is('.aux'))i(c,e.text(),d),l(b,c,d);else if(e.is('.btn')){if(e.is('.backspace')){var n=f.text();if(''!=n)f.text(n.substr(0,n.length-1)),j(b,d);else{var o=c.val();c.val(o.substr(0,o.length-1)),b.find('a.disabled').removeClass('disabled'),c.trigger('backspace.keypad')}}else if(e.is('.clear'))f.text(''),j(b,d),c.val(''),b.find('a.disabled').removeClass('disabled'),c.trigger('clear.keypad');else if(e.is('.ok'))m(c,b,d);else if(e.is('.capital')){var g=e.text()===d.textLowerCase;b.find('.letters>a').each(function(){var b=a(this);b.text(b.text()[g?'toLowerCase':'toUpperCase']())}),e.text(d[g?'textUpperCase':'textLowerCase'])}}else if(0<e.closest('.input').length&&'DD'==e.parent()[0].tagName){var p=b.find('.input dd>a.selected');0<p.length?p.parent().index()==e.parent().index()?e.removeClass('selected'):(e.closest('.input').find('a').removeClass('selected'),e.addClass('selected')):e.addClass('selected'),j(b,d)}else if(0<e.closest('.input').length||e.is('.space')){var q=e.is('.space')?' ':e.text();i(c,q,d),e.is('.space')||(f.text(''),b.find('div.input a.selected').removeClass('selected'),j(b,d)),l(b,c,d)}else{var h=e.text(),k=f.text();f.text(k+h),j(b,d),l(b,c,d)}return c.trigger('input.keypad',[b,this]),!1}),b.on('click touchend','div.input>div i.expand',function(){return a(this).closest('div.input>div').toggleClass('all'),this.innerText='\u25B6'===this.innerText?'\u25BC':'\u25B6',!1}).on('click touchend','div.input>div i.down',function(){var b=a(this).parent().find('div').length-1,c=a(this).parent().find('div:visible');return 0<c.next('div').length&&(c.hide().next('div').show(),a(this).prev().removeClass('disabled'),c.index()+1==b&&a(this).addClass('disabled')),!1}).on('click touchend','div.input>div i.up',function(){var b=a(this).parent().find('div:visible');return 0<b.prev('div').length&&(b.hide().prev('div').show(),a(this).next().removeClass('disabled'),1==b.index()&&a(this).addClass('disabled')),!1})}function i(a,b,c){var d=a.val()+b,e=d.length,f=c.length||Infinity;return c.valid&&!1===c.valid(d,b,e-1,e>=f)?(a.addClass('keypad-error'),setTimeout(function(){a.removeClass('keypad-error'),a.trigger('error.keypad')},c.errorTime),!1):void a.val(d)}function j(a,b){var c=a.find('div.input>label').text(),d=a.find('div.input a.selected'),e=0<d.length?d.parent().index()+1:'cu';k(c,e,b).then(function(b){var c=10,d=4,e=b.split(''),f=e.map(function(a,b){return(0==b||1==(b+1)%(c*d)?'<div>':'')+'<a>'+a+'</a>'+(0==(b+1)%(c*d)||b==e.length-1?'</div>':'')}).join(''),g='\n        '+(e.length>c?'<i class="expand">\u25B6</i>':'')+'\n        '+(e.length>c*d?'<i class="up disabled">\u2191</i><i class="down">\u2193</i>':'')+'\n      ',h=a.find('div.input>div').html(f+g);h.removeClass('all').find('div:gt(0)').hide()})}function k(b,c,d){var e=function(){c=c||'cu';var a=o[b]||'';return''!=a&&(a=a[c]||''),''!=a&&'cu'!=c&&(a=a[1]),a};return new Promise(function(b){o==void 0?a.getJSON(d.pdict,function(a){o=a,b(e())}):b(e())})}function l(a,b,c){0<c.length&&b.val().length>=c.length&&a.find('a:not(.btn)').addClass('disabled')}function m(b,c,d){if(c||(c=b.data('keypad')),a(document.body).off('keydown.keypad'),c){var e=c.data('value');d&&!1===d.autoClose?c.data('value',b.val()):(b.removeClass('keypad-editing').removeData('keypad'),c.remove(),b.trigger('close.keypad',[c])),b.trigger('enter.keypad',[e]),b.val()!==e&&b.trigger('change',[e])}}function n(b){b.removeClass('keypad keypad-editing').off('focus.keypad'),a(document.body).off('keydown.keypad');var c=b.data('keypad');c&&(c.remove(),b.removeData('keypad'))}var o,p={pad:'n',length:-1,aux:'',position:'down',textUpperCase:'\u5927\u5199',textLowerCase:'\u5C0F\u5199',textSpace:'\u7A7A\u683C',textBackspace:'\u9000\u683C',textClear:'\u6E05\u9664',textOK:'\u786E\u5B9A',errorTime:500,autoClose:!0},q={n:function n(c){var g=b(['1','2','3','4','5','6','7','8','9','0'],c);return g.splice(9,0,c.aux.charAt(0)||' '),g.push(c.aux.charAt(1)||' '),a('<div class="keypad number"'+e(c.size)+'><div>'+a.map(g,function(a){return'<a'+(' '===a?' class="blank"':'')+'>'+f(a)+'</a>'}).join('')+d(c))},a:function a(g){var c='<div class="keypad alphabet"'+e(g.size)+'>';g.aux&&(c+='<div class="numbers">'+a.map(g.aux.split(''),function(d){return'n'===d?a.map(b(['1','2','3','4','5','6','7','8','9','0'],g),function(a){return'<a>'+a+'</a>'}).join(''):'<a>'+f(d)+'</a>'}).join('')+'</div>');var h=g.qwerty?'QWERTYUIOP,ASDFGHJKL,ZXCVBNM':g.letters||'ABCDEFGHIJKLMNOPQRSTUVWXYZ';return!1===g.capital&&(h=h.toLowerCase()),a.each(h.split(','),function(d,e){c+='<div class="letters">'+a.map(b(e.split(''),g),function(a){return'<a>'+a+'</a>'}).join('')+'</div>'}),c+='<div class="buttons">'+(void 0===g.capital?'<a class="btn capital">'+g.textLowerCase+'</a>':'')+(g.space?'<a class="space">'+g.textSpace+'</a>':'')+d(g)+'</div>',c+='</div>',a(c)},p:function p(c){var f='<div class="keypad pinyin"'+e(c.size)+'>';f+='<div class="input">\n        <label></label>\n        <dl><dd><a>\u02C9</a></dd><dd><a>\u02CA</a></dd><dd><a>\u02C7</a></dd><dd><a>\u02CB</a></dd></dl>\n        <div></div>\n      </div>';var g='QWERTYUIOP,ASDFGHJKL,ZXCVBNM';return!1===c.capital&&(g=g.toLowerCase()),a.each(g.split(','),function(d,e){f+='<div class="letters">'+a.map(b(e.split(''),c),function(a){return'<a>'+a+'</a>'}).join('')+'</div>'}),f+='<div class="buttons">'+(void 0===c.capital?'<a class="btn capital">'+c.textLowerCase+'</a>':'')+(c.space?'<a class="space">'+c.textSpace+'</a>':'')+(c.aux?c.aux.split('').map(function(a){return'<a class="btn aux">'+a+'</a>'}).join(''):'')+d(c)+'</div>',f+='</div>',a(f)}};a.fn.keypad=function(b){return this.each(function(){var d=a(this);if('destroy'===b)return n(d);if('close'===b)return m(d);if(!d.hasClass('keypad')){var e=a.extend({},p,d.data(),{length:d.prop('maxlength')},b);d.addClass('keypad').on('focus.keypad',function(){if(e.force&&a('.keypad-editing').keypad('close'),(0===a('.keypad-editing').length||!1===e.autoClose)&&!d.data('keypad')){d.addClass('keypad-editing');var b=q[e.pad].call(d,e);d.data('keypad',b),b.data('value',d.val()),l(b,d,e),g(b,d,e),c(d,b,e.position,e.parent),e.esc&&a(document.body).on('keydown.keypad',function(a){27===a.which&&m(d,b)})}}),e.autoFocus&&d.focus()}})},a.fn.keypad.setDefaults=function(b){a.extend(p,b)}})(jQuery);
/*!
 * jQuery IE6 hover support plug-in v0.1
 * Add support for the :hover CSS pseudo-selector to IE6
 *
 * @requires jQuery v1.3.2 or later
 *
 * Copyright (c) 2010 Gilmore Davidson
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */
(function($){
	$.extend({
		ie6hover: function (future) {
			// $.browser is deprecated, but there's no way to feature detect :hover support
			if (!$.browser.msie) {
				return;
			}
			var func = future === true ? 'live' : 'bind',
				sheets = document.styleSheets,
				check = /:hover\b/,
				ignore = /\ba:hover\b/i,
				selectors = [];
			if (!sheets.length) {
				return;
			}
			for (var i = 0, slen = sheets.length; i < slen; i++) {
				var sheet = sheets[i],
					rules = sheet.rules;
				for (var j = 0, len = rules.length; j < len; j++) {
					var rule = rules[j],
						text = rule.selectorText;
					if (check.test(text) && !ignore.test(text)) {
						selectors.push(text.replace(check, ''));
						text = text.replace(check, '.hover-ie6');
						sheet.addRule(text, rule.style.cssText, j);
						j++;
						len++;
					}
				}
			}
			
			$(function () {
				$(selectors.join(',')).hover(function () {
					$(this).addClass('hover-ie6');
				}, function () {
					$(this).removeClass('hover-ie6');
				});
			});
		}
	});
})(jQuery);

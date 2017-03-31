if (!Array.prototype.forEach) {
	Array.prototype.forEach = function(fn, scope){
		for (var i = 0, len = this.length; i < len; ++i) {
			fn.call(scope, this[i], i, this);
		}
	}
}

if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function(obj, start){
		for (var i = (start || 0); i < this.length; i++) {
			if (this[i] == obj) {
				return i;
			}
		}
		return -1;
	}
}

var parseParam = function(query){
	var query_string = {};
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		pair[0] = decodeURIComponent(pair[0]);
		pair[1] = decodeURIComponent(pair[1]).split("+").join(" ");
		// If first entry with this name
		if (typeof query_string[pair[0]] === "undefined") {
			query_string[pair[0]] = pair[1];
			// If second entry with this name
		} else if (typeof query_string[pair[0]] === "string") {
			var arr = [query_string[pair[0]], pair[1]];
			query_string[pair[0]] = arr;
			// If third or later entry with this name
		} else {
			query_string[pair[0]].push(pair[1]);
		}
	}
	return query_string;
};

function parseURL(url){
	// http://james.padolsey.com/javascript/parsing-urls-with-the-dom/
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':', ''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function(){
			var ret = {},
				seg = a.search.replace(/^\?/, '').split('&'),
				len = seg.length, i = 0, s;
			for (; i < len; i++) {
				if (!seg[i]) {
					continue;
				}
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^/?#]+)$/i) || [, ''])[1],
		hash: a.hash.replace('#', ''),
		path: a.pathname.replace(/^([^/])/, '/$1'),
		relative: (a.href.match(/tps?:\/\/[^/]+(.+)/) || [, ''])[1],
		segments: a.pathname.replace(/^\//, '').split('/')
	};
}

function aa(a){
	alert(print_r(a));
}

function print_r(arr, level){
	var dumped_text = "";
	if (!level) level = 0;

//The padding given at the beginning of the line.
	var level_padding = "";
	for (var j = 0; j < level + 1; j++) level_padding += "    ";

	if (typeof(arr) == 'object') { //Array/Hashes/Objects
		for (var item in arr) {
			var value = arr[item];

			if (typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += print_r(value, level + 1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>" + arr + "<===(" + typeof(arr) + ")";
	}
	return dumped_text;
}

zeroFill = function(number, width){
	width -= number.toString().length;
	if (width > 0) {
		return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
	}
	return number + "";
};

$.OP = {
	GG: {
		util: {
			blockBodyScroll: function(endCallback){
				var pastOverflow = document.body.style.overflow;

				document.body.style.overflow = 'hidden';

				return endCallback(function(){
					document.body.style.overflow = pastOverflow;
				});
			},
			overElement: {
				_setWrapped: function(elem, newElem){
					var randomId = "overElement-wrappedElement" + Math.round(Math.random() * 1000000000000);
					newElem.attr('id', randomId);

					$(elem).data('overElement-wrappedElement-id', randomId);
				},
				_setCloned: function(elem, newElem){
					var randomId = "overElement-clonedElement" + Math.round(Math.random() * 1000000000000);
					newElem.attr('id', randomId);

					$(elem).data('overElement-clonedElement-id', randomId);
				},
				_getWrapped: function(elem){
					return $("#" + $(elem).data('overElement-wrappedElement-id'));
				},
				_getCloned: function(elem){
					return $("#" + $(elem).data('overElement-clonedElement-id'));
				},
				get: function(elem){
					var ele = $.OP.GG.util.overElement._getWrapped(elem);
					return (ele.length > 0 ? ele : null);
				},
				getCloned: function(elem){
					var ele = $.OP.GG.util.overElement._getCloned(elem);
					return (ele.length > 0 ? ele : null);
				},
				make: function(elem){
					var elem = $(elem),
						elemOffset = elem.position(),
						newElem = $(elem.clone()),
						newElemWrap = $("<div>").append(newElem).appendTo(elem.parent());

					newElem
						.wrap($("<div>").css({position: 'relative', width: '0%', height: '100%'}))
						.css({
							position: 'absolute',
							left: 0,
							top: 0,
							width: elem.outerWidth(),
							height: '100%',
						});

					newElemWrap.css({
						position: 'absolute',
						width: elem.outerWidth(),
						height: elem.outerHeight(),
						left: elemOffset.left,
						top: elemOffset.top + parseInt(elem.css('marginTop')),
						overflow: 'hidden'
					});

					$.OP.GG.util.overElement._setWrapped(elem, newElemWrap);
					$.OP.GG.util.overElement._setCloned(elem, newElem);

					newElem.attr('onclick', 'return false;');

					return newElemWrap;
				}
			},
			/**
			 * ajax 컨텐츠를 새로고침 하면서 엘리먼트의 Height 가 작아짐으로 인해 스크롤이 밀려 올라가는 현상 때문에 만듬.
			 * 아래와 같이 작성하면 매우 긴 컨텐츠가 들어간 후에 스크롤이 기존 스크롤으로 다시 원복된다.
			 *
			 * $.OP.GG.util.keepScroll(function(keepScroll){
			 * 	$(targetElem).html("로딩중..");
			 * 	$.ajax('url', function(){
			 * 		$(targetElem).html("매우 긴 컨텐츠");
			 * 		keepScroll();
			 * 	});
			 * });
			 *
			 * @param endCallback
			 */
			keepScroll: function(endCallback){
				var currentScrollPosition = $(document).scrollTop();

				endCallback(function(){
					$(document).scrollTop(currentScrollPosition);
				});
			},
			forceDesktopViewToggle: function(){
				var temp = $.cookie('forceDesktopView');
				if (temp == undefined) temp = 'false';
				temp = (temp == 'false' ? 'true' : 'false');

				$.cookie('forceDesktopView', temp, {
					path: '/'
				});

				if (temp == 'true') {
					var scale = Math.round($('html').width() / 1300 * 10) / 10;
					$.cookie('forceDesktopViewScale', scale, {
						path: '/'
					});
				}
				location.reload();
			},
			// 부하 감소를 위해, 파라미터로 parentElement 를 지정 할 수 있을 땐 꼭 지정해야한다.
			// 무작정 이 함수를 호출하면, 호출 할 때 마다 사이트가 프리징 될 수 있으니 매우매우매우매우매우매우매우매우 주의 바람.
			refreshTooltip: function(parentElement){
				var targetEls;
				if (parentElement) {
					targetEls = $(parentElement).find(".tip:not(.__tipped__)[title]");
				} else {
					targetEls = $(".tip:not(.__tipped__)[title]");
				}

				targetEls.each(function(i, o){
					var title = $(o).attr('title'),
						position = $(o).data('position');
					$(o).removeAttr('title');

					$(o).addClass('__tipped__');
					Tipped.create(o, title, {
						radius: false,
						behavior: 'hide',
						maxWidth: 320,
						fadeIn: 0,
						fadeOut: 0,
						position: (position ? position : 'top')
					});
				});
			}
		},
		common: {
			makeCenteredTableTd: function(html, minHeight, maxHeight){
				var style = '';
				if (minHeight) {
					style += "min-height: " + minHeight + "px;";
				}
				if (maxHeight) {
					style += "max-height: " + maxHeight + "px;";
				}

				if (BrowserDetect.browser == 'Firefox' && minHeight) {
					return "<div class='CenterTableWrapper' style='width: 100%; height: 100%;" + style + "'><table width='100%' height='100%' style='" + style + "'><tr><td valign='middle' align='center' height='" + minHeight + "'>" + html + "</td></tr></table></div>";
				}

				return "<div class='CenterTableWrapper' style='width: 100%; height: 100%;" + style + "'><table width='100%' height='100%' style='" + style + "'><tr><td valign='middle' align='center'>" + html + "</td></tr></table></div>";
			},
			makeCenteredTableLoader: function(loaderClass, minHeight, maxHeight){
				// var loaderHtml = $.OP.GG.common.makeCenteredTableTd("<div class='Loading " + option.class + "'></div>", option.minHeight, option.maxHeight);
				var html;
				if (!maxHeight || maxHeight >= 50) {
					html = "<div class='Loading " + loaderClass + "'></div>";
				} else {
					html = "<div class='Loading Loader14 " + loaderClass + "'></div>";
				}
				return $.OP.GG.common.makeCenteredTableTd(html, minHeight, maxHeight);
			},
			dim: function(options){
				var stopClick = false;
				var centeredTableTd = function(html, hideCloseButton){
					return $.OP.GG.common.makeCenteredTableTd("<div class='DimmedBlockInner'>" + (hideCloseButton ? "" : "<div class='Close'></div>") + html + "</div>");
				};

				var defaults = {
					className: '',
					loadingHTML: centeredTableTd("<div class='Loading'></div>", true),
					onClose: function(){

					},
					job: function(setHTML, doClose){

					}
				};

				var settings = $.extend(true, defaults, options);

				var close = function(parentElement){
					if (_isMobile === true) {
						$(window).off('popstate');
					}
					if (stopClick == true) {
						return;
					}
					if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 8) {
						$("iframe.__iframeHidden__").each(function(i, o){
							$(o).css({visibility: $(o).data('original-visibility')});
						});
					}
					document.body.removeChild(parentElement);
					settings.onClose();
				};

				var boxHTML = document.createElement("div");
				boxHTML.className = 'DimmedBlock ' + defaults.className;
				boxHTML.innerHTML = defaults.loadingHTML;
				boxHTML.onclick = function(){
					close(boxHTML);
				};
				document.body.appendChild(boxHTML);

				$(boxHTML).on('close', function(){
					close(boxHTML);
				});

				// IE8 에서는 iframe 이 상위 위치 하는 경우가 있어 (유튜브) 이를 임시 제거함
				if (BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 8) {
					$("iframe").each(function(i, o){
						$(o).data('original-visibility', $(o).css('visibility'));
						$(o).css({visibility: 'hidden'}).addClass('__iframeHidden__');
					});
				}

				settings.job(function(html){
					if (_isMobile === true) {
						$(window).on('popstate', function(){
							close(boxHTML);
							settings.onClose();
						});

						window.history.pushState(null, null, location.pathname);
					}

					// setHTML
					$(boxHTML).html(centeredTableTd(html));

					// modal.twig 같은데서 작동하려면 이거 필요
					$(".tabWrap").trigger('tabRecognize');


					// 안쪽에는 클릭해도 Modal이 닫히지 않게 처리
					$(".DimmedBlockInner", boxHTML).click(function(event){
						stopClick = true;

						// event stop 으로 하면 input[type=file] 엘리먼트에 .click() 을 줬을 때 DIM 이 닫혀버림.
						//event.stopPropagation();
						setTimeout(function(){
							stopClick = false;
						}, 10);
					});

					// X 버튼 누르면 닫히게
					$(".DimmedBlockInner .Close", boxHTML).click(function(event){
						close(boxHTML);
					});
				}, function(){
					boxHTML.onclick();
				});
			},
			SummonerHistory: {
				_summonerSaveEngine: function(varName){
					var self = this,
						storageKey = '_' + varName,
						separator = '$';

					this.engine = function(){
						if (Modernizr.localstorage) {
							return 'localStorage';
						} else {
							return 'cookie';
						}
					};
					this.get = function(){
						var list = [], listString = '';
						if (self.engine() == 'localStorage') {
							listString = localStorage.getItem(storageKey);
							// localStorage 면 쿠키에서도 조회해봄
							if (listString == undefined || listString == '') {
								listString = $.cookie(storageKey);
							}
						} else {
							listString = $.cookie(storageKey);
						}
						if (listString == undefined || listString == '') {
							listString = '';
							list = [];
						} else {
							list = listString.split(separator);
						}
						return list;
					};
					this.set = function(list){
						var newList = [], newListString = '';
						list.forEach(function(v, i){
							if (v.length > 2) {
								newList.push(v);
							}
						});

						newListString = newList.join(separator);

						if (Modernizr.localStorage) {
							localStorage.setItem(storageKey, newListString);
						} else {
							$.cookie(storageKey, newListString, {expires: 365, path: '/'});
						}
						return newListString;
					};
					this.isExist = function(summonerName){
						var isExist = false;
						var list = self.get();
						list.forEach(function(v, i){
							if (v == summonerName) {
								isExist = true;
								return false;
							}
						});
						return isExist;
					};
					this.count = function(){
						var list = self.get();
						return list.length;
					};
					this.add = function(summonerName){
						var list = self.get();
						if (self.isExist(summonerName))
							return list;

						list.push(summonerName);
						self.set(list);
						return list;
					};
					this.remove = function(summonerName){
						var newList = [];
						var list = self.get();
						list.forEach(function(v, i){
							if (v != summonerName) newList.push(v);
						});
						self.set(newList);
						return newList;
					};
					this.removeAtIndex = function(index){
						var list = self.get();
						list.splice(index, 1);
						self.set(list);
						return list;
					};
				},
				History: {
					add: function(summonerName){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('hist'),
							saveLimit = 10;

						// 쿠키라면 최대 10개
						if (storage.engine() == 'cookie' && saveLimit > 10) {
							saveLimit = 10;
						}

						storage.remove(summonerName);
						storage.add(summonerName);

						if (storage.count() >= saveLimit) {
							var lastSummoner = storage.get()[0];
							storage.remove(lastSummoner);
						}

						that.History.loadList();
						return false;
					},
					remove: function(summonerName){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('hist');
						storage.remove(summonerName);
						that.History.loadList();
						return false;
					},
					loadList: function(type){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('hist'), // storage instance
							summonerNames = storage.get(), // summoner name list
							area = $(".RecentSummonerListWrap"),
							areaList = area.find('.RecentSummonerList'), // update area
							areaNotFound = area.find('.NotFound'),
							type = type || null;

						var html = ''; // for cache

						summonerNames.forEach(function(v, i){
							var ddClass = '';
							if (that.Favorite.isExist(v)) {
								ddClass = 'favorited';
							}
							html =
								'<div class="Item ' + ddClass + '">' +
								'	<a href="/summoner/userName=' + encodeURIComponent(v) + '"class="Link">' + v + '</a>' +
								'	<div class="Actions">' +
								'<a href="#" onclick="$.OP.GG.common.SummonerHistory.Favorite.toggle(\'' + v + '\'); return false;" class="Action Add"></a>' +
								'<a href="#" onclick="$.OP.GG.common.SummonerHistory.History.remove(\'' + v + '\'); return false;" class="Action Delete"></a>' +
								'	</div>' +
								'</div>' + html;
						});

						if (areaList && areaList.length > 0) {
							for (var i = 0; i < areaList.length; i++) {
								areaList[i].innerHTML = html;
							}
						}

						// 즐겨찾기 데이터가 없으면 즐겨찾기 영역 자체를 숨겨줌.
						if (!html) {
							areaList.hide();
							areaNotFound.show();
						} else {
							areaList.show();
							areaNotFound.hide();
						}

						areaList.find('span.Favorite').on('click', function(){
							var summonerName = $(this).closest('.SummonerName').find('.Name').text();
							that.Favorite.toggle(summonerName);

							// 별표 삭제를 위함
							that.History.loadList();
						});
						areaList.find('span.Delete').on('click', function(){
							var summonerName = $(this).closest('.SummonerName').find('.Name').text();
							that.History.remove(summonerName);
						});
					}
				},
				Favorite: {
					currentSummonerName: null,
					isExist: function(summonerName){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('fav');
						return storage.isExist(summonerName);
					},
					toggle: function(summonerName){
						var that = $.OP.GG.common.SummonerHistory;
						if (that.Favorite.isExist(summonerName)) {
							that.Favorite.remove(summonerName);
						} else {
							that.Favorite.add(summonerName);
						}
					},
					add: function(summonerName){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('fav');
						if (storage.engine() == 'cookie' && storage.count() >= 10) {
							noty({
								text: ('SUMMONER_FAVORITE_LIMIT_EXCEED_IELOW', '', {
									limit: 10
								}), type: 'error', layout: 'topCenter'
							});
							return list;
						}
						storage.add(summonerName);

						that.Favorite.loadList();
						that.Favorite.loadCurrentSummoner();
						that.History.loadList();
						return false;
					},
					remove: function(summonerName){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('fav');
						storage.remove(summonerName);

						that.Favorite.loadList();
						that.Favorite.loadCurrentSummoner();
						that.History.loadList();

						return false;
					},
					loadList: function(type){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('fav'), // storage instance
							summonerNames = storage.get().sort().reverse(), // summoner name list
							area = $(".FavoriteSummonerListWrap"),
							areaList = area.find('.FavoriteSummonerList'), // update area
							areaNotFound = area.find('.NotFound'),
							type = type || null;

						var html = ''; // for cache

						summonerNames.forEach(function(v, i){
							html =
								'<div class="Item">' +
								'	<a href="/summoner/userName=' + encodeURIComponent(v) + '" class="Link">' +
								'		<div class="SummonerName">' + v + '</div>' +
								'	</a>' +
								'	<div class="Actions">' +
								'		<a href="#" onclick="$.OP.GG.common.SummonerHistory.Favorite.remove(\'' + v + '\'); return false;" class="Action Delete">해제</a>' +
								'	</div>' +
								'</div>' + html;
						});

						switch (type) {
							//case 'index':
							//	areaList[0].innerHTML = '<dt><i class="icon-star"></i></dt>' + html;
							//	break;

							default:
								for (var i = 0; i < areaList.length; i++) {
									areaList[i].innerHTML = html;
								}
						}

						// 즐겨찾기 데이터가 없으면 즐겨찾기 영역 자체를 숨겨줌.
						if (!html) {
							areaList.hide();
							areaNotFound.show();
						} else {
							areaList.show();
							areaNotFound.hide();
						}

						areaList.find('span.Delete').on('click', function(){
							var summonerName = $(this).closest('.SummonerName').find('.Name').text();
							that.Favorite.remove(summonerName);
							that.History.loadList();
						});
					},
					loadCurrentSummoner: function(){
						var that = $.OP.GG.common.SummonerHistory;
						var storage = new that._summonerSaveEngine('fav'),
							button = $("#FavoriteButton");

						if (storage.isExist(that.Favorite.currentSummonerName)) {
							button.find('.deactive').hide();
							button.find('.active').show();
						} else {
							button.find('.deactive').show();
							button.find('.active').hide();
						}
					}
				}
			},
			IndexAutoComplete: {
				init: function(){
					var $form = $('form.SearchInput'),
						$searchInput = $('.Summoner', $form),
						$autoComplete = $('.IndexAutoComplete', $form);

					var setValue = function(value){
						$searchInput.val($.trim(value));
					};

					$searchInput
						.focus()
						.on('focus click', function(){
							if ($searchInput.val() === '') {
								$autoComplete.show();
							} else {
								$autoComplete.hide();
							}
						})
						.on('keyup', function() {
							if ($searchInput.hasClass("_suggest")) {
								if ($searchInput.val() === '') {
									$autoComplete.show();
								} else {
									$autoComplete.hide();
								}
							}
						});


					$autoComplete.on('click', '.SummonerList > .Item', function(){
						setValue($(this).find('.Link').text());
					});

					$(document).on('click', function(event){
						var target = event.target || event.srcelement;
						var $target = $(target);

						if (!$target.closest($form.selector).length && !$target.is('.action')) {
							$autoComplete.hide();
						}
					});
				}
			},
			GNBAutoComplete: {
				init: function(){
					var $searchTool = $('.SearchTool'),
						$form = $('.Form', $searchTool),
						$searchInput = $('.SearchInput', $form),
						$autoComplete = $('.SearchExtra', $searchTool);

					$searchInput
						.on('focus click', function(){
                            if ($searchInput.val() === '') {
                                $autoComplete.show();
                            } else {
                                $autoComplete.hide();
                            }
						})
						.on('keyup', function() {
							if ($searchInput.hasClass("_suggest")) {
								if ($searchInput.val() === '') {
									$autoComplete.show();
								} else {
									$autoComplete.hide();
								}
							}
						});

					$(document).on('click', function(event){
						var target = event.target || event.srcElement;
						var $target = $(target);

						if (!$target.closest($searchTool.selector).length && !$target.is('.Action')) {
							$autoComplete.hide();
						}
					});
				}
			}
		},
		ajax: {
			// options 에다가 더미 파라미터 붙이거나 callback 붙이거나 등등 지럴 하는것
			// 다 하고 settings.url 이랑 settings.data 작업 함
			// 말로 설명하기는 길어서 생략, 건드릴 때 주의 할 것
			// 존나 복잡해져서 좀 길게 다시 짬
			prebuildOptions: function(settings, additionalParameters){
				var targetUrl = parseURL(settings.url);
				var pathQuery = targetUrl.path + targetUrl.query; // targetUrl.relative

				// Fast Route 를 사용하는 URL 들 목록을 정함. 얘네는 query string 이 ? 로 구분.
				// -> 현재 /champion/ 사용중. (단, /champion/ajax 제외)
				var isQueryDividerQuestionMark = (pathQuery.indexOf('/champion/') === 0 && pathQuery.indexOf('/champion/ajax/') === -1);

				// 없을 때 처리
				additionalParameters = $.extend({}, additionalParameters, {});

				// IE Cache Issue
				if (BrowserDetect.browser == 'Explorer') {
					additionalParameters.dummy = new Date().getTime();
				}

				if (typeof(settings.data) == 'object' || typeof(settings.data) == 'string') {
					// data 가 있을 땐 data 에...
					if (typeof(settings.data) == 'string') {
						// string => object convert
						settings.data = parseParam(settings.data);
					}

					settings.data = $.extend({}, settings.data, additionalParameters);
				} else {
					// data가 없을 땐 URL에 ..
					// 보통 GET 일 경우
					if (isQueryDividerQuestionMark) {
						if (settings.url.indexOf('?') === -1) {
							// '?' 가 없으면 '?'로 시작
							settings.url += '?' + jQuery.param(additionalParameters);
						} else {
							// '?'가 있으면 '&'로 붙임
							settings.url += '&' + jQuery.param(additionalParameters);
						}
					} else {
						// 위 예외를 제외한 모든 URL은 '/'로 끝나도록 코딩되어 있다는 것을 가정 (Fast Route 를 사용한 champion 은 제외 => 이 예외 규칙은 맨 위에 'isQueryDividerQuestionMark'에 있음)
						// '/'로 끝나지 않으면 쿼리 스트링이 붙었다고 판단, 무조건 '&'를 붙인다
						// foo=var 형태로 체크를 할 수도 있지만, 원래 query string 은 foo=var 가 아닌 foo 형태로만 써도 되기 때문에 위험한 판단 방법임
						if (settings.url.slice(-1) != '/') {
							settings.url += "&";
						}
						settings.url += jQuery.param(additionalParameters);
					}
				}

				// GET 일때는 .data 를 모두 URL로 보내준다.
				// 아니면 REDIRECT 한번 들어감. 리퀘스트 아끼기 위해서 처리.
				// @warn: URL에 GET Parameter 가 존재하지 않는다고 가정.. (테스트 필요)
				if (settings.data && settings.method == 'get') {
					var params = {}, res = {};
					// 기존 파라미터 파싱
					if (res = settings.url.match(/^(.*)\/((?:.[^\/]*)=(?:.[^\/]*))$/)) {
						settings.url = res[1];
						params = parseParam(res[2]);
					} else if (res = settings.url.match(/^(.*)\?(.*)$/)) {
						settings.url = res[1];
						params = parseParam(res[2]);
					}

					params = $.extend({}, params, settings.data);

					// 파라미터 추가
					if (isQueryDividerQuestionMark) {
						settings.url += '?' + jQuery.param(params);
						settings.data = undefined;
					} else {
						if (settings.url.slice(-1) != '/') {
							settings.url += "/";
						}
						settings.url += jQuery.param(params);
						settings.data = undefined;
					}
				}

				settings.url = settings.url.replace(/callback=%3F/i, 'callback=?');

				return settings;
			},
			formSubmit: function(form, type, callback){
				var action = $(form).attr('action'),
					method = $(form).attr('method');

				var data = null;

				if (type == 'jsonp') {
					// jsonp 는 get 만 가능
					method = 'get';
				}

				if (method == 'get') {
					if (action.slice(-1) != '/') {
						action += "/";
					}

					action += $(form).serialize();
				} else {
					data = $(form).serialize();
				}

				var options = {
					url: action,
					data: data,
					callback: callback,
					method: method
				};

				// serialize 이후에 실행해야 될 것들이 있을 때 이거 사용.
				if (callback['onBeforeRequest']) {
					callback['onBeforeRequest'](form);
				}

				switch (type) {
					case 'json':
						$.OP.GG.ajax.getJSON(options);
						break;

					case 'jsonp':
						$.OP.GG.ajax.getJSONP(options);
						break;

					case 'html':
						$.OP.GG.ajax.getHTML(options);
						break;
				}
			},
			getJSON: function(options){
				var defaults = {
					method: 'get',
					dataType: 'json',
					callback: {
						onJSON: function(json){

						},
						onError: function(message){
							alert(message);
						},
						onFinal: function(){

						}
					}
				};

				var settings = $.extend(true, defaults, options);
				settings = $.OP.GG.ajax.prebuildOptions(settings);

				// ajax 객체를 직접 제어할 수 있도록 반환해 주도록 함.
				// 아래는 중복 요청을 막기 위한 용례.
				//
				// ```
				// var getData = $.OP.GG.ajax.getJSON();
				// if (upperScope.currentRequest) {
				//   getData.abort();
				// } else {
				//   upperScope.currentRequest = getData;
				// }
				// ```
				return $.ajax(settings)
					.done(function(json){
						settings.callback.onJSON(json);
						settings.callback.onFinal();
					})
					.fail(function(jqXHR){
						if (jqXHR.status == 418 || jqXHR.status == 400) {
							if (jqXHR.responseText == '__reload__') {
								location.reload();
							} else if (jqXHR.responseText == '__login__') {
								location.href = '/member/login/referer=' + encodeURIComponent(location.href);
							} else {
								settings.callback.onError(jqXHR.responseText);
							}
						} else {
							settings.callback.onError("Unknown Error! (" + jqXHR.status + ")\r\n\r\nDebug Message: " + jqXHR.responseText);
						}
						settings.callback.onFinal();
					});
			},
			getJSONP: function(options){
				var defaults = {
					method: 'get',
					dataType: 'jsonp',
					callback: {
						onJSON: function(json){

						},
						onError: function(message){
							alert(message);
						},
						onFinal: function(){

						}
					}
				};

				var settings = $.extend(true, defaults, options);
				settings = $.OP.GG.ajax.prebuildOptions(settings, {
					'callback': '?'
				});

				$.ajax(settings)
					.done(function(json){
						if (json['error'] !== undefined) {
							var jqXHR = {
								'status': 400,
								'responseText': json['error']
							};
							if (jqXHR.status == 418 || jqXHR.status == 400) {
								if (jqXHR.responseText == '__reload__') {
									location.reload();
								} else if (jqXHR.responseText == '__login__') {
									location.href = '/member/login/referer=' + encodeURIComponent(location.href);
								} else {
									settings.callback.onError(jqXHR.responseText);
								}
							} else {
								settings.callback.onError("Unknown Error! (" + jqXHR.status + ")\r\n\r\nDebug Message: " + jqXHR.responseText);
							}
						} else {
							settings.callback.onJSON(json);
						}
						settings.callback.onFinal();
					})
					.fail(function(jqXHR){
						if (jqXHR.status == 418 || jqXHR.status == 400) {
							if (jqXHR.responseText == '__reload__') {
								location.reload();
							} else if (jqXHR.responseText == '__login__') {
								location.href = '/member/login/referer=' + encodeURIComponent(location.href);
							} else {
								settings.callback.onError(jqXHR.responseText);
							}
						} else {
							settings.callback.onError("Unknown Error! (" + jqXHR.status + ")\r\n\r\nDebug Message: " + jqXHR.responseText);
						}
						settings.callback.onFinal();
					});
			},
			getHTML: function(options){
				var defaults = {
					method: 'get',
					callback: {
						onHTML: function(html){

						},
						onError: function(message){
							alert(message);
						},
						onFinal: function(){

						}
					}
				};

				var settings = $.extend(true, defaults, options);
				settings = $.OP.GG.ajax.prebuildOptions(settings);

				$.ajax(settings)
					.done(function(html){
						settings.callback.onHTML(html);
						settings.callback.onFinal();
					})
					.fail(function(jqXHR){
						if (jqXHR.status == 418 || jqXHR.status == 400) {
							if (jqXHR.responseText == '__reload__') {
								location.reload();
							} else if (jqXHR.responseText == '__login__') {
								// 이유는 잘 모르겠지만 바로 location.href 하면 history 에 남지 않는다.
								// location.href 는 무조건 남아야하는데.. 임시로 타이머거니까 남음.
								setTimeout(function(){
									location.href = '/member/login/referer=' + encodeURIComponent(location.href);
								}, 500);
							} else {
								settings.callback.onError(jqXHR.responseText);
							}
						} else {
							settings.callback.onError("Unknown Error! (" + jqXHR.status + ")\r\n\r\nDebug Message: " + jqXHR.responseText);
						}
						settings.callback.onFinal();
					});
			},
			member: {
				login: function(form){
					var hiddenLoadingLayer = $($.OP.GG.common.makeCenteredTableLoader('black', 200)).css({background: '#fff'}).insertAfter(form).hide();

					$(form).hide();
					hiddenLoadingLayer.show();

					$.OP.GG.ajax.formSubmit(form, 'jsonp', {
						onJSON: function(json){
							if (json['location']) {
								location.href = json['location'];
							} else if (json['reload']) {
								location.reload();
							}
						},
						onError: function(message){
							$(form).show();
							hiddenLoadingLayer.hide();

							alert(message);
						},
						onFinal: function(){

						}
					});
				},
				loginWithFacebook: function(button){
					$(button).startLoading({
						minHeight: 50
					});

					Facebook.login(function(response){
						if (!response || !response.authResponse || !response.authResponse.accessToken) {
							return;
						}
						$.OP.GG.ajax.getJSON({
							url: '/member/ajax2/login.json/callback=?',
							dataType: 'jsonp',
							method: 'post',
							data: {
								type: 'facebook',
								appId: Facebook.appId,
								accessToken: response.authResponse.accessToken,
								referer: $('input[name=referer]').val()
							},
							callback: {
								onJSON: function(json){
									if (json['location']) {
										location.href = json['location'];
									} else if (json['reload']) {
										location.reload();
									}
								},
								onError: function(message){
									$(button).stopLoading();
									alert(message);
								},
								onFinal: function(){

								}
							}
						});
					});
				},
				logout: function(button, hash){
					$(button).startLoading({
						className: 'black',
						minHeight: 40
					});

					$.OP.GG.ajax.getJSON({
						url: '/member/ajax2/logout.json/',
						data: {
							hashToken: hash
						},
						callback: {
							onJSON: function(json){
								location.reload();
							},
							onError: function(error){
								alert(error);
								$(button).stopLoading();
							}
						}
					});
				},
				join: function(form){
					var hiddenLoadingLayer = $($.OP.GG.common.makeCenteredTableLoader('black', 200)).css({background: '#fff'}).insertAfter(form).hide();

					$(form).hide();
					hiddenLoadingLayer.show();

					$.OP.GG.ajax.formSubmit(form, 'jsonp', {
						onJSON: function(json){
							if (json['location']) {
								location.href = json['location'];
							} else if (json['reload']) {
								location.reload();
							}
						},
						onError: function(message){
							$(form).show();
							hiddenLoadingLayer.hide();

							alert(message);
						},
						onFinal: function(){

						}
					});
				},
				verify: function(form){
					var oMessage = $(form).find('.Message');
					oMessage.startLoading({
						className: 'black'
					});

					$.OP.GG.ajax.formSubmit(form, 'json', {
						onJSON: function(json){
							oMessage.html(json.message);
						},
						onError: function(message){
							alert(message);
							oMessage.stopLoading();
						},
						onFinal: function(){

						}
					});
				},
				isVerified: function(button){
					$(button).startLoading();

					$.OP.GG.ajax.getJSON({
						url: '/member/verify/ajax2/isVerified.json/',
						callback: {
							onJSON: function(json){
								if (json.message) {
									alert(json.message);
								}
								location.reload();
							},
							onError: function(error){
								alert(error);
								$(button).stopLoading();
							}
						}
					});
				},
				find: function(form){
					var oBtn = $(form).find('.Button'),
						oMessage = $(form).find('.Message');
					oBtn.startLoading({
						className: 'black'
					});

					$.OP.GG.ajax.formSubmit(form, 'json', {
						onJSON: function(json){
							alert(json.message);
							oMessage.html(json.message);
						},
						onError: function(message){
							alert(message);
						},
						onFinal: function(){
							oBtn.stopLoading();
						}
					});
				}
			}
		},
		UI: {
			dynamicDate: {
				refreshDocumentDate: function(target){
					return false;
					// 비정상적으로 크면 0으로 세팅.
					if (Math.abs(moment.diffLocal) > 86400 * 365) {
						moment.diffLocal = 0;
					}

					var eachFunc = function(i, o){
						var oT = $(o),
							datetime = parseInt(oT.attr('data-datetime')),
							type = oT.data('type');

						if (oT.hasClass('__timeagofirst__'))
							return;

						oT.addClass('__timeagofirst__');

						if (isNaN(datetime)) return true;
						if (datetime <= 0) return true;

						var momentDate = moment.unix(datetime + moment.diffLocal);
						var diff = momentDate.diff();
						var seconds = Math.abs(diff) / 1000;
						var minutes = seconds / 60;
						var hours = minutes / 60;
						var days = hours / 24;
						var years = days / 365;

						var words;
						switch (type) {
							case 'undefined':
							case 'null':
							case '':
								words =
									years < 1 && momentDate.fromNow() ||
									momentDate.format('lll');

								oT.attr('title', momentDate.format('lll')).addClass('tip');
								break;

							case 'bbsList':
								words =
									years < 1 && momentDate.fromNow() ||
									momentDate.format('L');

								oT.attr('title', momentDate.format('lll')).addClass('tip');
								break;

							case 'count':
								words = zeroFill(Math.round(minutes % 60), 2) + ":" + zeroFill(Math.round(seconds % 60), 2);
								oT.attr('title', momentDate.format('lll')).addClass('tip');
								break;

							default:
								words =
									momentDate.format(type);
						}

						oT[0].innerHTML = words;
					};

					if (typeof target == "undefined") {
						$("span._timeago").each(function(i, o){
							eachFunc(i, o);
						});
					}
					else {
						$("span._timeago", $(target)).each(function(i, o){
							eachFunc(i, o);
						});
					}
					// console.log(new Date().getTimezoneOffset(), -new Date().getTimezoneOffset()/60);
				},
				assignNewCountTime: function(){
					// 비정상적으로 크면 0으로 세팅.
					if (Math.abs(moment.diffLocal) > 86400 * 365) {
						moment.diffLocal = 0;
					}

					var eachFunc = function(i, o){
						var oT = $(o),
							datetime = parseInt(oT.attr('data-datetime')),
							type = oT.data('type'),
							interval = oT.data('interval'),
							hideTip = oT.hasClass('hideTip');

						if (isNaN(datetime)) return true;
						if (datetime <= 0) return true;

						var momentDate = moment.unix(datetime + moment.diffLocal);
						var diff = momentDate.diff();
						var seconds = Math.abs(diff) / 1000;
						var minutes = seconds / 60;
						var hours = minutes / 60;
						var days = hours / 24;
						var years = days / 365;

						var words;
						switch (type) {
							case 'undefined':
							case 'null':
							case '':
								words =
									years < 1 && momentDate.fromNow() ||
									momentDate.format('lll');

								oT.attr('title', momentDate.format('lll')).addClass('tip');
								break;

							case 'bbsList':
								words =
									years < 1 && momentDate.fromNow() ||
									momentDate.format('L');

								oT.attr('title', momentDate.format('lll')).addClass('tip');
								break;

							case 'count':
								words = zeroFill(Math.round(minutes % 60), 2) + ":" + zeroFill(Math.round(seconds % 60), 2);
								oT.attr('title', momentDate.format('lll')).addClass('tip');
								break;

							default:
								words =
									momentDate.format(type);
						}

						oT[0].innerHTML = words;
						if (hideTip) {
							oT.attr('title', '').removeClass('tip');
						}

						setTimeout(function(){
							eachFunc(i, o);
						}, interval * 1000);
					};

					$("span._timeCount").each(function(i, o){
						$(o).addClass('_timeCountAssigned').removeClass('_timeCount');
						eachFunc(i, o);
					});
				}
			}
		},
		layout: {
			login: {
				open: function(){
					$.OP.GG.util.blockBodyScroll(function(end){
						$.OP.GG.common.dim({
							onClose: function(){
								end();
							},
							job: function(setHTML, doClose){
								$.OP.GG.ajax.getHTML({
									url: '/member/ajax2/login/',
									callback: {
										onHTML: function(html){
											setHTML(html);
										},
										onError: function(error){
											alert(error);
											doClose();
										}
									}
								});
							}
						});
					});
				},
				close: function(){
					$.OP.GG.layout.login._close();
				}
			},
			familySites: {
				open: function(){
					$.OP.GG.util.blockBodyScroll(function(end){
						$.OP.GG.common.dim({
							onClose: function(){
								end();
							},
							job: function(setHTML, doClose){
								$.OP.GG.ajax.getHTML({
									url: '/ajax/familySites/',
									callback: {
										onHTML: function(html){
											setHTML(html);
										},
										onError: function(error){
											alert(error);
											doClose();
										}
									}
								});
							}
						});
					});
				}
			},
			regionLanguage: {
				open: function(){
					$.OP.GG.util.blockBodyScroll(function(end){
						$.OP.GG.common.dim({
							onClose: function(){
								end();
							},
							job: function(setHTML, doClose){
								$.OP.GG.ajax.getHTML({
									url: '/ajax/regionsLanguages/',
									data: {
										targetUrl: location.href
									},
									callback: {
										onHTML: function(html){
											setHTML(html);
										},
										onError: function(error){
											alert(error);
											doClose();
										}
									}
								});
							}
						});
					});
				},
				cookie: {
					seti18n: function(locale){
						$.removeCookie('customLocale', {path: '/', domain: 'www.op.gg'});
						$.removeCookie('customLocale', {path: '/', domain: 'nations.op.gg'});
						$.removeCookie('customLocale', {path: '/', domain: 'national.op.gg'});
						$.removeCookie('customLocale', {path: '/', domain: 'op.gg'});
						$.removeCookie('customLocale', {path: '/', domain: '.op.gg'});
						$.removeCookie('customLocale', {path: '/'});
						$.cookie('customLocale', locale, {expires: 365, path: '/'});
					}
				},
				setLocale: function(locale, btn){
					var past = $.cookie('customLocale');
					if (past == locale) return;

					$(btn).startLoading({
						className: 'black'
					});

					$.OP.GG.layout.regionLanguage.cookie.seti18n(locale);
					location.reload();
				}
			}
		},
		ranking: {
			loadMore: function(btn, nextStart){
				var footer = $(btn).closest('.Footer'),
					table = $(btn).closest('table');

				$(btn).startLoading({
					className: 'black'
				});

				$.OP.GG.ajax.getHTML({
					url: '/ranking/ajax2/ladders/',
					data: {
						start: nextStart
					},
					callback: {
						onHTML: function(html){
							table.append(html);
							footer.remove();
						},
						onError: function(error){
							alert(error);
							$(btn).stopLoading();
						}
					}
				});
			}
		},
		logo: {
			loadMore: function(btn, nextStart){
				var buttonWrap = $(btn).closest('.ButtonWrap'),
					list = $(btn).closest('ul');

				$(btn).startLoading({
					className: 'black'
				});

				$.OP.GG.ajax.getHTML({
					url: '/about/ajax2/logos/',
					data: {
						start: nextStart
					},
					callback: {
						onHTML: function(html){
							list.append(html);
							buttonWrap.remove();
						},
						onError: function(error){
							alert(error);
							$(btn).stopLoading();
						}
					}
				});
			}
		},
		enableOldLayout: function(){
			$.cookie('oldLayout', 'true', {expires: 3, path: '/'});
			location.reload();
		},
		disableNewLayout: function(){
			$.removeCookie('newLayout', {expires: 365, path: '/'});
			location.reload();
		}
	}
};

var Facebook = new (function(){
	var selfFB = this;
	var checkLoggedState = function(cb){
		return function(){
			FB.getLoginStatus(function(response){
				onLoggedStatusChanged(response, cb);
			});
		}
	};
	var checkDeclinedPermission = function(cb){
		FB.api(
			"/me/permissions",
			function(response){
				if (response && !response.error) {
					for (i in response.data) {
						var _perm = response.data[i];
						if (_perm.status != 'granted') {
							cb.fail(_perm);
							return;
						}
					}
					cb.success(_perm);
				} else {
					cb.fail();
				}
			}
		);
	};
	var onLoggedStatusChanged = function(response, cb){
		var _cb = function(message, response){
			alert(message);
			cb && cb(response);
		};

		if (response.status === 'connected') {
			checkDeclinedPermission({
				success: function(){
					cb && cb(response);
				},
				fail: function(_perm){
					alert('이메일 주소의 권한을 승인 해주셔야 가입이 가능합니다. 다시 로그인 해주세요!');
					cb && cb();
				}
			});
		} else if (response.status === 'not_authorized') {
			_cb('다시 로그인 버튼을 눌러서 OP.GG를 승인해주세요.', response);
		} else {
			_cb('페이스북에 로그인 해주세요.', response);
		}
	};

	this.appId = '677811765617932';
	this.init = function(){
		window.fbAsyncInit = function(){
			FB.init({
				appId: selfFB.appId,
				cookie: false,
				xfbml: false,
				version: 'v2.0'
			});
		};
	};
	this.login = function(cb){
		// iOS Chrome 로그인 문제
		if (navigator.userAgent.match('CriOS'))
			location.href = 'https://www.facebook.com/dialog/oauth?client_id=' + Facebook.appId + '&redirect_uri=' + encodeURIComponent("http://" + location.host + "/member/ajax2/facebook/?appId=" + Facebook.appId) + '&scope=email,public_profile&auth_type=rerequest';
		else
			FB.login(checkLoggedState(cb), {scope: 'email,public_profile', auth_type: 'rerequest'});
	};
	return this;
})();

Facebook.init();

// Load the SDK asynchronously
(function(d, s, id){
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s);
	js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

(function($){
//함수 확장
	// startLoading 이후에는 무조건 stopLoading 을 해줘야함. disabled 속성 때문
	$.fn.startLoading = function(option){
		$.fn.startLoading.setting = {
			className: '',
			minHeight: 0,
			maxHeight: null
		};

		option = $.extend($.fn.startLoading.setting, option);

		return this.each(function(){
			var originalHtml = $(this).data('loading-original-html');
			if (originalHtml == undefined) {
				originalHtml = $(this).html();
				$(this).data('loading-original-html', originalHtml);
			}

			var loaderHtml = $.OP.GG.common.makeCenteredTableLoader(option.className, option.minHeight, option.maxHeight);
			$(this).html(loaderHtml);
			$(this).disabled = true;
			$(this).attr('disabled', true);
			$(window).resize();
		});
	};

	$.fn.stopLoading = function(){
		return this.each(function(){
			var originalHtml = $(this).data('loading-original-html');

			$(this).html(originalHtml);
			$(this).disabled = false;
			$(this).removeAttr('disabled');
			$(window).resize();
		});
	};

	$.fn.outerHTML = function(){
		var el = $(this);
		if (!el[0]) return "";

		if (el[0].outerHTML) {
			return el[0].outerHTML;
		} else {
			return el.clone().wrapAll("<div/>").parent().html();
		}
	};

	$.fn.getInputSelection = function(){
		var el = $(this)[0];
		var start = 0, end = 0, normalizedValue, range,
			textInputRange, len, endRange;

		if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
			start = el.selectionStart;
			end = el.selectionEnd;
		} else {
			range = document.selection.createRange();

			if (range && range.parentElement() == el) {
				len = el.value.length;
				normalizedValue = el.value.replace(/\r\n/g, "\n");

				// Create a working TextRange that lives only in the input
				textInputRange = el.createTextRange();
				textInputRange.moveToBookmark(range.getBookmark());

				// Check if the start and end of the selection are at the very end
				// of the input, since moveStart/moveEnd doesn't return what we want
				// in those cases
				endRange = el.createTextRange();
				endRange.collapse(false);

				if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
					start = end = len;
				} else {
					start = -textInputRange.moveStart("character", -len);
					start += normalizedValue.slice(0, start).split("\n").length - 1;

					if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
						end = len;
					} else {
						end = -textInputRange.moveEnd("character", -len);
						end += normalizedValue.slice(0, end).split("\n").length - 1;
					}
				}
			}
		}

		return {
			start: start,
			end: end
		};
	};

	$.fn.setInputSelection = function(selectionStart, selectionEnd){
		if (!selectionEnd || selectionEnd < selectionStart) selectionEnd = selectionStart;

		var input = $(this)[0];
		if (input.setSelectionRange) {
			input.focus();
			input.setSelectionRange(selectionStart, selectionEnd);
		} else if (input.createTextRange) {
			console.log(1);
			// Create empty selection range
			var range = document.selection.createRange();
			console.log(2);
			// Move selection start and end to 0 position
			range.moveStart('character', -input.value.length);
			console.log(3);
			// Move selection start and end to desired position
			range.moveStart('character', selectionStart);
			console.log(4);
			range.moveEnd('character', 0);
			console.log(5);
			range.select();
		}
	};
})(jQuery);

$(function(){
	$(".SearchInput .Summoner, .SearchInputWrap .SearchInput").bind("paste", function(e){
		var patterns = [
			'^(.*?)\\: .*$', // Chat
			'^(.*?)님이 (?:방|그룹)에 참가했습니다\\.?$', // ko_KR
			'^(.*?)님이 로비에 참가하셨습니다\\.?$', // ko_KR
			'^(.*?) joined the (?:room|group|lobby)\\.?$', // en_US
			'^(.*?) entró en la sala\\.?$', // es_ES
			'^(.*?) a rejoint la salle\\.?$', // fr_FR
			'^(.*?) hat den Chatraum betreten\\.?$', // de_DE
			'^(.*?) è entrato nella stanza\\.?$', // it_IT
			'^(.*?) dołączył do pokoju\\.?$', // pl_PL
			'^(.*?) a intrat în sală\\.?$', // ro_RO
			'^(.*?) μπήκε στο δωμάτιο\\.?$', // el_GR
			'^(.*?) entrou na sala\\.?$', // pt_BR
			'^(.*?) odaya katıldı\\.?$', // 터키
			'^(.*?) lobiye katıldı\\.?$', // 터키
			'^(.*?) が入室しました。$',  // ja_JP
			'^(.*?)がロビーに参加しました$',  // ja_JP
			'^(.*?)がロビーに参加しました。$',  // ja_JP
			'^(.*?) entró a la sala\\.?$',  // ja_JP
			'^Użytkownik (.*?) dołączył do pokoju\\.?$'  // 폴란드
		];
		var summonerNames = [];
		var pastedData;

		if (e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
			pastedData = e.originalEvent.clipboardData.getData('text');
		} else if (window.clipboardData && window.clipboardData.getData) { // IE
			pastedData = window.clipboardData.getData('Text');
		} else if (e.clipboardData && e.clipboardData.getData) {
			pastedData = e.clipboardData.getData('text/plain');
		}

		var arr = pastedData.split("\r").join("\n").split("\n");

		for (var i = 0; i < arr.length; ++i) {
			var line = $.trim(arr[i]);
			if (!line) continue;

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j];
				var p = line.match(new RegExp(pattern, 'i'));
				if (p) {
					var summonerName = $.trim(p[1]);
					if (summonerNames.indexOf(summonerName) == -1) {
						summonerNames.push(summonerName)
					}
					break;
				}
			}
		}

		if (!summonerNames.length) return true;

		var $this = $(this);
		var inputSelection = $this.getInputSelection();
		var newText = summonerNames.length > 0 ? summonerNames.join(',') : pastedData;
		var text = $this.val().substr(0, inputSelection.start);
		text += newText;
		text += $this.val().substr(inputSelection.end);
		$this.val(text);
		// e.preventDefault();
		// e.target.value = text;

		$this.setInputSelection(inputSelection.start + newText.length);

		if (summonerNames.length > 1) {
			$this.select();
		}
		return false;
	});
});
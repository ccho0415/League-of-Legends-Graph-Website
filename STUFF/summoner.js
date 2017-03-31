$.OP.GG.summoner = {
	closeExtra: function(updateViewSelector){
		var updateView = $(updateViewSelector);
		updateView.html('');
		$(window).resize();
	},
	openMMR: function(summonerName, updateViewSelector){
		var updateView = $(updateViewSelector);
		updateView.addClass('opened');

		var setHTML = function(html){
			updateView.html(html);
			$(window).resize(); // 광고 위치
		};

		setHTML($.OP.GG.common.makeCenteredTableLoader('black'));

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/mmr/',
			data: {
				summonerName: summonerName
			},
			callback: {
				onHTML: function(html){
					if (_isMobile === false)
						updateView.css({height: 'auto', 'padding-top': '40px'});
					setHTML(html);
				},
				onError: function(error){
					if (_isMobile === false)
						updateView.css({height: 'auto', 'padding-top': '40px'});
					setHTML("<div class='SummonerExtraMessage'><div class='Box'><div class='Message'> " + error + "</div><button class='Button' onclick='$.OP.GG.summoner.closeExtra(\"" + updateViewSelector + "\")'></button></div></div>");
				}
			}
		});

		ga('send', 'event', 'button', 'OpenMMR', window.location.hostname);
	},
	checkSpectateStatus: function(summonerName, oButton){
		$.OP.GG.ajax.getJSON({
			url: '/summoner/ajax/spectateStatus/',
			data: {
				summonerName: summonerName
			},
			callback: {
				onJSON: function(json){
					if (json.button) {
						oButton.html(json.button);
					}
					if (json.className) {
						oButton.attr('class', '');
						oButton.addClass(json.className);
					}
					if (json.status) {
						var tp = Tipped.create(oButton[0], json.status, {
							radius: false,
							maxWidth: 320,
							position: 'bottomLeft',
							fadeIn: 0,
							fadeOut: 0
						});
						// 바로 메시지 띄워줌
						if (tp.items()[0]) {
							tp.items()[0].show();

							if (_isMobile) {
								setTimeout(function(){
									tp.items()[0].remove();
								}, 1000);
							}
						}

						// 인게임중인 유저를 검색한건지 아닌지 이벤트 체크
						ga('send', 'event', 'event', 'SummonerPageView-InGame', 'yes');
					} else {
						// 팁 이미 생성된거 삭제
						Tipped.get(oButton[0]).remove();

						// 인게임중인 유저를 검색한건지 아닌지 이벤트 체크
						ga('send', 'event', 'event', 'SummonerPageView-InGame', 'no');
					}
				},
				onError: function(error){
					// 서모너 페이지에서 자동 로딩시에 에러는 표시하지 않음.
					return;
					if (!isAutoLoading) {
						updateView.css({height: 'auto', 'padding-top': '40px'});
						setHTML("<div class='SummonerExtraMessage'><div class='Box'><div class='Message'> " + error + "</div><button class='Button' onclick='$.OP.GG.summoner.closeExtra(\"" + updateViewSelector + "\")'></button></div></div>");
					} else {
						updateView.html('');
					}
				}
			}
		});
	},
	openSpectator: function(summonerName, updateViewSelector, isAutoLoading){
		var updateView = $(updateViewSelector);

		var setHTML = function(html){
			updateView.html(html);
			$(window).resize(); // 광고 위치
		};

		updateView.css({height: '100px'});
		setHTML($.OP.GG.common.makeCenteredTableLoader('black'));

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/spectator3/',
			data: {
				summonerName: summonerName,
				force: true
			},
			callback: {
				onHTML: function(html){
					updateView.css({height: 'auto', 'padding-top': '40px'});
					setHTML(html);
				},
				onError: function(error){
					// 서모너 페이지에서 자동 로딩시에 에러는 표시하지 않음.
					if (!isAutoLoading) {
						updateView.css({height: 'auto', 'padding-top': '40px'});
						setHTML("<div class='SummonerExtraMessage'><div class='Box'><div class='Message'> " + error + "</div><button class='Button' onclick='$.OP.GG.summoner.closeExtra(\"" + updateViewSelector + "\")'></button></div></div>");
					} else {
						updateView.html('');
					}
				}
			}
		});

		ga('send', 'event', 'button', 'OpenSpectator', window.location.hostname);
	},
	openMobileSpectator: function(summonerName){
		$.OP.GG.util.blockBodyScroll(function(end){
			$.OP.GG.common.dim({
				onClose: function(){
					end();
				},
				job: function(setHTML, doClose){
					$.OP.GG.ajax.getHTML({
						url: '/summoner/ajax/spectator3/',
						data: {
							summonerName: summonerName,
							force: true
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

		ga('send', 'event', 'button', 'OpenSpectator', window.location.hostname);
	},
	Delete: function(summonerId){
		if (!confirm('정말로 삭제하시겠습니까? 시즌 데이터, 이전 닉네임 정보가 사라집니다. 복구는 불가능하며 관리자만 이 버튼을 누를 수 있습니다.')) return;

		$.OP.GG.ajax.getJSON({
			url: '/summoner/ajax/del/',
			data: {
				summonerId: summonerId
			},
			callback: {
				onJSON: function(json){
					if (json.success) {
						alert('삭제 되었습니다.');
						location.reload();
					}
				},
				onError: function(error){
					alert('알 수 없는 오류가 발생했습니다.');
				}
			}
		});
	},
	RequireRenewMatch: function(summonerId, gameId, oButton){
		var gameItem = $(oButton).closest('.GameItem'),
			alertLayer = $(oButton).closest('.GameItemAlert');

		alertLayer.startLoading();
		//alertLayer.html($.OP.GG.common.makeCenteredTableLoader('white'));

		$.OP.GG.ajax.getHTML({
			url: '/summoner/matches/ajax/match/',
			data: {
				summonerId: summonerId,
				gameId: gameId
			},
			callback: {
				onHTML: function(html){
					gameItem.replaceWith(html);
				},
				onError: function(error){
					alert(error);
					alertLayer.stopLoading();
				}
			}
		});
	},
	spectator: {
		popup: function(summonerName){
			$.OP.GG.util.blockBodyScroll(function(end){
				$.OP.GG.common.dim({
					onClose: function(){
						end();
					},
					job: function(setHTML, doClose){
						$.OP.GG.ajax.getHTML({
							url: '/summoner/ajax/spectator3/',
							data: {
								summonerName: summonerName,
								force: true
							},
							callback: {
								onHTML: function(html){
									html = "<div style='max-width: 970px;'>" + html + "</div>";
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
	renewBtn: {
		preventReload: false,
		start: function(btn, summonerId){
			$(btn).startLoading({
				maxHeight: 12
			});
			var overBtnWrap = $.OP.GG.util.overElement.get(btn),
				overBtnCloned = null;

			// 버튼 이미 생성되어 있으면 (갱신중이면)
			if (overBtnWrap) {
				return false;
			}

			// 버튼 생성
			$.OP.GG.util.overElement.make(btn);

			overBtnWrap = $.OP.GG.util.overElement.get(btn);
			overBtnCloned = $.OP.GG.util.overElement.getCloned(btn);

			var overBtnWrapInner = overBtnWrap.find('>div');

			// 스무스한 애니메이션을 위해
			overBtnWrapInner.css({
				width: '0%',
				overflow: 'hidden',
				transition: 'width 1s'
			});

			// 덮은 버튼은 색 레드로 바꾸기 - 로딩 이미지 표현
			overBtnCloned.removeClass('Blue').addClass('Red');

			// DO Something
			setTimeout(function(){
				$.OP.GG.summoner.renewBtn.check(false, summonerId, btn);
			}, 1);

			ga('send', 'event', 'button', 'RenewSummonerStat', window.location.hostname);
		},
		check: function(isStatus, summonerId, btn){
			$.OP.GG.ajax.getJSON({
				url: (isStatus ? '/summoner/ajax/renewStatus.json/' : '/summoner/ajax/renew.json/'),
				method: 'post',
				data: {
					summonerId: summonerId
				},
				callback: {
					onJSON: function(json){
						if (json.finish && json['refreshLocation']) {
							$.OP.GG.summoner.renewBtn.finish(btn, json.refreshLocation, json);
						} else {
							if (json.delay) {
								setTimeout(function(){
									$.OP.GG.summoner.renewBtn.check(true, summonerId, btn);
								}, json.delay);
							}
							if (json.current) {
								$.OP.GG.summoner.renewBtn.setButtonWidth(btn, json.current * 100 + "%");
							}
						}
					},
					onError: function(error){
						$.OP.GG.summoner.renewBtn.stop(btn);
						alert(error);
					}
				}
			});
		},
		stop: function(btn){
			$(btn).stopLoading();
			var overBtnWrap = $.OP.GG.util.overElement.get(btn),
				overBtnCloned = $.OP.GG.util.overElement.getCloned(btn);

			overBtnWrap.remove();
			overBtnCloned.remove();
		},
		finish: function(btn, url, json){
			$.OP.GG.summoner.renewBtn.setButtonWidth(btn, '100%');

			// 실패시에는 그냥 강제 새로고침.
			if (json['headerLocation']) {
				$(btn).closest('.tabWrap').trigger('refresh');

				$.ajax(json.headerLocation)
					.done(function(html){
						$('.SummonerLayout>.Header').html(html);
					})
					.fail(function(e, status){
						location.replace(url);
					});
			} else {
				location.replace(url);
			}

			//if ($.OP.GG.summoner.renewBtn.preventReload == false) {
			//	location.replace(url);
			//} else {
			//	// 인풋 창에 포커스가 가있을 땐 페이지를 새로고침 하지 않고 포커스를 빠져나올 때 까지 3초 더 기다린다.
			//	setTimeout(function(){
			//		$.OP.GG.summoner.renewBtn.finish(btn, url);
			//	}, 3000);
			//}
		},
		setButtonWidth: function(btn, width){
			var overBtnWrap = $.OP.GG.util.overElement.get(btn);
			if (!overBtnWrap) return false;

			overBtnWrap.find('>div').width(width);
		}
	},
	mostChampion: {
		loadMore: function(btn){
			var mostBoxContainer = $(btn).closest('.MostChampionContent');

			var lastInfo = mostBoxContainer.data('last-info');
			mostBoxContainer.data('start-info', lastInfo);

			$(btn).startLoading({
				className: 'black',
				minHeight: 50
			});
			$.OP.GG.summoner.mostChampion.reload(mostBoxContainer, function(){
				$(btn).remove();
			});
			return false;
		},
		reload: function(mostBoxContainer, callbackAfterLoad){
			var type = $(mostBoxContainer).data('type'),
				startInfo = $(mostBoxContainer).data('start-info'),
				season = $(mostBoxContainer).data('season'),
				summonerId = $(mostBoxContainer).data('summoner-id');

			var setHTML;

			if (startInfo == 0) {
				setHTML = function(html){
					$(mostBoxContainer).html(html);
				};
				setHTML($.OP.GG.common.makeCenteredTableLoader('black', 300));
			} else {
				setHTML = function(html){
					$(mostBoxContainer).append(html);
				};
			}

			$.OP.GG.ajax.getJSON({
				url: '/summoner/champions/ajax/champions.most.json/',
				data: {
					season: season,
					startInfo: startInfo,
					summonerId: summonerId
				},
				callback: {
					onJSON: function(json){
						setHTML(json['html']);
						$(mostBoxContainer).data('last-info', json['lastInfo']);
					},
					onError: function(error){
						setHTML(error);
					},
					onFinal: function(){
						callbackAfterLoad && callbackAfterLoad();
					}
				}
			});
		}
	},
	openLpHistoryGraph: function(summonerName, updateViewSelector){
		var updateView = $(updateViewSelector);

		var setHTML = function(html){
			updateView.html(html);
			$(window).resize(); // 광고 위치
		};

		setHTML($.OP.GG.common.makeCenteredTableLoader('black'));

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/lpHistory/',
			data: {
				summonerName: summonerName
			},
			callback: {
				onHTML: function(html){
					updateView.css({height: 'auto', 'padding-top': '40px'});
					setHTML(html);
				},
				onError: function(error){
					updateView.css({height: 'auto', 'padding-top': '40px'});
					setHTML("<div class='SummonerExtraMessage'><div class='Box'><div class='Message'> " + error + "</div><button class='Button' onclick='$.OP.GG.summoner.closeExtra(\"" + updateViewSelector + "\")'></button></div></div>");
				}
			}
		});
	},
	lpHistoryGraphChange: function(oButton, summonerId, period){
		var tierGraphBoxSelector = $(oButton).closest('.Box');

		//
		if ($(oButton).closest('.Item').hasClass('active'))
			return false;

		$(".List.Type .Item", tierGraphBoxSelector).removeClass('active'); // 기존 메뉴 active 제거
		$(oButton).closest(".Item").addClass('active'); // 방금 클릭한 메뉴 active

		var setHTML = function(html){
			$("#TierHistoryBigGraph", tierGraphBoxSelector).html(html);
		};

		setHTML($.OP.GG.common.makeCenteredTableLoader('black', 110));

		$.OP.GG.ajax.getJSON({
			url: '/summoner/ajax/lpHistory.json/',
			method: 'post',
			data: {
				summonerId: summonerId,
				period: period
			},
			callback: {
				onJSON: function(json){
					$.OP.GG.matches.graph.lpHistoryGraph('lpHistoryGraph', json);
				},
				onError: function(error){
					setHTML("<div class='ErrorMessage'><div class='Message'> " + error + "</div></div>");
				},
				onFinal: function(){
				}
			}
		});
	}
};

$.OP.GG.matches = {
	list: {
		openOption: function(btn){
			$(btn).closest('.Header').toggleClass('extended');
			$(btn).toggleClass('active');

		},
		changeType: function(type, btn, etc){
			var gameListContainer = $(btn).closest('.GameListContainer');

			$(".List.Type .Item").removeClass('active'); // 기존 메뉴 active 제거
			$(".List.Type .Item[data-type=" + type + "]").addClass('active'); // 방금 클릭한 메뉴 active

			gameListContainer.data('start-info', 0);
			gameListContainer.data('type', type);
			gameListContainer.data('etc', etc);

			$.OP.GG.matches.list.reload(gameListContainer);
		},
		changeChampion: function(championId, btn){
			var gameListContainer = $(btn).closest('.GameListContainer');

			gameListContainer.data('start-info', 0);
			gameListContainer.data('champion-id', championId);

			var wrap = $(".ChampionMatchSearchWrap", gameListContainer);
			var content = $(">.Content", wrap);
			content.hide();

			var searchInput = $(">.Header >.Input", wrap);
			if (!$(btn).closest(".AllChampion").length) {
				searchInput.val(btn.text());
			} else {
				searchInput.val("");
			}

			$.OP.GG.matches.list.reload(gameListContainer);
		},
		changePosition: function(positionType, btn){
			var gameListContainer = $(btn).closest('.GameListContainer');

			gameListContainer.data('start-info', 0);
			gameListContainer.data('position-type', positionType);

			$.OP.GG.matches.list.reload(gameListContainer);
		},
		loadMore: function(btn){
			var gameListContainer = $(btn).closest('.GameListContainer');

			if ($(btn).attr('disabled')) return false;

			$(btn).startLoading({
				className: 'black',
				minHeight: 50
			});

			var lastInfo = gameListContainer.data('last-info');
			gameListContainer.data('start-info', lastInfo);

			$.OP.GG.matches.list.reload(gameListContainer, function(){
				$(btn).removeAttr('disabled');
				$(btn).closest('.GameMoreButton').remove();
			});
			return false;
		},
		reload: function(gameListContainer, callbackAfterLoad){
			var type = $(gameListContainer).data('type'),
				etc = $(gameListContainer).data('etc'),
				startInfo = $(gameListContainer).data('start-info'),
				championId = $(gameListContainer).data('champion-id'),
				positionType = $(gameListContainer).data('position-type'),
				summonerId = $(gameListContainer).data('summoner-id');

			var setHTML;

			if (startInfo == 0) {
				setHTML = function(html){
					$(">.Content", gameListContainer).html(html);
				};
				setHTML($.OP.GG.common.makeCenteredTableLoader('black', 300));
			} else {
				setHTML = function(html){
					$(">.Content", gameListContainer).append(html);
				};
			}

			$.OP.GG.ajax.getJSON({
				url: '/summoner/matches/ajax/averageAndList/',
				data: {
					startInfo: startInfo,
					summonerId: summonerId,
					championId: championId,
					positionType: positionType,
					type: (type == 'etc' ? etc : type)
				},
				callback: {
					onJSON: function(json){
						setHTML(json['html']);
						$(gameListContainer).data('last-info', json['lastInfo']);
					},
					onError: function(error){
						setHTML("<div class='Box'><div class='Content'><div class='ErrorMessage'><div class='Message'> " + error + "</div></div></div></div>");
					},
					onFinal: function(){
						callbackAfterLoad && callbackAfterLoad();
					}
				}
			});
		},
		_summaryData: {},
		_updateSummaryView: function($gameListContainer){
			var summaryData = $.OP.GG.matches.list._summaryData;

			var $wrapper = $gameListContainer.find(".GameAverageStats");

			var totalGames = summaryData.wins + summaryData.losses;
			var $summary = $wrapper.find(".Summary");

			var $title = $wrapper.find(".Title");
			// if ($title.length) {
			// 	$title.find("span").text(totalGames);
			// }

			var winRatio = 0;
			if (totalGames > 0) {
				winRatio = Math.round((summaryData.wins * 100) / totalGames);
			}

			var $span = $title.find("span");
			$span.eq(0).text(totalGames);
			$span.eq(1).text(summaryData.wins);
			$span.eq(2).text(summaryData.losses);

			var $winRatioTitle = $summary.find(".WinRatioTitle");
			var $winRatio = $winRatioTitle.find(".WinRatio");
			if ($winRatio.length) {
				$winRatio.text(winRatio + "%");
			}

			var $winRatioGraph = $gameListContainer.find(".WinRatioGraph");
			if ($winRatioGraph.length) {
				$.OP.GG.matches.graph.winRatioPieChart($winRatioGraph.find(".Graph").attr('id'), summaryData.wins, summaryData.losses);
				$winRatioGraph.find(".Text").text(winRatio + "%");

				$summary.find(".WinRatioText").text(winRatio + "%");
			}

			var $kda = $wrapper.find(_isMobile ? ".KDA" : ".KDA .KDA");
			if (totalGames > 0) {
				$kda.find(".Kill").text(Math.round((summaryData.kills * 10) / totalGames) / 10);
				$kda.find(".Death").text(Math.round((summaryData.deaths * 10) / totalGames) / 10);
				$kda.find(".Assist").text(Math.round((summaryData.assists * 10) / totalGames) / 10);
			} else {
				$kda.find(".Kill").text("0");
				$kda.find(".Death").text("0");
				$kda.find(".Assist").text("0");
			}

			var kdaRatio;
			if (summaryData.deaths == 0) {
				kdaRatio = "Perfect";
			} else {
				kdaRatio = Math.round((((summaryData.kills + summaryData.assists) * 100) / summaryData.deaths)) / 100;
			}

			var $kdaRatio = (_isMobile ? $summary.find(".KDARatio") : $wrapper.find(".KDARatio"));
			$kdaRatio.find(".KDARatio").text(kdaRatio + ":1");

			if (summaryData.contributionsCount > 0) {
				var n = Math.round((summaryData.contributionsSum * 100) / summaryData.contributionsCount);
				$kdaRatio.find(".CKRate span").text(n + "%");
			}
		},
		getKDAClassNameByKDA: function(kda){
			if (kda == 'Perfect') kda = 999;

			if (kda >= 5.0) return "orange";
			if (kda >= 4.0) return "blue";
			if (kda >= 3.0) return "green";
			return "normal";
		},
		getAllKDAClassNames: function(){
			return ['orange', 'blue', 'green', 'normal'];
		},
		_updateSummaryViewMostChampion: function($gameListContainer){
			var arr = [];
			$.each($.OP.GG.matches.list._summaryData.champions, function(key, val){
				arr.push(val);
			});
			arr.sort(function(a, b){
				if (a.games == b.games) {
					var aKDA = (a.deaths == 0 ? 999 : (a.kills + a.assists) / a.deaths);
					var bKDA = (b.deaths == 0 ? 999 : (b.kills + b.assists) / b.deaths);
					return (aKDA > bKDA ? -1 : 1);
				}

				return (a.games > b.games ? -1 : 1);
			});

			var $wrapper = $gameListContainer.find(".GameAverageStats");
			var $mostChampion = $wrapper.find(".MostChampion");
			var $title = $mostChampion.find(".Title");
			var $items = $mostChampion.find(">ul >li");

			if (arr.length > 0) {
				for (var i = 0; i < arr.length; ++i) {
					if (i >= 3) break;
					var kda = (arr[i].deaths == 0 ? "Perfect" : (Math.round((arr[i].kills + arr[i].assists) * 100 / arr[i].deaths)) / 100);
					var $item = $items.eq(i);
					if ($item == undefined) {
						continue;
					}

					$item.find('.NotFound').hide();
					$item.find('.Content').show();
					$item.find(".Image img").attr('src', arr[i].imageUrl);
					$item.find(".Name").text(arr[i].name);

					var winRatio;
					var totalGames = arr[i].wins + arr[i].losses;

					if (totalGames > 0) {
						winRatio = Math.round((arr[i].wins * 100) / totalGames)
					} else {
						winRatio = 0;
					}

					var $wonLose = $item.find(".WonLose");
					var $wonLoseB = $wonLose.find("b");
					$wonLoseB.text(winRatio + "%");

					if (winRatio >= 60) {
						$wonLoseB.addClass("red");
					} else {
						$wonLoseB.removeClass("red");
					}
					var $span = $wonLose.find(">span");
					$span.eq(0).text(arr[i].wins);
					$span.eq(1).text(arr[i].losses);

					var $kda = $item.find(".KDA");
					$kda.find(">span").text(kda);
					$.each($.OP.GG.matches.list.getAllKDAClassNames(), function(i, e){
						$kda.removeClass(e);
					});
					$kda.addClass($.OP.GG.matches.list.getKDAClassNameByKDA(kda));

					$item.show();
				}

				$title.find("span").text(i);
				$title.show();
			} else {
				$title.hide();
			}

			$wrapper.find();
		},
		_updateSummaryViewPosition: function($gameListContainer){
			var arr = [];
			$.each($.OP.GG.matches.list._summaryData.positions, function(key, val){
				arr.push(val);
			});
			arr.sort(function(a, b){
				if (a.games == b.games) {
					return (a.wins > b.wins ? -1 : 1);
				}
				return (a.games > b.games ? -1 : 1);
			});

			var $wrapper = $gameListContainer.find(".GameAverageStats");
			var $positionStats = $wrapper.find(".PositionStats");
			var $items = $positionStats.find(".Content > li");
			if (arr.length > 0) {

				for (var i = 0; i < arr.length; ++i) {
					if (i >= 2) break;

					var $item = $items.eq(i),
						position = arr[i];

					if ($item == undefined) {
						return false;
					}

					$item.show();

					$item.find('.Image > i').attr('class', position.iconClass);
					$item.find('.Name').text(position.positionName);

					$item.find('.RoleRate b').text(function(){
						var totalGames = $.OP.GG.matches.list._summaryData.filteredGameCount;
						return Math.round((position.games * 100) / totalGames);
					}(position));

					$item.find('.WinRatio b').text(function(){
						return Math.round((position.wins * 100) / position.games);
					}(position));
				}
				$positionStats.find('.NotFound').hide();
				$positionStats.find('.Content').show();
			} else {

			}
		},
		updateSummaryByJson: function(json, $gameListContainer, clearPrevData){
			var summaryData = $.OP.GG.matches.list._summaryData;

			if (clearPrevData) {
				summaryData = {
					champions: {},
					positions: {},
					contributionsSum: 0,
					contributionsCount: 0,
					wins: 0,
					losses: 0,
					kills: 0,
					deaths: 0,
					assists: 0,
					filteredGameCount: 0
				}
			}

			$.each(json['champions'], function(key, champion){
				if (typeof(summaryData.champions[key]) == 'undefined') {
					summaryData.champions[key] = champion;
				} else {
					summaryData.champions[key].games += champion.games;
					summaryData.champions[key].kills += champion.kills;
					summaryData.champions[key].deaths += champion.deaths;
					summaryData.champions[key].assists += champion.assists;
					summaryData.champions[key].wins += champion.wins;
					summaryData.champions[key].losses += champion.losses;
				}
			});
			$.each(json['positions'], function(key, position){
				if (typeof(summaryData.positions[key]) == 'undefined') {
					summaryData.positions[key] = position;
				} else {
					summaryData.positions[key].games += position.games;
					summaryData.positions[key].wins += position.wins;
					summaryData.positions[key].losses += position.losses;
				}
			});

			summaryData.filteredGameCount += json.filteredGameCount;
			summaryData.contributionsSum += json.contributionsSum;
			summaryData.contributionsCount += json.contributionsCount;
			summaryData.wins += json.wins;
			summaryData.losses += json.losses;
			summaryData.kills += json.kills;
			summaryData.deaths += json.deaths;
			summaryData.assists += json.assists;

			$.OP.GG.matches.list._summaryData = summaryData;

			if (!clearPrevData) {
				$.OP.GG.matches.list._updateSummaryView($gameListContainer);
			}

			$.OP.GG.matches.list._updateSummaryViewMostChampion($gameListContainer);
			$.OP.GG.matches.list._updateSummaryViewPosition($gameListContainer);
		}
	},
	openDetail: function(gameId, summonerId, gameItemElement){
		gameItemElement.toggleClass('extended');

		var updateView = $(".GameDetail", gameItemElement);
		var isExtended = gameItemElement.hasClass('extended');

		var setHTML = function(html){
			updateView.html(html);
		};

		if (isExtended) {
			setHTML($.OP.GG.common.makeCenteredTableLoader('black', 103));

			$.OP.GG.ajax.getHTML({
				url: '/summoner/matches/ajax/detail/',
				data: {
					gameId: gameId,
					summonerId: summonerId
				},
				callback: {
					onHTML: function(html){
						setHTML(html);
					},
					onError: function(error){
						setHTML("<div class='ErrorMessage'><div class='Message'> " + error + "</div></div>");
					}
				}
			});
		} else {
			setHTML('');
		}
	},
	openBuild: function(gameId, summonerId, gameItemElement){
		gameItemElement.toggleClass('extended');

		var updateView = $(".GameDetail", gameItemElement);
		var isExtended = gameItemElement.hasClass('extended');

		var setHTML = function(html){
			updateView.html(html);
		};

		if (isExtended) {
			setHTML($.OP.GG.common.makeCenteredTableLoader('black', 103));

			$.OP.GG.ajax.getHTML({
				url: '/summoner/matches/ajax/detail/builds',
				data: {
					gameId: gameId,
					summonerId: summonerId
				},
				callback: {
					onHTML: function(html){
						setHTML(html);
					},
					onError: function(error){
						setHTML("<div class='ErrorMessage'><div class='Message'> " + error + "</div></div>");
					}
				}
			});
		} else {
			setHTML('');
		}
	},
	openTimeline: function(gameId, summonerId){
		$.OP.GG.util.blockBodyScroll(function(end){
			$.OP.GG.common.dim({
				onClose: function(){
					end();
				},
				job: function(setHTML, doClose){
					$.OP.GG.ajax.getHTML({
						url: '/match/timeline/',
						data: {
							gameId: gameId,
							summonerId: summonerId
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
	openMatchBuild: function(btn, gameId, summonerId){
		var $gameItemContainer = $(btn).closest('.GameItem'),
			$matchDetail = $(".MatchBuild", $gameItemContainer);

		if ($matchDetail.length > 0) {
			$matchDetail.remove();
			return;
		}

		$gameItemContainer.append("<div class='MatchBuild'></div>");
		$matchDetail = $(".MatchBuild", $gameItemContainer);

		$matchDetail.startLoading({
			className: 'black',
			minHeight: 50
		});

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/matchBuild/',
			data: {
				gameId: gameId,
				summonerId: summonerId
			},
			callback: {
				onHTML: function(html){
					$matchDetail.stopLoading();
					$matchDetail.html(html);
				},
				onError: function(error){
					$matchDetail.stopLoading();
					$matchDetail.html("<div class='ErrorMessage'><div class='Message'> " + error + "</div></div>");
				}
			}
		});

	},
	openPopupRuneMastery: function(btn, gameId, summonerId){
		var contentContainer = $(btn).closest('.Content'),
			RuneMasteryWrap = $(".RuneMasteryWrap", contentContainer);

		if ($(".RuneMasteryPageWrap", RuneMasteryWrap).length > 0) {
			$(RuneMasteryWrap).removeClass('Box');
			$(".RuneMasteryPageWrap", RuneMasteryWrap).remove();
			return;
		}

		$.OP.GG.ajax.getHTML({
			url: '/summoner/ajax/popupRuneMastery3/',
			data: {
				gameId: gameId,
				summonerId: summonerId
			},
			callback: {
				onHTML: function(html){
					$(RuneMasteryWrap).addClass('Box');
					$(RuneMasteryWrap).html(html);
				},
				onError: function(error){
					$(RuneMasteryWrap).html("<div class='ErrorMessage'><div class='Message'> " + error + "</div></div>");
				}
			}
		});
	},
	openReplay: function(gameId){
		$.OP.GG.util.blockBodyScroll(function(end){
			$.OP.GG.common.dim({
				onClose: function(){
					end();
				},
				job: function(setHTML, doClose){
					$.OP.GG.ajax.getHTML({
						url: '/summoner/ajax/replayDialog/',
						data: {
							gameId: gameId
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
	openReportHighlight: function(gameId){
		$.OP.GG.util.blockBodyScroll(function(end){
			$.OP.GG.common.dim({
				onClose: function(){
					end();
				},
				job: function(setHTML, doClose){
					$.OP.GG.ajax.getHTML({
						url: '/summoner/ajax/reportHighlight/',
						data: {
							gameId: gameId
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
	openSpectate: function(gameId){
		$.OP.GG.util.blockBodyScroll(function(end){
			$.OP.GG.common.dim({
				onClose: function(){
					end();
				},
				job: function(setHTML, doClose){
					$.OP.GG.ajax.getHTML({
						url: '/match/new/',
						data: {
							id: gameId
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
	setTimelineFilter: function(input){
		var $teamAnalysisTimeline = $(input).closest('.TeamAnalysisTimeline'),
			$filterItems = $teamAnalysisTimeline.find('input:checked'),
			$listItem = $teamAnalysisTimeline.find('.TeamAnalysisTimelineList ul li');

		if ($filterItems.length == 0) {
			$listItem.show();
			return;
		}

		$listItem.hide();
		$filterItems.each(function(index, filterItem){
			$listItem.filter('.Type-' + $(filterItem).val()).show();
		});
	},
	setTimelineFilterMobile: function(limit, input){
		var $teamAnalysisTimeline = $(input).closest('.TeamAnalysisTimeline'),
			$filterItems = $teamAnalysisTimeline.find('input:checked'),
			$listItem = $teamAnalysisTimeline.find('.TeamAnalysisTimelineList ul li');

		$listItem.hide();
		if ($filterItems.length == 0) {
			$listItem.slice(0, limit).show();
			return $listItem.length;
		}

		$listItem = $listItem.filter($filterItems.map(function(index, filterItem){
			return '.Type-' + $(filterItem).val();
		}).get().join(','));
		$listItem.slice(0, limit).show();

		return $listItem.length;
	},
	setKillMapFilter: function(element, participantId){
		var $teamAnalysisKillMap = $(element).closest('.TeamAnalysisKillMap'),
			$currentFilterListItem = $(element).closest('li'),
			$filterlistItems = $teamAnalysisKillMap.find('.Team ul li'),
			$eventListItems = $teamAnalysisKillMap.find('.Map ul li'),
			$deathEventListItem = $teamAnalysisKillMap.find('.Map ul.Death li');

		if ($currentFilterListItem.hasClass('Active')) {
			$currentFilterListItem.removeClass('Active');
			$eventListItems.show();
			$deathEventListItem.hide();
			return;
		}

		$filterlistItems.removeClass('Active');
		$currentFilterListItem.addClass('Active');
		$eventListItems.each(function(index, eventListItem){
			var $eventListItem = $(eventListItem);
			if ($eventListItem.data('participant-id') == participantId)
				$eventListItem.show();
			else
				$eventListItem.hide();
		});
	},
	graph: {
		winRatioSparkline: function(targetElement){
			$(targetElement).sparkline('html', {
				type: 'pie',
				width: '30px',
				height: '30px',
				offset: -90,
				sliceColors: ['#f46c65', '#069fe0'],
				tooltipFormat: '',
				highlightLighten: '1'
			});
		},
		winRatioPieChart: function(targetElement, win, lose){
			var options = {
				chart: {
					renderTo: targetElement,
					backgroundColor: null,
					borderColor: "transparent",
					borderWidth: 0,
					polar: true,
					spacing: 0,
					margin: [0, 0, 0, 0],
					type: 'pie'
				},
				credits: {
					enabled: !1
				},
				legend: {
					enabled: !1
				},
				title: {
					text: null
				},
				xAxis: {},
				yAxis: {
					lineWidth: 0,
					labels: {
						enabled: !1
					}
				},
				plotOptions: {
					pie: {
						size: 90,
						allowPointSelect: !1,
						dataLabels: {
							enabled: !1
						},
						innerSize: 64,
						enableMouseTracking: !1,
						animation: !1,
						borderWidth: 0
					}
				},
				series: [{
					data: [
						{
							y: lose,
							color: '#ee5a52'
						}, {
							y: win,
							color: '#1f8ecd'
						}
					]
				}]
			};

			var chart = new Highcharts.Chart(options);
		},
		timelineChampionCommon: function(targetElement, params){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'spline',
					backgroundColor: null
				},
				credits: {
					enabled: false
				},
				title: {
					text: params.title,
					style: {
						color: '#333',
						'font-size': '14px'
					}
				},
				tooltip: {
					useHTML: true,
					formatter: function(){
						return '<b>' + this.series.name + ' ' + this.series.options.title + '</b><br/> ' + this.point.x + 'm: ' + Highcharts.numberFormat(this.y, 0) + ' ' + params.titleTooltipTail;
					}
				},
				plotOptions: {
					spline: {
						marker: {
							enabled: false
						}
					},
					series: {
						lineWidth: 1,
						shadow: false
					}
				},
				legend: {
					useHTML: true,
					borderWidth: 1
				},
				xAxis: {
					lineColor: '#7F8C8D', lineWidth: 1,
					gridLineColor: "#D0D7DB", gridLineWidth: 1, gridLineDashStyle: 'solid',
					labels: {
						format: '{value}m'
					}
				},
				yAxis: {
					lineWidth: 1, lineColor: '#7F8C8D',
					gridLineWidth: 1, gridLineColor: "#D0D7DB",
					title: {
						text: params.titleAxisY,
						style: {
							color: '#333',
							'font-size': '12px'
						}
					},
					min: 0,
					plotLines: [
						{
							value: 0,
							width: 1,
							color: '#808080'
						}
					]
				},
				series: []
			};

			(function(options){
				var chart;
				if (params.series) {
					options.series = params.series;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		timelineTeamGoldGain: function(targetElement, params){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'spline',
					backgroundColor: null
				},
				credits: {
					enabled: false
				},
				title: {
					text: null,
					style: {
						color: '#333',
						'font-size': '13px',
						'font-weight': 'bold'
					}
				},
				tooltip: {
					useHTML: true,
					formatter: function(){
						return '<b>' + this.series.name + '</b><br/> ' + this.point.x + 'm: ' + Highcharts.numberFormat(this.y, 0) + ' Gold';
					},
					valueSuffix: '%'
				},
				plotOptions: {
					spline: {
						marker: {
							enabled: false
						}
					},
					series: {
						lineWidth: 2,
						shadow: false
					}
				},
				legend: {
					enabled: false
				},
				xAxis: {
					lineColor: '#7F8C8D', lineWidth: 1,
					gridLineColor: "#D0D7DB", gridLineWidth: 1, gridLineDashStyle: 'solid',
					labels: {
						format: '{value}m'
					}
				},
				yAxis: {
					lineWidth: 1, lineColor: '#7F8C8D',
					gridLineWidth: 1, gridLineColor: "#D0D7DB",
					title: {
						text: null,
						style: {
							color: '#333',
							'font-size': '12px',
							'font-weight': 'bold'
						}
					},
					min: 0,
					plotLines: [
						{
							value: 0,
							width: 1,
							color: '#808080'
						}
					]
				},
				series: [
					{
						name: "Blue",
						data: []
					},
					{
						name: "Red",
						color: "#c6443e",
						lineColor: "#c6443e",
						data: []
					}
				]
			};

			(function(options){
				var chart;
				if (params.seriesData) {
					options.series[0].data = params.seriesData.blue;
					options.series[1].data = params.seriesData.purple;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		timelineTeamGoldGainDiff: function(targetElement, params){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'line',
					backgroundColor: null
				},
				colors: [
					'#ddd'
				],
				credits: {
					enabled: false
				},
				title: {
					text: null,
					style: {
						color: '#333',
						'font-size': '13px',
						'font-weight': 'bold'
					}
				},
				tooltip: {
					useHTML: true,
					formatter: function(){
						return '<b>' + this.point.name + '</b><br/>' + this.point.x + '분: ' + Highcharts.numberFormat(this.y, 0) + ' Gold Difference';
					}
				},
				xAxis: {
					lineColor: '#7F8C8D', lineWidth: 1,
					gridLineColor: "#D0D7DB", gridLineWidth: 1, gridLineDashStyle: 'solid',
					labels: {
						format: '{value}m'
					}
				},
				yAxis: {
					lineWidth: 1, lineColor: '#7F8C8D',
					gridLineWidth: 1, gridLineColor: "#D0D7DB",
					title: {
						text: null,
						style: {
							color: '#333',
							'font-size': '12px',
							'font-weight': 'bold'
						}
					},
					min: 0,
					plotLines: [
						{
							value: 0,
							width: 1,
							color: '#808080'
						}
					]
				},
				plotOptions: {
					series: {
						lineWidth: 4,
						lineColor: "#D3D3D3",
						shadow: false
					}
				},
				legend: {
					enabled: false
				},
				series: [
					{
						name: "GOLD_DIFF",
						data: []
					}
				]
			};

			(function(options){
				var chart;
				if (params.seriesData) {
					options.series[0].data = params.seriesData;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		timelineTeamChampionKillDiff: function(targetElement, params){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'line',
					backgroundColor: null
				},
				colors: [
					'#ddd'
				],
				credits: {
					enabled: false
				},
				title: {
					text: null,
					style: {
						color: '#333',
						'font-size': '13px',
						'font-weight': 'bold'
					}
				},
				tooltip: {
					useHTML: true,
					formatter: function(){
						return '<b>' + this.point.name + '</b><br/>' + this.point.x + 'm: ' + Highcharts.numberFormat(this.y, 0) + ' Kills Difference';
					}
				},
				xAxis: {
					lineColor: '#7F8C8D', lineWidth: 1,
					gridLineColor: "#D0D7DB", gridLineWidth: 1, gridLineDashStyle: 'solid',
					labels: {
						format: '{value}m'
					}
				},
				yAxis: {
					lineWidth: 1, lineColor: '#7F8C8D',
					gridLineWidth: 1, gridLineColor: "#D0D7DB",
					title: {
						text: 'Difference of kills',
						style: {
							color: '#333',
							'font-size': '12px',
							'font-weight': 'bold'
						}
					},
					min: 0,
					plotLines: [
						{
							value: 0,
							width: 1,
							color: '#808080'
						}
					]
				},
				plotOptions: {
					series: {
						lineWidth: 4,
						lineColor: "#D3D3D3",
						shadow: false
					}
				},
				legend: {
					enabled: false
				},
				series: [
					{
						name: "CHAMPION_KILL_DIFF",
						data: []
					}
				]
			};

			(function(options){
				var chart;
				if (params.seriesData) {
					options.series[0].data = params.seriesData;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		lpHistorySummaryGraph: function(targetElement, data){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'line',
					backgroundColor: '#fafafa',
					height: 118,
					margin: 0,
					marginBottom: 25,
					events: {
						load: function(){
							var series = this.series[0],
								len = series.data.length;
							series.data[len - 1].update({
								marker: {
									enabled: true,
									fillColor: "#00b4ff",
									lineWidth: 2, lineColor: "#00b4ff"
								}
							});
						}
					}
				},
				credits: {enabled: false},
				title: {
					text: ''
				},
				legend: {
					enabled: false
				},
				xAxis: {
					lineWidth: 0,
					gridLineDashStyle: 'ShortDot',
					gridLineWidth: 1,
					gridLineColor: "#e6e6e6",
					tickColor: "#e6e6e6",
					categories: data['categories'],
					labels: {
						style: {
							color: '#999',
							fontSize: '12px',
							fontFamily: 'Dotum'
						}
					}
				},
				yAxis: {
					title: {
						text: ''
					},
					labels: {
						enabled: false
					},
					gridLineWidth: 0
				},
				tooltip: {
					borderWidth: 0,
					backgroundColor: '#000',
					formatter: function(){
						return '<span style="color:#fff;font-size:11px;letter-spacing:-1px;">' + this.point.name + '</span>';
					}
				},
				plotOptions: {
					line: {
						lineColor: "#00b4ff", states: {
							hover: {
								lineWidth: 2
							}
						},
						marker: {
							enabled: false,
							states: {
								hover: {
									enable: true,
									fillColor: "#FFF",
									lineWidth: 2, lineColor: "#00b4ff"
								}
							}
						},
						animation: false
					}
				},
				series: [{
					data: data['data']
				}]
			};
			(function(options){
				var chart;
				chart = new Highcharts.Chart(options);
			})(options);
		},
		lpHistoryGraph: function(targetElement, data){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'line',
					backgroundColor: null,
					height: 106,
					margin: 0,
					marginTop: 0,
					marginBottom: 30
				},
				credits: {enabled: false},
				title: {text: ''},
				legend: {enabled: false},
				xAxis: {
					lineWidth: 1,
					lineColor: '#e0e0e0',
					alternateGridColor: '#e7e7e7',
					tickWidth: 0,
					categories: data['categories'],
					labels: {
						style: {
							color: '#999',
							fontSize: '12px'
						}
					}
				},
				yAxis: {
					title: {
						text: ''
					},
					labels: {enabled: false},
					gridLineWidth: 0
				},
				tooltip: {enabled: false},
				plotOptions: {
					line: {
						states: {
							hover: {enabled: false}
						},
						marker: {
							enabled: false
						},
						animation: false,
						zoneAxis: 'y',
						zones: [{
							value: 1185,
							color: '#6a5b3f'
						}, {
							value: 1470,
							color: '#9ea3b0'
						}, {
							value: 1755,
							color: '#e8aa34'
						}, {
							value: 2040,
							color: '#04b1a1'
						}, {
							value: 2325,
							color: '#048ab4'
						}, {
							color: '#fa576f'
						}]
					}
				},
				series: [{
					data: data['data'],
					marker: {
						enabled: true
					},
					dataLabels: {
						enabled: true,
						crop: false,
						align: 'center',
						useHTML: true,
						style: {
							color: '#999',
							fontWeight: 'normal'
						},
						formatter: function(){
							return '<div style="text-align:center;"><b style="color: #555">' + this.point.tierRank + '</b><br>' + this.point.lp + 'LP</div>';
						}
					}
				}]
			};
			(function(options){
				var chart;
				chart = new Highcharts.Chart(options);
			})(options);
		}
	},
	chart: {
		timelineTeamCommon: function(targetElement, params){
			var options = {
				chart: {
					renderTo: targetElement,
					type: 'pie',
					backgroundColor: null
				},
				credits: {
					enabled: false
				},
				title: {
					text: params.title,
					style: {
						color: '#333',
						'font-size': '12px',
						'font-weight': 'bold'
					}
				},
				plotOptions: {
					pie: {
						shadow: false
					}
				},
				tooltip: {
					useHTML: true,
					formatter: function(){
						return '<b>' + this.key + '</b>: ' + Highcharts.numberFormat(this.y, 0, 0, ",") + params.valueSuffix;
					},
					valueSuffix: params.valueSuffix
				},
				series: [
					{
						name: "TEAM",
						data: [],
						size: '90%',
						dataLabels: {
							formatter: function(){
								return this.y > 0 ? Highcharts.numberFormat(this.y, 0, 0, ",") : null;
							},
							distance: -35,
							style: {
								fontFamily: 'Dotum',
								fontSize: '11px',
								color: '#ECF0F1'
							}
						}
					},
					{
						name: "PLAYER",
						data: [],
						innerSize: '90%',
						dataLabels: {
							formatter: function(){
								return null;
							}
						}
					}
				]
			};

			(function(options){
				var chart;
				if (params.seriesData) {
					options.series[0].data = params.seriesData.team;
					options.series[1].data = params.seriesData.player;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		teamAnalysisPie: function(targetElement, series){
			var options = {
				chart: {
					renderTo: targetElement,
					backgroundColor: null,
					borderColor: "transparent",
					borderWidth: 0,
					polar: true,
					spacing: 0,
					margin: [0, 0, 0, 0],
					type: 'pie'
				},
				credits: {
					enabled: !1
				},
				legend: {
					enabled: !1
				},
				title: {
					text: null
				},
				xAxis: {},
				yAxis: {
					lineWidth: 0,
					labels: {
						enabled: !1
					}
				},
				plotOptions: {
					pie: {
						size: 80,
						allowPointSelect: !1,
						dataLabels: {
							enabled: !1
						},
						innerSize: 70,
						enableMouseTracking: !1,
						animation: !1,
						borderWidth: 0
					}
				}
			};

			(function(options){
				var chart;
				if (series) {
					options.series = series;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		teamAnalysisSpline: function(targetElement, width, height, series, categories){
			var options = {
				chart: {
					renderTo: targetElement,
					backgroundColor: null,
					borderColor: "transparent",
					borderWidth: 0,
					type: 'spline',
					width: width,
					height: height
				},
				credits: {
					enabled: !1
				},
				legend: {
					enabled: !1
				},
				title: {
					text: null
				},
				tooltip: {
					shared: true
				},
				xAxis: {
					title: {
						enabled: !1
					}
				},
				yAxis: {
					allowDecimals: false,
					title: {
						enabled: !1
					}
					// lineWidth: 0,
					// labels: {
					//     enabled: !1
					// }
				},
				plotOptions: {
					spline: {
						marker: {
							enabled: !1
						},
						states: {
							hover: {
								fillColor: '#fff'
							}
						}
					}
				}
			};

			(function(options){
				var chart;
				if (series) {
					options.xAxis.categories = categories;
					options.series = series;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		teamAnalysisLine: function(targetElement, width, height, series, categories){
			var options = {
				chart: {
					renderTo: targetElement,
					backgroundColor: null,
					borderColor: "transparent",
					borderWidth: 0,
					type: 'line',
					width: width,
					height: height
				},
				credits: {
					enabled: !1
				},
				legend: {
					enabled: !1
				},
				title: {
					text: null
				},
				tooltip: {
					shared: true
				},
				xAxis: {
					title: {
						enabled: !1
					}
				},
				yAxis: {
					allowDecimals: false,
					title: {
						enabled: !1
					}
				},
				plotOptions: {
					series: {
						enabled: true
					}
				}
			};

			(function(options){
				var chart;
				if (series) {
					options.xAxis.categories = categories;
					options.series = series;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		goldLine: function(targetElement, params){
			var width = 690, height = 400;
			if ($(window).width() < 690) {
				width = $(window).width();
				height = 280;
			}
			var options = {
				chart: {
					renderTo: targetElement,
					backgroundColor: null,
					borderColor: "transparent",
					borderWidth: 0,
					type: 'spline',
					width: width,
					height: height
				},
				credits: {
					enabled: !1
				},
				title: {
					text: null
				},
				tooltip: {
					shared: true,
					useHTML: true
				},
				legend: {
					align: 'center',
					x: 0,
					y: 10,
					backgroundColor: '#272D31',
					color: '#fff',
					layout: 'horizontal',
					floating: true,
					verticalAlign: 'top',
					shadow: false,
					border: 0,
					borderRadius: 0,
					borderWidth: 0
				},
				xAxis: {
					title: {
						enabled: !1
					}
				},
				yAxis: {
					title: {
						enabled: !1
					}
				},
				plotOptions: {
					spline: {
						marker: {
							enabled: false
						}
					},
					series: {
						lineWidth: 1,
						shadow: false
					}
				},
				series: []
			};

			(function(options){
				var chart;
				if (params.series) {
					options.series = params.series;
					options.xAxis.categories = params.categories;
					chart = new Highcharts.Chart(options);
				} else {
					chart = new Highcharts.Chart(options);
				}
			})(options);
		},
		goldLineLegendToggle: function(button, graph, plusIndex){
			var $currentListItem = $(button).closest('li'),
				currentIndex = $currentListItem.closest('ul').find('li').index($currentListItem);

			if (plusIndex == undefined) {
				plusIndex = 1;
			} else {
				plusIndex += 1;
			}

			$(graph).find('.highcharts-legend-item:nth-child(' + (currentIndex + plusIndex) + ')').click();
			$currentListItem.toggleClass('Active');
		}
	}
};
var ChampionController = require("./ChampionController");
var MatchController = require("./MatchController");
var MasteryController = require("./MasteryController");
var RuneController = require("./RuneController");
var  ItemController = require("./ItemController");
module.exports = {
	champion: ChampionController,
	match: MatchController,
	mastery: MasteryController,
	rune: RuneController,
	item: ItemController
}
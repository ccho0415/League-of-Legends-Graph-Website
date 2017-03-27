apikey = 

from riotwatcher import RiotWatcher,LoLException
import Queue
import datetime
import time
import cPickle as pickle
from sqlitedict import SqliteDict
import os.path
from urllib2 import HTTPError

error_400 = "Bad request"
error_401 = "Unauthorized"
error_403 = "Blacklisted key"
error_404 = "Game data not found"
error_429 = "Too many requests"
error_500 = "Internal server error"
error_503 = "Service unavailable"
error_504 = 'Gateway timeout'

startup = time.time()


w = RiotWatcher(apikey)

challenger = w.get_challenger()
masters = w.get_master()

tier_dict = {x:i for i, x in enumerate(['CHALLENGER', 'MASTER', 'DIAMOND', 'PLATINUM', 'GOLD', 'SILVER', 'BRONZE'])}

player_tiers = {x['playerOrTeamId']:0 for x in challenger['entries']}
#player_tiers.update({x['playerOrTeamId']:1 for x in masters['entries']})

players = Queue.PriorityQueue()

a = [players.put((player_tiers[x['playerOrTeamId']],x['playerOrTeamId'])) for x in challenger['entries']]# + masters['entries']]

epoch = datetime.datetime.utcfromtimestamp(0)

def unix_time_millis(dt):
    return (dt - epoch).total_seconds() * 1000.0

def timeout():
	while not w.can_make_request():
		time.sleep(1)
	return

def rito_wrapper(f, arg=None):
	while True:
		try:
			timeout()
			ans = f(arg)
			return ans
		except LoLException as e:
			if e in [error_429, error_500, error_503, error_504]: continue
			raise e
		except HTTPError as e:
			pass
	

start_68 = datetime.datetime(year=2016, month=4, day=22)
end_68 = datetime.datetime(year=2016, month=5, day=2)

timestamp_68_start = unix_time_millis(start_68)
timestamp_68_end = unix_time_millis(end_68)

done_players = 0

if os.path.isfile("games.sqlite"):
	#with open("game_data.pkl", "rb") as fp:
	player_tiers = SqliteDict("player_tiers.sqlite", autocommit=True)
	done_games = SqliteDict("games.sqlite", autocommit=True)
	oldie = players.qsize()
	player_tiers.update({x['playerOrTeamId']:1 for x in masters['entries']})
	players = Queue.PriorityQueue()
	a = [players.put((player_tiers[x], x)) for x in player_tiers]
	print "Queue length has been modified from %d to %d" % (oldie, players.qsize())
else:
	player_tiers = SqliteDict("player_tiers.sqlite")
	player_tiers.update({x['playerOrTeamId']:0 for x in challenger['entries']})
	done_games = SqliteDict("games.sqlite")

gold=False

#for i in range(2090): players.get(); done_players += 1 # 19942923

while not players.empty():
	curr = players.get()
	if curr[0] > 3 and not gold: done_games = SqliteDict("games_gold.sqlite");gold=True
	curr = curr[1]
	oldie = players.qsize()
	print "Working on %s" % curr
	try:
		curr_games = rito_wrapper(w.get_match_list, curr)
	except:
		with open("problems.txt", "ab") as fp: fp.write("problem with %s\n" % curr)
		continue
	games_68 = [x for x in curr_games['matches'] if (timestamp_68_start <= x['timestamp'] <= timestamp_68_end) and x['queue'] == 'TEAM_BUILDER_DRAFT_RANKED_5x5']
	print "Total of %d games played in the timeframe" % len(games_68)
	games_68 = [x['matchId'] for x in games_68 if x['matchId'] not in done_games]
	print "Adding %d games" % len(games_68)
	for game in games_68:
		try:
			game_info = rito_wrapper(w.get_match,game)
		except:
			continue
		done_games[game] = game_info
		for other in game_info['participantIdentities']:
			try:
				other_id = unicode(other['player']['summonerId'])
			except KeyError:
				with open("problems.txt", "ab") as fp: fp.write("problem with %s, %d\n" % (curr, done_players))
				continue
			if other_id in player_tiers: continue
			try:
				player_tiers[other_id] = tier_dict[rito_wrapper(w.get_league_entry,[other_id])[other_id][0]['tier']]
				players.put((player_tiers[other_id], other_id))
			except:
				continue
	done_players += 1
	print "Committing..."
	done_games.commit()
	player_tiers.commit()
	print "Added %d players to the queue. %d/%d players processed. %d games gathered." % (players.qsize() - oldie, done_players,len(player_tiers), len(done_games))

	
print "Took %d seconds" % (time.time() - startup)
	
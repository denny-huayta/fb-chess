require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'mongo_mapper'
require 'uuid'

class Game
	include MongoMapper::Document

	key :item,				Integer
	key :gameId,			String	
	key :player1,			String # name
	key :player1Id,			String # Id
	key :player1UserName,	String # username
	key :player1Email,		String
	key :player2,			String # name
	key :player2Id,			String # Id
	key :player2UserName,	String # username
	key :player2Email,		String
	key :url,				String
	key :currentPlayer,		String
	key :currentPlayerId,	String
	key :winner,			String
	key :winnerId,			String
	key :status,			String
	key :creationDate,		String
	key :lastMove,			String
	key :chessBoards,		String

	# validations
	# validates_presence_of :gameId, :player1

end
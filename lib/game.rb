require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'mongoid'
require 'json'
require 'mongo_mapper'
require 'uuid'

class Game
	include MongoMapper::Document

	key :gameId,		String
	key :player1,		String
	key :player2,		String
	key :url,			String
	key :current,		String
	key :winner,		String
	key :status,		String
	key :chessBoards,	String

	# validations
	# validates_presence_of :gameId, :player1

end
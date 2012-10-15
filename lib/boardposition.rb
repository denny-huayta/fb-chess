require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'mongo_mapper'
require 'uuid'

class Game
	include MongoMapper::Document

	key :gameId,			String
	key :Name,				String	
	key :position,			String
	key :playerId,			String
	
	# validations
	# validates_presence_of :gameId, :player1

end
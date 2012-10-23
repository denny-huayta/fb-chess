require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'mongo_mapper'
require 'uuid'

class Chessboard
	include MongoMapper::Document

	key :gameId,			String
	key :playerId,			String
	key :piece,				String
	key :origin,			String
	key :final,				String
	key :status,			String
	key :lastModified,		Date
	# validations
	# validates_presence_of :gameId, :player1

end
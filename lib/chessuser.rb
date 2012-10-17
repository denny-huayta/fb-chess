require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'mongo_mapper'
require 'uuid'

class ChessUser
	include MongoMapper::Document
	key :userId,			String
	key :name,				String # name
	key :userName,			String # username
	key :email,				String
	key :tokken,			String
	key :creationDate,		String

	# validations
	# validates_presence_of :gameId, :player1

end
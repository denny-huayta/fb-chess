require 'uuid' 
require 'mongo'
require 'sinatra'
require 'mongoid'
require 'json'
require "sinatra/reloader" if development?

Mongoid.load!("mongoid.yml")

class Price    
	include Mongoid::Document        

	field :gameId, type: Integer    
	field :player1, type: String    
	field :player2, type: String    
	field :urlGame, type: String    
	field :current, type: String    
	field :winner, type: String    
	field :status, type: String
	field :chessBoard, type: String

end
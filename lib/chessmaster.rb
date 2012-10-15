APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'json'
require 'mongo_mapper'
require 'uri'
#require 'uuid'

require_relative 'game'
require_relative 'chessboard'

# register your app at facebook to get those infos
APP_ID = 386008508137576 # your app id
APP_CODE = '1fcec4d0014d0dd766c12bd54a65e27b' # your app code
SITE_URL = 'http://fb-chess.herokuapp.com/' # your app site url
#SITE_URL = 'http://localhost:9292/'
#MONGOHQ_URL = 'mongodb://<user>:<pass>@hatch.mongohq.com:10034/app003132345'
#MONGOHQ_URL = 'mongodb://denny_ha@hotmail.com:P@ssw0rd@alex.mongohq.com:10019/app8043150'

class CHESSMASTER < Sinatra::Application
	
	include Koala

	set :root, APP_ROOT
	enable :sessions

	# Mongo Mapper Connection
	#MongoMapper.connection = Mongo::Connection.new('localhost',27017, :pool_size => 5, :timeout => 5)
	#MongoMapper.database = 'mydb'
	#MongoMapper.database.authenticate('','')

	#db = URI.parse(ENV['MONGOHQ_URL'])
 	#db_name = db.path.gsub(/^\//, '')
 	#MongoMapper.connection  = Mongo::Connection.new(db.host, db.port).db(db_name)
 	#MongoMapper.database	= 'ChessDB'
 	#MongoMapper.database.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
 	
 	db = URI.parse(ENV['MONGOHQ_URL'])
	db_name = db.path.gsub(/^\//, '')
	@db_connection = Mongo::Connection.new(db.host, db.port).db(db_name)
	@db_connection.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
	

	MongoMapper.connection  = @db_connection
	#MongoMapper.database	= 'ChessDB'

	get '/' do

		# TO BE DELETED
		#session['userId']	= '123456789'
		#session['name']		= 'Denny Huayta'
		#session['username']	= 'dhuayta'
		#session['email']	= 'denny_ha@hotmail.com'


		if session['access_token']
		 	#'You are logged in! <a href="/logout">Logout</a>'
			# do some stuff with facebook here
			# for example:
			#@graph = Koala::Facebook::GraphAPI.new(session["access_token"])
			# publish to your wall (if you have the permissions)
			#@graph.put_wall_post("Sign up from Chessmaster!" + Time.now.to_s )
			# or publish to someone else (if you have the permissions too ;) )
			# @graph.put_wall_post("Checkout my new cool app!", {}, "someoneelse's id")

			@api = Koala::Facebook::API.new(session[:access_token])
			@user_info = @api.get_object("me")
			session['userId']	= @user_info['id']
			session['name']		= @user_info['name']
			session['username']	= @user_info['username']
			session['email']	= @user_info['email']

			erb :index
		else
			erb :index
		end		
	end

	get '/login' do
		# generate a new oauth object with your app data and your callback url
		session['oauth'] = Facebook::OAuth.new(APP_ID, APP_CODE, SITE_URL + 'callback')
		# redirect to facebook to get your code
		redirect session['oauth'].url_for_oauth_code(:permissions => "publish_stream")
		# redirect session['oauth'].url_for_oauth_code()
	end

	get '/logout' do
		session['oauth'] = nil
		session['access_token'] = nil
		redirect '/'
	end

	#method to handle the redirect from facebook back to you
	get '/callback' do
		#get the access token from facebook with your code
		session['access_token'] = session['oauth'].get_access_token(params[:code])
		redirect '/'
	end

	get '/games' do

		@games = Game.all(:order => :item.asc)
		#session['games'] = @games
		#if session['access_token']		
		erb :games
		#else
  			#redirect '/login'
  		#end
	end

	get '/mygames' do
		@player1Id = session['userId']
		@games = Game.where(:player1Id => @player1Id).order(:item)
		#session['games'] = @games
		#if session['access_token']		
		erb :games
		#else
  			#redirect '/login'
  		#end
	end

	get '/chessboard' do
		#if session['access_token']
		erb :chessboard
		#else
			#redirect '/login'
		#end
  		
	end

	get '/see' do
		@gameId = params[:game]
		@game = Game.where(:gameId => @gameId).first

		erb :chessboard

	end

	get '/play' do
		@gameId		= params[:gameId]
		@piece		= params[:piece]
		@origin		= params[:origin]
		@final		= params[:final]
		@playerId 	= session['userId']

		chessboard = Chessboard.where(:gameId => @gameId, :playerId => @playerId, :piece => @piece).first

		chessboard.update_attributes(
				:origin			=> @origin,
				:final			=> @final,
				:lastModified	=> Time.now.to_s
			)
		
		result = Chessboard.where(:gameId => @gameId)

		return result.to_json

	end

	get '/about' do
		erb :about
	end

	get '/new' do
		uuid = UUID.new
		game = Game.new

		game.item				= Game.count + 1
		game.gameId	 			= uuid.generate
		game.player1 			= session['name']
		game.player1Id			= session['userId']
		game.player1UserName	= session['username']
		game.player1Email		= session['email']
		game.creationDate		= Time.now.to_s
		game.status				= 'New'
		game.url     			= 'http://fb-chess.herokuapp.com/see?game=' +  game.gameId

		
		if game.save
			status 201
		else
			status 401
		end

		# Load chessboard 
		chessboard = Chessboard.new

		chessboard.gameId		= game.gameId
		chessboard.playerId		= session['userId']
		chessboard.piece		= 'BlackHose'
		chessboard.origin		= 'A2'
		chessboard.final		= 'C1'

		if chessboard.save
			status 201
		else
			status 401
		end

		@games = Game.all(:order => :item.asc)

		erb :games
	end

	get '/challenge' do
		@gameId = params[:game]
		game = Game.where(:gameId => @gameId).first

		game.update_attributes(
			:player2 => 'Jose Perez',
			:currentPlayer => game.player1,
			:currentPlayerId => game.player1Id,
			:status => 'In Progress'
			)

		@games = Game.all(:order => :item.asc)

		erb :games
	end

	get '/deleteall' do
		Game.destroy_all
		@games = Game.all

		erb :games
	end

end


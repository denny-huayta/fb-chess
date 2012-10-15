APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'json'
require 'mongo_mapper'
#require 'uuid'

require_relative 'game'

# register your app at facebook to get those infos
APP_ID = 386008508137576 # your app id
APP_CODE = '1fcec4d0014d0dd766c12bd54a65e27b' # your app code
SITE_URL = 'http://fb-chess.herokuapp.com/' # your app site url

class CHESSMASTER < Sinatra::Application
	
	include Koala

	set :root, APP_ROOT
	enable :sessions

	# Mongo Mapper Connection
	MongoMapper.connection = Mongo::Connection.new('localhost',27017, :pool_size => 5, :timeout => 5)
	MongoMapper.database = 'mydb'
	#MongoMapper.database.authenticate('','')

	get '/' do
		if session['access_token']
		 	#'You are logged in! <a href="/logout">Logout</a>'
			# do some stuff with facebook here
			# for example:
			@graph = Koala::Facebook::GraphAPI.new(session["access_token"])
			# publish to your wall (if you have the permissions)
			@graph.put_wall_post("Sign up from Chessmaster!" + Time.now.to_s )
			# or publish to someone else (if you have the permissions too ;) )
			# @graph.put_wall_post("Checkout my new cool app!", {}, "someoneelse's id")
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

	get '/about' do
		erb :about
	end

	get '/new' do
		uuid = UUID.new
		game = Game.new

		game.item	 = Game.count + 1
		game.gameId	 = uuid.generate
		game.player1 = 'Denny Huayta'
		game.status	 = 'New'
		game.url     = 'http://fb-chess.herokuapp.com'

		if game.save
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


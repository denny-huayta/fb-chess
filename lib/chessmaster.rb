APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'
require 'koala'
require 'mongo'
require 'json'
require 'mongo_mapper'
require 'uri'

require_relative 'game'
require_relative 'chessboard'
require_relative 'chessmasterbo'
require_relative 'chessuser'

# register your app at facebook to get those infos
APP_ID = 386008508137576 # your app id
APP_CODE = '1fcec4d0014d0dd766c12bd54a65e27b' # your app code
#SITE_URL = 'http://fb-chess.herokuapp.com/' # your app site url
SITE_URL = 'http://localhost:9292/'

class CHESSMASTER < Sinatra::Application
	
	include Koala

	set :root, APP_ROOT
	enable :sessions

	chessmasterbo = Chessmasterbo.new

	# Mongo Mapper Connection
	MongoMapper.connection = Mongo::Connection.new('localhost',27017, :pool_size => 5, :timeout => 5)
	MongoMapper.database = 'mydb'

	#db = URI.parse(ENV['MONGOHQ_URL']) 	
 	#MongoMapper.connection  = Mongo::Connection.new(db.host, db.port)
 	#MongoMapper.database = 'app8043150'
 	#MongoMapper.database.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)

	get '/' do

		if session['access_token']

			@api = Koala::Facebook::API.new(session[:access_token])
			@user_info = @api.get_object("me")

			session['userInfo'] = @user_info
			chessmasterbo.verifyuser(@user_info, session[:access_token])
			#session['userId']	= @user_info['id']
			#session['name']		= @user_info['name']
			#session['username']	= @user_info['username']
			#session['email']	= @user_info['email']

			erb :index
		else
			erb :index
		end		
	end

	get '/login' do		
		session['oauth'] = Facebook::OAuth.new(APP_ID, APP_CODE, SITE_URL + 'callback')
		redirect session['oauth'].url_for_oauth_code(:permissions => "publish_stream")
		# Save UserInfo
		@api = Koala::Facebook::API.new(session[:access_token])
		@user_info = @api.get_object("me")
		session['userInfo'] = @user_info
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
		if session['access_token']		
			erb :games
		else
  			redirect '/login'
  		end
	end

	get '/new' do
		if session['access_token']	
			userInfo = session['userInfo']		
			game = chessmasterbo.newgame(userInfo)
			chessmasterbo.loadchessboardwhite(game.gameId, userInfo)
			# publish Facebook
			#chessmasterbo.putwallpost(session["access_token"], game.player1 + " has created a chess game.! " + game.url)
			redirect '/games'
		else
  			redirect '/login'
  		end
	end

	get '/mygames' do
		if session['access_token']
			userInfo = session['userInfo']
			@games = Game.where(:player1Id => userInfo['id']).order(:item)
			erb :mygames
		else
  			redirect '/login'
  		end
	end

	get '/mygamenew' do	
		if session['access_token']	
			userInfo = session['userInfo']		
			game = chessmasterbo.newgame(userInfo)
			chessmasterbo.loadchessboardwhite(game.gameId, userInfo)			
			redirect '/mygames'
		else
  			redirect '/login'
  		end
	end

	get '/mygamedelete' do
		if session['access_token']
			gameId = params[:gameId]
			userInfo = session['userInfo']			
			Game.where(:player1Id => userInfo['id'], :gameId => gameId).first.destroy			
			redirect '/mygames'
		else
  			redirect '/login'
  		end
	end

	get '/see' do
		if session['access_token']	
			@gameId = params[:gameId]
			@userInfo = session['userInfo']
			@game = Game.where(:gameId => @gameId).first
			@challenger = ChessUser.where(:userId => @game.player2Id).first
			erb :chessboard
		else
			redirect '/login'
		end

	end

	get '/about' do
		erb :about
	end

	get '/challenge' do
		gameId = params[:gameId]
		chessmasterbo.challenge(gameId, session['userInfo'])
		chessmasterbo.loadchessboardblack(gameId, session['userInfo'])
		redirect '/games'
	end

	get '/play' do
		result = chessmasterbo.updatechessboard(params[:gameId], params[:piece], params[:origin], params[:final])		
		return result # chessmasterbo.writelisttojson(result).to_json #result.to_json
	end
	get '/getchessboard' do
		chessboard = Chessboard.where(:gameId => params[:gameId]).all(:order => :item.asc)
		return chessmasterbo.writelisttojson(chessboard)
	end
	get '/getchessstatus' do		
		@game = Game.where(:gameId => params[:gameId]).first			
		return @game.to_json
	end

	get '/deleteall' do
		Game.destroy_all
		Chessboard.destroy_all
		@games = Game.all
		erb :games
	end

end

APP_ROOT = File.expand_path(File.join(File.dirname(__FILE__), '..'))

require 'rubygems'
require 'sinatra'
require 'koala'

# register your app at facebook to get those infos
APP_ID = 386008508137576 # your app id
APP_CODE = '1fcec4d0014d0dd766c12bd54a65e27b' # your app code
#SITE_URL = 'http://localhost:9292/' # your app site url
SITE_URL = 'http://fb-chess.herokuapp.com/'

class CHESSMASTER < Sinatra::Application
	
	include Koala

	set :root, APP_ROOT
	enable :sessions

	get '/' do
		#if session['access_token']
		 	#'You are logged in! <a href="/logout">Logout</a>'
			# do some stuff with facebook here
			# for example:
			# @graph = Koala::Facebook::GraphAPI.new(session["access_token"])
			# publish to your wall (if you have the permissions)
			# @graph.put_wall_post("Sign up from Chessmaster!")
			# or publish to someone else (if you have the permissions too ;) )
			# @graph.put_wall_post("Checkout my new cool app!", {}, "someoneelse's id")
			# erb :index
		#else
			erb :index
		#end		
	end

	get '/login' do
		# generate a new oauth object with your app data and your callback url
		session['oauth'] = Facebook::OAuth.new(APP_ID, APP_CODE, SITE_URL + 'callback')
		#.url_for_oauth_code(:permissions => "publish_stream")
		# redirect to facebook to get your code
		#redirect session['oauth'].url_for_oauth_code(:permissions => "publish_stream")
		redirect session['oauth'].url_for_oauth_code()
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
		if session['access_token']
			erb :games
		else
  			redirect '/login'
  		end
	end

	get '/chessboard' do
		#if session['access_token']
			erb :chessboard
		#else
			#redirect '/login'
		#end
  		
	end

	get '/about' do
		if session['access_token']
			erb :about
		else
			redirect '/login'
		end
  		
	end
end


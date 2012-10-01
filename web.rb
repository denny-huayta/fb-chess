require 'sinatra'

get '/' do
  erb :index
end

get '/about' do
  erb :about
end

get '/chessboard' do
	erb :chessboard
end

get '/chessboard/:name' do |n|
	erb :chessboard
end

get '/games' do
	erb :games
end
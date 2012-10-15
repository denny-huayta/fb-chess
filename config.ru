$:.unshift File.expand_path(File.dirname(__FILE__))
require 'lib/chessmaster'
require 'bundler'

Bundler.require

Dir.open("./initializers").each do |file|  
	next if file =~ /^\./  
	require "./initializers/#{file}"
end

run CHESSMASTER


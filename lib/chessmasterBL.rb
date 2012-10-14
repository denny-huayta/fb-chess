
require 'dame'

class chessmasterBO

	include game

	def GetUrlGame(player1)

		urlGame = 'http://fb-chess.herokuapp.com'

		game = game.new
		game.player1 = player1
		
		result = 0
		if numbers == ""
			return result
		else
			arr = numbers.split(",")
			arr.each { |number| result = result + number.to_i }
		end
		return result
	end

end
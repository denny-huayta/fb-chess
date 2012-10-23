
class ChessboardHistory
	include MongoMapper::Document

	key :gameId,			String
	key :order,				Integer
	key :piece,				String
	key :origin,			String
	key :final,				String
	key :lastModified,		Date	
	# validations
	# validates_presence_of :gameId, :player1

end
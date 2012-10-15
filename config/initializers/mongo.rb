MongoMapper.config = { Rails.env => { 'uri' => ENV['MONGOHQ_URL'] } }
MongoMapper.database	= 'ChessDB'
MongoMapper.connect(Rails.env)
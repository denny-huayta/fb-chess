#MongoMapper.config = { Rails.env => { 'uri' => ENV['MONGOHQ_URL'] } }
#MongoMapper.database	= 'ChessDB'
#MongoMapper.connect(Rails.env)

db = URI.parse(ENV['MONGOHQ_URL'])
db_name = db.path.gsub(/^\//, '')
MongoMapper.connection  = Mongo::Connection.new(db.host, db.port).db(db_name)
#MongoMapper.database	= 'ChessDB'
MongoMapper.database.authenticate(db.user, db.password) unless (db.user.nil? || db.user.nil?)
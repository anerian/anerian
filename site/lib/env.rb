require 'uri'
require 'rubygems'
require 'activerecord'
require 'hpricot'
require 'helpers'
require 'post'

RACK_ENV = 'development' unless defined?(RACK_ENV)
AppRoot     = File.expand_path(File.join(File.dirname(__FILE__),'..'))
AppConfig   = YAML.load_file(File.join(AppRoot,'config','database.yml'))[RACK_ENV]
ThinConfig  = YAML.load_file(File.join(AppRoot,'config','thin.yml'))

ActiveRecord::Base.establish_connection(AppConfig)
ActiveRecord::Base.connection.execute("SET NAMES UTF8")
if RACK_ENV == 'production'
  Log = Logger.new(File.join(File.dirname(ThinConfig['log']),"sinatra.log"))
  Log.level  = Logger::INFO 
else
  Log = Logger.new('sinatra.log')
  Log.level  = Logger::INFO 
end

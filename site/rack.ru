require 'sinatra'
RACK_ENV='production'
 
Sinatra::Default.set(:run => false)
Sinatra::Default.set(:environment => :production)

require 'anerian'
run Sinatra::Application


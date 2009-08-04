require 'rubygems'
require 'sinatra'
require 'erb'
$:.unshift 'lib'

configure do
  require 'env'
end

get '/' do
  erb :home
end

get '/blog' do
  #@posts = Post.find(:all, :offset => (params[:page]||0).to_i, :limit => 10)
  erb 'blog', :layout => true
end

get '/:permalink' do
  path = params[:permalink]
  halt 404 if path.match(/\.\./) or path.match(/\//)
  erb path.to_sym, :layout => true
end

not_found do
  'This is nowhere to be found'
end

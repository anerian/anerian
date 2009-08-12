require 'rubygems'
require 'sinatra'
require 'erb'
$:.unshift 'lib'

mime :ogv, 'video/ogg'

configure do
  require 'env'
  $packer = Rainpress::Packer.new
end

get '/' do
  erb :home
end

get '/blog' do
  #@posts = Post.find(:all, :offset => (params[:page]||0).to_i, :limit => 10)
  erb 'blog', :layout => true
end

post '/interest' do
end

def find_view_from_path(params)
  @path = params[:permalink]
  halt 404 if @path.match(/\.\./) or @path.match(/\//)
  @path.to_sym
end

get '/:permalink' do
  erb find_view_from_path(params), :layout => true
end

post '/:permalink' do
  if request.env['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest'
    erb find_view_from_path(params), :layout => false
  else
    erb find_view_from_path(params), :layout => true
  end
end

not_found do
  'This is nowhere to be found'
end

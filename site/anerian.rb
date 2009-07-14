require 'rubygems'
require 'sinatra'
require 'erb'
$:.unshift 'lib'

configure do
  require 'env'
end

get '/' do
  @footers = ['home_footer']
  erb :home
end

get '/:permalink' do
  @page = Page.find_by_permalink(params[:permalink])
  halt 404 if @page.nil?
  erb @page.view.to_sym, :layout => true
end

get '/blog' do
  @posts = Post.find(:all, :offset => (params[:page]||0).to_i, :limit => 10)
end

not_found do
  'This is nowhere to be found'
end

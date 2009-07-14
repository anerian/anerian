require 'rubygems'
require 'sinatra'
require 'erb'
$:.unshift 'lib'

configure do
  require 'env'
end

get '/:permalink' do
  @page = Page.find_by_permalink(params[:permalink])
  erb @page.view.to_sym, :layout => true
end

get '/404' do
end

get '/blog' do
  @posts = Post.find(:all, :offset => (params[:page]||0).to_i, :limit => 10)
end

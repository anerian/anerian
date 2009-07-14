require 'rubygems'
require 'activerecord'
require 'sinatra'
require 'erb'


get '/:permalink' do
  @page = Page.find_by_permalink(params[:permalink])
  erb @page.template
end

get '/blog' do
  @posts = Post.find(:all, :offset => (params[:page]||0).to_i, :limit => 10)
end

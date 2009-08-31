require 'rubygems'
require 'sinatra'
require 'erb'
$:.unshift 'lib'

mime :ogv, 'video/ogg'

set :lock, true

configure do
  require 'env'
end

get '/' do
  erb :home
end

get '/blog' do
  @page = (params[:page]||0).to_i
  @path = 'blog'
  @posts = Post.find(:all,
                     :offset => (@page*5),
                     :limit => 5, :conditions => {:post_type => 'post', :post_status => 'publish'},
                     :order => 'post_date DESC')
  erb :blog, :layout => true
end

get '/feed' do
  @posts = Post.find(:all, :limit => 10, :conditions => {:post_type => 'post', :post_status => 'publish'},
                           :order => 'post_date DESC')
  erb :rss, :layout => false
end

# pages
get '/:permalink' do
  view = find_view_from_path(params)
  if view
    erb view, :layout => true
  else
    @post = get_post(params)
    @path = 'post'
    erb :post, :layout => true
  end
end

# blog posts
get '/:permalink/:date' do
  @post = get_post(params)
  @path = 'post'
  erb :post, :layout => true
end

not_found do
  erb :not_found_404
end

def find_view_from_path(params)
  @path = params[:permalink]
  path = "#{AppRoot}/views/#{@path}.erb"
  return false if @path.match(/\.\./) or @path.match(/\//) or @path.match(/^layout$/) or !File.exist?(path)
  @path.to_sym
end

def get_post(params)
  if params[:date].blank?
    posts = Post.find(:all, :conditions => ["post_name=? and post_status='publish'", params[:permalink]])
  else
    posts = Post.find(:all, :conditions => ["post_name=? and DATE_FORMAT(post_date_gmt,'%Y.%m.%d')=? and post_status='publish'",
                            params[:permalink],params[:date]])
  end
  halt 404 if posts.blank?

  @post = posts.first
end

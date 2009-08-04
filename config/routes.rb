ActionController::Routing::Routes.draw do |map|

  map.resources :pages, :only => [:show, :index]
  map.resources :posts, :only => [:show, :index]
  map.resources :tags, :only => [:show, :index]

  map.root :controller => 'pages'

  map.admin 'admin', :controller => 'admin/pages'

  map.namespace :admin do |admin|
    admin.login 'login', :controller => 'admin/accounts', :action => 'login'
    admin.logout 'logout', :controller => 'admin/accounts', :action => 'logout'
    admin.resources :pages, :member => {:delete => :get}
    admin.resources :posts, :member => {:delete => :get}
    admin.resources :tags, :member => {:delete => :get}
    admin.resources :contents, :member => {:delete => :get}
    admin.resources :users, :member => {:delete => :get}
    admin.resources :ptemplates, :member => {:delete => :get}
  end

end

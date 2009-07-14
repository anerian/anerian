ActionController::Routing::Routes.draw do |map|
  map.resources :pages
  map.resources :contents
  map.resources :users
  map.resources :tags

  map.root :controller => 'pages'
end

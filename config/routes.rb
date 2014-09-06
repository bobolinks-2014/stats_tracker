Rails.application.routes.draw do


  # You can have the root of your site routed with "root"
  root 'user#index'

  #create user routes
  resources :users
  #sessions routes
  post '/session/login' => 'session#login'
  get '/session/logout' => 'session#logout', :as => 'logout'

  resources :teams
  resources :stats


  resources :seasons
  resources :games


end

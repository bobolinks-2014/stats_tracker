Rails.application.routes.draw do


  # You can have the root of your site routed with "root"
  root 'user#index'

  #create user routes
  resources :user
  #sessions routes
  post '/session/login' => 'session#login'
  get '/session/logout' => 'session#logout', :as => 'logout'
  get '/user/:id/team/all' => 'user#show_all'
  get '/user/:id/season/all' => 'user#show_all_season'

  resources :team
  get '/team/user/all' => 'team#show_all'

  resources :stat

  resources :season
  get '/season/team/:id' => 'season#show_all'

  resources :game
   get '/game/season/:id' => 'game#show_all'



end

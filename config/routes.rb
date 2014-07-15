Rails.application.routes.draw do
  # resources :users

  root 'welcome#index'

  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  post '/users' => 'users#create', as: 'users'
  get '/profile' => 'users#profile', as: 'profile'

  get '/checkins' => 'checkins#index'
  post '/checkins' => 'checkins#create'

  post '/likes' => 'likes#create'

  get '/tips' => 'tips#index'
  post '/tips' => 'tips#create'



end

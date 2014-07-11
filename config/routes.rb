Rails.application.routes.draw do
  # resources :users

  root 'welcome#index'

  post '/sessions' => 'sessions#create', as: 'sessions'
  delete '/logout' => 'sessions#destroy', as: 'logout'

  post '/users' => 'users#create', as: 'users'
  get '/profile' => 'users#profile', as: 'profile'


end

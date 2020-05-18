Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/trails', to: "static_pages#index"
  get '/trails/new', to: "static_pages#authenticate"
  get '/trails/nearby', to: "static_pages#index"
  get '/trails/:id', to: "static_pages#index"
  get '/users/:id', to: "static_pages#index"


  # get '/api/v1/trail_data/:id', to: "trail_data#show"

  namespace :api do
    namespace :v1 do
      resources :trails, only: [:index, :create, :show, :destroy] do
        resources :notes, only: [:create, :update, :destroy]
      end
      resources :trail_data, only: [:show]
      resources :user, only: [:index]
      resources :nearby_trails_data, only: [:index]
      resources :nearby_weather_data, only: [:index]
      resources :favorites, only: [:index, :show, :create, :destroy]
      resources :users, only: [:show]
      resources :favorite_trails_data, only: [:show]
      resources :completed_trails, only: [:index, :show, :create, :destroy]
      resources :completed_trails_data, only: [:show]
    end
  end
end

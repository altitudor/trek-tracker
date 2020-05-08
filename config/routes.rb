Rails.application.routes.draw do
  root 'static_pages#index'
  devise_for :users

  get '/trails', to: "static_pages#index"
  get '/trails/new', to: "static_pages#authenticate"
  get '/trails/:id', to: "static_pages#index"

  namespace :api do
    namespace :v1 do
      resources :trails, only: [:index, :create, :show, :destroy] do
        resources :notes, only: [:create]
      end
    end
  end
end

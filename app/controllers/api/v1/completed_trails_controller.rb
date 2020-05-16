class Api::V1::FavoritesController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def index
      render json: current_user.favorites
    end

    def show
      if current_user.favorites.exists?(api_id: params[:id])
        render json: true
      else
        render json: false
      end
    end

    def create
      if !current_user.favorites.exists?(api_id: params[:api_id])
        favorite = Favorite.new(user_id: current_user.id, api_id: params[:api_id])
        favorite.save
      end
    end

    def destroy
      current_user.favorites.where(api_id: params[:id]).delete_all
    end
end

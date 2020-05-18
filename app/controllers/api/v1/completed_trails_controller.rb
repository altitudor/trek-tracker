class Api::V1::CompletedTrailsController < ApplicationController
    protect_from_forgery unless: -> { request.format.json? }

    def index
      render json: current_user.completed_trails
    end

    def show
      if current_user.completed_trails.exists?(api_id: params[:id])
        render json: true
      else
        render json: false
      end
    end

    def create
      if !current_user.completed_trails.exists?(api_id: params[:api_id])
        completed_trail = CompletedTrail.new(user_id: current_user.id, api_id: params[:api_id])
        completed_trail.save
      end
    end

    def destroy
      current_user.completed_trails.where(api_id: params[:id]).delete_all
    end
end

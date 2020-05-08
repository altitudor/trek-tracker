class Api::V1::TrailsController < ApplicationController
    before_action :authenticate_user!, except: [:index, :show]
    protect_from_forgery unless: -> { request.format.json? }

    def index
        render json: Trail.all
    end

    def create
        trail = Trail.new(trail_params)
        if trail.save
            render json: { trail: trail }
        else
            render json: { error: trail.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        render json: Trail.find(params[:id])
    end

    def destroy
        trail = Trail.find(params[:id])
        trail.destroy
        render json: {}, status: :no_content
    end

    private

    def trail_params
        params.require(:trail).permit(:name)
    end
end

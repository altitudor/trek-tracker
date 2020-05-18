class Api::V1::NearbyTrailsDataController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    lat = params[:lat]
    lon = params[:lon]

    api_key = ENV['HP_API_KEY']
    url = "https://www.hikingproject.com/data/get-trails?lat=#{lat}&lon=#{lon}&key=#{api_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    render json: parsed_response, status: 200
  end
end

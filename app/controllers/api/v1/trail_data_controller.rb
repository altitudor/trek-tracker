
class Api::V1::TrailDataController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    api_id = params[:id]

    api_key = ENV['HP_API_KEY']
    url = "https://www.hikingproject.com/data/get-trails-by-id?ids=#{api_id}&key=#{api_key}"
    api_response = Faraday.get(url)
    parsed_response = JSON.parse(api_response.body)

    trail = {};
    if (parsed_response.include?('trails') &&
       parsed_response['trails'].length == 1)
         trail = parsed_response['trails'][0];
    end


    render json: trail, status: 200
  end
end

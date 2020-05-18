class Api::V1::FavoriteTrailsDataController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    user = User.find(params[:id])

    favorites = ""
    user.favorites.each_with_index { |favorite, i|
      if (i > 0)
        favorites += ","
      end
      favorites += favorite.api_id.to_s
    }

    trails = {favorites: []}
    if !favorites.empty?
      api_key = ENV['HP_API_KEY']
      url = "https://www.hikingproject.com/data/get-trails-by-id?ids=#{favorites}&key=#{api_key}"
      api_response = Faraday.get(url)
      parsed_response = JSON.parse(api_response.body)

      trails['favorites'] = parsed_response['trails']
    end

    render json: trails, status: 200
  end
end

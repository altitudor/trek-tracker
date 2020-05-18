class Api::V1::CompletedTrailsDataController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def show
    user = User.find(params[:id])

    completed_trails = ""
    user.completed_trails.each_with_index { |completed_trail, i|
      if (i > 0)
        completed_trails += ","
      end
      completed_trails += completed_trail.api_id.to_s
    }

    trails = {completed_trails: []}
    if !completed_trails.empty?
      api_key = ENV['HP_API_KEY']
      url = "https://www.hikingproject.com/data/get-trails-by-id?ids=#{completed_trails}&key=#{api_key}"
      api_response = Faraday.get(url)
      parsed_response = JSON.parse(api_response.body)

      trails['completed_trails'] = parsed_response['trails']
    end

    render json: trails, status: 200
  end
end

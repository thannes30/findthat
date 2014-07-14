class VenuesController < ApplicationController

  def like
    like = Like.new
    current_user.likes << like
    Venue.find(params[:foursquare_venue_id]).likes << like
    like.save
    render :json => like.to_json
  end


end

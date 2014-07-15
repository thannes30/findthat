class CheckinsController < ApplicationController

  def create
    v = Venue.find_by_foursquare_venue_id(params[:venue_id])
    if v.nil?
      v = Venue.create(foursquare_venue_id: params[:venue_id], name: params[:name])
    end
    checkin = Checkin.create(user_id: current_user.id, name: params[:checkin][:name], :venue_id => v.id)

    render :json => checkin.to_json
  end

  private

  def checkin_params
    params.require(:checkin).permit(:name, :venue_id)
  end

end

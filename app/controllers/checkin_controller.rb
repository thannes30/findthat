class CheckinController < ApplicationController

  def create
    checkin = Checkin.create(checkin_params)
    # current_user.checkins << checkin
    render :json => checkin.to_json
  end

  private

  def checkin_params
    params.require(:checkin).permit(:foursquare_venue_id)
  end

end

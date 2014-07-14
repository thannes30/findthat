class CheckinsController < ApplicationController

  def create
    checkin = Checkin.create(checkin_params)
    current_user.checkins << checkin
    render :json => checkin.to_json
  end

  private

  def checkin_params
    params.require(:checkin).permit(:name, :venue_id)
  end

end

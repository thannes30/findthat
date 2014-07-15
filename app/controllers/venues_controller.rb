class VenuesController < ApplicationController



  private

  def venue_params
    params.require(:venue).permit(:name, :foursquare_venue_id)
  end
end

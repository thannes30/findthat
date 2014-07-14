class TipsController < ApplicationController

  def index
    @tips = Tip.where()
  end

  def create
    tip = Tip.new(tip_params)
    current_user.tips << tip
    tip.save
    render :json => tip.to_json
  end

  private

  def tips_params
    params.require(:tip).permit(:message, :user_id, :venue_id )
  end

end

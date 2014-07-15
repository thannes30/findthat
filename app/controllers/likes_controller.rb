class LikesController < ApplicationController

  def create
    like = Like.create(like_params)
    current_user.likes << like
    # binding.pry
    render :json => like.to_json
  end

  private

  def like_params
    params.require(:like).permit(:name, :venue_id)
  end
end

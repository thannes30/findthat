class UsersController < ApplicationController
  before_action :require_login, only: [:profile]

  def create
    @user = User.new(user_params)
    if @user.save
      render :json => @user.to_json
    else
      @user = @user.errors.full_messages
      render :json => @user.to_json
    end
  end

  def profile
    @businesses = current_user.businesses
    @likes = current_user.likes
  end


  # def destroy
  #   @user.destroy
  #   respond_to do |format|
  #     format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
  #     format.json { head :no_content }
  #   end
  # end

  private

    def user_params
      params.require(:user).permit(:username, :email, :password)
    end

end

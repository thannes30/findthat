class SessionsController < ApplicationController

  def create
    user = login(params[:username],params[:password])
    if user
      redirect_to root_path , :notice => "Logged in!"
    else
      redirect_to root_path
    end
  end

  def destroy
    logout
    redirect_to root_path
  end

  private

    def set_user
      @user = login(params[:sessions][:email], params[:sessions][:password])
    end

    def session_params
      params.require(:user).permit(:email, :password)
    end

end

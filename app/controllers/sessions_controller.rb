class SessionsController < ApplicationController

  def create
    user = login(params[:username],params[:password])
    if user
      redirect_to root_path
    else
      redirect_to root_path
    end
  end

  def destroy
    logout
    redirect_to root_path
  end

end

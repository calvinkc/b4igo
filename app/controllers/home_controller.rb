class HomeController < ApplicationController

  def index
    if current_user
      redirect_to user_path(current_user)
    else
      render 'home.html.erb'
    end
  end

end

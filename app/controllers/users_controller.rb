class UsersController < ApplicationController

  def new
    render "new.html.erb"
  end

  def create
    user = User.new(
    firstname: params[:firstname], 
    lastname: params[:lastname],
    email: params[:email],
    password: params[:password],
    weather: true,
    commute: true
    )
    if user.save
      session[:user_id] = user.id
      flash[:success] = "User created!"
      redirect_to "/"
    else
      flash[:warning] = "Invalid email/pass"
      redirect_to "/signup"
    end
  end

  def show
  end  

  def edit
    @user = User.find_by(id: params[:id])
    render "edit.html.erb"
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update(
    firstname: params[:firstname], 
    lastname: params[:lastname],
    email: params[:email]
    )
    flash[:success] = "User Updated"
    redirect_to "/users/"
  end

end

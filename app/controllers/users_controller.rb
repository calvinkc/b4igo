class UsersController < ApplicationController

  before_action :authorize_user!, except: [:new, :create]
  before_action :authenticate_user!, except: [:new, :create]

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
    @user = User.find_by(id: params[:id])
    unless session[:user_id] == @user.id
      flash[:notice] = "You don't have access to that user!"
      redirect_to user_path(current_user)
    end
    return
  end  

  def edit
    @user = User.find_by(id: params[:id])
    unless session[:user_id] == @user.id
      flash[:notice] = "You don't have access to that user!"
      redirect_to user_path(current_user)
    end
    @addresses = @user.addresses
  end

  def update
    @user = User.find_by(id: params[:id])
    @user.update(
    firstname: params[:firstname], 
    lastname: params[:lastname],
    email: params[:email]
    )
    flash[:success] = "User Updated"
    redirect_to current_user
  end

end

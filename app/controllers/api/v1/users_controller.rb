class Api::V1::UsersController < ApplicationController

  def index
    @users = User.all
    render 'index.json.jbuilder'
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
      redirect_to "/api/v1/users/#{user.id}"
      # response: sending back a user object
    else
      render json: {errors: user.errors.full_messages}, status: 422
      #response: sending back a json object with 1 key of errors
    end
  end

  def show
    @user = User.find(params[:id])
    render 'show.json.jbuilder'
  end

# TODO: UPDATE: MAKE SURE TO USE REDIRECT


  def destroy
    user = User.find(params[:id])
    user.destroy
    render json: {message: 'User successfully deleted!'}
  end


end

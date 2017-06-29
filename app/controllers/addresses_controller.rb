class AddressesController < ApplicationController
  def new
    render "new.html.erb"
  end

  def create
    address = Address.new(
    user_id: current_user.id,
    street: params[:street], 
    city: params[:city],
    state: params[:state],
    label: params[:label]
    )
    if address.save
      flash[:success] = "Address created!"
      redirect_to current_user
    else
      flash[:warning] = "Invalid Attributes"
      redirect_to "/users/#{user_id}/edit"
    end
  end

  def edit
    @address = address.find(id: params[:id])
    render "edit.html.erb"
  end

  def update
    @address = address.find_by(id: params[:id])
    @address.update(
    street: params[:street], 
    city: params[:city],
    state: params[:state],
    label: params[:label]
    )
    flash[:success] = "address Updated"
    redirect_to "/"
  end


end

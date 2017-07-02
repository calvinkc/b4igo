Rails.application.routes.draw do

  get '/' => 'home#index'

resources :users, :addresses

namespace :api do
  namespace :v1 do
    resources :users
  end
end

  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"
  
end

#       Prefix Verb   URI Pattern                   Controller#Action
#              GET    /                             home#index
#        users GET    /users(.:format)              users#index
#              POST   /users(.:format)              users#create
#     new_user GET    /users/new(.:format)          users#new
#    edit_user GET    /users/:id/edit(.:format)     users#edit
#         user GET    /users/:id(.:format)          users#show
#              PATCH  /users/:id(.:format)          users#update
#              PUT    /users/:id(.:format)          users#update
#              DELETE /users/:id(.:format)          users#destroy
#    addresses GET    /addresses(.:format)          addresses#index
#              POST   /addresses(.:format)          addresses#create
#  new_address GET    /addresses/new(.:format)      addresses#new
# edit_address GET    /addresses/:id/edit(.:format) addresses#edit
#      address GET    /addresses/:id(.:format)      addresses#show
#              PATCH  /addresses/:id(.:format)      addresses#update
#              PUT    /addresses/:id(.:format)      addresses#update
#              DELETE /addresses/:id(.:format)      addresses#destroy
#        login GET    /login(.:format)              sessions#new
#              POST   /login(.:format)              sessions#create
#       logout GET    /logout(.:format)             sessions#destroy

# 2.3 Path and URL Helpers
# Creating a resourceful route will also expose a number of helpers to the controllers in your application. In the case of resources :photos:

# photos_path returns /photos
# new_photo_path returns /photos/new
# edit_photo_path(:id) returns /photos/:id/edit (for instance, edit_photo_path(10) returns /photos/10/edit)
# photo_path(:id) returns /photos/:id (for instance, photo_path(10) returns /photos/10)

Rails.application.routes.draw do

  get '/' => 'home#index'

resources :users
resources :addresses

  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"
end

#  Prefix Verb   URI Pattern               Controller#Action
#                GET    /                         home#index
#      new_users GET    /users/new(.:format)      users#new
#     edit_users GET    /users/edit(.:format)     users#edit
#          users GET    /users(.:format)          users#show
#                PATCH  /users(.:format)          users#update
#                PUT    /users(.:format)          users#update
#                DELETE /users(.:format)          users#destroy
#                POST   /users(.:format)          users#create
#  new_addresses GET    /addresses/new(.:format)  addresses#new
# edit_addresses GET    /addresses/edit(.:format) addresses#edit
#      addresses GET    /addresses(.:format)      addresses#show
#                PATCH  /addresses(.:format)      addresses#update
#                PUT    /addresses(.:format)      addresses#update
#                DELETE /addresses(.:format)      addresses#destroy
#                POST   /addresses(.:format)      addresses#create
#          login GET    /login(.:format)          sessions#new
#                POST   /login(.:format)          sessions#create
#         logout GET    /logout(.:format)         sessions#destroy

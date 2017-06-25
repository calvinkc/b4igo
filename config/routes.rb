Rails.application.routes.draw do
  get '/' => 'users#show'

  post '/addresses/' => 'addresses#create'

  get '/signup' => 'users#new'
  get '/users/:id' => 'users#edit'
  post '/users' => 'users#create'
  patch '/users/:id' => 'users#update'

  get "/login" => "sessions#new"
  post "/login" => "sessions#create"
  get "/logout" => "sessions#destroy"

end


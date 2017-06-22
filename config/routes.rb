Rails.application.routes.draw do
  get '/' => 'users#show'

  get '/signup' => 'users#new'
  get '/users/:id' => 'users#edit'
  post '/users' => 'users#create'
  patch '/users/:id' => 'users#update'

end

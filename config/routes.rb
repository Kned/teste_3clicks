
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'users/index'
      get 'users/search/:search', to: 'users#search'
      post 'users/create'
      get '/show/:id', to: 'users#show'
      get '/edit/:id', to: 'users#edit'
      post '/update/:id', to: 'users#update'

      delete '/destroy/:id', to: 'users#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
Rails.application.routes.draw do
  resources :items, defaults: { format: :json }
  resources :users, defaults: { format: :json }
  resources :orders, defaults: { format: :json }
  resources :orders_descriptions, defaults: { format: :json }
  post 'login', to: 'users#login'
  get 'count', to: 'orders#count'
  post 'orders', to: 'orders#create'
  get 'orders', to: 'orders#index'

   resources :users, only: [] do
    resources :orders, only: [:index] 
  end

end


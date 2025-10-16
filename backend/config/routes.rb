# Rails.application.routes.draw do
#   resources :items, defaults: { format: :json }
#   resources :users, defaults: { format: :json }
#   resources :orders, defaults: { format: :json }
#   resources :orders_descriptions, defaults: { format: :json }
#   post 'login', to: 'users#login'
#   get 'count', to: 'orders#count'
#   post 'orders', to: 'orders#create'
#   get 'orders', to: 'orders#index'
# get 'orders/all', to: 'orders#all_orders'
#    resources :users, only: [] do
#     resources :orders, only: [:index] 
#   end
  

# end

Rails.application.routes.draw do
  resources :items, defaults: { format: :json }
  resources :users, defaults: { format: :json }
  resources :orders_descriptions, defaults: { format: :json }
  get 'orders/all', to: 'orders#all_orders'
  get 'count', to: 'orders#count'
  post 'login', to: 'users#login'
  resources :orders, defaults: { format: :json }

  resources :users, only: [] do
    resources :orders, only: [:index]
  end
end


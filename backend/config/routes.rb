Rails.application.routes.draw do
  resources :items, defaults: { format: :json }
  resources :users, defaults: { format: :json }
  resources :orders, defaults: { format: :json }
  resources :orders_descriptions, defaults: { format: :json }
  post 'login', to: 'users#login'

  # root to: proc { [200, { 'Content-Type' => 'text/plain' }, ['API is running']] }
end

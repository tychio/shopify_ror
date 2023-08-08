Rails.application.routes.draw do
  root 'shopify#index'
  get 'login', to: 'shopify#index', as: 'shopify_login'
  get 'logout', to: 'shopify#logout', as: 'shopify_logout'
  get 'shop', to: 'shopify#show', as: 'shopify_show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get 'shopify/auth/:shop_name', to: 'shopify#auth', as: 'shopify_auth'
  get 'shopify/callback'
end

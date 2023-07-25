Rails.application.routes.draw do
  root 'shopify#index'
  get 'shopify/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get 'shopify/auth'
  get 'shopify/callback'
end

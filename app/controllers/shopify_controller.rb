class ShopifyController < ApplicationController
  before_action :logged_shopify!, only: [:show]

  def index
    if session[:shopify]
      redirect_to '/shop'
    end
  end

  def show
    start_date = params[:start]
    end_date = params[:end]
    
    ShopifyService.client(session[:shopify]) do |client|
      product_res = client.get(
        path: "products"
      )

      shop_res = client.get(
        path: "shop"
      )

      order_res = client.get(
        path: "orders",
        query: {
          processed_at_min: start_date,
          processed_at_max: end_date,
        }
      )

      render locals: {
        shop: shop_res.body['shop'],
        orders: order_res.body['orders'],
        products: product_res.body['products']
      }
    end
  end

  def logout
    if session[:shopify]
      session[:shopify] = nil
    end
    redirect_to '/'
  end

  def auth
    auth_route = ShopifyService.auth(cookies)

    head 307
    response.set_header("Location", auth_route)
  end

  def callback
    begin
      session_json = ShopifyService.callback(
        request.parameters.symbolize_keys.except(:controller, :action),
        cookies
      )
      session[:shopify] = session_json

      head 307
      response.set_header("Location", "/shop")
    rescue => e
      puts(e.message)
      head 500
    end
  end
end

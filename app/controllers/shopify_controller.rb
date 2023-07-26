class ShopifyController < ApplicationController
  def index
  end

  def show
    start_date = params[:start]
    end_date = params[:end]

    ShopifyAPI::Auth::Session.temp(
      shop: session[:shopify]['shop'],
      access_token: session[:shopify]['access_token']
    ) do |session|
      client = ShopifyAPI::Clients::Rest::Admin.new(
        session: session
      )
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

  def auth
    auth_response = ShopifyAPI::Auth::Oauth.begin_auth(shop: ENV['SHOPIFY_SHOP'], redirect_path: "/shopify/callback")

    cookies[auth_response[:cookie].name] = {
      expires: auth_response[:cookie].expires,
      secure: true,
      http_only: true,
      value: auth_response[:cookie].value
    }

    head 307
    response.set_header("Location", auth_response[:auth_route])
  end

  def callback
    begin
      auth_result = ShopifyAPI::Auth::Oauth.validate_auth_callback(
        cookies: cookies.to_h,
        auth_query: ShopifyAPI::Auth::Oauth::AuthQuery.new(request.parameters.symbolize_keys.except(:controller, :action))
      )

      cookies[auth_result[:cookie].name] = {
        expires: auth_result[:cookie].expires,
        secure: true,
        http_only: true,
        value: auth_result[:cookie].value,
      }

      puts("OAuth complete! New access token: #{auth_result[:session].access_token}")
      session[:shopify] = auth_result[:session].as_json

      head 307
      response.set_header("Location", "/shop")
    rescue => e
      puts(e.message)
      head 500
    end
  end
end

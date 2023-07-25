class ShopifyController < ApplicationController
  def index
  end

  def auth
    # shop = request.headers["Shop"]
    shop = 'testtychio.myshopify.com'

    auth_response = ShopifyAPI::Auth::Oauth.begin_auth(shop: shop, redirect_path: "/shopify/callback")

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
        value: auth_result[:cookie].value
      }
  
      puts("OAuth complete! New access token: #{auth_result[:session].access_token}")
  
      head 307
      response.set_header("Location", "index")
    rescue => e
      puts(e.message)
      head 500
    end
  end
end

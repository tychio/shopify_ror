class ShopifyService < ApplicationService
  def initialize()
  end

  def client shopify_session
    ShopifyAPI::Auth::Session.temp(
      shop: shopify_session['shop'],
      access_token: shopify_session['access_token']
    ) do |session|
      client = ShopifyAPI::Clients::Rest::Admin.new(
        session: session
      )
      yield client
    end
  end

  def auth (cookies, shop_name)
    shop_domain = shop_name.nil? ? ENV['SHOPIFY_SHOP'] : "#{shop_name}.myshopify.com" 
    auth_response = ShopifyAPI::Auth::Oauth.begin_auth(shop: shop_domain, redirect_path: "/shopify/callback")

    cookies[auth_response[:cookie].name] = {
      expires: auth_response[:cookie].expires,
      secure: true,
      http_only: true,
      value: auth_response[:cookie].value
    }

    auth_response[:auth_route]
  end

  def callback query, cookies
    auth_result = ShopifyAPI::Auth::Oauth.validate_auth_callback(
      cookies: cookies.to_h,
      auth_query: ShopifyAPI::Auth::Oauth::AuthQuery.new(**query)
    )

    cookies[auth_result[:cookie].name] = {
      expires: auth_result[:cookie].expires,
      secure: true,
      http_only: true,
      value: auth_result[:cookie].value,
    }

    puts("OAuth complete! New access token: #{auth_result[:session].access_token}")
    auth_result[:session].as_json
  end
end
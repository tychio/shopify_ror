class ApplicationController < ActionController::Base
  def logged_shopify!
    redirect_to shopify_login_url if not session[:shopify]
  end
end

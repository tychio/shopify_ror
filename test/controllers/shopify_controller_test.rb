require "test_helper"

class ShopifyControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get shopify_login_url
    assert_response :success
  end

  test "should redirect to shopify" do
    get shopify_auth_url
    assert_response :redirect
    assert_redirected_to %r(\Ahttps://.*\.myshopify\.com/.*)
  end
end

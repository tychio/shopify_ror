require "test_helper"

class ShopifyControllerTest < ActionDispatch::IntegrationTest
  test "should get login" do
    get shopify_login_url
    assert_response :success
  end
end

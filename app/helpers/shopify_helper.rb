module ShopifyHelper
  def store_session=(storage)
    @storage = storage
  
    unless storage.nil? || self.storage.respond_to?(:store) && self.storage.respond_to?(:retrieve)
      raise ArgumentError, "storage must respond to :store and :retrieve"
    end
  end

  def store(session)
    storage.store(session)
  end
end

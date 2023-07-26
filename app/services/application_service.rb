class ApplicationService
  def self.method_missing(method_name, *args, &block)
    new().send(method_name.to_sym, *args, &block)
  end
end
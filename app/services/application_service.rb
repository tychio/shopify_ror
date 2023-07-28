class ApplicationService
  def self.method_missing(method_name, *args, **kwargs, &block)
    new().send(method_name.to_sym, *args, **kwargs, &block)
  end
end
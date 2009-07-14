module PagesHelper
  def slot(name)
    @slots ||= []
    @slots << name
  end
end

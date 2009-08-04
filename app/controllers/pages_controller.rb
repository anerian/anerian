class PagesController < ApplicationController
  def index
    @pages = Page.paginate(:all, :page => params[:page])
  end

  def show
    @page = Page.find_by_id(params[:id])
  end
end

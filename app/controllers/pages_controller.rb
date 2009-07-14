class PagesController < ApplicationController
  def index
    @pages = Page.paginate(:all, :page => params[:page])
  end

  def show
    @page = Page.find_by_id(params[:id])
  end

  def new
    @page = Page.new
    @page.type = 'Page'
  end

  def create
    @page = Page.new(params[:page])
    @page.type = 'Page'
    if @page.save
      redirect_to pages_path
    else
      render :action => 'new'
    end
  end

  def edit
    @page = Page.find_by_id(params[:id])
  end

  def update
    @page = Page.find_by_id(params[:id])
    if @page.update_attributes(params[:page])
      redirect_to pages_path
    else
      render :action => 'edit'
    end
  end

  def delete
    @page = Page.find_by_id(params[:id])
  end

  def destroy
    @page = Page.find_by_id(params[:id])
  end

end

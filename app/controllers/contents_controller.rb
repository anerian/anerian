class ContentsController < ApplicationController
  def index
    @contents = Content.paginate(:all, :page => params[:page])
  end

  def show
    @content = Content.find_by_id(params[:id])
  end

  def new
    @content = Content.new
  end

  def create
    @content = Content.new(params[:content])
    if @content.save
      redirect_to contents_path
    else
      render :action => 'new'
    end
  end

  def edit
    @content = Content.find_by_id(params[:id])
  end

  def update
    @content = Content.find_by_id(params[:id])
    if @content.update_attributes(params[:content])
      redirect_to contents_path
    else
      render :action => 'edit'
    end
  end

  def delete
    @content = Content.find_by_id(params[:id])
  end

  def destroy
    @content = Content.find_by_id(params[:id])
  end

end

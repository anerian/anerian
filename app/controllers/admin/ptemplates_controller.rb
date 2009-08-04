class Admin::PtemplatesController < Admin::AdminController
  def index
    @pts = Ptemplate.paginate(:all, :page => params[:page])
  end

  def show
    @pt = Ptemplate.find_by_id(params[:id])
  end

  def new
    @pt = Ptemplate.new
  end

  def create
    @pt = Ptemplate.new(params[:ptemplate])
    if @pt.save
      redirect_to admin_ptemplates_path
    else
      render :action => 'new'
    end
  end

  def edit
    @pt = Ptemplate.find_by_id(params[:id])
  end

  def update
    @pt = Ptemplate.find_by_id(params[:id])
    if @pt.update_attributes(params[:ptemplate])
      redirect_to admin_ptemplates_path
    else
      render :action => 'edit'
    end
  end

  def delete
    @pt = Ptemplate.find_by_id(params[:id])
  end

  def destroy
    @pt = Ptemplate.find_by_id(params[:id])
    if @pt.destroy
      redirect_to admin_ptemplates_path
    else
      render :action => 'delete'
    end
  end

end

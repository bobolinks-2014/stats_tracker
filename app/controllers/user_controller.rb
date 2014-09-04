class UserController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def index
    @user = User.new
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path
      flash[:notice] = "Thanks for signing up! Please log in."
    else
      flash[:notice] = "Sign up unsuccessful."
      redirect_to root_url
    end
  end

  def show
    @user
  end

  def edit
  end

  def update #post for edit
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end

end

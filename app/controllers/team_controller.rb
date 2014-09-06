class TeamController < ApplicationController

  def index
    @team = Team.find_by(user_id: session[:user_id])
  end

  def new
    @team = Team.new
  end

  def create
    @user = User.find(session[:user_id])
    #@team = Team.new(params[:team_params])
    @team = @user.teams.create!(team_params)
    if @team.save
      respond_to do |format|
      format.html { redirect_to user_path(@user) }
      format.json { render :json => @team }
      end
    else
       flash[:notice] = "Sign up unsuccessful."
       redirect_to new_team_path
    end
  end

  def show_all
    @user = User.find(session[:user_id])
    @teams = Team.where(user_id: @user.id)
    respond_to do |f|
      f.html { redirect_to user_path(@user) }
      f.json { render :json => @teams }
      # f.html { render :json => @teams }
    end
  end

  def show
    @team = Team.find_by(:team_id)
  end

  def edit
    # @user = User.find(session[:user_id])
    # @team = @user.teams.find(:team_id)
  end

  def update #post for edit

  end


  def destroy

  end

  private

  def team_params
    params.require(:team).permit(:name, :school, :user_id)
  end

end

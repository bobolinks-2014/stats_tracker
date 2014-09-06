class SeasonController < ApplicationController

  # TODO: Restrict all of these for only the relevant user
  #

  # def index
  #   @season = Season.find(session[:user_id])
  # end

  # def new

  # end

  def create #post to create a new season
    @user = User.find(session[:user_id])
    @team = Team.find(season_params[:team_id])
    @team.seasons.new(season_params)
    if @team.save
      redirect_to user_path(@user)
      flash[:notice] = "You have successfully created a season!"
    else
      redirect_to user_path
      flash[:notice] = "Unsuccessful creation of season."
    end
  end

# '/season/team/:id'
  def show_all
    @user = User.find(session[:user_id])
    @team = Team.find(params[:id])
    @seasons = Season.where(team_id: @team.id)
    respond_to do |f|
      f.html { redirect_to user_path(@user) }
      f.json { render :json => @seasons }
      # f.html { render :json => @teams }
    end
  end



  # def show

  # end

  def edit
    @team = Team.find(@user.team_id)
  end

  def update #post for edit

  end

  def destroy

  end

   private

  def season_params
    params.require(:season).permit(:name, :team_id)


  end
end

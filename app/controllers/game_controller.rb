class GameController < ApplicationController

  def index

  end

  def new

  end

  def create
    @user = User.find(session[:user_id])
    @season = Season.find(game_params[:season_id])
    @season.games.new(game_params)
    if @season.save
      redirect_to user_path(@user)
      flash[:notice] = "you have successfully created a game"
    else
      redirect_to user_path(@user)
      flash[:notice] = "You're a goddamn asshole"
    end
  end

  def show

  end

  def edit

  end

  def update #post for edit

  end

  def destroy

  end

   private

  def game_params
    params.require(:game).permit(:date, :location, :win, :team_score, :opponent_score, :season_id)
  end

end

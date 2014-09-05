class GamesController < ApplicationController

  def index

  end

  def new

  end

  def create
    @game
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

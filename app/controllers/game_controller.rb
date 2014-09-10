class GameController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    # @user = User.find(session[:user_id])
    @season = Season.find(game_params[:season_id])
    @game = @season.games.new(game_params)

    if @game.save
      respond_to do |format|
        format.html { redirect_to user_path(@user) }
        format.json { render :json => @game }
      end
    else
      redirect_to user_path(@user)
      flash[:notice] = "Failed to create a game"
    end
  end

  def show_all
    # @user = User.find(session[:user_id])
    @season = Season.find(params[:id])
    @games = Game.where(season_id: @season.id)
    respond_to do |f|
      f.html { redirect_to user_path(@user) }
      f.json { render :json => @games }
      # f.html { render :json => @teams }
    end
  end

  def show
    # @user = User.find(session[:user_id])
    @game = Game.find(params[:id])
    @missed_shots = Stat.where(game_id: params[:id], stat_type: 1)
    @made_shots = Stat.where(game_id: params[:id], stat_type: 2)
    @rebounds = Stat.where(game_id: params[:id], stat_type: 3)
    @steals = Stat.where(game_id: params[:id], stat_type: 4)
    @turnovers = Stat.where(game_id: params[:id], stat_type: 5)
    @blocks = Stat.where(game_id: params[:id], stat_type: 6)
    respond_to do |f|
      f.html { game_path(@game) }
      f.json { render :json => {missed_shots: @missed_shots, made_shots: @made_shots, rebounds:@rebounds, steals: @steals, turnovers: @turnovers, blocks: @blocks} }
    end

  end

  def edit
    @game_id = params[:id]
  end

  # def update #post for edit

  # end

  # def destroy

  # end

   private

  def game_params
    params.require(:game).permit(:date, :location, :win, :team_score, :opponent, :opponent_score, :season_id)
  end

end

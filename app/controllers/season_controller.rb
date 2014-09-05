class SeasonController < ApplicationController

  def index
    @season = Season.find(session[:user_id])
  end

  def new

  end

  def create

  end

  def show

  end

  def edit

  end

  def update #post for edit

  end

  def destroy

  end
end

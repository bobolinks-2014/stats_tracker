class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.datetime :date 
      t.string :location
      t.integer :winning_team_id, :losing_team_id, :winning_total, :losing_total, :team_id, :season_id
      
      t.timestamps
    end
  end
end

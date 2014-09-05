class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.datetime :date
      t.string :location, :default => "home"
      t.string :opponent
      t.boolean :win, :default => nil
      t.integer :team_score, :default => nil
      t.integer :opponent_score, :default => nil
      t.integer :season_id

      t.timestamps
    end
  end
end

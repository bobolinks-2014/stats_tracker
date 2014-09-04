class Game < ActiveRecord::Base

	has_many :stats
	belongs_to :team
	belongs_to :season

end

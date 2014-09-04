require 'rails_helper'

RSpec.describe Game, :type => :model do

  	it {should have_many(:stats)}
  	it {should belong_to(:team)}
  	it {should belong_to(:season)}
  	
end

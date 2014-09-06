# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
  edgar = User.create(name: "Edgar Garza", email: "egarza@gmail.com", password: "password")
  mirta = Team.create(name: "White Tigers", school: "Mirta Ramirez", user_id: 1)
  mirta2 = Team.create(name: "White Tigers", school: "Mirta Ramirez", user_id: 1)
  date = ["02/05/14", "03/04/14", "04/04/14", "05/04/14", "06/04/14", "07/04/14"]
  boolean = [true, false]

  20.times do
    Game.create(date: date.sample, location: Faker::Address.street_address(include_secondary = false), win: boolean.sample, season_id: rand(1..2))
  end

  Season.create(name: "2013", team_id: 1)
  Season.create(name: "2014", team_id: 2)


# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
  User.create(name: "mike", email: "michael@test.com", password: "tester123")
  Team.create(name: "st. mikes", school: "hello", user_id: 1)
  Game.create(date: 01/12/13, location: "edgars moms house", team_id: 1)
  Stat.create(game_id: 1, made: true, stat_type: 1)
  Season.create(name: "edgars mom", game_id: 1)

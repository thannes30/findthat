class Venue < ActiveRecord::Base
  has_many :checkins
  has_many :users, through :checkins
  has_many :tips
  has_many :likes
end

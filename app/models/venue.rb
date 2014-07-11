class Venue < ActiveRecord::Base
  belongs_to :user
  has_many :likes
  has_many :tips
end

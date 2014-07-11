class User < ActiveRecord::Base
  has_many :venues
  has_many :likes
  has_many :tips

  authenticates_with_sorcery!
  validates :email, presence: true, uniqueness: true
  validates :password, length: { minimum: 3 }
  validates :password, confirmation: true

end

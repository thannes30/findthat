require 'rails_helper'

RSpec.describe User, :type => :model do
  it 'has checkins' do
    new_user = User.new
    checkin_1 = Checkin.new
    checkin_2 = Checkin.new
    new_user.checkins << checkin_1
    new_user.checkins << checkin_2
    expect(new_user.checkins.length).to eq(2)
  end
end

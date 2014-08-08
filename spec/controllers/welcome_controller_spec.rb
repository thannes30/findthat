require 'rails_helper'

RSpec.describe WelcomeController, :type => :controller  do
  describe 'given a user' do

    before :each do
      @lichard = User.new()
      @lichard.username = 'Lichard'
      @lichard.save
    end

    describe 'GET index' do

      before :each do
        get :index
      end

      it 'responds successfully' do
        expect(response.code).to eq('200')
      end

      it 'assigns @user' do
        expect(assigns[:user]).to be_instance_of(User)
      end

    end
  end
end

require 'rails_helper'

RSpec.describe UsersController, :type => :controller do

  describe 'given a user, a trail, and a favorite' do
    before :each do
      @lichard = User.new()
      @lichard.username = 'Lichard'
      @lichard.password = 'password'
      @lichard.save
      login_user(@lichard)
      @like = Like.create(name: 'The Eatery', venue_id: '000000')
      @lichard.likes << @like
    end

    describe 'GET profile' do
      before :each do
        get :profile
      end

      it 'responds successfully' do
        expect(response.code).to eq('200')
      end

      it 'assigns @likes to the current users likes' do
        expect(assigns(:likes)).to eq(@lichard.likes)
      end

      it 'renders the show template' do
        expect(response).to render_template('profile')
      end

    end
  end

  describe 'given successful params' do
    before :each do
      @params = {user: {username: 'Lichy', email: 'lich@gmail.co', password: 'password'}}
    end

    describe 'POST create' do
      before :each do
        post :create, @params
      end

      it 'responds successfully' do
        expect(response.code).to eq('200')
      end
    end
  end

end


require 'rails_helper'

RSpec.describe Note, type: :model do
  describe 'validations' do
    it { should validate_presence_of(:note) }
    it { should validate_presence_of(:user_id) }
    it { should validate_presence_of(:trail_id) }
  end

  describe 'associations' do
    it { should belong_to(:user) }
    it { should belong_to(:trail) }
  end
end

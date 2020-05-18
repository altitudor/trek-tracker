class CompletedTrail < ApplicationRecord
  validates :api_id, presence: true
  validates :user_id, presence: true

  belongs_to :user
end

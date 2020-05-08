class Note < ApplicationRecord
  validates :note, presence: true
  
  validates :user_id, presence: true
  validates :trail_id, presence: true

  belongs_to :user
  belongs_to :trail
end

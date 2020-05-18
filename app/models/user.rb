class User < ApplicationRecord
  validates :user_name, presence: true, uniqueness: true

  has_many :notes
  has_many :favorites
  has_many :completed_trails

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  mount_uploader :profile_photo, ProfilePhotoUploader
end

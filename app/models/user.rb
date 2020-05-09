class User < ApplicationRecord
  validates :user_name, presence: true, uniqueness: true

  has_many :notes

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end

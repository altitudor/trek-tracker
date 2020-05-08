class Trail < ApplicationRecord
    validates :name, presence: true

    has_many :notes
end

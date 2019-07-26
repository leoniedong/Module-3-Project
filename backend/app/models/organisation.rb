class Organisation < ApplicationRecord
    has_many :events
    has_many :tickets, through: :events
    has_many :students, through: :events

    validates :email, presence: true, uniqueness: true
    validates :name, presence: true
end

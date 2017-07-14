class Address < ApplicationRecord
  belongs_to :user
  validates :location, presence: true
  validates :label, presence: true
end

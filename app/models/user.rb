class User < ApplicationRecord
  has_many :addresses
  has_secure_password
  validates :firstname, presence: true 
  validates :lastname, presence: true 
  validates :email, presence: true
end

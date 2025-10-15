class User < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
  has_many :orders
  # devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable
end

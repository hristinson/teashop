class Order < ApplicationRecord
  belongs_to :user
  has_many :order_descriptions, dependent: :destroy
  validates :amount, presence: true, numericality: { greater_than: 0 }
  validates :user_id, presence: true

end

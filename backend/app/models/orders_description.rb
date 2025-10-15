class OrdersDescription < ApplicationRecord
  belongs_to :order
  belongs_to :item 
  validates :quantity, presence: true
  validates :item_id, presence: true
end

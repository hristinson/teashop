class OrdersDescriptionsController < ApplicationController
  def index
    @orders = Order.all
    render json: @orders
  end
end

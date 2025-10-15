class OrdersController < ActionController::API
  def index
    @orders = Order.all
    render json: @orders, status: :ok
  end

  def show
    @order = Order.find_by(id: params[:id])
    
    if @order
      render json: @order, status: :ok
    else
      render json: { error: "err OrdersController show" }, status: :not_found
    end
  end

  def create
    @order = Order.new(order_params)

    if @order.save
      render json: @order, status: :created
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @order = Order.find_by(id: params[:id])

    if @order.nil?
      render json: { error: "err OrdersController update" }, status: :not_found
    elsif @order.update(order_params)
      render json: @order, status: :ok
    else
      render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @order = Order.find_by(id: params[:id])

    if @order
      @order.destroy
      render json: { message: "err OrdersController destroy" }, status: :no_content
    else
      render json: { error: "err OrdersController destroy no order" }, status: :not_found
    end
  end

  def count
    user_id = params[:user_id]
    if user_id.present?
      order_count = Order.where(user_id: user_id).count
      render json: { user_id: user_id, order_count: order_count }, status: :ok
    else
      render json: { error: "err OrdersController count not found" }, status: :unprocessable_entity
    end
  end

  private

  def order_params
    params.require(:order).permit(:user_id, :amount)
  end
end


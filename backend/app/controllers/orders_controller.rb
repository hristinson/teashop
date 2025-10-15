class OrdersController < ActionController::API
   def index
    @user = User.find_by(id: params[:user_id])
    if @user
      @orders = @user.orders
      render json: @orders, status: :ok
    else
      render json: { error: "User not found" }, status: :not_found
    end
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

  ###########################################

  # def create
  #   @order = Order.new(order_params) 
  #   if @order.save
  #     item = params[:order][:item]
  #     @order.order_descriptions.create(item_id: item[:item_id], quantity: item[:quantity])
  #     render json: @order, status: :created
  #   else
  #     render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity 
  #   end
  # end

  ###########################################################################

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
  #  def set_user
  #   @user = User.find_by(id: params[:user_id])  # Шукаємо користувача за user_id
  #   if @user.nil?
  #     render json: { error: "User not found" }, status: :not_found
  #   end
  # end

  def order_params
    params.require(:order).permit(:user_id, :amount)
  end
end


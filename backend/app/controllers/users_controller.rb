# class UsersController < ApplicationController
#   def index
#     @users = User.all
#     render json: @users
#   end
# end

class UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: { message: 'User created successfully' }, status: :created
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])  # Очікуємо email в параметрах

    # Якщо користувач знайдений і паролі співпадають
    if user && user.password_digest == params[:password]  # Перевірка пароля без хешування
      render json: { message: 'Login successful', user: user }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end
  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end

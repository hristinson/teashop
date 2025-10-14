class UsersController < ApplicationController
   def create
    user_params = params.require(:user).permit(:first_name, :last_name, :email, :password_digest, :role)
    existing_user = User.find_by(email: user_params[:email])
    if existing_user
      render json: { error: "Email already exists" }, status: :unprocessable_entity
      return
    end
    @user = User.new(user_params)
    @user.password = params[:user][:password] 

    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def login
  user = User.find_by(email: params[:email])

  if user
    if user.password_digest == params[:password]
      render json: { message: 'Login successful', user: user }, status: :ok
    elsif user.authenticate(params[:password])
      render json: { message: 'Login successful', user: user }, status: :ok
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  else
    render json: { error: 'Invalid email or password' }, status: :unauthorized
  end
end
  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end

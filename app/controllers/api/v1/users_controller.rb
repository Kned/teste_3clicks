class Api::V1::UsersController < ApplicationController
  before_action :set_user, only: %i[show destroy edit update]

  def index
    users = User.all.order(created_at: :desc)
    render json: users
  end

  def create
    user = User.create!(user_params)
    if user
      render json: user
    else
      render json: user.errors
    end
  end

  def show
    render json: @user.as_json(include: [:addresses])
  end

  def destroy
    @user&.destroy
    render json: { message: 'User deleted!' }
  end

  def edit
    render json: @user.as_json(include: [:addresses])
  end

  def update
    
    if @user.update!(user_params.reject{|_, v| v.blank?})
      render json: @user
    else
      render json: @user.errors
    end
  end

  def search
    users = User.all.order(created_at: :desc).where("lower(name) LIKE '%#{params[:search].downcase}%' OR CPF = '#{params[:search]}'")
    render json: users
  end

  private

  def user_params
    params.permit(:name, :email, :cpf, :birthday, addresses_attributes: [:street, :number, :complement])
  end

  def set_user
    @user = User.find(params[:id])
  end
end
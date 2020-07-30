class UsersController < ApplicationController
  def show
    user = User.find(params[:id])
    @nickname = user.nickname
    @tweets = user.tweets
  end
  private
  #ストロングパラメーター
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :introduce, :image )
  end
end
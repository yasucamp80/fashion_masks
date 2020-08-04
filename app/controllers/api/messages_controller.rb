class Api::MessagesController < ApplicationController
  def index
    # ルーティングでの設定によりparamsの中にgroup_idというキーでグループのidが入るので、これを元にDBからグループを取得する
    group = Group.find(params[:tweet_id])
    # ajaxで送られてくる最後のメッセージのid番号を変数に代入
    last_tweet_id = params[:id]
    # 取得したグループでのメッセージ達から、idがlast_message_idよりも新しい(大きい)メッセージ達のみを取得
    @messages = group.tweet.includes(:user).where("id > ?", last_tweet_id)
  end
end
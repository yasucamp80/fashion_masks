$(function() {

  let search_list = $(".contents.row");

  function appendTweet(tweet) {
    if(tweet.user_sign_in && tweet.user_sign_in.id == tweet.user_id){
      let html = `<div class="content_post" style="background-image: url(${tweet.image});">
                  <div class="more">
                    <span><img src="/assets/arrow_top.png"></span>
                    <ul class="more_list">
                      <li>
                        <a href="/tweets/${tweet.id}" data-method="get" >詳細</a>
                      </li>
                      <li>
                        <a href="/tweets/${tweet.id}/edit" data-method="get" >編集</a>
                      </li>
                      <li>
                        <a href="/tweets/${tweet.id}" data-method="delete" >削除</a>
                      </li>
                    </ul>
                  </div>
                  <p>${tweet.text}</p><br>
                  <span class="name">
                    <a href="/users/${tweet.user_id}">
                      <span>投稿者</span>${tweet.nickname}
                    </a>
                  </span>
                </div>`
    search_list.append(html);
    } else {
      let html = `<div class="content_post" style="background-image: url(${tweet.image});">
                  <div class="more">
                    <span><img src="/assets/arrow_top.png"></span>
                    <ul class="more_list">
                      <li>
                        <a href="/tweets/${tweet.id}" data-method="get" >詳細</a>
                      </li>
                    </ul>
                  </div>
                  <p>${tweet.text}</p><br>
                  <span class="name">
                    <a href="/users/${tweet.user_id}">
                      <span>投稿者</span>${tweet.nickname}
                    </a>
                  </span>
                </div>`
    search_list.append(html);
    }
  }

  function appendErrMsgToHTML(msg) {
    let html = `<div class='name'>${ msg }</div>`
    search_list.append(html);
  }
  
  $(".search-input").on("keyup", function() {
    let input = $(".search-input").val();
    $.ajax({
      type: 'GET',
      url: '/tweets/search',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(tweets) {
      search_list.empty();
      if (tweets.length !== 0) {
        tweets.forEach(function(tweet){
          appendTweet(tweet);
        });
      }
      else {
        appendErrMsgToHTML("一致するツイートがありません");
      }
    })
  });



  let countup = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    let last_message_id = $('.first-message:last').data("tweet-id") || 0;
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(tweets) {
      // 更新するメッセージがなかった場合は.doneの後の処理が動かないようにする
      if (tweets.length !== 0) {
        //追加するHTMLの入れ物を作る
        let insertHTML = '';
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        $.each(tweets, function(tweet) {
          insertHTML += buildHTML(tweet)
        });
        //メッセージが入ったHTMLに、入れ物ごと追加
        $('.contents.row').append(insertHTML);
        $('.contents.row').animate({ scrollTop: $('.contents.row')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(countup, 7000);
});
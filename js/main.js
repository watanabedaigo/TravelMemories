/* jshint curly:true, debug:true */
/* globals $, firebase */

let currentUID = null;

let nickname = "";

// ログイン関係ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const logIn = (mail,pass) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(mail,pass)
    .then((user) => { 
      console.log('ログインしました');
    })
    .catch((error) => {
      console.error('ログインに失敗しました',error);
      if(error.code === 'auth/user-not-found'){
        firebase
          .auth()
          .createUserWithEmailAndPassword(mail,pass)
          .then(() => {
            console.log('ユーザーを新規作成しました');
            
            currentUID = firebase.auth().currentUser.uid;

            const userData = {
              nickname,
            };

            firebase
              .database()
              .ref(`users/${currentUID}`)
              .set(userData)
              .then(() => {
                console.log('ユーザー情報をデータベースに保存することに成功しました。');
              })
              .catch((error) => {
                console.error('ユーザー情報をデータベースに保存することに失敗しました');
              });
          })
          .catch((error) => {
            console.error('ユーザーの作成に失敗しました');
          });
      };
    });
};

const logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('ログアウトしました');
    })
    .catch((error) => {
      console.error('ログアウトに失敗しました');
    });
};

$('#login-form').on('submit',(e) => {
  const mail = $('#user-mail').val();
  const pass = $('#user-pass').val();
  
  e.preventDefault();
  
  logIn(mail,pass);
});

$('#logout-button').on('click',() => {
  logOut();
});

$('#nickname-form').on('submit',(e) => {
  e.preventDefault();

  nickname = $('#add-nickname').val();
  
  const userData = {
    nickname,
  };
  
  firebase
    .database()
    .ref(`users/${currentUID}`)
    .set(userData)
    .then(() => {
      console.log('ニックネームの追加に成功');
      showNicknameForm();
    })
    .catch(() => {
      console.error('ニックネームの追加に失敗');
    });
});

// 旅行先関係ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const addTravel = (travelId,travelData) => {
  switch(travelData.furigana.slice(0,1)){
  case 'あ':
  case 'い':
  case 'う':
  case 'え':
  case 'お':
    $('#travel-list-a').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `); 
    break;
    
  case 'か':
  case 'き':
  case 'く':
  case 'け':
  case 'こ':
  case 'が':
  case 'ぎ':
  case 'ぐ':
  case 'げ':
  case 'ご':
    $('#travel-list-ka').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
  
  case 'さ':
  case 'し':
  case 'す':
  case 'せ':
  case 'そ':
  case 'ざ':
  case 'じ':
  case 'ず':
  case 'ぜ':
  case 'ぞ':
    $('#travel-list-sa').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
  
  case 'た':
  case 'ち':
  case 'つ':
  case 'て':
  case 'と':
  case 'だ':
  case 'ぢ':
  case 'づ':
  case 'で':
  case 'ど':
    $('#travel-list-ta').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
  
  case 'な':
  case 'に':
  case 'ぬ':
  case 'ね':
  case 'の':
    $('#travel-list-na').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
  
  case 'は':
  case 'ひ':
  case 'ふ':
  case 'へ':
  case 'ほ':
  case 'ば':
  case 'び':
  case 'ぶ':
  case 'べ':
  case 'ぼ':
    $('#travel-list-ha').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
  
  case 'ま':
  case 'み':
  case 'む':
  case 'め':
  case 'も':
    $('#travel-list-ma').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
    
  case 'や':
  case 'ゆ':
  case 'よ':
    $('#travel-list-ya').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
    
  case 'ら':
  case 'り':
  case 'る':
  case 'れ':
  case 'ろ':
    $('#travel-list-ra').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
    
  case 'わ':
    $('#travel-list-wa').append(`
      <div class="travel-item ml-2" id=${travelId}>
        <a class="travel-link" href="travel.html?id=${travelId}&name=${travelData.name}&nickname=${nickname}"><div class="travel-item-title"><nobr>・${travelData.name}<wbr>　(${travelData.furigana})</nobr><button class="btn btn-success p-1 d-none fas fa-trash-alt travel-delete-button ${travelData.nickname}"></button></div></a>
      </div>
    `);    
    break;
  }
  
  if(nickname === travelData.nickname){
    $(`.${nickname}`).removeClass("d-none");
  }
};

const loadTravel = () => {
  resetTravel();
  
  const travelsRef = firebase
    .database()
    .ref('travels')
    .orderByChild('furigana');
  
  travelsRef.on('child_added',(travelSnapshot) => {
    const travelId = travelSnapshot.key;
    const travelData = travelSnapshot.val();
    addTravel(travelId,travelData);
  });
};

const resetTravel = () => {
  $('#travel-list').empty();
};

const resetTravelForm = () => {
  $('#travel-form')[0].reset();
};

$('#travel-form').on('submit',(e) => {
  e.preventDefault();
  
  const name = $('#add-travel').val();
  const furigana = $('#add-travel-furigana').val();
  
  const travelData = {
    name,
    furigana,
    nickname,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
  
  firebase
    .database()
    .ref('travels')
    .push(travelData) //pushの場合は識別するためのidが割り振られる。
    .then(() => {
      console.log('データの保存に成功');
      resetTravelForm();
    })
    .catch((error) => {
      console.error('データの保存に失敗しました',error);
    });
});

$(document).on('click','.travel-delete-button',(e) => {
  e.preventDefault();
  const travelUniqueId = $(e.target).parent().parent().parent()[0].getAttribute('id');
  firebase
    .database()
    .ref(`travels/${travelUniqueId}`)
    .remove()
    .then(() => {
      console.log('Realtimedatabase上からデータを削除');
      $(e.target).parent().parent().parent().remove();
      console.log('表示しているDOM要素を削除');
    });
});

// ログイン状態による表示の切り替えーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const changeView = () => {
  if(currentUID != null){
    $('.visible-on-logout').hide();
    $('.visible-on-login').show();
    $('#logout-button').show();
  }else{
    $('.visible-on-login').hide();
    $('#logout-button').hide();
    $('.visible-on-logout').show();
  }
};

const showNicknameForm = () => {
  if(nickname == ""){
    $('.visible-on-have-nickname').hide();
    $('.visible-on-nothave-nickname').show();
  }else if(nickname != ""){
    $('.visible-on-nothave-nickname').hide();
    $('.visible-on-have-nickname').show();
    console.log(nickname);
    $('#show-nickname')
      .text(`ようこそ ${nickname} さん！`);
    loadTravel();
  };
};

firebase.auth().onAuthStateChanged((user) => {
  if(user){
    console.log('状態：ログイン中');
    currentUID = user.uid;

    firebase
      .database()
      .ref(`users/${currentUID}`)
      .on('child_added',(nicknameSnapshot) => {
        nickname = nicknameSnapshot.val();
        changeView();
        showNicknameForm();
      });
  }else{
    console.log('状態：ログインしてない');
    currentUID = null;
    nickname = "";
    changeView();
  }
});

// ページ遷移時の処理ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const onload = () => {
  loadComment();
  loadPhotoStoragePath();
  
  let url_string = location.href; 
  let url = new URL(url_string);
  let name = url.searchParams.get("name");　
  $('#travel-name').text(name);
};

// コメント関係ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const resetComment = () => {
  $('#comment-list').empty();
};

const resetCommentForm = () => {
  $('#comment-form')[0].reset();
};

const commentScroll = () => {
  const $commentTable = $("#comment-table").offset().top;
  $(window).scrollTop($commentTable);
};

const loadComment = () => {
  resetComment();
  
  $('#for-limitcomments').show();
  $('#for-allcomments').hide();
  
  let url_string = location.href; 
  let url = new URL(url_string);　
  let id = url.searchParams.get("id");　
  let nickname = url.searchParams.get("nickname"); 
  
  const commentsRef = firebase
    .database()
    .ref('comments/' + id); 

  commentsRef.once('value',(parent) => {
    const total = parent.numChildren();

    if(total > 10){
      console.log(`コメント${total}件は最大表示数を超えています。`);
      $('#show-allcomments-button').show();
    }else{
      console.log(`コメント${total}件は最大表示数を超えていません。`);
      $('#show-allcomments-button').hide();
    }
  });

  commentsRef.limitToLast(10).on('child_added',(commentSnapshot) => {
    // console.log('by load comments');
    const commentId = commentSnapshot.key;
    const commentData = commentSnapshot.val();
    addComment(commentId,commentData);
  });
};

const addComment = (commentId,commentData) => {
  const date = new Date(commentData.createdAt);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth()+1) ).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2);
  const time = `${year}/${month}/${day} ${hour}:${minute}`;
  
  $('#comment-list').append(`
    <div class="comment-item mb-2 border-bottom border-success" id="${commentId}">
      <div class="comment-item-user">${commentData.nickname} < at${time} > <button class="btn btn-success p-1 d-none fas fa-trash-alt comment-delete-button ${commentData.nickname}"></button></div>
      <div class="comment-item-title ml-2 mr-2">${commentData.comment}</div>
    </div>
  `);
  
  let url_string = location.href; 
  let url = new URL(url_string);　
  let nickname = url.searchParams.get("nickname"); 
  
  if(nickname === commentData.nickname){
    $(`.${nickname}`).removeClass("d-none");
  }
};

$('#comment-form').on('submit',(e) => {
  e.preventDefault();
  
  let url_string = location.href; 
  let url = new URL(url_string);　
  let id = url.searchParams.get("id");　
  let nickname = url.searchParams.get("nickname"); 
  
  const comment = $('#add-comment').val();

  const commentData = {
    comment,
    nickname,
    createdAt: firebase.database.ServerValue.TIMESTAMP,
  };
  
  firebase
    .database()
    .ref('comments/' + id) 
    .push(commentData) 
    .then(() => {
      console.log('データの保存に成功');
      resetCommentForm();
      loadComment();
    })
    .catch((error) => {
      console.error('データの保存に失敗しました',error);
    });
  
  // loadComment();
});

$(document).on('click','.comment-delete-button',(e) => {
  let url_string = location.href; 
  let url = new URL(url_string);　
  let id = url.searchParams.get("id");
  
  const commentUniqueId = $(e.target).parent().parent()[0].getAttribute('id');

  firebase
    .database()
    .ref(`comments/${id}/${commentUniqueId}`)
    .remove()
    .then(() => {
      console.log('Realtimedatabase上からデータを削除');
      $(e.target).parent().parent().remove();
      console.log('表示しているDOM要素を削除');
      
      loadComment();
    });
});

$('#show-allcomments-button').on('click',(e) => {
  resetComment();

  console.log('click show-allcomments-button');
  
  $('#for-allcomments').show();
  $('#for-limitcomments').hide();
  
  let url_string = location.href; 
  let url = new URL(url_string);　
  let id = url.searchParams.get("id");　
  
  const commentsRef = firebase
    .database()
    .ref('comments/' + id);

  commentsRef.orderByChild('createdAt').once('value', function(commentSnapshot) {
    commentSnapshot.forEach(function(childSnapshot) {
      const commentId = childSnapshot.key;
      const commentData = childSnapshot.val();
      addComment(commentId,commentData);
    });
    commentScroll();
  });
});

$('#show-limitcomments-button').on('click',(e) => {
  loadComment();
  commentScroll();
});

// 画像関係ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー
const resetImageForm = () => {
  $('#image-form')[0].reset();
};

const resetImage = () => {
  $('#upload-image-preview').empty();
};

const photoScroll = () => {
  const $photoTable = $("#photo-table").offset().top;
  $(window).scrollTop($photoTable);
};

const uploadImage = (file,fileName,time) => {
  firebase
    .storage()
    .ref(fileName)
    .put(file)
    .then((snapshot) => {
      console.log('写真のアップロードに成功');

      let url_string = location.href; 
      let url = new URL(url_string);　
      let id = url.searchParams.get("id");
      let nickname = url.searchParams.get("nickname"); 
  
      // RealtimeDatabaseに保存
      const photoStoragePath = `photo_${time}`;
      
      const imageComment = $('#add-image-comment').val();
      
      const photoData = {
        photoStoragePath,
        nickname,
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        imageComment,
      };
  
      firebase
        .database()
        .ref('photoStoragePaths/' + id) 
        .push(photoData)
        .then(() => {
          console.log('写真のパスの保存に成功');
          resetImageForm();
        })
        .catch((error) => {
          console.error('写真のパスの保存に失敗しました',error);
        });
    })
    .catch((error) => {
      console.error('アップロードエラー',error);
    });
};

const loadPhotoStoragePath = () => {
  resetImage();

  $('#for-limitphotos').show();
  $('#for-allphotos').hide();
  
  let url_string = location.href; 
  let url = new URL(url_string);
  let id = url.searchParams.get("id");
  let nickname = url.searchParams.get("nickname");
  
  const photoStoragePathsRef = firebase
    .database()
    .ref('photoStoragePaths/' + id);

  photoStoragePathsRef.once('value',(parent) => {
    const photoTotal = parent.numChildren();
    
    if(photoTotal > 12){
      console.log(`写真${photoTotal}は最大表示数を超えています。`);
      $('#show-allphotos-button').show();
    }else{
      console.log(`写真${photoTotal}は最大表示数を超えていません。`);
    }
  });
  
  photoStoragePathsRef.orderByChild("createdAt").on('child_added',(photoSnapshot) => {
    const photoName = photoSnapshot.val().photoStoragePath;
    const fileName = `${id}/${photoName}`;
    const addBy = photoSnapshot.val().nickname;
    const imageComment = photoSnapshot.val().imageComment;
    downloadImage(fileName,addBy,imageComment); 
  });
};

const downloadImage = (fileName,addBy,imageComment) => {
  let url_string = location.href; 
  let url = new URL(url_string);
  let id = url.searchParams.get("id");　
  let nickname = url.searchParams.get("nickname"); 

  firebase
    .storage()
    .ref(fileName)
    .getDownloadURL()
    .then((url) => {
      // console.log('写真のダウンロードに成功');
      $('#upload-image-preview').prepend(`
      <div class="col-md-2 col-4 mb-2 pr-1 pl-1 image-container">
        <a href="${url}" title="${imageComment} BY ${addBy}" class="popup"><img src="${url}" class="img-fluid" style="object-fit:cover; width:100%; height:100%;"></a>
      </div>
      `);
      
      $('.popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
      });
    })
    .catch((error) => {
      console.error('ダウンロードエラー',error);
    });
};

$('#image-form').on('change',() => {
  const fileTitle = [];
  
  const { files } = $('#upload-image')[0];
  
  for(let i = 0; i < files.length; i++){
    const file = files[i];
    const title = file.name;
    
    fileTitle.push(title);
  }
  
  $('#upload-image-title').attr('value',fileTitle.join(","));
});

$('#image-form').on('submit',(e) => {
  e.preventDefault();
  
  $('#upload-image-title').attr('value','ファイルが選択されていません');
  
  let url_string = location.href; 
  let url = new URL(url_string);　
  let id = url.searchParams.get("id");　
  let nickname = url.searchParams.get("nickname");
  
  const { files } = $('#upload-image')[0]; 

  if(files.length === 0){
    return;
  };
  
  for(let i = 0; i < files.length; i++){
    const date = new Date();
    const time = date.getTime();
    const file = files[i];
    
    const fileName = `${id}/photo_${time}`;
    
    uploadImage(file,fileName,time);
  }
});

$('#show-allphotos-button').on('click',(e) => {
  $('#for-limitphotos').hide();
  $('#for-allphotos').show();
  
  $('.image-container').css("display","block");
  
  photoScroll();
});

$('#show-limitphotos-button').on('click',() => {
  $('#for-limitphotos').show();
  $('#for-allphotos').hide();
  
  $('.image-container').slice(12).css("display","none");
  
  photoScroll();
});


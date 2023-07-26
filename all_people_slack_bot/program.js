const WEBHOOK_URL = ""

function response(message) {
  return message
}

function doPost(e) {
  if(e.postData.type === 'application/json') {
    const params = JSON.parse(e.postData.getDataAsString());
    // リクエストURL認証用の処理
    if (typeof params.challenge !== 'undefined') {
      return ContentService.createTextOutput(params.challenge);
    }
    postChatMessage(response(params["event"]["text"].split(">")[1].trim()));
  }
}


function postChatMessage (message) {
  const payload = {
    'text': message,
  };
  UrlFetchApp.fetch(WEBHOOK_URL, {
  'method' : 'post',
  'contentType': 'application/json',
  'payload' : JSON.stringify(payload)
  });
}



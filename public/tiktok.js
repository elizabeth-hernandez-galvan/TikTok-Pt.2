
async function sendPostRequest(url,data) {
  console.log("about to send post request");
  let response = await fetch(url, {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'}, 
    body: JSON.stringify(data) });
    //JSON.stringfy() takes object as input. Produces the
    //corresponding string, containing data in JSON format. 
    console.log(data);
  if (response.ok) {
    let data = await response.text();
    return data;
  }
  else {
    throw Error(response.status);
  } 
}

function getUserInput() {
  let username = document.getElementById("user").value;
  let url = document.getElementById("url").value;
  let nickname = document.getElementById("video").value;
  let inputData = {"username":username ,"url": url,"nickname":nickname};
  console.log("sending", inputData);

  
sendPostRequest('/videoData', inputData)
  .then(function(data) {
    console.log(data);
    if(data == "database full") {
      alert("Database is full, you can't add more than 8 videos");
    }
    window.location = "/videoPreview.html";  })
  .catch(function(error) {
    console.log("Error occurred:", error)
  });
}

function getMyVideos() {
  window.location.href = "MyVideos.html";
}
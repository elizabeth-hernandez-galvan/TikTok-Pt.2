function goBack() {
   window.location.href = "tiktokpets.html";
}
async function getList(url) {
  let response = await fetch(url, {
    method: 'GET', 
    headers: {'Content-Type': 'application/json'}, 
  });
  if (response.ok) {
    let data = await response.json();
    console.log(data);
    return data;
  }
  else {
    throw Error(response.status);
  } 
}

async function getResult(){
  let result = await getList('/getList')
  return result;
}

async function deleteVideoData(url,data) {
  console.log("about to delete video request");
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


async function doTask(){
  let data = await getResult();
  console.log(data);
  for(i = 0; i < data.length; i++) {
    const petnames = document.getElementsByName('videoData');
    petnames[i].placeholder = data[i].nickname;
  }

  changeButtonColor();
  
  function changeButtonColor() {
    let btnNew = document.getElementById("button3");
    let btnGame = document.getElementById("button4");
      if (data.length == 8.0 /*check if there are 8 videos*/) {
          btnNew.style.background = "rgba(238,29,82,0.5)";
          btnGame.style.background = "rgba(238,29,82,0.9)";
          btnNew.setAttribute('disabled','disabled');
      } else {
          btnNew.style.background = "rgba(238,29,82,0.9)";
          btnGame.style.background = "rgba(238,29,82,0.5)";
          btnGame.setAttribute('disabled','disabled');
      }
  }
  
}

function change_css_one(){
  let video_one = document.getElementById('video1');
  video_one.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_one.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_one.placeholder = "";
  video_one.text = "";
}

function change_css_two(){
  let video_two = document.getElementById('video2');
  video_two.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_two.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_two.placeholder = "";
  video_two.text = "";
}

function change_css_three(){
  let video_three = document.getElementById('video3');
  video_three.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_three.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_three.placeholder = "";
  video_three.text = "";
}

function change_css_four(){
  let video_four = document.getElementById('video4');
  video_four.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_four.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_four.placeholder = "";
  video_four.text = "";
}

function change_css_five(){
  let video_five = document.getElementById('video5');
  video_five.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_five.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_five.placeholder = "";
  video_five.text = "";
}

function change_css_six(){
  let video_six = document.getElementById('video6');
  video_six.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_six.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_six.placeholder = "";
  video_six.text = "";
}

function change_css_seven(){
  let video_seven = document.getElementById('video7');
  video_seven.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_seven.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_seven.placeholder = "";
  video_seven.text = "";
}

function change_css_eight(){
  let video_eight = document.getElementById('video8');
  video_eight.style.cssText = 'background-color: white; border-style: dashed;';
  let object = {nickname: video_eight.placeholder };
  deleteVideoData('/deleteVideo', object)
  video_eight.placeholder = "";
  video_eight.text = "";
}

doTask();




// This viewer takes a TikTok video URL and displays it in a nice magenta box, and gives it a reload button in case you want to watch it again. 

let divElmt = document.getElementById("tiktokDiv");

async function getRecent(url) {
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
  let result = await getRecent('/getMostRecent')
  return result;
}

async function doTask(){
  let data = await getResult();
  let report = document.getElementById("nick");
  let msg = report.textContent;
  msg = msg.replace("nickVal", data.nickname);
  report.textContent = msg;
  addVideo(data.url, divElmt);
  loadTheVideos();
 

// Add the blockquote element that tiktok will load the video into
  async function addVideo(tiktokurl,divElmt) {
    
    let videoNumber = tiktokurl.split("video/")[1];
    
    let block = document.createElement('blockquote');
    block.className = "tiktok-embed";
    block.cite = tiktokurl;
      // have to be formal for attribute with dashes
    block.setAttribute("data-video-id",videoNumber);
    block.style = "width: 325px; height: 563px;"
    
    let section = document.createElement('section');
    block.appendChild(section);
      
    divElmt.appendChild(block);
  }
    
   
  function loadTheVideos() {
    body = document.body;
    script = newTikTokScript();
    body.appendChild(script);
  }
    
    // makes a script node which loads the TikTok embed script
  function newTikTokScript() {
    let script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js"
    script.id = "tiktokScript"
    return script;  
  }
  

  function reloadVideo () {
    
    // get the two blockquotes
    let blockquotes 
   = document.getElementsByClassName("tiktok-embed");
  
    // and remove the indicated one
      block = blockquotes[0];
      console.log("block",block);
      let parent = block.parentNode;
      parent.removeChild(block);
  
    // remove both the script we put in and the
    // one tiktok adds in
    let script1 = document.getElementById("tiktokScript");
    let script2 = script.nextElementSibling;
  
    let body = document.body; 
    body.removeChild(script1);
    body.removeChild(script2);
  
    addVideo(data.url,divElmt);
    loadTheVideos();
  }
  let reloadButton = document.getElementById("reload");
  reloadButton.addEventListener("click",reloadVideo);
}

doTask();
function goBack() {
   window.location.href = "MyVideos.html";
}

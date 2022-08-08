
$(function () {
    var playerTrack = $("#player-track"),
    bgArtwork = $("#bg-music"),
    bgArtworkUrl,
    albumName = $("#album-name"),
    trackName = $("#track-name"),
    albumArt = $("#album-art"),
    sArea = $("#s-area"),
    seekBar = $("#seek-bar"),
    trackTime = $("#track-time"),
    insTime = $("#ins-time"),
    sHover = $("#s-hover"),
    playPauseButton = $("#play-pause-button"),
    i = playPauseButton.find("i"),
    tProgress = $("#current-time"),
    tTime = $("#track-length"),
    volup = $("#vol-up"),
    voldown = $("#vol-down"),
    timemusic= $(".timemusic"),
    vol = 0.5,
    volin = 5,
    curvol = $("#currvol"),
    seekT,
    seekLoc,
    seekBarPos,
    cM,
    ctMinutes,
    ctSeconds,
    curMinutes,
    curSeconds,
    durMinutes,
    durSeconds,
    playProgress,
    bTime,
    nTime = 0,
    buffInterval = null,
    tFlag = false,
    albums = [
    "ALIVE - OST Lycoris Recoil",
    "New Genesis (from ONE PIECE FILM RED)",
    "Shikaku Unmei - ED A Couple of Cuckoos",
    "Tiny Light - Jibaku Shounen Hanako-kun",
    "Clear Morning - OP Blue Archive",
    "Koi No Yukue",
    "Gurenge",
    "Hikaru nara - OP Your Lie in April",
    "Renai Circulation",
    "Pretender",
    "Racing Into The Night Remix",
    "Always In My Heart",
    "Zankyosanka",
    "Halzion Remix",
    "Usseewa"],
  
    trackNames = [
    "ClariS",
    "Aimer",
    "Sangatsu no Phantasia",
    "Akari Kitou",
    "Yui Ogura ",
    "Akase Akari",
    "LiSA",
    "Goose House",
    "Lizz Robinett",
    "Official髭男dism",
    "YOASOBI",
    "Yamada Tamaru",
    "Aimer",
    "YOASOBI",
    "Ado"],
  
    albumArtworks = ["_1", "_2", "_3", "_4", "_5","_6","_7","_8","_9","_10","_11","-12","_13","_14","_15"],
    trackUrl = [
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/ALIVE.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/New%20Genesis.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Shikaku%20Unmei.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Tiny%20Light.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Blue%20Archive%20Theme%20Song%20Full%20%20Clear%20Morning%20%20Yui%20Ogura.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/koi%20no%20yukue.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Demon%20Slayer%20Kimetsu%20no%20Yaiba%20%20OP%20Full%20Gurenge.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Hikaru%20nara%20by%20Goose%20House.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Renai%20Circulation.mp3",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/PretenderOfficial%20Video.mp3",
    "https://cdn.glitch.global/57e83457-d075-4fde-8230-91aaf1347df5/YOASOBI%20%20Racing%20Into%20The%20Night%20Lone%20Alpha%20Remix.mp3",
    "https://cdn.glitch.global/57e83457-d075-4fde-8230-91aaf1347df5/Always%20in%20my%20heart%20full.mp3",
    "https://cdn.glitch.global/57e83457-d075-4fde-8230-91aaf1347df5/Zankyosanka.webm",
    "https://cdn.glitch.me/57e83457-d075-4fde-8230-91aaf1347df5/yoasobi%20-%20halzion%20remix%20(1).wav",
    "https://cdn.glitch.global/0de964e8-6cf3-46f2-be6f-cf3b486d99a5/Ado%E3%81%86%E3%81%A3%E3%81%9B%E3%81%87%E3%82%8F.mp3"],
  
    playPreviousTrackButton = $("#play-previous"),
    playNextTrackButton = $("#play-next"),
    currIndex = -1;
  
    function playPause() {
      setTimeout(function () {
        if (audio.paused) {
          playerTrack.addClass("active");
          playerTrack.removeClass("noactive");
          albumArt.addClass("active");
          timemusic.addClass("ap-timebar");
          timemusic.removeClass("ex-timebar");
          checkBuffering();
          i.attr("class", "fas fa-pause");
          audio.play();
          
        } else {
          playerTrack.removeClass("active");
          playerTrack.addClass("noactive");
          timemusic.removeClass("ap-timebar");
          timemusic.addClass("ex-timebar");
          albumArt.removeClass("active");
          clearInterval(buffInterval);
          albumArt.removeClass("buffering");
          i.attr("class", "fas fa-play");
          audio.pause();
        }
      }, 300);
    }
    //

    // 

    function showHover(event) {
      seekBarPos = sArea.offset();
      seekT = event.clientX - seekBarPos.left;
      seekLoc = audio.duration * (seekT / sArea.outerWidth());
  
      sHover.width(seekT);
  
      cM = seekLoc / 60;
  
      ctMinutes = Math.floor(cM);
      ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
  
      if (ctMinutes < 0 || ctSeconds < 0) return;
  
      if (ctMinutes < 0 || ctSeconds < 0) return;
  
      if (ctMinutes < 10) ctMinutes = "0" + ctMinutes;
      if (ctSeconds < 10) ctSeconds = "0" + ctSeconds;
  
      if (isNaN(ctMinutes) || isNaN(ctSeconds)) insTime.text("--:--");else
      insTime.text(ctMinutes + ":" + ctSeconds);
  
      insTime.css({ left: seekT, "margin-left": "-21px" }).fadeIn(0);
    }
  
    function hideHover() {
      sHover.width(0);
      insTime.text("00:00").css({ left: "0px", "margin-left": "0px" }).fadeOut(0);
    }
  
    function playFromClickedPos() {
      audio.currentTime = seekLoc;
      seekBar.width(seekT);
      hideHover();
    }
  
    function updateCurrTime() {
      nTime = new Date();
      nTime = nTime.getTime();
  
      if (!tFlag) {
        tFlag = true;
        trackTime.addClass("active");
       
        
        
      } 
  
      curMinutes = Math.floor(audio.currentTime / 60);
      curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
  
      durMinutes = Math.floor(audio.duration / 60);
      durSeconds = Math.floor(audio.duration - durMinutes * 60);
  
      playProgress = audio.currentTime / audio.duration * 100;
  
      if (curMinutes < 10) curMinutes = "0" + curMinutes;
      if (curSeconds < 10) curSeconds = "0" + curSeconds;
  
      if (durMinutes < 10) durMinutes = "0" + durMinutes;
      if (durSeconds < 10) durSeconds = "0" + durSeconds;
  
      if (isNaN(curMinutes) || isNaN(curSeconds)) tProgress.text("00:00");else
      tProgress.text(curMinutes + ":" + curSeconds);
  
      if (isNaN(durMinutes) || isNaN(durSeconds)) tTime.text("00:00");else
      tTime.text(durMinutes + ":" + durSeconds);
  
      if (
      isNaN(curMinutes) ||
      isNaN(curSeconds) ||
      isNaN(durMinutes) ||
      isNaN(durSeconds))
  
      {trackTime.removeClass("active")} else
      {trackTime.addClass("active")};
  
      seekBar.width(playProgress + "%");
  
      if (playProgress == 100) {
        i.attr("class", "fa fa-play");
        seekBar.width(0);
        tProgress.text("00:00");
        albumArt.removeClass("buffering").removeClass("active");
        clearInterval(buffInterval);
      }
    }
  
    function checkBuffering() {
      clearInterval(buffInterval);
      buffInterval = setInterval(function () {
        if (nTime == 0 || bTime - nTime > 1000) albumArt.addClass("buffering");else
        albumArt.removeClass("buffering");
  
        bTime = new Date();
        bTime = bTime.getTime();
      }, 100);
    }
  
    function selectTrack(flag) {
      if (flag == 0 || flag == 1) ++currIndex;else
      --currIndex;
  
      if (currIndex > -1 && currIndex < albumArtworks.length) {
        if (flag == 0) i.attr("class", "fa fa-play");else
        {
          albumArt.removeClass("buffering");
          i.attr("class", "fa fa-pause");
        }
  
        seekBar.width(0);
        trackTime.removeClass("active");
        tProgress.text("00:00");
        tTime.text("00:00");
  
        currAlbum = albums[currIndex];
        currTrackName = trackNames[currIndex];
        currArtwork = albumArtworks[currIndex];
  
        audio.src = trackUrl[currIndex];
  
        nTime = 0;
        bTime = new Date();
        bTime = bTime.getTime();
        playerTrack.addClass("noactive");
        playerTrack.removeClass("active");
        
        if (flag != 0) {
          audio.play();
          
          playerTrack.addClass("active");
          playerTrack.removeClass("noactive");
          timemusic.addClass("ap-timebar");
          timemusic.removeClass("ex-timebar");
          albumArt.addClass("active");
  
          clearInterval(buffInterval);
          checkBuffering();
        }
        
  
        albumName.text(currAlbum);
        trackName.text(currTrackName);
        albumArt.find("img.active").removeClass("active");
        $("#" + currArtwork).addClass("active");
  
        bgArtworkUrl = $("#" + currArtwork).attr("src");
  
        bgArtwork.css({ "background-image": "url(" + bgArtworkUrl + ")" });
      } else {
        if (flag == 0 || flag == 1) --currIndex;else
        ++currIndex;
      }
    }
    function upvol () {
      if (vol <= 0.9)  {vol = vol + 0.1 ; volin = volin +1};
      curvol.text(volin);
      audio.volume = vol;

    }
    function dwvol () {
      if (vol >=0.1 ) {vol = vol - 0.1; volin = volin -1};
      curvol.text(volin);
      
      audio.volume = vol;

    }
    function initPlayer() {
      audio = new Audio();
  
      selectTrack(0);
  
      audio.loop = false;
      audio.volume = vol;
      
  
      playPauseButton.on("click", playPause);
  
      sArea.mousemove(function (event) {
        showHover(event);
      });
  
      sArea.mouseout(hideHover);
  
      sArea.on("click", playFromClickedPos);
  
      $(audio).on("timeupdate", updateCurrTime);
  
      playPreviousTrackButton.on("click", function () {
        selectTrack(-1);
      });
      playNextTrackButton.on("click", function () {
        selectTrack(1);
      });

      volup.on("click", upvol);

      voldown.on("click", dwvol);
    }

    
    initPlayer(); 
  });

 
  
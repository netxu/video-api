document.addEventListener('DOMContentLoaded', function() {
  var videoPlayer = document.getElementById('videoPlayer');
  var playButton = document.getElementById('playButton');
  var pauseButton = document.getElementById('pauseButton');
  var volumeUpButton = document.getElementById('volumeUpButton');
  var volumeDownButton = document.getElementById('volumeDownButton');
  var timeDisplay = document.getElementById('timeDisplay');
  var loadingMessage = document.getElementById('loadingMessage');
  var fileInput = document.getElementById('fileInput');

  playButton.addEventListener('click', function() {
    videoPlayer.play();
  });

  pauseButton.addEventListener('click', function() {
    videoPlayer.pause();
  });

  volumeUpButton.addEventListener('click', function() {
    videoPlayer.volume += 0.1;
  });

  volumeDownButton.addEventListener('click', function() {
    videoPlayer.volume -= 0.1;
  });

  fileInput.addEventListener('change', function(event) {
    var file = event.target.files[0];
    
    if (file && file.type.startsWith('video/')) {
      var fileURL = URL.createObjectURL(file);
      videoPlayer.src = fileURL;
      videoPlayer.load();
    } else {
      alert('Por favor, selecciona un archivo de video válido.');
      fileInput.value = '';
    }
  });

  videoPlayer.addEventListener('timeupdate', function() {
    var currentTime = formatTime(videoPlayer.currentTime);
    var duration = formatTime(videoPlayer.duration);
    timeDisplay.textContent = 'Tiempo actual: ' + currentTime + ' / Duración: ' + duration;
  });

  videoPlayer.addEventListener('loadeddata', function() {
    loadingMessage.style.display = 'none';
  });

  videoPlayer.addEventListener('waiting', function() {
    loadingMessage.style.display = 'block';
  });

  function formatTime(time) {
    var hours = Math.floor(time / 3600);
    var minutes = Math.floor((time % 3600) / 60);
    var seconds = Math.floor(time % 60);

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  }
});
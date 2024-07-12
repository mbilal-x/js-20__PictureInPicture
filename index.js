const pipBtnEl = document.querySelector('#pipButton');
const video = document.createElement('video');

const displayMediaOptions = {
  video: true,
  audio: true,
};

async function startCapture(displayMediaOptions) {
  try {
    const captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    showPicture(captureStream);
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

async function showPicture(stream) {
  video.muted = true;
  video.srcObject = stream;
  video.play();
  video.addEventListener('loadedmetadata', () => {
    video.requestPictureInPicture().catch(console.error);
  });
}

function stopCapture(evt) {
  let tracks = video.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  video.srcObject = null;
}

pipBtnEl.addEventListener('click', () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture().catch((error) => {
      console.log(error);
      stopCapture();
    });
  } else {
    startCapture();
  }
});

video.addEventListener('enterpictureinpicture', () => {
  pipBtnEl.textContent = 'Stop Sharing';
});

video.addEventListener('leavepictureinpicture', () => {
  pipBtnEl.textContent = 'Start Sharing';
});

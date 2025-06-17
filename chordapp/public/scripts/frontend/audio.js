document.addEventListener('DOMContentLoaded', async function () {

    const startBtn = document.getElementById('record_btn');
    const stopBtn = document.getElementById('stop_btn');
    const playAudioBtn = document.getElementById('play_btn');
    const deleteBtn = document.getElementById('delete_btn');
    const audioPlayer = document.getElementById('audio_play');
    const predictBtn = document.getElementById('predict_btn');
    const audioInput = document.getElementById('audio_blob_input');

    let mediaRecorder;
    let audio_chunks = [];
    let audioBlob;

    stopBtn.disabled = true;
    playAudioBtn.disabled = true;
    deleteBtn.disabled = true;
    predictBtn.disabled = true;

    let stream;

    // Permission for use ofthe microphone
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (error) {
        alert('Access to microphone denied.');
        return;
    }
    // the audio 'MediaRecorder' API
    mediaRecorder = new MediaRecorder(stream);

    // Add data to data array when ready
    mediaRecorder.ondataavailable = e => {
        audio_chunks.push(e.data);
    };

    //When recording stops, new audioblobs is data array
    mediaRecorder.onstop = () => {
        audioBlob = new Blob(audio_chunks, { type: 'audio/webm,' });
        const audioUrl = URL.createObjectURL(audioBlob);

        //attach to audio player
        audioPlayer.src = audioUrl

        const file = new File([audioBlob], 'recording.webm', {type: 'audio/webm'});

        const dataTransfer = new DataTransfer()

        dataTransfer.items.add(file);

        audioInput.files = dataTransfer.files;

        startBtn.disabled = false;
        deleteBtn.disabled = false;
        predictBtn.disabled = false;
    };

    // Start event
    startBtn.addEventListener('click', function (e) {
        audio_chunks = [];
        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        console.log("Recording started.");
    });

    // Stop event
    stopBtn.addEventListener('click', function (e) {
        mediaRecorder.stop();
        startBtn.disabled = false;
        stopBtn.disabled = true;
        playAudioBtn.disabled = false;
        console.log("Recording stopped.");
    });    

    // Play audio event
    playAudioBtn.addEventListener('click', function (e) {
        audioBlob = null;
        audioPlayer.src = '';
        mediaRecorder.start();
        playAudioBtn.disabled = true;
        deleteBtn.disabled = true;
        console.log("Recording started");
    });


});

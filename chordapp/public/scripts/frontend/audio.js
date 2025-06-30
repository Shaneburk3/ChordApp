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
    let timeout;

    stopBtn.disabled = true;
    playAudioBtn.disabled = true;
    deleteBtn.disabled = true;
    predictBtn.disabled = true;

    let stream;
    //REF: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

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

    //When recording stops, new audioblob is data array
    mediaRecorder.onstop = () => {
        audioBlob = new Blob(audio_chunks, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);

        //attach to audio player
        audioPlayer.src = audioUrl

        const file = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(file);
        audioInput.files = dataTransfer.files;

        document.getElementById('audio_blob_input').files = dataTransfer.files;

        startBtn.disabled = false;
        deleteBtn.disabled = false;
        predictBtn.disabled = false;
    };

    // Start event
    startBtn.addEventListener('click', function (e) {
        e.preventDefault();
        audio_chunks = [];
        mediaRecorder.start();
        startBtn.disabled = true;
        stopBtn.disabled = false;
        playAudioBtn.disabled = true;
        deleteBtn.disabled = true;
        predictBtn.disabled = true;
        console.log("Recording started.");
        // set max time user can record.
        timeout = setTimeout(() => {
            if (mediaRecorder.state === "recording") {
                mediaRecorder.stop();
                console.log("Time limit reached.");
                playAudioBtn.disabled = false;
            }
        }, 8000)
    });

    // Stop event
    stopBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (mediaRecorder.state === "recording") {
            mediaRecorder.stop();
            clearTimeout(timeout);
            startBtn.disabled = false;
            stopBtn.disabled = true;
            playAudioBtn.disabled = false;
            console.log("Recording stopped.");
        }
    });

    // Play audio event
    playAudioBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (!audioBlob) {
            console.log('No audio Blob.');
            return;
        }
        console.log("Playing audio.");
        const audioUrl = URL.createObjectURL(audioBlob);
        audioPlayer.src = audioUrl;
        audioPlayer.play();
        playAudioBtn.disabled = true;
        startBtn.disabled = true;
        deleteBtn.disabled = false;
        predictBtn.disabled = false;
        stopBtn.disabled = false;

        audioPlayer.onended = function () {
            console.log('Recording ended.')
            playAudioBtn.disabled = false;
            deleteBtn.disabled = false;
            startBtn.disabled = false
            predictBtn.disabled = false;
            stopBtn.disabled = true;
        };
    });

    deleteBtn.addEventListener('click', function (e) {
        e.preventDefault();
        audioBlob = null;
        audioPlayer.src = '';
        audio_chunks = [];
        audioInput.value = '';

        playAudioBtn.disabled = true;
        deleteBtn.disabled = true;
        startBtn.disabled = false
        predictBtn.disabled = true;
        stopBtn.disabled = true;
        console.log("Recording deleted.")
    });
});

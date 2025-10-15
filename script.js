// Your script here.
// Populate available voices
function populateVoices() {
  voices = speechSynthesis.getVoices();

  voicesDropdown.innerHTML = '<option value="">Select A Voice</option>'; // Reset dropdown

  if (voices.length === 0) {
    const option = document.createElement('option');
    option.textContent = 'No voices available';
    option.disabled = true;
    voicesDropdown.appendChild(option);
    return;
  }

  voices.forEach(voice => {
    const option = document.createElement('option');
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = voice.name;
    voicesDropdown.appendChild(option);
  });
}

// Initial population & update on voiceschanged
populateVoices();
speechSynthesis.onvoiceschanged = populateVoices;

// Update msg properties when sliders or text changes
options.forEach(option => {
  option.addEventListener('input', () => {
    msg.rate = document.querySelector('[name="rate"]').value;
    msg.pitch = document.querySelector('[name="pitch"]').value;
    msg.text = document.querySelector('[name="text"]').value;
  });
});

// Handle voice change
voicesDropdown.addEventListener('change', () => {
  const selectedVoice = voices.find(voice => voice.name === voicesDropdown.value);
  if (selectedVoice) {
    msg.voice = selectedVoice;
  }

  // Restart speech if currently speaking
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel();
    speechSynthesis.speak(msg);
  }
});

// Speak button
speakButton.addEventListener('click', () => {
  if (!msg.text.trim()) {
    alert('Please enter some text to speak!');
    return;
  }

  if (speechSynthesis.speaking) {
    speechSynthesis.cancel(); // Stop ongoing speech
  }

  speechSynthesis.speak(msg);
});

// Stop button
stopButton.addEventListener('click', () => {
  speechSynthesis.cancel();
});

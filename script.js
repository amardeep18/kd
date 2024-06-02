document.addEventListener('DOMContentLoaded', () => {
    const utterance = new SpeechSynthesisUtterance();
    const content = document.body.innerText;
    utterance.text = content;

    const playButton = document.getElementById('play');
    const pauseButton = document.getElementById('pause');
    const rateInput = document.getElementById('rate');

    playButton.addEventListener('click', () => {
        speechSynthesis.speak(utterance);
    });

    pauseButton.addEventListener('click', () => {
        speechSynthesis.pause();
    });

    rateInput.addEventListener('input', (event) => {
        utterance.rate = event.target.value;
    });

    // Automatically start reading the content when the page loads
    speechSynthesis.speak(utterance);

    // Voice Commands using annyang
    if (annyang) {
        const commands = {
            'play': () => {
                speechSynthesis.speak(utterance);
            },
            'pause': () => {
                speechSynthesis.pause();
            },
            'slower': () => {
                utterance.rate = Math.max(0.5, utterance.rate - 0.1);
                speechSynthesis.cancel();
                speechSynthesis.speak(utterance);
            },
            'faster': () => {
                utterance.rate = Math.min(2, utterance.rate + 0.1);
                speechSynthesis.cancel();
                speechSynthesis.speak(utterance);
            }
        };

        annyang.addCommands(commands);
        annyang.start();
    }
});

const minDelay = 20;  // Reduced delay for faster typing
const maxDelay = 60;  // Reduced delay for faster typing
const keyOverrides = {
  [String.fromCharCode(160)]: ' '  // Handle non-breaking space
};
function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  return els.map(el => {
    if (el.firstChild?.classList?.contains('_enter')) {
      return '\n';
    }
    let text = el.textContent[0];
    return keyOverrides.hasOwnProperty(text) ? keyOverrides[text] : text;
  });
}
function recordKey(chr) {
  window.core.record_keydown_time(chr);
}
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function typeCharacter(chr) {
  recordKey(chr);
  const delay = Math.random() * (maxDelay - minDelay) + minDelay;
  await sleep(delay);  // Typing delay between characters
}
function goToNextLevel() {
  setTimeout(async () => {
    const nextButton = Array.from(document.querySelectorAll('span')).find(el => el.textContent === '→');
    if (nextButton) {
      nextButton.click();  // Click "Next Level" button immediately
      await sleep(500);  // Reduced sleep time after clicking next level
      autoPlay();  // Continue the game automatically
    }
  }, 1000);  // Faster transition to the next level
}
async function autoPlay() {
  const chrs = getTargetCharacters();
  if (chrs.length === 0) {
    goToNextLevel();  // Automatically go to the next level if no characters left
    return;
  }
  for (let i = 0; i < chrs.length; ++i) {
    const c = chrs[i];
    await typeCharacter(c);  // Type each character
  }
  goToNextLevel();  // Move to the next level after completing the current level
}
autoPlay();  // Start the auto-play function

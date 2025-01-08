const minDelay = 10;
const maxDelay = 100;
const keyOverrides = {
  [String.fromCharCode(160)]: ' '  
};
function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  const chrs = els
    .map(el => {
      if (el.firstChild?.classList?.contains('_enter')) {
        return '\n';
      }
      let text = el.textContent[0];
      return text;
    })
    .map(c => keyOverrides.hasOwnProperty(c) ? keyOverrides[c] : c); // convert special characters
  return chrs;
}
function recordKey(chr) {
  window.core.record_keydown_time(chr);
}
function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}
async function autoPlay() {
  const chrs = getTargetCharacters();
  if (chrs.length === 0) {
    goToNextLevel();
    return;
  }
  for (let i = 0; i < chrs.length; ++i) {
    const c = chrs[i];
    recordKey(c);
    await sleep(Math.random() * (maxDelay - minDelay) + minDelay);
  }
  goToNextLevel();
}
function goToNextLevel() {
  setTimeout(async () => {
    const nextButton = Array.from(document.querySelectorAll('span')).find(el => el.textContent === '→');
    if (nextButton) {
      nextButton.click();
      console.log('Moving to next level...');
      await sleep(1000); // Adjust this delay if necessary
      autoPlay(); 
    } else {
      console.log('Next level button not found.');
    }
  }, 2000);
}
autoPlay();

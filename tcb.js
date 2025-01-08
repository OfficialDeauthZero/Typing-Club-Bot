const minDelay = 10;
const maxDelay = 120;
const keyOverrides = {
  [String.fromCharCode(160)]: ' '
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
  await sleep(delay);
}
function goToNextLevel() {
  setTimeout(async () => {
    const nextButton = Array.from(document.querySelectorAll('span')).find(el => el.textContent === '→');
    if (nextButton) {
      nextButton.click();
      await sleep(1000);
      autoPlay();
    }
  }, 2000);
}
async function autoPlay() {
  const chrs = getTargetCharacters();
  if (chrs.length === 0) {
    goToNextLevel();
    return;
  }
  for (let i = 0; i < chrs.length; ++i) {
    const c = chrs[i];
    await typeCharacter(c);
  }
  goToNextLevel();
}
autoPlay();

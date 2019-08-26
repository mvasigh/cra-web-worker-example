export function longestCommonSubstring(texts) {
  function allPossibleSubstrings(text, length) {
    if (text.length === length) return [text];
    const limit = text.length - length;
    let substrings = [];
    for (let i = 0; i <= limit; i++) {
      substrings.push(text.slice(i, i + length));
    }
    return substrings;
  }

  const longestText = texts.reduce((acc, text, i) => {
    if (text.length > acc.length) {
      acc = text;
    }
    return acc;
  });
  const otherTexts = texts.filter(text => text !== longestText);
  for (let i = longestText.length; i > 0; i--) {
    const substrings = allPossibleSubstrings(longestText, i);
    for (let j = 0; j < substrings.length; j++) {
      const substring = substrings[j];
      if (substring === ' ') continue;
      if (otherTexts.every(otherText => otherText.includes(substring))) {
        return substring;
      }
    }
  }
  return 'No substrings in common';
}

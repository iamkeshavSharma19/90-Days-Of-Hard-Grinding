/**
 * @param {string} sentence
 * @return {boolean}
 */
var checkIfPangram = function (sentence) {
  let set = new Set();
  for (let i = 0; i < sentence.length; i++) {
    set.add(sentence[i]);
  }

  return set.size === 26;
};

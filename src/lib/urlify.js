export function urlify(word) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urlStart = "http" || "www";
  if (word.toLowerCase().includes(urlStart)) {
    return word.replace(urlRegex, function (url) {
      return `<a href="${url}" target="_blank" class="underlined bold break-word-all">${url}</a>`;
    });
  } else return `<p>${word}</p>`;
}

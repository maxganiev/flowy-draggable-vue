export function scrollToRecentlyAdded() {
  setTimeout(() => {
    const flowyHTMLCollection = document.getElementsByClassName("flowy-node");
    const recentlyAddedFlowyElem = flowyHTMLCollection[flowyHTMLCollection.length - 1];

    recentlyAddedFlowyElem.firstElementChild.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }, 100);
}

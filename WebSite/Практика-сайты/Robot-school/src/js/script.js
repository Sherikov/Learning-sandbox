const fourSectionScrolling = document.querySelector('.four-section-scrolling');
fourSectionScrolling.addEventListener('wheel', function(ev) {
  let fourSectionScrollingCards = this.querySelectorAll('.four-section-scrolling__cards');
  if (ev.wheelDelta > 0) {
    this.prepend(fourSectionScrollingCards[fourSectionScrollingCards.length - 1]);
  } else {
    this.append(fourSectionScrollingCards[0]);
  }
});

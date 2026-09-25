const track = document.querySelector('.carousel-track');

// 1. take all the cards that we have now.
const cards = Array.from(track.children);

// 2. Clone each card and add it to the end of the feed
// Now we'll have a set: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5]
cards.forEach(card => {
    const clone = card.cloneNode(true);
    track.appendChild(clone);
});


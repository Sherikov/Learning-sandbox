
function initRevealOnScroll() { // Function to initialize the reveal on scroll effect for various elements on the page
  const revealSelectors = [ // CSS selectors for the elements that should have the reveal on scroll effect applied
    "main .section-heading",
    "main .project-card",
    "main .skill-cloud span",
    "main .contact-card",
    ".footer"
  ];

  const revealTargets = Array.from( // Get all elements that match the specified selectors and convert the NodeList to an array for easier manipulation
    document.querySelectorAll(revealSelectors.join(", "))
  );

  if (revealTargets.length === 0) { // If there are no elements that match the selectors, there's nothing to reveal, so we can exit early
    return;
  }

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");

    if (element.matches(".project-card") || element.matches(".skill-cloud span")) {
      element.classList.add("reveal-float");
    }

    const delay = (index % 6) * 70; // Calculate a delay for the reveal animation based on the index of the element, creating a staggered effect for better visual appeal
    element.style.setProperty("--reveal-delay", `${delay}ms`);
  });

  const showElement = (element) => {
    element.classList.add("is-visible");
  };

  if ("IntersectionObserver" in window) {  // Check if the IntersectionObserver API is supported by the browser, which allows us to efficiently detect when elements enter the viewport
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          showElement(entry.target);
          currentObserver.unobserve(entry.target);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    revealTargets.forEach((element) => observer.observe(element));
    return;
  }

  revealTargets.forEach(showElement);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRevealOnScroll);
} else {
  initRevealOnScroll();
}

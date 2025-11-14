// Smooth in-page anchor scrolling
// Enhances all links that point to an element ID on the same page
document.querySelectorAll('a[href^="#"]').forEach(a => {
  // For each anchor, intercept the click and attempt smooth scroll
  a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1); // remove leading '#'
    if(!id) return; // if just '#', ignore
    const el = document.getElementById(id);
    if(el){
      e.preventDefault(); // prevent default jump behavior
      // Scroll the target element into view smoothly
      el.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});

const h1 = document.querySelector('.heading-primary');
const yearEl = document.querySelector('.year');
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////// () //////////////////////////
///////////////////// () //////////////////////////

// make mobile nav work
const btnNav = document.querySelector('.btn-mobile-nav');
const header = document.querySelector('header');

btnNav.addEventListener('click', function () {
  header.classList.toggle('nav-open');
});

///////////////////// () //////////////////////////
// SMooth scrolling

const allLinks = document.querySelectorAll('a:link');
console.log(allLinks);

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    //scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    // scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    //close mobil nav

    if (link.classList.contains('main-nav-link'))
      header.classList.toggle('nav-open');
  });
});

///////////////////// (Stciky Navigation) //////////////////////////
const sectionHeroEl = document.querySelector('.section-hero');
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);
    if (!ent.isIntersecting) document.body.classList.add('sticky');
    if (ent.isIntersecting) document.body.classList.remove('sticky');
  },
  {
    // In the view port
    root: null,
    threshold: 0,
    rootMargin: '-80px',
  }
);
obs.observe(sectionHeroEl);
///////////////////// (Fixing flex box gap property missing in some Safari verions) //////////////////////////
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported)document.body.classList.add('no-flex-gap');
}
checkFlexGap();

// http://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

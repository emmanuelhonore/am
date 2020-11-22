/*
 * Set the page theme
 */
const themes = ["blue",
                "green",
                "purple",
                "tangerine",
                "pink",
                "brick"];
var theme = themes[Math.floor(Math.random() * themes.length)];

document.getElementsByTagName("body")[0].classList.add("theme-"+theme);


/*
 * Dark mode button
 */

const btnDark = document.querySelector(".theme-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
btnDark.addEventListener("click", function() {
  // If the OS is set to dark mode...
  if (prefersDarkScheme.matches) {
    // ...then apply the .light-theme class to override those styles
    document.body.classList.toggle("light-theme");
    // Otherwise...
  } else {
    // ...apply the .dark-theme class to override the default light styles
    document.body.classList.toggle("dark-theme");
  }
});

/*
 * Change the cursor
 */

let clientX = -100;
let clientY = -100;
// let cursorHoverSize = 48;
let isStuck = false;
const cursor = document.querySelector(".cursor");
const cursorHover = document.querySelector(".cursor--hover");
// handle hoverstate
let hoverLeave = gsap.to(cursorHover,
  {duration: .2, x: clientX, y: clientY,width: 0, height: 0, delay: .2},
);


// init cursor
const initCursor = () => {
  // track position of the cursor
  document.addEventListener("mousemove", e => {
    if(e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
      return false;
    }
      clientX = e.clientX;
      clientY = e.clientY;
  });

  // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    // if you are already using TweenMax in your project, you might as well
    // use TweenMax.set() instead
    gsap.set(cursor, {
      x: clientX,
      y: clientY
    });
    if(isStuck == false && hoverLeave.isActive() == false) {
      gsap.set(cursorHover, {
        x: clientX,
        y: clientY
      });
    };

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();



const initHover = () => {
  // find the center of the link element and set stuckX and stuckY
  // these are needed to set the position of the noisy circle
  const handleMouseEnter = e => {
    if(e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
      return false;
    }
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    stuckWidth = Math.round( navItemBox.width );
    stuckHeight = Math.round( navItemBox.height );
    stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    isStuck = true;
    // var tl = gsap.timeline();
    // tl.to(cursorHover, {duration: 0, opacity: 1});
    // tl.to(cursorHover,
    //   {x:clientX, y:clientY, width: 0, height: 0},
    //   {duration: .2, x:stuckX, y:stuckY, width: cursorHoverSize, height: cursorHoverSize}
    // );
    //
    hoverLeave.kill();
    gsap.to(cursor,
      {duration: .2, scaleX: 2, scaleY: 2, opacity: .5},
    );
    gsap.to(cursorHover,
      {duration: .2, x: stuckX, y: stuckY,width: stuckWidth + 12, height: stuckHeight + 8},
    );
  };

  const handleMouseLeave = e => {
    if(e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents) {
      return false;
    }
    hoverLeave = gsap.to(cursorHover,
      {duration: .2, width: 0, height: 0, delay: .2, onComplete: () => { isStuck = false; }},
    );
      // gsap.to(cursorHover, { opacity: 1 }, { opacity: 0, duration: 2, delay: .3 });
    // var tl2 = gsap.timeline();
    // tl2.to(cursorHover,
    //   {width: cursorHoverSize, height: cursorHoverSize},
    //   {duration: .2, width: 0, height: 0}
    // );
    // tl2.to(cursorHover, {duration: .2, opacity: 0});

    gsap.to(cursor,
      {duration: .2, scaleX: 1, scaleY: 1, opacity: 1},
    );
  };

  // add event listeners to all items
  const linkItems = document.querySelectorAll("a");
  linkItems.forEach(item => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
};

initHover();



/*
 * Idle timer
 */

// const initIdle = () => {
  
// };
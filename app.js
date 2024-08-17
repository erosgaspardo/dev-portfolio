document.addEventListener("DOMContentLoaded", (event) => {
    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    // Preloader animation
    const preloadAnimation = () => {
        return gsap.to("#preloader", {
            duration: 0.5, // Shorten the duration to make it faster
            autoAlpha: 0, // Fade out the preloader
            onComplete: () => {
/*                 document.querySelector("#preloader").style.display = "none"; // Hide the preloader after animation */
            }
        });
    };

    const setInitialStates = () => {
        gsap.set(revealText, { yPercent: 100 });
        gsap.set(revealSocials, { yPercent: 100 });
        gsap.set(revealContact, { yPercent: 100 });
        gsap.set(revealCareer, { yPercent: 100 });
        gsap.set(revealCareerContent, { yPercent: 100 });
        gsap.set(revealCareerYears, { yPercent: 100 });
        gsap.set(revealProjects, { yPercent: 100 });
        gsap.set(revealProjectsContent, { yPercent: 100 });
        gsap.set(revealProjectYears, { yPercent: 100 });
        
    };

    const UIAnimation = () => {
        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                yPercent: 0,
                y: 0,
                stagger: 0.1,
                delay: 0.1 // Reduce delay to speed up the animation start
            }
        });
        tl.to(revealText, {}, '<')
          .to(revealSocials, {}, '<')
          .to(revealContact, {}, '<')
          .to(revealCareer, {}, '<')
          .to(revealCareerContent, {}, '<')
          .to(revealProjects, {}, '<')
          .to(revealProjectsContent, {}, '<')
          .to(revealCareerYears, {}, '<')
          .to(revealProjectYears, {}, '<')
        return tl;
    };

    // Main animation for non-mobile screens
    const desktopAnimation = () => {
        gsap.set("#profile-pic", {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50
        });

        const tl = gsap.timeline();
        tl.from("#profile-pic", { delay: 0.5, duration: 1, autoAlpha: 0 }) // Reduce delay and duration
          .to("#profile-pic", { delay: 0.2, duration: 0.5 }) // Speed up this step
          .to("#profile-pic", {
              duration: 1.2, // Reduce duration to speed up the movement
              top: "calc(0% + 1em)",  // Move to top
              left: "calc(100% - 1em)", // Move to the right
              xPercent: -100,  // Align with right edge
              yPercent: 0,     // Align with top edge
              ease: "power4.inOut"
          })
          .from("main", { duration: 1.5, opacity: 0 }); // Speed up the main content fade-in

        return tl;
    };

    // Main animation for mobile screens
    const mobileAnimation = () => {
        gsap.set("#profile-pic", {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -30,
            scale: .6
        });

        const tl = gsap.timeline();
        tl.from("#profile-pic", { delay: 0.3, duration: 1, autoAlpha: 0 }) 
          .from("main", { delay: 0.2, duration: 0.5, opacity: 0 }) 
          .to("#profile-pic", { duration: 0.4, autoAlpha: 0 });
        return tl;
    };

    const revealText = document.querySelectorAll('.copyright span');
    const revealSocials = document.querySelectorAll('.socials span');
    const revealContact = document.querySelectorAll('.contact span');
    const revealCareer = document.querySelectorAll('.career span');
    const revealCareerContent = document.querySelectorAll('#career-content span');
    const revealProjects = document.querySelectorAll('.projects span')
    const revealProjectsContent = document.querySelectorAll('#projects-content span')
    const revealProjectYears = document.querySelectorAll('.project-years span')
    const revealCareerYears = document.querySelectorAll('.career-years span')

    const master = gsap.timeline();

    // Add preloader, then run the main animation depending on the screen size
    master
/*         .add(preloadAnimation()) */
        .add(setInitialStates(), '-=1.2') // Slight overlap for faster transition
        .add(isMobile ? mobileAnimation() : desktopAnimation(), '-=1.2') // Overlap start to minimize delay
        .add(UIAnimation(), '-=1.2'); // Start UI animation slightly earlier for quicker flow
});

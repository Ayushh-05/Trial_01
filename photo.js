// Ensure ScrollTrigger plugin is imported and registered
gsap.registerPlugin(ScrollTrigger);
function revealToSpan(){                            
  document.querySelectorAll(".reveal")   //using this we will selct all the elemtns which have the class reveal 
      .forEach(function(elem){
          // creates two spans 
          var parent = document.createElement("span");
          var child = document.createElement("span");
          // parents and child both sets their respective classes 
      
          parent.classList.add("parent");     // creating the span for Parent content 
          child.classList.add("child");  // creating the span for child content 
      
          //span parents get child  and child get elem details 
      
          child.innerHTML = elem.innerHTML;  // by doing we add the content written under the class reveala in to the span child which was created above 
          parent.appendChild(child);
      
          // elem replaces its value with parents span
      
          elem.innerHTML ="";  // this thing will remove all the text content written under the rveal class inn the html 
      
          elem.appendChild(parent);  // here we added the architecture on the span we created above in here 
      });             
}


function loaderAnimation(){
  var t1= gsap.timeline();  // creating  time line to use the gsap animatio functions
  
  t1  
      .from("#loader .child span", {  // animation to move text under the child span to x direction
          x:100,
          delay:.3,
          stagger:.05,  // delaying the animation of txt moving 
          duration:1.5,
          ease: Power4.easeInOut
  
      })
      .to("#loader .parent .child", {  //animating the disappear effect of the text on loading
          y: "-100%",
          duration: 1,
          ease: Circ.easeInOut  //animation starts slowly, accelerates through the middle of the animation, and then slows down again towards the end
      })
      .to("#loader", {  // ending of the black bg and green to come up 
          height:0,
          duration: .7,
          ease: Circ.easeInOut  
      })
      .to("#green", {  // green come up
          height:"100%",
          top:0,
          duration: .8,
          delay:-1,
          ease: Circ.easeInOut  
      })
      .to("#green", {  // green down and white as main bg 
          height:"0%",
          duration: .4,
          delay:-.4,
          ease: Circ.easeInOut,  
          onComplete:function(){  // after completing all loader animation start with the homepage animation
              photoHome();
              
          }
      })
      
}


function photoHome(){
  // Wait for the window to load before executing the script
 const slides = gsap.utils.toArray('.slide');
 const activeSlideImages = gsap.utils.toArray(".active-slide img");
    
  function getInitialTranslateZ(slide) {
    const style = window.getComputedStyle(slide);
    const matrix = style.transform.match(/matrix3d\((.+)\)/);
    if (matrix) {
      const values = matrix[1].split(", ");
      return parseFloat(values[14] || 0);
    }
    return 0;
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  slides.forEach((slide, index) => {
    const initialZ = getInitialTranslateZ(slide);
   
    // Use ScrollTrigger.create() to create a ScrollTrigger
    ScrollTrigger.create({
      trigger: ".container",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const zIncrement = progress * 22500;
        const currentZ = initialZ + zIncrement;
       
        let opacity;
       
        if (currentZ > -2500) {
          opacity = mapRange(currentZ, -2500, 0, 0.5, 1);
        } else {
          opacity = mapRange(currentZ, -5000, -2500, 0 , 0.5);
        }
       
        // Clamp opacity to the range [0, 1]
        opacity = Math.min(Math.max(opacity, 0), 1);
       
        slide.style.opacity = opacity;
        slide.style.transform = `translateX(-50%) translateY(-50%) translateZ(${currentZ}px)`;
       
        // Use the index directly if you're not using currentIndex for anything else
        if (currentZ < 100) {
          gsap.to(activeSlideImages[index], { duration: 1.5, opacity: 1, ease: "power3.out" });
        } else {
          gsap.to(activeSlideImages[index], { duration: 1.5, opacity: 0, ease: "power3.out" });
        }
      }
    });
  });

}

revealToSpan();
loaderAnimation();
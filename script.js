
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


function valueSetters(){
    gsap.set("#nav a",{y:"-100%", opacity:0});
    gsap.set("#home .parent .child",{y:"100%",})
    gsap.set("#home .row img",{opacity:0})

    // svg animation ( finding of the points in svg)
    document.querySelectorAll("#Visual>g").forEach(function (e) {

        var character = e.childNodes[0].childNodes[0];   //by doing thiss we are selcthing aall the g yags and in that we are laterselecting the path or polyline nd we stoe the value in a variable character

        character.style.strokeDasharray = character.getTotalLength() +"px";  // we are making the stroke dash array of the character to exact the same of total length
        character.style.strokeDashoffset = character.getTotalLength() +"px";
        
    })

}


function loaderAnimation(){
var t1= gsap.timeline();  // creating  time line to use the gsap animatio functions

t1  
    .from("#loader .child span", {  // animation to move text under the child span to x direction
        x:100,
        delay:.3,
        stagger:.05,  // delaying the animation of txt moving 
        duration:.95,
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
            animateHomepage();
        }
    })
    



}

function animateHomepage(){
    

    var tl= gsap.timeline();
    tl.to("#nav a",{
        y:0,
        opacity:1,
        stagger:.04,
        ease: Expo.easeInOut
    })
    tl.to("#home .parent .child ",{
        y:0,
        stagger:.1,
        duration:1.2,
        ease: Expo.easeInOut
    })
    tl.to("#home .row img",{
        opacity:1,
        delay:-.05,
        ease: Expo.easeInOut,
        onComplete:function(){
            animateSvg();
        }
    
    })
   


}

function animateSvg(){
    

    //animating the visual part 
    gsap.to("#Visual>g>g>path, #Visual>g>g>polyline",{
        strokeDashoffset:0,
        duration:1,
        ease: Expo.easeInOut,


    })


}

function scrollCard(){
    window.addEventListener('scroll', () => {
        let scrollPosition = window.scrollY;
        let imgContainers = document.querySelectorAll('.imgcntnr');
      
        imgContainers.forEach((container, index) => {
            // Define the base transformation values for each element
            let baseTransform;
            if (index === 0) {
                baseTransform = 'translate(-40%, -15%) rotate(-18deg)';
            } else if (index === 1) {
                baseTransform = 'translate(-10%, -4%) rotate(-15deg)';
            } else if (index === 2) {
                baseTransform = 'translate(20%, 10%) rotate(-5deg)';
            }
        
            // Calculate a small transformation based on the scroll position
            let transformAmount = scrollPosition * 0.0035; // Vertical movement
            let rotateAmount = scrollPosition * 0.015; // Rotation amount

            // Set maximum threshold values for transformation and rotation
            const maxTransformAmount =10; // Define your maximum vertical movement threshold
            const maxRotateAmount =12; // Define your maximum rotation threshold

            // Apply the transformation with vertical movement and rotation within the maximum thresholds
            transformAmount = Math.min(transformAmount, maxTransformAmount);
            rotateAmount = Math.min(rotateAmount, maxRotateAmount);
        
            // Apply the transformation
            container.style.transform = `${baseTransform} translate3d(0, ${transformAmount}vw, 0) rotate(${rotateAmount}deg)`;
        });
    });
}

function locoinitialize(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}


function cardHoverEffect(){
    document.querySelectorAll(".cnt") //by doing this we get array for each container
    .forEach(function(cnt){
        var showingImage; // creating div to make the cursor off whnen not on images
        cnt.addEventListener("mousemove", function(dets){
            //by doing this we are asking to tell us at which container is the mouse present rn as we have given images a data-index which tells us when did we hovered on the images
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity=1;
            showingImage = dets.target;    // making the value of showing image same as when mouse is moved in dex.target
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform=`translate(${dets.clientX}px,${dets.clientY}px)`;
            showingImage.style.filter ="grayscale(1)";
            
            document.querySelector("#work").style.backgroundColor = "#" +dets.target.dataset.color; 
        
        })

        cnt.addEventListener("mouseleave", function(dets){//by doing this we are sking to tell us at which container is the mouse present rn as we have given images a data-index which tells us when did we hovered on the images
            document.querySelector("#cursor").children[showingImage.dataset.index].style.opacity= 0;
            showingImage.style.filter ="grayscale(0)";
            
            document.querySelector("#work").style.backgroundColor = "#f2f2f2"; 
            
        })

    }) 

    document.querySelector("#work").addEventListener("mousemove", (dets) => {
        const cursor = document.querySelector("#cursor");
        cursor.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`;
      });
}
cardHoverEffect();
locoinitialize();
revealToSpan(); 
valueSetters();
loaderAnimation();
scrollCard();


import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);function App() {
  const sectionRef = useRef(null);
  const carRef = useRef(null);
  const trailRef = useRef(null);  useLayoutEffect(() => {
    const section = sectionRef.current;
    const car = carRef.current;
    const trail = trailRef.current;    const letters = gsap.utils.toArray(".value-letter");
    const boxes = gsap.utils.toArray(".text-box");    
    gsap.set(car, { x: 0,});   
     gsap.set(letters, {opacity: 0,}); 
    gsap.set(boxes, { opacity: 0,});    
    gsap.set(trail, {width: "100%",});    
    const carWidth = 150;
    const endX = window.innerWidth - carWidth;    
    const carAnimation = gsap.to(car, {x: endX,scrollTrigger: 
      {
        trigger: section,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: ".track",
      },      
      ease: "none",onUpdate: function () {
        const progress = this.progress();        
        const totalLetters = letters.length;        
        const letterProgress = Math.min(totalLetters,Math.floor(progress * (totalLetters + 2)));        
        letters.forEach((letter, index) => {
          if (index < letterProgress) {
            letter.style.opacity = "1";
          } else {
            letter.style.opacity = "0";
          }
        });        
        gsap.set(trail, {width: "100%",});
      },
    });    
    gsap.to("#box1", {
      opacity: 1,
      scrollTrigger: 
      {
        trigger: section,
        start: "top+=650 top",
        end: "top+=850 top",
        scrub: true,
      },
    });    
    gsap.to("#box2", {
      opacity: 1,
      scrollTrigger: 
      {
        trigger: section,
        start: "top+=850 top",
        end: "top+=1050 top",
        scrub: true,
      },
    });    
    gsap.to("#box3", {
      opacity: 1,
      scrollTrigger: 
      {
        trigger: section,
        start: "top+=1050 top",
        end: "top+=1250 top",
        scrub: true,
      },
    });    
    gsap.to("#box4", {
      opacity: 1,
      scrollTrigger: 
      {
        trigger: section,
        start: "top+=1250 top",
        end: "top+=1450 top",
        scrub: true,
      },
    });    
    return () => {
      carAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };}, []);  
  return (
    <main ref={sectionRef} className="section">
      <div className="track">
        <div className="road">         
           <div ref={trailRef} className="trail"></div>          
           <div className="value-add">
            {"WELCOME ITZFIZZ".split("").map((letter, index) => (
              <span className="value-letter" key={index}>
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>          
          <img
            ref={carRef}
            src="/car.png"
            alt="Car"
            className="car"
          />          
          <div id="box1" className="text-box box1">
            <span className="num-box">58%</span>
            Increase in pick up point use
          </div>          
          
          <div id="box2" className="text-box box2">
            <span className="num-box">23%</span>
            Decreased in customer phone calls
          </div>          
          <div id="box3" className="text-box box3">
            <span className="num-box">27%</span>
            Increase in pick up point use
          </div>          
          <div id="box4" className="text-box box4">
            <span className="num-box">40%</span>
            Decreased in customer phone calls
          </div>       
           </div>
      </div>
    </main>
  );
}export default App;
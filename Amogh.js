const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    var tl = gsap.timeline();

    tl.from("#nav",{
        y:-10,
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut
    })
    .to(".boundingelem",{
        y:0,
        ease:Expo.easeInOut,
        duration:1.2,
        delay:-1,
        stagger:.2
    })
    .from("#page1-footer",{
        y:-10,
        opacity:0,
        delay:-1,
        duration:1.5,
        ease:Expo.easeInOut
    })
}

var timeout;
function circleChaptaKaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;
    document.addEventListener("mousemove",function(dets){
        clearTimeout(timeout);

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        // dets.utils.clamp(minimum,maximum,diff);
        
        xscale = gsap.utils.clamp(0.8,1.2,xdiff);
        yscale = gsap.utils.clamp(0.8,1.2,ydiff);
        
        xprev = dets.clientX;
        yprev = dets.clientY;
        circleMouseFollower(xscale , yscale);

        // console.log(xdiff, ydiff);
        timeout = setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(1,1)`;
        },100)

    });
}
circleChaptaKaro();

function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#minicircle").style.transform =`translate(${dets.clientX}px , ${dets.clientY}px) `;
    })
}
circleMouseFollower();
firstPageAnim();

function move(){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#maxcircle").style.transform = `translate(${dets.clientX}px , ${dets.clientY}px)`
    })
}
move();

document.querySelectorAll(".page2-inner").forEach(function(elem){

    var previous = 0;
    var diffrot = 0;

    elem.addEventListener("mouseleave", function(dets){
        gsap.to(elem.querySelector("img") , {
            opacity:0,
            ease:Power4,
            duration:0.5,
        });
    });



    elem.addEventListener("mousemove", function(dets){

        var diff = dets.clientY - elem.getBoundingClientRect().top;

        diffrot = dets.clientX - previous;
        previous = dets.clientX;


        gsap.to(elem.querySelector("img") , {
            opacity:1,
            ease:Power4,
            top:diffrot,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffrot*0.5),


        })
    });
});
import LocomotiveScroll from 'locomotive-scroll';

const lscroll = new LocomotiveScroll({
    el: document.querySelector('#js-scroll'),
    smooth: true,
    // reloadOnContextChange: true,
    lerp: 0.06,
    // smoothMobile: true
});

export {lscroll};
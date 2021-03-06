import React, { useCallback } from 'react'
import { Waypoint } from 'react-waypoint';

import Divider from '../elements/Divider';
import Button from '../elements/Button';
import { animated, useSpring } from 'react-spring';

const Hero = () => {
  // config: { mass: 10, tension: 150, friction: 240 }
  const [props, set] = useSpring(() => ({ y: 0, xy: [0, 0] }))
  // const threshold = window.matchMedia("(min-width: 960px)");

  const onScroll = useCallback(
    (offset) => {
      set({ y: offset })
      return offset;
    }, [props]
  );

  const animation = useSpring({
    opacity: 1,
    from: { opacity: 0 }
  });

  const parallaxUp = (y) => `translate3d(0, -${y / 8}px, 0)`
  const parallaxDown = (y) => `translate3d(0, -${y / 5}px, 0)`

  function updateScrollPosition() {
    onScroll(window.pageYOffset);
  }

  const observeScroll = () => {
    if (window.outerWidth > 768) {
      window.addEventListener('scroll', updateScrollPosition);
    } else {
      unobserveScroll();
    }
  }

  const unobserveScroll = () => {
    window.removeEventListener('scroll', updateScrollPosition);
  }

  const removeScrollListener = ({ matches }) => {
    matches ? observeScroll() : unobserveScroll() ;
  }

  // threshold.addListener(removeScrollListener);

  return (
    <Waypoint onEnter={observeScroll} onLeave={unobserveScroll}>
      <animated.section className="hero" style={animation}>
        <animated.section style={{ transform: props.y.interpolate(parallaxDown) }} className="hero__text">
          <h1 className="hero__h1">Personalized Training for every body</h1>
          <Divider />
          <p className="hero__copy copy--large">
            Lorem ipsum dolor amet jianbing YOLO organic cray XOXO farm-to-table helvetica vegan gentrify kale chips narwhal.
          </p>
          <Button>Start Today</Button>
        </animated.section>
        <section
          className="hero__image-wrapper"
          // onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}
        >
          <animated.img
            // style={{ transform: props.xy.interpolate(trans1) }}
            style={{ transform: props.y.interpolate(parallaxUp) }}
            className="hero__image"
            src="static/images/jonathan-borba-1339221-unsplash.jpg"
            alt="XWY Gym"
          />
        </section>
      </animated.section>
    </Waypoint>
  )
}

export default Hero

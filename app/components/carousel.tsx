import { Carousel } from '@mantine/carousel';
import '@mantine/carousel/styles.css';
import classes from "../styles/carousel.module.css";
import { Image } from '@mantine/core';
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';


const images = [
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
    'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
  ];



export const MainCarousel = () => {
    const autoplay = useRef(Autoplay({ delay: 2000 }));

  return (
    <div
    className='flex items-center min-w-full justify-center overflow-hidden px-20 my-6'
    >
    <Carousel
      withIndicators
      height={200}
      slideSize={{ base: '100%', sm: '50%', md: '25%' }}
      slideGap="md"
      loop
      align="start"
      slidesToScroll={2}
      classNames={classes}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {
    images.map((url) => (
        <Carousel.Slide key={url}>
          <Image src={url} alt='sa'/>
        </Carousel.Slide>
      ))
      }
    </Carousel>
    </div>
  );
}
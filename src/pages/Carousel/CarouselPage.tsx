import Carousel from "../../components/Carousel/Carousel";

function CarouselPage() {
  const images = [
    {
      src: "https://img.freepik.com/premium-photo/hyperrealistic-landscape-wallpaper-1080p-1920x1080_899449-83924.jpg",
      alt: "1",
    },
    {
      src: "https://i.etsystatic.com/43678560/r/il/25ba49/5143876711/il_570xN.5143876711_sidr.jpg",
      alt: "2",
    },
    {
      alt: "3",
      src: "https://i.pinimg.com/736x/af/8e/d3/af8ed3265ed9b78d34f2340b5bb42b71.jpg",
    },
  ];
  return (
    <Carousel
      images={images}
      width={600}
      infinite
      // autoplay={{ duration: 2000 }}
    />
  );
}

export default CarouselPage;

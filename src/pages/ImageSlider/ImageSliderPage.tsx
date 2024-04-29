import ImageSlider from "../../components/ImageSlider/ImageSlider";
import i1 from "../../assets/i1.jpg";
import i2 from "../../assets/i2.jpg";

function ImageSliderPage() {
  return <ImageSlider image1={i1} image2={i2} initialPercentage={50} />;
}

export default ImageSliderPage;

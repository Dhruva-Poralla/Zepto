import Carousel from "../components/Carousel";
import Features from "../components/Featuers";
import MidBanner from "../components/MidBanner";


export default function Home() {
  return (
   <div className="overflow-x-hidden">
   <Carousel/>
   <MidBanner/>
   <Features/>
   </div>
  )
}

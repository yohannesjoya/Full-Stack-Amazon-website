import React from "react";
import "./HomeStyle.css";
import BannerImg from "../../Assets/BannerImg.jpg";
import Product from "../Product/Product";

// images
import Laptops from "../../Assets/Electronics.jpg";
import easyReturns from "../../Assets/EasyRETURNS.jpg";
import Pets from "../../Assets/Pets.jpg";
import Fitness from "../../Assets/Fitness.jpg";
import healthCare from "../../Assets/healthcare.jpg";
import homeImprevo from "../../Assets/HomeImprove.jpg";
import KindleEreaders from "../../Assets/KindleEreaders.jpg";
import Chairs from "../../Assets/Chairs.jpg";
import StripLight from "../../Assets/StripLight.jpg";
import Toys from "../../Assets/Toys.jpg";
import watches from "../../Assets/watches.jpg";

export default function Home() {
  return (
    <div className="Home ">
      <div className="Home_container"></div>

      <img className="Home_banner" src={BannerImg} alt="banner here" />
      <div className="Home_row">
        <Product
          id="1"
          title="Laptops"
          price={1700}
          rating={5}
          product_image={Laptops}
        />
        <Product
          id="2"
          title="Shop Pets"
          price={2450}
          rating={4}
          product_image={Pets}
        />
        <Product
          id="3"
          title="Easy Returns"
          price={899}
          rating={5}
          product_image={easyReturns}
        />
        <Product
          id="4"
          title="Health Care"
          price={1450}
          rating={5}
          product_image={healthCare}
        />
      </div>
      <div className="Home_row">
        <Product
          id="9"
          title="Strip Lights"
          price={120}
          rating={4}
          product_image={StripLight}
        />
        <Product
          id="10"
          title="Watches"
          price={295}
          rating={5}
          product_image={watches}
        />
        <Product
          id="11"
          title="Toys"
          price={37}
          rating={4}
          product_image={Toys}
        />
      </div>
      <div className="Home_row">
        <Product
          id="5"
          title="Fitness"
          price={499.754}
          rating={5}
          product_image={Fitness}
        />
        <Product
          id="6"
          title="Chairs"
          price={320}
          rating={4}
          product_image={Chairs}
        />
        <Product
          id="7"
          title="Home Tools"
          price={4730}
          rating={5}
          product_image={homeImprevo}
        />
        <Product
          id="8"
          title="Kindle E Reader"
          price={270}
          rating={3}
          product_image={KindleEreaders}
        />
      </div>
    </div>
  );
}

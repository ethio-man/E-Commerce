import { useState, useEffect } from "react";
import NavBar from "../components/NavBar.jsx";
import SideBar from "../components/SideBar.jsx";
import Collection from "../components/Collection.jsx";
import Footer from "../components/Footer.jsx";
import Request from "../api/Request.js";
export default function Landing() {
  const [collections, setCollections] = useState([]);
  useEffect(() => {
    async function getCollections() {
      try {
        const res = await Request.getAll("collections");
        if (res) setCollections(res.data);
      } catch (err) {
        console.log("Error:", err);
      }
    }
    getCollections();
  }, []);
  /*
  const phones = [
    {
      url: "https://tse4.mm.bing.net/th/id/OIP.f2GaTDW-Uaj41-jlPsUr6wHaJG?rs=1&pid=ImgDetMain&o=7&rm=3",
      label: "iPhone 17",
      price: 190,
      path: "/productList/iphone",
    },
    {
      url: "https://www.pricerunner.com/product/3037407366/Samsung-Galaxy-S24-Ultra-1TB.jpg",
      label: "Galaxy S24",
      price: 120,
      path: "/productList/galaxy",
    },
    {
      url: "https://phone.mesramobile.com/wp-content/uploads/2023/08/realme-c53-price-malaysia-2.jpg",
      label: "Realme 13",
      price: 70,
      path: "/productList/realme",
    },
    {
      url: "https://minapi.beemarket.uz/prod-media/productImages/thumbnails/medium/1718786609fB6QeCMf3zNW.webp",
      label: "Tecno Pova 6",
      price: 95,
      path: "/productList/tecno",
    },
    {
      url: "https://cdn.beebom.com/mobile/vivo-t4x-5g-front-and-back-7.png",
      label: "Vivo T4x",
      price: 95,
      path: "/productList/vivo",
    },
    {
      url: "https://buy.gazelle.com/cdn/shop/files/iPhone_14_-_Midnight_-_Float_f2806cca-e17d-4905-b25e-66583531a536_1024x.jpg?v=1721333187",
      label: "iphone 14",
      price: 150,
      path: "/productList/iphone",
    },
    {
      url: "https://static.androidplanet.nl/orca/products/24646/samsung-galaxy-s25-ultra.png",
      label: "Galaxy Ultra s25",
      price: 150,
      path: "/productList/galaxy",
    },
  ];
  const wearings = [
    {
      url: "https://img.freepik.com/premium-photo/fashion-mockup-black-tshirt-blank_856660-30189.jpg",
      label: "T-shirt",
      price: 190,
      path: "/productList/shirt",
    },
    {
      url: "https://oldnavy.gap.com/webcontent/0053/879/233/cn53879233.jpg",
      label: "Jeans",
      price: 120,
      path: "/productList/jeans",
    },
    {
      url: "https://coofandy.com/cdn/shop/files/SYV007159_ARG-2_1400x.jpg?v=1717054804",
      label: "Cargos",
      price: 70,
      path: "/productList/cargos",
    },
    {
      url: "https://tse2.mm.bing.net/th/id/OIP.mhH_gaoPxHGXx8jTMmauZQHaKz?rs=1&pid=ImgDetMain&o=7&rm=3",
      label: "Skirts",
      price: 125,
      path: "/productList/skirts",
    },
    {
      url: "https://c5dab7a8392252effc30-a6e6d5f918f2df7d1cd6e0ae112dd3c0.ssl.cf2.rackcdn.com/product-original-3282250-118944-1648517075-ab0df778ad62387f9a6be0b362da2ed0.648517076_type_original_nid_3282250_uid_118944_0",
      label: "Dresses",
      price: 295,
      path: "/productList/dresses",
    },
    {
      url: "https://tse4.mm.bing.net/th/id/OIP.Lxq75TnzHtLyGc3H07dCKwHaIt?w=1020&h=1200&rs=1&pid=ImgDetMain&o=7&rm=3",
      label: "Jackets",
      price: 130,
      path: "/productList/jackets",
    },
    {
      url: "https://th.bing.com/th/id/OIP.ZrfI8Yh0h31pA0F-bpgVAQHaJQ?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
      label: "Sweaters",
      price: 50,
      path: "/productList/sweaters",
    },
  ];
  const Accessories = [
    {
      url: "https://img.myipadbox.com/sec/product_l/TBD0603101601B.jpg",
      label: "Backpacks",
      price: 30,
      path: "/productList/backpacks",
    },
    {
      url: "https://m.media-amazon.com/images/I/81avdEiugdL._AC_UL960_QL65_.jpg",
      label: "Wallets",
      price: 20,
      path: "/productList/wallets",
    },
    {
      url: "https://i5.walmartimages.com/asr/a5135d19-826f-499b-8cf7-d70f3e9b3228_1.dd9a82b10d178223eef4e38e811b5e72.jpeg",
      label: "Belts",
      price: 70,
      path: "/productList/belts",
    },
    {
      url: "https://n1.sdlcdn.com/imgs/j/m/2/BULL-I-Black-Aviator-Sunglasses-SDL251621845-4-afca8.jpg",
      label: "Sunglasses",
      price: 15,
      path: "/productList/sunglasses",
    },
    {
      url: "https://static.wixstatic.com/media/4669b1_0443bfcc77154413a60afd3746734bac~mv2_d_1500_1500_s_2.jpg/v1/fill/w_980,h_980,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/4669b1_0443bfcc77154413a60afd3746734bac~mv2_d_1500_1500_s_2.jpg",
      label: "Luggages",
      price: 95,
      path: "/productList/luggages",
    },
    {
      url: "https://i5.walmartimages.com/seo/Silver-Watches-for-Men-OLEVS-Watch-Men-Luxury-Watches-for-Men-Stainless-Steel-Men-Watch-Dress-Waterproof-Watch-for-Men_4a1f0c8c-c263-40c6-842b-ab7fb640212a.7f3e8e69767bf77a1fba8e38d024db87.jpeg",
      label: "Watches",
      price: 100,
      path: "/productList/watches",
    },
    {
      url: "https://i5.walmartimages.com/asr/5ed4bf7e-202a-4a34-bfb6-9ad2313a3986.673e71f33b8a4cf577095d9529243df6.jpeg?odnHeight=372&odnWidth=372&odnBg=FFFFFF",
      label: "Totes",
      price: 50,
      path: "/productList/totes",
    },
  ];
  */
  /* const collections = [
    {
      item: "Smart Phones",
      list: phones,
    },
    {
      item: "Fashion",
      list: wearings,
    },
    {
      item: "Accessories",
      list: Accessories,
    },
  ]; */
  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar />
        <div className="flex flex-col ">
          {collections.map((c, k) => (
            <Collection key={k} collection={c} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

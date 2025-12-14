import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Request from "../api/Request.js";
import { useEffect, useState } from "react";

/*
const products = [
  // ================= PHONES =================

  // iPhone
  {
    name: "iPhone 15 Pro",
    src: "https://tse1.mm.bing.net/th/id/OIP.VCsEv3jNRlAGQt1qXF80BwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/productOverview",
    color: "white",
    price: "1200",
    category: "iphone",
  },
  
  {
    name: "iPhone 14",
    src: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-blue-select-202209",
    href: "/products/iphone-14",
    color: "blue",
    price: "950",
    category: "iphone",
  },
  {
    name: "iPhone SE",
    src: "https://tse1.mm.bing.net/th/id/OIP.HhRa8d8_2Bvd1a1l_WuWxAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/iphone-se",
    color: "black",
    price: "450",
    category: "iphone",
  },

  // Samsung Galaxy
  {
    name: "Galaxy S24 Ultra",
    src: "https://tse3.mm.bing.net/th/id/OIP.yqteR_nCeydZvNu59n-inAHaJD?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/galaxy-s24-ultra",
    color: "black",
    price: "1100",
    category: "galaxy",
  },
  {
    name: "Galaxy S23",
    src: "https://tse2.mm.bing.net/th/id/OIP.GoFkNVKYoHA8BgZvpB-wwAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/galaxy-s23",
    color: "black",
    price: "900",

    category: "galaxy",
  },
  {
    name: "Galaxy A54",
    src: "https://tse2.mm.bing.net/th/id/OIP.6MPyKpcamTNyo6xg-62T3wHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/galaxy-a54",
    color: "black",
    price: "500",

    category: "galaxy",
  },

  // Realme
  {
    name: "Realme GT 5 Pro",
    src: "https://fdn.gsmarena.com/imgroot/news/23/12/realme-gt5-pro-official/-1200/gsmarena_006.jpg",
    href: "/products/realme-gt-5-pro",
    color: "orange",
    price: "650",
    category: "realme",
  },
  {
    name: "Realme 11 Pro+",
    src: "https://tse2.mm.bing.net/th/id/OIP.f4rbXD9mlBlyAHeWWSr_swHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/realme-11-pro-plus",
    color: "green",
    price: "480",
    category: "realme",
  },
  {
    name: "Realme C55",
    src: "https://www.techieyard.com/wp-content/uploads/2023/04/Realme-C55.jpg",
    href: "/products/realme-c55",
    color: "yellow",
    price: "220",
    category: "realme",
  },

  // Tecno
  {
    name: "Tecno Camon 20 Pro",
    src: "https://tse4.mm.bing.net/th/id/OIP.3mnh_ODGovf1hbmRZ43-jwHaId?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/tecno-camon-20-pro",
    color: "black",
    price: "350",
    category: "tecno",
  },
  {
    name: "Tecno Spark 10",
    src: "https://droidafrica.net/wp-content/uploads/2023/02/Tecno-Spark-10-full-specifications-and-price-7622912.jpg",
    href: "/products/tecno-spark-10",
    color: "blue",
    price: "200",
    category: "tecno",
  },
  {
    name: "Tecno Phantom V Fold",
    src: "https://static1.xdaimages.com/wordpress/wp-content/uploads/2023/02/tecno-phantom-v-fold-xda-41209870.jpg",
    href: "/products/tecno-phantom-v-fold",
    color: "black",
    price: "1200",
    category: "tecno",
  },

  // Vivo (Vevo)
  {
    name: "Vivo X100 Pro",
    src: "https://tse4.mm.bing.net/th/id/OIP.wduMDSyDjkVb2QmMRAl7RAHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/vivo-x100-pro",
    color: "black",
    price: "950",
    category: "vivo",
  },
  {
    name: "Vivo V29",
    src: "https://th.bing.com/th/id/OIP.nmdPZzi1KjfGHgXbdfc2agHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/vivo-v29",
    color: "pink",
    price: "550",
    category: "vivo",
  },
  {
    name: "Vivo Y20",
    src: "https://tse3.mm.bing.net/th/id/OIP.jzefvm9kqtK1HvPGJvzM4AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/vivo-y20",
    color: "blue",
    price: "250",
    category: "vivo",
  },

  // ================= CLOTHING =================

  // T-shirt
  {
    name: "Classic White T-Shirt",
    src: "https://tse4.mm.bing.net/th/id/OIP.Gqi4ZlVyUm77I01_BoEIAwHaE7?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/tshirt-white",
    color: "white",
    price: "20",
    category: "shirt",
  },
  {
    name: "Black Graphic T-Shirt",
    src: "https://tse4.mm.bing.net/th/id/OIP.Y1UwvqLedhVZ4lWm9QIWXgHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/tshirt-black",
    color: "black",
    price: "25",
    category: "shirt",
  },
  {
    name: "Oversized Beige T-Shirt",
    src: "https://static.zara.net/photos///2023/I/0/2/p/0962/310/710/2/w/750/0962310710_6_1_1.jpg",
    href: "/products/tshirt-beige",
    color: "beige",
    price: "30",
    category: "shirt",
  },

  // Jeans
  {
    name: "Blue Slim Fit Jeans",
    src: "https://tse2.mm.bing.net/th/id/OIP.crX-9ugUzKCo4EBmnMq1RgHaLo?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/jeans-blue",
    color: "blue",
    price: "45",
    category: "jeans",
  },
  {
    name: "Black Skinny Jeans",
    src: "https://tse4.mm.bing.net/th/id/OIP.AfkXYtcWoM_VGdwSEzZOrwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/jeans-black",
    color: "black",
    price: "40",
    category: "jeans",
  },
  {
    name: "Grey Straight Jeans",
    src: "https://tse2.mm.bing.net/th/id/OIP.11puhqFNLUm72hBY2GjvngHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/jeans-grey",
    color: "grey",
    price: "42",
    category: "jeans",
  },

  // Sweater
  {
    name: "Knit Wool Sweater",
    src: "https://tse1.mm.bing.net/th/id/OIP.C1LPb9YqvE6HYc8rFgs6TwHaJ4?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/sweater-knit",
    color: "cream",
    price: "50",
    category: "sweaters",
  },
  {
    name: "Grey Crewneck Sweater",
    src: "https://tse4.mm.bing.net/th/id/OIP.92aGqLKNVN6fVK9er2Pr0gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/sweater-grey",
    color: "grey",
    price: "45",
    category: "sweaters",
  },
  {
    name: "Black Oversized Sweater",
    src: "https://tse2.mm.bing.net/th/id/OIP.x2_taT8gkfU1kcu4MtMRewHaLG?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/sweater-black",
    color: "black",
    price: "48",
    category: "sweaters",
  },
  // Jacket (3)
  {
    name: "Leather Jacket",
    src: "https://th.bing.com/th/id/R.b6b807be147220c714f25ba9b81825d1?rik=RR%2bjzJ8%2bVnQBtg&pid=ImgRaw&r=0",
    href: "/products/jacket-leather",
    color: "black",
    price: "120",
    category: "jackets",
  },
  {
    name: "Bomber Jacket",
    src: "https://tse1.explicit.bing.net/th/id/OIP.oPToeNeNaggyT7lx5FrHOQHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/jacket-bomber",
    color: "green",
    price: "90",
    category: "jackets",
  },
  {
    name: "Parka Jacket",
    src: "https://tse3.mm.bing.net/th/id/OIP.Vi9shhFvfqOU4DDFGvai4AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/jacket-parka",
    color: "olive",
    price: "110",
    category: "jackets",
  },

  // Skirt (3)
  {
    name: "Denim Skirt",
    src: "https://tse1.explicit.bing.net/th/id/OIP.hqDl43oN5l2ZKNtLqKambQHaLW?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/skirt-denim",
    color: "blue",
    price: "35",
    category: "skirts",
  },
  {
    name: "Pencil Skirt",
    src: "https://tse4.mm.bing.net/th/id/OIP.A3rXcDNE87ukDfxO9rmf8AHaJo?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/skirt-pencil",
    color: "black",
    price: "40",
    category: "skirts",
  },
  {
    name: "Pleated Skirt",
    src: "https://th.bing.com/th/id/R.66259570d9693a12114c67052c2e057b?rik=vxBzlZzkHZvPCA&pid=ImgRaw&r=0",
    href: "/products/skirt-pleated",
    color: "navy",
    price: "38",
    category: "skirts",
  },

  // Dresses (3)
  {
    name: "Summer Dress",
    src: "https://th.bing.com/th/id/R.1388835dfeaa20e903836c4bb9d0082c?rik=xI%2b%2fEK4gXIsbpw&riu=http%3a%2f%2fstylesweekly.com%2fwp-content%2fuploads%2f2016%2f06%2f10-best-floral-dresses-for-beautiful-summer-1.jpg&ehk=qMzBmAtoJ1W2iASRfG2FpmE0TKA5jhgtpNC6%2fGaIluw%3d&risl=&pid=ImgRaw&r=0",
    href: "/products/dress-summer",
    color: "floral",
    price: "55",
    category: "dresses",
  },
  {
    name: "Evening Dress",
    src: "https://tse3.mm.bing.net/th/id/OIP.nmtPHSVKIGS6tEJT0yk3JAHaJT?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/dress-evening",
    color: "black",
    price: "120",
    category: "dresses",
  },
  {
    name: "Casual Maxi Dress",
    src: "https://i.pinimg.com/originals/1c/65/74/1c6574fcb47a7e89c159cb41ac8d00b8.jpg",
    href: "/products/dress-maxi",
    color: "beige",
    price: "60",
    category: "dresses",
  },

  // Cargo (3)
  {
    name: "Cargo Pants",
    src: "https://tse2.mm.bing.net/th/id/OIP.SCqytEIrkUo7DU0pTV-0RAHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/cargo-pants",
    color: "khaki",
    price: "45",
    category: "cargos",
  },
  {
    name: "Cargo Shorts",
    src: "https://tse4.mm.bing.net/th/id/OIP.sQvXdksiLt_Y_oQ7AkXl1QHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/cargo-shorts",
    color: "olive",
    price: "30",
    category: "cargos",
  },
  {
    name: "Cargo Jacket",
    src: "https://tse2.mm.bing.net/th/id/OIP.i08H9jZDjdF-dAVwTAWJ5gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/cargo-jacket",
    color: "green",
    price: "80",
    category: "cargos",
  },
  // ================= ACCESSORIES =================

  // Backpack
  {
    name: "Travel Backpack",
    src: "https://tse1.mm.bing.net/th/id/OIP.wzd9vyEbYAhi9Z9Al7nDXQHaIn?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/backpack-travel",
    color: "black",
    price: "60",
    category: "backpacks",
  },
  {
    name: "Laptop Backpack",
    src: "https://www.gh-bags.com/wp-content/uploads/2019/01/Travelling-Waterproof-custom-anti-theft-laptop-backpack-2.jpg",
    href: "/products/backpack-laptop",
    color: "grey",
    price: "55",
    category: "backpacks",
  },
  {
    name: "Canvas Backpack",
    src: "https://tse2.mm.bing.net/th/id/OIP.G-I2My3FgnVzuXQQB-YqywHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/backpack-canvas",
    color: "brown",
    price: "50",
    category: "backpacks",
  },
  {
    name: "Leather Wallet",
    src: "https://th.bing.com/th/id/R.e1e6d549f5b80376ddbb7241aa578d24?rik=8ZK1uhGRArFddQ&pid=ImgRaw&r=0",
    href: "/products/wallet-leather",
    color: "brown",
    price: "30",
    category: "wallets",
  },
  {
    name: "Card Wallet",
    src: "https://tse1.mm.bing.net/th/id/OIP.NbEI9JmCj1eoiqwiEVn1NwHaHl?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/wallet-card",
    color: "black",
    price: "20",
    category: "wallets",
  },
  {
    name: "Zip Wallet",
    src: "https://tse4.mm.bing.net/th/id/OIP.kUVWRUjNQ8IGcLyXAafXAwHaJQ?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/wallet-zip",
    color: "grey",
    price: "25",
    category: "wallets",
  },

  // Watch (3)
  {
    name: "Analog Watch",
    src: "https://tse4.mm.bing.net/th/id/OIP.EcXvwwmo9WODnQj2mUfzXAHaJ3?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/watch-analog",
    color: "silver",
    price: "150",
    category: "watches",
  },
  {
    name: "Digital Sport Watch",
    src: "https://m.media-amazon.com/images/I/71f2BaDMumL._AC_UL1500_.jpg",
    href: "/products/watch-sport",
    color: "black",
    price: "80",

    category: "watches",
  },
  {
    name: "Smart Watch",
    src: "https://thewearify.com/wp-content/uploads/2020/05/dz09-smartwatch-3-1.jpg",
    href: "/products/watch-smart",
    color: "black",
    price: "220",
    category: "watches",
  },

  // Belt (3)
  {
    name: "Leather Belt",
    src: "https://tse3.mm.bing.net/th/id/OIP.f_v0mKTaeCFNf94ki4uiFwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/belt-leather",
    color: "brown",
    price: "25",
    category: "belts",
  },
  {
    name: "Canvas Belt",
    src: "https://i5.walmartimages.com/asr/adad8d49-0a93-4b63-b3d7-ab70bce4ba0c_1.360df67fdafb42e14f5c1f39058b2355.jpeg",
    href: "/products/belt-canvas",
    color: "green",
    price: "18",
    category: "belts",
  },
  {
    name: "Formal Belt",
    src: "https://tse3.mm.bing.net/th/id/OIP.BkXLLzdPO88bSewDjGjCuAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/belt-formal",
    color: "black",
    price: "30",
    category: "belts",
  },

  // Sunglass (3)
  {
    name: "Aviator Sunglasses",
    src: "https://tse4.mm.bing.net/th/id/OIP.xjOpv0wKU0oMyU83fUjaeQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/sunglass-aviator",
    color: "gold",
    price: "65",
    category: "sunglasses",
  },
  {
    name: "Round Sunglasses",
    src: "https://tse1.explicit.bing.net/th/id/OIP.evjFc8irai-OYDxTh3y6_gHaLH?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/sunglass-round",
    color: "black",
    price: "50",
    category: "sunglasses",
  },
  {
    name: "Sport Sunglasses",
    src: "https://tse3.mm.bing.net/th/id/OIP.mYrp2Egtee44h5jxp4mIUQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/sunglass-sport",
    color: "black",
    price: "40",
    category: "sunglasses",
  },

  // Tote (3)
  {
    name: "Canvas Tote",
    src: "https://tse1.explicit.bing.net/th/id/OIP.afQoTBIuA2sHKHWtIzwNfAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/tote-canvas",
    color: "natural",
    price: "28",
    category: "totes",
  },
  {
    name: "Leather Tote",
    src: "https://tse1.explicit.bing.net/th/id/OIP.UVKhiiO4HhzJDt9Uy32d_gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/tote-leather",
    color: "brown",
    price: "75",
    category: "totes",
  },
  {
    name: "Foldable Tote",
    src: "https://swag-prod.s3.us-east-2.amazonaws.com/images/6467e6d51e8594000774d22b.jpg",
    href: "/products/tote-foldable",
    color: "navy",
    price: "22",
    category: "totes",
  },

  // Luggage (3)
  {
    name: "Carry-on Luggage",
    src: "https://tse4.mm.bing.net/th/id/OIP.co0OmfELdd27pKnxzCFDLAHaKb?w=710&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/luggage-carryon",
    color: "black",
    price: "120",
    category: "luggages",
  },
  {
    name: "Hard-shell Luggage",
    src: "https://tse2.mm.bing.net/th/id/OIP.O-Dvub0yoK1YXgjQC_0YLgHaLH?w=500&h=750&rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/luggage-hard-shell",
    color: "silver",
    price: "180",
    category: "luggages",
  },
  {
    name: "Travel Duffel",
    src: "https://tse1.mm.bing.net/th/id/OIP.DPSVTES8kBL7zvPiBlwnNQAAAA?w=474&h=296&rs=1&pid=ImgDetMain&o=7&rm=3",
    href: "/products/luggage-duffel",
    color: "grey",
    price: "70",

    category: "luggages",
  },
];
*/

export default function ProductList() {
  const navigate = useNavigate();
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await Request("products").getAll();
        if (res) setProducts(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProduct();
  }, []);
  const filterdProduct = products.filter((p) => p.category === category);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {filterdProduct.map((product, k) => (
            <div
              key={k}
              className="group relative"
              onClick={() =>
                navigate("/productOverview", { state: { product } })
              }
            >
              <img
                src={product.src}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

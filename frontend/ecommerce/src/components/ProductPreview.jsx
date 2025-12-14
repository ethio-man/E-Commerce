import React from "react";

export const ProductPreview = ({ data }) => {
  const totalPrice = (
    Number(data.price) +
    Number(data.shipping) +
    Number(data.price) * (Number(data.tax) / 100)
  ).toFixed(2);

  const renderStars = (reviewSum, reviewCount) => {
    const rating = reviewSum / reviewCount;
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${
          i < Math.round(rating) ? "text-yellow-400" : "text-slate-200"
        }`}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    ));
  };

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transition-all duration-300 hover:shadow-2xl group">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <img
            src={data.src || "https://picsum.photos/400/400"}
            alt={data.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = "https://picsum.photos/400/400";
            }}
          />
          {data.number_in_stock < 5 && data.number_in_stock > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              Low Stock: Only {data.number_in_stock} left!
            </div>
          )}
          {Number(data.number_in_stock) === 0 && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
              <span className="bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-lg transform -rotate-12 shadow-xl">
                OUT OF STOCK
              </span>
            </div>
          )}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
            {data.category}
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-indigo-600 mb-1 tracking-wide uppercase">
                {data.brand || "Brand Name"}
              </p>
              <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2">
                {data.name || "Product Name"}
              </h3>
            </div>
          </div>

          <div className="flex items-center mb-4 space-x-1">
            {renderStars(data.reviewSum, data.reviewCount)}
            <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-2">
              {data.reviewSum / data.reviewCount}
            </span>
          </div>

          <p className="text-slate-500 text-sm mb-6 leading-relaxed line-clamp-3 min-h-[3em]">
            {data.description || "Product description will appear here..."}
          </p>

          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Subtotal</span>
              <span>${Number(data.price).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Tax ({data.tax}%)</span>
              <span>
                +${(Number(data.price) * (Number(data.tax) / 100)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm text-slate-600">
              <span>Shipping</span>
              <span
                className={
                  Number(data.shipping) === 0
                    ? "text-green-600 font-medium"
                    : ""
                }
              >
                {Number(data.shipping) === 0
                  ? "Free"
                  : `+$${Number(data.shipping).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${totalPrice}
              </span>
            </div>
          </div>

          <button className="w-full mt-6 bg-slate-900 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 shadow-lg shadow-indigo-500/10">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

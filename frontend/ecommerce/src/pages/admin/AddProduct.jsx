import React, { useState } from "react";
import Request from "../api/Request.js";
import { InputGroup } from "../components/InputGroup.jsx";
import { ProductPreview } from "../components/ProductPreview.jsx";
export default function App() {
  const Category = {
    ELECTRONICS: {
      iphone: "iphone",
      galaxy: "galaxy",
      realme: "realme",
      tecno: "tecno",
      vivo: "vivo",
    },

    ACCESSORIES: {
      luggage: "luggage",
      totes: "totes",
      sunglasses: "sunglasses",
      belts: "belts",
      watches: "watches",
      wallets: "wallets",
      backpacks: "backpacks",
    },

    FASHION: {
      cargos: "cargos",
      dresses: "dresses",
      skirts: "skirts",
      jackets: "jackets",
      sweaters: "sweaters",
      jeans: "jeans",
      shirts: "shirt",
    },

    HOME_GARDEN: {
      furniture: "furniture",
      kitchen: "kitchen",
      decor: "decor",
    },

    BEAUTY: {
      skincare: "skincare",
      makeup: "makeup",
      haircare: "haircare",
    },

    SPORTS: {
      outdoor: "outdoor",
      fitness: "fitness",
      team_sports: "team_sports",
    },

    TOYS: {
      puzzles: "puzzles",
      board_games: "board_games",
      dolls: "dolls",
    },

    OTHER: {
      miscellaneous: "miscellaneous",
    },
  };

  const INITIAL_PRODUCT_STATE = {
    name: "",
    description: "",
    brand: "",
    category: "",
    number_in_stock: 1,
    colors: ["Black", "white", "Blue", "Green"],
    sizes: [],
    price: 0.0,
    shipping: 0.0,
    tax: 0.0,
    src: "https://picsum.photos/400/400",
    reviewCount: 1,
    reviewSum: 0,
  };

  const [formData, setFormData] = useState(INITIAL_PRODUCT_STATE);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let parsedValue = value;

    if (type === "number" || type === "range") {
      parsedValue = parseFloat(value) || 0;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleGenerateAI = async () => {
    if (!formData.name || !formData.brand) {
      alert("Please enter a Product Name and Brand first.");
      return;
    }

    setIsGenerating(true);
    const { name, brand, category } = formData;
    try {
      const res = await Request("gemini").create({
        name,
        brand,
        category,
      });
      const description = res.data;
      setFormData((prev) => ({ ...prev, description }));
    } catch (error) {
      alert("Failed to generate description. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await Request("products").create(formData);
    if (!res) return console.log("Product not created please try again.");
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-3">
            Add New Product
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Create a new listing for your store. Use our{" "}
            <span className="text-indigo-600 font-semibold">AI Assistant</span>{" "}
            to craft the perfect description.
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 items-start">
          <div className="lg:col-span-7 xl:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-8 space-y-8">
                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center border-b border-slate-100 pb-3">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Basic Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Product Name"
                      name="name"
                      placeholder="e.g. Wireless Noise-Canceling Headphones"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup
                      label="Brand"
                      name="brand"
                      placeholder="e.g. AudioTech"
                      value={formData.brand}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup
                      label="Category"
                      name="category"
                      as="select"
                      value={formData.category}
                      onChange={handleChange}
                    >
                      <option value="">Select a category</option>

                      {Object.entries(Category).map(
                        ([mainKey, subCategories]) => (
                          <optgroup
                            key={mainKey}
                            label={mainKey.replace("_", " ")}
                          >
                            {Object.entries(subCategories).map(
                              ([subKey, subValue]) => (
                                <option key={subKey} value={subKey}>
                                  {subValue}
                                </option>
                              )
                            )}
                          </optgroup>
                        )
                      )}
                    </InputGroup>

                    <InputGroup
                      label="Image URL"
                      name="src"
                      placeholder="https://..."
                      value={formData.src}
                      onChange={handleChange}
                      type="url"
                    />
                  </div>
                </section>

                <section>
                  <div className="flex justify-between items-end mb-2">
                    <label className="block text-sm font-semibold leading-6 text-slate-900">
                      Description
                    </label>
                    <button
                      type="button"
                      onClick={handleGenerateAI}
                      disabled={isGenerating}
                      className={`text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition-all ${
                        isGenerating
                          ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                          : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      {isGenerating ? (
                        <>
                          <svg
                            className="animate-spin h-3 w-3"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Generating...
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 15h-2v-2h2Zm0-4h-2V7h2Z"
                              opacity=".0"
                            />
                            <path
                              d="M21.03 6.29a3 3 0 0 0-1.78-1.77C17.68 3.86 12 4 12 4s-5.68-.14-7.25.52a3 3 0 0 0-1.78 1.77C2.42 7.87 2.29 12 2.29 12s.13 4.13.68 5.71a3 3 0 0 0 1.78 1.77c1.57.66 7.25.52 7.25.52s5.68.14 7.25-.52a3 3 0 0 0 1.78-1.77c.55-1.58.68-5.71.68-5.71s-.13-4.13-.68-5.71ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm0-6a2 2 0 1 0 2 2 2 2 0 0 0-2-2Z"
                              fill="none"
                            />
                            <path d="M16 8l-1.5 3.5L11 13l3.5 1.5L16 18l1.5-3.5L21 13l-3.5-1.5zM6 10l-1 2.5L2.5 13.5l2.5 1 1 2.5 1-2.5 2.5-1-2.5-1z" />
                          </svg>
                          Generate with Gemini
                        </>
                      )}
                    </button>
                  </div>
                  <textarea
                    name="description"
                    rows={5}
                    className="w-full rounded-lg border-slate-200 bg-white px-4 py-3 text-slate-800 shadow-sm ring-1 ring-inset ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 transition-all duration-200"
                    placeholder="Detailed product description..."
                    value={formData.description}
                    onChange={handleChange}
                  />
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center border-b border-slate-100 pb-3">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Inventory & Pricing
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InputGroup
                      label="Price ($)"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup
                      label="Stock Quantity"
                      name="number_in_stock"
                      type="number"
                      min="0"
                      value={formData.number_in_stock}
                      onChange={handleChange}
                      required
                    />
                    <InputGroup
                      label="Tax Rate (%)"
                      name="tax"
                      type="number"
                      step="0.1"
                      min="0"
                      max="100"
                      value={formData.tax}
                      onChange={handleChange}
                    />
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-bold text-slate-900 mb-5 flex items-center border-b border-slate-100 pb-3">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Shipping Cost ($)"
                      name="shipping"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.shipping}
                      onChange={handleChange}
                    />
                    <div className="space-y-1.5">
                      <label className="block text-sm font-semibold leading-6 text-slate-900">
                        Initial Rating
                      </label>
                      <div className="flex items-center gap-4">
                        <input
                          type="range"
                          name="reviewSum"
                          min="0"
                          max="5"
                          step="0.5"
                          value={formData.reviewSum}
                          onChange={handleChange}
                          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                        />
                        <span className="text-sm font-bold text-slate-700 w-8">
                          {formData.reviewSum}
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="bg-slate-50 px-8 py-6 flex items-center justify-end gap-x-4 border-t border-slate-200">
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 ${
                    isSubmitting ? "opacity-75 cursor-wait" : ""
                  }`}
                >
                  {isSubmitting ? "Adding..." : "Add Product"}
                </button>
              </div>
            </form>
          </div>

          <div className="hidden lg:block lg:col-span-5 xl:col-span-4 mt-8 lg:mt-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-500">
                Live Preview
              </h3>
              <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">
                Mobile Responsive
              </span>
            </div>
            <ProductPreview data={formData} />
          </div>

          <div className="lg:hidden mt-12">
            <h3 className="text-lg font-semibold text-slate-500 mb-4">
              Preview
            </h3>
            <ProductPreview data={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

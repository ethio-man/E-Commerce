import { useState } from "react";
import { Star } from "lucide-react";
import { mockReviews } from "../../data/adminMockData.js";

const ratingFilters = ["All", "5", "4", "3", "2", "1"];

function StarRating({ rating }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={14}
                    className={
                        star <= rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-slate-200 fill-slate-200"
                    }
                />
            ))}
        </div>
    );
}

export default function AdminReviews() {
    const [filter, setFilter] = useState("All");

    const filtered =
        filter === "All"
            ? mockReviews
            : mockReviews.filter((r) => r.rating === parseInt(filter));

    const avgRating = (
        mockReviews.reduce((sum, r) => sum + r.rating, 0) / mockReviews.length
    ).toFixed(1);

    const ratingCounts = [5, 4, 3, 2, 1].map(
        (r) => mockReviews.filter((rev) => rev.rating === r).length
    );

    return (
        <div className="space-y-6">
            {/* Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                    <p className="text-5xl font-bold text-slate-800 mb-2">{avgRating}</p>
                    <StarRating rating={Math.round(parseFloat(avgRating))} />
                    <p className="text-sm text-slate-500 mt-2">
                        Based on {mockReviews.length} reviews
                    </p>
                </div>

                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <h3 className="text-sm font-semibold text-slate-700 mb-4">
                        Rating Distribution
                    </h3>
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars, idx) => (
                            <div key={stars} className="flex items-center gap-3">
                                <span className="text-sm font-medium text-slate-600 w-6">
                                    {stars}★
                                </span>
                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500"
                                        style={{
                                            width: `${(ratingCounts[idx] / mockReviews.length) * 100
                                                }%`,
                                        }}
                                    ></div>
                                </div>
                                <span className="text-sm text-slate-400 w-6 text-right">
                                    {ratingCounts[idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div className="flex flex-wrap gap-2">
                {ratingFilters.map((r) => (
                    <button
                        key={r}
                        onClick={() => setFilter(r)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${filter === r
                                ? "bg-amber-500 text-white shadow-sm"
                                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                            }`}
                    >
                        {r === "All" ? (
                            "All Reviews"
                        ) : (
                            <>
                                {r} <Star size={10} className="fill-current" />
                            </>
                        )}
                    </button>
                ))}
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {filtered.map((review) => (
                    <div
                        key={review.id}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                    {review.customer
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">
                                        {review.customer}
                                    </p>
                                    <p className="text-xs text-slate-400">{review.date}</p>
                                </div>
                            </div>
                            <StarRating rating={review.rating} />
                        </div>
                        <div className="ml-13">
                            <p className="text-xs font-medium text-indigo-600 mb-1.5">
                                {review.product}
                            </p>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {review.comment}
                            </p>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-slate-400 bg-white rounded-2xl">
                        No reviews match this filter.
                    </div>
                )}
            </div>
        </div>
    );
}

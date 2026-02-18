// ===== ADMIN MOCK DATA =====

export const dashboardStats = {
    totalRevenue: 128450.75,
    totalOrders: 1243,
    totalCustomers: 876,
    totalProducts: 342,
    revenueGrowth: 12.5,
    ordersGrowth: 8.3,
    customersGrowth: 15.2,
    productsGrowth: 3.1,
};

export const monthlyRevenue = [
    { month: "Jan", revenue: 8200 },
    { month: "Feb", revenue: 9400 },
    { month: "Mar", revenue: 11200 },
    { month: "Apr", revenue: 10800 },
    { month: "May", revenue: 12500 },
    { month: "Jun", revenue: 13100 },
    { month: "Jul", revenue: 11800 },
    { month: "Aug", revenue: 14200 },
    { month: "Sep", revenue: 13600 },
    { month: "Oct", revenue: 15400 },
    { month: "Nov", revenue: 16800 },
    { month: "Dec", revenue: 18200 },
];

export const mockProducts = [
    { id: 1, name: "Wireless Noise-Canceling Headphones", brand: "AudioTech", category: "ELECTRONICS", price: 299.99, stock: 45, status: "active", image: "https://picsum.photos/seed/prod1/100/100" },
    { id: 2, name: "Premium Leather Backpack", brand: "UrbanCarry", category: "ACCESSORIES", price: 149.99, stock: 32, status: "active", image: "https://picsum.photos/seed/prod2/100/100" },
    { id: 3, name: "Smart Fitness Watch Pro", brand: "FitGear", category: "ELECTRONICS", price: 199.99, stock: 0, status: "out_of_stock", image: "https://picsum.photos/seed/prod3/100/100" },
    { id: 4, name: "Organic Cotton T-Shirt", brand: "EcoWear", category: "FASHION", price: 34.99, stock: 120, status: "active", image: "https://picsum.photos/seed/prod4/100/100" },
    { id: 5, name: "Ceramic Coffee Mug Set", brand: "HomeBliss", category: "HOME_GARDEN", price: 24.99, stock: 85, status: "active", image: "https://picsum.photos/seed/prod5/100/100" },
    { id: 6, name: "Yoga Mat Premium", brand: "ZenFit", category: "SPORTS", price: 59.99, stock: 18, status: "active", image: "https://picsum.photos/seed/prod6/100/100" },
    { id: 7, name: "Vitamin C Serum", brand: "GlowUp", category: "BEAUTY", price: 28.99, stock: 65, status: "active", image: "https://picsum.photos/seed/prod7/100/100" },
    { id: 8, name: "Wooden Puzzle Set", brand: "BrainBox", category: "TOYS", price: 19.99, stock: 0, status: "draft", image: "https://picsum.photos/seed/prod8/100/100" },
    { id: 9, name: "Slim Fit Cargo Pants", brand: "StreetStyle", category: "FASHION", price: 64.99, stock: 53, status: "active", image: "https://picsum.photos/seed/prod9/100/100" },
    { id: 10, name: "Stainless Steel Water Bottle", brand: "HydroLife", category: "SPORTS", price: 22.99, stock: 200, status: "active", image: "https://picsum.photos/seed/prod10/100/100" },
];

export const mockOrders = [
    { id: "ORD-1001", customer: "Abebe Kebede", email: "abebe@email.com", items: 3, total: 349.97, status: "delivered", date: "2026-02-15", paymentMethod: "Credit Card" },
    { id: "ORD-1002", customer: "Sara Tadesse", email: "sara@email.com", items: 1, total: 149.99, status: "shipped", date: "2026-02-16", paymentMethod: "PayPal" },
    { id: "ORD-1003", customer: "Daniel Hailu", email: "daniel@email.com", items: 5, total: 524.95, status: "pending", date: "2026-02-17", paymentMethod: "Credit Card" },
    { id: "ORD-1004", customer: "Meron Alemu", email: "meron@email.com", items: 2, total: 89.98, status: "pending", date: "2026-02-17", paymentMethod: "Bank Transfer" },
    { id: "ORD-1005", customer: "Yonas Bekele", email: "yonas@email.com", items: 1, total: 299.99, status: "cancelled", date: "2026-02-14", paymentMethod: "Credit Card" },
    { id: "ORD-1006", customer: "Tigist Mekonnen", email: "tigist@email.com", items: 4, total: 178.96, status: "delivered", date: "2026-02-13", paymentMethod: "PayPal" },
    { id: "ORD-1007", customer: "Bereket Girma", email: "bereket@email.com", items: 2, total: 234.98, status: "shipped", date: "2026-02-16", paymentMethod: "Credit Card" },
    { id: "ORD-1008", customer: "Hana Solomon", email: "hana@email.com", items: 6, total: 412.94, status: "delivered", date: "2026-02-12", paymentMethod: "Bank Transfer" },
    { id: "ORD-1009", customer: "Dawit Tesfaye", email: "dawit@email.com", items: 1, total: 59.99, status: "pending", date: "2026-02-18", paymentMethod: "PayPal" },
    { id: "ORD-1010", customer: "Bethlehem Assefa", email: "bethlehem@email.com", items: 3, total: 154.97, status: "shipped", date: "2026-02-15", paymentMethod: "Credit Card" },
];

export const mockCustomers = [
    { id: 1, name: "Abebe Kebede", email: "abebe@email.com", avatar: "AK", totalOrders: 12, totalSpent: 2340.50, joinDate: "2025-06-15", status: "active" },
    { id: 2, name: "Sara Tadesse", email: "sara@email.com", avatar: "ST", totalOrders: 8, totalSpent: 1120.00, joinDate: "2025-08-22", status: "active" },
    { id: 3, name: "Daniel Hailu", email: "daniel@email.com", avatar: "DH", totalOrders: 25, totalSpent: 5890.75, joinDate: "2025-03-10", status: "active" },
    { id: 4, name: "Meron Alemu", email: "meron@email.com", avatar: "MA", totalOrders: 3, totalSpent: 245.97, joinDate: "2025-11-05", status: "active" },
    { id: 5, name: "Yonas Bekele", email: "yonas@email.com", avatar: "YB", totalOrders: 15, totalSpent: 3450.25, joinDate: "2025-04-18", status: "inactive" },
    { id: 6, name: "Tigist Mekonnen", email: "tigist@email.com", avatar: "TM", totalOrders: 7, totalSpent: 890.50, joinDate: "2025-09-30", status: "active" },
    { id: 7, name: "Bereket Girma", email: "bereket@email.com", avatar: "BG", totalOrders: 20, totalSpent: 4200.00, joinDate: "2025-02-14", status: "active" },
    { id: 8, name: "Hana Solomon", email: "hana@email.com", avatar: "HS", totalOrders: 1, totalSpent: 34.99, joinDate: "2026-01-20", status: "blocked" },
];

export const mockReviews = [
    { id: 1, productId: 1, product: "Wireless Noise-Canceling Headphones", customer: "Abebe Kebede", rating: 5, comment: "Absolutely amazing sound quality! Best headphones I've ever owned. The noise cancellation is top-notch.", date: "2026-02-10" },
    { id: 2, productId: 2, product: "Premium Leather Backpack", customer: "Sara Tadesse", rating: 4, comment: "Great quality leather and plenty of compartments. Slightly heavy when fully loaded.", date: "2026-02-12" },
    { id: 3, productId: 4, product: "Organic Cotton T-Shirt", customer: "Daniel Hailu", rating: 3, comment: "Comfortable fabric but the sizing runs a bit small. Order one size up.", date: "2026-02-08" },
    { id: 4, productId: 5, product: "Ceramic Coffee Mug Set", customer: "Meron Alemu", rating: 5, comment: "Beautiful set! Perfect for our morning coffee. Great gift idea too.", date: "2026-02-14" },
    { id: 5, productId: 1, product: "Wireless Noise-Canceling Headphones", customer: "Yonas Bekele", rating: 2, comment: "Battery life is not as advertised. Only lasts about 15 hours instead of 30.", date: "2026-02-05" },
    { id: 6, productId: 6, product: "Yoga Mat Premium", customer: "Tigist Mekonnen", rating: 5, comment: "Perfect thickness and grip. Doesn't slip even during hot yoga sessions.", date: "2026-02-11" },
    { id: 7, productId: 7, product: "Vitamin C Serum", customer: "Hana Solomon", rating: 4, comment: "Noticed visible improvement in skin brightness after 2 weeks. Will repurchase!", date: "2026-02-15" },
    { id: 8, productId: 9, product: "Slim Fit Cargo Pants", customer: "Bereket Girma", rating: 4, comment: "Stylish and functional. The cargo pockets are surprisingly spacious.", date: "2026-02-09" },
    { id: 9, productId: 3, product: "Smart Fitness Watch Pro", customer: "Dawit Tesfaye", rating: 1, comment: "Watch stopped working after 2 weeks. Very disappointed with the build quality.", date: "2026-02-06" },
    { id: 10, productId: 10, product: "Stainless Steel Water Bottle", customer: "Bethlehem Assefa", rating: 5, comment: "Keeps water cold for 24 hours! Excellent quality and eco-friendly choice.", date: "2026-02-13" },
];

export const mockTransactions = [
    { id: "TXN-5001", orderId: "ORD-1001", customer: "Abebe Kebede", amount: 349.97, method: "Credit Card", cardLast4: "4242", status: "completed", date: "2026-02-15" },
    { id: "TXN-5002", orderId: "ORD-1002", customer: "Sara Tadesse", amount: 149.99, method: "PayPal", cardLast4: null, status: "completed", date: "2026-02-16" },
    { id: "TXN-5003", orderId: "ORD-1003", customer: "Daniel Hailu", amount: 524.95, method: "Credit Card", cardLast4: "1234", status: "pending", date: "2026-02-17" },
    { id: "TXN-5004", orderId: "ORD-1004", customer: "Meron Alemu", amount: 89.98, method: "Bank Transfer", cardLast4: null, status: "pending", date: "2026-02-17" },
    { id: "TXN-5005", orderId: "ORD-1005", customer: "Yonas Bekele", amount: 299.99, method: "Credit Card", cardLast4: "5678", status: "refunded", date: "2026-02-14" },
    { id: "TXN-5006", orderId: "ORD-1006", customer: "Tigist Mekonnen", amount: 178.96, method: "PayPal", cardLast4: null, status: "completed", date: "2026-02-13" },
    { id: "TXN-5007", orderId: "ORD-1007", customer: "Bereket Girma", amount: 234.98, method: "Credit Card", cardLast4: "9012", status: "completed", date: "2026-02-16" },
    { id: "TXN-5008", orderId: "ORD-1008", customer: "Hana Solomon", amount: 412.94, method: "Bank Transfer", cardLast4: null, status: "completed", date: "2026-02-12" },
    { id: "TXN-5009", orderId: "ORD-1009", customer: "Dawit Tesfaye", amount: 59.99, method: "PayPal", cardLast4: null, status: "failed", date: "2026-02-18" },
    { id: "TXN-5010", orderId: "ORD-1010", customer: "Bethlehem Assefa", amount: 154.97, method: "Credit Card", cardLast4: "3456", status: "completed", date: "2026-02-15" },
];

export const mockAdmins = [
    { id: 1, username: "superadmin", fullName: "Nathnael Admin", email: "superadmin@warka.com", role: "super_admin", lastLogin: "2026-02-18 08:30", status: "active" },
    { id: 2, username: "admin_sara", fullName: "Sara Tadesse", email: "sara.admin@warka.com", role: "admin", lastLogin: "2026-02-17 14:22", status: "active" },
    { id: 3, username: "admin_daniel", fullName: "Daniel Hailu", email: "daniel.admin@warka.com", role: "admin", lastLogin: "2026-02-16 09:45", status: "inactive" },
];

// Super admin credentials for Administration page auth
export const SUPER_ADMIN_CREDENTIALS = {
    username: "superadmin",
    password: "admin123",
};

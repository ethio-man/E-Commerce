CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) CHECK (role IN ('user', 'admin', 'super_admin')) DEFAULT 'user'
);

CREATE TABLE address (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    country VARCHAR(53),
    city VARCHAR(53),
    postal_code VARCHAR(20)
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    description TEXT,
    brand VARCHAR(53),
    category VARCHAR(53),
    number_in_stock INT,
    price DECIMAL(10,2),
    shipping DECIMAL(10,2),
    tax DECIMAL(10,2),
    rating INT,
    created_by INT REFERENCES users(id),  
    related_product INT REFERENCES products(id)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivery_date DATE,
    total_price DECIMAL(10,2),
    payment_method VARCHAR(53),
    paid_status BOOLEAN DEFAULT FALSE,
    user_id INT REFERENCES users(id),
    address_id INT REFERENCES address(id)
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    amount INT
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    message TEXT,
    comment_at DATE DEFAULT CURRENT_DATE,
    rating INT,
    user_id INT REFERENCES users(id),
    product_id INT REFERENCES products(id)
);

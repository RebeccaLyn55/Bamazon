CREATE DATABASE Bamazon;
USE Bamazon;

DROP TABLE products;

CREATE TABLE products(
	product_id INT(11) AUTO_INCREMENT NOT NULL,
    product VARCHAR(60),
    department VARCHAR(30),
    price DECIMAL(10,2),
    quantity INTEGER (10),
    PRIMARY KEY(product_id)
);
    
INSERT INTO products (product, department, price, quantity)
VALUES ("Diamond Necklace", "Jewelry", 200.00, 150);
INSERT INTO products (product, department, price, quantity)
VALUES ("Running Sneakers", "Activewear", 50.99, 300);
INSERT INTO products (product, department, price, quantity)
VALUES ("Coffee Table", "Furniture", 200.00, 150);
INSERT INTO products (product, department, price, quantity)
VALUES ("iPad", "Electronics", 300.00, 20);
INSERT INTO products (product, department, price, quantity)
VALUES ("Virtual Reality System", "Electronics", 800.00, 1);
INSERT INTO products (product, department, price, quantity)
VALUES ("Recliner", "Furniture", 600.00, 70);
INSERT INTO products (product, department, price, quantity)
VALUES ("Food Processor", "Kitchen", 55.99, 30);
INSERT INTO products (product, department, price, quantity)
VALUES ("Vitamix", "Kitchen", 200.50, 100);
INSERT INTO products (product, department, price, quantity)
VALUES ("Ruby Ring", "Jewelry", 154.99, 1);
INSERT INTO products (product, department, price, quantity)
VALUES ("Summer Dress", "Clothing", 40.00, 50);

SELECT*from products

DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
id INTEGER (10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR (20) NOT NULL,
department_name VARCHAR (20) NOT NULL,
price INTEGER (10) NOT NULL,
stock_quantity INTEGER (100) NOT NULL,
PRIMARY KEY (id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Xbox 1", "Electronics", 250, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("PS4", "Electronics", 279, 10);

insert into products(product_name, department_name, price, stock_quantity)
values ("HDMI Cable", "Electronics", 10, 40);

insert into products(product_name, department_name, price, stock_quantity)
values ("Beats by Dre", "Electronics", 199, 15);

insert into products(product_name, department_name, price, stock_quantity)
values ("Gaming Mouse", "Electronics", 79, 5);

insert into products(product_name, department_name, price, stock_quantity)
values ("Diamond Necklace", "Jewelry", 99, 2);

insert into products(product_name, department_name, price, stock_quantity)
values ("Analog Watch", "Jewelry", 55, 4);

insert into products(product_name, department_name, price, stock_quantity)
values ("Dress", "Clothing", 14, 20);

insert into products(product_name, department_name, price, stock_quantity)
values ("Cool Action Figure", "Toys", 6, 40);

insert into products(product_name, department_name, price, stock_quantity)
values ("Power Wheels", "Toys", 400, 2);


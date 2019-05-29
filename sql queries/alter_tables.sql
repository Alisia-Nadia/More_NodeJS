----------------------add Quantity attribute to Order_products---------------------------
ALTER TABLE Order_products 
ADD Quantity SMALLINT NULL;  

----------------------add some missing values in Order_products table---------------------
INSERT INTO Order_products VALUES(22, 103, '41', 399, 1)
INSERT INTO Order_products VALUES(22, 82, 'M', 50, 1)
INSERT INTO Order_products VALUES(30, 92, '44', 899, 1)
INSERT INTO Order_products VALUES(31, 31, 'M', 150, 1)

----------------------populate the Quantity column-------------------------------
UPDATE Order_products
SET Quantity = 1
WHERE oID = 42 AND pNo < 50
















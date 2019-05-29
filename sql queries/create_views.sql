
-----------this view contains information needed for the item display page--------------------- 

CREATE VIEW vw_products_display_info
AS
SELECT Products.pNo, Products.pName, Products.Material, Products.color, 
	Products.brand, Product_details.pSize, Product_details.price
FROM Products
JOIN Product_details ON Products.pNo = Product_details.pNo;


------------------------change a column name in Products----------------------
--EXEC sp_rename 'Products.generalDescription', 'Material', 'COLUMN'



----------------drop or select the view---------------------------------
--DROP VIEW vw_products_display_info;



---------this view has all order details for customer---------------------------------
CREATE VIEW vw_order_details
AS
SELECT        
	Orders.oID, Orders.date, Orders.paymentOption, 
	Customers.fName, Customers.lName, Customers.email, Customers.telephone, 
	CONCAT(Customers.street, Customers.city, Customers.postCode, Customers.country) AS cAddress, 
	Products.pNo, Products.pName, Products.brand, Order_products.pSize, Order_products.priceAtPurchase,
	Orders.status
FROM
dbo.Orders 
INNER JOIN dbo.Customers ON Orders.cID = Customers.cID 
INNER JOIN dbo.Order_products ON Orders.oID = Order_products.oID 
INNER JOIN dbo.Products ON Order_products.pNo = Products.pNo

DROP VIEW vw_order_details;












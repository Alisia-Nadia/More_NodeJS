
--------------------view for display item------------------------
CREATE VIEW vw_products_display_info
AS
SELECT Products.pNo, Products.pName, Products.Material, Products.color, 
	Products.brand, Product_details.pSize, Product_details.price
FROM Products
JOIN Product_details ON Products.pNo = Product_details.pNo;


------------------------change a column name in Products----------------------
--EXEC sp_rename 'Products.generalDescription', 'Material', 'COLUMN'



----------------drop or select the view---------------------------------
DROP VIEW vw_products_display_info;

SELECT * FROM vw_products_display_info;

















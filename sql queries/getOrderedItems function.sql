-----------------------UDF get orders by giving customer ID----------------------
CREATE FUNCTION getOrderedItems(@cID INT)
RETURNS TABLE
AS
RETURN (
	SELECT filteredCustomer.*, Orders.date, Orders.status, Order_products.priceAtPurchase, 
			Products.material, Products.color, Products.brand, Products.category
	FROM
	(
		SELECT TOP 1 Customers.cID, Customers.fName, Customers.lName, Customers.email FROM Customers WHERE cID = @cID
	) filteredCustomer
	JOIN Orders ON filteredCustomer.cID = Orders.cID
	JOIN Order_products ON Orders.oID = Order_products.oID
	jOIN Products ON Order_products.pNO = Products.pNo
)

--DROP FUNCTION dbo.getOrderedItems

select * from getOrderedItems(20)

SELECT*FROM Order_products WHERE oID=24
SELECT*FROM Orders WHERE cID=20




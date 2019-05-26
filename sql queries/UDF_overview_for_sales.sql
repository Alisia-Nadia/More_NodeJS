
------------------UDF returns table shows each brand sold quantity---------------------------
CREATE FUNCTION fn_getTheMostSaledBrand()
RETURNS TABLE
AS
RETURN(
	SELECT brand, COUNT(brand) AS soldQuantity
	FROM Products 
	JOIN Order_products ON Products.pNo=Order_products.pNo
	GROUP BY Products.brand
	);
GO

SELECT*FROM fn_getTheMostSaledBrand() ORDER BY soldQuantity DESC


------------------UDF returns table shows monthly and yearly total sales revenue---------------------------
CREATE FUNCTION fn_getMonthlyRevenue(@saleYear INT) 
RETURNS @monthlyRevenueReport TABLE(
	months INT,
	revenue SMALLMONEY
)
AS
BEGIN
	INSERT @monthlyRevenueReport
		SELECT DATEPART(MONTH, Orders.date) AS saleMonth, SUM(priceAtPurchase*Quantity) AS totalPrice 
		FROM Order_products 
		JOIN (
			SELECT * FROM Orders WHERE Orders.status='Delivered') Orders 
		ON Order_products.oID=Orders.oID  
		WHERE DATEPART(YEAR, Orders.date) = @saleYear
		GROUP BY DATEPART(MONTH, Orders.date)
	RETURN
END;


SELECT*FROM fn_getMonthlyRevenue(2019);


------------CREARE A TABLE TYPE WHICH CAN BE USED LATER TO PARSE MULTIPLE PARAMETERS-----
CREATE TYPE ParamValues AS TABLE(
	brand VARCHAR(50), 
	salesYear INT
);
GO

------------------------UDF returns monthly revenue by giving brand and year as params--------------------
CREATE FUNCTION fn_getBrandSalesRevenue(
	@brand VARCHAR(50),
	@salesYear INT
)
RETURNS @salesRevenue TABLE(
	months INT,
	revenue SMALLMONEY
)
AS
BEGIN
	DECLARE @params AS ParamValues;
	INSERT INTO @params VALUES (@brand, @salesYear)
	INSERT @salesRevenue
		SELECT DATEPART(MONTH, Orders.date) AS salesMonth,
				SUM(Order_products.priceAtPurchase*Order_products.Quantity) AS revenue
		FROM Order_products
		JOIN (
			SELECT pNo, brand FROM Products 
		) Products
		ON Order_products.pNo = Products.pNo
		JOIN (
			SELECT oID, date FROM Orders WHERE status='Delivered'
		) Orders
		ON Orders.oID=Order_products.oID
		WHERE DATEPART(YEAR, date)=(SELECT salesYear FROM @params) AND Products.brand=(SELECT brand FROM @params)
		GROUP BY DATEPART(MONTH, Orders.date)
	RETURN;
END;

SELECT*FROM fn_getBrandSalesRevenue('Nike', 2019)
DROP FUNCTION fn_getBrandSalesRevenue









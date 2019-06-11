
Select*from vw_order_details;


----------------------stored procedure returns order for today-------------------------------------------
CREATE PROCEDURE usp_getTodaysOrder
AS
DECLARE @today date=CONVERT(date, GETDATE());
SELECT * FROM vw_order_details 
WHERE date = @today
EXEC usp_getTodaysOrder;


-----------------------stored procedure returns canceled order info--------------------------------------
CREATE PROCEDURE usp_getAllCancelledOrder
AS
SELECT * FROM vw_order_details 
WHERE status='Canceled'

EXEC usp_getAllCancelledOrder;

--DROP PROCEDURE usp_getAllCancelledOrder;

select*from Product_details
select*from Products

------------------------stored procedure that insert new items to product------------------------------------
CREATE PROCEDURE usp_insert_product(
	@pName AS VARCHAR(255),
	@material AS VARCHAR(255),
	@color AS VARCHAR(255),
	@brand AS VARCHAR(255),
	@category AS VARCHAR(255),
	@gender AS VARCHAR(255),
	@subCategory AS VARCHAR(255),
	@pSize AS VARCHAR(255),
	@price AS INT,
	@quantity AS INT
)
AS
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
INSERT INTO Products 
VALUES (@pName, @material, @color, @brand, @category, @gender, @subCategory);
DECLARE @pNO INT
SET @pNO = (SELECT pNO FROM Products WHERE pName=@pName);
INSERT INTO Product_details
VALUES (@pNO, @pSize, @price, @quantity);
COMMIT TRANSACTION;
GO

DROP PROCEDURE usp_insert_product;

EXEC usp_insert_product 'silly dress', 'cotton', 'red', 'Silly', 'Clothes', 'f', 'Dress', 'S', 800, 30








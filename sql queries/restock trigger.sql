CREATE TRIGGER restock
	ON dbo.Product_details
	FOR INSERT, UPDATE
AS
BEGIN
	UPDATE Product_details SET quantity = 20 WHERE quantity <= 0;
END
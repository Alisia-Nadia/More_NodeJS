CREATE FUNCTION getFavoriteCategory(@cID INT)
RETURNS VARCHAR(20)
AS
BEGIN
	RETURN (
		SELECT TOP 1 a.category
		FROM (SELECT * FROM getOrderedItems(@cID)) a
		GROUP BY a.category
		ORDER BY COUNT(*) DESC
	)
END

--DROP FUNCTION dbo.getFavoriteCategory
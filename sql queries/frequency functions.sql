CREATE FUNCTION getCategoryFrequency(@cID INT)
RETURNS TABLE
AS
RETURN(
	SELECT a.category, COUNT (*) AS frequency FROM
	(SELECT * FROM getOrderedItems(@cID)) a
	GROUP BY
	a.category
)
--DROP FUNCTION dbo.getCategoryFrequency

CREATE FUNCTION getColorFrequency(@cID INT)
RETURNS TABLE
AS
RETURN(
	SELECT a.color, COUNT (*) AS frequency FROM
	(SELECT * FROM getOrderedItems(@cID)) a
	GROUP BY
	a.color
)
--DROP FUNCTION dbo.getColorFrequency

CREATE FUNCTION getMaterialFrequency(@cID INT)
RETURNS TABLE
AS
RETURN(
	SELECT a.material, COUNT (*) AS frequency FROM
	(SELECT * FROM getOrderedItems(@cID)) a
	GROUP BY
	a.material
)
--DROP FUNCTION dbo.getMaterialFrequency
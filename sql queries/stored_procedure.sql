
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















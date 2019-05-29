SELECT*FROM Employee

-----------------create role 'salesman' and grant permission-----------------------
CREATE ROLE salesman;
GRANT SELECT, UPDATE, INSERT, DELETE ON Order_products TO salesman;
GRANT SELECT, UPDATE, INSERT, DELETE ON Orders TO salesman;
GRANT SELECT, UPDATE, INSERT, DELETE ON Products TO salesman;
GRANT SELECT, UPDATE, INSERT, DELETE ON Product_details TO salesman;
GRANT SELECT, UPDATE, INSERT, DELETE ON Customers TO salesman;
GRANT SELECT, UPDATE, INSERT, DELETE ON vw_order_details TO salesman;
GRANT SELECT ON getOrderedItems TO salesman;
GRANT SELECT ON getCategoryFrequency TO salesman;
GRANT SELECT ON getColorFrequency TO salesman;

CREATE USER Johan FOR LOGIN Johan;

ALTER ROLE salesman ADD MEMBER Johan;



-----------------create role 'manager' and grant permission-----------------------
CREATE ROLE manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Order_products TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Orders TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Products TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Product_details TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Customers TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Employee TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON Department TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON vw_order_details TO manager;
GRANT SELECT, UPDATE, INSERT, DELETE ON vw_products_display_info TO manager;
GRANT SELECT ON fn_getMonthlyRevenue TO manager;
GRANT SELECT ON fn_getTheMostSaledBrand TO manager;
GRANT SELECT ON fn_getBrandSalesRevenue TO manager;

CREATE USER Erik FOR LOGIN Erik;

ALTER ROLE manager ADD MEMBER Erik;

DROP ROLE manager;

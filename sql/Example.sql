SELECT * FROM Store

SELECT * FROM ShoppingList

SELECT * FROM StoreProduct

SELECT p.* FROM StoreProduct as p INNER JOIN Store s ON s.ID = p.StoreID WHERE s.ID = '84771384-9f2c-474d-9107-47a2f5b3615e'
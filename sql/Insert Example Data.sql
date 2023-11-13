INSERT INTO Store VALUES 
(NEWID(), 'Trader Joes'),
(NEWID(), 'Kens Market'),
(NEWID(), 'PCC')

INSERT INTO ShoppingList VALUES 
(NEWID(), 'Pasta', GETDATE()),
(NEWID(), 'Soup',  GETDATE()),
(NEWID(), 'Salad',  GETDATE())

INSERT INTO StoreProduct VALUES 
(NEWID(), 'Marios', 'Noodles', 2.99),
(NEWID(), 'Little Debs', 'Lettuce', 2.49),
(NEWID(), 'Dread', 'Bread', 5.99)
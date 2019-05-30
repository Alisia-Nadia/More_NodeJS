CREATE TABLE Favorites (
	cID int not null FOREIGN KEY REFERENCES Customers(cID),
	pNo int not null FOREIGN KEY REFERENCES Products(pNo),
	pSize varchar(255) not null,
)


--DROP PROCEDURE addToFavorites
CREATE PROCEDURE addToFavorites
    @cID int,
	@pNo int,
	@pSize varchar(255)
AS
BEGIN 
	IF NOT EXISTS(SELECT * FROM Favorites WHERE cID = @cID AND pNo = @pNo AND pSize = @pSize)
	BEGIN
		INSERT INTO Favorites (cID, pNo, pSize) VALUES (@cID, @pNo, @pSize)
	END
END

EXEC addToFavorites @cID = 21, @pNo = 32, @pSize = 'M'
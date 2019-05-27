IF NOT EXISTS(SELECT * FROM sys.databases WHERE NAME='sqldb')
CREATE DATABASE sqldb;

use sqldb;


create table Customers(

		cID int not null IDENTITY(1,1) PRIMARY KEY,
		fName varchar(255) not null,
		lName varchar(255) not null,
		email varchar(255) UNIQUE not null,
		telephone int not null,
		street varchar(255) not null,
		city varchar(255) not null,
		postCode varchar(255) not null,
		country varchar(255) not null,
		pHash varchar(255) not null,
		
		);

create table Products(

		pNo int not null IDENTITY(1,1) PRIMARY KEY,
		pName varchar(255) not null,
		generalDescription varchar(255) not null,
		color varchar(255) not null,
		
		);

create table Product_details(

		pNo int not null IDENTITY(1,1) FOREIGN KEY REFERENCES Products(pNo),
		pSize varchar(255) not null,
		price int not null,
		quantity int not null,
		PRIMARY KEY(pNO,pSize),
		
		);

create table Orders(
		
		cID int not null FOREIGN KEY REFERENCES Customers(cID),
		oID int not null IDENTITY(1,1) PRIMARY KEY,
		date date,
		paymentOption varchar(255) not null,
		status varchar(255) not null,
		
		);

create table Order_products(
		oID int not null FOREIGN KEY REFERENCES Orders(oID),
		pID  int not null FOREIGN KEY REFERENCES Products(pNo),
		priceAtPurchase int not null,
);

--DROP TABLE Department
create table Department(
		deptID int NOT NULL IDENTITY(1,1) PRIMARY KEY,
		dept_name varchar(30) NOT NULL,
		 
);


--DROP TABLE Employee
create table Employee(
		eID char(5) not null PRIMARY KEY, 
		efName varchar(30) NOT NULL,
		elName varchar(30) NOT NULL,
		telephone char(20) NOT NULL,
		email varchar(50) NOT NULL,
		title varchar(50) NOT NULL,
		deptID int NOT NULL FOREIGN KEY REFERENCES department(deptID),

);


ALTER TABLE Orders
ADD CONSTRAINT paymentOptionC CHECK (paymentOption IN ('Bank', 'Card', 'MobilePay'));

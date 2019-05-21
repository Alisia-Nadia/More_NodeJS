
---------------populate Products with shoes products--------------------------------
select*from Products

delete from Products
where Products.category = 'Shoes'  

-------------insert values to Products----------------------------------------
insert into Products values('Venom Low Sneakers', 'Cow leather 90% / Polyester 10%', 'Yellow', 'Fila', 'Shoes', 'M', 'Sneakers');
insert into Products values('Venom Low Sneakers', 'Cow leather 90% / Polyester 10%', 'Yellow', 'Fila', 'Shoes', 'F', 'Sneakers');
insert into Products values('Premium Boots', 'Cow leather 56%', 'Yellow', 'Timberland', 'Shoes', 'M', 'Boots');
insert into Products values('Premium Boots', 'Cow leather 56%', 'Yellow', 'Timberland', 'Shoes', 'F', 'Boots');
insert into Products values('Premium Boots', 'Cow leather 56%', 'White', 'Timberland', 'Shoes', 'M', 'Boots');
insert into Products values('Premium Boots', 'Cow leather 56%', 'Black', 'Timberland', 'Shoes', 'F', 'Boots');
insert into Products values('1461 Shoes', 'Leather 90% / Polyester 10%', 'Black', 'Dr Martens', 'Shoes', 'F', 'Oxfords');
insert into Products values('1461 Shoes', 'Leather 90% / Polyester 10%', 'Black', 'Dr Martens', 'Shoes', 'M', 'Oxfords');
insert into Products values('High Top Sneakers', 'Cow leather 100%', 'White', 'Buffalo', 'Shoes', 'M', 'Sneakers');
insert into Products values('High Top Sneakers', 'Cow leather 100%', 'White', 'Buffalo', 'Shoes', 'F', 'Sneakers');
insert into Products values('Flip Cord Flip-Flops', 'Ethylene Vinyl Acetate 100% / Polyester 10%', 'Black / Yellow', 'Flip Cord', 'Shoes', 'F', 'Flip-Flops');
insert into Products values('Flip Cord Flip-Flops', 'Ethylene Vinyl Acetate 100% / Polyester 10%', 'Black / Yellow', 'Flip Cord', 'Shoes', 'M', 'Flip-Flops');
insert into Products values('Anaheim Shoes', 'Cotton 100%', 'Pink / White', 'Vans', 'Shoes', 'F', 'Sneakers');

insert into Products values('Chelsea Boots', 'Cow leather 100%', 'Black', 'Dr. Martens', 'Shoes', 'F', 'Boots');
insert into Products values('Chelsea Boots', 'Cow leather 100%', 'Black', 'Dr. Martens', 'Shoes', 'M', 'Boots');
insert into Products values('DR Mono Low', 'Cow leather 100%', 'Black', 'Dr. Martens', 'Shoes', 'M', 'Oxfords');
insert into Products values('DR Mono Low', 'Cow leather 100%', 'Black', 'Dr. Martens', 'Shoes', 'F', 'Oxfords');
insert into Products values('Thick-soled Leather Sneakers', 'Leather 100%', 'Black', 'Cos', 'Shoes', 'M', 'Oxfords');
insert into Products values('Thick-soled Leather Sneakers', 'Leather 100%', 'Blue', 'Cos', 'Shoes', 'F', 'Oxfords');
insert into Products values('Thick-soled Leather Sneakers', 'Leather 100%', 'White', 'Cos', 'Shoes', 'M', 'Oxfords');


select*from Product_details

select pNo from Products
where Products.pName='Venom Low Sneakers' and Products.color='Yellow'

delete from Product_details
where pNo=92

--------------------------------insert values to Product_details------------------------------------
insert into Product_details values(92, 40, 899, 50);
insert into Product_details values(92, 41, 899, 50);
insert into Product_details values(92, 42, 899, 50);
insert into Product_details values(92, 43, 899, 30);
insert into Product_details values(92, 44, 899, 20);
insert into Product_details values(92, 45, 899, 10);

insert into Product_details values(93, 36, 899, 15);
insert into Product_details values(93, 37, 899, 20);
insert into Product_details values(93, 38, 899, 20);
insert into Product_details values(93, 39, 899, 30);

insert into Product_details values(94, 40, 1050, 10);
insert into Product_details values(94, 41, 1050, 10);
insert into Product_details values(94, 42, 1050, 20);
insert into Product_details values(94, 43, 1050, 30);
insert into Product_details values(94, 44, 1050, 40);
insert into Product_details values(94, 45, 1050, 10);



insert into Product_details values(95, 36, 1050, 10);
insert into Product_details values(95, 37, 1050, 10);
insert into Product_details values(95, 38, 1050, 20);
insert into Product_details values(95, 39, 1050, 20);

insert into Product_details values(96, 42, 1050, 20);
insert into Product_details values(96, 43, 1050, 30);
insert into Product_details values(96, 44, 1050, 40);
insert into Product_details values(96, 45, 1050, 10);

insert into Product_details values(97, 36, 1050, 10);
insert into Product_details values(97, 37, 1050, 10);
insert into Product_details values(97, 38, 1050, 20);
insert into Product_details values(97, 39, 1050, 20);

insert into Product_details values(98, 36, 1250, 20);
insert into Product_details values(98, 37, 1250, 30);
insert into Product_details values(98, 38, 1250, 30);
insert into Product_details values(98, 39, 1250, 30);
insert into Product_details values(98, 40, 1250, 20);

insert into Product_details values(99, 43, 1250, 30);
insert into Product_details values(99, 44, 1250, 30);
insert into Product_details values(99, 45, 1250, 30);

insert into Product_details values(100, 42, 1000, 10);
insert into Product_details values(100, 43, 1000, 50);
insert into Product_details values(100, 44, 1000, 50);
insert into Product_details values(100, 45, 1000, 40);
insert into Product_details values(100, 46, 1000, 30);

insert into Product_details values(101, 36, 1000, 30);
insert into Product_details values(101, 37, 1000, 40);
insert into Product_details values(101, 38, 1000, 40);
insert into Product_details values(101, 39, 1000, 40);
insert into Product_details values(101, 40, 1000, 10);

insert into Product_details values(102, 36, 399, 100);
insert into Product_details values(102, 37, 399, 100);
insert into Product_details values(102, 38, 399, 100);
insert into Product_details values(102, 39, 399, 100);
insert into Product_details values(102, 40, 399, 100);

insert into Product_details values(103, 41, 399, 100);
insert into Product_details values(103, 42, 399, 100);
insert into Product_details values(103, 43, 399, 100);
insert into Product_details values(103, 44, 399, 100);
insert into Product_details values(103, 45, 399, 100);
insert into Product_details values(103, 46, 399, 100);

insert into Product_details values(104, 36, 650, 50);
insert into Product_details values(104, 37, 650, 20);
insert into Product_details values(104, 38, 650, 30);
insert into Product_details values(104, 39, 650, 50);
insert into Product_details values(104, 40, 650, 50);

insert into Product_details values(105, 35, 1200, 100);
insert into Product_details values(105, 36, 1200, 200);
insert into Product_details values(105, 37, 1200, 100);
insert into Product_details values(105, 38, 1200, 100);
insert into Product_details values(105, 39, 1200, 100);
insert into Product_details values(105, 40, 1200, 50);

insert into Product_details values(106, 41, 1300, 50);
insert into Product_details values(106, 42, 1300, 100);
insert into Product_details values(106, 43, 1300, 70);
insert into Product_details values(106, 44, 1300, 80);
insert into Product_details values(106, 45, 1300, 30);
insert into Product_details values(106, 46, 1300, 50);

insert into Product_details values(107, 41, 990, 20);
insert into Product_details values(107, 42, 990, 50);
insert into Product_details values(107, 43, 990, 80);
insert into Product_details values(107, 44, 990, 80);
insert into Product_details values(107, 45, 990, 50);
insert into Product_details values(107, 46, 990, 50);

insert into Product_details values(108, 36, 990, 50);
insert into Product_details values(108, 37, 990, 50);
insert into Product_details values(108, 38, 990, 50);
insert into Product_details values(108, 39, 990, 50);

insert into Product_details values(109, 40, 1350, 50);
insert into Product_details values(109, 41, 1350, 50);
insert into Product_details values(109, 42, 1350, 50);
insert into Product_details values(109, 43, 1350, 50);
insert into Product_details values(109, 44, 1350, 50);
insert into Product_details values(109, 45, 1350, 50);

insert into Product_details values(110, 36, 1350, 50);
insert into Product_details values(110, 37, 1350, 50);
insert into Product_details values(110, 38, 1350, 50);
insert into Product_details values(110, 39, 1350, 50);
insert into Product_details values(110, 40, 1350, 50);

insert into Product_details values(111, 40, 1350, 50);
insert into Product_details values(111, 41, 1350, 50);
insert into Product_details values(111, 42, 1350, 50);
insert into Product_details values(111, 43, 1350, 50);
insert into Product_details values(111, 44, 1350, 50);
insert into Product_details values(111, 45, 1350, 50);











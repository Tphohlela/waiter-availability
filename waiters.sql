create table dayTable (
id serial primary key, 
weekdays text not null,
);

INSERT INTO weekdays (weekdays) VALUES ('Monday');
INSERT INTO weekdays (colour) VALUES ('Tuesday');
INSERT INTO weekdays (colour) VALUES ('Wednesday');
INSERT INTO weekdays (colour) VALUES ('Thursday');
INSERT INTO weekdays (colour) VALUES ('Friday');
INSERT INTO weekdays (colour) VALUES ('Saturday');
INSERT INTO weekdays (colour) VALUES ('Sunday');


create table waiter_usernames (
id serial primary key,
waiterusername text not null
 );
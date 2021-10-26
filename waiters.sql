create table dayTable (
id serial primary key, 
weekdays text not null
);

INSERT INTO dayTable (weekdays) VALUES ('Monday');
INSERT INTO dayTable (weekdays) VALUES ('Tuesday');
INSERT INTO dayTable (weekdays) VALUES ('Wednesday');
INSERT INTO dayTable (weekdays) VALUES ('Thursday');
INSERT INTO dayTable (weekdays) VALUES ('Friday');
INSERT INTO dayTable (weekdays) VALUES ('Saturday');
INSERT INTO dayTable (weekdays) VALUES ('Sunday');

create table waiter_usernames (
id serial primary key,
waiterusername text not null
 );
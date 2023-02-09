INSERT INTO users (name, email, password)
VALUES ('Harry Potter', 'hpotter@hogwarts.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Hermione Granger', 'hgranger@hogwarts.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Ron Weasley', 'rweasley@hogwarts.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES (2, 'Tropical Villa', 'Private island getaway.', 'https://images.unsplash.com/photo-1652868965061-a1bde8cd4c58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1652868965061-a1bde8cd4c58?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 400, 1, 3, 2, 'Maldives', 'Sosun Magu', 'Addu City', 'South Province', '93VW' ),
(3, 'Cozy Lakeside Estate', 'Charming house by secluded lake in the English countryside', 'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 'https://images.unsplash.com/photo-1464146072230-91cabc968266?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 350, 3, 5, 3, 'England', 'Grove Lane', 'Fakenham', 'Norfolk', 'NR21 8QB' ),
(1, 'Sunny Glass Vista', 'A sun-filled modern home with private pool', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80', 800, 4, 3, 2, 'United States', 'Cross Creek Rd', 'Malibu', 'California', '90265' );

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2022-09-11', '2018-09-26', 1, 1),
('2023-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (1, 1, 1, 5, 'had a great time'),
(2, 2, 2, 5, 'great place'),
(3, 3, 3, 4, 'not much for a view but great amenities');
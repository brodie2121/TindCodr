create table users (
  id serial primary key,
  users_first_name varchar(100), 
  users_last_name varchar(100),
  users_email varchar(100), 
  users_password varchar(500),
  users_city varchar(100),
  users_about_me varchar(1000)
);

alter table users
add column users_image_url varchar(500);

create table projects (
  id serial primary key,
  project_title varchar(100),
  project_start varchar(100),
  project_summary varchar(2000),
  project_url varchar(100),
  project_open varchar(100),
  project_users_id integer references users(id)
);

create table comments (
  id serial primary key,
  comments_content varchar(500),
  comments_users_id integer references users(id),
  comments_project_id integer references projects(id)
  );

create table likes (
  id serial primary key,
  liker_id integer references users(id),
  liked_id integer references users(id)
);

create table dislikes (
  id serial primary key,
  liker_id integer references users(id),
  liked_id integer references users(id)
);


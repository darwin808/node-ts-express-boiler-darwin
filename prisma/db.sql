
create table app_user (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) unique not null,
    password VARCHAR(255) not null 

);

create table profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    age VARCHAR(255) not null,
    bday VARCHAR(255) not null ,
    app_user_id UUID REFERENCES app_user (id),
    CONSTRAINT fk_app_user FOREIGN KEY(app_user_id) REFERENCES app_user(id)

);



create table posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) not null,
    message VARCHAR(255) not null, 
    app_user_id UUID REFERENCES app_user (id),
    CONSTRAINT fk_app_user FOREIGN KEY(app_user_id) REFERENCES app_user(id)

);

insert into app_user (email, password) values ('darwin','123123')
insert into profile (age,bday,app_user_id ) values ('age1','nday1',1)
insert into posts (title,message,app_user_id ) values ('title1','msg1',1);
insert into posts (title,message,app_user_id ) values ('title2','msg2',2);
insert into posts (title,message,app_user_id ) values ('title3','msg3',3);



CREATE TABLE parent (
  id BIGSERIAL PRIMARY KEY
  first_name VARCHAR(255) not null 
);

CREATE TABLE child (
  id BIGSERIAL PRIMARY KEY
  first_name VARCHAR(255) not null 
  parent_id INTEGER not null references parent(id),
  ...
);


insert into parent (first_name ) values ('darwin')
insert into childd (first_name,parent_id ) values ('model1',1)


insert into questions (content ) values ('darwin')
insert into questions (content ) values ('darwin1')
insert into questions (content ) values ('darwin2')
insert into questions (content ) values ('darwin3')
insert into votes (value,question_id ) values ('model1',1)
insert into votes (value,question_id ) values ('model1',1);
insert into votes (value,question_id ) values ('model1',1);
insert into votes (value,question_id ) values ('model1',2);
insert into votes (value,question_id ) values ('model1',2);
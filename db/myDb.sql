DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS account;


CREATE TABLE account
( id                    	   SERIAL NOT NULL PRIMARY KEY
, username                 	VARCHAR(80) UNIQUE NOT NULL
, password              	   VARCHAR(255) NOT NULL
);

CREATE TABLE project
( id                    	   SERIAL NOT NULL PRIMARY KEY
, project_name          	   VARCHAR(200) NOT NULL
, project_note          	   VARCHAR(200) NOT NULL
, project_description   	   TEXT NOT NULL
, project_image         	   VARCHAR(200) NOT NULL
, project_image_description   VARCHAR(200) NOT NULL
, bFeatured             	   BOOLEAN NOT NULL
);


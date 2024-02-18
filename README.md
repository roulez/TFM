# People Among Dragons
This project was made for my Master's degree final project, consisting on a social network on where people can discuss topics related with Dungeons and Dragons and find other people to play together.
The project uses the following technologies:
  - **Angular:** For the  front-end development
  - **ASP .NET:** For the back-end development as an API Rest
  - **MS SQL:** For the database of the app

## Setting up the project locally
In order to set up the project locally, you need to follow the next steps:

### 1. Create Database
For the database, we need to move to the folder "database" that is at the root of the project, there we can find the scripts to create the database:
   - Create the MS SQL database with the name ***peopleamongdragons***
   - Execute the ***create_tables.sql*** file
   - Fill the database with the sample data found on the ***insert_data.sql***
   - Create a login for the databse, this is going to be used on the BackEnd for retrieving the data
   
### 2. Set-up BackEnd
In order to setup the BackEnd we need to do the following:
   - Open the ***Dragon-WebApi.sln*** file with **Visual Studio**
   - Go to the ***appsettings.json*** file
   - Change the  ***DefaultConnection*** variable with the data created on the final step of setting up the database
     - Server: The name of your SQL server
     - Database: The name of your database
     - Uid: The login name for your SQL database
     - Pwd: The login password for your SQL database
   - Run the ***https*** procces and do not close the console pop-up
   
### 3. Set-up FrontEnd
In order to setup the FrontEnd we need to do the following:
   - Open the ***people-among-dragons*** folder with **Visual Studio Code**
   - Open a new powershell terminal
   - Execute ***ng serve --open***

With this we now have the application running up locally

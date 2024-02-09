USE peopleamongdragons;

CREATE TABLE Users (
    Id int NOT NULL IDENTITY(1,1),
    UserEmail varchar(255) NOT NULL,
    UserPassword varchar(255) NOT NULL,
    UserName varchar(255) NOT NULL,
    UserSurname varchar(255) NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE Publications (
    Id int NOT NULL IDENTITY(1,1),
    PublicationTitle varchar(255) NOT NULL,
    PublicationText TEXT NOT NULL,
    PublicationImage varchar(255),
    UserId int NOT NULL,
    CreationDate DATETIME NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE Campaigns (
    Id int NOT NULL IDENTITY(1,1),
    CampaignName varchar(255) NOT NULL,
    CampaignImage varchar(255),
    UserId int NOT NULL,
    CreationDate DATETIME NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE CampaignsUsers (
    Id int NOT NULL IDENTITY(1,1),
    UserId int NOT NULL,
    CampaignId int NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (CampaignId) REFERENCES Campaigns(Id)
);

CREATE TABLE Messages (
    Id int NOT NULL IDENTITY(1,1),
    MessageTitle varchar(255) NOT NULL,
    MessageText varchar(255) NOT NULL,
    SendingUserId int NOT NULL,
    ReceivingUserId int NOT NULL,
    CreationDate DATETIME NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (SendingUserId) REFERENCES Users(Id),
    FOREIGN KEY (ReceivingUserId) REFERENCES Users(Id)
);
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

CREATE TABLE PublicationComment (
    Id int NOT NULL IDENTITY(1,1),
    PublicationId int NOT NULL,
    CommentText TEXT NOT NULL,
    UserId int NOT NULL,
    CreationDate DATETIME NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (PublicationId) REFERENCES Publications(Id),
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
    UserRole int NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (CampaignId) REFERENCES Campaigns(Id)
);

CREATE TABLE CampaignMessages (
    Id int NOT NULL IDENTITY(1,1),
    CampaignId int NOT NULL,
    UserId int NOT NULL,
    MessageText TEXT NOT NULL,
    IsPrivate BIT NOT NULL,
    CreationDate DATETIME NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (UserId) REFERENCES Users(Id),
    FOREIGN KEY (CampaignId) REFERENCES Campaigns(Id),
);

CREATE TABLE Messages (
    Id int NOT NULL IDENTITY(1,1),
    MessageTitle varchar(255) NOT NULL,
    MessageText TEXT NOT NULL,
    SendingUserId int NOT NULL,
    ReceivingUserId int NOT NULL,
    CreationDate DATETIME NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (SendingUserId) REFERENCES Users(Id),
    FOREIGN KEY (ReceivingUserId) REFERENCES Users(Id)
);
--Insert Sample Users
INSERT INTO Users (UserEmail, UserPassword, UserName, UserSurname) Values ('jmpc@gmail.com', '123456789', 'Jose Manuel', 'Perez Carrasco');
INSERT INTO Users (UserEmail, UserPassword, UserName, UserSurname) Values ('user@gmail.com', 'appuser', 'user', 'user');

--Insert Sample Publications
INSERT INTO Publications (PublicationTitle, PublicationText, PublicationImage, UserId, CreationDate) Values ('Test Publication 1', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rhoncus mi a erat cursus malesuada. Nullam vel ligula nisi. Maecenas dictum aliquet dui nec lacinia. Aenean posuere elit tellus, nec aliquam urna porttitor sit amet. Fusce vitae dolor dictum, cursus eros vel, luctus nulla. Fusce suscipit justo vel sem fermentum convallis. In elementum nisi ac placerat ullamcorper. Nullam eget faucibus est. Morbi luctus lectus dolor, quis cursus tortor finibus sed. Phasellus aliquam dictum facilisis. Nulla facilisis enim sit amet ante dapibus, vel vestibulum sem venenatis. Nam commodo mauris nec laoreet feugiat.', '../../../assets/images/login-screen.jpg', 1, CURRENT_TIMESTAMP);
INSERT INTO Publications (PublicationTitle, PublicationText, PublicationImage, UserId, CreationDate) Values ('Test Publication 2', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum rhoncus mi a erat cursus malesuada. Nullam vel ligula nisi. Maecenas dictum aliquet dui nec lacinia. Aenean posuere elit tellus, nec aliquam urna porttitor sit amet. Fusce vitae dolor dictum, cursus eros vel, luctus nulla. Fusce suscipit justo vel sem fermentum convallis. In elementum nisi ac placerat ullamcorper. Nullam eget faucibus est. Morbi luctus lectus dolor, quis cursus tortor finibus sed. Phasellus aliquam dictum facilisis. Nulla facilisis enim sit amet ante dapibus, vel vestibulum sem venenatis. Nam commodo mauris nec laoreet feugiat.', '../../../assets/images/login-screen.jpg', 2, CURRENT_TIMESTAMP);

--Insert Sample Publications Comments
INSERT INTO PublicationComment (PublicationId, CommentText, UserId, CreationDate) Values (1, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N', 1, CURRENT_TIMESTAMP);
INSERT INTO PublicationComment (PublicationId, CommentText, UserId, CreationDate) Values (1, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N', 2, CURRENT_TIMESTAMP);
INSERT INTO PublicationComment (PublicationId, CommentText, UserId, CreationDate) Values (2, 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. N', 2, CURRENT_TIMESTAMP);

--Insert Sample Campaigns
INSERT INTO Campaigns (CampaignName, CampaignImage, UserId, CreationDate) Values ('Test Campaign 1', '../../../assets/images/login-screen.jpg', 1, CURRENT_TIMESTAMP);
INSERT INTO Campaigns (CampaignName, CampaignImage, UserId, CreationDate) Values ('Test Campaign 2', '../../../assets/images/login-screen.jpg', 2, CURRENT_TIMESTAMP);

--Insert Sample User-Campaign relationships
INSERT INTO CampaignsUsers (UserId, CampaignId) Values (1, 1);
INSERT INTO CampaignsUsers (UserId, CampaignId) Values (2, 2);
INSERT INTO CampaignsUsers (UserId, CampaignId) Values (1, 2);

--Insert Sample Messages
INSERT INTO Messages (MessageTitle, MessageText, SendingUserId, ReceivingUserId, CreationDate) Values ('First Message!', 'This is my first message', 2, 1, CURRENT_TIMESTAMP);
INSERT INTO Messages (MessageTitle, MessageText, SendingUserId, ReceivingUserId, CreationDate) Values ('First Message!', 'This is my first message', 1, 2, CURRENT_TIMESTAMP);
INSERT INTO Messages (MessageTitle, MessageText, SendingUserId, ReceivingUserId, CreationDate) Values ('Second Message!', 'This is my second message', 2, 1, CURRENT_TIMESTAMP);
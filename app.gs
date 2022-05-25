function DeleteOldFiles() {
  var Folders = new Array(
    'FolderID',       // Add the folder ID on here
    'FolderID'        // Add the folder ID on here
  );
  var Files;

  Logger.clear();

  for (var key in Folders) {
    Folder = DriveApp.getFolderById(Folders[key])
    Files = Folder.getFiles();
	
	Logger.log('Opening Folder: ' + Folder.getName());

    while (Files.hasNext()) {
      var File = Files.next();

      if (new Date() - File.getLastUpdated() > 4 * 24 * 60 * 60 * 1000) {     // Default days are defined as 4.You can change according to your need.
        File.setTrashed(true); // Places the file in the Trash folder
        //Drive.Files.remove(File.getId()); // Permanently deletes the file
        Logger.log('File ' + File.getName() + ' was deleted.');
      }
    }
  }

  if(Logger.getLog() != '')
    MailApp.sendEmail('EMAIL', 'Backups have been removed from Google Drive', Logger.getLog());
}

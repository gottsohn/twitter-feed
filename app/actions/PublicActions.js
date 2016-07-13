import alt from '../lib/alt';

class PublicActions {
  static SETTINGS_KEY = 'settings';

  setTitle(title) {
    if (title) {
      this.title(title);
      window.document.title = title;
    }

    return true;
  }

  setDialogOpened(dialogOpened) {
    this.dialogOpened(dialogOpened);
    return true;
  }

  saveSettings(settings) {
    window.localStorage.setItem('settings', JSON.stringify(settings));
    this.settings(settings);
    return true;
  }


  title(title) {
    return title;
  }

  settings(settings) {
    return settings;
  }

  dialogOpened(dialogOpened) {
    return dialogOpened;
  }
}

export default alt.createActions(PublicActions);

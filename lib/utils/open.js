'use strict';
/*
  This file needs to be removed when issue https://github.com/pwnall/node-open/issues/30
  is resolved, original file can be seen here:
  https://github.com/pwnall/node-open/blob/0c3ad272bfbc163cce8806e64630c623a9cfd8f4/lib/open.js
*/
module.exports = function(target, appName) {
  var opener;

  switch (process.platform) {
  case 'darwin':
    if (appName) {
      opener = 'open -a "' + escape(appName) + '"';
    } else {
      opener = 'open';
    }
    break;
  case 'win32':
    // if the first parameter to start is quoted, it uses that as the title
    // so we pass a blank title so we can quote the file we are opening
    if (appName) {
      opener = 'start "" "' + escape(appName) + '"';
    } else {
      opener = 'start';
    }
    break;
  default:
    if (appName) {
      opener = escape(appName);
    } else {
      // use Portlands xdg-open everywhere else
      opener = 'xdg-open';
    }
    break;
  }

  if (process.env.SUDO_USER) {
    opener = 'sudo -u ' + process.env.SUDO_USER + ' ' + opener;
  }
  return opener + ' "' + target + '"';
}

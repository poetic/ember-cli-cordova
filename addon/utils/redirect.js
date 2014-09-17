export default function(url) {
  if(window.location.href.indexOf('file://') > -1) {
    window.location.href = url;
  }
}

soundManager.setup({
  // path to directory containing SM2 SWF
  url: '../assets/js/swf/'
});
threeSixtyPlayer.config.scaleFont = (navigator.userAgent.match(/msie/i)?false:true);
threeSixtyPlayer.config.showHMSTime = true;
threeSixtyPlayer.config.useWaveformData = true;
threeSixtyPlayer.config.useEQData = true;
if (threeSixtyPlayer.config.useWaveformData) {
  soundManager.flash9Options.useWaveformData = true;
}
if (threeSixtyPlayer.config.useEQData) {
  soundManager.flash9Options.useEQData = true;
}
if (threeSixtyPlayer.config.usePeakData) {
  soundManager.flash9Options.usePeakData = true;
}

if (threeSixtyPlayer.config.useWaveformData || threeSixtyPlayer.flash9Options.useEQData || threeSixtyPlayer.flash9Options.usePeakData) {

  soundManager.preferFlash = true;
}
threeSixtyPlayer.config.useFavIcon = false;

$(document).ready(function(){

});
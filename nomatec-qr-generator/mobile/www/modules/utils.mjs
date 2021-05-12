import { QRCode } from './qrcode.mjs';
import { config } from './config.mjs';
import { ls } from './storage.mjs';

if(ls.get('qrBG')){
  config.qr.colorLight = ls.get('qrBG')
} else {
  ls.set('qrBG', config.qr.colorLight)
}

if(ls.get('qrFG')){
  config.qr.colorDark = ls.get('qrFG')
} else {
  ls.set('qrFG', config.qr.colorDark )
}

const utils = {
  base64toBlob(base64Data, contentType) {
      contentType = contentType || '';
      var sliceSize = 1024;
      var byteCharacters = atob(base64Data);
      var bytesLength = byteCharacters.length;
      var slicesCount = Math.ceil(bytesLength / sliceSize);
      var byteArrays = new Array(slicesCount);

      for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
          var begin = sliceIndex * sliceSize;
          var end = Math.min(begin + sliceSize, bytesLength);

          var bytes = new Array(end - begin);
          for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
              bytes[i] = byteCharacters[offset].charCodeAt(0);
          }
          byteArrays[sliceIndex] = new Uint8Array(bytes);
      }
      return new Blob(byteArrays, { type: contentType });
  },
  DownloadToDevice(fileurl) {


    fileurl = URL.createObjectURL(fileurl)


    var storageLocation = "";
    try {
      switch (device.platform) {
          case "Android":
              storageLocation = 'file:///storage/emulated/0/';
              break;
          case "iOS":
              storageLocation = cordova.file.documentsDirectory;
              break;
      }
    } catch (err) {
      storageLocation = "/home/angeal/Pictures"
    }

   var folderpath = storageLocation + "Download";
   var filename = ls.get('qrtitle');
   var DataBlob = fileurl;
    window.resolveLocalFileSystemURL(folderpath, function(dir) {
      dir.getFile(filename, {create:true}, function(file) {
              file.createWriter(function(fileWriter) {
                  fileWriter.write(DataBlob);
                  //Download was succesfull
              }, function(err){
                // failed
                console.log(err);
              });
      });
    });




  },
  writeFile(fileEntry, dataObj) {
      // Create a FileWriter object for our FileEntry (log.txt).
      fileEntry.createWriter(function (fileWriter) {

          fileWriter.onwriteend = function() {
              console.log("Successful file write...");
              readFile(fileEntry);
          };

          fileWriter.onerror = function (e) {
              console.log("Failed file write: " + e.toString());
          };

          // If data object is not passed in,
          // create a new Blob instead.
          if (!dataObj) {
              dataObj = new Blob(['some file data'], { type: 'text/plain' });
          }

          fileWriter.write(dataObj);
      });
  },
  debounce(func, wait, immediate) {
  	var timeout;
  	return function() {
  		var context = this, args = arguments;
  		var later = function() {
  			timeout = null;
  			if (!immediate) func.apply(context, args);
  		};
  		var callNow = immediate && !timeout;
  		clearTimeout(timeout);
  		timeout = setTimeout(later, wait);
  		if (callNow) func.apply(context, args);
  	};
  },
  initQR(cb){
    try {
      window.qrcode = new QRCode("qrcode", Object.assign({
          text: ls.get('qrcurrent'),
          correctLevel : QRCode.CorrectLevel.H
      }, config.qr));
      cb(false)
    } catch (err) {
      cb(err)
    }
  },
  reserQR(val){
    window.dispatchEvent(new CustomEvent('reset-qr', {detail: val}))
  }
}


export { utils }

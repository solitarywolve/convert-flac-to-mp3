var fs = require("fs")
var spawn = require("child_process").spawn

var endsWith = function(str, end, caseInsensitive) { // TODO: Not currently used but ready for use by convertDir()
	if (caseInsensitive) {
		str = str.toLowerCase()
		end = end.toLowerCase()
	}
	return str.split("").slice(-5).join("") === end // TODO: Remove the magic -5
}

exports.convert = async function(arrayFlac,arrayMp3) {

    for(let i = 0; i< arrayFlac.length ; i++){
        const converter = spawn('C:/ffmpeg/bin/ffmpeg', ['-n', '-i', arrayFlac[i], '-ab', '320k', '-map_metadata', '0', '-id3v2_version', '3','-vsync','2','-c:v','copy', arrayMp3[i]]);
        converter.stdout.on('data', (data) => {
            console.log(data)
          });
        
          converter.stderr.on('data', (data) => {
            console.log(data)
          });
          
          converter.on('close', (code) => {
            if(code === 0){
                callback(null,arrayFlac[i])
            }
            else{
                callback(`File ${arrayFlac[i]} caught error`);
            }
          });
          
    }
	// NOTE: ffmpeg outputs to standard error - Always has, always will no doubt  
};
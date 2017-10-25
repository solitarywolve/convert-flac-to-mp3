const path = require('path');
const dirTree = require('./directory-tree');
const fs = require('fs');
const convertFlacToMp3 = require('./flac-to-mp3');
const convertFlacToMp3Pr = require('./flac-to-mp3-pr');
const writer = fs.createWriteStream(__dirname + '/log.txt',{'flags': 'a'});
let folderFlacToMp3 = (srcFolder,cb) => {
    let arrayFlac = []; //list path file flac chưa convert
    const tree = dirTree(srcFolder, {extensions:/\.flac$/}, (item, PATH) => {
        arrayFlac.push(item.path);
    });
    
    let arrayMp3 = []; //list path file mp3 cùng cấu trúc thư mục vs list file flac
    arrayFlac.forEach((element) => {
        arrayMp3.push(element.replace(/.flac$/i, ".mp3"));
    });
    cb(arrayFlac,arrayMp3);
}
//Convert su dung call back
// folderFlacToMp3('C:/Users/lykha/Desktop/flac-to-mp3/convert-flac-to-mp3/flac',(arrayFlac,arrayMp3) => {
//     convertFlacToMp3.convert(arrayFlac,arrayMp3,(err,file) => {
//         if(err) writer.write(err + '\n');
//     });
// })
// Convert su dung promise
folderFlacToMp3('C:/Users/lykha/Desktop/flac-to-mp3/convert-flac-to-mp3/flac',(arrayFlac,arrayMp3) => {
    convertFlacToMp3Pr.convert(arrayFlac,arrayMp3)
    .then(file => console.log(`${file} is converted`),err => console.log(err + '\n'))
})
//Convert su dung async-await
// let flacToMp3AsAw = async (arrayFlac,arrayMp3) => {
//     return await convertFlacToMp3Pr.convert(arrayFlac,arrayMp3);
// }
// folderFlacToMp3('C:/Users/lykha/Desktop/flac-to-mp3/convert-flac-to-mp3/flac',(arrayFlac,arrayMp3) => {
//     flacToMp3AsAw(arrayFlac,arrayMp3)
//     .then(file => console.log(`${file} is converted`),err => writer.write(err + '\n'))
// })
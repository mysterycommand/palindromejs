'use strict';

var fs = require('fs');
var filename = process.argv[2];

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
    console.log('Usage: node ' + process.argv[1] + ' FILENAME');
    process.exit(1);
}

// Read the file and print its contents.
fs.readFile(filename, 'utf8', function(error, data) {
    var file = data;

    var tag = '        <script data-main="scripts/config" src="bower_components/requirejs/require.js"></script>';
    var tagIndex = file.indexOf(tag);
    file = file.substring(0, tagIndex) + file.substring(tagIndex + tag.length + 1);

    var beginComment = file.lastIndexOf('<!-- ');
    file = file.substring(0, beginComment) + file.substring(beginComment + 5);

    var endComment = file.lastIndexOf(' -->');
    file = file.substring(0, endComment) + file.substring(endComment + 4);

    fs.writeFile(filename, file, 'utf8', function(error) {
        if (error) { throw error; }
    });
});

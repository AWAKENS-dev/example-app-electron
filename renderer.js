// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {dialog} = require('electron').remote;
var request = require('superagent');
var path = require("path");

// TODO: DRY
var addr = "localhost:1323";

document.getElementById('select-file').addEventListener('click',function(){
    console.log(dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}));
});

// Switch pane by nav
for (var nav of document.getElementsByClassName('nav-group-item')) {
    nav.addEventListener('click',function(){
	    var pane_id = this.getAttribute('data-pane');

        for (var navItem of document.getElementsByClassName('nav-group-item')) {
            navItem.classList.remove("active")
        }
        for (var paneContent of document.getElementsByClassName('pane-content')) {
            paneContent.classList.remove("current")
        }

	    this.classList.add('active');
	    document.getElementById(pane_id).classList.add('current');
    })
};

// document.getElementById('get-genotype-btn').addEventListener('click',function(){
//     uri = path.join(addr, "/v1/genomes/1/genotypes");
//     request
//         .get(uri)
//         .query({locations: "chr19:45411941"})
//         .end(function(err, res){
//             prev = document.getElementById('get-genotype-res');
//             if (prev) {
//                 prev.parentNode.removeChild(prev);
//             }

//             var div = document.createElement('div');
//             div.className = 'well';
//             div.id = 'get-genotype-res';
//             div.textContent = res.text;
//             node = document.getElementById('get-genotype-code');
//             node.parentNode.insertBefore(div, node.nextSibling);
//         });
// });

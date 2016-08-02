// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const {dialog} = require('electron').remote;
var Vue = require('vue');
var request = require('superagent');
var path = require("path");

// TODO: DRY
var addr = "localhost:1323";

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

var vm = new Vue({
    el: '#genomes',
    data: {
        genomes: [
        ]
    }
});

// Fetch from /genomes
function fetchGenomeData(vm) {
    uri = path.join(addr, "/v1/genomes/1"); // TODO: replace to /v1/genomes
    request
        .get(uri)
        .end(function(err, res){
            vm.genomes = [res.body]; // TODO:
        });
}
// Init
fetchGenomeData(vm);

// Register vcf to /genomes
document.getElementById('select-file').addEventListener('click',function(){
    var filePaths = dialog.showOpenDialog({
        properties: ['openFile', 'openDirectory'],
        filters: [
            {name: 'gzipped VCF', extensions: ['gz']},  // TODO: .vcf.gz
        ],
    });

    // TODO: add validation
    var filePath = filePaths[0]

    uri = path.join(addr, "/v1/genomes");
    request
        .post(uri)
        .send({filePath: filePath})
        .end(function(err, res){
            fetchGenomeData(vm);
        });
});

//
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

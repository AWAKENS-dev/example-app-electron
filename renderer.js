// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var path = require("path");

const {dialog} = require('electron').remote;
var Vue = require('vue');
var request = require('superagent');

require(path.join(__dirname, 'menu.js'));

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

// Fetch from /genomes
var vm = new Vue({
    el: '#genomes',
    data: {
        genomes: []
    }
});

function fetchGenomeData(vm) {
    uri = path.join(addr, "/v1/genomes");
    request
        .get(uri)
        .end(function(err, res){
            vm.genomes = res.body;
        });
}

fetchGenomeData(vm);

// TODO: DRY
var vmGenomeChoicesCoffee = new Vue({
    el: '#genome_choices_coffee',
    data: {
        selected: '1',
        options: []
    }
});
var vmGenomeChoicesViewer = new Vue({
    el: '#genome_choices_viewer',
    data: {
        selected: '1',
        options: []
    }
});

function fetchGenomeChoices(vm) {
    uri = path.join(addr, "/v1/genomes");
    request
        .get(uri)
        .end(function(err, res){
            var options = [];
            for (var genome of res.body) {
                options.push({ text:genome.sampleName , value:genome.id })
            }
            vm.options = options;
        });
}
fetchGenomeChoices(vmGenomeChoicesCoffee);
fetchGenomeChoices(vmGenomeChoicesViewer);

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
            fetchGenomeChoices(vmGenomeChoicesCoffee);
            fetchGenomeChoices(vmGenomeChoicesViewer);
        });
});

// Fetch from /genotypes
new Vue({
    el: '#genotype_query',
    data: {
        location: '',
        genotype: {"sampleName": "",
                   "genotypes":[{"chrom": "",
                                 "position": null,
                                 "snpId": "",
                                 "genotype": [""],
                                 "alleles": [""]}]}
    },
    methods: {
        fetch: function () {
            var text = this.location.trim()
            if (text) {
                fetchGenotype(this, vmGenomeChoicesViewer.selected.toString(), text);
                this.location = '';
            }
        }
    }
})

function fetchGenotype(vm, genomeId, location){
    uri = path.join(addr, "v1", "genomes", genomeId, "genotypes");
    console.log(uri);
    var response = request
        .get(uri)
        .query({locations: location})
        .end(function(err, res){
            vm.genotype = res.body;
        });
};

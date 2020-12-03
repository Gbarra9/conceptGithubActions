const fs = require('fs');

function aggregate(){
    let jsonFilenames = [];
    let aggregate = {};
    fs.readdirSync('./jsons/').forEach(file => {
        if(file.match(/[0-9]{9}.json/)){
            let currFileContents = fs.readFileSync('./jsons/' + file);
            let currJSON = JSON.parse(currFileContents)
            let toAdd = {};
            if(currJSON.hasOwnProperty('Variable Label')){
                toAdd['Variable Label'] = currJSON['Variable Label']
            }
            if(currJSON.hasOwnProperty('Variable Name')){
                toAdd['Variable Name'] = currJSON['Variable Name']
            }
            if(Object.keys(toAdd).length > 0){
                aggregate[currJSON['conceptId']] = toAdd;
            }
        }
    });
    console.log(JSON.stringify(aggregate));
    fs.writeFileSync('aggregate.json', JSON.stringify(aggregate,null, 2))
}

aggregate();

module.exports = {
    aggregate:aggregate
}

const app = require('../app.js');

const treshold = 1000;


let parkeringsPlads = {};

let pPladser = [
    {
        id: 0,
        aval: true,
        intervalStart: 0,
        intervalStop: 3
    },
    {
        id: 1,
        aval: true,
        intervalStart: 5,
        intervalStop: 8
    },
    {
        id: 2,
        aval: true,
        intervalStart: 15,
        intervalStop: 19
    },
    {
        id: 3,
        aval: true,
        intervalStart: 20,
        intervalStop: 24
    }
];

let _exports = {
    ledigTjek: (parkeringsData) => {
        let ledigePladser = [true, true, true, true];
        let pladser = pPladser;
        // console.log("weep woop");
        //if(parkeringsData.length == 27){
        for (let i = 0; i < 4; i++) {
            let n = 0;
            for (let l = pPladser[i].intervalStart; l <= pPladser[i].intervalStop; l++) {
                if (parkeringsData[l] < treshold) {
                    n++;
                }
            }
            pPladser[i].aval = n < 2;
        }
        //}
    },
    getData: () => {
        return pPladser;
    },
    getOpenSpace: () =>  {
        let openSpace = [pPladser[0].aval, pPladser[1].aval, pPladser[2].aval, pPladser[3].aval];
        return openSpace;
    }
    
};


module.exports = _exports;
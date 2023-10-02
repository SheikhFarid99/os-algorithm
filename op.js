function OptimalPage(pg, pn, fn) {
    // Create an array for given number of
    // frames and initialize it as empty.
    let fr = new Array(fn).fill(-1);
    
    // Traverse through page reference array
    // and check for miss and hit.
    let hit = 0;
    for (let i = 0; i < pn; i++) {
        // Page found in a frame : HIT
        let found = false;
        for (let j = 0; j < fn; j++) {
        if (fr[j] === pg[i]) {
            hit++;
            found = true;
            break;
        }
        }
    
        if (found) {
        continue;
        }
    
        // Page not found in a frame : MISS
    
        // If there is space available in frames.
        let emptyFrame = false;
        for (let j = 0; j < fn; j++) {
        if (fr[j] === -1) {
            fr[j] = pg[i];
            emptyFrame = true;
            break;
        }
        }
    
        if (emptyFrame) {
        continue;
        }
    
        // Find the page to be replaced.
        let farthest = -1;
        let replaceIndex = -1;
        for (let j = 0; j < fn; j++) {
        let k = i + 1;
        while (k < pn) {
            if (fr[j] === pg[k]) {
            if (k > farthest) {
                farthest = k;
                replaceIndex = j;
            }
            break;
            }
            k++;
        }
        if (k === pn) {
            replaceIndex = j;
            break;
        }
        }
        fr[replaceIndex] = pg[i];
    }
    
    console.log("No. of hits = " + hit);
    console.log("No. of misses = " + (pn - hit));
    }
    
    let pg = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5];
    let pn = pg.length;
    let fn = 4;
    OptimalPage(pg, pn, fn);
    
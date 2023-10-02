// Function to calculate waiting time and average waiting time
const prompt = require('prompt-sync')({ sigint: true });
function calculateWaitingTime(at, bt, n) {
    // Declare the array for waiting time
    let wt = new Array(n);

    // Waiting time for first process is 0
    wt[0] = 0;

    // Print waiting time for process 1
    console.log("PN\t\tAT\t\tBT\t\tWT\n\n");
    console.log(`1\t\t${at[0]}\t\t${bt[0]}\t\t${wt[0]}\n`);

    // Calculate waiting time for each process from the given formula
    for (let i = 1; i < n; i++) {
        wt[i] = (at[i - 1] + bt[i - 1] + wt[i - 1]) - at[i];

        // Print the waiting time for each process
        console.log(`${i + 1}\t\t${at[i]}\t\t${bt[i]}\t\t${wt[i]}\n`);
    }

    // Declare variable to calculate average
    let average;
    let sum = 0;

    // Loop to calculate sum of all waiting time
    for (let i = 0; i < n; i++) {
        sum = sum + wt[i];
    }

    // Find average waiting time by dividing it by no. of process
    average = sum / n;

    // Print Average Waiting Time
    console.log(`\nAverage waiting time = ${average}`);
}

// Driver code
function main() {
    // Number of processes
    let n = prompt('Input process number : ');

    // let at = [0, 1, 2, 3, 4];
    // let bt = [4, 3, 1, 2, 5];
    n = parseInt(n)
    let at = [];
    let bt = [];

    for (let i = 0; i < n; i++) {
        console.log('process no : ' + (i + 1))
        let a = prompt('Input process arialval time : ');
        let b = prompt('Input process burst time : ');
        at.push(parseInt(a))
        bt.push(parseInt(b))
        console.log('\n')
    }
    // Array for arrival time

    // Function call to find waiting time
    calculateWaitingTime(at, bt, n);
}

// Call the main function
main();

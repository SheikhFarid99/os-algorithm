var totalprocess = 5;
var proc = [];
for (var i = 0; i < 5; i++) {
	var l = [];
	for (var j = 0; j < 4; j++) {
		l.push(0);
	}
	proc.push(l);
}

function get_wt_time(wt) {
	var service = new Array(5).fill(0);
	service[0] = 0;
	wt[0] = 0;
	for (var i = 1; i < totalprocess; i++) {
		service[i] = proc[i - 1][1] + service[i - 1];
		wt[i] = service[i] - proc[i][0] + 1;
		if (wt[i] < 0) {
			wt[i] = 0;
		}
	}
}

function get_tat_time(tat, wt) {
	for (var i = 0; i < totalprocess; i++) {
		tat[i] = proc[i][1] + wt[i];
	}
}

function findgc() {
	var wt = new Array(5).fill(0);
	var tat = new Array(5).fill(0);
	var wavg = 0;
	var tavg = 0;
	get_wt_time(wt);
	get_tat_time(tat, wt);
	var stime = new Array(5).fill(0);
	var ctime = new Array(5).fill(0);
	stime[0] = 1;
	ctime[0] = stime[0] + tat[0];
	for (var i = 1; i < totalprocess; i++) {
		stime[i] = ctime[i - 1];
		ctime[i] = stime[i] + tat[i] - wt[i];
	}
	console.log("Process_no\tStart_time\tComplete_time\tTurn_Around_Time\tWaiting_Time"
	);
	for (var i = 0; i < totalprocess; i++) {
		wavg += wt[i];
		tavg += tat[i];
		console.log(
		proc[i][3] +
		"\t\t" +
		stime[i] +
		"\t\t" +
		ctime[i] +
		"\t\t" +
		tat[i] +
		"\t\t\t" +
		wt[i]
		);
	}
	console.log("Average waiting time is : " + wavg / totalprocess);
	console.log("average turnaround time : " + tavg / totalprocess);
}

var arrivaltime = [1, 2, 3, 4, 5];
var bursttime = [3, 5, 1, 7, 4];
var priority = [3, 4, 1, 7, 8];
for (var i = 0; i < totalprocess; i++) {
	proc[i][0] = arrivaltime[i];
	proc[i][1] = bursttime[i];
	proc[i][2] = priority[i];
	proc[i][3] = i + 1;
}

proc.sort(function (a, b) {
	if (a[2] == b[2]) {
	return a[0] - b[0];
	} else {
	return a[2] - b[2];
	}
});
findgc();

// This code is contributed by shiv1o43g

function update_total_tests_run() {
	var total_tests;
	var counter;

	total_tests_run = document.getElementById('total_tests_run')
	counter = Number(total_tests_run.innerText)
	counter ++;

	total_tests_run.innerText = counter;
}
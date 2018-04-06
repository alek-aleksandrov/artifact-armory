var index = 0;
var slideCount = 4;

window.onload = function() {
	window.setInterval(nextSlide, 3000);
};

function nextSlide () {
	var ind = document.getElementById("indicator" + index);
	ind.classList.remove("active");

	index++;

	if(index >= slideCount)
	{
		index = 0;
	}

	var newInd = document.getElementById("indicator" + index);
	newInd.classList.add("active");
}
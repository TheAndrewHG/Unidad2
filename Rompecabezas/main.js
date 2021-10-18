window.onload = function(){
    var images = document.getElementsByClassName("img"),
        imagenes = new Array("img/11.jpg", "img/12.jpg", "img/13.jpg", "img/21.jpg",
                            "img/22.jpg", "img/23.jpg", "img/31.jpg", "img/32.jpg",
                            "img/33.jpg"),

    imagenes = imagenes.sort(function() {return Math.random() - 0.5});

    for (let i = 0; i < imagenes.length; i++) {
        images[i].src = imagenes[i];    
    } 
}

var gridDemo1 = document.getElementById('gridDemo1'),
    gridDemo2 = document.getElementById('gridDemo2'),
    gridDemo3 = document.getElementById('gridDemo3');

new Sortable(gridDemo1, {
	animation: 150,
	ghostClass: 'blue-background-class',
    group: 'shared',
    sort: false,
});

new Sortable(gridDemo2, {
	animation: 150,
	ghostClass: 'blue-background-class',
    group: 'shared',
    sort: false,
});

new Sortable(gridDemo3, {
	animation: 150,
	ghostClass: 'blue-background-class',
    group: 'shared',
    sort: false,
});
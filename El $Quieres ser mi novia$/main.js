$(document).ready(function(){
    $("#btn-no").mouseenter(function(){
        n = valorAleatorio()+"%";
        $(this).css("right",n);
        $(this).css("top",n);
    });

    function valorAleatorio(min=10,max=80){
        return Math.floor(Math.random() * (max - min +1))+ min;
    }
})
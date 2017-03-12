$(document).ready(function(){
   $('.stats').addClass('display_none');
   $('.game_area').addClass('display_none');
});
//---------------------------------- MUSIC ----------------------------------
function audio_off(){
    $('.fa-volume-off').addClass('audio_color');
    $('.fa-volume-up').removeClass('audio_color');
    $('audio').trigger('pause')
}
function audio_on(){
    $('.fa-volume-up').addClass('audio_color');
    $('.fa-volume-off').removeClass('audio_color');
    $('audio').trigger('play')
}
//---------------------------------- SELECTING PLAYER OPTION ----------------------------------
function one_play(){
    $('.doraemon').removeClass('grayscale');
    $('.nobita').addClass('grayscale');
    $('.play_button').removeClass('grayscale');
    $('.select').text('1 Player Game Selected');
    $('.play_button').prop('disabled', false);
    $('.one_p').addClass('button_color');
    $('.two_p').removeClass('button_color');
}
function two_play(){
    $('.doraemon').removeClass('grayscale');
    $('.nobita').removeClass('grayscale');
    $('.play_button').removeClass('grayscale');
    $('.select').text('2 Players Game Selected');
    $('.play_button').prop('disabled', false);
    $('.two_p').addClass('button_color');
    $('.one_p').removeClass('button_color');
}
function play(){
    $('body').addClass('clouds');
    $('.stats').removeClass('display_none');
    $('.main_page').addClass('display_none');
    $('.p1_game_area').removeClass('display_none');
    $('.nobita_face').addClass('grayscale');
    $('.p_2').addClass('grayscale');
    $('.p2_stats').addClass('grayscale');
    $('.red_font2').css('color', 'black');
    generate_cards();
}
//---------------------------------- GENERATE CARDS ----------------------------------
var p1_cards = [];
var p2_cards = [];
function generate_cards(){
    for(var i = 1; i<=9; i++){
        p1_cards.push('img/front'+i+'.png');
        p2_cards.push('img/front'+i+'.png');
    }
    for(var j = 1; j<=9; j++){
        p1_cards.push('img/front'+j+'.png');
        p2_cards.push('img/front'+j+'.png');
    }
    p1_cards.sort(function(a, b){return 0.5 - Math.random()});  //Sorting an Array in Random Order
    p2_cards.sort(function(a, b){return 0.5 - Math.random()});
    for(var x = 0; x<6; x++){
        for(var y = 0; y<3; y++){
            $('.row1_'+(y+1)).append('<div class="card1">');
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").append('<div class="front1"/>');
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").find(".front1").append($('<img>').attr({'src': p1_cards[0]}));
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").append('<div class="back1"/>');
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").find(".back1").append('<img src="img/back.png">');
            p1_cards.splice(0,1);
            $('.row2_'+(y+1)).append('<div class="card2">');
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").append('<div class="front2"/>');
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").find(".front2").append($('<img>').attr({'src': p2_cards[0]}));
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").append('<div class="back2"/>');
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").find(".back2").append('<img src="img/back.png">');
            p2_cards.splice(0,1);
        }
    }
}
//---------------------------------- CARD MATCHING ----------------------------------
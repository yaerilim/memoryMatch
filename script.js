//---------------------------------- WHEN GAME STARTS ----------------------------------
$(document).ready(function(){
    $('.stats').hide();
    $('.game_area').hide();
    $('.win_condition').hide();
});
//---------------------------------- MUSIC ----------------------------------
function audio_off(){
    $('.fa-volume-off').addClass('audio_color');
    $('.fa-volume-up').removeClass('audio_color');
    $('.doraemon_music').trigger('pause');
}
function audio_on(){
    $('.fa-volume-up').addClass('audio_color');
    $('.fa-volume-off').removeClass('audio_color');
    $('.doraemon_music').trigger('play');
}
//---------------------------------- SELECTING PLAYER OPTION ----------------------------------
var whos_turn = 1;     //1 for player 1 and 2 for player 2
var two_player_game = false;

function one_play(){         //adding colors when 1 player mode selected
    $('.select_sound').trigger('play');
    $('.doraemon').removeClass('grayscale');
    $('.nobita').addClass('grayscale');
    $('.play_button').removeClass('grayscale');
    $('.select').text('1 Player Game Selected');
    $('.play_button').prop('disabled', false);
    $('.one_p').addClass('button_color');
    $('.two_p').removeClass('button_color');
}
function two_play(){         //adding colors when 2 player mode selected
    two_player_game = true;
    $('.select_sound').trigger('play');
    $('.doraemon').removeClass('grayscale');
    $('.nobita').removeClass('grayscale');
    $('.play_button').removeClass('grayscale');
    $('.select').text('2 Players Game Selected');
    $('.play_button').prop('disabled', false);
    $('.two_p').addClass('button_color');
    $('.one_p').removeClass('button_color');
}
function play(){          //switch to game area when play button clicked
    $('.play_sound').trigger('play');
    player1_turn();      //player 1 always goes first on 2 players mode
    generate_cards();
    $('.card').click(card_clicked);
    $('body').addClass('clouds');
    $('.stats').show();
    $('.main_page').hide();
}
//---------------------------------- TOGGLING BETWEEN TWO PLAYERS ----------------------------------
function player1_turn(){         //adding color to the stats box for player 1 on its turn
    whos_turn = 1;
    $('.p1_game_area').show();
    $('.p2_game_area').hide();
    $('.doraemon_face').removeClass('grayscale');
    $('.nobita_face').addClass('grayscale');
    $('.p_1').removeClass('grayscale');
    $('.p_2').addClass('grayscale');
    $('.p1_stats').removeClass('grayscale');
    $('.p2_stats').addClass('grayscale');
    $('.red_font1').css('color', 'orangered');
    $('.red_font2').css('color', 'black');
    $('.win_img').attr('src', 'img/p1_win.jpg');
}
function player2_turn(){       //adding color to the stats box for player 2 on its turn
    whos_turn = 2;
    $('.p1_game_area').hide();
    $('.p2_game_area').show();
    $('.doraemon_face').addClass('grayscale');
    $('.nobita_face').removeClass('grayscale');
    $('.p_1').addClass('grayscale');
    $('.p_2').removeClass('grayscale');
    $('.p1_stats').addClass('grayscale');
    $('.p2_stats').removeClass('grayscale');
    $('.red_font1').css('color', 'black');
    $('.red_font2').css('color', 'orangered');
    $('.win_img').attr('src', 'img/p2_win.jpg');
}
//---------------------------------- GENERATING CARDS ----------------------------------
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
            $('.row1_'+(y+1)).append('<div class="card1 card">');     //dynamically creating images
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").append('<div class="front1 front"/>');
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").find(".front1").append($('<img>').attr({'src': p1_cards[0]}));
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").append('<div class="back1 back"/>');
            $('.row1_'+(y+1)).find(".card1:eq("+x+")").find(".back1").append('<img src="img/back.png">');
            p1_cards.splice(0,1);
            $('.row2_'+(y+1)).append('<div class="card2 card">');
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").append('<div class="front2 front"/>');
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").find(".front2").append($('<img>').attr({'src': p2_cards[0]}));
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").append('<div class="back2 back"/>');
            $('.row2_'+(y+1)).find(".card2:eq("+x+")").find(".back2").append('<img src="img/back2.png">');
            p2_cards.splice(0,1);
        }
    }
}
//---------------------------------- GAME OPERATION ----------------------------------
var first_clicked = null;
var second_clicked = null;
var matches = 0;
var matches_left = 9;
var attempts = 0;
var accuracy = 0;
var matches2 = 0;
var matches_left2 = 9;
var attempts2 = 0;
var accuracy2 = 0;
function card_clicked() {
    $('.click_sound').trigger('play');
    $(this).find('.back').hide();
    if (first_clicked === null) {                //when first card clicked
        first_clicked = $(this);
        first_clicked.off();                     //avoid clicking the same card twice
    } else {                                      //when second card clicked
        second_clicked = $(this);
        var first_front = first_clicked.find('.front').find('img').attr('src');
        var second_front = second_clicked.find('.front').find('img').attr('src');
        first_clicked.on();
        if(whos_turn === 1){
                ++attempts;
            }else{
                ++attempts2;
            }
            if (first_front === second_front) {                      //when a match found
                $('.match_sound').trigger('play');
                first_clicked = null;
                second_clicked = null;
                if(whos_turn === 1){
                    ++matches;
                    --matches_left;
                    accuracy = Math.floor(matches / attempts * 100);
                    $('.matches').text(matches);
                    $('.matches_left').text(matches_left);
                    $('.accuracy').text(accuracy + "%");
                    if (matches === 9) {
                        $('.win_sound').trigger('play');
                        $('.win_condition').show();
                    }
                }else{
                    ++matches2;
                    --matches_left2;
                    accuracy2 = Math.floor(matches2 / attempts2 * 100);
                    $('.matches2').text(matches2);
                    $('.matches_left2').text(matches_left2);
                    $('.accuracy2').text(accuracy2 + "%");
                    if (matches2 === 9) {
                        $('.win_sound').trigger('play');
                        $('.win_condition').show();
                    }
                }
            } else {                                               //if it's not a match
                $('.no_match_sound').trigger('play');
                var first_back = $(first_clicked).find('.back');
                var second_back = $(second_clicked).find('.back');
                $('.card').off();                    //disable clicks for any other cards besides the two cards that have been clicked
                setTimeout(function () {
                    first_back.show();
                    second_back.show();
                    first_clicked = null;
                    second_clicked = null;
                    $('.card').click(card_clicked);
                    if(two_player_game === true){
                        if(whos_turn === 2){
                            player1_turn();
                        }else{
                            player2_turn();
                        }
                    }
                }, 2000)
            }
        }
    }
//---------------------------------- PLAY AGAIN ----------------------------------
function play_again() {
    $('.play_sound').trigger('play');
    first_clicked = null;
    second_clicked = null;
    matches = 0;
    matches_left = 9;
    attempts = 0;
    accuracy = 0;
    matches2 = 0;
    matches_left2 = 9;
    attempts2 = 0;
    accuracy2 = 0;
    $('.matches').text(matches);
    $('.matches_left').text(matches_left);
    $('.accuracy').text(accuracy + "%");
    $('.matches2').text(matches2);
    $('.matches_left2').text(matches_left2);
    $('.accuracy2').text(accuracy2 + "%");
    $('.back').show();
    $('.win_condition').hide();
    $('.row').empty();
    generate_cards();
    $('.card').click(card_clicked);
}
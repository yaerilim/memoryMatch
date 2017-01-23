$(document).ready(initializeGame);

function initializeGame(){
    console.log('initializeGame called');
    $('.card').click(card_clicked);
    $('.reset_button').click(function (){
        games_played++;
        reset_stats();
        $('.card').show();
        $('.youWon').hide();
    })
}
var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var match_counter = 0;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;

function card_clicked(){
    if($(this).find('.back').css('display') == 'none'){
        return;
    }
    var back_element = $(this).find('.back');
    back_element.hide();
    if(first_card_clicked == null){
        first_card_clicked = $(this);
    }
    else if (first_card_clicked!==null){
        second_card_clicked = $(this);
        ++attempts;
        display_stats();
        console.log('attempts made: ' + attempts);
        var first_card_front = first_card_clicked.find('.front').find('img').attr('src');
        var second_card_front = second_card_clicked.find('.front').find('img').attr('src');
        if(first_card_front == second_card_front){
            console.log('Cards matched');
            ++match_counter;
            ++matches;
            accuracy = Math.floor(matches / attempts *100);
            console.log('number of cards matched: ' + matches);
            console.log('accuracy: ' + accuracy);
            first_card_clicked = null;
            second_card_clicked = null;
            if(match_counter == total_possible_matches){
                $('.card').hide();
                $('#game-area').append("<div class='youWon'><img class='youWon_image' src='img/you_won.gif'><br><p>Great Job!</p></div>");
            }
        }else{
            $('.card').off();
            setTimeout(function(){
                var first_card_back = $(first_card_clicked).find('.back');
                var second_card_back = $(second_card_clicked).find('.back');
                first_card_back.show();
                second_card_back.show();
                first_card_clicked = null;
                second_card_clicked = null;
                $('.card').click(card_clicked);
            }, 2000);
        }
    }
}
function display_stats(){
    $('.games-played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy + '%');
}
function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    display_stats();
    $('.card').find('.back').show();
}
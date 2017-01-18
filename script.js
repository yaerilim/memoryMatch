/**
 * Created by yaeri on 1/17/2017.
 */
$(document).ready(initializeGame);

function initializeGame(){
    console.log('initializeGame called');
    $('.card').click(card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;

function card_clicked(){
    console.log('play_card called',this);
            var back_element = $(this).find('.back');
            back_element.hide();
            if(first_card_clicked == null){
                first_card_clicked = $(this);
            }
            else if (first_card_clicked!==null){
                second_card_clicked = $(this);
                var first_card_front = first_card_clicked.find('.front').find('img').attr('src');
                var second_card_front = second_card_clicked.find('.front').find('img').attr('src');
                if(first_card_front == second_card_front){
                    console.log('Cards matched');
                    ++match_counter;
                    first_card_clicked = null;
                    second_card_clicked = null;
                    if(match_counter == total_possible_matches){
                        $('body').text('You Won')
                    }
        }else{
            setTimeout(function(){
                var first_card_back = $(first_card_clicked).find('.back');
                var second_card_back = $(second_card_clicked).find('.back');
                first_card_back.show();
                second_card_back.show();
                first_card_clicked = null;
                second_card_clicked = null;
            }, 2000);
        }
    }
}
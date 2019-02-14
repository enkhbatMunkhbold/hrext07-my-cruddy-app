// var randomWords = require('random-words');
/*
Init app
interact with DOM
interact with localstorage

 */

$(document).ready(function(){
  // this is where we jquery
  //var keyData = 'ourKey'; // going to need to make this dynamic?
  var $container_form = $('.container-form');
  function randRGB(){
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
   }  
   
   var words = ['escapology', 'brightwork', 'verkrampte', 'protectrix', 'nudibranch', 'grandchild', 'newfangled',
                 'flugelhorn', 'mythologer', 'pluperfect', 'jellygraph', 'quickthorn', 'rottweiler', 'technician',
                 'cowpuncher', 'middlebrow', 'jackhammer', 'triphthong', 'wunderkind', 'dazzlement', 'jabberwock',
                 'witchcraft', 'pawnbroker', 'thumbprint', 'motorcycle', 'cryptogram', 'torchlight', 'bankruptcy'];
    
    function randomWord(arr){
      var randNum = Math.floor((Math.random() * words.length) + 0);
      return arr[randNum];
    }  

  $('#btn_start').on('click', function(e){
    var randWord = randomWord(words);
    var wordArray = randWord.split('');
    function setBackGroundColors(){
      $('.box').each(function() {
        $(this).css('background-color', randRGB());        
      });      
    }

    var tt=setInterval(function(){startTime()},200);
    var counter = 1;

    function startTime()
    {
      if(counter == 20) {
        clearInterval(tt);
        setLetters();
      } else {        
        counter++;
        setBackGroundColors(); 
      }           
    }   

    function setLetters(){
      for(var i = 0; i < wordArray.length; i++){
        var boxNum = i + 4;
        // var keyBox = '#box' + boxNum; 
        var keyBox = wordArray[i];
        var $keyBox = $('#box' + boxNum);
        console.log(keyBox)
        localStorage.setItem(keyBox, wordArray[i]);
        $keyBox.css('background-color', '#80bfff');             
      }
    } 
    
    $('.btn-add').on('click', function(){
      console.log('+++++++++')
      // console.log(e);
      var firstGuess = $('#first_guess').val();
      var secondGuess = $('#second_guess').val();
      console.log(firstGuess)
      console.log(secondGuess)

      if(localStorage.hasOwnProperty(firstGuess)){
        for(var i = 0; i < wordArray.length; i++){
          var boxNum = i + 4;
          var $keyBox = $('#box' + boxNum);
          if(firstGuess === wordArray[i] || secondGuess === wordArray[i]){
            $('#box' + boxNum).text(wordArray[i]);   
            $('#box' + boxNum).html("<div class='box' id='box" + boxNum + "'>" + wordArray[i] + "</div>");
            $keyBox.css('background-color', '#d24dff');
          }          
        }  
      }

      // if(localStorage.hasOwnProperty(secondGuess)){
      //   for(var i = 0; i < wordArray.length; i++){
      //     var boxNum = i + 4;
      //     var $keyBox = $('#box' + boxNum);
      //     if(secondGuess === wordArray[i]){
      //       $keyBox.text(wordArray[i]);   
      //       $keyBox.html("<div class='box' id='box" + boxNum + "'>" + wordArray[i] + "</div>");
      //       $keyBox.css('background-color', '#d24dff');
      //     }          
      //   }  
      // }      
    }) 
   
    
    // var keyData = $('.input-key').val();
    // var valueData = $('.input-value').val();
    // // write to db
    // localStorage.setItem(keyData, valueData);
    // // read from db
    // var displayText = keyData + ' | ' + localStorage.getItem(keyData);
    // // this only displays the last one? might want to switch to html
    // // and append a div
    // // <div class="display-data-item" data-keyValue="keyData">valueData</div>
    // // if you use backticks ` you can use ${templateLiterals}
    // // TODO make this vars make sense across the app
    // $('.container-data').html('<div class="display-data-item" data-keyValue="'+ keyData +'">'+valueData+'</div>');
    // $('.input-key').val('');
    // $('.input-value').val('');
  });

  $('.btn_end').on('click', function(e) {
    $container_form.html('');
  })

  // update db
    // need to expand when  more than 1 item is added

  // delete item
  $('.container-data').on('click', '.display-data-item', function(e){
    console.log(e.currentTarget.dataset.keyvalue);
    var keyData = e.currentTarget.dataset.keyvalue;
    localStorage.removeItem(keyData);
    $('.container-data').text('');
  });
  // delete all?
  $('.btn-clear').click(function(){
    localStorage.clear();
    $('.container-data').text('');
  });
  
});
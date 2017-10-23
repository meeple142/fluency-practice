function shuffleList(list) {
    /*****************************************************
     * make sure that there are not two letters 
     * that are the same that are right next to each other
     *****************************************************/
    function shuffleIsBad(list) {
        return list.some(function (item, i) {
            if (i < list.length - 2) {
                return item.toLowerCase() === list[i + 1].toLowerCase() ||
                    item.toLowerCase() === list[i + 2].toLowerCase();
            } else {
                return false;
            }
        });
    }

    //shuffle
    do {
        list = _.shuffle(list);
    } while (shuffleIsBad(list));

    return list;
}

function sizeList(list, minSize) {
    var listOut = [];
    //Fill to over flowing
    //just add the list to the end until its long enough
    while (listOut.length < minSize) {
        listOut = listOut.concat(list);
    }

    //chop to size
    listOut = listOut.slice(0, minSize);

    return listOut;
}

function practice(list) {
    place = document.querySelector('main');

    //clean out the place
    place.innerHTML = '';

    //fill the place
    list.forEach(function (item) {
        var thing = document.createElement('div');
        thing.appendChild(document.createTextNode(item));
        place.appendChild(thing);
    });
}

function practiceSetUp() {
    var list = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    list = sizeList(list, 100);
    list = shuffleList(list);

    practice(list);
    //this is here so if the letters are switched when the timer is running it resets the timer
    resetTimer();
}

ion.sound({
    sounds: [{
        name: "bell_ring"
        }],

    // main config
    path: "sounds/",
    preload: true,
    multiplay: true,
    volume: 0.5
});

// play sound

var going = false;
var timeOut;

function resetTimer() {
    clearTimeout(timeOut);
    going = false;
    document.querySelector('#going').style.opacity = 0;
}

function setUpTimer() {

    if (!going) {
        going = true;
        document.querySelector('#going').style.opacity = 1;

        //set up time to play sound
        timeOut = setTimeout(function () {
            resetTimer();
            ion.sound.play("bell_ring");
        }, 1000 * 60);
    }
}

document.querySelector('#buttonLetters').addEventListener('click', practiceSetUp);
document.querySelector('#buttonTimer').addEventListener('click', setUpTimer);
var flashcardBack = ''

function getFlashcards() {
    var flashcards = localStorage.getItem('flashcards')

    if (flashcards != null) {
        flashcards = JSON.parse(flashcards)
    } else {
        flashcards = []
    }

    return flashcards
}

function nextFlashcard() {
    var flashcards = getFlashcards()

    var index = Math.floor(Math.random() * flashcards.length)
    var flashcard = flashcards[index]

    flashcardBack = flashcard.back

    $('#flashcard-front').val(flashcard.front)
    $('#flashcard-back').val('')
    $('#flashcard-reveal').text('Reveal')
}

$('#flashcard-reveal').click(function() {
    if ($('#flashcard-reveal').text() == 'Reveal') {
        $('#flashcard-reveal').text('Hide')
        $('#flashcard-back').val(flashcardBack)
    } else {
        $('#flashcard-reveal').text('Reveal')
        $('#flashcard-back').val('')
    }
})

$('#flashcard-next').click(function() {
    nextFlashcard()
})

if (getFlashcards().length == 0) {
    $('.card-body').text('No flashcards found')
} else {
    nextFlashcard()
}

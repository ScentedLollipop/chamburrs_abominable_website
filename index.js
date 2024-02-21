function getFlashcards() {
    var flashcards = localStorage.getItem('flashcards')

    if (flashcards != null) {
        flashcards = JSON.parse(flashcards)
    } else {
        flashcards = []
    }

    return flashcards
}

function saveFlashcards(flashcards) {
    localStorage.setItem('flashcards', JSON.stringify(flashcards))
    displayFlashcards()
}

function deleteFlashcard(index) {
    var flashcards = getFlashcards()

    flashcards.splice(index, 1)

    saveFlashcards(flashcards)
}

function displayFlashcards() {
    var flashcards = getFlashcards()

    var html = ''

    for (var i = 0; i < flashcards.length; i++) {
        var front = flashcards[i].front
        var back = flashcards[i].back

        var item = '<div class="accordion-item">\
            <h2 class="accordion-header">\
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-' + i + '">\
                    ' + front.substring(0, 100) + '\
                </button>\
            </h2>\
            <div id="collapse-' + i + '" class="accordion-collapse collapse" data-bs-parent="#flashcards-view">\
                <div class="accordion-body">\
                    <div class="mb-4">\
                        <label for="flashcard-front-' + i + '" class="form-label">Front</label>\
                        <textarea class="form-control" id="flashcard-front-' + i + '" readonly>' + front + '</textarea>\
                    </div>\
                    <div class="mb-4">\
                        <label for="flashcard-back-' + i + '" class="form-label">Back</label>\
                        <textarea class="form-control" id="flashcard-back-' + i + '" readonly>' + back + '</textarea>\
                    </div>\
                    <button type="button" class="btn btn-danger btn-sm" onclick="deleteFlashcard(' + i + ')">Delete</button>\
                </div>\
            </div>\
        </div>'

        html += item
    }

    if (html == '') {
        html = '<p class="mb-0">No flashcards found</p>'
    }

    $('#flashcards-view').html(html)
}

$('#flashcard-create').on('click', function() {
    var front = $('#flashcard-front').val();
    var back = $('#flashcard-back').val();

    var flashcards = getFlashcards()

    flashcards.push({
        front: front,
        back: back
    })

    $('#flashcard-front').val('')
    $('#flashcard-back').val('')

    saveFlashcards(flashcards)
    displayFlashcards()
})

displayFlashcards()

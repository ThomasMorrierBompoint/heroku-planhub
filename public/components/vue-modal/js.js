function getModalContent() {
    console.log('LOADING MODAL');

    $('.modal-content').append(`
        <script src="http://localhost:8080/app.js"></script>
    `);
}
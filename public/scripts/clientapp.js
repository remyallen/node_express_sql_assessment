$(document).ready(function() {
    loadData();

    $('#post-data').on('click', loadData);
    //$('#display-random').on('click', displayRandom);

});

function loadData() {
    event.preventDefault();

    var values = {};
    $.each($('#post-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-form').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/animal',
        data: values,
        success: function(data) {
            if(data) {
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });


}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/animal',
        success: function(data) {
            console.log(data);

            $.each(data, function(i, animal) {
                $('#container').append('<div class="animal"></div>');
                var $el = $('#container').children().last();
                $el.append('<h2>' + animal.animal_type + '</h2>');
                $el.append('<p>' + animal.animal_number + '</p>');
            });
        }
    });
}

//function displayRandom() {
//
//}
$(document).ready(
  function () {
    printApiList()

    $('#add').click(function () {
      var inputVal = $('#input').val()
      if (inputVal != 0) {
        addApiListItem(inputVal)
        $('#input').val('')
      }
    })

    $('#input').keypress(
      function (event) {
        if (event.which === 13) {
          var inputVal = $('#input').val()
          if (inputVal != 0) {
            addApiListItem(inputVal)
            $('#input').val('')
          }
        }
      }
    )

    $(document).on('click','.delete',function () {
      var id = $(this).parent('li').attr('idAttribute')
      deleteApiListItem(id)
    })

// ------------------------------------------------------------
    function deleteApiListItem(id) {
      $.ajax(
        {
          url: 'http://157.230.17.132:3010/todos/' + id,
          method: 'DELETE',
          success: function (database) {
            printApiList()
          },
          error: function () {
            alert('Attenzione! Non è stato possibile aggiungere elemento')
          }
        }
      )
    }
// ------------------------------------------------------------
    function addApiListItem(inputVal) {
      $.ajax(
        {
          url: 'http://157.230.17.132:3010/todos/',
          method: 'POST',
          data: {
            text: inputVal
          },
          success: function (database) {
            printApiList()
          },
          error: function () {
            alert('Attenzione! Non è stato possibile aggiungere elemento')
          }
        }
      )
    }
// ------------------------------------------------------------
    function printApiList() {
      $('#lista').html('')
      $.ajax(
        {
          url: 'http://157.230.17.132:3010/todos/',
          method: 'GET',
          success: function (database) {
            $('#counter').text('(' + database.length + ' note)')
            if (database.length > 0) {
              var source = $('#list-item-template').html();
              var template = Handlebars.compile(source);
              for (var i = 0; i < database.length; i++) {
                var singoloItem = database[i]
                var html = template(singoloItem);
                $('#lista').append(html)
              }
            }
          },
          error: function () {
            alert('Attenzione! Non è stato possibile collegarsi all\'API')
          }
        }
      )
    }
// ------------------------------------------------------------
  }
)

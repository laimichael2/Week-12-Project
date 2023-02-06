$(document).ready(() => {
    let contacts;


    $.get('http://localhost:3000/posts', data => {
        contacts = data
    }).done(() => buildList())
   
  const buildList = () => {
    $('#content').empty()
    contacts.forEach(contact => {
        $('#content').append(
            `<div id="contact${contact.id}" class="info-box">
            ID:${contact.id} ${contact.name} ${contact.number}
            <button id=${contact.id} class="btn btn-danger btn-sm">X</button>
             </div>`
         )
         $(`#${contact.id}`).click(() => removeItem(contact.id))
    })
  }
  const removeItem = id => {
    $.ajax({
        url: `http://localhost:3000/posts/${id}`,
        type: 'DELETE',
        sucess: function() {
            buildList()
        }
    })
}

  $('#myForm').submit(event => {
    event.preventDefault()
    const formData = {
    name: $('#name').val(),
    number: $('#number').val()
  }

  $.post('http://localhost:3000/posts',
    formData,
    data => {alert(`data added: Name: ${data.name}, Number: ${data.number}`)}
)
$('#myForm').trigger('reset')
buildList()
  })
  $('#myUpdateForm').submit(event => {
    event.preventDefault()
    const formData= {
        id: $('#updateId').val(),
        name: $('#updateName').val(),
        number: $('#updateNumber').val()
    }

    $.ajax({
        url: `http://localhost:3000/posts/${formData.id}`,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData)
    }).done(() => buildList())

$('#myUpdateForm').trigger('reset')

})
})

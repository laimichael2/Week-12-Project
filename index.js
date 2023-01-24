$(document).ready(() => {
    let contacts;


    $.get('https://63c31df2e3abfa59bdb8b49f.mockapi.io/project', data => {
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
         $(`#${contact.id}`),click(() => removeItem(contact.id))
    })
  }

  $('myForm').submit((event) => {
    event.preventDefault();
    const formData = {
    name: $('#name').val(),
    number: $('#number').val()
  };


$.post('https://63c31df2e3abfa59bdb8b49f.mockapi.io/project',
    formData,
    data => { alert(`data added: Name: ${data.name}, Number: ${data.number}`)}
);
$('#myForm').trigger('reset');
buildList();
})

const removeItem = id => {
    $.ajax({
        url: 'https://63c31df2e3abfa59bdb8b49f.mockapi.io/project/${.id}',
        type: 'DELETE',
        sucess: function() {
            buildList()
        }
    })

    alert(`post with id: ${id} deleted`)


}

$('#myUpdateForm').submit((event) => {
event.preventDefault()
const formData= {
    id: $('#updateId').val(),
    name: $('#updateName').val(),
    phoneNumber: $('#updatePhoneNumber').val()
}
$.ajax({
    url: 'https://63c31df2e3abfa59bdb8b49f.mockapi.io/project/${formData.id}',
    type: 'PUT',
    contentType: 'application/json',
    data: json.stringify(formData)
}).done(() => buildList())

$('#myUpdateForm').trigger('reset')
})
})
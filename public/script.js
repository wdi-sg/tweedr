window.onload = () => {
  // make a new request
  //ajax(responseHandler, ajaxUrl);

  function ajax(value) {
    var ajaxUrl = 'http://localhost:3000/tweeds';

    // what to do when we recieve the request
    var responseHandler = function() {
      console.log('response text', this.responseText);

      console.log('status text', this.statusText);
      console.log('status code', this.status);

      const obj = JSON.parse(this.responseText);
      console.log(obj);

      for (let i in obj) {
        let listItem = document.createElement('li');
        listItem.textContent = obj[i].content;
        document.querySelector('body').appendChild(listItem);
        console.log('SAVE ME');
      }

      //var resObj = JSON.parse(this.responseText);
    };

    var request = new XMLHttpRequest();
    // listen for the request response
    request.open('post', ajaxUrl, true);
    request.setRequestHeader(
      'Content-type',
      'application/x-www-form-urlencoded'
    );

    // request.onreadystatechange = function() {
    //   //Call a function when the state changes.
    //   if (request.readyState == 4 && request.status == 200) {
    //     alert(request.responseText);
    //   }
    // };

    // send the request
    request.send(`content=${value}`);
  }

  var form = document.createElement('form');
  form.setAttribute('target', '_self');
  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('name', 'content');
  var inputBtn = document.createElement('input');
  inputBtn.setAttribute('type', 'submit');

  form.appendChild(input);
  form.appendChild(inputBtn);
  document.querySelector('body').appendChild(form);
  form.addEventListener('submit', event => {
    event.preventDefault();
    console.log(input.value);
    ajax(input.value);
  });
};

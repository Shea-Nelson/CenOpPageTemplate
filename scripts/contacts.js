$(document).ready(function () {
  var contactsName = 'contactsList';
  var contactsHtml = '';

  $.ajax({
    url: currentUrl + "/_api/web/lists/getbytitle('" + contactsName + "')/items'",
    method: 'GET',
    headers: { "Accept": "application/json; odata=verbose" },
    success: function (data) {
      console.log(currentUrl + "/_api/web/lists/getbytitle('" + contactsName + "')/items");
      console.log(data.d.results);
      if (data.d.results.length > 0) {
        $('#contactsList').addClass('contactsListShow');
      }

      $.each(data.d.results, function (i, item) {
        var employeeRole = data.d.results[i].Title;
        var responsibilities = data.d.results[i].Responsiblities;
        function GetCurrentUser() {
          console.log('responsibilities = ' + responsibilities);
          var requestUri = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + data.d.results[i].PersonId + ")";

          var requestHeaders = { "accept" : "application/json;odata=verbose" };

          $.ajax({
            url : requestUri,
            contentType : "application/json;odata=verbose",
            headers : requestHeaders,
            success : onSuccess,
            error : onError
          });
        }

        function onSuccess(data, request) {
          loginName = data.d.LoginName.split('|')[1];
          accountName = data.d.LoginName;
          console.log('Yo' + loginName);
          console.log('Yo Yo' + accountName);
          ContactHtml(loginName, employeeRole, responsibilities);
        }

        function onError(error) {
          alert(error);
        }

        GetCurrentUser();

        function ContactHtml(loginName, employeeRole, responsibilities) {
          var requestHeaders = {
          "Accept": "application/json;odata=verbose",
          "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
          };

          jQuery.ajax({
            url: _spPageContextInfo.webAbsoluteUrl + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(@v)?@v='" + encodeURIComponent(loginName) + "'",
            type: 'GET',
            //data: JSON.stringify(theData),
            contentType: "application/json;odata=verbose",
            headers: requestHeaders,
            success: function (data) {

              var preferredName = '';
              var workPhone = '';
              var manager = '';
              var office = '';
              var pictureURL = '';
              var positionTitle = '';
              var workEmail = '';

              var obj = data;
              var rootObj = obj["d"];
              var userProfProps = rootObj["UserProfileProperties"];
              var results = userProfProps["results"];

              // results is array with 101 properties

              //last name has index 6
              var lNameObj = results[6];
              var lNameKey = lNameObj["Key"];
              var lNameValue = lNameObj["Value"];

              //first name has index 4
              var fNameObj = results[4];
              var fNameKey = fNameObj["Key"];
              var fNameValue = fNameObj["Value"];


              console.log(lNameKey);
              console.log(lNameValue);

              console.log(fNameKey);
              console.log(fNameValue);

              console.log(data.d);

              $.each(results, function (i, item) {
                if (results[i].Key == 'PreferredName') {
                  console.log('yo pname is ' + results[i].Value);
                  preferredName = results[i].Value;
                }

                if (results[i].Key == 'WorkPhone') {
                  console.log('yo workphone is ' + results[i].Value);
                  workPhone = results[i].Value;
                }

                if (results[i].Key == 'Manager') {
                  console.log('yo manager is ' + results[i].Value);
                  manager = results[i].Value;
                }

                if (results[i].Key == 'Office') {
                  console.log('yo office is ' + results[i].Value);
                  office = results[i].Value;
                }

                if (results[i].Key == 'PictureURL') {
                  console.log('yo pictureURL is ' + results[i].Value);
                  pictureURL = results[i].Value;
                }

                if (results[i].Key == 'Title') {
                  console.log('yo title is ' + results[i].Value);
                  positionTitle = results[i].Value;
                }

                if (results[i].Key == 'WorkEmail') {
                  console.log('yo WorkEmail is ' + results[i].Value);
                  workEmail = results[i].Value;
                }
              });

              console.log('employeeRole = ' + employeeRole);

              contactsHtml = contactsHtml + '<li class="contact">' +
              '<div class="preferredName contactAttr"><a href="mailto:' + workEmail + '">' +
              preferredName + '</a></div>' +
              '<div class="phone contactAttr">Phone: ' + workPhone + '</div>' +
              '<div class="office contactAttr">Location: ' + office + '</div>' +
              '<div class="employeeRole contactAttr">Role: ' + employeeRole + '</div>' +
              '<div class="title contactAttr">Postion Title: ' + positionTitle + '</div>' +
              '<div class="responsibilities contactAttr">Responsibilities:   ' + responsibilities + '</div>' +

              /*'<div class="manager contactAttr">Manager: ' + manager + '</div>' + */
              '</li>';

              console.log(contactsHtml);
              $('.contactsContainer').html(contactsHtml);

            },

            error: function (jqxr, errorCode, errorThrown) {
            console.log("Error" + jqxr.responseText);
            }

          });
        };
      });
    }
  });
});

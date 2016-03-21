var siteNavListName = 'siteNavLinks';
var customLinksListName = 'customLinks';
var announcementsListName = 'Announcements';
var currentUrl = window.location.href;
currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/Pages'));
var processId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1, currentUrl.length);
var parentProcessId = currentUrl.substring(currentUrl.lastIndexOf('process/') +8, currentUrl.lastIndexOf('/'));
var dateToday = new Date();
console.log(processId);
console.log(parentProcessId);
/************ Get SiteNav Links ***********/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + siteNavListName + "')/items?$orderby=orderLinks",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var siteNavLinksHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + siteNavListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].URL.Description);
    });
    $.each(data.d.results, function (i, item) {
      siteNavLinksHtml = siteNavLinksHtml + "<li><a href='" + data.d.results[i].URL.Url + "'>" + data.d.results[i].URL.Description + "</a></li>";
    });
    siteNavLinksHtml = siteNavLinksHtml + "</ul>";
    console.log(siteNavLinksHtml);
    $("#siteNavLinks").html(siteNavLinksHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

/*********** Get HelpfulLink Links ***********/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + customLinksListName + "')/items?$orderby=orderLinks",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var customLinksHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + customLinksListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].URL.Description);
    });
    $.each(data.d.results, function (i, item) {
      customLinksHtml = customLinksHtml + "<li><a href='" + data.d.results[i].URL.Url + "'>" + data.d.results[i].URL.Description + "</a></li>";
    });
    customLinksHtml = customLinksHtml + "</ul>";
    console.log(customLinksHtml);
    $("#helpNavLinks").html(customLinksHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

/*********** Get Current Announcements ***********/
$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + announcementsListName + "')/items?$filter=Expires ge datetime'" + dateToday.toISOString() + "'",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var announcementsHtml = '<ul>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + announcementsListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].Title);
    });
    $.each(data.d.results, function (i, item) {
      announcementsHtml = announcementsHtml + "<li> <img class='imgAnnouncements' alt='megaphone' src='/sites/gta/SiteAssets/megaPhone.svg'/>" + data.d.results[i].Title + "</li>";
  });
    announcementsHtml = announcementsHtml + "</ul>";
    console.log(announcementsHtml);
    $("#announcements").html(announcementsHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

$('#processOutline').load('/sites/gta/SiteAssets/GTA%20Process%20Outline/index.html', function () {

  /************ Show Only Relevant Process ***********/
  if (parentProcessId.length > 1) {
    console.log('This is a subprocess');
    $('#supportProcess').css('display', 'none');
    $('.containerProcess').css('display', 'none');
    console.log('#container' + parentProcessId.toUpperCase());
    $('#container' + parentProcessId.toUpperCase()).css('display', 'inline-block');
    /*$('#container' + processId.toUpperCase() + ' .process .cardTitle').css('background', 'radial-gradient(ellipse at center, rgba(244,236,134,0.2) 0%, rgba(106,171,107,0.4) 100%);');
*/
    $('#title' + processId.toUpperCase()).css('background-color', '#9ed0d3');

    $('#businessProcess').addClass('zoomProcessOutline');
  } else if (processId != 'gta') {
    console.log('this is a process');
    $('#supportProcess').css('display', 'none');
    $('.containerProcess').css('display', 'none');
    console.log('#container' + processId.toUpperCase());
    $('#container' + processId.toUpperCase()).css('display', 'inline-block');
    /*$('#container' + processId.toUpperCase() + ' .process .cardTitle').css('background', 'radial-gradient(ellipse at center, rgba(244,236,134,0.2) 0%, rgba(106,171,107,0.4) 100%);');
*/
    $('#container' + processId.toUpperCase() + ' .process .cardTitle').css('background-color', '#9ed0d3');

    $('#businessProcess').addClass('zoomProcessOutline');
  } else {
    console.log('something is wrong');
  }
});

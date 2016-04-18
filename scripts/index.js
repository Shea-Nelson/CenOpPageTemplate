var siteNavListName = 'Site Navigation Links';
var customLinksListName = 'Helpful Links';
var announcementsListName = 'Announcements';
var currentUrl = window.location.href.toUpperCase();
console.log(currentUrl);
var pageName = currentUrl.substring(currentUrl.lastIndexOf('/PAGES/') + 7, currentUrl.length);
console.log('page name is ' + pageName);
currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/PAGES'));
console.log(currentUrl);
var processId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1, currentUrl.length);
var parentProcessId = currentUrl.substring(currentUrl.lastIndexOf('/PROCESS/') + 9, currentUrl.lastIndexOf('/'));
var processName = '';
var subprocessName = '';
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

$('#processOutline').load('/sites/gta/SiteAssets/code/gta_process_map/index.html', function () {

  /************ Show Only Relevant Process ***********/
  if (parentProcessId.length > 1) {
    console.log('This is a subprocess');
    /*addGlobalNavigation('subprocess');*/
    $('#supportProcess').css('display', 'none');
    $('.containerProcess').css('display', 'none');
    console.log('#container' + parentProcessId.toUpperCase());
    $('#container' + parentProcessId.toUpperCase()).css('display', 'inline-block');
    /*$('#container' + processId.toUpperCase() + ' .process .cardTitle').css('background', 'radial-gradient(ellipse at center, rgba(244,236,134,0.2) 0%, rgba(106,171,107,0.4) 100%);');
*/
    $('#title' + processId.toUpperCase()).css('background-color', '#9ed0d3');

    $('#businessProcess').addClass('zoomProcessOutline');
  } else if (processId != 'gta') {
    /*addGlobalNavigation('process');*/
    console.log('this is a process');
    $('#supportProcess').css('display', 'none');
    $('.containerProcess').css('display', 'none');
    console.log('#container' + processId.toUpperCase());
    $('#container' + processId.toUpperCase()).css('display', 'inline-block');
    /*$('#container' + processId.toUpperCase() + ' .process .cardTitle').css('background', 'radial-gradient(ellipse at center, rgba(244,236,134,0.2) 0%, rgba(106,171,107,0.4) 100%);');
*/
    $('#container' + processId.toUpperCase() + ' .process .cardTitle').css('background-color', '#9ed0d3');
    $('#container' + processId.toUpperCase() + ' .process .cardTitle' + ' a').css('color', '#555');
    $('#container' + processId.toUpperCase() + ' .process .cardTitle' + ' a:visited').css('color', '#555');

    $('#businessProcess').addClass('zoomProcessOutline');
  } else {
    console.log('something is wrong');
  }
});

/************ Add Global Bread Crumbs ************/
if (parentProcessId.length > 1  && pageName != 'INDEX.ASPX') {
  console.log('This is a subprocess');
  addGlobalNavigation('subprocess');
} else if (processId != 'gta' && pageName != 'INDEX.ASPX') {
  addGlobalNavigation('process');
}

function addGlobalNavigation(processType) {
  var url = '/sites/gta/SiteAssets/code/pageTemplates/CenOpPageTemplate/data/acronym.jsn';
  var callback = function (response) {
    console.log(response);
    if (processType == 'process') {
      $.each(response, function (i, item) {
        if (item.acronym == processId.toUpperCase()) {
          processName = item.title;
          $('#DeltaPlaceHolderPageTitleInTitleArea').after(': <a href="' + currentUrl + '">' + processName + '</a>');
          /*document.styleSheets[0].addRule('#pageTitle::before', 'content: "' + processName + '";');*/
          console.log(processName + ' ' + currentUrl);
        }
      });
    }
    if (processType == 'subprocess') {
      $.each(response, function (i, item) {
        if (item.acronym == processId.toUpperCase()) {
          subprocessName = item.title;
          processName = item.parent;
          $('#DeltaPlaceHolderPageTitleInTitleArea').after('<a href="' +
            currentUrl + '">' +
            subprocessName + '</a>');
          $('#DeltaPlaceHolderPageTitleInTitleArea').after(': <a href="' +
           currentUrl.substring(0, currentUrl.lastIndexOf('/')) + '">' +
           processName + ' - </a>');
          /*document.styleSheets[0].addRule('#pageTitle::before', 'content: "' + processName + '";');*/
          console.log(subprocessName + ' ' + processName + ' ' + currentUrl);
        }
      });
    }
  };

  $.getJSON(url, callback);
}

/************ Move Search to suiteBarLeft ************/
/*$('#SearchBox').detach().appendTo('#s4-bodyContainer');*/

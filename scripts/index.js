var processId = '';
var siteNavListName = 'siteNavLinks';
var customLinksListName = 'customLinks'
var currentUrl = window.location.href;
currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/Pages'));

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

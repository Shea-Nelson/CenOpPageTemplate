var aboutUsListName = 'aboutUs';

$.ajax({
  url: currentUrl + "/_api/web/lists/getbytitle('" + aboutUsListName + "')/items'",
  method: 'GET',
  headers: { "Accept": "application/json; odata=verbose" },
  success: function (data) {
    var purposeHtml = '<div class="articleTitle">Purpose</div>';
    var whatWeDoHtml = '<div class="articleTitle">What We Do</div>';
    var activitiesHtml = '<div class="articleTitle">Activities</div>';
    var visionHtml = '<div class="articleTitle">Vision</div>';
    var missionHtml = '<div class="articleTitle">Mission</div>';
    var projectsHtml = '<div class="articleTitle">Projects</div>';
    console.log(currentUrl + "/_api/web/lists/getbytitle('" + aboutUsListName + "')/items");
    console.log(data.d.results);
    $.each(data.d.results, function (i, item) {
      console.log(data.d.results[i].aboutType);
      if (data.d.results[i].aboutType == "Purpose") {
      purposeHtml = purposeHtml + "<div class='articleContent'>" + data.d.results[i].articleContent + "</div>";
      $("#purpose").addClass('articleContainerShow');
      $("#purpose").html(purposeHtml);
    } else if (data.d.results[i].aboutType == "What We Do") {
      var whatWeDoHtml = '<div class="articleTitle">What We Do</div>';
      whatWeDoHtml = whatWeDoHtml + "<div class='articleContent'>" + data.d.results[i].articleContent + "</div>";
      $("#whatWeDo").addClass('articleContainerShow');
      $("#whatWeDo").html(whatWeDoHtml);
    } else if (data.d.results[i].aboutType == "Activities") {
      activitiesHtml = activitiesHtml + "<div class='articleContent'>" + data.d.results[i].articleContent + "</div>";
      $("#activities").addClass('articleContainerShow');
      $("#activities").html(activitiesHtml);
    } else if (data.d.results[i].aboutType == "Vision") {
      visionHtml = visionHtml + "<div class='articleContent'>" + data.d.results[i].articleContent + "</div>";
      $("#vision").addClass('articleContainerShow');
      $("#vision").html(visionHtml);
    } else if (data.d.results[i].aboutType == "Mission") {
      missionHtml = missionHtml + "<div class='articleContent'>" + data.d.results[i].articleContent + "</div>";
      $("#mission").addClass('articleContainerShow');
      $("#mission").html(missionHtml);
    } else if (data.d.results[i].aboutType == "Projects") {
      projectsHtml = projectsHtml + "<div class='articleContent'>" + data.d.results[i].articleContent + "</div>";
$     ("#projects").addClass('articleContainerShow');
      $("#projects").html(projectsHtml);
    };
  });;
    console.log(purposeHtml);
  },

  error: function (data) {
    console.log('failure');
    console.log(data);
  },

});

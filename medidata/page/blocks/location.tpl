<div class="col-md-4 col-sm-4 col-xs-12">
  <div class="side-bar">
    <h1 class="title-bottom-line"><strong>HEAD</strong> OFFICE</h1>
    <div class="panel-group" id="accordion">


      <div class="panel panel-default">
        <div class="panel-heading">
          <h4 class="panel-title"> <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree"><%= city %>, <%= country %></a> </h4>
        </div>
        <div id="collapseThree" class="panel-collapse collapse in">
          <div class="panel-body gray-bg">
            <iframe src="<%= googleearth %>" style=" width:100%; height:140px; border:0"></iframe>
            <p><strong><%= city %>, <%= country %></strong></p>
            <h3><%= phone %></h3>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>

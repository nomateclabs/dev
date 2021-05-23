<header>
  <div class="top-bar">
    <div class="container">
      <div class="row">
        <div class="col-md-3 col-sm-3 col-xs-5"> <span class="phone"><i class="ion-iphone"></i> 1-800-555-1234 </span> </div>

        <!-- end col-6 -->
        <div class="col-md-9 col-sm-9 col-xs-7 top-right">

            <a class="phone" href="mailto:contact@nomatecmedical.com"><i class="ion-email"></i></a>

          <!-- end language -->
        </div>
        <!-- end col-3 -->
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </div>
  <!-- end top-bar -->
  <nav class="navbar navbar-default" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle toggle-menu menu-left push-body" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
        <a class="navbar-brand" href="/"><img src="<%= theme_config.navbar_brand %>" alt="Image"></a> </div>
      <!-- end navbar-header -->
      <div class="collapse navbar-collapse cbp-spmenu cbp-spmenu-vertical cbp-spmenu-left" id="bs-example-navbar-collapse-1">

        <!-- end form -->
        <ul class="social-media hidden-sm">
          <li><a href="#"><i class="ion-social-facebook"></i></a></li>
          <li><a href="#"><i class="ion-social-twitter"></i></a></li>
        </ul>
        <!-- end social-media -->

        <ul class="nav navbar-nav">
          <% for (let i = 0; i < pages.nav.length; i++) { %>
            <li><a href="<%= pages.nav[i].path %>"><%= pages.nav[i].title %></a></li>
          <% } %>
        </ul>
        <!-- end nav -->
      </div>
      <!-- end navbar-collapse -->
    </div>
    <!-- end container -->
  </nav>
  <!-- end navbar -->
</header>
<!-- end header -->

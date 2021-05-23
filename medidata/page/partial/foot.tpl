<section class="footer-bar">
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <h2><i class="ion-iphone"></i> <%= phone %> </h2>
        <ul>
          <% for (let i = 0; i < theme_config.social.length; i++) { %>
            <li><a href="<%= theme_config.social[i].href %>"><i class="ion-social-<%= theme_config.social[i].ico %>"></i></a></li>
          <% } %>
        </ul>
        <!-- end ul -->
        <h4>Follow us on social media</h4>
      </div>
      <!-- end col-12 -->
    </div>
    <!-- end row -->
  </div>
  <!-- end container -->
</section>

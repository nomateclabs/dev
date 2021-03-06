<footer>
  <div class="container">
    <div class="row">
      <div class="col-md-2 col-sm-12 col-xs-12"> <img src="<%- theme_config.navbar_brand %>" alt="Image" class="pull-left">
        <p class="copyright"><%- theme_config.copyright %></p>
      </div>
      <!-- end col-2 -->
      <div class="col-md-4 col-sm-12 col-xs-12">
        <form>
          <h4><%= newsletter.title %></h4>
          <p><%= newsletter.sub %></p>
          <input type="text" placeholder="Type your e-mail">
          <input type="submit" value="Submit">
        </form>
      </div>
      <!-- end col-4 -->
      <div class="col-md-2 col-sm-4 col-xs-6">
        <h4>Navigation</h4>
        <ul>
          <% for (let i = 0; i < pages.nav.length; i++) { %>
            <li><a href="<%= pages.nav[i].path %>"><%= pages.nav[i].title %></a></li>
          <% } %>
        </ul>
      </div>
      <!-- end col-2 -->
      <div class="col-md-2 col-sm-4 col-xs-6">
        <h4>Our Sercices</h4>
        <ul>
          <% for (let i = 0; i < services.length; i++) { %>
            <li><a href="<%= services[i].path %>"><%= services[i].title %></a></li>
          <% } %>
        </ul>
      </div>
      <!-- end col-2 -->
      <div class="col-md-2 col-sm-4 col-xs-12">
        <h4>Social Media</h4>
        <ul>
          <% for (let i = 0; i < theme_config.social.length; i++) { %>
            <li><a href="<%= theme_config.social[i].href %>"><%= theme_config.social[i].title %></a></li>
          <% } %>
        </ul>
      </div>
      <!-- end col-2 -->
    </div>
    <!-- end row -->
  </div>
  <!-- end container -->
</footer>

<%- include('scripts.tpl') %>

</body>
</html>

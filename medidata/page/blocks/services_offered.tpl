

<section class="latest-news">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="title-box">
          <h2>Services</h2>
          <h5>Services we offer at Medicdata</h5>
        </div>
      </div>

      <% for (let i = 0; i < pages.index.services_offered.length; i++) { %>
      <div class="col-md-6 col-xs-12">
        <div class="left">
          <div class="article-image"><img src="<%= pages.index.services_offered[i].img %>" alt="Image"> </div>
          <h3><strong><%= pages.index.services_offered[i].head.a %></strong> <%= pages.index.services_offered[i].head.b %></h3>
          <p><%= pages.index.services_offered[i].description %></p>
          <a href="<%= pages.index.services_offered[i].path %>" class="btn-turquaz-md">Select</a> </div>
      </div>
      <% } %>
    </div>
  </div>
</section>

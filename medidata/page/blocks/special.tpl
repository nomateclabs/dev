<section class="home-services text-center">
  <div class="container">
    <div class="row">
      <div class="col-xs-12">
        <div class="title-box">
          <h2><%= special.head %></h2>
          <h5><%= special.sub %></h5>
        </div>
      </div>

      <% for (let i = 0; i < special.items.length; i++) { %>
      <div class="col-md-3 col-sm-6 col-xs-12">
        <div class="content">
          <div class="line">
            <div class="icon"><img src="<%= special.items[i].img %>" alt="Icon"> </div>
          </div>
          <h3><%= special.items[i].head %></h3>
          <p><%= special.items[i].sub %></p>
        </div>
      </div>
      <% } %>
    </div>
  </div>
</section>

<section class="latest-news">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="title-box">
          <h2>LATEST NEWS</h2>
          <h5>Consectetuer adipiscing elit, sed diam nonummy</h5>
        </div>
      </div>

      <% for (let i = 0; i < 2; i++) { %>
      <div class="col-md-6 col-xs-12">
        <div class="left">
          <div class="article-image"><img src="images/image8.jpg" alt="Image"> </div>
          <img src="images/rated-article.png" alt="Image" class="rated-article">
          <% x[i].date = new Date(x[i].date).toDateString() %>
          <h3><%= x[i].title %></h3>
          <div><%= x[i].date %></div>
          <div><%- x[i]._content %></div>
          <a href="/news/" class="btn-turquaz-md">News</a> </div>
      </div>
      <% } %>

    </div>
  </div>
</section>

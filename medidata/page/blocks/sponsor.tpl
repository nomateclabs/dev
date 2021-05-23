

<section class="logos">
  <div class="container">
    <div class="row">
      <div class="col-xs-12 text-center">
        <div class="title-box">
          <h2>Sponsors</h2>
          <h5>Services we sponsor</h5>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="owl-logos">
          <% for (let i = 0; i < sponsor.length; i++) { %>
            <div class="item"> <img src="<%= sponsor[i].img %>" title="<%= sponsor[i].title %>" alt="Image"></div>
          <% } %>
        </div>
      </div>
    </div>
  </div>
</section>

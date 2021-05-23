<section class="slider margin-bottom">
  <div class="demo-2">
    <div id="slider" class="sl-slider-wrapper">
      <div class="sl-slider">
        <% for (let i = 0; i < pages.index.slides.length; i++) { %>
          <div class="sl-slide"
          data-orientation="<%= pages.index.slides[i].orientation %>"
          data-slice1-rotation="<%= pages.index.slides[i].rotation1 %>"
          data-slice2-rotation="<%= pages.index.slides[i].rotation2 %>"
          data-slice1-scale="<%= pages.index.slides[i].scale1 %>"
          data-slice2-scale="<%= pages.index.slides[i].scale2 %>"
          >
          <div class="sl-slide-inner">
            <div class="bg-img bg-img-1"></div>
            <div class="content">
              <h1><%= pages.index.slides[i].head %></h1>
              <h3><%= pages.index.slides[i].sub %></h3>
              <img src="<%= pages.index.slides[i].img %>" alt="Image"><br>
            </div>
          </div>
        </div>
        <% } %>
      </div>

      <nav id="nav-dots" class="nav-dots">
        <span class="nav-dot-current"></span>
        <% for (let i = 1; i < pages.index.slides.length; i++) { %>
          <span></span>
        <% } %>
      </nav>
    </div>
  </div>
</section>
